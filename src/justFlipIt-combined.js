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
    define(["jquery"], function (jQuery) {
      return factory(jQuery || root.jQuery || root.$);
    });
  } else if (typeof module === "object" && module.exports) {
    var jQuery = typeof window !== "undefined" ? window.jQuery : undefined;
    if (!jQuery) {
      try {
        jQuery = require("jquery");
      } catch (e) {
        jQuery = null;
      }
    }
    module.exports = factory(jQuery);
  } else {
    root.justFlipIt = factory(root.jQuery || root.$);
  }
})(typeof self !== "undefined" ? self : this, function (jQuery) {
  "use strict";

  // PATCH: Verbesserte Style-Kopierfunktion
  function copyStyles(src, dest) {
    const computed = window.getComputedStyle(src);
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
    properties.forEach(function (prop) {
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

  // NEU: Funktion zur Anwendung der benutzerdefinierten Animationseinstellungen
  function applyAnimationSettings(element, duration, easing) {
    const transitionValue = `all ${duration / 1000}s ${easing}`;
    element.style.transition = transitionValue;
    element.style.WebkitTransition = transitionValue;
    element.style.MozTransition = transitionValue;
    element.style.msTransition = transitionValue;
    element.style.OTransition = transitionValue;
  }

  function addStyles() {
    if (document.querySelector('[data-justflipitstyle="justFlipIt_One"]')) {
      return;
    }
    const styleX = document.createElement("style");
    styleX.setAttribute("data-justflipitstyle", "justFlipIt_One");
    styleX.textContent =
      "._justFlipIt_panel {perspective:1000px;-webkit-perspective:1000px;-moz-perspective:1000px;}" +
      "._justFlipIt_panel .front{height:inherit;width:inherit;position:absolute;top:0;z-index:900;-webkit-transform:rotateX(0) rotateX(0);-moz-transform:rotateX(0) rotateX(0);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}" +
      "._justFlipIt_panel .back{height:inherit;width:inherit;position:absolute;top:0;z-index:1000;-webkit-transform:rotateX(-180deg);-moz-transform:rotateX(-180deg);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}" +
      "._justFlipIt_panel._flip_ .front{z-index:900;-webkit-transform:rotateX(180deg);-moz-transform:rotateX(180deg)}" +
      "._justFlipIt_panel._flip_ .back{z-index:1000;-webkit-transform:rotateX(0) rotateX(0);-moz-transform:rotateX(0) rotateX(0)}";
    const styleY = document.createElement("style");
    styleY.setAttribute("data-justflipitstyle", "justFlipIt_Two");
    styleY.textContent =
      "._justFlipIt_panel .backY{height:inherit;width:inherit;position:absolute;top:0;z-index:1000;-webkit-transform:rotateY(-180deg);-moz-transform:rotateY(-180deg);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}" +
      "._justFlipIt_panel._flipY_ .front{z-index:900;-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg)}" +
      "._justFlipIt_panel._flipY_ .backY{z-index:1000;-webkit-transform:rotateX(0) rotateY(0);-moz-transform:rotateX(0) rotateY(0)}";
    const styleTransparent = document.createElement("style");
    styleTransparent.setAttribute(
      "data-justflipitstyle",
      "justFlipIt_Transparent",
    );
    styleTransparent.textContent =
      "._justFlipIt_panel {background: transparent !important; box-shadow: none !important;}" +
      "._justFlipIt_panel > * {box-sizing: border-box;}";
    document.head.appendChild(styleX);
    document.head.appendChild(styleY);
    document.head.appendChild(styleTransparent);
  }

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

  const instanceMap = new WeakMap();

  class JustFlipIt {
    constructor(element, options = {}) {
      addStyles();
      this.element = element;
      this.settings = Object.assign(
        {},
        {
          Template: "",
          Click: false,
          FlipX: false,
          Style: [],
          // NEU: Standard-Animationsoptionen
          Duration: 400,
          Easing: "ease-in-out",
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
      if (this.settings.FlipX === true) {
        this.flipClass = "_flip_";
        this.backClass = "back";
      } else {
        this.flipClass = "_flipY_";
        this.backClass = "backY";
      }
      this._init();
      if (this.settings.Tilt) {
        this._setupTilt();
      }
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
          toggleClass(hoverPanel, this.flipClass);
        });
      } else if (typeof this.settings.Click === "string") {
        const clickElements = hoverPanel.querySelectorAll(this.settings.Click);
        clickElements.forEach((el) => {
          el.addEventListener("click", () => {
            toggleClass(hoverPanel, this.flipClass);
          });
        });
      } else {
        hoverPanel.addEventListener("mouseenter", () => {
          addClass(hoverPanel, this.flipClass);
        });
        hoverPanel.addEventListener("mouseleave", () => {
          removeClass(hoverPanel, this.flipClass);
        });
      }
    }

    destroy() {
      const hoverPanel = this.hoverPanel;
      const originalElement = hoverPanel.querySelector(".front > *");
      originalElement.className = this.originalClassName;
      hoverPanel.parentNode.insertBefore(originalElement, hoverPanel);
      hoverPanel.parentNode.removeChild(hoverPanel);
      instanceMap.delete(this.element);
    }
  }

  // Vanilla/JS API
  function justFlipIt(selector, options = {}) {
    if (typeof selector === "string") {
      const elements = document.querySelectorAll(selector);
      return Array.from(elements).map((el) => new JustFlipIt(el, options));
    } else if (selector instanceof Element) {
      return new JustFlipIt(selector, options);
    } else if (selector.length) {
      return Array.from(selector).map((el) => new JustFlipIt(el, options));
    }
  }

  justFlipIt.destroy = function (selector) {
    if (typeof selector === "string") {
      const elements = document.querySelectorAll(selector);
      Array.from(elements).forEach((el) => {
        const instance = instanceMap.get(el);
        if (instance) instance.destroy();
      });
    } else if (selector instanceof Element) {
      const instance = instanceMap.get(selector);
      if (instance) instance.destroy();
    } else if (selector.length) {
      Array.from(selector).forEach((el) => {
        const instance = instanceMap.get(el);
        if (instance) instance.destroy();
      });
    }
  };

  // jQuery-Plugin API
  if (jQuery) {
    jQuery.fn.justFlipIt = function (options) {
      return this.each(function () {
        if (!jQuery.data(this, "plugin_justFlipIt")) {
          jQuery.data(this, "plugin_justFlipIt", new JustFlipIt(this, options));
        }
      });
    };

    jQuery.fn.destroy = function () {
      return this.each(function () {
        const instance = instanceMap.get(this);
        if (instance) {
          instance.destroy();
          jQuery.removeData(this, "plugin_justFlipIt");
        }
      });
    };

    // jQuery-API als Haupt-Export
    var api = function (selector, options) {
      if (typeof selector === "string") {
        return jQuery(selector).justFlipIt(options);
      } else if (selector instanceof Element) {
        return jQuery(selector).justFlipIt(options);
      } else if (selector instanceof jQuery) {
        return selector.justFlipIt(options);
      }
    };
    api.destroy = function (selector) {
      if (typeof selector === "string") {
        jQuery(selector).destroy();
      } else if (selector instanceof Element) {
        jQuery(selector).destroy();
      } else if (selector instanceof jQuery) {
        selector.destroy();
      }
    };
    return api;
  }

  // Vanilla-API als Fallback
  return justFlipIt;
});
