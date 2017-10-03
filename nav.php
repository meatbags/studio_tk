<div class='nav mobile-hide <?php if (is_home()){ echo 'nav-index'; } ?>'>
	<div class='grid nav__list'>
		<div class='grid__third text-left'>
			<div class='nav__list__item'>
				<a href='<?php echo get_site_url(); ?>/'>TEUBER KOHLHOFF</a>
			</div>
			<div class='nav__list__item'>
				<div id='current-section'></div>
			</div>
		</div>
		<div class='grid__third text-centre'>
			<?php if (!is_home()): ?>
				<div class='uppercase'><?php echo get_the_title(); ?></div>
			<?php endif; ?>
		</div>
		<div class='grid__third text-right'>
			<div class='nav__list__item'>
				<a href='<?php echo get_site_url(); ?>/'>FILTER</a>
			</div>
			<div class='nav__list__item'>
				<a href='<?php echo get_site_url(); ?>/cart/'>CART</a>
			</div>
		</div>
	</div>
</div>
