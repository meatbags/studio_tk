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

		// load more buttons
		if (isHome) {
			$('#load-more-projects').on('click', function() {
				App.loadMore($(this), 'index');
			});

			$('#load-more-editorials').on('click', function() {
				App.loadMore($(this), 'editorials');
			})
		}

		if (isHome || pageTitle === 'Index') {
			App.initInspector();
		}

		// reveal info
		$('.grid').on('mouseenter', '.reveal-children', function() {
			var $elem = $(this);
			var $children = $elem.find('.reveal');

			if (!$children.hasClass('active')) {
				$children.addClass('active');
			}
		});
		$('.grid').on('mouseleave', '.reveal-children', function() {
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

	loadMore: function($button, type) {
		// ajax load more posts

		var target, req, postCount, offset;

		if (type === 'index') {
			postCount = -1;
			offset = $('.index-grid .item').length;
			target = '.index-grid';
		} else if (type === 'editorials') {
			postCount = -1;
			offset = $('.editorials-grid .item').length;
			target = '.editorials-grid';
		}

		req = '&offset=' + offset +'&postCount=' + postCount + '&type=' + type + '&action=ajax_load';

		$.ajax({
			type: "POST",
			dataType: "text",
			url: ajaxUrl,
			data: req,
			success: function(data){
				$(target).append(data);
				$button.remove()
				App.onScroll();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus + ', ' + errorThrown);
			}
		});

		$button.css('opacity', 0);
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
	},

	initInspector: function() {
		// resize

		$('.inspector__image').each(function(i,e){
			console.log(e.naturalWidth, e.naturalHeight);
			$(e).css({
				width: e.naturalWidth + 'px',
				height: e.naturalHeight + 'px',
				top: 0,
				left: 0
			})
		});

		// fabric inspector thing

		App.inspector = {
			active: false,
			id: null,
			target: null,
			offset: {
				x: 0,
				y: 0
			},
			mouse: {
				start: {
					x: 0,
					y: 0
				},
				current: {
					x: 0,
					y: 0
				},
				delta: {
					x: 0,
					y: 0
				},
			}
		};

		$('body').on('mousedown', '.inspector', function(e){
			App.inspector.active = true;
			App.inspector.id = '#' + $(this).attr('id');
			App.inspector.mouse.start.x = e.clientX;
			App.inspector.mouse.start.y = e.clientY;
			App.inspector.target = $(App.inspector.id + ' .inspector__image');
			App.inspector.offset.x = App.inspector.target.position().left;
			App.inspector.offset.y = App.inspector.target.position().top;
		});

		$('body').on('mouseup', function() {
			App.inspector.active = false;
		})

		$('body').on('mousemove', function(e) {
			if (App.inspector.active) {
				App.inspector.mouse.current.x = e.clientX;
				App.inspector.mouse.current.y = e.clientY;
				App.inspector.mouse.delta.x = e.clientX - App.inspector.mouse.start.x;
				App.inspector.mouse.delta.y = e.clientY - App.inspector.mouse.start.y;

				var transformString = 'translate(' + App.inspector.mouse.delta.x + 'px, ' +  App.inspector.mouse.delta.y + 'px)';

				App.inspector.target.css('transform', transformString);
			}
		})
	}
};

window.onload = App.init;
