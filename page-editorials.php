<?php get_header();
	while ( have_posts() ) : the_post();
		the_content();
	endwhile;
?>

{ editorials }

<div class='grid'>
	<div class='grid__item-half'></div>
	<div class='grid__item-half'></div>
	<span class='grid__divider'></span>
	<div class='grid__item-half'></div>
	<div class='grid__item-half'></div>
</div>

<?php get_footer(); ?>
