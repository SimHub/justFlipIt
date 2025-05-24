[![GitHub stars](https://img.shields.io/github/stars/SimHub/justFlipIt.svg?style=social)](https://github.com/SimHub/justFlipIt)
[![npm version](https://img.shields.io/npm/v/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)
[![npm downloads](https://img.shields.io/npm/dt/@simhub2/justflipit.svg)](https://www.npmjs.com/package/@simhub2/justflipit)

---

⚠️ **Important!**: JustFlipIt v3+ is maintained under [@simhub2/justflipit](https://www.npmjs.com/package/@simhub2/justflipit)
The old version (justflipit) is outdated and is no longer updated!

---

# justFlipIt

A lightweight JavaScript library that allows you to implement CSS3 based flip animations on any DOM elements.

## 🚀 [**Live Demo**](https://SimHub.github.io/justFlipIt/)

> **Try it out!** Click the link above to see justFlipIt in action with interactive examples.

## Features

- ⚡ **Lightweight & Fast** - Minimal footprint with maximum performance
- 🎨 **Highly Customizable** - Easy to style with CSS and customize animations
- 📱 **Modern Browser Support** - Works with all modern browsers and graceful fallbacks
- 🔧 **Multiple Import Methods** - Script tag, npm, ES modules - use however you prefer
- 🎯 **Works with or without jQuery** - Choose your preferred approach
- 🎭 **3D Flip Animations** - Beautiful CSS3 transform-based animations
- ⚙️ **Easy Configuration** - Simple options for duration, easing, triggers, and more

## Quick Start

### CDN (Easiest)

```html
<script src="<path to -> justFlipIt.min.js>"></script>
<script>
  justFlipIt(".my-card");
</script>
```

NPM

```bash
npm install @simhub2/justflipit
```

```javascript
import justFlipIt from "@simhub2/justflipit";
justFlipIt(".my-card");
```

## Basic Usage

```html
<div class="card">
  <h3>Front Side</h3>
  <p>Hover over me!</p>
</div>

<script>
  // Simple hover flip
  justFlipIt(".card");

  // Click to flip with custom settings
  justFlipIt(".card", {
    Click: true,
    Duration: 800,
    Easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  });
</script>
```

## API Reference

| Option   | Type              | Description                                                                       | Default       |
| -------- | ----------------- | --------------------------------------------------------------------------------- | ------------- |
| Template | String            | HTML content for the back side. If empty, the original element will be cloned.    | -             |
| Click    | Boolean or String | `true` for click on panel, or CSS selector for click on specific elements.        | false (hover) |
| FlipX    | Boolean           | `true` for flip around X-axis (vertical), `false` for Y-axis (horizontal).        | false         |
| Style    | Array             | Array of style objects to apply to panel or specific elements within it.          | []            |
| Duration | Number            | Duration of flip animation in milliseconds.                                       | 400           |
| Easing   | String            | CSS easing function for animation, e.g. "linear", "ease-in", "cubic-bezier(...)". | "ease-in-out" |

### Style Object Format

```javascript
{
  el: "self",  // "self" or CSS selector (e.g. ".front", ".back")
  style: {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  }
}
```

## Examples

### Hover Effects

```html
<div class="hover-card">Hover me!</div>
<script>
  justFlipIt(".hover-card", {
    Duration: 500,
    Easing: "ease-out",
  });
</script>
```

### Click Interactions

```html
<div class="click-card">Click me!</div>
<script>
  justFlipIt(".click-card", {
    Click: true,
    Duration: 600,
    Easing: "ease-in-out",
  });
</script>
```

### Custom Back Content

```html
<div class="custom-card">Front Content</div>
<script>
  justFlipIt(".custom-card", {
    Click: true,
    Template:
      '<div style="padding: 20px;"><h3>Back Side</h3><p>Custom content!</p></div>',
  });
</script>
```

### Button Trigger

```html
<div class="button-card">
  Card Content
  <button class="flip-btn">Flip</button>
</div>
<script>
  justFlipIt(".button-card", {
    Click: ".flip-btn",
    Duration: 500,
  });
</script>
```

### Bounce Effect

```html
<div class="bounce-card">Bounce Effect</div>
<script>
  justFlipIt(".bounce-card", {
    Click: true,
    Duration: 800,
    Easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  });
</script>
```

### Custom Styling

```html
<div class="styled-card">Styled Card</div>
<script>
  justFlipIt(".styled-card", {
    Style: [
      {
        el: "self",
        style: {
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        },
      },
      {
        el: ".front",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      },
      {
        el: ".backY",
        style: {
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
      },
    ],
  });
</script>
```

## Library Versions

justFlipIt offers three different versions to suit your needs:

### Vanilla Version

- **File**: `justFlipIt-vanilla.js` / `.min.js`
- **Dependencies**: None
- **Animation**: CSS Transitions
- **Use case**: Lightweight, no dependencies

### Modern Version

- **File**: `justFlipIt-modern.js` / `.min.js`
- **Dependencies**: None
- **Animation**: Web Animations API with CSS fallback
- **Use case**: Modern browsers, best performance

### Combined Version

- **File**: `justFlipIt-combined.js` / `.min.js`
- **Dependencies**: Optional jQuery support
- **Animation**: CSS Transitions
- **Use case**: jQuery and Vanilla JS compatibility

```html
<!-- Vanilla -->
<script src="justFlipIt-vanilla.min.js"></script>

<!-- Modern -->
<script src="justFlipIt-modern.min.js"></script>

<!-- Combined (with jQuery support) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="justFlipIt-combined.min.js"></script>
<script>
  // Both work:
  $(".card").justFlipIt();
  justFlipIt(".card");
</script>
```

## Advanced Example

```html
<div class="product-card">
  <img src="product.jpg" alt="Product" />
  <h3>Product Name</h3>
  <p>Short description</p>
  <button class="details-btn">Show Details</button>
</div>

<script>
  justFlipIt(".product-card", {
    Template: `
      <div class="product-details">
        <h3>Product Details</h3>
        <ul>
          <li>Feature 1: Value</li>
          <li>Feature 2: Value</li>
          <li>Feature 3: Value</li>
        </ul>
        <p class="price">$39.99</p>
        <button class="buy-btn">Buy Now</button>
        <button class="back-btn">Back</button>
      </div>
    `,
    Click: ".details-btn",
    Duration: 800,
    Easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    Style: [
      {
        el: "self",
        style: {
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },
      },
      {
        el: ".backY",
        style: {
          background: "#f8f9fa",
          padding: "20px",
        },
      },
    ],
  });

  // Handle back button
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("back-btn")) {
      const panel = e.target.closest("._justFlipIt_panel");
      if (panel) panel.classList.toggle("_flipY_");
    }
  });
</script>
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

### MIT License

Copyright (c) 2023 SimHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**[🌟 Star this project on GitHub](https://github.com/SimHub/justFlipIt)** | **[📦 View on NPM](https://www.npmjs.com/package/@simhub2/justflipit)** | \*\*
