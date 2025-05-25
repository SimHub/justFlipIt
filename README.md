[![GitHub stars](https://img.shields.io/github/stars/SimHub/justFlipIt.svg?style=social)](https://github.com/SimHub/justFlipIt)
[![npm version](https://img.shields.io/npm/v/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)
[![npm downloads](https://img.shields.io/npm/dt/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)

---

⚠️ **Important!**: JustFlipIt v3+ is maintained under [@simhub2/justflipit](https://www.npmjs.com/package/@simhub2/justflipit)
The old version (justflipit) is outdated and is no longer updated!

---

# justFlipIt

A lightweight JavaScript library for beautiful, customizable flip animations on any DOM element.

---

## 🚀 [Live Demo & Examples](https://SimHub.github.io/justFlipIt/)

> **Try it out!**
> The interactive [Live Demo](https://SimHub.github.io/justFlipIt/) shows all features and use cases, responsive and ready to play with.

---

## Quick Start

**CDN / Local:**

```html
<script src="justFlipIt-modern.min.js"></script>
<script>
  justFlipIt(".my-card");
</script>
```

**NPM:**

```bash
npm install @simhub2/justflipit
```

```js
import justFlipIt from "@simhub2/justflipit";
justFlipIt(".my-card");
```

---

## 🛡️ Recommended CSS for Robust Flip Cards (Optional)

_This CSS block is **optional**, but highly recommended for best results – especially if you use custom content, styles, or want to ensure perfect flips on all browsers and devices._

```css
._justFlipIt_panel,
._justFlipIt_panel .front,
._justFlipIt_panel .back,
._justFlipIt_panel .backY {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  width: 100% !important;
  height: 100% !important;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}
._justFlipIt_panel .front > *,
._justFlipIt_panel .back > *,
._justFlipIt_panel .backY > * {
  width: 100%;
  box-sizing: border-box;
}
```

> \*\*You can skip this CSS for simple use cases.  
> For complex layouts, images, or maximum browser compatibility, adding it is strongly recommended.

---

## Features

- ⚡ **Lightweight & Fast** – Minimal footprint, maximum performance
- 🎨 **Highly Customizable** – Style with CSS, custom animations, and templates
- 📱 **Modern & Responsive** – Works on all modern browsers and devices
- 🔧 **Flexible Import** – Use via script tag, npm, or ES modules
- 🎯 **jQuery Optional** – Works with or without jQuery
- 🎭 **3D Flip Animations** – Beautiful CSS3 transform-based effects
- ⚙️ **Simple API** – Easy configuration for duration, easing, triggers, and more

---

## Minimal Examples

**Hover to flip:**

```html
<div class="card">Hover me!</div>
<script>
  justFlipIt(".card");
</script>
```

**Click to flip:**

```html
<div class="card">Click me!</div>
<script>
  justFlipIt(".card", { Click: true });
</script>
```

**Button trigger:**

```html
<div class="card">
  Card Content
  <button class="flip-btn">Flip</button>
</div>
<script>
  justFlipIt(".card", { Click: ".flip-btn" });
</script>
```

---

## Full API & Advanced Usage

See the [Live Demo](https://SimHub.github.io/justFlipIt/) for all options, advanced examples, and interactive playground.

---

## Library Versions

- **Vanilla:** `justFlipIt-vanilla.js` – No dependencies, CSS transitions
- **Modern:** `justFlipIt-modern.js` – No dependencies, Web Animations API + CSS fallback
- **Combined:** `justFlipIt-combined.js` – Optional jQuery support

---

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

---

## License

MIT License

Copyright (c) 2023 SimHub

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

**[🌟 Star this project on GitHub](https://github.com/SimHub/justFlipIt)** | **[📦 View on NPM](https://www.npmjs.com/package/@simhub2/justflipit)**

---

### Notes

- For more practical examples (hover, click, button, custom back, styling, vertical/horizontal, product card, etc.), see the [Live Demo](https://SimHub.github.io/justFlipIt/).
- The recommended CSS block above ensures robust, flicker-free, and responsive flip animations for all use cases.
- For questions or suggestions, feel free to open an issue or contribute!
