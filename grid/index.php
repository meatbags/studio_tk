<!-- index grid -->

<div class='grid index-grid trigger' data-title='INDEX'>
	<?php
		$count = 0;
		$load = (is_home() ? 6 : -1);
		$query = new WP_Query(array(
			'post_type' => 'index',
			'posts_per_page' => $load,
			'orderby' => 'menu_order'
		));
		$postCount = sizeof($query->posts);

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
			$title = get_the_title();
			$link = get_the_permalink();
			$image = get_field('images')[0]['sizes']['large'];
			$categories = get_the_category();
	?>

	<div class='item grid__half grid__item'>
		<a href='<?php echo get_site_url(); ?>/index/'>
			<div class='item__inner reveal-children'>
				<div class='grid'>
					<div class='grid__third'>(<?php echo $count; ?>)</div>
					<div class='grid__third text-centre reveal'><?php echo $title; ?></div>
					<div class='grid__third text-right'><?php
						if (sizeof($categories) > 0) {
							echo '(' . $categories[0]->name . ')';
						} else {
							echo '&nbsp;';
						}
					?></div>
				</div>
				<div class='item__image parallax parallax-once parallax-rise parallax-fade'>
					<img src='<?php echo $image;?>' />
				</div>
			</div>
		</a>
	</div>
	<?php if ($count % 2 == 1 && $count != $postCount - 1): ?>
		<div class='grid__divider'></div>
	<?php endif; ?>

	<?php
		$count++;
		endwhile;
		endif;
		if (is_home()):
	?>
		<div class='grid__full text-normal text-centre'>(LOAD MORE)</div>
	<?php endif; ?>
</div>
