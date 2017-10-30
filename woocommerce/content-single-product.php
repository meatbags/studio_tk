<?php
if (!defined('ABSPATH')) {
	exit;
}

global $product;
global $post;

$id = get_the_ID();
$name = $product->get_name();
$price = $product->get_price() . ' ' . get_woocommerce_currency_symbol();
$link = get_the_permalink();
$image = $product->get_image('large');
$desc = $product->get_description();
$material = get_field('size_and_material');
$attachmentIds = $product->get_gallery_image_ids();
$hasVariations = $product->has_child();

if ($hasVariations) {
	//$variations = $product->get_variation_attributes();
	$availableVariations = $product->get_available_variations();
	$attributes = $product->get_variation_attributes();
}
?>

<div id="product-<?php the_ID(); ?>" class='product'>
	<div class='product__gallery'>
		<?php
		foreach($attachmentIds as $attachmentId):
      $imageUrl = wp_get_attachment_url( $attachmentId ); ?>
			<div class='product__gallery__image'>
				<img src='<?php echo $imageUrl; ?>'/>
			</div>
		<?php endforeach;

		// get footer here (sticky)
		get_template_part('footershop');
		?>
	</div>
	<div class='product__info'>
		<div class='product__info__inner text-small'>
			<div class='product__info__price mobile-hide'><?php echo $price; ?></div>
			<div class='product__info__price-mobile mobile-show'>
				<div class='product__info__price-mobile__inner'>
					<div class='left'>
						<?php echo $name; ?>
					</div>
					<div class='right'>
						<?php echo $price; ?>
					</div>
				</div>
			</div>

			<?php if ($hasVariations):
				$count = 0;
				do_action('woocommerce_before_add_to_cart_form');
				?>

				<!-- VARIATION PRODUCT FORM -->

				<form
					class='variations_form cart'
					method="post"
					enctype='multipart/form-data'
					data-product_id="<?php echo absint( $product->get_id() ); ?>"
					data-product_variations="<?php echo htmlspecialchars(wp_json_encode($availableVariations))?>">
					<?php
						do_action( 'woocommerce_before_add_to_cart_button' );
						do_action( 'woocommerce_before_single_variation' );
						//get_template_part('woocommerce/single-product/add-to-cart/variation');
					?>
					<div class='product__info__addtocart border'>
						<div class='product__info__form-message'>
							<?php do_action('woocommerce_before_single_product'); ?>
						</div>
						<div class="woocommerce-variation-add-to-cart variations_button">
							<button type="submit" class="single_add_to_cart_button button alt">ADD TO BAG</button>
							<input type="hidden" name="add-to-cart" value="<?php echo absint( $product->get_id() ); ?>" />
							<input type="hidden" name="product_id" value="<?php echo absint( $product->get_id() ); ?>" />
							<input type="hidden" name="variation_id" class="variation_id" value="0" />
						</div>
					</div>
					<?php
						do_action( 'woocommerce_after_single_variation' );
						do_action( 'woocommerce_after_add_to_cart_button' );
						do_action( 'woocommerce_before_variations_form' );

						foreach ($attributes as $name => $options):
							$labelName = wc_attribute_label($name);
							$clean = sanitize_title($name);
							$attr = 'attribute_' . $clean;
							$selected = isset($_REQUEST[$attr])
								? wc_clean(stripslashes(urldecode($_REQUEST[$attr])))
								: $product->get_variation_default_attribute($name);
							?>
							<div class='product__info__colour padding-half padding-top padding-bottom border-bottom'>
								<div class='label'>
									<label for="<?php echo $clean; ?>" class='uppercase'>
										<?php echo $labelName; ?>
									</label>
								</div>
								<br />
								<div class='value'>
								<?php
									wc_dropdown_variation_attribute_options(array(
										'options' => $options,
										'attribute' => $name,
										'product' => $product,
										'selected' => $selected
									));
								?>
								</div>
							</div>
					<?php
						endforeach;
						do_action( 'woocommerce_after_variations_form' );
					?>
				</form>

				<?php do_action( 'woocommerce_after_add_to_cart_form' ); ?>
				<?php //get_template_part('woocommerce/single-product/add-to-cart/variable'); ?>
			<?php else: ?>

			<!-- SINGLE VARIATION FORM -->

			<div class='product__info__addtocart border'>
				<div class='product__info__form-message'>
					<?php do_action('woocommerce_before_single_product'); ?>
				</div>
				<?php
					// woocommerce/single-product/add-to-cart/simple
					if ($product->is_in_stock()):
						do_action( 'woocommerce_before_add_to_cart_form' ); ?>
						<form class="cart" method="post" enctype='multipart/form-data'>
							<?php do_action('woocommerce_before_add_to_cart_button'); ?>
							<button type="submit"
								name="add-to-cart"
								value="<?php echo esc_attr( $product->get_id() ); ?>"
								class="single_add_to_cart_button button alt">
								ADD TO BAG
							</button>
							<?php do_action('woocommerce_after_add_to_cart_button'); ?>
						</form>
						<?php do_action('woocommerce_after_add_to_cart_form'); ?>
					<?php endif; ?>
			</div>
			<?php endif; ?>

			<div class='product__info__description padding-half padding-top padding-bottom border-bottom'>
				DESCRIPTION
				<br/><br/>
				<?php echo $desc; ?>
			</div>
			<?php if ($material != ''): ?>
				<div class='product__info__note padding-half padding-top padding-bottom'>
					SIZE & MATERIAL
					<br />
					<?php echo $material; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>
