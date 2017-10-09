<!-- index grid -->

<div class='grid index-grid trigger <?php if (is_home()) { echo 'home-margin'; } ?>' data-title='INDEX'>
	<?php
		$count = 0;
		$load = (is_home() ? 6 : -1);
		$query = new WP_Query(array(
			'post_type' => 'index',
			'posts_per_page' => $load,
			'orderby' => 'menu_order'
		));
		$last = sizeof($query->posts) - 1;

		if ($query->have_posts()) {
			while ($query->have_posts()) {
				$query->the_post();

				if (is_home()) {
					get_template_part('grid/index-single-home');
				} else {
					get_template_part('grid/index-single');
				}

				if ($count % 2 == 1 && $count != $last) {
					echo "<div class='grid__divider'></div>";
				}

				$count++;
			}
		}

		if (is_home()):
	?>
		<div id='load-more-projects' class='grid__full clickable text-normal transition text-centre'>(LOAD MORE)</div>
	<?php endif; ?>
</div>
