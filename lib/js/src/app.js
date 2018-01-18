var App = {
	init: function() {
		// check mobile
		App.mobile = App.isMobile();

		// check safari
		App.isSafari = false;
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('safari') != -1) {
		  if (ua.indexOf('chrome') == -1) {
		    App.isSafari = true;
		  }
		}

		if (App.mobile) {
			App.conformMobile();
		}

		// safari stuff
		if (App.mobile || App.isSafari) {
			$('video').attr('controls', true);
		}

		// instagram feed
		App.instagram();

		// menu
		$('.nav__filter').on('click', function(){
			App.toggleMenu();
		});
		$('.menu').on('mouseleave', function(e){
			if (e.clientX < window.innerWidth/2)
				App.closeMenu();
		});
		$('.open-menu').on('click', function(){
			var $target = $($(this).data('target'));
			$(this).toggleClass('active');
			$target.toggleClass('active');

			if ($target.hasClass('active')) {
				//$target.find('dropdown__inner').css({});
			} else {
				//$target.find('dropdown__inner').css({height: 0});
			}
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

		// index
		if (pageTitle === 'Index') {
			App.initIndexPage();
		} else {
			if (!isHome) {
				App.loadingBar();
			}
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

		// product page
		App.productPageInit();

		// scroll event
		App.onScroll();
		$(document).on('scroll', App.onScroll);

		// mobile menu
		$('.nav-mobile-button').on('click', App.toggleMobileNav);

		// colours
		if ($('.colour__swatch__bank').length > 0) {
			App.setColours();
		}

		// resize func
		App.onResize();
		$(window).on('resize', function(){ App.onResize(); });
	},

	productPageInit: function() {
		$('.product__info__attribute select').each(function(i, e){
			var $e = $(e);
			var id = $e.attr('id');

			if (id != 'pa_colour') {
				// hide element
				$e.addClass('hidden');

				// add swatch bar
				var $swatchBar = $('<div></div>', {class: 'swatches'});
				$swatchBar.insertAfter($e);

				// unique class
				var uClass = 'attr-button-' + $e.attr('name');
				var selector = '.' + uClass;

				// add options
				$e.find('option').each(function(j, elem){
					if (j != 0) {
						var $button = $('<div></div>', {
							class: 'attr-button ' + uClass,
							text: $(elem).text()
						});
						console.log($(elem).val())
						$button.data('value', $(elem).val());

						if ($(elem).is(':selected')) {
							$button.addClass('active');
						}

						$swatchBar.append($button);
					}
				});

				// hook up
				$(document).on('click', selector, function(){
					$(selector).removeClass('active');
					$(this).addClass('active');
					$e.val($(this).data('value'));
				});
			}
		});
	},

	onResize: function() {
		if (isHome) {
			var $target = $('.landing__image video');

			// check if no video
			if ($target.length == 0) {
				$target = $('.landing__image img');
			}

			if ($target.length > 0) {
				// conform width
				if ($target.width() < window.innerWidth) {
					$target.css({width: '100%', height: 'auto'});
				}

				// conform height
				if ($target.height() < window.innerHeight) {
					$target.css({width: 'auto', height: '100%'});
				}
			}
		}
	},

	instagram: function() {
		if (isHome) {
			$.ajax({
				type: "POST",
				dataType: "text",
				url: ajaxUrl,
				data: '&action=ajax_insta',
				success: function(data){
					var body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
					var $body = $(body);
					for (var i=0; i<$body[0].children.length; i+=1) {
						var node = $body[0].children[i];
						if (node.innerHTML.indexOf('window._sharedData') != -1) {
							var text = node.innerHTML.split('=');
							text.shift();
							text = text.join('=');
							text = text.replace(/;/g, '');
							var feed = JSON.parse(text);
						 	var images = feed.entry_data.ProfilePage[0].user.media.nodes;
							images = images.map(function(item){
								return item.thumbnail_src;
							})
							for (let j=0; j<images.length; j++) {
								$('.instagram-grid__inner').append(
									$('<div />', {
										class:'grid__sixth responsive item',
										html:'<div class="item__inner clickable"><a target="_blank" href="https://www.instagram.com/teuberkohlhoff/"><img src="' + images[j] + '" /></a></div>'
									})
								);
							}
						}
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus + ', ' + errorThrown);
				}
			});
		}
	},

	isMobile: function() {
	  var check = false;

	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

		return check;
	},

	conformMobile: function() {
		if (isHome) {
			// remove excess items
			$('.index-grid .item').each(function(i,e) {
				if (i >= 3) {
					$(e).remove();
				}
			})
		}
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
		// ajax load projects (/index#project_n)
		var req = '&id=' + id + '&action=ajax_index';

		$.ajax({
			type: "POST",
			dataType: "text",
			url: ajaxUrl,
			data: req,
			success: function(data){
				App.addOverlay(data);
				App.loadingBar();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus + ', ' + errorThrown);
			}
		});
	},

	onScroll: function() {
		// on page scroll

		var scrollTop = $(document).scrollTop();

		// parallax
		App.parallax(scrollTop);

		// trigger events
		App.trigger(scrollTop);

		// mobile
		if (App.mobile) {
			App.closeMenu();
		}
	},

	initIndexPage: function() {
		// setup index (projects) page ajax functions
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

		// handle back button
		$(window).on('hashchange', function(){
			if (window.location.hash == '' || App.lastHash == window.location.hash) {
				App.removeOverlay();
			}
		})

		// auto-load from hash
		if (window.location.hash) {
			const hash = window.location.hash;
			const triggers = $('.index-trigger');

			for (let i=0; i<triggers.length; i+=1) {
				const $a = $(triggers[i]).find('a');
				if ($a) {
					const ref = $a.attr('href');
					if (ref.indexOf(hash) != -1) {
						$(triggers[i]).click();
					}
				}
			}
		}
	},

	addOverlay: function(content) {
		// add ajax loaded project to index page

		$('.index-overlay').scrollTop(0);
		$('.index-overlay__inner').html(content);
		App.removeClass('.index-overlay', 'disable-scroll-events');
		App.addClass('.index-grid', 'fade');
		App.removeClass('.index-overlay', 'slide-up');
		App.addClass('.index-overlay', 'active');
	},

	removeOverlay: function() {
		// close project screen

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
		// trigger page-specific events (on scroll)

		var trigger = y;
		var pageHeight = window.innerHeight;

		// home page
		if (isHome) {
			if (y >= pageHeight) {
				// hide landing img/ video
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

			// change current section title (home page)
			if ($('#current-section').text() != title) {
				$('#current-section').text(title);
			}
			if ($('#current-section-mobile').text() != title) {
				$('#current-section-mobile').text(title);
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

	loadingBarUpdate: function() {
		if (App.toLoad == App.hasLoaded) {
			$('.loading-bar__inner').css('width', '100%');
			setTimeout(function(){
				$('.loading-bar').addClass('disabled');
				setTimeout(function(){
					$('.loading-bar__inner').css('width', '0%');
				}, 500);
			}, 500);
		} else if (App.toLoad != 0) {
			const percent = 25 + 75 * (App.hasLoaded / App.toLoad);
			$('.loading-bar__inner').css('width', percent + '%');
		}
	},

	loadingBar: function() {
		App.toLoad = 0;
		App.hasLoaded = 0;
		$('.loading-bar').removeClass('disabled');
		$('.loading-bar__inner').css('width', '25%');

		$('.to-load').each(function(index, elem){
			if (elem.complete == false) {
				App.toLoad += 1;
				elem.onload = function(){
					App.hasLoaded += 1;
					App.loadingBarUpdate();
				};
			}
		});

		App.loadingBarUpdate();
	},

	parallax: function(y) {
		// trigger parallax animations

		var trigger = y + window.innerHeight;

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
		$('.nav__filter, .nav__cart').addClass('active');
	},

	closeMenu: function() {
		// close the main menu

		App.removeClass('.menu', 'open');
		$('.nav__filter, .nav__cart').removeClass('active');
	},

	toggleMenu: function() {
		// toggle the main menu

		$('.menu').toggleClass('open');

		if ($('.menu').hasClass('open')) {
			$('.nav__filter, .nav__cart').addClass('active');
		} else {
			$('.nav__filter, .nav__cart').removeClass('active');
		}
	},

	filter: function(elem) {
		// client-side filter

		var $elem = $(elem);
		var selector = '.' + $elem.data('filter');

		if (!$elem.hasClass('active') && selector != '.filter-all') {
			$('.filter.active').removeClass('active');
			$elem.addClass('active');
			$('.index-grid .item').addClass('transparent');
		} else {
			if (selector == '.filter-all') {
				$('.filter.active').removeClass('active');
			}
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
		// reformat the index grid (ie: after filter)

		var count = 0;

		$('.grid__divider').remove();
		$('.index-grid .item').each(function(i, e){
			if (!$(e).hasClass('hide')) {
				if (count % 2 == 1) {
					$(e).removeClass('left');
					$(e).addClass('right');
					$(e).after($('<div></div>', {class:'grid__divider'}));
				} else {
					$(e).removeClass('right');
					$(e).addClass('left');
				}
				count += 1;
			}
		});

		if ($('.grid__divider').length >= count / 2) {
			$('.grid__divider').last().remove();
		}
	},

	resizeInspectorImage(img) {
		// resize image in the fabric inspector

		var x = -img.naturalWidth / 2;
		var y = -img.naturalHeight / 4;
		var transformString = 'translate(' + x + 'px, ' + y + 'px)';

		$(img).css({
			position: 'absolute',
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
				// catch if image not loaded
				App.resizeInspectorImage(e);
			};
		});

		$('body').on('mouseover', '.inspector', function(e){
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

		$('body').on('mouseout', '.inspector', function(e){
			// stop
			App.inspector.active = false;
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

	setColours: function() {
		$('.colour__swatch__bank').each(function(i, e){
			var $elem = $(e);
			var $swatches = $elem.find('.swatch');

			$swatches.each(function(j, el) {
				var $swatch = $(el);
				$elem.before($('<div></div>', {
					class: 'shop-grid__product__colour reveal',
					css: {
						'background-color': $swatch.css('background-color')
					},
				}));
			});
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
