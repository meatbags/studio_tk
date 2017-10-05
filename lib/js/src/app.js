var App = {
	init: function() {
		// rm loading screen
		setTimeout(function() {
			$('.loading-screen').fadeOut(500, function(){
				$('.loading-screen').remove();
			});
		}, 200);

		// menu
		$('.nav__filter').on('mouseenter', function(){ App.openMenu(); });
		$('.nav__filter').on('click', function(){ App.openMenu(); });
		$('.menu').on('mouseleave', function(e){
			if (e.clientX < window.innerWidth/2)
				App.closeMenu();
		});

		// sliders ?
		$('.slider').slick({
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true
		});

		// reveal info
		$('.reveal-children').on('mouseenter', function() {
			var $elem = $(this);
			var $children = $elem.find('.reveal');

			if (!$children.hasClass('active')) {
				$children.addClass('active');
			}
		});
		$('.reveal-children').on('mouseleave', function() {
			var $elem = $(this);
			var $children = $elem.find('.reveal');

			if ($children.hasClass('active')) {
				$children.removeClass('active');
			}
		});

		// scroll event
		App.onScroll();
		$(document).on('scroll', App.onScroll);

		// mobile menu
		$('.nav-mobile-button').on('click', App.toggleMobileNav);
	},

	onScroll: function() {
		var scrollTop = $(document).scrollTop();

		// parallax
		App.parallax(scrollTop);

		// trigger events
		App.trigger(scrollTop);
	},

	trigger: function(y) {
		// trigger events

		var trigger = y;
		var pageHeight = window.innerHeight;

		if (isHome) {
			// home page events

			if (y >= pageHeight) {
				// hide img/ video
				App.addClass('.landing', 'hidden');

				// snap nav & menu
				App.addClass('.nav', 'active');
				App.addClass('.menu', 'active');
			} else {
				// show img/ video
				App.removeClass('.landing', 'hidden');

				// drop nav & menu
				App.removeClass('.nav', 'active');
				App.removeClass('.menu', 'active');
			}

			// change title & nav style
			var title = '';
			var navHeight = $('.nav').height();

			$('.trigger').each(function(i, e){
				var top, $elem;

				$elem = $(e);
				top = $elem.offset().top;

				if (top - navHeight <= trigger) {
					if ($elem.data('title')) {
						title = $elem.data('title');
					}

					if ($elem.data('invert')) {
						App.addClass('.nav', 'inverted');
						App.addClass('.menu', 'inverted');
					}	else {
						App.removeClass('.nav', 'inverted');
						App.removeClass('.menu', 'inverted');
					}
				}
			});

			if ($('#current-section').text() != title) {
				$('#current-section').text(title);
			}
		}
	},

	removeClass: function(selector, className) {
		// remove class once

		if ($(selector).hasClass(className)) {
			$(selector).removeClass(className);
		}
	},

	addClass: function(selector, className) {
		// add class once

		if (!$(selector).hasClass(className)) {
			$(selector).addClass(className);
		}
	},

	parallax: function(y) {
		var trigger = y + window.innerHeight;

		// trigger parallax animation
		$('.parallax-once').each(function(i, e){
			var top, $elem;

			$elem = $(e);
			top = $elem.offset().top;

			if (top < trigger) {
				$elem.removeClass('parallax-once');
				$elem.addClass('parallax-active');
			}
		});
	},

	openMenu: function() {
		App.addClass('.menu', 'open');
	},

	closeMenu: function() {
		App.removeClass('.menu', 'open');
	}
};

window.onload = App.init;
