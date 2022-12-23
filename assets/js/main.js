// repeated variables

var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {

    "use strict";

    pagePilling();
    colorScheme();
    menuToggler();
    sliderOwlCarousel();
    swiperSlider();
    typedJS();
    portfolioPopup();
    $('.owl-item.active .hero-slide').addClass('zoom');


});


/*-------------------------
       Page Pilling
-------------------------*/
function pagePilling() {

    "use strict";

    var ids = [];
    var tooltips = [];
    var colors = [];
    $('.section').each(function () {
        ids.push(this.id);
        tooltips.push($(this).data("navigation-tooltip"));
        colors.push($(this).data("navigation-color"));
    });
    $('#pagepiling').pagepiling({
        sectionsColor: colors,
        anchors: ids,
        menu: '#myMenu',
        direction: 'vertical',
        verticalCentered: true,
        navigation: {
            'position': 'right',
            'tooltips': tooltips
        },
        loopBottom: true,
        loopTop: true,
        scrollingSpeed: 700,
        easing: 'swing',
        css3: true,
        normalScrollElements: '.owl-stage-outer',
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: true,
        //events
        onLeave: function (index, nextIndex, direction) { },
        afterLoad: function (anchorLink, index) { },
        afterRender: function () { },
    });
}

/*-------------------------
        Color Scheme
-------------------------*/
function colorScheme() {

    "use strict";

    $('.color-scheme').click(function () {
        $("body").toggleClass('dark');
        $('.section').toggleClass('bg-dark');
        $(this).children().toggleClass('lni-night lni-sun');
    });
}

/*-------------------------
    MENU TOGGLER
-------------------------*/
function menuToggler() {

    "use strict";

    $(".header-info-area").click(function () {
        $('.overlay-menu').toggleClass("show");
    });
}

function menuTogglerHome() {

    "use strict";

    $(".header-info-area").click(function () {
        $('.overlay-menu').toggleClass("show-home");
    });
}







