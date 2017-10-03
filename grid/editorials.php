<!-- front page editorials grid -->

<div class='grid editorials-grid'>
	<?php
		$query = new WP_Query(array(
			'post_type' => 'editorials',
			'orderby' => 'menu_order',
			'posts_per_page' => 2
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$img = get_the_post_thumbnail($size = 'post-thumbnail');
			$excerpt = get_the_excerpt();
			$link = get_the_permalink();
	?>

	<div class='grid__full grid__item'>
		<a href='<?php echo $link; ?>'>
			<?php
				echo $title;
				echo $excerpt;
			?>
		</a>
	</div>

	<?php endwhile; endif; ?>
</div>
