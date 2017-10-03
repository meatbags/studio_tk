<div class='grid'>
	<?php
		$count = 0;
		$query = new WP_Query(array(
			'post_type' => 'index',
			'posts_per_page' => 4,
			'orderby' => 'menu_order'
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$link = get_the_permalink();
			$image = get_field('images')[0]['sizes']['large'];
			$categories = get_the_category();
	?>

	<div class='grid__half grid__item parallax parallax-once parallax-rise parallax-fade'>
		<a href='<?php echo $link; ?>'>
			<?php
				echo $count;
				echo $title;
				if (sizeof($categories) > 0) {
					echo $categories[0]->name;
				}
				echo $image;
			?>
		</a>
	</div>

	<?php
		$count++;
		endwhile;
		endif;
	?>

	<div>( Load more )</div>
</div>
