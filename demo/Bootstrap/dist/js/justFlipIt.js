// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    var style = "<style>" +
        "/* justFlipIt ADDED STYLE 1 */ " +
        "  .panel {" +
        "  margin: 0 auto;" +
        "  position: relative;" +
        "  perspective:1000px;" +
        "  -webkit-perspective: 1000px;" +
        "  -moz-perspective: 1000px;" +
        "  /*border: 3px solid red;*/" +
        " }" +
        " .panel .front," +
        " .panel .back {" +
        " }" +
        " .panel .front {" +
        "     height: inherit;" +
        " position: absolute;" +
        " top: 0;" +
        " z-index: 900;" +
        " /*text-align: center;*/" +
        " -webkit-transform: rotateX(0deg) rotateX(0deg);" +
        " -moz-transform: rotateX(0deg) rotateX(0deg);" +
        " -webkit-transform-style: preserve-3d;" +
        " -moz-transform-style: preserve-3d;" +
        " -webkit-backface-visibility: hidden;" +
        " -moz-backface-visibility: hidden;" +
        " -webkit-transition: all .4s ease-in-out;" +
        " -moz-transition: all .4s ease-in-out;" +
        " -ms-transition: all .4s ease-in-out;" +
        " -o-transition: all .4s ease-in-out;" +
        " transition: all .4s ease-in-out;" +
        "}" +
        ".panel .back {" +
        " height: inherit;" +
        " position: absolute;" +
        " top: 0;" +
        " z-index: 1000;" +
        " -webkit-transform: rotateX(-180deg);" +
        " -moz-transform: rotateX(-180deg);" +
        " -webkit-transform-style: preserve-3d;" +
        " -moz-transform-style: preserve-3d;" +
        " -webkit-backface-visibility: hidden;" +
        " -moz-backface-visibility: hidden;" +
        " -webkit-transition: all .4s ease-in-out;" +
        " -moz-transition: all .4s ease-in-out;" +
        " -ms-transition: all .4s ease-in-out;" +
        " -o-transition: all .4s ease-in-out;" +
        " transition: all .4s ease-in-out;" +
        "}" +
        ".panel.flip .front {" +
        " z-index: 900;" +
        " -webkit-transform: rotateX(180deg);" +
        " -moz-transform: rotateX(180deg);" +
        "}" +
        ".panel.flip .back {" +
        "z-index: 1000;" +
        "-webkit-transform: rotateX(0deg) rotateX(0deg);" +
        "-moz-transform: rotateX(0deg) rotateX(0deg);" +
        "}</style>";


    var styleY = "<style>" +
        "/* justFlipIt ADDED STYLE 2 */ " +
        ".panel .backY {" +
        " height: inherit;" +
        " position: absolute;" +
        " top: 0;" +
        " z-index: 1000;" +

        " -webkit-transform: rotateY(-180deg);" +
        " -moz-transform: rotateY(-180deg);" +

        " -webkit-transform-style: preserve-3d;" +
        " -moz-transform-style: preserve-3d;" +
        " -webkit-backface-visibility: hidden;" +
        " -moz-backface-visibility: hidden;" +
        " -webkit-transition: all .4s ease-in-out;" +
        " -moz-transition: all .4s ease-in-out;" +
        " -ms-transition: all .4s ease-in-out;" +
        " -o-transition: all .4s ease-in-out;" +
        " transition: all .4s ease-in-out;" +
        "}" +

        ".panel.flipY .front {" +
        " z-index: 900;" +

        " -webkit-transform: rotateY(180deg);" +
        " -moz-transform: rotateY(180deg);" +
        "}" +

        ".panel.flipY .backY {" +
        "z-index: 1000;" +
        "-webkit-transform: rotateX(0deg) rotateY(0deg);" +
        "-moz-transform: rotateX(0deg) rotateY(0deg);" +
        "}</style>";

    $('head').append(style + styleY);


    // Create the defaults once
    var pluginName = "justFlipIt",
        defaults = {
            Template: "",
            Click: false,
            FlipX: false
        };


    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();


    }


    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            //console.log('first: ' + this.settings.FlipX);

            //check if flip achses y is true
            if (this.settings.FlipX === true) {
                var flipClass = 'flip';
                var backClass = 'back';
                this._filpIt(backClass, flipClass);
            }
            else {
                var flipClass = 'flipY';
                var backClass = 'backY';
                this._filpIt(backClass, flipClass);
            }

            //if (this.settings.FlipX === false) {
            //   var flipClass ='flipY';
            //    var backClass='backY';
            //   this._filpIt(backClass,flipClass);
            //}

        },

        _filpIt: function (backClass, flipClass) {

            var $hoverPanel =
                $('<div class="hover panel">').css({
                    'display': 'inline-block',
                    'width': this.element.css('width'),
                    'height': this.element.css('height')
                });


            var $front = this.element.wrap($hoverPanel);
            $front.wrap($('<div class="front">'));


            var $panelWidth = this.element.css('width'),
                $panelHeight = this.element.css('height'),
                $panelBackgroundColor = this.element.css("background-color");


            var $clone = this.element.first().clone();


            //var $hover = $('.hover');

            var $back = $('<div class="' + backClass + '">').append($clone);

            var selfParentHover = this.element.parent().parent();
            var findSelfParentHoverForEventHandler = this.element.closest('.hover');

            selfParentHover.css({
                'width': $panelWidth,
                'height': $panelHeight
            }).append($back);

            ////REPLACE DEFAULT CONTENT
            if (this.settings.Template !== "") {
                selfParentHover.find("." + backClass).html(this.settings.Template);
            }


            $back.css({
                'background': $panelBackgroundColor,
                'width': $panelWidth,
                'height': $panelHeight
            });


            ////ACTION
            if (this.settings.Click === true) {
                selfParentHover.on('click', function () {
                    $(this).toggleClass(flipClass);
                })
            }

            else if (typeof (this.settings.Click) === 'string') {
                selfParentHover.find(this.settings.Click).on('click', function () {
                    selfParentHover.toggleClass(flipClass);
                });
            }
            else {
                selfParentHover.on('mouseenter', function () {
                    $(this).addClass(flipClass);
                })
                    .on('mouseleave', function () {
                        $(this).removeClass(flipClass);
                    });
            }
        }
    });

// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }

        });

    };

})
(jQuery, window, document);