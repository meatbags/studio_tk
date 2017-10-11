<?php
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	global $product;
	global $post;

	if ( empty( $product ) || ! $product->is_visible() ) {
		return;
	}

	//$product = new WC_Product($id);
	$id = get_the_ID();
	$name = $product->get_name();
	$price = $product->get_price() . ' ' . get_woocommerce_currency_symbol();
	$link = get_the_permalink();
	$image = $product->get_image('large');
	$colours = get_the_terms($post, 'product_color');
	$colourLib = get_option('nm_taxonomy_colors');
?>

<div class='grid__half shop-grid__product reveal-children'>
	<div class='shop-grid__product__inner'>
		<a href='<?php echo $link; ?>'>
			<div class='shop-grid__product__image parallax parallax-once parallax-rise parallax-fade'>
				<?php echo $image; ?>
			</div>
			<div class='shop-grid__product__description grid'>
				<div class='grid__half nowrap'>
					<?php echo $name; ?>
				</div>
				<div class='grid__half text-right'>
					<?php
						if (isset($colours) && is_array($colours)) {
							foreach($colours as $col) {
								$termId = $col->term_id;
								$parent = $col->parent;
								$primary = $colourLib[$termId];
								$style = '';

								if ($parent != 0) {
									$primary = $colourLib[$parent];
									$secondary = $colourLib[$termId];
									$style = 'border: 3px solid ' . $secondary . ';background-color: ' . $primary . ';';
								} elseif ($primary == '#ffffff') {
									$secondary = '#eee';
									$style = 'border: 3px solid ' . $secondary . ';background-color: ' . $primary . ';';
								} else {
									$style = 'background-color: ' . $primary . ';';
								}
						?>
							<div class='shop-grid__product__colour reveal' style='<?php echo $style; ?>'></div>
						<?php
							}
						}
					?>
					<div class='shop-grid__product__price'>
						<?php echo $price; ?>
					</div>
				</div>
			</div>
			<br />
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
