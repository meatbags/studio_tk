class Safari {
  constructor() {
    // safari utilities

    this.check();

    // make browser-specific changes

    this.conform();
  }

  conform() {
    // change videos to autoplay on safari

    $('video').attr('controls', true);
  }

  check() {
    // check for safari

    const agent = navigator.userAgent.toLowerCase();

		if (agent.indexOf('safari') != -1 && agent.indexOf('chrome') == -1) {
		  this.isSafari = true;
		} else {
      this.isSafari = false;
    }
  }
}

export default Safari;
