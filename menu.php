<?php $title = is_shop() ? 'SHOP' : get_the_title(); ?>

<div class='menu-screen'></div>

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
				<div id='menu-filter' class='grid__full dropdown text-mediumlarge tablet-medium'>
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
