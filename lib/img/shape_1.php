<?php
	$id = get_the_ID();
	$image = get_field('image_single')['url'];
	$clippingId = 'clip-' . $id;
?>

<svg width='100' height='100'>
	<defs>
    <clipPath id="<?php echo $clippingId; ?>">
			<path id="XMLID_13_" class="st0" d="M75.7,70c0,0,44,1.1,66.6,0c22.6-1.1,141.2-18,187.8-23.6C376.8,40.8,532.7,24,532.7,24
				s13.3,314.2,18.7,331c5.3,16.8,14.7,411.8,14.7,411.8s-215.8-5.6-245.1-3.4c-29.3,2.2-274.4,5.6-274.4,5.6s37.3-532.9,38.6-559.9
				C86.4,182.2,75.7,70,75.7,70z"/>
		</clipPath>
	</defs>
</svg>
<!--
<clipPath id="<?php echo $clippingId; ?>">
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 612 792" style="enable-background:new 0 0 612 792;" xml:space="preserve">
	<g>
		<path id="XMLID_13_" class="st0" d="M75.7,70c0,0,44,1.1,66.6,0c22.6-1.1,141.2-18,187.8-23.6C376.8,40.8,532.7,24,532.7,24
			s13.3,314.2,18.7,331c5.3,16.8,14.7,411.8,14.7,411.8s-215.8-5.6-245.1-3.4c-29.3,2.2-274.4,5.6-274.4,5.6s37.3-532.9,38.6-559.9
			C86.4,182.2,75.7,70,75.7,70z"/>
	</g>
	</svg>
</clipPath>
-->

<div class='inspector' style='clip-path: url(#<?php echo $clippingId; ?>);'>
	<img src='<?php echo $image; ?>' />
</div>


<!--
<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 612 792" style="enable-background:new 0 0 612 792;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#010101;}
</style>
<g>
	<path id="XMLID_13_" class="st0" d="M75.7,70c0,0,44,1.1,66.6,0c22.6-1.1,141.2-18,187.8-23.6C376.8,40.8,532.7,24,532.7,24
		s13.3,314.2,18.7,331c5.3,16.8,14.7,411.8,14.7,411.8s-215.8-5.6-245.1-3.4c-29.3,2.2-274.4,5.6-274.4,5.6s37.3-532.9,38.6-559.9
		C86.4,182.2,75.7,70,75.7,70z"/>
</g>
</svg>
-->
