class LoadMore {
  constructor(onLoad) {
    // ajax load handler

    this.onLoad = onLoad;
    this.events();
  }

  events() {
    // hook up buttons

    if (isHome) {
      $('#load-more-projects').on('click', (e) => {
				this.load($(e.target), 'index');
			});

			$('#load-more-editorials').on('click', (e) => {
				this.load($(e.target), 'editorials');
			})
    }
  }

  load(button, type) {
    // submit ajax request

		let postCount = -1;
    let offset = 0;
    let target = null;

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
			data: `&offset=${offset}&postCount=${postCount}&type=${type}&action=ajax_load`,
			success: (data) => {
        // parse data, remove button

				$(target).append(data);
				button.remove();

        // send up

				this.onLoad(type);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.warn(jqXHR, textStatus, errorThrown);
			}
		});
  }
}

export default LoadMore;
