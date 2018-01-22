class Instafeed {
  constructor() {
    // ajax get instagram feed and inject it into doc

    if (isHome) {
			$.ajax({
				type: "POST",
				dataType: "text",
				url: ajaxUrl,
				data: '&action=ajax_insta',
				success: (data) => {
          // create jquery object for utility

					var body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
					var $body = $(body);

          for (var i=0; i<$body[0].children.length; i+=1) {
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
              images = images.map(item => item.thumbnail_src);

							for (let j=0; j<images.length; j++) {
                // add to doc

                $('.instagram-grid__inner').append(
									$('<div />', {
										class: 'grid__sixth responsive item',
										html: `<div class="item__inner clickable"><a target="_blank" href="https://www.instagram.com/teuberkohlhoff/"><img src="${images[j]}" /></a></div>`
									})
								);
							}
						}
					}
				},
				error: (jqXHR, textStatus, errorThrown) => {
					console.warn(jqXHR, textStatus, errorThrown);
				}
			});
		}
  }
}

export default Instafeed;
