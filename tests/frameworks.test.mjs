import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><div id="root"></div>', { pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'SVGElement', 'Node']) globalThis[key] = dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { default: core } = await import('../dist/justFlipIt.mjs');
// Adapters resolve the package entry; use its registry for lifecycle assertions.
const { default: flip } = await import('@simhub2/justflipit');
test('React StrictMode mounts, updates live children, cleans up and remounts', async () => {
  const { createElement: h, StrictMode, act } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { useFlip } = await import('../dist/react.mjs');
  function Card({ text }) { const { ref } = useFlip({ Click: true, Effect: 'scale' }); return h('div', { ref }, h('div', { 'data-flip-front': true }, text), h('div', { 'data-flip-back': true }, 'back')); }
  const root = createRoot(document.querySelector('#root'));
  await act(() => root.render(h(StrictMode, null, h(Card, { text: 'first' }))));
  const host = document.querySelector('[data-jfi-effect]'), instance = flip.get(host);
  assert.ok(instance); instance.flip();
  await act(() => root.render(h(StrictMode, null, h(Card, { text: 'updated' }))));
  assert.equal(host.firstChild.textContent, 'updated'); assert.equal(instance.flipped, true);
  await act(() => root.unmount()); assert.equal(instance.destroyed, true);
});
test('Vue directive updates options and reactive content, then cleans up', async () => {
  const { createApp, h, withDirectives, ref, nextTick } = await import('vue');
  const { vFlip } = await import('../dist/vue.mjs');
  const text = ref('first'), effect = ref('flip');
  const app = createApp({ render() { return withDirectives(h('div', [h('div', { 'data-flip-front': '' }, text.value), h('div', { 'data-flip-back': '' }, 'back')]), [[vFlip, { Effect: effect.value, Click: true }]]); } });
  app.mount('#root'); const host = document.querySelector('[data-jfi-effect]'), card = flip.get(host);
  text.value = 'updated'; effect.value = 'fade'; await nextTick();
  assert.equal(host.firstChild.textContent, 'updated'); assert.equal(card.getState().effect, 'fade');
  app.unmount(); assert.equal(card.destroyed, true);
});
test('Svelte action updates and destroys without replacing nodes', async () => {
  const { flip: action } = await import('../dist/svelte.mjs');
  const host = document.createElement('div'); host.innerHTML = '<div data-flip-front>front</div><div data-flip-back>back</div>'; document.body.append(host);
  const front = host.firstChild, life = action(host, { Click: true });
  const card = flip.get(host); life.update({ Duration: 50 });
  assert.equal(host.style.getPropertyValue('--jfi-duration'), '50ms');
  life.destroy(); assert.equal(host.firstChild, front); assert.equal(card.destroyed, true);
});
test('compiled Svelte 5 component mounts, updates reactive content/options and unmounts', async () => {
  const { execFileSync } = await import('node:child_process');
  execFileSync(process.execPath, ['--conditions=browser', 'tests/svelte-runtime.mjs'], { stdio: 'pipe' });
});
