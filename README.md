[![GitHub stars](https://img.shields.io/github/stars/SimHub/justFlipIt.svg?style=social)](https://github.com/SimHub/justFlipIt)
[![npm version](https://img.shields.io/npm/v/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)
[![npm downloads](https://img.shields.io/npm/dt/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)

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

## 🆕 Plug & Play: Automatic adoption of classes and styles

**This means:**

For example, you can simply

```js
justFlipIt(".daisyui-card");
```

and all colors, shadows, spacing, etc. are retained, whether you use Tailwind, daisyUI, Bootstrap or your own styles.

### **Options**

| Option          | Type | Standard | Description                                                         |
| --------------- | ---- | -------- | ------------------------------------------------------------------- |
| preserveClasses | Bool | true     | Takes all CSS classes from the original element to the panel        |
| preserveStyles  | Bool | true     | Takes over all inline styles from the original element to the panel |

**Example:**

```js
// Standard: Plug & Play
justFlipIt(".meine-karte");

// Optional: Nur Flip, keine Klassen/Styles übernehmen
justFlipIt(".meine-karte", { preserveClasses: false, preserveStyles: false });
```

---

## 🎨 Customizing (Erweitert)

You can use all options from justFlipIt as usual – e.g. your own templates, flip direction, animations, targeted styles:

```js
justFlipIt(".meine-karte", {
  preserveClasses: false, // keine Klassen übernehmen
  preserveStyles: false, // keine Inline-Styles übernehmen
  Click: true, // Flip bei Klick
  FlipX: true, // Flip um X-Achse (vertikal)
  Duration: 800, // Animationsdauer in ms
  Easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", // Animationseasing
  Template: "<div>Meine Rückseite!</div>", // Eigener Rückseiteninhalt
  Style: [
    {
      el: "self",
      style: {
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 2px 8px #0002",
      },
    },
    { el: ".front", style: { background: "#f5c939", color: "#222" } },
    { el: ".backY", style: { background: "#ca9dfe", color: "#fff" } },
  ],
});
```

**Tip:**

- With preserveClasses: false and preserveStyles: false you have full control and can style everything specifically via option or CSS.
- With the default values (true) everything remains like the original element – Plug & Play!

---

## Features

- ⚡ **Lightweight & Fast** – Minimal footprint, maximum performance
- 🎨 **Highly Customizable** – Style with CSS, custom animations, and templates
- 📱 **Modern & Responsive** – Works on all modern browsers and devices
- 🔧 **Flexible Import** – Use via script tag, npm, or ES modules
- 🎯 **jQuery Optional** – Works with or without jQuery
- 🎭 **Flip Animations** – Beautiful CSS3 transform-based effects
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

MIT © [SimHub](https://github.com/SimHub)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.

---

**[🌟 Star this project on GitHub](https://github.com/SimHub/justFlipIt)** | **[📦 View on NPM](https://www.npmjs.com/package/@simhub2/justflipit)**

---
