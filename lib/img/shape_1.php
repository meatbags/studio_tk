<?php
	$id = get_the_ID();
	$image = get_field('image_single')['url'];
	$clippingId = 'clip-' . $id;
?>
<div class='inspector' style='clip-path: url(#<?php echo $clippingId; ?>);'>
	<img src='<?php echo $image; ?>' />
	<div class='inspector__mask'>
		<svg viewBox="0 0 1600 800">
			<defs>
		    <mask id="<?php echo $clippingId; ?>">
					<rect fill='#fff' x='0' y='0' fill='#f00' width='1600' height='800'/>
					<path fill='#000' transform='translate(400 0)' d="M157.2,66c0,0,44,1.1,66.6,0S365,48,411.6,42.4C458.3,36.8,614.2,20,614.2,20
						s13.3,314.2,18.7,331c5.3,16.8,14.7,411.8,14.7,411.8s-215.8-5.6-245.1-3.4c-29.3,2.2-274.4,5.6-274.4,5.6s37.3-532.9,38.6-559.9
						C167.9,178.2,157.2,66,157.2,66z"/>
				</mask>
			</defs>
			<rect x='-500' y='-500' fill='#fff' width='2000' height='2000' mask='url(#<?php echo $clippingId; ?>)' />
		</svg>
	</div>
</div>
