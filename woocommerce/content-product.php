<?php
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}
	global $product;
	if ( empty( $product ) || ! $product->is_visible() ) {
		return;
	}

	$product = new WC_Product(get_the_ID());
	$name = $product->get_name();
	$price = $product->get_price() . ' ' . get_woocommerce_currency_symbol();
	$link = get_the_permalink();
	$image = $product->get_image('large');
?>

<div class='grid__half shop-grid__product'>
	<div class='shop-grid__product__inner'>
		<a href='<?php echo $link; ?>'>
			<div class='shop-grid__product__image'>
				<?php echo $image; ?>
			</div>
			<div class='shop-grid__product__description grid'>
				<div class='grid__third nowrap'>
					<?php echo $name; ?>
				</div>
				<div class='grid__third'></div>
				<div class='grid__third text-right'>
					<?php echo $price; ?>
				</div>
			</div>
		</a>
	</div>
</div>

<?php
	//do_action( 'woocommerce_before_shop_loop_item' );
	//do_action( 'woocommerce_before_shop_loop_item_title' );
	//do_action( 'woocommerce_shop_loop_item_title' );
	//do_action( 'woocommerce_after_shop_loop_item_title' );
	//do_action( 'woocommerce_after_shop_loop_item' );
?>
