<?php
	get_header();
	get_template_part('nav');
	get_template_part('landing', 'graphic');
	get_template_part('landing', 'index');
	get_template_part('landing', 'editorials');
	get_template_part('landing', 'about');
	get_template_part('landing', 'featured');
	get_footer();
?>


<div class='featured-products grid'>

	<?php
		$query = new WP_Query( array(
			'post_type' => 'product',
			'posts_per_page' => -1
		));

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$img = woocommerce_get_product_thumbnail();
			$link = get_the_permalink();
	?>

	<div class='grid__item grid__item-third'>
		<a href='<?php echo $link; ?>'>
			<?php
				echo $title;
				echo $img;
			?>
		</a>
	</div>

	<?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
