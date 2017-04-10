var collapsibleInstances = [];

(function ($) {

    var Collapsible = function ($obj, options) {
        this.$obj = $obj;
        this.options = options;

        this.$header = $obj.children(options.headerSelector);
        this.$content = $obj.children(options.contentSelector);
    };

    var getRandom = function () {
        return Math.random().toString().substring(2);
    };

    Collapsible.prototype = {

        handleHeaderClick: function (e) {
            var instanceId = $(this).data("collapsibleId");
            var instance = collapsibleInstances[instanceId];

            if (instance.isCollapsed()) {
                instance.expand();
            } else {
                instance.collapse();
            }
        },

        init: function () {

            this.$obj.addClass(this.options.cssWrapperSelector);
            this.$header.addClass(this.options.cssHeaderSelector);
            this.$content.addClass(this.options.cssContentSelector);

            this.$header.on("click", this.handleHeaderClick);
            this.collapse();


            // Save instance
            var instanceId = getRandom();
            this.$obj.data("collapsibleId", instanceId);
            this.$header.data("collapsibleId", instanceId);
            collapsibleInstances[instanceId] = this;
        },

        collapse: function () {
            this.options.onCollapsing();

            // Collapse
            this.$header.removeClass(this.options.cssExpandedHeader);
            this.$content.slideToggle("slow");
            this.$header.addClass(this.options.cssCollapsedHeader);

            this.options.onCollapseComplete();
        },

        expand: function () {
            this.options.onExpanding();

            // Expand
            this.$header.removeClass(this.options.cssCollapsedHeader);
            this.$content.slideToggle("slow");
            this.$header.addClass(this.options.cssExpandedHeader);

            this.options.onExpandComplete();
        },

        isCollapsed: function () {
            return this.$header.hasClass(this.options.cssCollapsedHeader);
        },

        isExpanded: function () {
            return this.$header.hasClass(this.options.cssExpandedHeader);
        }
    };

    $.fn.collapsible = function (options) {

        if (/^(collapse|expand|isCollapsed|isExpanded)$/i.test(options)) {

            this.each(function(){
                var instanceId = $(this).data("collapsibleId");
                var instance = collapsibleInstances[instanceId];

                if (!instance) {
                    instance = new Collapsible($(this), options);
                    instance.init();
                }

                var optionsLowerCase = options.toLowerCase();

                switch (optionsLowerCase) {
                    case "collapse":
                        return instance.collapse();
                    case "expand":
                        return instance.expand();
                    case "iscollapsed":
                        return instance.isCollapsed();
                    case "isexpanded":
                        return instance.isExpanded();
                    default:
                        throw "Unknown option";
                }
            });           


        } else if (typeof options === "object" || !options) {
            return this.each(function () {
                options = $.extend({}, $.fn.collapsible.defaults, options);
                var collapsible = new Collapsible($(this), options);
                collapsible.init();
            });
        }

    };

    $.fn.collapsible.defaults = {
        cssCollapsedHeader: "collapsible-collapsed",
        cssExpandedHeader: "collapsible-expanded",
        cssWrapperSelector: "collapsible-wrapper",
        cssHeaderSelector: "collapsible-header",
        cssContentSelector: "collapsible-content",
        headerSelector: "h3",
        contentSelector: "div",
        onCollapsing: $.noop,
        onExpanding: $.noop,
        onCollapseComplete: $.noop,
        onExpandComplete: $.noop,
        expandOnLoad: false
    };

})(jQuery);