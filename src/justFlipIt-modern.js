/*!
 * justFlipIt v3.1.0
 * https://github.com/SimHub/justFlipIt
 *
 * Copyright SimHub
 * Released under the MIT license
 *
 * Date: 2025
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.justFlipIt = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Feature detection
  const supportsGrid = typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("display", "grid");
  const supportsWebAnimations = typeof Element !== "undefined" &&
    "animate" in Element.prototype;
  const supportsCustomProperties = window.CSS && CSS.supports &&
    CSS.supports("color", "var(--test)");

  // Style generation based on browser support
  function generateStyles() {
    // Base styles that work everywhere
    let baseStyles =
      "._justFlipIt_panel {perspective:1000px;-webkit-perspective:1000px;-moz-perspective:1000px;position:relative;}" +
      "._justFlipIt_panel .front{height:inherit;width:inherit;position:absolute;top:0;z-index:900;transform-style:preserve-3d;backface-visibility:hidden;transition:transform .4s ease-in-out;}" +
      "._justFlipIt_panel .back, ._justFlipIt_panel .backY{height:inherit;width:inherit;position:absolute;top:0;z-index:1000;transform-style:preserve-3d;backface-visibility:hidden;transition:transform .4s ease-in-out;}";

    // Add prefixed versions for older browsers
    let prefixedStyles =
      "._justFlipIt_panel .front{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:transform .4s ease-in-out;-moz-transition:transform .4s ease-in-out;}" +
      "._justFlipIt_panel .back, ._justFlipIt_panel .backY{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:transform .4s ease-in-out;-moz-transition:transform .4s ease-in-out;}";

    // X-axis rotations
    let xAxisStyles =
      "._justFlipIt_panel .back{transform:rotateX(-180deg);-webkit-transform:rotateX(-180deg);-moz-transform:rotateX(-180deg);}" +
      "._justFlipIt_panel._flip_ .front{transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-moz-transform:rotateX(180deg);}" +
      "._justFlipIt_panel._flip_ .back{transform:rotateX(0);-webkit-transform:rotateX(0);-moz-transform:rotateX(0);}";

    // Y-axis rotations
    let yAxisStyles =
      "._justFlipIt_panel .backY{transform:rotateY(-180deg);-webkit-transform:rotateY(-180deg);-moz-transform:rotateY(-180deg);}" +
      "._justFlipIt_panel._flipY_ .front{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);}" +
      "._justFlipIt_panel._flipY_ .backY{transform:rotateY(0);-webkit-transform:rotateY(0);-moz-transform:rotateY(0);}";

    // PATCH: Transparency-Style
    let transparentStyle =
      "._justFlipIt_panel {background: transparent !important; box-shadow: none !important;}" +
      "._justFlipIt_panel > * {box-sizing: border-box;}";

    return (
      baseStyles + prefixedStyles + xAxisStyles + yAxisStyles + transparentStyle
    );
  }

  // Add styles to document head
  function addStyles() {
    if (document.querySelector('[data-justflipitstyle="justFlipIt"]')) {
      return; // Styles already added
    }

    const styleElement = document.createElement("style");
    styleElement.setAttribute("data-justflipitstyle", "justFlipIt");
    styleElement.textContent = generateStyles();

    document.head.appendChild(styleElement);
  }

  // Helper functions to replace jQuery
  function getStyle(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }

  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += " " + className;
    }
  }

  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi",
        ),
        " ",
      );
    }
  }

  function toggleClass(element, className) {
    if (element.classList) {
      element.classList.toggle(className);
    } else {
      var classes = element.className.split(" ");
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      element.className = classes.join(" ");
    }
  }

  function hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp("(^| )" + className + "( |$)", "gi").test(
        element.className,
      );
    }
  }

  // NEU: Funktion zur Anwendung der benutzerdefinierten Animationseinstellungen
  function applyAnimationSettings(element, duration, easing) {
    const transitionValue = `transform ${duration / 1000}s ${easing}`;
    element.style.transition = transitionValue;
    element.style.WebkitTransition = transitionValue;
    element.style.MozTransition = transitionValue;
  }

  // PATCH: Verbesserte Style-Kopierfunktion
  function copyStyles(src, dest) {
    const computed = window.getComputedStyle(src);
    // Kopiere alle visuellen Eigenschaften
    const properties = [
      "background",
      "backgroundColor",
      "backgroundImage",
      "backgroundPosition",
      "backgroundRepeat",
      "backgroundSize",
      "borderRadius",
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
      "border",
      "borderTop",
      "borderRight",
      "borderBottom",
      "borderLeft",
      "boxShadow",
      "color",
      "opacity",
    ];
    properties.forEach((prop) => {
      if (
        computed[prop] &&
        computed[prop] !== "none" &&
        computed[prop] !== "initial" &&
        computed[prop] !== ""
      ) {
        dest.style[prop] = computed[prop];
      }
    });
  }

  // Modern animation with fallback
  function animateFlip(element, start, end, duration, easing = "ease-in-out") {
    if (supportsWebAnimations) {
      // Use Web Animations API
      const keyframes = [{ transform: start }, { transform: end }];

      const options = {
        duration: duration,
        easing: easing,
        fill: "forwards",
      };

      return element.animate(keyframes, options);
    } else {
      // Fallback to CSS transitions (already set in the CSS)
      element.style.transform = end;
      element.style.webkitTransform = end;
      element.style.mozTransform = end;
      return null;
    }
  }

  // Store for instances
  const instanceMap = new WeakMap();

  // Main justFlipIt class
  class JustFlipIt {
    constructor(element, options = {}) {
      // Make sure styles are added
      addStyles();

      this.element = element;
      this.settings = Object.assign(
        {},
        {
          Template: "", // Template for back side
          Click: false, // Click behavior
          FlipX: false, // Flip direction
          Style: [], // Custom styles
          Duration: 400, // Animation duration in ms
          Easing: "ease-in-out", // Animation easing function
          preserveClasses: true, // NEU
          preserveStyles: true, // NEU
        },
        options,
      );

      this.elementWidth = getStyle(element, "width");
      this.elementHeight = getStyle(element, "height");
      this.elementBackgroundColor = getStyle(element, "background-color");
      this.originalClassName = element.className;
      this.originalTagName = element.tagName.toLowerCase();
      this.originalId = element.id || "";

      // Set flip direction
      if (this.settings.FlipX === true) {
        this.flipClass = "_flip_";
        this.backClass = "back";
        this.rotateStart = "rotateX(0deg)";
        this.rotateFront = "rotateX(180deg)";
        this.rotateBack = "rotateX(-180deg)";
        this.rotateReset = "rotateX(0deg)";
      } else {
        this.flipClass = "_flipY_";
        this.backClass = "backY";
        this.rotateStart = "rotateY(0deg)";
        this.rotateFront = "rotateY(180deg)";
        this.rotateBack = "rotateY(-180deg)";
        this.rotateReset = "rotateY(0deg)";
      }

      // Initialize flip
      this._init();

      if (this.settings.Tilt) {
        this._setupTilt();
      }

      // Store instance
      instanceMap.set(element, this);
    }

    _init() {
      const originalElement = this.element;
      const originalClassName = this.originalClassName;

      // Panel-Struktur erzeugen
      const hoverPanel = document.createElement(this.originalTagName);
      addClass(hoverPanel, "hover");
      addClass(hoverPanel, "_justFlipIt_panel");
      const frontWrapper = document.createElement("div");
      addClass(frontWrapper, "front");
      const backWrapper = document.createElement("div");
      addClass(backWrapper, this.backClass);

      // NEU: Klassen übernehmen (Panel, .front, .backY)
      if (this.settings.preserveClasses && originalElement.classList.length) {
        originalElement.classList.forEach((cls) => {
          if (!hoverPanel.classList.contains(cls)) {
            hoverPanel.classList.add(cls);
          }
          if (frontWrapper && !frontWrapper.classList.contains(cls)) {
            frontWrapper.classList.add(cls);
          }
          if (backWrapper && !backWrapper.classList.contains(cls)) {
            backWrapper.classList.add(cls);
          }
        });
      }

      // NEU: Inline-Styles übernehmen (nur auf Panel)
      if (
        this.settings.preserveStyles && originalElement.getAttribute("style")
      ) {
        hoverPanel.setAttribute(
          "style",
          (hoverPanel.getAttribute("style") || "") +
          ";" + originalElement.getAttribute("style"),
        );
      }

      // Nur den INHALT übernehmen!
      frontWrapper.innerHTML = originalElement.innerHTML;

      if (this.settings.Template) {
        backWrapper.innerHTML = this.settings.Template;
      } else {
        backWrapper.innerHTML = originalElement.innerHTML;
      }

      // Panel einfügen und Original entfernen
      originalElement.parentNode.insertBefore(hoverPanel, originalElement);
      hoverPanel.appendChild(frontWrapper);
      hoverPanel.appendChild(backWrapper);
      originalElement.parentNode.removeChild(originalElement);

      // Panel-Größe und Styles übernehmen
      hoverPanel.style.width = this.elementWidth;
      hoverPanel.style.height = this.elementHeight;

      // Custom Styles aus Option anwenden
      if (this.settings.Style && this.settings.Style.length) {
        this.settings.Style.forEach((styleObj) => {
          if (styleObj.el) {
            if (styleObj.el.toLowerCase() === "self") {
              Object.assign(hoverPanel.style, styleObj.style);
            } else {
              const targetElements = hoverPanel.querySelectorAll(styleObj.el);
              targetElements.forEach((el) => {
                Object.assign(el.style, styleObj.style);
              });
            }
          }
        });
      }

      // Events setzen
      this._setupEvents(hoverPanel);

      // Referenzen speichern
      this.hoverPanel = hoverPanel;
      this.frontWrapper = frontWrapper;
      this.backWrapper = backWrapper;
    }

    _setupTilt() {
      this.hoverPanel.addEventListener("mousemove", (e) => {
        const rect = this.hoverPanel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = (-(x - centerX) / centerX) * 10;

        this.hoverPanel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      this.hoverPanel.addEventListener("mouseenter", () => {
        this.hoverPanel.style.transition = "all 0.2s ease-out";
      });

      this.hoverPanel.addEventListener("mouseleave", () => {
        this.hoverPanel.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        this.hoverPanel.style.transition = "all 0.5s ease-in-out";
      });
    }

    _setupEvents(hoverPanel) {
      if (this.settings.Tilt === 'only') return;
      if (this.settings.Click === true) {
        hoverPanel.addEventListener("click", (e) => {
          e.preventDefault();
          this._toggleFlip();
        });
      } else if (typeof this.settings.Click === "string") {
        const clickElements = hoverPanel.querySelectorAll(this.settings.Click);
        clickElements.forEach((el) => {
          el.addEventListener("click", () => {
            this._toggleFlip();
          });
        });
      } else {
        // Default hover behavior
        hoverPanel.addEventListener("mouseenter", () => {
          this._flip(true);
        });
        hoverPanel.addEventListener("mouseleave", () => {
          this._flip(false);
        });
      }
    }

    _toggleFlip() {
      const isFlipped = hasClass(this.hoverPanel, this.flipClass);
      this._flip(!isFlipped);
    }

    _flip(shouldFlip) {
      if (shouldFlip) {
        addClass(this.hoverPanel, this.flipClass);
        if (supportsWebAnimations) {
          animateFlip(
            this.frontWrapper,
            this.rotateStart,
            this.rotateFront,
            this.settings.Duration,
            this.settings.Easing,
          );
          animateFlip(
            this.backWrapper,
            this.rotateBack,
            this.rotateReset,
            this.settings.Duration,
            this.settings.Easing,
          );
        }
      } else {
        removeClass(this.hoverPanel, this.flipClass);
        if (supportsWebAnimations) {
          animateFlip(
            this.frontWrapper,
            this.rotateFront,
            this.rotateStart,
            this.settings.Duration,
            this.settings.Easing,
          );
          animateFlip(
            this.backWrapper,
            this.rotateReset,
            this.rotateBack,
            this.settings.Duration,
            this.settings.Easing,
          );
        }
      }
    }

    destroy() {
      const hoverPanel = this.hoverPanel;
      const originalElement = hoverPanel.querySelector(".front > *");

      // Restore original classes
      originalElement.className = this.originalClassName;

      // Put the original element back in its place
      hoverPanel.parentNode.insertBefore(originalElement, hoverPanel);
      hoverPanel.parentNode.removeChild(hoverPanel);

      // Remove from instance map
      instanceMap.delete(this.element);
    }
  }

  // Main function to initialize justFlipIt
  function justFlipIt(selector, options = {}) {
    if (typeof selector === "string") {
      // If selector is a string, find all matching elements
      const elements = document.querySelectorAll(selector);
      return Array.from(elements).map((el) => {
        return new JustFlipIt(el, options);
      });
    } else if (selector instanceof Element) {
      // If selector is a DOM element
      return new JustFlipIt(selector, options);
    } else if (selector.length) {
      // If selector is array-like (NodeList, HTMLCollection, etc.)
      return Array.from(selector).map((el) => {
        return new JustFlipIt(el, options);
      });
    }
  }

  // Destroy method
  justFlipIt.destroy = function (selector) {
    if (typeof selector === "string") {
      // If selector is a string, find all matching elements
      const elements = document.querySelectorAll(selector);
      Array.from(elements).forEach((el) => {
        const instance = instanceMap.get(el);
        if (instance) instance.destroy();
      });
    } else if (selector instanceof Element) {
      // If selector is a DOM element
      const instance = instanceMap.get(selector);
      if (instance) instance.destroy();
    } else if (selector.length) {
      // If selector is array-like (NodeList, HTMLCollection, etc.)
      Array.from(selector).forEach((el) => {
        const instance = instanceMap.get(el);
        if (instance) instance.destroy();
      });
    }
  };

  return justFlipIt;
});
