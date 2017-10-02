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

		// close menus
		App.closeMobileNav();
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
