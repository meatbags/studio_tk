import * as App from './modules';

class STKApp {
	constructor() {
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

	events() {
		// internal event handlers

		this.onLoadMore = (type) => {
			// on ajax load

			this.scroll.onScroll();

			if (type == 'index') {
				this.inspector.conformImages();
				this.index.formatGrid();
			}
		};
		this.onFilterStart = () => {
			// on index filter start

			this.menu.closeMenu();
			//App.removeOverlay();
		};
		this.onFilterComplete = () => {
			// on index filter complete

			this.scroll.onScroll();
		};
		this.onScroll = () => {
			// on scroll event complete

			this.menu.closeMenu();
		};

		// window events

		this.onResize = () => {
			// change video/ image size

			if (isHome) {
				let $target = $('.landing__image video');

				// check if no video

				if ($target.length == 0) {
					$target = $('.landing__image img');
				}

				if ($target.length > 0) {
					// change width

					if ($target.width() < window.innerWidth) {
						$target.css({width: '100%', height: 'auto'});
					}

					// change height

					if ($target.height() < window.innerHeight) {
						$target.css({width: 'auto', height: '100%'});
					}
				}
			}
		}
		$(window).on('resize', () => { this.onResize(); });
	}
}

window.onload = () => {
	const stk = new STKApp();
};
