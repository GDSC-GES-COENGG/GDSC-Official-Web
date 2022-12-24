////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//$(document).ready(function($) {
$(function () {
  "use strict";

  //  Variables ----------------------------------------------------------------------------------------------------------

  var sceneMaxSize = $(window).width() * 3;
  var selectedTranslateX,
    selectedTranslateY,
    selectedRotation,
    selectedTranslateZ,
    selectedImage,
    nextImage,
    prevImage;
  var animationFinished = true;
  var $dragging = null;
  var firstClickPositionX;
  var firstClickPositionY;
  var pageWrapperLastPositionX;
  var pageWrapperLastPositionY;
  var moveX = 0;
  var moveY = 0;

  var $slide = $(".slide");
  var $body = $("body");
  var $outerWrapper = $(".outer-wrapper");
  var $videoPopup = $(".video-popup");

  //  Pace loading screen ------------------------------------------------------------------------------------------------

  if ($(".loading-overlay").length > 0) {
    Pace.on("done", function () {
      setTimeout(function () {
        $(".loading-overlay").css("display", "none");
      }, 950);
    });
  }

  //  3D Parallax Slider -------------------------------------------------------------------------------------------------

  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  $(".inner-wrapper .slide").each(function (e) {
    var htmlCode;
    if (e === 0) {
      htmlCode =
        '<div class="item"><a class="active" href="#' +
        $(this).attr("id") +
        '">' +
        (e + 1) +
        '<span style="background-image: url(' +
        $(this).find(".image").attr("data-background") +
        ')"></span></a></div>';
    } else {
      htmlCode =
        '<div class="item"><a href="#' +
        $(this).attr("id") +
        '">' +
        (e + 1) +
        '<span style="background-image: url(' +
        $(this).find(".image").attr("data-background") +
        ')"></span></a></div>';
    }
    $(".slider-pager").append(htmlCode);
  });

  $(".slide:not(.first)").each(function () {
    $(this).attr("data-position-x", randomNumber("position", sceneMaxSize));
    $(this).css("left", $(this).attr("data-position-x") + "px");
    $(this).attr("data-position-y", randomNumber("position", sceneMaxSize));
    $(this).css("top", $(this).attr("data-position-y") + "px");
    $(this).attr("data-position-z", randomNumber("position", 2000));
    $(this).attr("data-rotation", randomNumber("rotation", null));
    $(this).css(
      "transform",
      "rotateZ(" +
        $(this).attr("data-rotation") +
        "deg) translateZ(" +
        $(this).attr("data-position-z") +
        "px)"
    );
  });

  $(".slider-pager a").on("click", function (e) {
    e.preventDefault();
    $(".animate").removeClass("idle");
    play($(this).attr("href"));
  });

  selectedImage = $(".slide.first")[0];
  selectedTranslateX = 0;
  selectedTranslateY = 0;

  $(".next").on("click", function () {
    $(".animate").removeClass("idle");
    if ($(selectedImage).next().length) {
      nextImage = "#" + $(selectedImage).next()[0].id;
      play(nextImage);
    } else {
      nextImage = "#" + $slide.first()[0].id;
      play(nextImage);
    }
  });

  $(".prev").on("click", function (e) {
    $(".animate").removeClass("idle");
    e.preventDefault();
    if ($(selectedImage).prev().length) {
      prevImage = "#" + $(selectedImage).prev()[0].id;
      play(prevImage);
    } else {
      prevImage = "#" + $slide.last()[0].id;
      play(prevImage);
    }
  });

  $slide.on("dragstart", function (event) {
    event.preventDefault();
  });

  function play(_this) {
    animationFinished = false;
    $body.removeClass("zoomed-out");
    $slide.removeClass("active");
    $(".slider-pager a").removeClass("active");
    $(".slider-pager a[href='" + _this + "']").addClass("active");

    $(".slide.first .main-title").css("opacity", 0.5);
    $(".slide .image").each(function (e) {
      var $this = $(this);
      setTimeout(function () {
        $this.css("opacity", 0.5);
      }, e * 40);
    });

    selectedTranslateX = $(_this).attr("data-position-x") * -1;
    selectedTranslateY = $(_this).attr("data-position-y") * -1;
    selectedTranslateZ = $(_this).attr("data-position-z") * -1;
    selectedRotation = $(_this).attr("data-rotation") * -1;
    selectedImage = $(_this);

    $(".inner-wrapper").css({
      transform:
        "translateZ(-" +
        sceneMaxSize / 1.5 +
        "px) translateX(" +
        selectedTranslateX +
        "px) translateY(" +
        selectedTranslateY +
        "px)",
    });

    selectedImage.addClass("active");
    $(".slide:not(.active)").css("pointer-events", "none");
    $(".slide.active").css("pointer-events", "auto");

    setTimeout(function () {
      $(".slide .image").css("opacity", 0);
      selectedImage.find(".image").css("opacity", 1);
      selectedImage.find(".main-title").css("opacity", 1);
      $(".inner-wrapper").css({
        transform:
          "translateZ(" +
          selectedTranslateZ +
          "px) translateX(" +
          selectedTranslateX +
          "px) translateY(" +
          selectedTranslateY +
          "px)",
      });
      $outerWrapper.css({ transform: "rotateZ(" + selectedRotation + "deg)" });
    }, 1000);

    setTimeout(function () {
      $(selectedImage)
        .find(".animate")
        .each(function (e) {
          var $this = $(this);
          setTimeout(function () {
            $this.addClass("idle");
          }, e * 100);
        });
      animationFinished = true;
      $(".slide:not(.active) .image").css("opacity", "0");
      $(".slide:not(.active) .main-title").css("opacity", "0");
      $(".slide:not(.active)").addClass("hide-description");
    }, 1500);
  }

  function randomNumber(method, sceneMaxSize) {
    if (method === "position") {
      return Math.floor(Math.random() * sceneMaxSize) - sceneMaxSize / 2;
    } else if (method === "rotation") {
      return Math.floor(Math.random() * 90) + 10;
    } else {
      return false;
    }
  }

  $slide.on("click", function () {
    var _this = "#" + $(this).attr("id");
    if ($body.hasClass("zoomed-out")) {
      play(_this);
    }
  });

  $(".zoom-out").on("click", function (e) {
    e.preventDefault();
    $(".animate").removeClass("idle");
    $(".inner-wrapper").css(
      "transform",
      "translateZ(-4000px) translateX(" +
        selectedTranslateX +
        "px) translateY(" +
        selectedTranslateY +
        "px)"
    );
    $outerWrapper.css("transform", "rotateZ(0deg)");
    $body.addClass("zoomed-out");
    $(".slide.first .main-title").css("opacity", 0.5);
    $(".slide .image").each(function (e) {
      var $this = $(this);
      setTimeout(function () {
        $this.css("opacity", 0.5);
      }, e * 40);
    });

    pageWrapperLastPositionX = selectedTranslateX;
    pageWrapperLastPositionY = selectedTranslateY;
  });

  $(document.body).on("mousemove", function (e) {
    if ($body.hasClass("zoomed-out")) {
      if ($dragging) {
        $body.addClass("dragging");
        moveX = pageWrapperLastPositionX + (e.pageX - firstClickPositionX);
        moveY = pageWrapperLastPositionY + (e.pageY - firstClickPositionY);
        $(".inner-wrapper").css(
          "transform",
          "translateZ(-4000px) translateX(" +
            moveX +
            "px) translateY(" +
            moveY +
            "px)"
        );
      }
    }
  });

  $(document.body).on("mousedown", ".outer-wrapper", function (e) {
    if ($body.hasClass("zoomed-out")) {
      setTimeout(function () {
        $dragging = $(e.target);
      }, 100);
      firstClickPositionX = e.pageX;
      firstClickPositionY = e.pageY;
      $(".inner-wrapper").css("transition", "0s");
    }
  });

  $(document.body).on("mouseup", function () {
    $body.removeClass("dragging");
    $dragging = null;
    pageWrapperLastPositionX = moveX;
    pageWrapperLastPositionY = moveY;
    $(".inner-wrapper").css("transition", "1s");
  });

  $(document.body).on("touchmove", function (e) {
    if ($body.hasClass("zoomed-out")) {
      if ($dragging) {
        $body.addClass("dragging");
        moveX =
          pageWrapperLastPositionX +
          (e.originalEvent.touches[0].pageX - firstClickPositionX);
        moveY =
          pageWrapperLastPositionY +
          (e.originalEvent.touches[0].pageY - firstClickPositionY);
        $(".inner-wrapper").css(
          "transform",
          "translateZ(-4000px) translateX(" +
            moveX +
            "px) translateY(" +
            moveY +
            "px)"
        );
      }
    }
  });

  $(document.body).on("touchstart", ".outer-wrapper", function (e) {
    if ($body.hasClass("zoomed-out")) {
      setTimeout(function () {
        $dragging = $(e.target);
      }, 100);
      firstClickPositionX = e.originalEvent.touches[0].pageX;
      firstClickPositionY = e.originalEvent.touches[0].pageY;
      $(".inner-wrapper").css("transition", "0s");
    }
  });

  $(document.body).on("touchend", function () {
    $body.removeClass("dragging");
    $dragging = null;
    pageWrapperLastPositionX = moveX;
    pageWrapperLastPositionY = moveY;
    $(".inner-wrapper").css("transition", "1s");
  });

  //  End 3D Parallax Slider ---------------------------------------------------------------------------------------------

  $(".scrollbar-inner").scrollbar();

  if ($body.hasClass("zoomed-out")) {
    $(".inner-wrapper").css(
      "transform",
      "translateZ(-4000px) translateX(0px) translateY(0px)"
    );
    $outerWrapper.css("transform", "rotateZ(0deg)");
    $(".slide .image").css("opacity", 0.5);
  }

  $(".modal").on("show.bs.modal", function (e) {
    $(this)
      .find("iframe")
      .contents()
      .find(".iframe-page .page-wrapper")
      .addClass("scrollbar-inner");
    $(this).find("iframe").contents().find(".scrollbar-inner").scrollbar();
    $(this).find("iframe").attr("src", $(this).find("iframe").attr("data-src"));
  });

  $(".nav-btn").on("click", function (e) {
    e.preventDefault();
    $body.toggleClass("show-off-screen-content");
    $(".scrollbar-inner").stop().animate(
      {
        scrollTop: 0,
      },
      800
    );
    $(".off-screen-navigation a").removeClass("active");
  });

  $(".off-screen-content [id]").each(function () {
    $(this).attr("data-scroll-offset", $(this).offset().top);
  });

  $outerWrapper.on("click", function () {
    if ($body.hasClass("show-off-screen-content")) {
      $body.removeClass("show-off-screen-content");
    }
  });

  $(".bg-transfer").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).find("img").attr("src") + ")"
    );
  });

  var oldTimeStamp = 0;
  var newTimeStamp = 0;
  var acceleration = 80;
  var delta;

  $(".page-wrapper").on("mousewheel", function (e) {
    oldTimeStamp = newTimeStamp;
    newTimeStamp = e.timeStamp;
    acceleration = (1 / (newTimeStamp - oldTimeStamp)) * 100;
    delta = e.deltaY * -1;

    if (
      animationFinished === true &&
      delta === 1 &&
      !$body.hasClass("show-off-screen-content")
    ) {
      $(".animate").removeClass("idle");
      if ($(selectedImage).next().length) {
        nextImage = "#" + $(selectedImage).next()[0].id;
        play(nextImage);
      } else {
        nextImage = "#" + $slide.first()[0].id;
        play(nextImage);
      }
    } else if (
      animationFinished === true &&
      delta === -1 &&
      !$body.hasClass("show-off-screen-content")
    ) {
      $(".animate").removeClass("idle");
      if ($(selectedImage).prev().length) {
        prevImage = "#" + $(selectedImage).prev()[0].id;
        play(prevImage);
      } else {
        prevImage = "#" + $slide.last()[0].id;
        play(prevImage);
      }
    }
  });

  //  Magnific Popup

  if ($(".slide-popup").length > 0) {
    $(".image-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      overflowY: "hidden",
    });
  }

  if ($videoPopup.length > 0) {
    $videoPopup.magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
      overflowY: "hidden",
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          "</div>",
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1",
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
          gmaps: {
            index: "//maps.google.",
            src: "%id%&output=embed",
          },
        },
        srcAction: "iframe_src",
      },
    });
  }

  $(document).keydown(function (e) {
    if ($body.hasClass("show-off-screen-content")) {
      switch (e.which) {
        case 27: // ESC
          $(".nav-btn").trigger("click");
          break;
      }
    }
  });

  /*
//  Responsive Video Scaling

    if ($(".video").length > 0) {
        $(this).fitVids();
    }

*/

  //  Form Validation

  $(".form .btn[type='submit']").on("click", function () {
    var button = $(this);
    var form = $(this).closest("form");
    button.prepend("<div class='status'></div>");
    form.validate({
      submitHandler: function () {
        $.post("assets/php/email.php", form.serialize(), function (response) {
          button.find(".status").append(response);
          form.addClass("submitted");
        });
        return false;
      },
    });
  });

  $(".slider-pager").owlCarousel({
    autoWidth: true,
    margin: 2,
  });

  drawScrollbar();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on("load", function () {
  $(".animate").addClass("in");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function simpleMap(latitude, longitude, markerImage, mapTheme, mapElement) {
  if (mapTheme === "light") {
    var mapStyles = [
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#d3d3d3" }],
      },
      {
        featureType: "transit",
        stylers: [{ color: "#808080" }, { visibility: "off" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "on" }, { color: "#b3b3b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }, { weight: 1.8 }],
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d7d7d7" }],
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#ebebeb" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#a7a7a7" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#efefef" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#696969" }],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }, { color: "#737373" }],
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d6d6d6" }],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {},
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{ color: "#dadada" }],
      },
    ];
  } else if (mapTheme === "dark") {
    mapStyles = [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          { visibility: "on" },
          { color: "#000000" },
          { lightness: 16 },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{ color: "#000000" }, { lightness: 20 }],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 20 }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 21 }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#000000" }, { lightness: 17 }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: 0.2 }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 18 }],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 16 }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 19 }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }, { lightness: 17 }],
      },
    ];
  }
  var mapCenter = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 13,
    center: mapCenter,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: mapStyles,
  };
  var element = document.getElementById(mapElement);
  var map = new google.maps.Map(element, mapOptions);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    icon: markerImage,
  });
}

if (!$("body").hasClass("iframe-page")) {
  var viewport = (function () {
    var viewPorts = ["xs", "sm", "md", "lg"];

    var viewPortSize = function () {
      return window
        .getComputedStyle(document.body, ":before")
        .content.replace(/"/g, "");
    };

    var is = function (size) {
      if (viewPorts.indexOf(size) === -1) throw "no valid viewport name given";
      return viewPortSize() === size;
    };

    var isEqualOrGreaterThan = function (size) {
      if (viewPorts.indexOf(size) === -1) throw "no valid viewport name given";
      return viewPorts.indexOf(viewPortSize()) >= viewPorts.indexOf(size);
    };

    // Public API
    return {
      is: is,
      isEqualOrGreaterThan: isEqualOrGreaterThan,
    };
  })();
}

function drawScrollbar() {
  $(".iframe-page .page-wrapper").addClass("scrollbar-inner");
  $(".iframe-page .scrollbar-inner").scrollbar();
}
