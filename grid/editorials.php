<!-- editorials grid -->

<div class='grid editorials-grid trigger' data-title='FEATURE' data-invert='true'>
	<?php
		$load = (is_home() ? 2 : -1);
		$query = new WP_Query(array(
			'post_type' => 'editorials',
			'orderby' => 'menu_order',
			'posts_per_page' => $load
		));
		$count = 0;
		$postCount = sizeof($query->posts);

		if ($query->have_posts()) {
			while ($query->have_posts()) {
				$query->the_post();
				get_template_part('grid/editorial-single');

				if ($count != $postCount - 1):?>
					<div class='divider'></div>
				<?php endif;
				$count++;
			}
		}

		if (is_home()): ?>
			<div id='load-more-editorials' class='grid__full transition text-medium text-centre clickable'>
				(LOAD MORE)
			</div>
		<?php
			endif;
			?>
</div>
