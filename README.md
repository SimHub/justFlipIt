# justFlipIt

Responsive 3D flip and tilt animations, with no runtime dependencies in the core.
ES modules, CommonJS, browser scripts, TypeScript, React, Vue 3, and Svelte 4/5.

```sh
npm install @simhub2/justflipit
```

```js
import justFlipIt from '@simhub2/justflipit';

const card = justFlipIt(document.querySelector('.card'), {
  Click: true,
  Template: '<p>Back of the card</p>', // trusted application HTML only
  Tilt: { max: 12, perspective: 1000, scale: 1.03 },
  Effect: 'flip',
  Duration: 450
});
card.flip();
card.flip(false);
card.toggle();
card.update({ Effect: 'fade' });
card.getState();
card.destroy();
```

Passing an element returns one controller; a selector or collection returns an array.
Repeated initialization returns the existing controller. `justFlipIt.get(element)`
retrieves it; `justFlipIt.destroy(target)` cleans up. Original nodes and their event
listeners are preserved. The grid layout adapts to both faces without fixed dimensions.
The card needs an HTML container, such as a `div`; do not initialize a void element.

For script tags, use `dist/justFlipIt.min.js`, which exposes `window.justFlipIt`.
`/modern`, `/vanilla`, `/combined`, and their historical browser filenames are aliases
of the same core in v4. There is no jQuery plugin in v4.

## Options

| Option | Default | Meaning |
|---|---|---|
| `Click` | `false` | Hover; `true` for click; selector or selector array for delegated clicks |
| `FlipX` | `false` | Rotate on X instead of Y |
| `Template` | cloned original | Trusted HTML for the generated back face |
| `Duration` | `400` | Non-negative milliseconds |
| `Easing` | `cubic-bezier(.22,.61,.36,1)` | CSS easing |
| `Effect` | `'flip'` | `'flip'`, `'fade'`, or `'scale'` |
| `Tilt` | `false` | `true`, `'only'`, or `{ max, perspective, scale }` |
| `ReducedMotion` | `true` | Respect live `prefers-reduced-motion` preferences |
| `Faces` | omitted | Select two existing direct children: `{ front, back }` |
| `preserveClasses` | `true` | Copy classes onto generated container |
| `preserveStyles` | `true` | Copy inline styles onto generated container |
| `Style` | `[]` | Array of `{ el: 'self' or selector, style: {...} }` |

Tilt pointer updates are batched into one animation frame; touch scrolling remains
native. Hover mode also supports touch tap. Focus the card and press Enter/Space to
toggle, Escape to reset. The hidden face is inert and marked `aria-hidden`.
Listen for `justflipit:change` on the container; `event.detail` contains the state.
CSS transitions reverse naturally during rapid input without accumulating animations.

## Frameworks

Framework integrations use existing faces. They do not move, clone, or replace framework
nodes. Render front/back content through your framework, and do not pass `Template`.
Keep `Faces` selectors stable for the lifetime of an instance. Direct DOM methods
run only on the client; importing any entry point during SSR is safe.

React uses an Effect with cleanup, including development StrictMode cycles, following
[React's external-system lifecycle](https://react.dev/reference/react/useEffect).

```jsx
import { useFlip } from '@simhub2/justflipit/react';

export function Card({ title }) {
  const { ref, controller } = useFlip({ Click: true, Tilt: true });
  return <div>
    <div ref={ref}>
      <div data-flip-front>{title}</div>
      <div data-flip-back>Details</div>
    </div>
    <button onClick={() => controller.current?.toggle()}>Flip</button>
  </div>;
}
```

Vue 3 uses a [custom directive](https://vuejs.org/guide/reusability/custom-directives.html)
with mount, update and teardown hooks.

```vue
<script setup>
import { vFlip } from '@simhub2/justflipit/vue';
</script>
<template>
  <div v-flip="{ Click: true, Effect: 'scale' }">
    <div data-flip-front>Front</div>
    <div data-flip-back>Back</div>
  </div>
</template>
```

Svelte uses an [action](https://svelte.dev/docs/svelte/use) with update and destroy hooks.

```svelte
<script>
  import { flip } from '@simhub2/justflipit/svelte';
</script>
<div use:flip={{ Click: true, Tilt: true }}>
  <div data-flip-front>Front</div>
  <div data-flip-back>Back</div>
</div>
```

Other frameworks can call the core on mount with `Faces`, update options when needed,
and call `destroy()` before unmounting.

## Model-independent agent tools

The optional `/agent` entry exports a JSON-schema tool definition and a synchronous
executor. Your application registers explicit card IDs, receives a tool call from its
agent runtime, parses its JSON arguments, and passes the command to `execute`.
No API key or model SDK is required by this package.

```js
import { createAgentBridge } from '@simhub2/justflipit/agent';
const bridge = createAgentBridge({ product: card });

// Adapt this definition to the tool envelope required by your agent runtime.
const toolDefinition = bridge.tool;
const result = bridge.execute({ id: 'product', action: 'flip' });
bridge.execute({ id: 'product', action: 'setText', text: 'Agent-generated details' });
```

Actions: `state`, `flip`, `reset`, `toggle`, `setText`. Unknown IDs and actions are
rejected. `setText` uses `textContent` and accepts at most 100000 characters; it never
interprets model output as HTML. In framework mode update application state for
content changes; `setText` is rejected there. This bridge runs alongside the DOM in
the browser; a server-side agent must relay validated tool calls through your app.

## Migration from 3.x

v4 is a major release. Real ESM and CommonJS exports replace the old UMD-only npm
entry. Use a default ESM import or `const justFlipIt = require('@simhub2/justflipit')`.
The optional jQuery plugin registration is removed. Generated faces use
`[data-jfi-face="front"]` and `[data-jfi-face="back"]`; replace `.front`, `.backY`,
and `._flipY_` custom CSS with these attributes and `[data-jfi-flipped="true"]`.
Animation options keep their PascalCase names. Dimensions are responsive; give the
original content explicit sizes if your design requires a fixed card size.
`destroy()` restores plugin-owned attributes from their initial values; avoid managing
those same style/class/accessibility attributes from a framework while mounted.

## Development and releases

Node.js 22 or newer is used for development.

```sh
npm ci
npm run check
npm pack --dry-run
```

`npm run build` produces ESM, CommonJS, minified browser bundles, source maps, and
TypeScript declarations from one core. CI runs tests and type checks. A GitHub release
with a `v` version tag runs the npm publishing workflow; configure npm trusted
publishing for this repository/workflow, or publish locally with an authenticated
npm account using `npm publish --access public`. Publish only versions not already
present in the registry.

MIT — see [LICENSE](LICENSE).
