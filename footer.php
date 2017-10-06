	</div> <!-- /wrapper -->
</div> <!-- /content -->

<div class="footer <?php echo ((is_page('Editorials')) ? 'footer-alt': '');?>" role="contentinfo">
	<div class='footer__inner grid'>
		<div class='grid__third text-left' id="copyright">
			&copy; 2017 TEUBER KOHLHOFF I ALL RIGHTS RESERVED
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
			<a href='<?php echo get_site_url(); ?>/info/'>DELIVERY INFORMATION</a> I
			<a href='<?php echo get_site_url(); ?>/info/'>TERMS & CONDITIONS</a>
		</div>
		<?php //get_search_form(); ?>
	</div>
</div>

<?php wp_footer(); ?>

</body>
</html>
