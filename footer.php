	</div> <!-- /wrapper -->
</div> <!-- /content -->

<div role="contentinfo" class="mobile-hide footer <?php
		if (is_page('Editorials')) {
			echo 'footer-alt';
		} elseif (is_product()) {
			echo 'footer-product';
		} ?>">
	<div class='footer__inner grid'>
		<div class='grid__third text-left' id="copyright">
			&copy; 2017 TEUBER KOHLHOFF <span class='tablet-hide'>I ALL RIGHTS RESERVED</span>
		</div>
		<div class='grid__third text-centre' id="copyright">
			<a href='<?php echo get_site_url(); ?>/shop/'>SHOP</a> I
			<a href='<?php echo get_site_url(); ?>/index/'>INDEX</a> I
			<a href='<?php echo get_site_url(); ?>/editorials/'>EDITORIAL</a> I
			<a href='<?php echo get_site_url(); ?>/info/'>INFO</a> I
			<a target='_blank' href='https://www.instagram.com/teuberkohlhoff/'>INSTAGRAM</a> I
			<a target='_blank' href='https://www.facebook.com/teuberkohlhoff/'>FACEBOOK</a>
		</div>
		<div class='grid__third text-right' id="copyright">
			<a href='<?php echo get_site_url(); ?>/info/'>IMPRINT</a> I
			<a href='<?php echo get_site_url(); ?>/info/'>
				<span class='tablet-hide'>DELIVERY INFORMATION</span>
				<span class='tablet-show'>DELIVERY INFO</span>
			</a> I
			<a href='<?php echo get_site_url(); ?>/info/'>
				<span class='tablet-hide'>TERMS & CONDITIONS</span>
				<span class='tablet-show'>T&Cs</span>
			</a>
		</div>
		<?php //get_search_form(); ?>
	</div>
</div>

<div role="contentinfo" class="mobile-show text-small footer <?php
		if (is_page('Editorials')) {
			echo 'footer-alt';
		} elseif (is_product()) {
			echo 'footer-product';
		} ?>">
	<div class='footer__inner grid'>
		<div class='grid__full text-centre' id="copyright">
			&copy; 2017 TEUBER KOHLHOFF I ALL RIGHTS RESERVED
		</div>
		<div class='grid__full text-centre' id="copyright">
			<a target='_blank' href='https://www.instagram.com/teuberkohlhoff/'>INSTAGRAM</a>&nbsp;I&nbsp;
			<a target='_blank' href='https://www.facebook.com/teuberkohlhoff/'>FACEBOOK</a>&nbsp;I&nbsp;
			<a href='<?php echo get_site_url(); ?>/info/'>IMPRINT</a>&nbsp;I&nbsp;
			<a href='<?php echo get_site_url(); ?>/info/'>TERMS & CONDITIONS</a>
		</div>
	</div>
</div>

<?php wp_footer(); ?>

</body>
</html>
