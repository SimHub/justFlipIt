/*!
 * jQuery Plugin justFlipIt v2.0.0
 * https://github.com/SimHub/justFlipIts://github.com/SimHub/justFlipIt
 *
 * Copyright simon Lackmann
 * Released under the MIT license
 *
 * Date: 2019-25-07
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

(function($, window, document, undefined) {
  'use strict';

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  ////////////////// STYLE //////////////////////////////
  let style =
    '<style data-justflipitstyle="justFlipIt_One">' +
    '._justFlipIt_panel {perspective:1000px;-webkit-perspective:1000px;-moz-perspective:1000px;}' +
    '._justFlipIt_panel .front{height:inherit;width:inherit;position:absolute;top:0;z-index:900;-webkit-transform:rotateX(0) rotateX(0);-moz-transform:rotateX(0) rotateX(0);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}' +
    '._justFlipIt_panel .back{height:inherit;width:inherit;position:absolute;top:0;z-index:1000;-webkit-transform:rotateX(-180deg);-moz-transform:rotateX(-180deg);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}' +
    '._justFlipIt_panel._flip_ .front{z-index:900;-webkit-transform:rotateX(180deg);-moz-transform:rotateX(180deg)}' +
    '._justFlipIt_panel._flip_ .back{z-index:1000;-webkit-transform:rotateX(0) rotateX(0);-moz-transform:rotateX(0) rotateX(0)}' +
    '</style>';
  let styleY =
    '<style data-justflipitstyle="justFlipIt_Two">' +
    '._justFlipIt_panel .backY{height:inherit;width:inherit;position:absolute;top:0;z-index:1000;-webkit-transform:rotateY(-180deg);-moz-transform:rotateY(-180deg);-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-ms-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out;transition:all .4s ease-in-out}' +
    '._justFlipIt_panel._flipY_ .front{z-index:900;-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg)}' +
    '._justFlipIt_panel._flipY_ .backY{z-index:1000;-webkit-transform:rotateX(0) rotateY(0);-moz-transform:rotateX(0) rotateY(0)}' +
    '</style>';
  //// APPEND <style> INTO HEAD ////
  $('head').append(style + styleY);
  /////////////////////////////////////////////////////////////

  // Create the defaults once
  let pluginName = 'justFlipIt',
    defaults = {
      Template: '',
      Click: false,
      FlipX: false,
      Style: [],
    };

  // ClassName
  let backClass;
  let flipClass;
  let oldClassNames;
  let objElement = {};

  // Store Plugin name
  objElement.pluginName = pluginName;

  // DestroyName variable
  const _destroy = 'destroy';

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = $(element);
    this.elementWidth = window
      .getComputedStyle(this.element[0], null)
      .getPropertyValue('width');
    this.elementHeight = window
      .getComputedStyle(this.element[0], null)
      .getPropertyValue('height');
    this.elementBackgroundColor = window
      .getComputedStyle(this.element[0], null)
      .getPropertyValue('background-color');
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin

    // Store oldClasses
    oldClassNames = $(element).attr('class');
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.settings
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.settings).

      //Check if flip axis y is true
      if (this.settings.FlipX === true) {
        flipClass = '_flip_';
        backClass = 'back';
        objElement.frontClass = '_flip_';
        objElement.backClass = 'back';
        this._flipIt(backClass, flipClass);
      } else {
        flipClass = '_flipY_';
        backClass = 'backY';
        objElement.frontClass = '_flipY_';
        objElement.backClass = 'backY';
        this._flipIt(backClass, flipClass);
      }
    },
    _flipIt: function(backClass, flipClass) {
      //debugger;
      let originalClassName = this.element[0].className;
      objElement.orginalTagName = this.element[0].tagName.toLowerCase();
      objElement.oldClasses = originalClassName;
      objElement.orginalID = $(this.element[0]).attr('id');

      let originalElementRemovedClass = this.element.first().removeClass();

      let $hoverPanel = $(
        '<' + objElement.orginalTagName + ' class="hover _justFlipIt_panel">',
      );

      let $front = originalElementRemovedClass.wrap($hoverPanel);

      $front.wrap($('<div class="front">'));

      $(this.element[0].parentElement).addClass(originalClassName);

      let $panelWidth = this.elementWidth,
        $panelHeight = this.elementHeight,
        $panelBackgroundColor = this.elementBackgroundColor;

      let $clone = this.element
        .first()
        .clone()
        .removeClass();

      let $back = $(
        '<div class="' + backClass + ' ' + originalClassName + '">',
      ).append($clone);

      let selfParentHover = this.element.parent().parent();
      let findSelfParentHoverForEventHandler = this.element.closest('.hover');

      selfParentHover
        .css({
          width: $panelWidth,
          height: $panelHeight,
        })
        .append($back);

      // STYLE ELEMENTS OPTION//
      $.each(this.settings.Style, function(k, v) {
        {
          if (v.el) {
            if (v.el.toLowerCase() === 'self') {
              selfParentHover.css(v.style);
            } else {
              selfParentHover.find(v.el).css(v.style);
            }
          }
        }
      });

      ////REPLACE DEFAULT CONTENT////
      if (this.settings.Template !== '') {
        selfParentHover
          .find('.' + backClass)
          .removeClass(originalClassName)
          .html(this.settings.Template);
        //selfParentHover.find('.' + backClass).html(this.settings.Template);
      }

      ////ACTION
      if (this.settings.Click === true) {
        selfParentHover.on('click', function(e) {
          e.preventDefault();
          $(this).toggleClass(flipClass);
        });
      } else if (typeof this.settings.Click === 'string') {
        selfParentHover.find(this.settings.Click).on('click', function() {
          selfParentHover.toggleClass(flipClass);
        });
      } else {
        selfParentHover
          .on('mouseenter', function() {
            $(this).addClass(flipClass);
          })
          .on('mouseleave', function() {
            $(this).removeClass(flipClass);
          });
      }
      objElement.settings = this.settings;
    },
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

  $.fn[_destroy] = function() {
    // debugger;
    this.each(function(k, i) {
      let self;
      let orginalID = $(i).attr('id') !== undefined ? $(i).attr('id') : '';
      let orginalClass = $(i).attr('class');
      if ($(this).hasClass('front')) {
        self = $(this);
      } else {
        self = $(this).find('.front');
      }
      self.unwrap();
      self.next().remove();
      $(self.firstChild)
        .attr('class', objElement.oldClasses)
        .unwrap();
      self.removeData('plugin_' + pluginName);
    });
  };
})(jQuery, window, document);
