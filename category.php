<?php get_header(); ?>

<?php
	single_cat_title();
	if ( have_posts() ) {
		while ( have_posts() ) : the_post();
		
		// do stuff
		
	}
?>

<?php get_footer(); ?>