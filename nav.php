<?php
	$title = is_shop() ? 'SHOP' : get_the_title();
	$titleCentre = (is_single()) ? true : false;
	$template = basename(get_page_template());
	$postType = get_post_type();
?>

<div class='nav mobile-hide <?php if (is_home()) {
		echo 'nav-index';
	} elseif($postType == 'editorials') {
		echo 'inverted';
	} ?>'>
	<div class='grid nav__list'>
		<div class='grid__third text-left'>
			<div class='nav__list__item'>
				<a href='<?php echo get_site_url(); ?>/'>TEUBER KOHLHOFF</a>
			</div>
			<div class='nav__list__item'>
				<?php if (!is_home() && !$titleCentre): ?>
					<div class='uppercase'><?php echo $title; ?></div>
				<?php else: ?>
					<div id='current-section'></div>
				<?php endif; ?>
			</div>
		</div>
		<div class='grid__third text-centre'>
			<?php if ($titleCentre): ?>
				<div class='uppercase text-14 nav__page-title-alt'><?php echo $title; ?></div>
			<?php endif; ?>
		</div>
		<div class='grid__third text-right'>
			<div class='nav__list__item nav__filter clickable'>
				MENU
			</div>
			<div class='nav__list__item nav__cart'>
				<a href='<?php echo get_site_url(); ?>/cart/'>CART (<?php echo WC()->cart->get_cart_contents_count(); ?>)</a>
			</div>
		</div>
	</div>
</div>

<div class='nav mobile-show text-small <?php if (is_home()){ echo 'nav-index'; } ?>'>
	<div class='grid nav__list'>
		<div class='grid__third'>
			<a href='<?php echo get_site_url(); ?>/'>TEUBER KOHLHOFF</a>
		</div>
		<div class='grid__third text-centre'>
			<?php if (!is_home()): ?>
				<div class='uppercase'><?php echo $title; ?></div>
			<?php else: ?>
				<div id='current-section-mobile'></div>
			<?php endif; ?>
		</div>
		<div class='grid__third grid'>
			<div class='nav__list__item nav__filter grid__half text-right'>
				MENU
			</div>
			<div class='nav__list__item grid__half text-right'>
				<a href='<?php echo get_site_url(); ?>/cart/'>CART (<?php echo WC()->cart->get_cart_contents_count(); ?>)</a>
			</div>
		</div>
	</div>
</div>
