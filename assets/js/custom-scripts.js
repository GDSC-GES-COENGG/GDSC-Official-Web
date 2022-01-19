(function ($) {
  'use strict';

  window.addEventListener("load", function () {
	particles_init(),
	  smth_ttl(),

	  setTimeout(function () {
		move_bg();
	  }, 900);

  });

  jQuery(window).on('mousemove click', function (e) {
	var lMouseX = Math.max(-100, Math.min(100, jQuery(window).width() / 2 - e.clientX));
	var lMouseY = Math.max(-100, Math.min(100, jQuery(window).height() / 2 - e.clientY));
	lFollowX = (15 * lMouseX) / 100;
	lFollowY = (15 * lMouseY) / 100;
  });

  var menu_height = $('header').innerHeight(),
	topbar_height = $('.topbar').innerHeight(),
	menubar_height = $('.menubar').innerHeight(),
	scroll = $(window).scrollTop(),
	res_header = $('.responsive-header').innerHeight(),
	pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
	width = window.innerWidth,
	lFollowX = 0,
	lFollowY = 0,
	x = 0,
	y = 0,
	friction = 1 / 30;


  function move_bg() {
	if (jQuery('.pg-title-wrap').hasClass('mouse_anim')) {
	  x += (lFollowX - x) * friction;
	  y += (lFollowY - y) * friction;
	  var translate = 'translate( calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px) )';
	  jQuery('.pg-ttl-shp-img').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	  });
	  window.requestAnimationFrame(move_bg);
	}
  }

  function smth_ttl() {
	var pageTitle = jQuery('.pg-title-inner');
	if (pageTitle.length > 0 && jQuery('.pg-title-wrap').hasClass('scroll_anim')) {
	  var titleTop = pageTitle.offset().top;
	  var titleHeight = pageTitle.innerHeight();
	  var spaceToBtm = parseInt(jQuery('.pg-title-wrap').css('padding-bottom'));
	  jQuery(window).on('scroll', function () {
		if (jQuery(this).scrollTop() < titleTop + spaceToBtm) {
		  var shift = (jQuery(this).scrollTop() + 1) / (titleTop + spaceToBtm) * 100;
		  var opacity = 1 - (shift / 100);
		  pageTitle.css('-webkit-transform', 'translateY(' + shift + 'px)');
		  pageTitle.css('transform', 'translateY(' + shift + 'px)');
		  pageTitle.css('opacity', opacity * 2);
		}
	  });
	}
  }

  //===== Particles =====//
  function particles_init() {
	var particlesID = '';
	var particlesColor = '#3e4a59';
	var particlesSpeed = 2;
	var particlesSize = 10;
	var particlesLinked = false;
	var particlesCount = 25;
	var particlesShape = 'circle';
	var particlesMode = 'out';
	var particlesHide = 767;
	var particlesImageUrl = '';
	var particlesImageWidth = 100;
	var particlesImageHeight = 100;

	jQuery('.particles-js').each(function (i, el) {
	  particlesID = jQuery(el).attr('id');
	  if (jQuery(el).data('hide') != undefined) {
		particlesHide = jQuery(el).data('hide');
	  }
	  if (jQuery(window).width() > particlesHide) {

		//===== Grab data attributes =====//
		if (jQuery(el).data('color') != undefined) {
		  particlesColor = jQuery(el).data('color');
		}
		if (jQuery(el).data('speed') != undefined) {
		  particlesSpeed = jQuery(el).data('speed');
		}
		if (jQuery(el).data('size') != undefined) {
		  particlesSize = jQuery(el).data('size');
		}
		if (jQuery(el).data('linked') != undefined) {
		  particlesLinked = jQuery(el).data('linked') == 1 ? true : false;
		}
		if (jQuery(el).data('count') != undefined) {
		  particlesCount = jQuery(el).data('count');
		}
		if (jQuery(el).data('shape') != undefined) {
		  particlesShape = jQuery(el).data('shape');
		}
		if (jQuery(el).data('mode') != undefined) {
		  particlesMode = jQuery(el).data('mode');
		}
		if (jQuery(el).data('image-url') != undefined) {
		  particlesImageUrl = jQuery(el).data('image-url');
		}
		if (jQuery(el).data('image-width') != undefined) {
		  particlesImageWidth = jQuery(el).data('image-width');
		}
		if (jQuery(el).data('image-height') != undefined) {
		  particlesImageHeight = jQuery(el).data('image-height');
		}

		//===== Particles Init =====//
		particlesJS(particlesID, {
			"particles": {
			  "number": {
				"value": particlesCount,
				"density": {
				  "enable": false,
				  "value_area": 200
				}
			  },
			  "color": {
				"value": particlesColor
			  },
			  "shape": {
				"type": particlesShape,
				"stroke": {
				  "width": 0,
				  "color": "#000000"
				},
				"polygon": {
				  "nb_sides": 6
				},
				"image": {
				  "src": particlesImageUrl,
				  "width": particlesImageWidth,
				  "height": particlesImageHeight
				}
			  },
			  "opacity": {
				"value": 1,
				"random": true,
				"anim": {
				  "enable": true,
				  "speed": 0.2,
				  "opacity_min": 0.5,
				  "sync": false
				}
			  },
			  "size": {
				"value": particlesSize,
				"random": false,
				"anim": {
				  "enable": true,
				  "speed": 1,
				  "size_min": particlesSize * 0.7,
				  "sync": false
				}
			  },
			  "line_linked": {
				"enable": particlesLinked,
				"distance": 150,
				"color": particlesColor,
				"opacity": 1,
				"width": 1
			  },
			  "move": {
				"enable": true,
				"speed": particlesSpeed,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": particlesMode,
				"attract": {
				  "enable": false,
				  "rotateX": 0,
				  "rotateY": 0
				}
			  }
			},
			"interactivity": {
			  "detect_on": "canvas",
			  "events": {
				"onhover": {
				  "enable": false,
				  "mode": "bubble"
				},
				"onclick": {
				  "enable": true,
				  "mode": "push"
				},
				"resize": true
			  },
			  "modes": {
				"push": {
				  "particles_nb": 1
				}
			  }
			},
			"retina_detect": true,
		  }
		);
	  }
	});
  }

  $(document).ready(function () {

	//===== Menu Active =====//
	$("nav ul li a").each(function () {
	  if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
		$(this).parent('li').addClass("active").parent().parent().addClass("active").parent().parent().addClass("active");
	});

	//===== Menu Active =====//
	pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	$(".responsive-menu ul li a").each(function () {
	  if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
		$(this).parent('li').addClass("active").parent().parent().addClass("active-parent").parent().parent().addClass("active-parent");
	});

	//===== Scroll To Top =====//
	$('.scroll-top-btn').on('click', function () {
	  $('html,body').animate({
		scrollTop: $('body').offset().top
	  }, 1000);
	});

	//===== Wow Animation Setting =====//
	if ($(".wow").length > 0) {
	  var wow = new WOW({
		boxClass: 'wow',      // default
		animateClass: 'animated', // default
		offset: 0,          // default
		mobile: true,       // default
		live: true        // default
	  });
	  wow.init();
	}

	//===== Header Search =====//
	$('.search-btn').on('click', function () {
	  $('.header-search').addClass('active');
	  return false;
	});
	$('.search-close-btn').on('click', function () {
	  $('.header-search').removeClass('active');
	  return false;
	});

	//===== Responsive Menu =====//
	$('.res-menu-btn').on('click', function () {
	  $('body').addClass('slidein');
	  return false;
	});
	$('html, body').on('click', function () {
	  $('body').removeClass('slidein');
	});
	$('.responsive-menu').on('click', function (event) {
	  event.stopPropagation();
	});
	$('.responsive-menu li.menu-item-has-children > a').on('click', function () {
	  $(this).parent().siblings('li').children('ul').slideUp();
	  $(this).parent().siblings('li').removeClass('active');
	  $(this).parent().children('ul').slideToggle();
	  $(this).parent().toggleClass('active');
	  return false;
	});

	//===== Scroll Up Bar =====//
	if ($.isFunction($.fn.scrollupbar)) {
	  $('.sticky-header').scrollupbar();
	}

	//===== Counter Up =====//
	if ($.isFunction($.fn.counterUp)) {
	  $('.counter').counterUp({
		delay: 10,
		time: 2000
	  });
	}

	//===== Tilt =====//
	if ($.isFunction($.fn.tilt)) {
	  jQuery('.tilt').each(function (i, el) {
		var max_tilt = jQuery(el).data('max_tilt');
		var perspective = jQuery(el).data('perspective');
		var scale = jQuery(el).data('scale');
		var speed = jQuery(el).data('speed');
		var tilt = jQuery(el).tilt({
		  maxTilt: max_tilt,
		  perspective: perspective,
		  easing: "cubic-bezier(.03,.98,.52,.99)",
		  scale: scale,
		  speed: speed,
		  transition: true,
		  disableAxis: null,
		  reset: true,
		  glare: false,
		  maxGlare: 1
		});
		tilt.tilt.reset.call(tilt);
	  });
	}

	//===== LightBox =====//
	if ($.isFunction($.fn.fancybox)) {
	  $('[data-fancybox],[data-fancybox="gallery"]').fancybox({});
	}

	if (width > 990) {
	  //===== Sticky Sidebar =====//
	  if ($('.blog-wth-sidebar > div.row > div, .shop-wth-sidebar > div.row > div, .portfl-detail-wrap > div.row > div').length > 0) {
		$('.blog-wth-sidebar > div.row > div, .shop-wth-sidebar > div.row > div, .portfl-detail-wrap > div.row > div').theiaStickySidebar({
		  additionalMarginTop: 60,
		  additionalMarginBottom: 60
		});
	  }
	}

	//===== Clander =====//
	if ($('.myCalendar').length > 0) {
	  $('.myCalendar').calendar({
		date: new Date(),
		autoSelect: false, // false by default
		select: function (date) {
		  console.log('SELECT', date)
		},
		toggle: function (y, m) {
		  console.log('TOGGLE', y, m)
		}
	  })
	}

	//===== Range Slider =====//
	if ($('#prod-filter').length > 0) {
	  var nonLinearSlider = document.getElementById('prod-filter');
	  noUiSlider.create(nonLinearSlider, {
		connect: true,
		behaviour: 'tap',
		start: [15, 35],
		range: {
		  'min': [10],
		  'max': [40]
		}
	  });
	  var nodes = [
		document.getElementById('lower-value'),
		document.getElementById('upper-value')
	  ];
	  nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
		nodes[handle].innerHTML = values[handle] + '$';
	  });
	}

	//===== Scrollbar =====//
	if ($('.responsive-menu').length > 0) {
	  var ps = new PerfectScrollbar('.responsive-menu');
	}

	//===== Accordions =====//
	if ($("#toggle").length > 0) {
	  $(function () {
		$('#toggle .toggle-content').hide();
		$('#toggle h4:first').next().slideDown(500).parent().addClass("active");
		$('#toggle h4').on("click", function () {
		  if ($(this).next().is(':hidden')) {
			$('#toggle h4').next().slideUp(500).parent().removeClass("active");
			$(this).next().slideDown(500).parent().toggleClass("active");
		  }
		});
	  });
	}

	//===== Toggles =====//
	if ($("#toggle2").length > 0) {
	  $(function () {
		$('#toggle2 .toggle-content').hide();
		$('#toggle2 h4:first').next().slideDown(500).parent().addClass("active");
		$('#toggle2 h4').on("click", function () {
		  $(this).next().slideToggle('slow').parent().toggleClass("active");
		});
	  });
	}

	if ($(".analys-box").length > 0) {
	  $("#analys11").waypoint(function () {
		$("#analys11").circleProgress({
		  value: 0.75,
		  fill: {color: '#ff7b37'},
		  thickness: 5,
		  emptyFill: '#ffd8c3',
		  size: 215
		}).on('circle-animation-progress', function (event, progress) {
		  $(this).find('span').html(Math.round(75 * progress) + '<i>%</i>');
		});
	  }, {offset: '80%'})
	}

	if ($(".analys-box").length > 0) {
	  $("#analys22").waypoint(function () {
		$("#analys22").circleProgress({
		  value: 0.50,
		  fill: {color: '#ff7b37'},
		  thickness: 5,
		  emptyFill: '#ffd8c3',
		  size: 215
		}).on('circle-animation-progress', function (event, progress) {
		  $(this).find('span').html(Math.round(50 * progress) + '<i>%</i>');
		});
	  }, {offset: '80%'})
	}

	if ($(".analys-box").length > 0) {
	  $("#analys33").waypoint(function () {
		$("#analys33").circleProgress({
		  value: 0.80,
		  fill: {color: '#5264dd'},
		  thickness: 5,
		  emptyFill: '#cbd1f5',
		  size: 215
		}).on('circle-animation-progress', function (event, progress) {
		  $(this).find('span').html(Math.round(80 * progress) + '<i>%</i>');
		});
	  }, {offset: '80%'})
	}

	if ($(".analys-box").length > 0) {
	  $("#analys44").waypoint(function () {
		$("#analys44").circleProgress({
		  value: 0.25,
		  fill: {color: '#5264dd'},
		  thickness: 5,
		  emptyFill: '#cbd1f5',
		  size: 215
		}).on('circle-animation-progress', function (event, progress) {
		  $(this).find('span').html(Math.round(25 * progress) + '<i>%</i>');
		});
	  }, {offset: '80%'})
	}

	//===== Contact Form Validation =====//
	if ($('#email-form').length) {
	  $('form#email-form').submit(function (e) {
		e.preventDefault();
		var fname = $('#email-form .fname').val();
		var lname = $('#email-form .lname').val();
		var email = $('#email-form .email').val();
		var phone = $('#email-form .phone').val();
		if (fname == '' || email == '') {
		  $(this).children().children('.response').html('<div class="failed alert alert-warning">Please fill the required fields.</div>');
		  return false;
		}
		$.ajax({
		  url: "sendemail.php",
		  method: "POST",
		  data: $(this).serialize(),
		  beforeSend: () => {
			$(this).children('.response').html('<div class="text-info"><img src="assets/images/preloader.gif"> Loading...</div>');
		  },
		  success: (data) => {
			$(this).children().children('.response').fadeIn().html(data);
			setTimeout(function () {
			  $(this).children().children('.response').fadeOut("slow");
			}, 5000);
			$(this).trigger("reset");
		  },
		  error: (res) => {
			console.log(res);
			$(this).children().children('.response').fadeIn().html(data);
		  }
		});
	  });
	}

	/*===== Newsletter Form Validation =====*/
	if($('#subscribe-form').length){
	  $('form#subscribe-form').submit(function (e) {
		e.preventDefault();
		var email = $(this).children('.email').val();
		var url_link = $(this).children('.url').val();
		if (email.length == 0) {
		  $(this).children('.response').html('<div class="failed alert alert-warning">Please fill the required fields.</div>');
		  return false;
		}
		$.ajax({
		  url: "sendnewsletter.php",
		  method: "POST",
		  data: $(this).serialize(),
		  beforeSend: () => {
			$(this).children('.response').html('<div class="text-info"><img src="assets/images/preloader.gif"> Loading...</div>');
		  },
		  success: (data) => {
			$(this).children('.response').fadeIn().html(data);
			setTimeout(function () {
			  $(this).children('.response').fadeOut("slow");
			}, 5000);
			$(this).trigger("reset");
		  },
		  error: (res) => {
			console.log(res);
			$(this).children('.response').fadeIn().html(data);
		  }
		});
	  });
	}

	//===== Slick Carousel =====//
	if ($.isFunction($.fn.slick)) {

	  //=== Post Carousel ===//
	  $('.post-caro').slick({
		arrows: true,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1925,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: true
		  }
		}, {
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: true
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 850,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  }]
	  });

	  //=== Post Carousel 2 ===//
	  $('.post-caro2').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1925,
		  settings: {
			slidesToShow: 4,
			slidesToScroll: 1
		  }
		}, {
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 850,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }]
	  });

	  //=== Testimonials Carousel ===//
	  $('.testi-caro').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }]
	  });

	  //=== Testimonials Carousel 2 ===//
	  $('.testi-caro2').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }]
	  });

	  //=== Testimonials Carousel 3 ===//
	  $('.testi-caro3').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }]
	  });

	  //=== Team Carousel ===//
	  $('.team-caro').slick({
		arrows: true,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: false,
		autoplaySpeed: 5000,
		speed: 1000,
		draggable: true,
		dots: false,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='icon-left-circle-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='icon-left-circle-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: false
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  },
		  {
			breakpoint: 770,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  }]
	  });

	  //=== Gallery Carousel ===//
	  $('.gal-caro').slick({
		arrows: true,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1925,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: true
		  }
		}, {
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: true
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 850,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  }]
	  });

	  //=== Gallery 2 Carousel ===//
	  $('.gal-caro2').slick({
		arrows: true,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		draggable: true,
		dots: false,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1925,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false
		  }
		}, {
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: false
			}
		  },
		  {
			breakpoint: 850,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: true,
			  dots: false
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  }]
	  });

	  //=== Gallery 3 Carousel ===//
	  $('.gal-caro3').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='flaticon-left-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='flaticon-right-arrow'></i></button>"
	  });

	  //=== Product Carousel ===//
	  $('.prod-caro').slick({
		arrows: false,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: false,
		autoplaySpeed: 5000,
		speed: 1000,
		draggable: true,
		dots: true,
		pauseOnDotsHover: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		prevArrow: "<button type='button' class='slick-prev'><i class='icon-left-circle-arrow'></i></button>",
		nextArrow: "<button type='button' class='slick-next'><i class='icon-left-circle-arrow'></i></button>",
		responsive: [{
		  breakpoint: 1210,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: true
		  }
		},
		  {
			breakpoint: 995,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  },
		  {
			breakpoint: 770,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true
			}
		  }]
	  });

	  //=== Product Image Carousel ===//
	  $('.shop-detail-imgs-full').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		slide: 'div',
		fade: false,
		asNavFor: '.shop-detail-imgs-nav'
	  });
	  $('.shop-detail-imgs-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.shop-detail-imgs-full',
		dots: false,
		arrows: false,
		vertical: true,
		slide: 'div',
		centerPadding: '0',
		focusOnSelect: true,
		responsive: [
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 4,
			  slidesToScroll: 1,
			  infinite: true,
			}
		  },
		  {
			breakpoint: 575,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 1,
			  infinite: true,
			  vertical: false
			}
		  }
		]
	  });

	}

  }); //===== Document Ready Ends =====//

//===== Window onLoad =====//
  $(window).on('load', function () {

	//===== Header =====//
	var menu_height = $('header').innerHeight();
	var scroll = $(window).scrollTop();
	if (scroll >= menu_height) {
	  $('.sticky-header').addClass('sticky');
	} else {
	  $('.sticky-header').removeClass('sticky');
	}

	//===== Wheel Icons =====//
	var wheel_icon, wheel_cap, wheel_interval, wheel_interval_again, interval = 0;
	wheel_icon = $('body').find('.wheel-icon');
	wheel_cap = $('body').find('.wheel-icon-cap-wrap');
	wheel_interval_again = () => {
	  if (wheel_icon.length >= 1 && wheel_cap.length >= 1 && wheel_cap.length == wheel_icon.length) {
		wheel_interval = setInterval(() => {
		  if (interval !== wheel_icon.length) {
			wheel_cap.removeClass('active');
			wheel_icon.removeClass('active');
			$(wheel_cap[interval]).addClass('active');
			$(wheel_icon[interval]).addClass('active');
		  } else {
			interval = -1;
		  }
		  interval++;
		}, 3000);
	  }
	}
	wheel_interval_again();
	$('.wheel-icon').on('mouseover', function () {
	  $('.wheel-icon').removeClass('active');
	  $('.wheel-icon-cap-wrap').removeClass('active');

	  $(this).addClass('active');
	  $(this).next('.wheel-icon-cap-wrap').addClass('active');

	  clearInterval(wheel_interval);
	});
	$('.wheel-icon').on('mouseleave', function () {
	  wheel_interval_again();
	});

	//===== Topbar Spacing =====//
	$('main').css('padding-top', topbar_height);

	//===== Page Loader =====//
	jQuery("#preloader").fadeOut(300);

	//===== Isotope =====//
	if (jQuery('.fltr-itm').length > 0) {
	  if (jQuery().isotope) {
		var jQuerycontainer = jQuery('.masonry'); // cache container
		jQuerycontainer.isotope({
		  itemSelector: '.fltr-itm',
		  columnWidth: .2
		});
		jQuery('.filter-links a').on('click', function () {
		  var selector = jQuery(this).attr('data-filter');
		  jQuery('.filter-links li').removeClass('active');
		  jQuery(this).parent().addClass('active');
		  jQuerycontainer.isotope({filter: selector});
		  return false;
		});
		jQuerycontainer.isotope('layout'); // layout/layout
	  }

	  jQuery(window).resize(function () {
		if (jQuery().isotope) {
		  jQuery('.masonry').isotope('layout'); // layout/relayout on window resize
		}
	  });
	}

  });//===== Window onLoad Ends =====//

//===== Sticky Header =====//
  $(window).on('scroll', function () {
	'use strict';

	//===== Header =====//
	var menu_height = $('header').innerHeight();
	var scroll = $(window).scrollTop();
	if (scroll >= menu_height) {
	  $('.sticky-header').addClass('sticky');
	} else {
	  $('.sticky-header').removeClass('sticky');
	}

	if (scroll >= res_header) {
	  $('.res-menu').css({'top': 0});
	  $('.res-btns > a.res-menu-btn').css({'position': 'fixed', 'top': '3.125rem', 'z-index': '99999'});
	} else {
	  $('.res-menu').css({'top': res_header});
	  $('.res-btns > a.res-menu-btn').css({'position': 'static', 'top': '3.125rem'});
	}

  });//===== Window onScroll Ends =====//

})(jQuery);