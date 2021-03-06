<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class='cart-grid text-medium'>

<?php wc_print_notices();
	do_action( 'woocommerce_before_cart' ); ?>

<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
	<div class='cart-grid__columns cart-grid__category-titles grid border-bottom'>
		<div class='grid__half'>
			Product
		</div>

		<div class='grid__half grid tablet-hide'>
			<div class='grid__third mobile-hide'>
				<span class='tablet-hide'>Quantity</span>
				<span class='tablet-show'>Qty</span>
			</div>
			<div class='grid__twothirds cart-grid__columns__cats grid text-left'>
				<div class='grid__quarter'></div>
				<div class='grid__quarter'>Price</div>
				<div class='grid__quarter'>Total</div>
				<div class='grid__quarter mobile-hide'></div>
			</div>
		</div>

		<!-- phone/ tablet -->
		<div class='tablet-show grid__half grid'>
			<div class='grid__quarter mobile-hide'>Qty</div>
			<div class='grid__quarter'>Price</div>
			<div class='grid__quarter'>Total</div>
			<div class='grid__quarter'></div>
		</div>
	</div>

	<?php do_action( 'woocommerce_before_cart_table' ); ?>

	<div class='grid cart-grid__products shop_table shop_table_responsive cart woocommerce-cart-form__contents'>
	<?php do_action( 'woocommerce_before_cart_contents' );

		foreach (WC()->cart->get_cart() as $key => $item) {
			$filter = 'woocommerce_cart_item_';
			$product = apply_filters($filter . 'product', $item['data'], $item, $key);
			$id = apply_filters($filter . 'product_id', $item['data'], $item, $key);

			if ($product && $product->exists() && $item['quantity'] > 0 && apply_filters('woocommerce_cart_item_visible', true, $item, $key)) {
				$permalink = apply_filters($filter . 'permalink', $product->is_visible() ? $product->get_permalink($item) : '', $item, $key);
				$removeTag = apply_filters($filter . 'remove_link', sprintf('<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><span class="tablet-hide">Remove</span><span class="tablet-show">x</span></a>', esc_url(WC()->cart->get_remove_url($key)), __('Remove this item', 'woocommerce'), esc_attr($id), esc_attr($product->get_sku())), $key);
				$image = apply_filters($filter . 'thumbnail', $product->get_image('large'), $item, $key);
				$name = apply_filters($filter . 'name', $product->get_name(), $item, $key);
				$price = apply_filters($filter . 'price', WC()->cart->get_product_price($product), $item, $key);
				$qty = ($product->is_sold_individually())
					? sprintf('1 <input type="hidden" name="cart[%s][qty]" value="1" />', $key)
					: woocommerce_quantity_input(array('input_name'  => "cart[{$key}][qty]", 'input_value' => $item['quantity'], 'max_value' => $product->get_max_purchase_quantity(), 'min_value' => '0',), $product, false);
				$qtyInput = apply_filters($filter . 'quantity', $qty, $key, $item);
				$subTotal = apply_filters($filter . 'subtotal', WC()->cart->get_product_subtotal($product, $item['quantity'] ), $item, $key);
				$wcClasses = "woocommerce-cart-form__cart-item " . esc_attr(apply_filters($filter . 'class', 'cart_item', $item, $key)) . " ";
				?>

				<div class='grid__full grid cart__product <?php echo $wcClasses; ?>'>
					<div class='grid__half cart__product__name'>
						<div class='grid'>
							<div class='grid__quarter tablet-hide'>
								<div class='product-image'>
									<?php echo $image; ?>
								</div>
							</div>
							<div class='grid__threequarters'>
								<div class='product-name' data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
									<?php if (!$permalink): ?>
										<?php echo $name; ?>
									<?php else: ?>
										<a href='<?php echo $permalink; ?>'>
											<span class='border-bottom'>
												<?php echo $name; ?>
											</span>
										</a>
									<?php endif; ?>
								</div>
							</div>
						</div>
					</div>

					<div class='grid__half grid cart__product__info tablet-hide'>
						<div class='grid__third mobile-hide responsive product-quantity text-left' data-title="<?php esc_attr_e('Quantity', 'woocommerce'); ?>">
							<?php echo $qtyInput; ?>
						</div>
						<div class='grid__twothirds grid cart__product__cats text-right tablet-hide'>
							<div class='grid__quarter responsive product-vat'></div>
							<div class='grid__quarter product-price' data-title="<?php esc_attr_e('Price', 'woocommerce'); ?>">
								<?php echo $price; ?>
							</div>
							<div class='grid__quarter product-subtotal text-right' data-title="<?php esc_attr_e('Total', 'woocommerce'); ?>">
								<?php echo $subTotal; ?>
							</div>
							<div class='grid__quarter product-remove'>
								<?php echo $removeTag; ?>
							</div>
						</div>
					</div>

					<!-- mobile/ tablet -->

					<div class='grid__half grid cart__product__info tablet-show'>
						<div class='grid__quarter mobile-hide responsive product-quantity text-left' data-title="<?php esc_attr_e('Quantity', 'woocommerce'); ?>">
							<?php echo $qtyInput; ?>
						</div>
						<div class='grid__quarter product-price' data-title="<?php esc_attr_e('Price', 'woocommerce'); ?>">
							<?php echo $price; ?>
						</div>
						<div class='grid__quarter product-subtotal text-right' data-title="<?php esc_attr_e('Total', 'woocommerce'); ?>">
							<?php echo $subTotal; ?>
						</div>
						<div class='grid__quarter product-remove' style='justify-content:flex-end;'>
							<?php echo $removeTag; ?>
						</div>
					</div>
				</div>

				<?php
			}
		}
		do_action( 'woocommerce_cart_contents' ); ?>

		<div class='cart-grid__actions'>
			<div class="actions grid">
				<?php if ( wc_coupons_enabled() ) { ?>
					<div class="coupon grid__full grid">
						<div class='grid__twothirds pad'>
							<input type="text" name="coupon_code" class="input-text actions__coupon" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" />
						</div>
						<div class='grid__third'>
							<input type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>" />
						</div>
						<?php do_action( 'woocommerce_cart_coupon' ); ?>
					</div>
				<?php } ?>

				<input type="submit" class="button grid__full" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>" />

				<?php do_action( 'woocommerce_cart_actions' ); ?>
				<?php wp_nonce_field( 'woocommerce-cart' ); ?>
			</div>
		</div>

		<?php do_action( 'woocommerce_after_cart_contents' ); ?>
	</div>
<?php do_action( 'woocommerce_after_cart_table' ); ?>
</form>

	<!-- cart-totals.php -->
	<div class="cart-grid__totals cart-collaterals">
		<?php do_action('woocommerce_cart_collaterals'); ?>
	</div>
	<?php do_action('woocommerce_after_cart'); ?>
</div>
