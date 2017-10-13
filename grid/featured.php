<!-- featured products grid -->

<div class='grid featured-grid'>
	<?php
		$query = new WP_Query(array(
			'post_type' => 'product',
			'posts_per_page' => 12
		));

	if ( $query->have_posts() ):
		$count = 0;

		while ( $query->have_posts() ):
			$query->the_post();
			$title = get_the_title();
			$img = woocommerce_get_product_thumbnail();
			$link = get_the_permalink();
	?>

	<div class='grid__sixth responsive item <?php
			if ($count >= 2) {
				echo 'mobile-hide';
			}
		?>'>
		<div class='item__inner'>
			<a href='<?php echo $link; ?>'>
				<?php echo $img; ?>
			</a>
		</div>
	</div>

	<?php
		$count++;
		endwhile;
	endif; ?>
</div>
