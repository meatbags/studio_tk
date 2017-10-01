<?php get_header();

	$projectsCount = 2;
	$storiesCount = 4;
	$productsCount = 3;
?>

<div class='landing'>
	landing graphic loads here
</div>

<!-- get lastest projects -->

<div class='featured-projects grid'>
	<?php
		$query = new WP_Query( array(
			'post_type' => 'projects',
			'orderby' => 'menu_order',
			'posts_per_page' => $projectsCount
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

<div class='social-media-bar'>
	social media link | social media link
</div>

<!-- get lastest stories -->

<div class='featured-stories slider'>
	<?php
		$query = new WP_Query( array(
			'post_type' => 'stories',
			'orderby' => 'menu_order',
			'posts_per_page' => $storiesCount
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

<div class='text-area'>some text or something</div>

<!-- get featured products -->

<div class='featured-products grid'>
	
	<?php
		$query = new WP_Query( array(
			'post_type' => 'product',
			'posts_per_page' => $productsCount
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