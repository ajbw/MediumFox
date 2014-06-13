/*
 *  Project: Squishy : padding parallax
 *  Description: Based on jQuery boilerplate, based on Victa/scrolly
 *  Author: Alexandra S.
 *  Licence: MIT
 */
(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'squishy',
        defaults = {
            minSquish: 50,
            squishFactor: 1.0,
            squishFade: 1.0
        },
        didScroll = false;

    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(this.element);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var self = this;
        this.height = this.$element.outerHeight(true);
        this.startPadding = (this.height-this.$element.height())/2;
        this.offsetTop = this.$element.offset().top;
        this.squishFactor = this.options.squishFactor;
        this.minSquish = this.options.minSquish;
        this.squishFade = this.options.squishFade;

        if (this.$element.attr('squish-factor')) {
            this.squishFactor = this.$element.attr('squish-factor');
        }

        if (this.$element.attr('min-squish')) {
            this.minSquish = parseInt(this.$element.attr('min-squish'), 10);
        }

        if (this.$element.attr('squish-fade')) {
            this.squishFade = this.$element.attr('squish-fade');
        }

        $(document).scroll(function(){
            self.didScroll = true;
        });

        setInterval(function() {
            if (self.didScroll) {
                self.didScroll = false;
                self.squishy();
            }
        }, 10);
    };

    Plugin.prototype.squishy = function() {
        var dT =  $(window).scrollTop();
        var padding = this.startPadding - dT * this.squishFactor;

        if (padding < this.minSquish) {
            padding = this.minSquish;
        }

        var opacity = (padding / this.startPadding);

        if (opacity < this.squishFade) {
            opacity = this.squishFade;
        }

        this.$element.css({'padding-top': padding+'px'});
        this.$element.children().css({'opacity': opacity});
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document);
