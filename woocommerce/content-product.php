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
	$hasVariations = $product->has_child();

	if ($hasVariations) {
		$availableVariations = $product->get_available_variations();
		$attributes = $product->get_variation_attributes();
	}
?>

<div class='grid__half responsive shop-grid__product reveal-children'>
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
						if ($hasVariations):
							foreach ($attributes as $name => $options):
								$labelName = wc_attribute_label($name);
								$clean = sanitize_title($name);
								$attr = 'attribute_' . $clean;
								$selected = isset($_REQUEST[$attr])
									? wc_clean(stripslashes(urldecode($_REQUEST[$attr])))
									: $product->get_variation_default_attribute($name);
						?>
							<div class='colour__swatch__bank'>
							<?php
								$arr = wc_dropdown_variation_attribute_options(array(
									'options' => $options,
									'attribute' => $name,
									'product' => $product,
									'selected' => $selected
								));
								var_dump($arr);
							?>
							</div>
						<?php
							endforeach;
							endif;
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
