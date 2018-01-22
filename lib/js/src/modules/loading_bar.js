class LoadingBar {
  constructor() {
    // top loading bar
  }

  reset() {
    // run loading animation

    this.toLoad = 0;
		this.hasLoaded = 0;

    // setup doc

    $('.loading-bar').removeClass('disabled');
		$('.loading-bar__inner').css('width', '25%');
		$('.to-load').each((index, elem) => {
			if (elem.complete == false) {
				this.toLoad += 1;
				elem.onload = () => {
					this.hasLoaded += 1;
					this.loadingBarUpdate();
				};
			}
		});

		this.loadingBarUpdate();
  }

  loadingBarUpdate() {
    // update loading progress bar

		if (this.toLoad == this.hasLoaded || this.toLoad == 0) {
      // animate complete

			$('.loading-bar__inner').css('width', '100%');
			setTimeout(function(){
				$('.loading-bar').addClass('disabled');
				setTimeout(function(){
					$('.loading-bar__inner').css('width', '0%');
				}, 500);
			}, 500);
		} else {
      // animate progress

      const percent = 25 + 75 * (this.hasLoaded / this.toLoad);
      $('.loading-bar__inner').css('width', percent + '%');
		}
	}
}

export default LoadingBar;
