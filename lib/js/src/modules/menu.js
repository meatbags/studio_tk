class Menu {
  constructor() {
    // pop-out menu

    this.events();
  }

  openMenu() {
		// open the main menu

		if (!$('.menu').hasClass('open')) {
      $('.menu').addClass('open');
    }
		$('.nav__filter, .nav__cart').addClass('active');
	}

  toggleMenu() {
		// toggle menu

		$('.menu').toggleClass('open');

		if ($('.menu').hasClass('open')) {
			$('.nav__filter, .nav__cart').addClass('active');
		} else {
			$('.nav__filter, .nav__cart').removeClass('active');
		}
	}

  closeMenu() {
		// close the main menu

		$('.menu').removeClass('open');
		$('.nav__filter, .nav__cart').removeClass('active');
	}

  events() {
    // dom events

    $('.nav__filter').on('click', () => {
      this.toggleMenu();
    });
		$('.menu').on('mouseleave', (e) => {
      if (e.clientX < window.innerWidth/2) {
				this.closeMenu();
      }
		});
		$('.open-menu').on('click', (e) => {
			const $target = $($(e).data('target'));
			$(e).toggleClass('active');
			$target.toggleClass('active');
		});
  }
}

export default Menu;
