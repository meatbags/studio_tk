<!-- featured products grid -->

<div class='grid featured-grid'>
	<?php
		$query = new WP_Query(array(
			'post_type' => 'product',
			'posts_per_page' => 8
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$img = woocommerce_get_product_thumbnail();
			$link = get_the_permalink();
	?>

	<div class='grid__quarter'>
		<a href='<?php echo $link; ?>'>
			<?php
				echo $title;
				echo $img;
			?>
		</a>
	</div>

	<?php endwhile; endif; ?>
</div>
