var stk =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var removeClass = function removeClass(selector, classes) {
  if ($(selector).hasClass(classes)) {
    $(selector).removeClass(classes);
  }
};

exports.default = removeClass;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var addClass = function addClass(selector, classes) {
  if (!$(selector).hasClass(classes)) {
    $(selector).addClass(classes);
  }
};

exports.default = addClass;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modules = __webpack_require__(3);

var App = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STKApp = function () {
	function STKApp() {
		_classCallCheck(this, STKApp);

		// methods

		this.events();

		// handlers

		this.mobile = new App.Mobile();
		this.safari = new App.Safari();
		this.insta = new App.Instafeed();
		this.inspector = new App.FabricInspector();
		this.menu = new App.Menu();
		this.scroll = new App.Scroller(this.onScroll);
		this.index = new App.IndexHandler(this.onFilterStart, this.onFilterComplete);
		this.loadMore = new App.LoadMore(this.onLoadMore);
		this.product = new App.Product();

		// set up

		this.onResize();
	}

	_createClass(STKApp, [{
		key: 'events',
		value: function events() {
			var _this = this;

			// internal event handlers

			this.onLoadMore = function (type) {
				// on ajax load

				_this.scroll.onScroll();

				if (type == 'index') {
					_this.inspector.conformImages();
					_this.index.formatGrid();
				}
			};
			this.onFilterStart = function () {
				// on index filter start

				_this.menu.closeMenu();
				//App.removeOverlay();
			};
			this.onFilterComplete = function () {
				// on index filter complete

				_this.scroll.onScroll();
			};
			this.onScroll = function () {
				// on scroll event complete

				_this.menu.closeMenu();
			};

			// window events

			this.onResize = function () {
				// change video/ image size

				if (isHome) {
					var $target = $('.landing__image video');

					// check if no video

					if ($target.length == 0) {
						$target = $('.landing__image img');
					}

					if ($target.length > 0) {
						// change width

						if ($target.width() < window.innerWidth) {
							$target.css({ width: '100%', height: 'auto' });
						}

						// change height

						if ($target.height() < window.innerHeight) {
							$target.css({ width: 'auto', height: '100%' });
						}
					}
				}
			};
			$(window).on('resize', function () {
				_this.onResize();
			});
		}
	}]);

	return STKApp;
}();

window.onload = function () {
	var stk = new STKApp();
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scroller = exports.Safari = exports.Product = exports.Mobile = exports.Menu = exports.LoadMore = exports.Instafeed = exports.IndexHandler = exports.FabricInspector = undefined;

var _index_handler = __webpack_require__(4);

var _index_handler2 = _interopRequireDefault(_index_handler);

var _insta_feed = __webpack_require__(6);

var _insta_feed2 = _interopRequireDefault(_insta_feed);

var _load_more = __webpack_require__(7);

var _load_more2 = _interopRequireDefault(_load_more);

var _menu = __webpack_require__(8);

var _menu2 = _interopRequireDefault(_menu);

var _mobile = __webpack_require__(9);

var _mobile2 = _interopRequireDefault(_mobile);

var _product = __webpack_require__(10);

var _product2 = _interopRequireDefault(_product);

var _safari = __webpack_require__(11);

var _safari2 = _interopRequireDefault(_safari);

var _scroller = __webpack_require__(12);

var _scroller2 = _interopRequireDefault(_scroller);

var _fabric_inspector = __webpack_require__(13);

var _fabric_inspector2 = _interopRequireDefault(_fabric_inspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.FabricInspector = _fabric_inspector2.default;
exports.IndexHandler = _index_handler2.default;
exports.Instafeed = _insta_feed2.default;
exports.LoadMore = _load_more2.default;
exports.Menu = _menu2.default;
exports.Mobile = _mobile2.default;
exports.Product = _product2.default;
exports.Safari = _safari2.default;
exports.Scroller = _scroller2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loading_bar = __webpack_require__(5);

var _loading_bar2 = _interopRequireDefault(_loading_bar);

var _remove_class = __webpack_require__(0);

var _remove_class2 = _interopRequireDefault(_remove_class);

var _add_class = __webpack_require__(1);

var _add_class2 = _interopRequireDefault(_add_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexHandler = function () {
				function IndexHandler(onFilterStart, onFilterComplete) {
								_classCallCheck(this, IndexHandler);

								// index handling

								this.onFilterStart = onFilterStart;
								this.onFilterComplete = onFilterComplete;
								this.loadingBar = new _loading_bar2.default();

								// general hover

								this.general();

								// init index or load

								if (pageTitle === 'Index') {
												this.initPage();
								} else {
												if (!isHome) {
																this.loadingBar.reset();
												}
								}
				}

				_createClass(IndexHandler, [{
								key: 'initPage',
								value: function initPage() {
												var _this2 = this;

												// setup index page ajax functions

												this.lastHash = null;

												$('.index-trigger').on('click', function (e) {
																// trigger an overlay or ajax load

																if ($(e).hasClass('overlay-loaded')) {
																				_this2.addOverlay();
																} else {
																				$('.overlay-loaded').removeClass('overlay-loaded');
																				$(e).addClass('overlay-loaded');

																				// set hash, load

																				_this2.lastHash = window.location.hash;
																				_this2.loadIndexItem($(e).data('post'));
																}
												});

												$('.index-overlay').on('scroll', function () {
																// check for end of overlay, ? = close

																if (!$('.index-overlay').hasClass('disable-scroll-events')) {
																				var top = -$('.index-overlay').scrollTop();
																				var h = $('.index-overlay__inner').height();
																				var end = top + h;
																				var trigger = 36; //window.innerHeight * 0.05; ???

																				if (end < trigger) {
																								this.removeOverlay();
																				}
																}
												});

												// custom back button handling

												$(window).on('hashchange', function () {
																if (window.location.hash == '' || _this2.lastHash == window.location.hash) {
																				_this2.removeOverlay();
																}
												});

												// auto-load from hash

												if (window.location.hash) {
																var hash = window.location.hash;
																var triggers = $('.index-trigger');

																for (var i = 0; i < triggers.length; i += 1) {
																				var $a = $(triggers[i]).find('a');

																				if ($a) {
																								var ref = $a.attr('href');

																								if (ref.indexOf(hash) != -1) {
																												$(triggers[i]).click();
																								}
																				}
																}
												}

												// filter events

												$('.filter').on('click', function (e) {
																_this2.filter(e);
												});
								}
				}, {
								key: 'addOverlay',
								value: function addOverlay(content) {
												// add ajax loaded project to index page

												$('.index-overlay').scrollTop(0);

												// add new content

												if (content) {
																$('.index-overlay__inner').html(content);
												}

												// set classes/ style

												(0, _remove_class2.default)('.index-overlay', 'disable-scroll-events');
												(0, _add_class2.default)('.index-grid', 'fade');
												(0, _remove_class2.default)('.index-overlay', 'slide-up');
												(0, _add_class2.default)('.index-overlay', 'active');
								}
				}, {
								key: 'removeOverlay',
								value: function removeOverlay() {
												// close overlay/ project screen

												if ($('.index-overlay').length && $('.index-overlay').hasClass('active')) {
																// animate classes

																(0, _add_class2.default)('.index-overlay', 'slide-up');
																(0, _add_class2.default)('.index-overlay', 'disable-scroll-events');
																(0, _remove_class2.default)('.index-grid', 'fade');

																// remove after animation

																setTimeout(function () {
																				(0, _remove_class2.default)('.index-overlay', 'active');
																				(0, _remove_class2.default)('.index-overlay', 'slide-up');
																}, 400);
												}
								}
				}, {
								key: 'loadIndexItem',
								value: function loadIndexItem(id) {
												// ajax load index item (project)

												var _this = this;

												$.ajax({
																type: "POST",
																dataType: "text",
																url: ajaxUrl,
																data: '&id=' + id + '&action=ajax_index',
																success: function success(data) {
																				// parse data, animate loading bar

																				_this.addOverlay(data);
																				_this.loadingBar.reset();
																},
																error: function error(jqXHR, textStatus, errorThrown) {
																				console.log(jqXHR, textStatus, errorThrown);
																}
												});
								}
				}, {
								key: 'filter',
								value: function filter(element) {
												// filter the index grid

												var $e = $(element);
												var selector = '.' + $e.data('filter');

												// find elements, fade out

												if (!$e.hasClass('active') && selector != '.filter-all') {
																$('.filter.active').removeClass('active');
																$e.addClass('active');
																$('.index-grid .item').addClass('transparent');
												} else {
																if (selector == '.filter-all') {
																				$('.filter.active').removeClass('active');
																}
																selector = '.filter-item';
																$e.removeClass('active');
																$('.index-grid .item').addClass('transparent');
												}

												// fade in

												setTimeout(function () {
																$('.filter-item').addClass('hide');
																$(selector).removeClass('hide');

																// reformat grid, show

																this.formatGrid();
																$('.index-grid .item').removeClass('transparent');

																// send up

																this.onFilterComplete();
												}, 500);

												// close menus

												$('html, body').animate({ scrollTop: $('.index-grid').offset().top }, 500);

												this.onFilterStart();
								}
				}, {
								key: 'formatGrid',
								value: function formatGrid() {
												// format grid

												var count = 0;

												$('.grid__divider').remove();
												$('.index-grid .item').each(function (i, e) {
																if (!$(e).hasClass('hide')) {
																				// format based on index

																				if (count % 2 == 1) {
																								$(e).removeClass('left');
																								$(e).addClass('right');
																								$(e).after($('<div></div>', { class: 'grid__divider' }));
																				} else {
																								$(e).removeClass('right');
																								$(e).addClass('left');
																				}

																				// increment

																				count += 1;
																}
												});

												// remove unneeded dividers

												if ($('.grid__divider').length >= count / 2) {
																$('.grid__divider').last().remove();
												}
								}
				}, {
								key: 'general',
								value: function general() {
												// general index hover functions (show, hide)

												$('.grid').on('mouseenter', '.reveal-children', function (e) {
																var $elem = $(e);
																var $children = $elem.find('.reveal');

																if (!$children.hasClass('active')) {
																				$children.addClass('active');
																}
												});
												$('.grid').on('mouseleave', '.reveal-children', function (e) {
																var $elem = $(e);
																var $children = $elem.find('.reveal');

																if ($children.hasClass('active')) {
																				$children.removeClass('active');
																}
												});
								}
				}]);

				return IndexHandler;
}();

exports.default = IndexHandler;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadingBar = function () {
		function LoadingBar() {
				// top loading bar

				_classCallCheck(this, LoadingBar);
		}

		_createClass(LoadingBar, [{
				key: 'reset',
				value: function reset() {
						var _this = this;

						// run loading animation

						this.toLoad = 0;
						this.hasLoaded = 0;

						// setup doc

						$('.loading-bar').removeClass('disabled');
						$('.loading-bar__inner').css('width', '25%');
						$('.to-load').each(function (index, elem) {
								if (elem.complete == false) {
										_this.toLoad += 1;
										elem.onload = function () {
												this.hasLoaded += 1;
												this.loadingBarUpdate();
										};
								}
						});

						this.loadingBarUpdate();
				}
		}, {
				key: 'loadingBarUpdate',
				value: function loadingBarUpdate() {
						// update loading progress bar

						if (this.toLoad == this.hasLoaded || this.toLoad == 0) {
								// animate complete

								$('.loading-bar__inner').css('width', '100%');
								setTimeout(function () {
										$('.loading-bar').addClass('disabled');
										setTimeout(function () {
												$('.loading-bar__inner').css('width', '0%');
										}, 500);
								}, 500);
						} else {
								// animate progress

								var percent = 25 + 75 * (this.hasLoaded / this.toLoad);
								$('.loading-bar__inner').css('width', percent + '%');
						}
				}
		}]);

		return LoadingBar;
}();

exports.default = LoadingBar;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instafeed = function Instafeed() {
	_classCallCheck(this, Instafeed);

	// ajax get instagram feed and inject it into doc

	if (isHome) {
		$.ajax({
			type: "POST",
			dataType: "text",
			url: ajaxUrl,
			data: '&action=ajax_insta',
			success: function success(data) {
				// create jquery object for utility

				var body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
				var $body = $(body);

				for (var i = 0; i < $body[0].children.length; i += 1) {
					// parse child nodes

					var node = $body[0].children[i];

					if (node.innerHTML.indexOf('window._sharedData') != -1) {
						// parse text

						var text = node.innerHTML.split('=');
						text.shift();
						text = text.join('=');
						text = text.replace(/;/g, '');
						var feed = JSON.parse(text);
						var images = feed.entry_data.ProfilePage[0].user.media.nodes;
						images = images.map(function (item) {
							return item.thumbnail_src;
						});

						for (var j = 0; j < images.length; j++) {
							// add to doc

							$('.instagram-grid__inner').append($('<div />', {
								class: 'grid__sixth responsive item',
								html: "<div class=\"item__inner clickable\"><a target=\"_blank\" href=\"https://www.instagram.com/teuberkohlhoff/\"><img src=\"" + images[j] + "\" /></a></div>"
							}));
						}
					}
				}
			},
			error: function error(jqXHR, textStatus, errorThrown) {
				console.warn(jqXHR, textStatus, errorThrown);
			}
		});
	}
};

exports.default = Instafeed;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadMore = function () {
		function LoadMore(onLoad) {
				_classCallCheck(this, LoadMore);

				// ajax load handler

				this.onLoad = onLoad;
				this.events();
		}

		_createClass(LoadMore, [{
				key: 'events',
				value: function events() {
						var _this = this;

						// hook up buttons

						if (isHome) {
								$('#load-more-projects').on('click', function (e) {
										_this.load($(e.target), 'index');
								});

								$('#load-more-editorials').on('click', function (e) {
										_this.load($(e.target), 'editorials');
								});
						}
				}
		}, {
				key: 'load',
				value: function load(button, type) {
						var _this2 = this;

						// submit ajax request

						var postCount = -1;
						var offset = 0;
						var target = null;

						// settings

						if (type === 'index') {
								offset = $('.index-grid .item').length;
								target = '.index-grid';
						} else if (type === 'editorials') {
								offset = $('.editorials-grid .item').length;
								target = '.editorials-grid';
						}

						// hide button

						button.css('opacity', 0);

						// submit

						$.ajax({
								type: "POST",
								dataType: "text",
								url: ajaxUrl,
								data: '&offset=' + offset + '&postCount=' + postCount + '&type=' + type + '&action=ajax_load',
								success: function success(data) {
										// parse data, remove button

										$(target).append(data);
										button.remove();

										// send up

										_this2.onLoad(type);
								},
								error: function error(jqXHR, textStatus, errorThrown) {
										console.warn(jqXHR, textStatus, errorThrown);
								}
						});
				}
		}]);

		return LoadMore;
}();

exports.default = LoadMore;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
		function Menu() {
				_classCallCheck(this, Menu);

				// pop-out menu

				this.events();
		}

		_createClass(Menu, [{
				key: 'openMenu',
				value: function openMenu() {
						// open the main menu

						if (!$('.menu').hasClass('open')) {
								$('.menu').addClass('open');
						}
						$('.nav__filter, .nav__cart').addClass('active');
				}
		}, {
				key: 'toggleMenu',
				value: function toggleMenu() {
						// toggle menu

						$('.menu').toggleClass('open');

						if ($('.menu').hasClass('open')) {
								$('.nav__filter, .nav__cart').addClass('active');
						} else {
								$('.nav__filter, .nav__cart').removeClass('active');
						}
				}
		}, {
				key: 'closeMenu',
				value: function closeMenu() {
						// close the main menu

						$('.menu').removeClass('open');
						$('.nav__filter, .nav__cart').removeClass('active');
				}
		}, {
				key: 'events',
				value: function events() {
						var _this = this;

						// dom events

						$('.nav__filter').on('click', function () {
								_this.toggleMenu();
						});
						$('.menu').on('mouseleave', function (e) {
								if (e.clientX < window.innerWidth / 2) {
										_this.closeMenu();
								}
						});
						$('.open-menu').on('click', function (e) {
								var $target = $($(e).data('target'));
								$(e).toggleClass('active');
								$target.toggleClass('active');
						});
				}
		}]);

		return Menu;
}();

exports.default = Menu;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mobile = function () {
  function Mobile() {
    var _this = this;

    _classCallCheck(this, Mobile);

    // mobile utilities

    this.check();

    // apply mobile changes

    if (this.isMobile) {
      this.conform();
    }

    // nav

    $('.nav-mobile-button').on('click', function () {
      _this.toggleMobileNav();
    });
  }

  _createClass(Mobile, [{
    key: 'toggleMobileNav',
    value: function toggleMobileNav() {
      // mobile nav
    }
  }, {
    key: 'conform',
    value: function conform() {
      // strip excess index items

      if (isHome) {
        $('.index-grid .item').each(function (i, e) {
          if (i >= 3) {
            $(e).remove();
          }
        });
      }
    }
  }, {
    key: 'check',
    value: function check() {
      // check if mobile browser

      this.isMobile = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) this.isMobile = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
    }
  }]);

  return Mobile;
}();

exports.default = Mobile;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product() {
    _classCallCheck(this, Product);

    // init product page display

    this.init();
  }

  _createClass(Product, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // product display

      $('.product__info__attribute select').each(function (i, e) {
        var $e = $(e);
        var id = $e.attr('id');

        if (id != 'pa_colour') {
          // hide element

          $e.addClass('hidden');

          // add swatch bar

          var $swatchBar = $('<div></div>', { class: 'swatches' });
          $swatchBar.insertAfter($e);

          // set unique class selector

          var uClass = 'attr-button-' + $e.attr('name');
          var selector = '.' + uClass;

          // add options

          $e.find('option').each(function (j, elem) {
            if (j != 0) {
              var $button = $('<div></div>', {
                class: 'attr-button ' + uClass,
                text: $(elem).text()
              });

              $button.data('value', $(elem).val());

              if ($(elem).is(':selected')) {
                $button.addClass('active');
              }

              $swatchBar.append($button);
            }
          });

          // hook up events

          $(document).on('click', selector, function () {
            $(selector).removeClass('active');
            $(_this).addClass('active');
            $e.val($(_this).data('value'));
          });
        }
      });

      // colour

      if ($('.colour__swatch__bank').length > 0) {
        this.setColours();
      }
    }
  }, {
    key: 'setColours',
    value: function setColours() {
      // set swatch colours

      $('.colour__swatch__bank').each(function (i, e) {
        var $e = $(e);
        var $swatches = $e.find('.swatch');

        $swatches.each(function (j, elem) {
          var $swatch = $(elem);

          $e.before($('<div></div>', {
            class: 'shop-grid__product__colour reveal',
            css: {
              'background-color': $swatch.css('background-color')
            }
          }));
        });
      });
    }
  }]);

  return Product;
}();

exports.default = Product;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Safari = function () {
  function Safari() {
    _classCallCheck(this, Safari);

    // safari utilities

    this.check();

    // make browser-specific changes

    this.conform();
  }

  _createClass(Safari, [{
    key: 'conform',
    value: function conform() {
      // change videos to autoplay on safari

      $('video').attr('controls', true);
    }
  }, {
    key: 'check',
    value: function check() {
      // check for safari

      var agent = navigator.userAgent.toLowerCase();

      if (agent.indexOf('safari') != -1 && agent.indexOf('chrome') == -1) {
        this.isSafari = true;
      } else {
        this.isSafari = false;
      }
    }
  }]);

  return Safari;
}();

exports.default = Safari;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _add_class = __webpack_require__(1);

var _add_class2 = _interopRequireDefault(_add_class);

var _remove_class = __webpack_require__(0);

var _remove_class2 = _interopRequireDefault(_remove_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroller = function () {
				function Scroller(onScrollEvent) {
								var _this = this;

								_classCallCheck(this, Scroller);

								// scroll & parallax handler

								this.onScrollEvent = onScrollEvent;

								// events

								this.onScroll();
								$(document).on('scroll', function () {
												_this.onScroll();
								});
				}

				_createClass(Scroller, [{
								key: 'parallax',
								value: function parallax(y) {
												// trigger parallax scroll events

												var trigger = y + window.innerHeight;

												$('.parallax-once').each(function (i, e) {
																// activate parallax elements

																var $elem = $(e);

																if ($elem.offset().top < trigger) {
																				$elem.removeClass('parallax-once');
																				$elem.addClass('parallax-active');
																}
												});
								}
				}, {
								key: 'triggerEvents',
								value: function triggerEvents(y) {
												// trigger scroll events

												var trigger = y;
												var pageHeight = window.innerHeight;

												// home page events

												if (isHome) {
																if (y >= pageHeight) {
																				// hide landing page images or video

																				(0, _add_class2.default)('.landing', 'hidden');

																				// snap nav bar and menu

																				(0, _add_class2.default)('.nav', 'active');
																				(0, _add_class2.default)('.menu', 'active');
																} else {
																				// show landing page images or video

																				(0, _remove_class2.default)('.landing', 'hidden');

																				// unsnap nav and menu

																				(0, _remove_class2.default)('.nav', 'active');
																				(0, _remove_class2.default)('.menu', 'active');
																}

																// set title & menu colours

																var title = '';
																var navHeight = $('.nav').height();

																$('.trigger').each(function (i, e) {
																				var $elem = $(e);
																				var top = $elem.offset().top;

																				if (top - navHeight <= trigger) {
																								if ($elem.data('title')) {
																												title = $elem.data('title');
																								}

																								if ($elem.data('invert')) {
																												(0, _add_class2.default)('.nav', 'inverted');
																												(0, _add_class2.default)('.menu', 'inverted');
																								} else {
																												(0, _remove_class2.default)('.nav', 'inverted');
																												(0, _remove_class2.default)('.menu', 'inverted');
																								}
																				}
																});

																// change section title

																if ($('#current-section').text() != title) {
																				$('#current-section').text(title);
																}

																if ($('#current-section-mobile').text() != title) {
																				$('#current-section-mobile').text(title);
																}
												}
								}
				}, {
								key: 'onScroll',
								value: function onScroll() {
												// handle doc scroll

												var y = $(document).scrollTop();

												// parallax events

												this.parallax(y);
												this.triggerEvents(y);

												// send up

												this.onScrollEvent();
								}
				}]);

				return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(14);

var _vector2 = _interopRequireDefault(_vector);

var _limit = __webpack_require__(15);

var _limit2 = _interopRequireDefault(_limit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FabricInspector = function () {
  function FabricInspector() {
    _classCallCheck(this, FabricInspector);

    // fabric inspection widget

    this.active = false;
    this.id = null;
    this.parent = null;
    this.target = null;
    this.offset = new _vector2.default();
    this.limit = {
      x: new _limit2.default(),
      y: new _limit2.default()
    };
    this.mouse = {
      start: new _vector2.default(),
      current: new _vector2.default(),
      delta: new _vector2.default()
    };
  }

  _createClass(FabricInspector, [{
    key: 'resize',
    value: function resize(image) {
      // resize and position image

      var x = -image.naturalWidth / 2;
      var y = -image.naturalHeight / 2;

      $(image).css({
        position: 'absolute',
        width: image.naturalWidth + 'px',
        height: image.naturalHeight + 'px',
        top: 0,
        left: 0,
        transform: this.getTransformString(x, y)
      });
    }
  }, {
    key: 'conformImages',
    value: function conformImages() {
      var _this = this;

      // conform all images

      $('.inspector__image').each(function (i, e) {
        if (!$(e).hasClass('formatted')) {
          // resize, reposition

          _this.resize(e);
          e.onload = function () {
            thi.resize(e);
          };

          // register

          $(e).addClass('formatted');
        }
      });
    }
  }, {
    key: 'doc',
    value: function doc() {
      var _this2 = this;

      // setup doc

      if (isHome || $('.inspector').length) {
        // resize images

        $('.inspector__image').each(function (i, e) {
          _this2.resize(e);
          e.onload = function () {
            _this2.resize(e);
          };
        });

        // set events

        this.events();
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.active = false;
    }
  }, {
    key: 'events',
    value: function events() {
      var _this3 = this;

      // dom events

      $('body').on('mouseover', '.inspector', function (e) {
        // get selectors, init transform

        console.log(e);
        _this3.active = true;
        _this3.id = '#' + $(e).attr('id');
        _this3.mouse.start.set(e.clientX, e.clientY);
        _this3.parent = $(_this3.id);
        _this3.target = $(_this3.id + ' .inspector__image');
        _this3.offset.set(_this3.target.position().left, _this3.target.position().top);

        // set limits

        var w0 = _this3.target.outerWidth();
        var h0 = _this3.target.outerHeight();
        var w1 = _this3.parent.outerWidth();
        var h1 = _this3.parent.outerHeight();

        _this3.limit.x.set(-(w0 - w1), 0);
        _this3.limit.y.set(-(h0 - h1), 0);
      });

      $('body').on('mousemove', function (e) {
        // handle mouse

        if (_this3.active) {
          _this3.mouse.current.set(e.clientX, e.clientY);
          _this3.mouse.delta.set(e.clientX - _this3.mouse.start.x, e.clientY - _this3.mouse.start.y);

          // get new position

          var x = _this3.limit.x.clamp(_this3.mouse.delta.x * 0.5 + _this3.offset.x);
          var y = _this3.limit.y.clamp(_this3.mouse.delta.y * 0.5 + _this3.offset.y);

          // css transform

          _this3.target.css('transform', _this3.getTransformString(x, y));
        }
      });

      // deactivation events

      $('body').on('mouseout', '.inspector', function () {
        _this3.deactivate();
      });
      $('body').on('mouseup', function () {
        _this3.deactivate();
      });
      $(document).mouseleave(function () {
        _this3.deactivate();
      });
    }
  }, {
    key: 'getTransformString',
    value: function getTransformString(x, y) {
      // get css transform string

      return 'translate(' + x + 'px, ' + y + 'px)';
    }
  }]);

  return FabricInspector;
}();

exports.default = FabricInspector;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);

  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Limit = function () {
  function Limit(min, max) {
    _classCallCheck(this, Limit);

    this.min = min ? min : 0;
    this.max = max ? max : 0;
  }

  _createClass(Limit, [{
    key: "set",
    value: function set(min, max) {
      this.min = min;
      this.max = max;
    }
  }, {
    key: "collision",
    value: function collision(value) {
      // check if inside limit

      return value >= this.min && value <= this.max;
    }
  }, {
    key: "clamp",
    value: function clamp(value) {
      // clamp value inside limit

      return Math.min(this.max, Math.max(this.min, value));
    }
  }]);

  return Limit;
}();

exports.default = Limit;

/***/ })
/******/ ]);