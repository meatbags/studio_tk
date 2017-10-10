<?php
	$title = get_the_title();
	$titleCentre = (is_single()) ? true : false;
?>

<div class='nav mobile-hide <?php if (is_home()){ echo 'nav-index'; } ?>'>
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
				<div class='uppercase'><?php echo $title; ?></div>
			<?php endif; ?>
		</div>
		<div class='grid__third text-right'>
			<div class='nav__list__item nav__filter clickable'>
				FILTER
			</div>
			<div class='nav__list__item'>
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
				<div class='grid__third'>
					<a href='<?php echo get_site_url(); ?>/index/'>INDEX</a>
				</div>
				<?php if (is_home() || $title == 'Index') : ?>
					<div class='grid__twothirds border-left padding-left'>
						<div class='filter clickable' data-filter='filter-textiles'>(A) TEXTILES</div>
						<div class='filter clickable' data-filter='filter-print'>(B) PRINT</div>
						<div class='filter clickable' data-filter='filter-identities'>(C) IDENTITIES</div>
						<div class='filter clickable' data-filter='filter-digital'>(D) DIGITAL</div>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/editorials/'>EDITORIALS</a>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/about/'>ABOUT</a>
		</div>
		<div class='item'>
			<a href='<?php echo get_site_url(); ?>/info/'>CONTACT</a>
		</div>
	</div>
</div>
