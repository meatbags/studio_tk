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
		$('.nav__filter').on('click', function(){
			App.toggleMenu();
		});
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

		// load fabric inspectors
		if (isHome || $('.inspector').length) {
			App.initInspector();
		}

		// index ajax loading
		if (pageTitle === 'Index') {
			App.initOverlay();
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

		// filters
		$('.filter').on('click', function(){
			App.filter(this);
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
				if (type === 'index') {
					App.conformInspectors();
					App.reformatIndexGrid();
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus + ', ' + errorThrown);
			}
		});

		$button.css('opacity', 0);
	},

	loadIndex: function(id) {
		var req = '&id=' + id + '&action=ajax_index';

		$.ajax({
			type: "POST",
			dataType: "text",
			url: ajaxUrl,
			data: req,
			success: function(data){
				App.addOverlay(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus + ', ' + errorThrown);
			}
		});
	},

	onScroll: function() {
		var scrollTop = $(document).scrollTop();

		// parallax
		App.parallax(scrollTop);

		// trigger events
		App.trigger(scrollTop);
	},

	initOverlay: function() {
		// index page ajax funcs
		App.lastHash = null;

		$('.index-trigger').on('click', function(e){
			if ($(this).hasClass('overlay-loaded')) {
				App.addOverlay();
			} else {
				$('.overlay-loaded').removeClass('overlay-loaded');
				$(this).addClass('overlay-loaded');
				var postId = $(this).data('post');
				App.lastHash = window.location.hash;
				App.loadIndex(postId);
			}
		});

		$('.index-overlay').on('click', function(){
			//App.removeOverlay();
		});

		$('.index-overlay').on('scroll', function() {
			if (!$('.index-overlay').hasClass('disable-scroll-events')) {
				var top = -$('.index-overlay').scrollTop();
				var h = $('.index-overlay__inner').height();
				var end = top + h;
				var trigger = 36; //window.innerHeight * 0.05;

				if (end < trigger) {
					App.removeOverlay();
				}
			}
		});

		// back button

		$(window).on('hashchange', function(){
			if (window.location.hash == '' || App.lastHash == window.location.hash) {
				App.removeOverlay();
			}
		})
	},

	addOverlay: function(content) {
		// open the index page overlay screen

		$('.index-overlay').scrollTop(0);
		$('.index-overlay__inner').html(content);
		App.removeClass('.index-overlay', 'disable-scroll-events');
		App.addClass('.index-grid', 'fade');
		App.removeClass('.index-overlay', 'slide-up');
		App.addClass('.index-overlay', 'active');
	},

	removeOverlay: function() {
		// close the index page overlay screen

		if ($('.index-overlay').length && $('.index-overlay').hasClass('active')) {
			App.addClass('.index-overlay', 'slide-up');
			App.addClass('.index-overlay', 'disable-scroll-events');
			App.removeClass('.index-grid', 'fade');

			setTimeout(function(){
				App.removeClass('.index-overlay', 'active');
				App.removeClass('.index-overlay', 'slide-up');
			}, 400);
		}
	},

	trigger: function(y) {
		// trigger events based on scrollTop (y)

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
		// remove class (once)

		if ($(selector).hasClass(className)) {
			$(selector).removeClass(className);
		}
	},

	addClass: function(selector, className) {
		// add class (once)

		if (!$(selector).hasClass(className)) {
			$(selector).addClass(className);
		}
	},

	parallax: function(y) {
		// trigger parallax events

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
		// open the main menu

		App.addClass('.menu', 'open');
	},

	closeMenu: function() {
		// close the main menu

		App.removeClass('.menu', 'open');
	},

	toggleMenu: function() {
		$('.menu').toggleClass('open');
	},

	filter: function(elem) {
		// filter items

		var $elem = $(elem);
		var selector = '.' + $elem.data('filter');

		if (!$elem.hasClass('active')) {
			$('.filter.active').removeClass('active');
			$elem.addClass('active');
			$('.index-grid .item').addClass('transparent');
		} else {
			selector = '.filter-item';
			$elem.removeClass('active');
			$('.index-grid .item').addClass('transparent');
		}

		setTimeout(function(){
			$('.filter-item').addClass('hide');
			$(selector).removeClass('hide');
			App.reformatIndexGrid();
			$('.index-grid .item').removeClass('transparent');
			App.onScroll();
		}, 500);

		// close menus
		$('html, body').animate({scrollTop: $('.index-grid').offset().top}, 500);
		App.closeMenu();
		App.removeOverlay();
	},

	reformatIndexGrid: function() {
		// reformat the index grid (after filter)
		var count = 0;

		$('.grid__divider').remove();
		$('.index-grid .item').each(function(i, e){
			if (!$(e).hasClass('hide')) {
				if (count % 2 == 1) {
					$(e).removeClass('right');
					$(e).addClass('left');
					$(e).after($('<div></div>', {class:'grid__divider'}));
				} else {
					$(e).removeClass('left');
					$(e).addClass('right');
				}
				count += 1;
			}
		});

		if ($('.grid__divider').length >= count / 2) {
			$('.grid__divider').last().remove();
		}
	},

	resizeInspectorImage(img) {
		// resize image and centre it in the fabric inspector

		var x = -img.naturalWidth / 2;
		var y = -img.naturalHeight / 2;
		var transformString = 'translate(' + x + 'px, ' + y + 'px)';

		$(img).css({
			width: img.naturalWidth + 'px',
			height: img.naturalHeight + 'px',
			top: 0,
			left: 0,
			transform: transformString
		});
	},

	initInspector: function() {
		// fabric inspector thing

		App.inspector = {
			active: false,
			id: null,
			parent: null,
			target: null,
			offset: {
				x: 0,
				y: 0
			},
			limit: {
				x: {
					min: 0,
					max: 0
				},
				y: {
					min: 0,
					max: 0
				}
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

		$('.inspector__image').each(function(i,e){
			// resize image
			App.resizeInspectorImage(e);
			e.onload = function() {
				// catch if img not loaded
				App.resizeInspectorImage(e);
			};
		});

		$('body').on('mousedown', '.inspector', function(e){
			var w0, h0, w1, h1;

			// get selectors and initial positions
			App.inspector.active = true;
			App.inspector.id = '#' + $(this).attr('id');
			App.inspector.mouse.start.x = e.clientX;
			App.inspector.mouse.start.y = e.clientY;
			App.inspector.parent = $(App.inspector.id);
			App.inspector.target = $(App.inspector.id + ' .inspector__image');
			App.inspector.offset.x = App.inspector.target.position().left;
			App.inspector.offset.y = App.inspector.target.position().top;

			// calculate transform limit
			w0 = App.inspector.target.width();
			h0 = App.inspector.target.height();
			w1 = App.inspector.parent.width();
			h1 = App.inspector.parent.height();

			App.inspector.limit.x.min = -(w0 - w1);
			App.inspector.limit.y.min = -(h0 - h1);
			App.inspector.limit.x.max = 0;
			App.inspector.limit.y.max = 0;
		});

		$('body').on('mousemove', function(e) {
			if (App.inspector.active) {
				var x, y, transformString;

				// get mouse pos
				App.inspector.mouse.current.x = e.clientX;
				App.inspector.mouse.current.y = e.clientY;
				App.inspector.mouse.delta.x = e.clientX - App.inspector.mouse.start.x;
				App.inspector.mouse.delta.y = e.clientY - App.inspector.mouse.start.y;

				// calc new transform
				x = App.inspector.mouse.delta.x * 0.6 + App.inspector.offset.x;
				y = App.inspector.mouse.delta.y * 0.6 + App.inspector.offset.y;

				// limit
				x = Math.min(App.inspector.limit.x.max, Math.max(App.inspector.limit.x.min, x));
				y = Math.min(App.inspector.limit.y.max, Math.max(App.inspector.limit.y.min, y));

				transformString = 'translate(' + x + 'px, ' + y + 'px)';
				App.inspector.target.css('transform', transformString);
			}
		});

		$('body').on('mouseup', function() {
			// stop
			App.inspector.active = false;
		});

		$(document).mouseleave(function () {
			// stop
			App.inspector.active = false;
		});
	},

	conformInspectors: function() {
		$('.inspector__image').each(function(i, e){
			if (!$(this).hasClass('formatted')) {
				// resize image
				App.resizeInspectorImage(e);
				e.onload = function() {
					// catch if img not loaded
					App.resizeInspectorImage(e);
				};

				$(this).addClass('formatted');
			}
		});
	}
};

window.onload = App.init;
