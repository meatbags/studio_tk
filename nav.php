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
				<div class='uppercase text-14'><?php echo $title; ?></div>
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

<div class='menu <?php if (is_home()){ echo 'menu-index'; } ?>'>
	<div class='menu__list'>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/shop/'>SHOP</a>
		</div>
		<div class='item'>
			<div class='grid'>
				<div class='grid__half'>
					<a href='<?php echo get_site_url(); ?>/index/'>INDEX</a>
				</div>

				<?php if (is_home() || $title == 'Index') : ?>

				<div class='grid__half'>
					<div class='open-menu clickable' data-target='#menu-filter'>
						<div class='caret'></div>
					</div>
				</div>
				<div id='menu-filter' class='grid__full dropdown'>
					<div class='dropdown__inner'>
						<div class='filter clickable' data-filter='filter-all'>(O) ALL</div>
						<div class='filter clickable' data-filter='filter-textiles'>(A) TEXTILES</div>
						<div class='filter clickable' data-filter='filter-print'>(B) PRINT</div>
						<div class='filter clickable' data-filter='filter-identities'>(C) IDENTITIES</div>
						<div class='filter clickable' data-filter='filter-digital'>(D) DIGITAL</div>
					</div>
				</div>

				<?php endif; ?>
			</div>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/features/'>FEATURES</a>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/about/'>ABOUT</a>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/info/'>CONTACT</a>
		</div>
	</div>
</div>
