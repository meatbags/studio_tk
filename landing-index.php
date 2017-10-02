{ index }

<div class='grid'>
	<?php
		$query = new WP_Query( array(
			'post_type' => 'index',
			'orderby' => 'menu_order',
			'posts_per_page' => -1
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$link = get_the_permalink();
	?>

	<div class='grid__item grid__item-half'>
		<a href='<?php echo $link; ?>'>
			<?php echo $title; ?>
			<?php the_post_thumbnail($size='large'); ?>
		</a>
	</div>

	<?php endwhile; endif; ?>
</div>
