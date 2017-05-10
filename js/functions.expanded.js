var HC = window.HC || {};
HC.accordion = (function (HC, $) {
    var process = {
        init: function () {
            var that = this;
            if ($('.accord').length > 0) {
                that.addClickHandlers();
            }
        },
        addClickHandlers: function () {
            var that = this;
            $('.accord-head').click(that.clickHandler);
        },
        clickHandler: function (e) {
            var that = HC.accordion;
            var accordionHead = $(e.target);
            var headerParent = accordionHead.parent().parent();
            var accordionContent = headerParent.find('.accord-content');
            if (headerParent.hasClass('accord-expanded')) {
                that.hideContent(accordionContent);
                
            } else {
                that.showContent(accordionContent);
                
            }
        },
        showContent: function (accordionContent) {
            var headerParent = accordionContent.parent();
            accordionContent.slideDown();
            headerParent.addClass('accord-expanded');
            accordionContent.attr('aria-expanded', 'true');
        },
        hideContent: function (accordionContent) {
            var headerParent = accordionContent.parent();
            accordionContent.slideUp();
            headerParent.removeClass('accord-expanded');
            accordionContent.attr('aria-expanded', 'false');
        }

    };
    return process;
})(HC, $);

HC.accordion.init();