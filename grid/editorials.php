<!-- editorials grid -->

<div class='grid editorials-grid trigger' data-title='EDITORIALS' data-invert='true'>
	<?php
		$load = (is_home() ? 2 : -1);
		$query = new WP_Query(array(
			'post_type' => 'editorials',
			'orderby' => 'menu_order',
			'posts_per_page' => $load
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$image = get_field('image');
			$date = get_the_date();
			$excerpt = get_the_excerpt();
			$link = get_the_permalink();
	?>

	<div class='grid__full'>
		<div class='item'>
			<a href='<?php if (is_home()) {
					echo get_site_url() . '/editorials/';
				} else {
					echo $link;
				}?>'>
				<div class='item__inner reveal-children'>
					<div class='item__inner__date reveal'>
						(<?php echo $date; ?>)
					</div>
					<img src='<?php echo $image;?>' />
					<div class='item__inner__title'>
						<?php echo $title; ?>
					</div>
					<div class='item__inner__text'>
						<?php echo $excerpt; ?>
					</div>
				</div>
			</a>
		</div>
	</div>

	<?php endwhile; endif; ?>
</div>
