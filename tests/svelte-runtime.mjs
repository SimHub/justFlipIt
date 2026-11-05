import { JSDOM } from 'jsdom';
import assert from 'node:assert/strict';
import { writeFile, unlink } from 'node:fs/promises';
import { compile } from 'svelte/compiler';
const dom = new JSDOM('<!doctype html><div id="root"></div>', { pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'SVGElement', 'Node', 'Text', 'Comment', 'Event', 'CustomEvent', 'MutationObserver']) globalThis[key] = dom.window[key];
const { mount, unmount, flushSync } = await import('svelte');
const { default: flip } = await import('@simhub2/justflipit');
const fixture = new URL('./.svelte-fixture.mjs', import.meta.url);
const source = `<script>
import { flip } from '@simhub2/justflipit/svelte';
let count = $state(0);
</script>
<button onclick={() => count++}>Increment</button>
<div use:flip={{ Click: true, Duration: count ? 200 : 400 }}>
<div data-flip-front>{count}</div><div data-flip-back>Back</div>
</div>`;
try {
  await writeFile(fixture, compile(source, { generate: 'client', filename: 'Fixture.svelte' }).js.code);
  const { default: Component } = await import(fixture.href);
  let app;
  flushSync(() => { app = mount(Component, { target: document.querySelector('#root') }); });
  const host = document.querySelector('[data-jfi-effect]'), card = flip.get(host), front = host.firstElementChild;
  assert.ok(card);
  flushSync(() => document.querySelector('button').click());
  assert.equal(front.textContent, '1');
  assert.equal(host.style.getPropertyValue('--jfi-duration'), '200ms');
  await unmount(app);
  assert.equal(card.destroyed, true);
} finally { await unlink(fixture).catch(() => {}); }
