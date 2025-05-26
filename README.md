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

## 🆕 Plug & Play: Automatisches Übernehmen von Klassen und Styles

Ab Version X übernimmt justFlipIt **automatisch alle CSS-Klassen und Inline-Styles** deines Elements auf das Flip-Panel.

**Das bedeutet:**  
Du kannst z.B. einfach

```js
justFlipIt(".daisyui-card");
```

aufrufen – und alle Farben, Schatten, Abstände usw. bleiben erhalten, egal ob du Tailwind, daisyUI, Bootstrap oder eigene Styles verwendest.

### **Optionen**

| Option          | Typ  | Standard | Beschreibung                                                   |
| --------------- | ---- | -------- | -------------------------------------------------------------- |
| preserveClasses | Bool | true     | Übernimmt alle CSS-Klassen vom Originalelement auf das Panel   |
| preserveStyles  | Bool | true     | Übernimmt alle Inline-Styles vom Originalelement auf das Panel |

**Beispiel:**

```js
// Standard: Plug & Play
justFlipIt(".meine-karte");

// Optional: Nur Flip, keine Klassen/Styles übernehmen
justFlipIt(".meine-karte", { preserveClasses: false, preserveStyles: false });
```

---

## 🎨 Customizing (Erweitert)

Du kannst alle Optionen von justFlipIt wie gewohnt nutzen – z.B. eigene Templates, Flip-Richtung, Animationen, gezielte Styles:

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

**Tipp:**

- Mit `preserveClasses: false` und `preserveStyles: false` hast du die volle Kontrolle und kannst alles gezielt per Option oder CSS stylen.
- Mit den Standardwerten (`true`) bleibt alles wie beim Originalelement – Plug & Play!

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

### Notes

- For more practical examples (hover, click, button, custom back, styling, vertical/horizontal, product card, etc.), see the [Live Demo](https://SimHub.github.io/justFlipIt/).
- The recommended CSS block above ensures robust, flicker-free, and responsive flip animations for all use cases.
- For questions or suggestions, feel free to open an issue or contribute!
