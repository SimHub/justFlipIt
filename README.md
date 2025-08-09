[![GitHub stars](https://img.shields.io/github/stars/SimHub/justFlipIt.svg?style=social)](https://github.com/SimHub/justFlipIt)
[![npm version](https://img.shields.io/npm/v/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)
[![npm downloads](https://img.shields.io/npm/dt/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)  
[![Buy me a coffee](https://img.shields.io/badge/-buy_me_a_coffee-yellow?style=flat&social&logo=buymeacoffee&logoColor=white&labelColor=black)](https://www.buymeacoffee.com/simhub)

# justFlipIt

A lightweight JavaScript library for beautiful, customizable flip and tilt animations on any DOM element.

---

### 🚀 [Live Demo & Examples](https://SimHub.github.io/justFlipIt/)

> **Try it out!**  
> The interactive [Live Demo](https://SimHub.github.io/justFlipIt/) shows all features and use cases.

---

### ✨ Features

- **Plug & Play**: Automatically adopts classes and styles for seamless integration.
- **3D Tilt Effect**: Adds an interactive 3D tilt effect on hover and touch.
- **Lightweight & Fast**: Minimal footprint, maximum performance.
- **Highly Customizable**: Use your own styles, templates, and animations.
- **Modern & Responsive**: Works on all modern browsers and devices.
- **Flexible**: Use via CDN, NPM, or ES modules.

---

### 📦 Installation

**CDN / Local:**

```html
<script src="https://unpkg.com/@simhub2/justflipit/dist/justFlipIt-modern.min.js"></script>
```

**NPM:**

```bash
npm install @simhub2/justflipit
```

```js
import justFlipIt from "@simhub2/justflipit";
```

---

### ▶️ Usage

Initialize the flip effect on your elements. The default trigger is **hover**.

**Hover to Flip (Default)**

```html
<div class="card">Hover me!</div>

<script>
  justFlipIt(".card");
</script>
```

**Click to Flip**

```js
justFlipIt(".card", { Click: true });
```

**Enable Tilt Effect**

```js
// Enable with default settings
justFlipIt(".card", { Tilt: true });

// Customize tilt
justFlipIt(".card", {
  Tilt: {
    max: 15,
    perspective: 800,
  },
});
```

---

### ⚙️ Options

Customize the behavior with these options.

| Option            | Type             | Default       | Description                                                      |
| ----------------- | ---------------- | ------------- | ---------------------------------------------------------------- |
| `Tilt`            | Boolean / Object | `false`       | Enables a 3D tilt effect. Customize with `{ max, perspective }`. |
| `Click`           | Boolean / String | `false`       | `true` for click trigger, or a selector for a custom trigger.    |
| `FlipX`           | Boolean          | `false`       | `true` for vertical flip (around X-axis).                        |
| `Template`        | String           | `null`        | HTML content for the back side.                                  |
| `preserveClasses` | Boolean          | `true`        | Inherit all CSS classes from the original element.               |
| `preserveStyles`  | Boolean          | `true`        | Inherit all inline styles from the original element.             |
| `Duration`        | Number           | `400`         | Animation duration in ms.                                        |
| `Easing`          | String           | `ease-in-out` | CSS easing function for the animation.                           |
| `Style`           | Array            | `[]`          | Apply custom styles to the flip panels (see demo).               |

<details>
<summary><b>Advanced Example</b></summary>

```js
justFlipIt(".card", {
  preserveClasses: false, // Start with a clean slate
  Click: true,
  FlipX: true,
  Tilt: true,
  Duration: 800,
  Easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  Template: "<div>My custom back side!</div>",
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

</details>

---

### Versions & Compatibility

- **modern**: `justFlipIt-modern.js` (Recommended, uses Web Animations API)
- **vanilla**: `justFlipIt-vanilla.js` (CSS transitions only)
- **combined**: `justFlipIt-combined.js` (Optional jQuery support)

**Browser Support:**

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

---

### License

Released under the **[MIT License](https://opensource.org/licenses/MIT)**.

You are free to use, modify, and distribute this project, even for commercial purposes. All that is required is to include the original copyright and license notice in any copy of the software/source.

---
