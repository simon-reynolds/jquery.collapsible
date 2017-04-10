(function ($) {

    var Collapsible = function ($obj, options) {
        this.$obj = $obj;
        this.options = options;
    };

    Collapsible.protoype = {
        init: function () {

        },

        isCollapsed: function () {

        },

        isExpanded: function () {

        }
    };

    $.fn.collapsible.defaults = {
        cssCollapsedHeader: ".collapsible-collapsed",
        cssExpandedHeader: ".collapsible-expanded",
        headerSelector: "h3",
        contentSelector: "div",
        onCollapsing: $.noop,
        onExpanding: $.noop,
        onCollapseComplete: $.noop,
        onExpandComplete: $.noop
    };

    $.fn.collapsible = function (options) {

        if (/^(collapse|expand)$/i.test(options)) {

        } else if (typeof options === "object" || !options) {
            return this.each(function () {
                options = $.extend({}, $.fn.collapsible.defaults, options);
                var collapsible = new Collapsible($(this), options);
                collapsible.init();
            });
        }

    };

})(jQuery);