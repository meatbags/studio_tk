import LoadingBar from './loading_bar';
import removeClass from './remove_class';
import addClass from './add_class';

class IndexHandler {
  constructor(onFilterStart, onFilterComplete) {
    // index handling

    this.onFilterStart = onFilterStart;
    this.onFilterComplete = onFilterComplete;
    this.loadingBar = new LoadingBar();

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

  initPage() {
    // setup index page ajax functions

    this.lastHash = null;

		$('.index-trigger').on('click', (e) => {
      // trigger an overlay or ajax load

      const $e = $(e.currentTarget);

			if ($e.hasClass('overlay-loaded')) {
				this.addOverlay();
			} else {
        // reset any other loaded item

				$('.overlay-loaded').removeClass('overlay-loaded');

        // flag

        $e.addClass('overlay-loaded');

        // set hash, load

        this.lastHash = window.location.hash;
				this.loadIndexItem($e.data('post'));
			}
		});

		$('.index-overlay').on('scroll', () => {
      // check for end of overlay, ? = close

			if (!$('.index-overlay').hasClass('disable-scroll-events')) {
				const top = -$('.index-overlay').scrollTop();
				const h = $('.index-overlay__inner').height();
				const end = top + h;
				const trigger = 36; //window.innerHeight * 0.05; ???

				if (end < trigger) {
					this.removeOverlay();
				}
			}
		});

		// custom back button handling

		$(window).on('hashchange', () => {
			if (window.location.hash == '' || this.lastHash == window.location.hash) {
				this.removeOverlay();
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

    // filter events

    $('.filter').on('click', (e) => {
			this.filter(e.currentTarget);
		});
  }

  addOverlay(content) {
    // add ajax loaded project to index page

		$('.index-overlay').scrollTop(0);

    // add new content

    if (content) {
		  $('.index-overlay__inner').html(content);
    }

    // set classes/ style

    removeClass('.index-overlay', 'disable-scroll-events');
		addClass('.index-grid', 'fade');
		removeClass('.index-overlay', 'slide-up');
		addClass('.index-overlay', 'active');
  }

  removeOverlay() {
    // close overlay/ project screen

    if ($('.index-overlay').length && $('.index-overlay').hasClass('active')) {
      // animate classes

      addClass('.index-overlay', 'slide-up');
			addClass('.index-overlay', 'disable-scroll-events');
			removeClass('.index-grid', 'fade');

      // remove after animation

			setTimeout(function(){
				removeClass('.index-overlay', 'active');
				removeClass('.index-overlay', 'slide-up');
			}, 400);
		}
  }

  loadIndexItem(id) {
    // ajax load index item (project)

		$.ajax({
			type: "POST",
			dataType: "text",
			url: ajaxUrl,
			data: `&id=${id}&action=ajax_index`,
			success: (data) => {
        // parse data, animate loading bar

				this.addOverlay(data);
        this.loadingBar.reset();
			},
			error: (jqXHR, textStatus, errorThrown) => {
				console.log(jqXHR, textStatus, errorThrown);
			}
		});
  }

  filter(element) {
    // filter the index grid

    const $e = $(element);
    let selector = `.${$e.data('filter')}`;

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

		setTimeout(function(){
			$('.filter-item').addClass('hide');
			$(selector).removeClass('hide');

      // reformat grid, show

      this.formatGrid();
			$('.index-grid .item').removeClass('transparent');

      // send up

      this.onFilterComplete();
		}, 500);

		// close menus

		$('html, body').animate({scrollTop: $('.index-grid').offset().top}, 500);

    this.onFilterStart();
  }

  formatGrid() {
    // format grid

    let count = 0;

    $('.grid__divider').remove();
    $('.index-grid .item').each((i, e) => {
			if (!$(e).hasClass('hide')) {
        // format based on index

				if (count % 2 == 1) {
					$(e).removeClass('left');
					$(e).addClass('right');
					$(e).after($('<div></div>', {class:'grid__divider'}));
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

  general() {
    // general index hover functions (show, hide)

    $('.grid').on('mouseenter', '.reveal-children', (e) => {
			const $elem = $(e.currentTarget);
			const $children = $elem.find('.reveal');

			if (!$children.hasClass('active')) {
				$children.addClass('active');
			}
		});

		$('.grid').on('mouseleave', '.reveal-children', (e) => {
			const $elem = $(e.currentTarget);
			const $children = $elem.find('.reveal');

			if ($children.hasClass('active')) {
				$children.removeClass('active');
			}
		});
  }
}

export default IndexHandler;
