import addClass from './add_class';
import removeClass from './remove_class';

class Scroller {
  constructor(onScrollEvent) {
    // scroll & parallax handler

    this.onScrollEvent = onScrollEvent;

    // events

    this.onScroll();
		$(document).on('scroll', () => {
      this.onScroll();
    });
  }

  parallax(y) {
    // trigger parallax scroll events

  	const trigger = y + window.innerHeight;

		$('.parallax-once').each((i, e) => {
      // activate parallax elements

			const $elem = $(e);

			if ($elem.offset().top < trigger) {
				$elem.removeClass('parallax-once');
				$elem.addClass('parallax-active');
			}
		});
  }

  triggerEvents(y) {
    // trigger scroll events

    const trigger = y;
		const pageHeight = window.innerHeight;

		// home page events

		if (isHome) {
			if (y >= pageHeight) {
				// hide landing page images or video

				addClass('.landing', 'hidden');

				// snap nav bar and menu

        addClass('.nav', 'active');
				addClass('.menu', 'active');
			} else {
				// show landing page images or video

        removeClass('.landing', 'hidden');

				// unsnap nav and menu

        removeClass('.nav', 'active');
				removeClass('.menu', 'active');
			}

			// set title & menu colours

      let title = '';
			const navHeight = $('.nav').height();

			$('.trigger').each((i, e) => {
				const $elem = $(e);
				const top = $elem.offset().top;

				if (top - navHeight <= trigger) {
					if ($elem.data('title')) {
						title = $elem.data('title');
					}

					if ($elem.data('invert')) {
						addClass('.nav', 'inverted');
						addClass('.menu', 'inverted');
					}	else {
						removeClass('.nav', 'inverted');
						removeClass('.menu', 'inverted');
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

  onScroll() {
    // handle doc scroll

    const y = $(document).scrollTop();

    // parallax events

    this.parallax(y);
    this.triggerEvents(y);

    // send up

    this.onScrollEvent();
  }
}

export default Scroller;
