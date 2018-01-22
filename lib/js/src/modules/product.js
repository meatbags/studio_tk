class Product {
  constructor() {
    // init product page display

    this.init();
  }

  init() {
    // product display

    $('.product__info__attribute select').each(
      (i, e) => {
  			const $e = $(e);
  			const id = $e.attr('id');

  			if (id != 'pa_colour') {
  				// hide element

  				$e.addClass('hidden');

  				// add swatch bar

          const $swatchBar = $('<div></div>', {class: 'swatches'});
  				$swatchBar.insertAfter($e);

  				// set unique class selector

          const uClass = `attr-button-${$e.attr('name')}`;
  				const selector = `.${uClass}`;

  				// add options

  				$e.find('option').each((j, elem) => {
  					if (j != 0) {
  						const $button = $('<div></div>', {
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

  				$(document).on('click', selector, () => {
  					$(selector).removeClass('active');
  					$(this).addClass('active');
  					$e.val($(this).data('value'));
  				});
  			}
  		}
    );

    // colour

    if ($('.colour__swatch__bank').length > 0) {
      this.setColours();
    }
  }

  setColours() {
    // set swatch colours

		$('.colour__swatch__bank').each(function(i, e){
			const $e = $(e);
			const $swatches = $e.find('.swatch');

			$swatches.each((j, elem) => {
				const $swatch = $(elem);

        $e.before($('<div></div>', {
					class: 'shop-grid__product__colour reveal',
					css: {
						'background-color': $swatch.css('background-color')
					},
				}));
			});
		});
	}
}

export default Product;
