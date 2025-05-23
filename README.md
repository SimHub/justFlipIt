# justFlipIt

A lightweight JavaScript library that allows you to implement CSS3 based flip animations on any DOM elements.

## Features

- Works with or without jQuery
- Multiple import methods (script tag, npm, ES modules)
- Lightweight and fast
- Compatible with all modern browsers and legacy browsers (with fallbacks)
- Uses modern Web Animations API when available
- Easy to customize with CSS

## Optionen

- Template: (String) HTML-Inhalt für die Rückseite. Wenn leer, wird das Originalelement geklont.
- Click: (Boolean oder String) true für Flip bei Klick auf das Panel, oder ein CSS-Selektor für Flip bei Klick auf bestimmte Elemente. Standard: false (Flip bei Hover).
- FlipX: (Boolean) true für Flip um die X-Achse (vertikal), false für Flip um die Y-Achse (horizontal). Standard: false.
- Style: (Array) Array von Style-Objekten, um Styles auf das Panel oder bestimmte Elemente darin anzuwenden. Jedes Objekt hat:
  - el: "self" oder ein CSS-Selektor (z.B. "self", ".front", ".back")
  - style: Ein Objekt mit CSS-Eigenschaften und -Werten.
- Duration: (Number) Dauer der Flip-Animation in Millisekunden. Standard: 400.
- Easing: (String) CSS-Easing-Funktion für die Animation. Standard: "ease-in-out". Mögliche Werte z.B. "linear", "ease", "ease-in", "ease-out", "cubic-bezier(0.1, 0.7, 1.0, 0.1)".

| Option   | Typ                 | Beschreibung                                                                                                                                                                                                                               | Standardwert           |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Template | String              | HTML-Inhalt für die Rückseite. Wenn leer, wird das Originalelement geklont.                                                                                                                                                                | -                      |
| Click    | Boolean oder String | true für Flip bei Klick auf das Panel, oder ein CSS-Selektor für Flip bei Klick auf bestimmte Elemente.                                                                                                                                    | false (Flip bei Hover) |
| FlipX    | Boolean             | true für Flip um die X-Achse (vertikal), false für Flip um die Y-Achse (horizontal).                                                                                                                                                       | false                  |
| Style    | Array               | Array von Style-Objekten, um Styles auf das Panel oder bestimmte Elemente darin anzuwenden. - Jedes Objekt hat: - el: "self" oder ein CSS-Selektor (z.B. "self", ".front", ".back") - style: Ein Objekt mit CSS-Eigenschaften und -Werten. |                        |
| Duration | Number              | Dauer der Flip-Animation in Millisekunden.                                                                                                                                                                                                 | 400                    |
| Easing   | String              | CSS-Easing-Funktion für die Animation, z.B. "linear", "ease-in", "cubic-bezier(0.68, -0.55, 0.27, 1.55)".                                                                                                                                  | "ease-in-out"          |

## Installation

### NPM

```bash
npm install justflipit
```

### Verwendungsbeispiele

Vanilla JavaScript

```html
<div class="card">
  <h3>Vorderseite</h3>
  <p>Das ist die Vorderseite der Karte</p>
</div>

<script>
  // Einfachste Verwendung - Flip bei Hover
  justFlipIt(".card");
</script>
```

Mit jQuery

```html
<div class="card">
  <h3>Vorderseite</h3>
  <p>Das ist die Vorderseite der Karte</p>
</div>

<script>
  // Einfachste Verwendung mit jQuery
  $(".card").justFlipIt();
</script>
```

Anpassung der Animation

```html
<div class="card-slow">Langsamer Flip</div>
<div class="card-fast">Schneller Flip</div>
<div class="card-bounce">Bounce-Effekt</div>

<script>
  // Langsame Animation (1 Sekunde)
  justFlipIt(".card-slow", {
    Duration: 1000,
    Easing: "ease-in-out",
  });

  // Schnelle Animation (200ms)
  justFlipIt(".card-fast", {
    Duration: 200,
    Easing: "ease-out",
  });

  // Bounce-Effekt mit Cubic-Bezier
  justFlipIt(".card-bounce", {
    Duration: 800,
    Easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  });
</script>
```

Verschiedene Flip-Trigger

```html
<div class="card-hover">Hover für Flip</div>
<div class="card-click">Klick für Flip</div>
<div class="card-button">
  Karte mit Button
  <button class="flip-btn">Flip</button>
</div>

<script>
  // Standard: Flip bei Hover
  justFlipIt(".card-hover", {
    Duration: 500,
    Easing: "ease",
  });

  // Flip bei Klick auf die Karte
  justFlipIt(".card-click", {
    Click: true,
    Duration: 600,
    Easing: "ease-in-out",
  });

  // Flip bei Klick auf einen Button innerhalb der Karte
  justFlipIt(".card-button", {
    Click: ".flip-btn",
    Duration: 400,
    Easing: "linear",
  });
</script>
```

Anpassen der Rückseite

```html
<div class="card-template">Vorderseite mit Template</div>
<div class="card-clone">Vorderseite mit Klon</div>

<script>
  // Benutzerdefiniertes HTML für die Rückseite
  justFlipIt(".card-template", {
    Template:
      '<div class="back-content"><h3>Rückseite</h3><p>Benutzerdefinierter Inhalt für die Rückseite</p></div>',
    Duration: 700,
    Easing: "ease-out",
  });

  // Klonen der Vorderseite (Standard)
  justFlipIt(".card-clone", {
    Duration: 500,
    Easing: "ease-in-out",
  });
</script>
```

Flip-Richtung ändern

```html
<div class="card-horizontal">Horizontaler Flip (Y-Achse)</div>
<div class="card-vertical">Vertikaler Flip (X-Achse)</div>

<script>
  // Horizontal (Standard, um Y-Achse)
  justFlipIt(".card-horizontal", {
    FlipX: false,
    Duration: 600,
    Easing: "ease-in-out",
  });

  // Vertikal (um X-Achse)
  justFlipIt(".card-vertical", {
    FlipX: true,
    Duration: 600,
    Easing: "cubic-bezier(0.42, 0, 0.58, 1)",
  });
</script>
```

Benutzerdefinierte Stile anwenden

```html
<div class="card-styled">Karte mit benutzerdefinierten Stilen</div>

<script>
  justFlipIt(".card-styled", {
    Style: [
      {
        el: "self",
        style: {
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      },
      {
        el: ".front",
        style: {
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        },
      },
      {
        el: ".backY",
        style: {
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
          padding: "20px",
        },
      },
    ],
    Duration: 800,
    Easing: "ease-in-out",
  });
</script>
```

Komplexes Beispiel

```html
<div class="product-card">
  <img src="product.jpg" alt="Produkt" />
  <h3>Produktname</h3>
  <p>Kurze Beschreibung</p>
  <button class="details-btn">Details anzeigen</button>
</div>

<script>
  justFlipIt(".product-card", {
    Template: `
      <div class="product-details">
        <h3>Produktdetails</h3>
        <ul>
          <li>Eigenschaft 1: Wert</li>
          <li>Eigenschaft 2: Wert</li>
          <li>Eigenschaft 3: Wert</li>
        </ul>
        <p class="price">39,99 €</p>
        <button class="buy-btn">Kaufen</button>
        <button class="back-btn">Zurück</button>
      </div>
    `,
    Click: ".details-btn",
    FlipX: false,
    Duration: 800,
    Easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    Style: [
      {
        el: "self",
        style: {
          borderRadius: "8px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        },
      },
      {
        el: ".backY",
        style: {
          background: "#f8f9fa",
          padding: "15px",
        },
      },
    ],
  });

  // Zurück-Button auf der Rückseite
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("back-btn")) {
      const productCard = e.target.closest(".product-card");
      const panel = productCard.parentNode;
      panel.classList.toggle("_flipY_");
    }
  });
</script>
```

#### Verschiedene Bibliotheksversionen

justFlipIt bietet drei verschiedene Versionen, je nach Anforderungen:

### Vanilla Version (justFlipIt-vanilla.js)

Die Vanilla-Version ist unabhängig von externen Bibliotheken und verwendet CSS-Transitionen für die Animation.

```html
<script src="path/to/justFlipIt-vanilla.min.js"></script>
<script>
  justFlipIt(".card", {
    Duration: 600,
    Easing: "ease-out",
  });
</script>
```

### Modern Version (justFlipIt-modern.js)

Die moderne Version nutzt die Web Animations API für bessere Performance in modernen Browsern, mit Fallback zu CSS-Transitionen.

```html
<script src="path/to/justFlipIt-modern.min.js"></script>
<script>
  justFlipIt(".card", {
    Duration: 800,
    Easing: "cubic-bezier(0.42, 0, 0.58, 1)",
  });
</script>
```

### Combined Version (justFlipIt-combined.js)

Die kombinierte Version unterstützt sowohl jQuery als auch Vanilla JavaScript.

```html
<!-- Mit jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/justFlipIt-combined.min.js"></script>
<script>
  // jQuery-Methode
  $(".card").justFlipIt({
    Duration: 700,
    Easing: "ease-in-out",
  });

  // ODER Vanilla-Methode
  justFlipIt(".another-card", {
    Duration: 700,
    Easing: "ease-in-out",
  });
</script>
```
