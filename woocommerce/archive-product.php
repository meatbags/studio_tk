<?php
if (!defined( 'ABSPATH')) { exit; }
get_header('shop');
//do_action( 'woocommerce_before_main_content' );
?>
  <header class="woocommerce-products-header">
		<?php //do_action( 'woocommerce_archive_description' );?>
  </header>
<?php
	if (have_posts()) {
		//do_action( 'woocommerce_before_shop_loop' );
		woocommerce_product_loop_start();
		woocommerce_product_subcategories();
	?>
		<div class='grid shop-grid'>
	<?php
		$count = 0;
		$end = wp_count_posts('product')->publish - 1;
		
		while (have_posts()) {
			the_post();
			do_action( 'woocommerce_shop_loop' );
			wc_get_template_part('content', 'product');
			if ($count % 2 == 1 && $count != $end): ?>
				<div class='grid__divider'></div>
		<?php endif;
			$count += 1;
		}
	?>
	</div>
	<?php
		woocommerce_product_loop_end();
		//do_action( 'woocommerce_after_shop_loop' );
	} elseif (!woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ){
		//do_action( 'woocommerce_no_products_found' );
	}

	//do_action( 'woocommerce_after_main_content' );
	//do_action( 'woocommerce_sidebar' );
 	get_footer('shop');
?>
