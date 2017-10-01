var App = {
	init: function() {
		
		$('.loading-screen').fadeOut(500, function(){
			$('.loading-screen').remove();
		});
		
		// init sliders
		
		$('.slider').slick({
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true
		});
		
		// replace slider texts
		
		$('.slick-prev').text('');
		$('.slick-next').text('');
		
		// scroll events
		
		App.onScroll();
		$(document).on('scroll', App.onScroll);
		
		// mobile menu
		
		$('.nav-mobile-button').on('click', App.toggleMobileNav);
	},
	
	onScroll: function() {
		var scrollTop = $(document).scrollTop();
		
		// nav dropdown
		
		if (scrollTop == 0) {
			if ($('.nav').hasClass('active')) {
				$('.nav').removeClass('active');
			}
		} else {
			if (!$('.nav').hasClass('active')) {
				$('.nav').addClass('active');
			}
		}
		
		// close menus
		
		App.closeMobileNav();
		
		// parallax stuff
		
		App.parallaxClasses = ['parallax-rise', 'parallax-fade'];
		App.parallax(scrollTop);
	},
	
	parallax: function(y) {
		var trigger = y + window.innerHeight;
		
		// trigger one-time parallax effects
		
		$('.parallax-once').each(function(i, e){
			var top, $elem;
			
			$elem = $(e);
			top = $elem.offset().top;
			
			if (top < trigger) {
				for (var i=0; i<App.parallaxClasses.length; i++) {
					$elem.removeClass(App.parallaxClasses[i]);	
				}
				$elem.removeClass('parallax-once');
			}
		});
		
		// trigger repeating parallax effects
		
		for (var i=0; i<App.parallaxClasses.length; i++) {
			var pClass = '.' + App.parallaxClasses[i];
			
			$(pClass).each(function(i, e){
				var top, $elem;

				$elem = $(e);
				top = $elem.offset().top;

				if (top < trigger) {
					if (!$elem.hasClass('active')) {
						$elem.addClass('active');
					}
				} else {
					if ($elem.hasClass('active')) {
						$elem.removeClass('active');
					}
				}
			});
		}
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

window.onload = function() {
	App.init();
};