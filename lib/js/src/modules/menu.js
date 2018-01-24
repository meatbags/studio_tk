class Menu {
  constructor() {
    // pop-out menu

    this.events();
  }

  openMenu() {
		// open the main menu

    $('.menu').addClass('open');
		$('.nav__filter, .nav__cart').addClass('active');
    $('.menu-screen').addClass('active');
    setTimeout(() => {
      $('html').addClass('freeze');
    }, 350);
	}

  closeMenu() {
		// close the main menu

		$('.menu').removeClass('open');
		$('.nav__filter, .nav__cart').removeClass('active');
    $('.menu-screen').removeClass('active');
    setTimeout(() => {
      $('html').removeClass('freeze');
    }, 350);
  }

  toggleMenu() {
		// toggle menu

		if (!$('.menu').hasClass('open')) {
			this.openMenu();
		} else {
			this.closeMenu();
		}
	}

  toggleFilterMenu(e) {
    // toggle filter submenu

    const $e = $(e.currentTarget);
    const $target = $($e.data('target'));

    $e.toggleClass('active');
    $target.toggleClass('active');

    if ($target.hasClass('active')) {
      $target.css({
        height: $target.find('.dropdown__inner').outerHeight()
      });
    } else {
      $target.css({height: 0});
    }
  }

  events() {
    // dom events

    $('.nav__filter').on('click', () => {
      this.toggleMenu();
    });

    $('.menu-screen').on('click', () => {
      this.closeMenu();
    });

		$('.open-menu').on('click', (e) => {
      this.toggleFilterMenu(e);
		});
  }
}

export default Menu;
