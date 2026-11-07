import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { JSDOM } from 'jsdom';
import flip from '../dist/justFlipIt.mjs';
import { createAgentBridge } from '../dist/agent.mjs';
let doc, win;
beforeEach(() => {
  const dom = new JSDOM('<!doctype html><div id="card"><button>Original</button></div>', { pretendToBeVisual: true });
  doc = dom.window.document; win = dom.window; globalThis.document = doc;
});
test('SSR import and CJS entry have callable defaults', async () => {
  const require = createRequire(import.meta.url);
  assert.equal(typeof require('@simhub2/justflipit'), 'function');
  delete globalThis.document;
  assert.deepEqual(flip('.missing'), []);
  for (const path of ['react', 'vue', 'svelte', 'agent']) await import(`@simhub2/justflipit/${path}`);
});
test('preserves node identity, event listeners and exact restoration', () => {
  const original = doc.querySelector('#card'), button = original.firstChild;
  let count = 0; button.onclick = () => count++;
  const card = flip(original, { Click: true, Template: '<p>Back</p>' });
  assert.equal(flip(original), card);
  button.click(); assert.equal(count, 1); assert.equal(card.flipped, true);
  assert.equal(card.frontWrapper.inert, true);
  flip.destroy('#card'); card.destroy();
  assert.equal(doc.body.firstChild, original); assert.equal(original.firstChild, button);
  assert.equal(flip.get(original), undefined);
});
test('live updates, keyboard and change events', () => {
  const card = flip(doc.querySelector('#card'), { Click: true });
  let events = 0; card.hoverPanel.addEventListener('justflipit:change', () => events++);
  card.hoverPanel.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  assert.equal(card.flipped, true); card.flip(true); assert.equal(events, 1);
  card.update({ Effect: 'fade', Duration: 200, Template: 'New' });
  assert.equal(card.hoverPanel.dataset.jfiEffect, 'fade');
  assert.equal(card.hoverPanel.style.getPropertyValue('--jfi-duration'), '200ms');
  assert.equal(card.backWrapper.textContent, 'New');
  assert.throws(() => card.update({ Duration: -1 }));
  card.destroy(); card.toggle(); assert.equal(events, 1);
});
test('managed faces retain reactive DOM and attributes after destroy', () => {
  const host = doc.querySelector('#card'); host.innerHTML = '<div data-flip-front><button>front</button></div><div data-flip-back>back</div>';
  const before = host.outerHTML, nodes = [...host.children];
  const card = flip(host, { Faces: { front: '[data-flip-front]', back: '[data-flip-back]' }, Click: true });
  card.flip(); assert.equal(host.children[0], nodes[0]); card.destroy();
  assert.equal(host.outerHTML, before); assert.equal(host.children[1], nodes[1]);
  assert.equal(nodes[0].inert, false);
});
test('delegated selectors handle dynamically inserted triggers', () => {
  const card = flip(doc.querySelector('#card'), { Click: ['.trigger'], Template: '' });
  card.frontWrapper.insertAdjacentHTML('beforeend', '<button class="trigger">Flip</button>');
  card.frontWrapper.querySelector('.trigger').click(); assert.equal(card.flipped, true);
});
test('agent bridge uses allowlisted cards, validates commands and treats content as text', () => {
  const card = flip(doc.querySelector('#card'));
  const bridge = createAgentBridge({ demo: card });
  assert.equal(bridge.execute({ id: 'demo', action: 'flip' }).flipped, true);
  bridge.execute({ id: 'demo', action: 'setText', text: '<img src=x onerror=alert(1)>' });
  assert.equal(card.backWrapper.children.length, 0);
  assert.throws(() => bridge.execute({ id: 'other', action: 'flip' }));
  assert.throws(() => bridge.execute({ id: 'demo', action: 'delete' }));
  assert.throws(() => bridge.execute({ id: 'demo', action: 'state', extra: true }));
  card.destroy(); assert.throws(() => bridge.execute({ id: 'demo', action: 'state' }));
});
test('reduced motion reacts to preference changes and cancels tilt', () => {
  let onChange;
  const media = { matches: true, addEventListener(_, fn) { onChange = fn; }, removeEventListener() {} };
  win.matchMedia = () => media;
  const card = flip(doc.querySelector('#card'), { Tilt: true });
  assert.equal(card.hoverPanel.dataset.jfiReduced, 'true');
  media.matches = false; onChange(); assert.equal(card.hoverPanel.dataset.jfiReduced, 'false');
});
test('tilt is batched into one animation frame and cancelled on teardown', () => {
  let calls = 0, cancelled = 0, callback;
  win.requestAnimationFrame = fn => { calls++; callback = fn; return 10; };
  win.cancelAnimationFrame = () => cancelled++;
  const card = flip(doc.querySelector('#card'), { Tilt: { max: 15 }, Click: true });
  card.hoverPanel.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 });
  for (let i = 0; i < 10; i++) card.hoverPanel.dispatchEvent(new win.MouseEvent('pointermove', { clientX: 100, clientY: 0 }));
  assert.equal(calls, 1); callback(); assert.match(card.hoverPanel.style.transform, /rotateY\(15deg\)/);
  card.hoverPanel.dispatchEvent(new win.MouseEvent('pointermove')); card.destroy(); assert.equal(cancelled, 1);
});

function touchEvent(target, type, clientX = 20, clientY = 30) {
  const event = new win.MouseEvent(type, { bubbles: true, cancelable: true, clientX, clientY });
  Object.defineProperties(event, {
    pointerType: { value: 'touch' },
    pointerId: { value: 1 },
    isPrimary: { value: true },
  });
  return target.dispatchEvent(event);
}

test('touch taps toggle all effects and survive the release pointerleave', () => {
  const card = flip(doc.querySelector('#card'), { FlipX: true });
  for (const Effect of ['flip', 'fade', 'scale']) {
    card.update({ Effect });
    for (const flipped of [true, false]) {
      for (const type of ['pointerdown', 'pointerup', 'pointerleave']) {
        assert.equal(touchEvent(card.hoverPanel, type), true);
      }
      assert.equal(card.flipped, flipped);
    }
  }
});

test('touch tilt follows the finger and resets on release, cancellation and reduced motion', () => {
  let frame;
  win.requestAnimationFrame = callback => { frame = callback; return 1; };
  win.cancelAnimationFrame = () => { frame = undefined; };
  const card = flip(doc.querySelector('#card'), { Tilt: { max: 12 } });
  const panel = card.hoverPanel;
  panel.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 });

  touchEvent(panel, 'pointerdown', 25, 50);
  frame();
  assert.match(panel.style.transform, /rotateY\(-6deg\)/);
  assert.equal(touchEvent(panel, 'pointermove', 75, 25), true);
  frame();
  assert.match(panel.style.transform, /rotateX\(6deg\) rotateY\(6deg\)/);
  touchEvent(panel, 'pointerup', 75, 25);
  assert.equal(panel.style.transform, '');
  assert.equal(card.flipped, false);

  touchEvent(panel, 'pointerdown');
  frame();
  touchEvent(panel, 'pointermove', 50, 60);
  touchEvent(panel, 'pointercancel');
  assert.equal(frame, undefined);
  assert.equal(panel.style.transform, '');
  assert.equal(card.flipped, false);

  card.motion = { matches: true };
  touchEvent(panel, 'pointerdown');
  assert.equal(frame, undefined);
  touchEvent(panel, 'pointerup');
  assert.equal(card.flipped, true);
});

test('touch tilt respects tilt-only mode and leaves delegated clicks to native events', () => {
  const card = flip(doc.querySelector('#card'), { Tilt: 'only', Click: ['button'] });
  const button = card.frontWrapper.querySelector('button');
  touchEvent(button, 'pointerdown');
  touchEvent(button, 'pointerup');
  button.click();
  assert.equal(card.flipped, false);

  card.update({ Tilt: true });
  touchEvent(button, 'pointerdown');
  touchEvent(button, 'pointerup');
  assert.equal(card.flipped, false);
  button.click();
  assert.equal(card.flipped, true);
});
