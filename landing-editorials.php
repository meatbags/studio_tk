{ editorials }

<div class='slider'>
	<?php
		$query = new WP_Query( array(
			'post_type' => 'editorials',
			'orderby' => 'menu_order',
			'posts_per_page' => -1
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$img = get_the_post_thumbnail($size = 'post-thumbnail');
			$excerpt = get_the_excerpt();
			$link = get_the_permalink();
	?>

	<div class='slide'>
		<a href='<?php echo $link; ?>'>
			<?php
				echo $title . '<br>';
				echo $excerpt;
			?>
		</a>
	</div>

	<?php endwhile; endif; ?>
</div>
