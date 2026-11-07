const instances = new WeakMap();
const defaults = { Click: false, FlipX: false, Duration: 400, Easing: 'cubic-bezier(.22,.61,.36,1)', Tilt: false, Effect: 'flip', ReducedMotion: true, preserveClasses: true, preserveStyles: true, Style: [] };
const css = `
._justFlipIt_panel{position:relative;display:grid;perspective:var(--jfi-perspective,1000px);isolation:isolate}
._justFlipIt_panel>[data-jfi-face]{grid-area:1/1;min-width:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform var(--jfi-duration) var(--jfi-easing),opacity var(--jfi-duration) var(--jfi-easing);transform-origin:center}
._justFlipIt_panel>[data-jfi-face=back],._justFlipIt_panel[data-jfi-flipped=true]>[data-jfi-face=front]{pointer-events:none}
._justFlipIt_panel[data-jfi-flipped=true]>[data-jfi-face=back]{pointer-events:auto}
._justFlipIt_panel[data-jfi-effect=flip]>[data-jfi-face=front]{transform:rotateY(0deg)}
._justFlipIt_panel[data-jfi-effect=flip]>[data-jfi-face=back]{transform:rotateY(-180deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-flipped=true]>[data-jfi-face=front]{transform:rotateY(180deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-flipped=true]>[data-jfi-face=back]{transform:rotateY(0deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-axis=x]>[data-jfi-face=front]{transform:rotateX(0deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-axis=x]>[data-jfi-face=back]{transform:rotateX(-180deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-axis=x][data-jfi-flipped=true]>[data-jfi-face=front]{transform:rotateX(180deg)}
._justFlipIt_panel[data-jfi-effect=flip][data-jfi-axis=x][data-jfi-flipped=true]>[data-jfi-face=back]{transform:rotateX(0deg)}
._justFlipIt_panel[data-jfi-effect=fade]>[data-jfi-face=back],._justFlipIt_panel[data-jfi-effect=scale]>[data-jfi-face=back]{opacity:0}
._justFlipIt_panel[data-jfi-effect=fade][data-jfi-flipped=true]>[data-jfi-face=front],._justFlipIt_panel[data-jfi-effect=scale][data-jfi-flipped=true]>[data-jfi-face=front]{opacity:0}
._justFlipIt_panel[data-jfi-effect=fade][data-jfi-flipped=true]>[data-jfi-face=back],._justFlipIt_panel[data-jfi-effect=scale][data-jfi-flipped=true]>[data-jfi-face=back]{opacity:1}
._justFlipIt_panel[data-jfi-effect=scale]>[data-jfi-face=back],._justFlipIt_panel[data-jfi-effect=scale][data-jfi-flipped=true]>[data-jfi-face=front]{transform:scale(.94)}
._justFlipIt_panel[data-jfi-effect=scale][data-jfi-flipped=true]>[data-jfi-face=back]{transform:scale(1)}
._justFlipIt_panel[data-jfi-reduced=true]>[data-jfi-face]{transition:none!important}
@media(prefers-reduced-motion:reduce){._justFlipIt_panel:not([data-jfi-motion=allow])>[data-jfi-face]{transition:none!important}}
`;
function styles(doc) {
  if (doc.querySelector('style[data-justflipitstyle="v4"]')) return;
  const style = doc.createElement('style');
  style.dataset.justflipitstyle = 'v4'; style.textContent = css; doc.head.append(style);
}
function validate(options) {
  if (options.Duration !== undefined && (!Number.isFinite(options.Duration) || options.Duration < 0)) throw new TypeError('Duration must be a non-negative finite number');
  if (options.Effect !== undefined && !['flip', 'fade', 'scale'].includes(options.Effect)) throw new TypeError('Unknown Effect');
  if (options.Tilt && typeof options.Tilt === 'object') {
    for (const key of ['max', 'perspective', 'scale']) {
      if (options.Tilt[key] !== undefined && (!Number.isFinite(options.Tilt[key]) || options.Tilt[key] < 0)) throw new TypeError(`Invalid Tilt.${key}`);
    }
  }
}
export class FlipController {
  constructor(element, options = {}) {
    validate(options);
    if (!element || element.nodeType !== 1) throw new TypeError('Expected an HTML element');
    this.element = element; this.settings = { ...defaults, ...options }; this.flipped = false; this.destroyed = false;
    this.cleanups = []; this.restores = []; this.win = element.ownerDocument.defaultView;
    const doc = element.ownerDocument; styles(doc);
    this.managed = !!options.Faces;
    if (this.managed) {
      this.hoverPanel = element;
      this.frontWrapper = element.querySelector(options.Faces.front);
      this.backWrapper = element.querySelector(options.Faces.back);
      if (!this.frontWrapper || !this.backWrapper || this.frontWrapper === this.backWrapper || this.frontWrapper.parentNode !== element || this.backWrapper.parentNode !== element) throw new TypeError('Faces must select two distinct direct children');
    } else {
      if (!element.parentNode) throw new TypeError('Element must have a parent');
      this.hoverPanel = doc.createElement('div');
      this.frontWrapper = doc.createElement('div'); this.backWrapper = doc.createElement('div');
      if (this.settings.preserveClasses) this.hoverPanel.className = element.className;
      if (this.settings.preserveStyles) this.hoverPanel.style.cssText = element.style.cssText;
      element.before(this.hoverPanel); this.hoverPanel.append(this.frontWrapper, this.backWrapper);
      this.frontWrapper.append(element);
      if (options.Template !== undefined) this.backWrapper.innerHTML = options.Template;
      else {
        const clone = element.cloneNode(true);
        clone.removeAttribute('id'); clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        this.backWrapper.append(clone);
      }
    }
    const panel = this.hoverPanel;
    for (const node of [panel, this.frontWrapper, this.backWrapper]) {
      const owned = node === panel ? ['class', 'style', 'tabindex', 'data-jfi-axis', 'data-jfi-effect', 'data-jfi-motion', 'data-jfi-flipped', 'data-jfi-reduced'] : ['style', 'data-jfi-face', 'aria-hidden', 'inert'];
      const attrs = owned.map(name => [name, node.getAttribute(name)]);
      const inert = node.inert || false;
      this.restores.push(() => { node.inert = inert; for (const [name, value] of attrs) { if (value === null) node.removeAttribute(name); else node.setAttribute(name, value); } });
    }
    panel.classList.add('_justFlipIt_panel');
    this.frontWrapper.dataset.jfiFace = 'front'; this.backWrapper.dataset.jfiFace = 'back';
    this.motion = this.win.matchMedia?.('(prefers-reduced-motion: reduce)');
    const motionChange = () => { this.resetTilt(); this.render(); };
    this.motion?.addEventListener('change', motionChange);
    this.cleanups.push(() => this.motion?.removeEventListener('change', motionChange));
    this.configure(); this.events(); this.render();
    instances.set(element, this); instances.set(panel, this);
  }
  listen(type, handler, options) { this.hoverPanel.addEventListener(type, handler, options); this.cleanups.push(() => this.hoverPanel.removeEventListener(type, handler, options)); }
  get reduced() { return this.settings.ReducedMotion !== false && !!this.motion?.matches; }
  configure() {
    const s = this.settings, p = this.hoverPanel;
    p.style.setProperty('--jfi-duration', `${s.Duration}ms`); p.style.setProperty('--jfi-easing', s.Easing);
    p.dataset.jfiAxis = s.FlipX ? 'x' : 'y'; p.dataset.jfiEffect = s.Effect;
    p.dataset.jfiMotion = s.ReducedMotion === false ? 'allow' : 'respect';
    for (const item of s.Style || []) {
      const targets = item.el === 'self' ? [p] : p.querySelectorAll(item.el);
      targets.forEach(node => Object.assign(node.style, item.style));
    }
    // A generic keyboard focus target avoids button roles around interactive children.
    if (s.Tilt !== 'only' && !p.hasAttribute('tabindex')) p.tabIndex = 0;
  }
  events() {
    this.listen('click', event => {
      if (this.settings.Tilt === 'only') return;
      const trigger = this.settings.Click;
      if (trigger === true || (trigger && [].concat(trigger).some(selector => event.target.closest?.(selector) && this.hoverPanel.contains(event.target.closest(selector))))) this.toggle();
    });
    this.listen('keydown', event => {
      if (event.target !== this.hoverPanel || this.settings.Tilt === 'only') return;
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.toggle(); }
      if (event.key === 'Escape') this.flip(false);
    });
    this.listen('pointerenter', event => { if (!this.settings.Click && this.settings.Tilt !== 'only' && event.pointerType !== 'touch') this.flip(true); });
    this.listen('pointerleave', event => {
      // Touch release also emits pointerleave. The tap must survive it.
      if (event.pointerType === 'touch') return;
      this.resetTilt();
      if (!this.settings.Click && this.settings.Tilt !== 'only') this.flip(false);
    });
    this.listen('pointerdown', event => {
      if (event.pointerType !== 'touch' || event.isPrimary === false || this.touch) return;
      this.resetTilt();
      this.touch = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      this.queueTilt(event, this.touch);
    }, { passive: true });
    this.listen('pointermove', event => {
      if (event.pointerType !== 'touch') {
        if (!this.touch) this.queueTilt(event);
        return;
      }
      const touch = this.touch;
      if (!touch || touch.id !== event.pointerId) return;
      touch.moved ||= this.touchMoved(event, touch);
      this.queueTilt(event, touch);
    }, { passive: true });
    this.listen('pointerup', event => {
      const touch = this.finishTouch(event);
      if (!touch || touch.moved || this.touchMoved(event, touch)) return;
      // Explicit click triggers continue to use the browser's click event.
      if (!this.settings.Click && this.settings.Tilt !== 'only') this.toggle();
    });
    this.listen('pointercancel', event => {
      if (event.pointerType === 'touch') this.finishTouch(event);
      else this.resetTilt();
    });
    this.listen('lostpointercapture', event => this.finishTouch(event));
    this.baseTransform = this.hoverPanel.style.transform;
  }
  touchMoved(event, touch) {
    return Math.hypot(event.clientX - touch.x, event.clientY - touch.y) > 10;
  }
  finishTouch(event) {
    const touch = this.touch;
    if (event.pointerType !== 'touch' || !touch || touch.id !== event.pointerId) return;
    this.touch = null;
    this.resetTilt();
    return touch;
  }
  queueTilt(event, touch) {
    if (!this.settings.Tilt || this.reduced) return;
    this.point = [event.clientX, event.clientY];
    if (this.frame) return;
    this.frame = this.win.requestAnimationFrame(() => {
      this.frame = 0;
      // Keep the touch reference box stable as the panel rotates.
      const rect = touch
        ? (touch.rect ??= this.hoverPanel.getBoundingClientRect())
        : this.hoverPanel.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const { max = 10, perspective = 1000, scale = 1.03 } = this.settings.Tilt;
      const x = Math.max(-1, Math.min(1, (this.point[0] - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (this.point[1] - rect.top) / rect.height * 2 - 1));
      this.hoverPanel.style.transform = `perspective(${perspective}px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(${scale})`;
    });
  }
  resetTilt() { if (this.frame) this.win.cancelAnimationFrame(this.frame); this.frame = 0; this.hoverPanel.style.transform = this.baseTransform || ''; }
  render() {
    this.hoverPanel.dataset.jfiFlipped = String(this.flipped); this.hoverPanel.dataset.jfiReduced = String(this.reduced);
    for (const [node, hidden] of [[this.frontWrapper, this.flipped], [this.backWrapper, !this.flipped]]) { node.setAttribute('aria-hidden', String(hidden)); node.inert = hidden; }
  }
  flip(value = true) {
    if (this.destroyed || this.flipped === !!value) return this;
    const active = this.element.ownerDocument.activeElement;
    if ((value ? this.frontWrapper : this.backWrapper).contains(active)) this.hoverPanel.focus({ preventScroll: true });
    this.flipped = !!value; this.render();
    this.hoverPanel.dispatchEvent(new this.win.CustomEvent('justflipit:change', { bubbles: true, detail: this.getState() }));
    return this;
  }
  toggle() { return this.flip(!this.flipped); }
  update(options = {}) {
    if (this.destroyed) return this;
    if ('Faces' in options) throw new TypeError('Faces cannot change after initialization');
    validate(options);
    if (this.managed && 'Template' in options) throw new TypeError('Render framework face content with the framework');
    this.settings = { ...this.settings, ...options };
    if ('Template' in options) {
      if (this.managed) throw new TypeError('Render framework face content with the framework');
      this.backWrapper.innerHTML = options.Template;
    }
    this.resetTilt(); this.configure(); this.render(); return this;
  }
  getState() { return { flipped: this.flipped, destroyed: this.destroyed, effect: this.settings.Effect }; }
  destroy() {
    if (this.destroyed) return;
    this.resetTilt(); this.cleanups.forEach(fn => fn());
    this.restores.forEach(fn => fn());
    if (!this.managed) { this.hoverPanel.replaceWith(this.element); }
    instances.delete(this.element); instances.delete(this.hoverPanel); this.destroyed = true;
  }
}
function elements(target) {
  if (typeof target === 'string') return typeof document === 'undefined' ? [] : Array.from(document.querySelectorAll(target));
  if (target?.nodeType === 1) return [target];
  return target ? Array.from(target) : [];
}
export default function justFlipIt(target, options) {
  const result = elements(target).map(element => instances.get(element) || new FlipController(element, options));
  return target?.nodeType === 1 ? result[0] : result;
}
justFlipIt.destroy = target => elements(target).forEach(element => instances.get(element)?.destroy());
justFlipIt.get = element => instances.get(element);
