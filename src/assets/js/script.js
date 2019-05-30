/**
 * Global variabless
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
	initialDate = new Date(),
	$html = $('html'),
	isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
	isDesktop = $html.hasClass('desktop'),
	$body = $("body"),
	isIEBrows = navigator.appVersion.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0,
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	isTouch = "ontouchstart" in window,
	$year = $("#copyright-year"),
	$document = $(document),
	plugins = {
		pointerEvents: isIE && isIE < 11 ? 'js/pointer-events.min.js' : false,
		smoothScroll: $html.hasClass('use--smoothscroll') ? 'js/smoothscroll.min.js' : false,
		tooltip: $('[data-toggle="tooltip"]'),
		timePicker: $(".rd-mailform-time-picker"),
		datePicker: $('.form-input[type="date"]'),
		dropdownSelect: $(".rd-mailform-select"),
		flickrfeed: $('.flickr'),
		filePicker: $('.rd-file-picker'),
		fileDrop: $('.rd-file-drop'),
		rdMailForm: $(".rd-mailform"),
		rdInputLabel: $(".form-label"),
		regula: $("[data-constraints]"),
		radio: $("input[type='radio']"),
		checkbox: $("input[type='checkbox']"),
		captcha: $('.recaptcha'),
		popover: $('[data-toggle="popover"]'),
		calendar: $('.rd-calendar'),
		parallax: $('.rd-parallax'),
		search: $(".rd-search"),
		searchResults: $('.rd-search-results'),
		lightGallery: $("[data-lightgallery='group']"),
		lightGalleryItem: $("[data-lightgallery='item']"),
		lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
		video: $(".rd-video"),
		instafeed: $('.instafeed'),
		twitterfeed: $('.twitter'),
		facebookfeed: $('.facebook'),
		materialTabs: $('.rd-material-tabs'),
		responsiveTabs: $('.responsive-tabs'),
		navTabs: $('.nav-tabs'),
		textRotator: $(".rotator"),
		mfp: $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]'),
		mfpGallery: $('[data-lightbox^="gallery"]'),
		owl: $('.owl-carousel'),
		navbar: $('.rd-navbar'),
		dateCountdown: $('.DateCountdown'),
		statefulButton: $('.btn-stateful'),
		countDown: $('.countdown'),
		counter: $('.counter'),
		viewAnimate: $('.view-animate'),
		progressBar: $('.progress-bar'),
		swiper: $(".swiper-slider"),
		isotope: $(".isotope"),
		googleMapAPI: '//maps.google.com/maps/api/js',
		googleMapLibraries: '//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places',
		googleMap: $('#google-map'),
		googleSearch: $('.google-search'),
		audioPlayer: $('.rd-audio'),
		slick: $('.carousel-slider'),
		facebookWidget: $('#fb-root'),
		twitterWidget: $('.twitter')
	},
	i = 0;
/**
 * Initialize All Scripts
 */
$document.ready(function () {
	var isNoviBuilder = window.xMode;
	/**
	 * attachFormValidator
	 * @description  attach form validation to elements
	 */
	function attachFormValidator( elements ) {
		// Custom validator - phone number
		regula.custom({
			name: 'PhoneNumber',
			defaultMessage: 'Invalid phone number format',
			validator: function() {
				if ( this.value === '' ) return true;
				else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
			}
		});

		for ( var i = 0; i < elements.length; i++ ) {
			var o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) o.addClass("form-control-last-child");
		}

		elements.on('input change propertychange blur', function (e) {
			var $this = $(this), results;

			if ( e.type !== "blur" ) if ( !$this.parent().hasClass("has-error") ) return;
			if ( $this.parents('.rd-mailform').hasClass('success') ) return;

			if ( ( results = $this.regula('validate') ).length ) {
				for ( i = 0; i < results.length; i++ ) {
					$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
				}
			} else {
				$this.siblings(".form-validation").text("").parent().removeClass("has-error")
			}
		}).regula('bind');

		var regularConstraintsMessages = [
			{
				type: regula.Constraint.Required,
				newMessage: "The text field is required."
			},
			{
				type: regula.Constraint.Email,
				newMessage: "The email is not a valid email."
			},
			{
				type: regula.Constraint.Numeric,
				newMessage: "Only numbers are required"
			},
			{
				type: regula.Constraint.Selected,
				newMessage: "Please choose an option."
			}
		];


		for ( var i = 0; i < regularConstraintsMessages.length; i++ ) {
			var regularConstraint = regularConstraintsMessages[i];

			regula.override({
				constraintType: regularConstraint.type,
				defaultMessage: regularConstraint.newMessage
			});
		}
	}

	/**
	 * @desc Initialize owl carousel plugin
	 * @param {object} c - carousel jQuery object
	 */
	function initOwlCarousel(c) {
		var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
			values = [0, 480, 576, 768, 992, 1200, 1600],
			responsive = {};

		for (var j = 0; j < values.length; j++) {
			responsive[values[j]] = {};
			for (var k = j; k >= -1; k--) {
				if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
					responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
				}
				if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
					responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
				}
				if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
					responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
				}
			}
		}

		// Enable custom pagination
		if (c.attr('data-dots-custom')) {
			c.on("initialized.owl.carousel", function (event) {
				var carousel = $(event.currentTarget),
					customPag = $(carousel.attr("data-dots-custom")),
					active = 0;

				if (carousel.attr('data-active')) {
					active = parseInt(carousel.attr('data-active'), 10);
				}

				carousel.trigger('to.owl.carousel', [active, 300, true]);
				customPag.find("[data-owl-item='" + active + "']").addClass("active");

				customPag.find("[data-owl-item]").on('click', function (e) {
					e.preventDefault();
					carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item"), 10), 300, true]);
				});

				carousel.on("translate.owl.carousel", function (event) {
					customPag.find(".active").removeClass("active");
					customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
				});
			});
		}

		c.on("initialized.owl.carousel", function () {
			initLightGalleryItem(c.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
		});

		c.owlCarousel({
			autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
			loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
			items: 1,
			center: c.attr("data-center") === "true",
			dotsContainer: c.attr("data-pagination-class") || false,
			navContainer: c.attr("data-navigation-class") || false,
			mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
			nav: c.attr("data-nav") === "true",
			dots: c.attr("data-dots") === "true",
			dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
			animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
			animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
			responsive: responsive,
			navText: c.attr("data-nav-text") ? $.parseJSON( c.attr("data-nav-text") ) : [],
			navClass: c.attr("data-nav-class") ? $.parseJSON( c.attr("data-nav-class") ) : ['owl-prev', 'owl-next']
		});
	}

	/**
	 * @desc Initialize the gallery with set of images
	 * @param {object} itemsToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).lightGallery({
				thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
				selector: "[data-lightgallery='item']",
				autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
				pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
				addClass: addClass,
				mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
				loop: $(itemsToInit).attr("data-lg-loop") !== "false"
			});
		}
	}

	/**
	 * @desc Initialize the gallery with dynamic addition of images
	 * @param {object} itemsToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initDynamicLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).on("click", function () {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass: addClass,
					mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop: $(itemsToInit).attr("data-lg-loop") !== "false",
					dynamic: true,
					dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
				});
			});
		}
	}

	/**
	 * @desc Initialize the gallery with one image
	 * @param {object} itemToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initLightGalleryItem(itemToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemToInit).lightGallery({
				selector: "this",
				addClass: addClass,
				counter: false,
				youtubePlayerParams: {
					modestbranding: 1,
					showinfo: 0,
					rel: 0,
					controls: 0
				},
				vimeoPlayerParams: {
					byline: 0,
					portrait: 0
				}
			});
		}
	}

	/**
	 * isValidated
	 * @description  check if all elemnts pass validation
	 */
	function isValidated(elements, captcha) {
		var results, errors = 0;

		if (elements.length) {
			for (j = 0; j < elements.length; j++) {

				var $input = $(elements[j]);
				if ((results = $input.regula('validate')).length) {
					for (k = 0; k < results.length; k++) {
						errors++;
						$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
					}
				} else {
					$input.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}

			if (captcha) {
				if (captcha.length) {
					return validateReCaptcha(captcha) && errors === 0
				}
			}

			return errors === 0;
		}
		return true;
	}

	/**
	 * validateReCaptcha
	 * @description  validate google reCaptcha
	 */
	function validateReCaptcha(captcha) {
		var captchaToken = captcha.find('.g-recaptcha-response').val();

		if (captchaToken.length === 0) {
			captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
			captcha
				.closest('.form-group')
				.addClass('has-error');

			captcha.on('propertychange', function () {
				var $this = $(this),
					captchaToken = $this.find('.g-recaptcha-response').val();

				if (captchaToken.length > 0) {
					$this
						.closest('.form-group')
						.removeClass('has-error');
					$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
					$this.off('propertychange');
				}
			});

			return false;
		}

		return true;
	}

	/**
	 * onloadCaptchaCallback
	 * @description  init google reCaptcha
	 */
	window.onloadCaptchaCallback = function () {
		for (i = 0; i < plugins.captcha.length; i++) {
			var $capthcaItem = $(plugins.captcha[i]);

			grecaptcha.render(
				$capthcaItem.attr('id'),
				{
					sitekey: $capthcaItem.attr('data-sitekey'),
					size: $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
					theme: $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
					callback: function (e) {
						$('.recaptcha').trigger('propertychange');
					}
				}
			);
			$capthcaItem.after("<span class='form-validation'></span>");
		}
	};

	function getSwiperHeight(object, attr) {
		var val = object.attr("data-" + attr),
			dim;

		if (!val) {
			return undefined;
		}

		dim = val.match(/(px)|(%)|(vh)$/i);

		if (dim.length) {
			switch (dim[0]) {
				case "px":
					return parseFloat(val);
				case "vh":
					return $(window).height() * (parseFloat(val) / 100);
				case "%":
					return object.width() * (parseFloat(val) / 100);
			}
		} else {
			return undefined;
		}
	}

	function toggleSwiperInnerVideos(swiper) {
		var prevSlide = $(swiper.slides[swiper.previousIndex]),
			nextSlide = $(swiper.slides[swiper.activeIndex]),
			videos;

		prevSlide.find("video").each(function () {
			this.pause();
		});

		videos = nextSlide.find("video");
		if (videos.length) {
			videos.get(0).play();
		}
	}

	function toggleSwiperCaptionAnimation(swiper) {
		var prevSlide = $(swiper.container),
			nextSlide = $(swiper.slides[swiper.activeIndex]);

		prevSlide
			.find("[data-caption-animate]")
			.each(function () {
				var $this = $(this);
				$this
					.removeClass("animated")
					.removeClass($this.attr("data-caption-animate"))
					.addClass("not-animated");
			});

		nextSlide
			.find("[data-caption-animate]")
			.each(function () {
				var $this = $(this),
					delay = $this.attr("data-caption-delay");

				setTimeout(function () {
					$this
						.removeClass("not-animated")
						.addClass($this.attr("data-caption-animate"))
						.addClass("animated");
				}, delay ? parseInt(delay) : 0);
			});
	}

	function makeParallax(el, speed, wrapper, prevScroll) {
		var scrollY = window.scrollY || window.pageYOffset;

		if (prevScroll != scrollY) {
			prevScroll = scrollY;
			el.addClass('no-transition');
			el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
			el.height();
			el.removeClass('no-transition');


			if (el.attr('data-fade') === 'true') {
				var bound = el[0].getBoundingClientRect(),
					offsetTop = bound.top * 2 + scrollY,
					sceneHeight = wrapper.outerHeight(),
					sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
					layerDevider = offsetTop + el.outerHeight() / 2.0,
					pos = sceneHeight / 6.0,
					opacity;
				if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
					el[0].style["opacity"] = 1;
				} else {
					if (sceneDevider - pos < layerDevider) {
						opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
					} else {
						opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
					}
					el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
				}
			}
		}

		requestAnimationFrame(function () {
			makeParallax(el, speed, wrapper, prevScroll);
		});
	}

	function preventScroll(e) {
		e.preventDefault();
	}

	function isScrolledIntoView(elem) {
		var $window = $(window);
		return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
	}

	function lazyInit(element, func) {
		var $win = jQuery(window);
		$win.on('load scroll', function () {
			if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
				func.call();
				element.addClass('lazy-loaded');
			}
		});
	}

	/**
	 * @desc Create live search results
	 * @param {object} options
	 */
	function liveSearch(options) {
		$('#' + options.live).removeClass('cleared').html();
		options.current++;
		options.spin.addClass('loading');
		$.get(handler, {
			s: decodeURI(options.term),
			liveSearch: options.live,
			dataType: "html",
			liveCount: options.liveCount,
			filter: options.filter,
			template: options.template
		}, function (data) {
			options.processed++;
			var live = $('#' + options.live);
			if ((options.processed === options.current) && !live.hasClass('cleared')) {
				live.find('> #search-results').removeClass('active');
				live.html(data);
				setTimeout(function () {
					live.find('> #search-results').addClass('active');
				}, 50);
			}
			options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
		})
	}

	/**
	 * @module       Set current year
	 */
	if ($year.length) {
		$year.text(initialDate.getUTCFullYear());
	}

	/**
	 * @module       IE Polyfills
	 * @description  Adds some loosing functionality to IE browsers
	 */
	if (isIE) {
		if (isIE < 10) {
			$html.addClass("lt-ie-10");
		}

		if (isIE < 11) {
			if (plugins.pointerEvents) {
				$.getScript(plugins.pointerEvents)
					.done(function () {
						$html.addClass("ie-10");
						PointerEventsPolyfill.initialize({});
					});
			}
		}

		if (isIE === 11) {
			$("html").addClass("ie-11");
		}

		if (isIE === 12) {
			$("html").addClass("ie-edge");
		}
	}

	/**
	 * @module       Bootstrap Tooltips
	 * @author       Jason Frame
	 * @version      3.3.6
	 * @license      MIT License
	 * @link         https://github.com/twbs/bootstrap/blob/master/js/tooltip.js
	 */
	if (plugins.tooltip.length) {
		var tooltipPlacement = plugins.tooltip.attr('data-placement');
		console.log(tooltipPlacement);
		$(window).on('resize orientationchange', function () {
			if (window.innerWidth < 599) {
				plugins.tooltip.tooltip('destroy');
				plugins.tooltip.attr('data-placement', 'bottom');
				plugins.tooltip.tooltip();
			}
			else {
				plugins.tooltip.attr('data-placement');
				plugins.tooltip.tooltip();
			}
		})
	}

	/**
	 * @module     RD Audio Player
	 * @author     Rafael Shayvolodyan
	 * @see        https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
	 * @version    1.0.0
	 * @License    under dual CC By-SA 4.0 and GPLv3
	 */
	if (plugins.audioPlayer.length > 0) {
		for (i = 0; i < plugins.audioPlayer.length; i++) {
			var audioPlayerItem = plugins.audioPlayer[i];
			$(audioPlayerItem).RDAudio({});
		}
	}



	/**
	 * @module       Text rotator
	 * @version      1.0.0
	 * @license      MIT license
	 */
	if (plugins.textRotator.length) {
		for (i = 0; i < plugins.textRotator.length; i++) {
			var textRotatorItem = plugins.textRotator[i];
			$(textRotatorItem).rotator();
		}
	}

	/**
	 * @module       Magnific Popup
	 * @author       Dmitry Semenov
	 * @see          http://dimsemenov.com/plugins/magnific-popup/
	 * @version      v1.0.0
	 */
	if (plugins.mfp.length > 0 || plugins.mfpGallery.length > 0) {
		if (plugins.mfp.length) {
			for (i = 0; i < plugins.mfp.length; i++) {
				var mfpItem = plugins.mfp[i];

				$(mfpItem).magnificPopup({
					type: mfpItem.getAttribute("data-lightbox")
				});
			}
		}
		if (plugins.mfpGallery.length) {
			for (i = 0; i < plugins.mfpGallery.length; i++) {
				var mfpGalleryItem = $(plugins.mfpGallery[i]).find('[data-lightbox]');

				for (var c = 0; c < mfpGalleryItem.length; c++) {
					$(mfpGalleryItem).addClass("mfp-" + $(mfpGalleryItem).attr("data-lightbox"));
				}

				mfpGalleryItem.end()
					.magnificPopup({
						delegate: '[data-lightbox]',
						type: "image",
						gallery: {
							enabled: true
						}
					});
			}
		}
	}

	/**
	 * @module       RD-Google Map
	 * @author       Evgeniy Gusarov
	 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
	 * @version      0.1.4
	 */
	if (plugins.googleMap.length) {
		$.getScript(plugins.googleMapLibraries)
			.done(function () {
				var head = document.getElementsByTagName('head')[0],
					insertBefore = head.insertBefore;

				head.insertBefore = function (newElement, referenceElement) {
					if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
						return;
					}
					insertBefore.call(head, newElement, referenceElement);
				};

				lazyInit(plugins.googleMap, function () {
					plugins.googleMap.googleMap({
						styles: []
					});

				});
			});
	}
	/**
	 *
	 *  @module Google Map Search
	 *
	 */
	if (plugins.googleSearch.length) {
		$.getScript(plugins.googleMapLibraries)
			.done(function () {

				var map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: -33.8688, lng: 151.2195},
					zoom: 13,
					icon:image,
					styles: [{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#444444"
							}
						]
					},
						{
							"featureType": "landscape",
							"elementType": "all",
							"stylers": [
								{
									"color": "#f2f2f2"
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "poi.business",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"visibility": "on"
								}
							]
						},
						{
							"featureType": "road",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"lightness": 45
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "all",
							"stylers": [
								{
									"color": "#b4d4e1"
								},
								{
									"visibility": "on"
								}
							]
						}]
				});
				var image = 'images/gmap_marker.png';
				var beachMarker = new google.maps.Marker({
					position: {lat: -33.8688, lng: 151.2195},
					map: map,
					icon: image
				});

				var markers = [];

				// Create the search box and link it to the UI element.
				var input = document.getElementById('address');
				var searchBox = new google.maps.places.SearchBox(input);
				//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				// Bias the SearchBox results towards current map's viewport.
				map.addListener('bounds_changed', function() {
					searchBox.setBounds(map.getBounds());
				});

				// [START region_getplaces]
				// Listen for the event fired when the user selects a prediction and retrieve
				// more details for that place.
				searchBox.addListener('places_changed', function() {
					var places = searchBox.getPlaces();
					if (places.length == 0) {
						return;
					}
					// Clear out the old markers.

					for(i = 0; i < markers.length ;i++){
						markers[i].setMap(null);
					}
					markers = [];

					// For each place, get the icon, name and location.
					var bounds = new google.maps.LatLngBounds();

					for(i = 0; i < places.length ;i++){
						var icon = {
							url: places[i].icon,
							size: new google.maps.Size(71, 71),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(25, 25)
						};

						// Create a marker for each place.
						markers.push(new google.maps.Marker({
							map: map,
							icon:image,
							title: places[i].name,
							position: places[i].geometry.location
						}));

						if (places[i].geometry.viewport) {
							// Only geocodes have viewport.
							bounds.union(places[i].geometry.viewport);
						} else {
							bounds.extend(places[i].geometry.location);
						}
					}

					map.fitBounds(bounds);
				});

				// [END region_getplaces]
				// Trigger search on button click
				$('trigger-search').on("click", function () {
					var input = document.getElementById('address');
					google.maps.event.trigger(input, 'focus');
					google.maps.event.trigger(input, 'keydown', {
						keyCode: 13
					});
				});

			});
	}



	/**
	 * @module       RD Timepicker
	 * @author       Aleksey Patsurkovskiy
	 * @version      1.0.2
	 * @license      MIT License
	 * @link         http://cms.devoffice.com/coding-demo/mnemon1k/rd-timepicker/demo/
	 */
	if (plugins.timePicker.length) {
		for (i = 0; i < plugins.timePicker.length; i++) {
			var timePickerItem = plugins.timePicker[i];
			$(timePickerItem).RDTimePicker();
		}
	}

	/**
	 * @module       Easy Responsive Tabs Plugin
	 * @author       Samson.Onna (samson3d@gmail.com)
	 * @license      MIT License
	 */
	if (plugins.responsiveTabs.length > 0) {
		for (i = 0; i < plugins.responsiveTabs.length; i++) {
			var responsiveTabsItem = $(plugins.responsiveTabs[i]);

			responsiveTabsItem.easyResponsiveTabs({
				type: responsiveTabsItem.attr("data-type") === "accordion" ? "accordion" : "default"
			});
		}
	}

	/**
	 * Google ReCaptcha
	 * @description Enables Google ReCaptcha
	 */
	if (plugins.captcha.length) {
		$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
	}

	/**
	 * Radio
	 * @description Add custom styling options for input[type="radio"]
	 */
	if (plugins.radio.length) {
		var i;
		for (i = 0; i < plugins.radio.length; i++) {
			$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
		}
	}

	/**
	 * Checkbox
	 * @description Add custom styling options for input[type="checkbox"]
	 */
	if (plugins.checkbox.length) {
		var i;
		for (i = 0; i < plugins.checkbox.length; i++) {
			$(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
		}
	}

	/**
	 * RD Input Label
	 * @description Enables RD Input Label Plugin
	 */
	if (plugins.rdInputLabel.length) {
		plugins.rdInputLabel.RDInputLabel();
	}

	/**
	 * Regula
	 * @description Enables Regula plugin
	 */
	if (plugins.regula.length) {
		attachFormValidator(plugins.regula);
	}

	/**
	 * RD Mailform
	 * @version      3.2.0
	 */
	if (plugins.rdMailForm.length) {
		var i, j, k,
			msg = {
				'MF000': 'Successfully sent!',
				'MF001': 'Recipients are not set!',
				'MF002': 'Form will not work locally!',
				'MF003': 'Please, define email field in your form!',
				'MF004': 'Please, define type of your form!',
				'MF254': 'Something went wrong with PHPMailer!',
				'MF255': 'Aw, snap! Something went wrong.'
			};

		for (i = 0; i < plugins.rdMailForm.length; i++) {
			var $form = $(plugins.rdMailForm[i]),
				formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						inputs = form.find("[data-constraints]"),
						output = $("#" + form.attr("data-form-output")),
						captcha = form.find('.recaptcha'),
						captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							var captchaToken = captcha.find('.g-recaptcha-response').val(),
								captchaMsg = {
									'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
									'CPT002': 'Something wrong with google reCaptcha'
								};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "bat/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
								.done(function (responceCode) {
									if (responceCode !== 'CPT000') {
										if (output.hasClass("snackbars")) {
											output.html('<p><span class="icon text-middle fa fa-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

											setTimeout(function () {
												output.removeClass("active");
											}, 3500);

											captchaFlag = false;
										} else {
											output.html(captchaMsg[responceCode]);
										}

										output.addClass("active");
									}
								});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if (isNoviBuilder)
						return;

					var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
						form = $(plugins.rdMailForm[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						output = $("#" + form.attr("data-form-output")),
						select = form.find('select');

					form
						.addClass('success')
						.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle fa fa-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbars")) {
							output.html(' <p class="snackbars-left"><span class="icon icon-xxs fa fa-exclamation-triangle text-middle"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}




	/**
	 * @module       RD MaterialTabs
	 * @author       Rafael Shayvolodyan
	 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
	 * @version      1.0.2
	 * @License      under dual CC By-SA 4.0 and GPLv3
	 */
	if (plugins.materialTabs.length) {
		for (i = 0; i < plugins.materialTabs.length; i++) {
			var materialTabsItem = plugins.materialTabs[i];
			$(materialTabsItem).RDMaterialTabs({});
		}
	}

	/**
	 * @module       RD FacebookFeed
	 * @author       Rafael Shayvolodyan
	 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
	 * @version      1.0.0
	 */
	if (plugins.facebookfeed.length > 0) {
		for (i = 0; i < plugins.facebookfeed.length; i++) {
			var facebookfeedItem = plugins.facebookfeed[i];
			$(facebookfeedItem).RDFacebookFeed({});
		}
	}

	/**
	 * @module       RD Flickr Gallery
	 * @author       Rafael Shayvolodyan
	 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
	 * @version      1.0.0
	 * @License      under dual CC By-SA 4.0 and GPLv3
	 */
	if (plugins.flickrfeed.length > 0) {
		for (i = 0; i < plugins.flickrfeed.length; i++) {
			var flickrfeedItem = plugins.flickrfeed[i];
			$(flickrfeedItem).RDFlickr({});
		}
	}

	/**
	 * @module       RD SelectMenu
	 * @author       Evgeniy Gusarov
	 * @version      1.0.2
	 * @license      MIT License
	 * @link         http://cms.devoffice.com/coding-dev/rd-selectmenu/demo/
	 */
	if (plugins.dropdownSelect.length) {
		for (i = 0; i < plugins.dropdownSelect.length; i++) {
			var dropdownSelectItem = plugins.dropdownSelect[i];
			$(dropdownSelectItem).RDSelectMenu();
		}
	}

	/**
	 * @module       RD Toggles
	 * @author       Aleksey Patsurvkoskiy
	 * @version      0.2.1
	 * @license      MIT License
	 * @link         http://cms.devoffice.com/coding-demo/mnemon1k/rd-toggle/demo/
	 */
	if ($.length) {
		$.RDToggles();
	}

	/**
	 * @module       RD DatePicker
	 * @author       Evgeniy Gusarov
	 * @version      1.0.2
	 * @license      MIT License
	 * @link         http://cms.devoffice.com/coding-dev/rd-datepicker/demo/
	 */
	if (plugins.datePicker.length) {
		for (i = 0; i < plugins.datePicker.length; i++) {
			var datePickerItem = plugins.datePicker[i];
			$(datePickerItem).RDDatePicker();
		}
	}

	/**
	 * @module       RD Filepicker
	 * @author       Aleksey Patsurkovskiy
	 * @version      1.0.2
	 * @license      MIT License
	 * @link         http://cms.devoffice.com/coding-demo/mnemon1k/rd-filepicker/demo/
	 */
	if (plugins.filePicker.length || plugins.fileDrop.length) {
		for (i = 0; i < plugins.filePicker.length; i++) {
			var filePickerItem = plugins.filePicker[i];

			$(filePickerItem).RDFilepicker({
				metaFieldClass: "rd-file-picker-meta"
			});
		}

		for (i = 0; i < plugins.fileDrop.length; i++) {
			var fileDropItem = plugins.fileDrop[i];

			$(fileDropItem).RDFilepicker({
				metaFieldClass: "rd-file-drop-meta",
				buttonClass: "rd-file-drop-btn",
				dropZoneClass: "rd-file-drop"
			});
		}
	}

	/**
	 * @module       Popovers
	 * @author       Twitter, Inc.
	 * @version      2.0.1
	 * @link         https://gist.github.com/1930277
	 * @license      MIT License
	 */
	if (plugins.popover.length) {
		if (window.innerWidth < 767) {
			plugins.popover.attr('data-placement', 'bottom');
			plugins.popover.popover();
		}
		else {
			plugins.popover.popover();
		}
	}

	/**
	 * @module       Countdown
	 * @author       Keith Wood
	 * @see          http://keith-wood.name/countdown.html
	 * @license      MIT License
	 */
	if (plugins.countDown.length) {
		for (i = 0; i < plugins.countDown.length; i++) {
			var countDownItem = plugins.countDown[i],
				d = new Date(),
				type = countDownItem.getAttribute('data-type'),
				time = countDownItem.getAttribute('data-time'),
				format = countDownItem.getAttribute('data-format'),
				settings = [];

			d.setTime(Date.parse(time)).toLocaleString();
			settings[type] = d;
			settings['format'] = format;
			$(countDownItem).countdown(settings);
		}
	}

	/**
	 * @module     TimeCircles
	 * @author     Wim Barelds
	 * @version    1.5.3
	 * @see        http://www.wimbarelds.nl/
	 * @license    MIT License
	 */
	if (plugins.dateCountdown.length) {
		for (i = 0; i < plugins.dateCountdown.length; i++) {
			var dateCountdownItem = $(plugins.dateCountdown[i]),
				time = {
					"Days": {
						"text": "Days",
						"color": "#FFF",
						"show": true
					},
					"Hours": {
						"text": "Hours",
						"color": "#fff",
						"show": true
					},
					"Minutes": {
						"text": "Minutes",
						"color": "#fff",
						"show": true
					},
					"Seconds": {
						"text": "Seconds",
						"color": "#fff",
						"show": true
					}
				};
			dateCountdownItem.TimeCircles({});
			$(window).on('load resize orientationchange', function () {
				if (window.innerWidth < 479) {
					dateCountdownItem.TimeCircles({
						time: {
							Minutes: {show: true},
							Seconds: {show: false}
						}
					}).rebuild();
				} else if (window.innerWidth < 767) {
					dateCountdownItem.TimeCircles({
						time: {
							Seconds: {show: false}
						}
					}).rebuild();
				} else {
					dateCountdownItem.TimeCircles({time: time}).rebuild();
				}
			});
		}
	}

	/**
	 * @module      Buttons
	 * @author      Twitter, Inc.
	 * @version     3.3.6
	 * @link        https://github.com/twbs/bootstrap/blob/master/js/button.js
	 * @license     MIT License
	 */
	if (plugins.statefulButton.length) {
		$(plugins.statefulButton).on('click', function () {
			var statefulButtonLoading = $(this).button('loading');

			setTimeout(function () {
				statefulButtonLoading.button('reset')
			}, 2000);
		})
	}

	/**
	 * @module       RD Calendar
	 * @author       Evgeniy Gusarov
	 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
	 * @version      1.0.0
	 */
	if (plugins.calendar.length) {
		for (i = 0; i < plugins.calendar.length; i++) {
			var calendarItem = $(plugins.calendar[i]);

			calendarItem.rdCalendar({
				days: calendarItem.attr("data-days") ? calendarItem.attr("data-days").split(/\s?,\s?/i) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				month: calendarItem.attr("data-months") ? calendarItem.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			});
		}
	}

	/**
	 * @module      ProgressBar.js
	 * @see         https://kimmobrunfeldt.github.io/progressbar.js
	 * @license:    MIT License
	 * @version     0.9.0
	 */
	if (plugins.progressBar.length) {
		var bar,
			type;
		for (i = 0; i < plugins.progressBar.length; i++) {
			var progressItem = plugins.progressBar[i];
			bar = null;
			if (
				progressItem.className.indexOf("progress-bar-horizontal") > -1
			) {
				type = 'Line';
			}

			if (
				progressItem.className.indexOf("progress-bar-radial") > -1
			) {
				type = 'Circle';
			}

			if (progressItem.getAttribute("data-stroke") && progressItem.getAttribute("data-value") && type) {
				bar = new ProgressBar[type](progressItem, {
					strokeWidth: Math.round(parseFloat(progressItem.getAttribute("data-stroke")) / progressItem.offsetWidth * 100)
					,
					trailWidth: progressItem.getAttribute("data-trail") ? Math.round(parseFloat(progressItem.getAttribute("data-trail")) / progressItem.offsetWidth * 100) : 0
					,
					text: {
						value: progressItem.getAttribute("data-counter") === "true" ? '0' : null
						, className: 'progress-bar__body'
						, style: null
					}
				});
				bar.svg.setAttribute('preserveAspectRatio', "none meet");
				if (type === 'Line') {
					bar.svg.setAttributeNS(null, "height", progressItem.getAttribute("data-stroke"));
				}

				bar.path.removeAttribute("stroke");
				bar.path.className.baseVal = "progress-bar__stroke";
				if (bar.trail) {
					bar.trail.removeAttribute("stroke");
					bar.trail.className.baseVal = "progress-bar__trail";
				}

				if (progressItem.getAttribute("data-easing") && !isIE) {
					$(document)
						.on("scroll", {"barItem": bar}, $.proxy(function (event) {
							var bar = event.data.barItem;
							if (isScrolledIntoView($(this)) && this.className.indexOf("progress-bar--animated") === -1) {
								this.className += " progress-bar--animated";
								bar.animate(parseInt(this.getAttribute("data-value")) / 100.0, {
									easing: this.getAttribute("data-easing")
									,
									duration: this.getAttribute("data-duration") ? parseInt(this.getAttribute("data-duration")) : 800
									,
									step: function (state, b) {
										if (b._container.className.indexOf("progress-bar-horizontal") > -1 ||
											b._container.className.indexOf("progress-bar-vertical") > -1) {
											b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
										}
										b.setText(Math.abs(b.value() * 100).toFixed(0));
									}
								});
							}
						}, progressItem))
						.trigger("scroll");
				} else {
					bar.set(parseInt(this.getAttribute("data-value")) / 100.0);
					bar.setText(this.getAttribute("data-value"));
					if (type === 'Line') {
						bar.text.style.width = parseInt(this.getAttribute("data-value")) + "%";
					}
				}
			} else {
				console.error(progressItem.className + ": progress bar type is not defined");
			}
		}
	}

	/**
	 * @module       UIToTop
	 * @author       Matt Varone
	 * @see          http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
	 * @license      MIT License
	 */
	if (isDesktop) {
		$().UItoTop({
			easingType: 'easeOutQuart',
			containerClass: 'ui-to-top material-icons-ico material-icons-keyboard_arrow_up'
		});
	}

	/**
	 * @module       RD Navbar
	 * @author       Evgeniy Gusarov
	 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
	 * @version      2.1.3
	 */
	if (plugins.navbar.length) {
		plugins.navbar.RDNavbar({
			stickUpClone: plugins.navbar.data("stick-up-clone") || false,
			stickUpOffset: plugins.navbar.data("stick-up-offset") || 1
		});
	}

	/**
	 * @module      ViewPort Universal
	 * @description Add class in viewport
	 */
	if (plugins.viewAnimate.length) {
		for (i = 0; i < plugins.viewAnimate.length; i++) {
			var $view = $(plugins.viewAnimate[i]).not('.active');
			$document.on("scroll", $.proxy(function () {

				if (isScrolledIntoView(this)) {
					this.addClass("active");
				}
			}, $view))
				.trigger("scroll");
		}
	}

	/**
	 * @module       Swiper 3.1.7
	 * @description  Most modern mobile touch slider and framework with
	 *               hardware accelerated transitions
	 * @author       Vladimir Kharlampidi
	 * @see          http://www.idangero.us/swiper/
	 * @licesne      MIT License
	 */
	if (plugins.swiper.length) {
		for (i = 0; i < plugins.swiper.length; i++) {
			var s = $(plugins.swiper[i]);
			var pag = s.find(".swiper-pagination"),
				next = s.find(".swiper-button-next"),
				prev = s.find(".swiper-button-prev"),
				bar = s.find(".swiper-scrollbar"),
				parallax = s.parents('.rd-parallax').length,
				swiperSlide = s.find(".swiper-slide");

			for (j = 0; j < swiperSlide.length; j++) {
				var $this = $(swiperSlide[j]),
					url;

				if (url = $this.attr("data-slide-bg")) {
					$this.css({
						"background-image": "url(" + url + ")",
						"background-size": "cover"
					})
				}
			}

			swiperSlide.end()
				.find("[data-caption-animate]")
				.addClass("not-animated")
				.end()
				.swiper({
					autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
					direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
					effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
					speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
					keyboardControl: s.attr('data-keyboard') === "true",
					mousewheelControl: s.attr('data-mousewheel') === "true",
					mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
					nextButton: next.length ? next.get(0) : null,
					prevButton: prev.length ? prev.get(0) : null,
					pagination: pag.length ? pag.get(0) : null,
					paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
					paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							} : null : null,
					scrollbar: bar.length ? bar.get(0) : null,
					scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
					scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
					loop: s.attr('data-loop') !== "false",
					onTransitionStart: function (swiper) {
						toggleSwiperInnerVideos(swiper);
					},
					onTransitionEnd: function (swiper) {
						toggleSwiperCaptionAnimation(swiper);
					},
					onInit: function (swiper) {
						toggleSwiperInnerVideos(swiper);
						toggleSwiperCaptionAnimation(swiper);
						var swiperParalax= s.find(".swiper-parallax");

						for (var k = 0; k < swiperParalax.length; k++) {
							var $this = $(swiperParalax[k]),
								speed;

							if (parallax && !isIEBrows && !isMobile) {
								if (speed = $this.attr("data-speed")) {
									makeParallax($this, speed, s, false);
								}
							}
						}
						$(window).on('resize', function () {
							swiper.update(true);
						})
					}
				});

			$(window)
				.on("resize", function () {
					var mh = getSwiperHeight(s, "min-height"),
						h = getSwiperHeight(s, "height");
					if (h) {
						s.css("height", mh ? mh > h ? mh : h : h);
					}
				})
				.trigger("resize");
		}
	}

	// lightGallery
	if (plugins.lightGallery.length) {
		for (var i = 0; i < plugins.lightGallery.length; i++) {
			initLightGallery(plugins.lightGallery[i]);
		}
	}

	// lightGallery item
	if (plugins.lightGalleryItem.length) {
		// Filter carousel items
		var notCarouselItems = [];

		for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
			if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
				!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
				!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
				notCarouselItems.push(plugins.lightGalleryItem[z]);
			}
		}

		plugins.lightGalleryItem = notCarouselItems;

		for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
			initLightGalleryItem(plugins.lightGalleryItem[i]);
		}
	}

	// Dynamic lightGallery
	if (plugins.lightDynamicGalleryItem.length) {
		for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
			initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
		}
	}

	/**
	 * @module       RD Video
	 * @author       Rafael Shayvolodyan
	 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
	 * @version      1.0.0
	 */
	if (plugins.video.length) {
		for (i = 0; i < plugins.video.length; i++) {
			var videoItem = plugins.video[i];
			$(videoItem).RDVideo({});
		}
	}

	/**
	 * @module       RD Parallax
	 * @author       Evgeniy Gusarov
	 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
	 * @version      3.6.0
	 */
	if (plugins.parallax.length) {
		$.RDParallax();
		$("a[href='#']").on("click", function (event) {
			setTimeout(function () {
				$(window).trigger("resize");
			}, 300);
		});
	}

	// RD Search
	if (plugins.search.length || plugins.searchResults) {
		var handler = "bat/rd-search.php";
		var defaultTemplate = '<h5 class="search-title"><a target="_top" href="#{href}" class="search-link">#{title}</a></h5>' +
			'<p>...#{token}...</p>' +
			'<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
		var defaultFilter = '*.html';

		if (plugins.search.length) {
			for (var i = 0; i < plugins.search.length; i++) {
				var searchItem = $(plugins.search[i]),
					options = {
						element: searchItem,
						filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
						template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
						live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
						liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live'), 10) : 4,
						current: 0, processed: 0, timer: {}
					};

				var $toggle = $('.rd-navbar-search-toggle');
				if ($toggle.length) {
					$toggle.on('click', (function (searchItem) {
						return function () {
							if (!($(this).hasClass('active'))) {
								searchItem.find('input').val('').trigger('propertychange');
							}
						}
					})(searchItem));
				}

				if (options.live) {
					var clearHandler = false;

					searchItem.find('input').on("input propertychange", $.proxy(function () {
						this.term = this.element.find('input').val().trim();
						this.spin = this.element.find('.input-group-addon');

						clearTimeout(this.timer);

						if (this.term.length > 2) {
							this.timer = setTimeout(liveSearch(this), 200);

							if (clearHandler === false) {
								clearHandler = true;

								$body.on("click", function (e) {
									if ($(e.toElement).parents('.rd-search').length === 0) {
										$('#rd-search-results-live').addClass('cleared').html('');
									}
								})
							}

						} else if (this.term.length === 0) {
							$('#' + this.live).addClass('cleared').html('');
						}
					}, options, this));
				}

				searchItem.submit($.proxy(function () {
					$('<input />').attr('type', 'hidden')
						.attr('name', "filter")
						.attr('value', this.filter)
						.appendTo(this.element);
					return true;
				}, options, this))
			}
		}

		if (plugins.searchResults.length) {
			var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
			var match = regExp.exec(location.search);

			if (match !== null) {
				$.get(handler, {
					s: decodeURI(match[1]),
					dataType: "html",
					filter: match[2],
					template: defaultTemplate,
					live: ''
				}, function (data) {
					plugins.searchResults.html(data);
				})
			}
		}
	}



	/**
	 * @module       Slick carousel
	 * @version      1.5.9
	 * @author       Ken Wheeler
	 * @license      The MIT License (MIT)
	 */
	if (plugins.slick.length) {
		for (i = 0; i < plugins.slick.length; i++) {

			plugins.slick[i].slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				infinite: false,
				//asNavFor: '.carousel-thumbnail'
			});
			//plugins.slickThumb.slick({
			//  slidesToShow: 5,
			//  slidesToScroll: 1,
			//  asNavFor: '.carousel-slider',
			//  dots: false,
			//  infinite: false,
			//  focusOnSelect: true,
			//  arrows: true,
			//  swipe: false,
			//  responsive: [
			//    {
			//      breakpoint: 600,
			//      settings: {
			//        slidesToShow: 3
			//      }
			//    }
			//  ]
			//});
		}
	}

	// Owl carousel
	if (plugins.owl.length) {
		for (var i = 0; i < plugins.owl.length; i++) {
			var c = $(plugins.owl[i]);
			plugins.owl[i].owl = c;

			initOwlCarousel(c);
		}
	}



	/**
	 * @module     jQuery Count To
	 * @author     Matt Huggins
	 * @see        https://github.com/mhuggins/jquery-countTo
	 * @license    MIT License
	 */
	if (plugins.counter.length) {
		for (i = 0; i < plugins.counter.length; i++) {
			var counterNotAnimated = plugins.counter.not(".animated");

			$document.on("scroll", function () {
				for (i = 0; i < counterNotAnimated.length; i++) {
					var counterNotAnimatedItem = $(counterNotAnimated[i]);
					if ((!counterNotAnimatedItem.hasClass("animated")) && (isScrolledIntoView(counterNotAnimatedItem))) {
						counterNotAnimatedItem.countTo({
							refreshInterval: 40,
							speed: counterNotAnimatedItem.attr("data-speed") || 1000
						});
						counterNotAnimatedItem.addClass('animated');
					}
				}
			});
			$document.trigger("scroll");
		}
	}

	/**
	 * @module     Isotope PACKAGED
	 * @version v2.2.2
	 * @license GPLv3
	 * @see http://isotope.metafizzy.co
	 */
	if (plugins.isotope.length) {
		$(window).load(function () {
			if (plugins.isotope.length) {
				for (i = 0; i < plugins.isotope.length; i++) {
					var isotopeItem = plugins.isotope[i]
						, iso = new Isotope(isotopeItem, {
						itemSelector: '[class*="col-"], .isotope-item',
						layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry'
					});
					iso.layout();
					isotopeItem.className += " isotope--loaded";
				}
			}
		});
		$(".isotope-filters-trigger").on("click", function () {
			$(this).parents(".isotope-filters").toggleClass("active");
		});

		$('.isotope').magnificPopup({
			delegate: ' > :visible .thumb',
			type: "image",
			gallery: {
				enabled: true
			}
		});

		$("[data-isotope-filter]").on("click", function () {
			$('[data-isotope-filter][data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]').removeClass("active");
			$(this).addClass("active");
			$(this).parents(".isotope-filters").removeClass("active");
			var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');
			iso.isotope({
				itemSelector: '[class*="col-"], .isotope-item',
				layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
				filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter="' + this.getAttribute("data-isotope-filter") + '"]'
			})
		})
	}

	/**
	 * @module       WOW
	 * @author       Matthieu Aussaguel
	 * @license      MIT License
	 * @version      1.1.2
	 * @link         https://github.com/matthieua/WOW
	 */
	if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
		new WOW().init();
	}

	/**
	 * Enable official facebook plugin
	 */
	if (plugins.facebookWidget.length) {
		lazyInit(plugins.facebookWidget, function () {
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.5";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		});
	}

	/**
	 * Enable witter standard  plugin
	 */
	if (plugins.twitterWidget.length) {
		lazyInit(plugins.twitterWidget, function () {
			window.twttr = (function(d, s, id) {
				var t, js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = "https://platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js, fjs);
				return window.twttr || (t = {
						_e: [],
						ready: function(f) {
							t._e.push(f)
						}
					});
			}(document, "script", "twitter-wjs"));
		});
	}

	/**
	 * @module       Bootstrap tabs
	 * @author       Twitter, Inc.
	 * @license      MIT License
	 * @version      3.3.6
	 * @link         https://github.com/twbs/bootstrap/blob/master/js/tab.js
	 */
	if (plugins.navTabs.length) {
		for (i = 0; i < plugins.navTabs.length; i++) {
			var navTabsItem = $(plugins.navTabs[i]);

			navTabsItem.on("click", "a", function (event) {
				event.preventDefault();
				$(this).tab('show');
			});
		}
	}
});
