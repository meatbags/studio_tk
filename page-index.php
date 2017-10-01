<?php get_header(); ?>

<?php

	while ( have_posts() ) : the_post();
		the_content();
	endwhile;
?>

[ projects will load here ]

<div class='grid'>
	<div class='grid__item-half'></div>
	<div class='grid__item-half'></div>
	<span class='grid__divider'></span>
	<div class='grid__item-half'></div>
	<div class='grid__item-half'></div>
</div>

<?php get_footer(); ?>