var App = {
	init: function() {
		// rm loading screen
		$('.loading-screen').fadeOut(500, function(){
			$('.loading-screen').remove();
		});

		// sliders
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

		// nav
		if (scrollTop == 0) {
			if ($('.nav').hasClass('active')) {
				$('.nav').removeClass('active');
			}
		} else {
			if (!$('.nav').hasClass('active')) {
				$('.nav').addClass('active');
			}
		}

		// parallax
		App.parallax(scrollTop);

		// trigger events
		App.trigger(scrollTop);

		// close menus
		App.closeMobileNav();
	},

	trigger: function(y) {
		// trigger events

		var trigger = y;

		if (isHome) {
			// home page events
			var title = '';

			$('.trigger').each(function(i, e){
				var top, $elem;

				$elem = $(e);
				top = $elem.offset().top;

				if (top <= trigger) {
					if ($elem.data('title')) {
						title = $elem.data('title');
					}
				}
			});

			if ($('#current-section').text() != title) {
				$('#current-section').text(title);
			}
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

	openMobileNav: function() {
		if (!$('.nav-mobile').hasClass('active')) {
			$('.nav-mobile').addClass('active');
		}
	},

	closeMobileNav: function() {
		if ($('.nav-mobile').hasClass('active')) {
			$('.nav-mobile').removeClass('active');
		}
	},

	toggleMobileNav: function() {
		if ($('.nav-mobile').hasClass('active')) {
			App.closeMobileNav();
		} else {
			App.openMobileNav();
		}
	}
};

window.onload = App.init;
