<?php
	$id = get_the_ID();
  $uid = 'inspector-' . $id;
  $clippingId = 'clip-' . $id;
	$image = get_field('image_single')['url'];
  $shape = get_field('shape');
?>

<div id='<?php echo $uid; ?>' class='inspector' style='clip-path: url(#<?php echo $clippingId; ?>);'>
	<img class='inspector__image' src='<?php echo $image; ?>' />
	<div class='inspector__mask'>
		<svg viewBox="0 0 3200 800">
			<defs>
		    <mask id="<?php echo $clippingId; ?>">
					<rect fill='#fff' x='0' y='0' fill='#f00' width='3200' height='800'/>
          <?php if ($shape == 'shape_1') : ?>
  					<path fill='#000' transform='translate(1200 0)' d="M157.2,66c0,0,44,1.1,66.6,0S365,48,411.6,42.4C458.3,36.8,614.2,20,614.2,20
  						s13.3,314.2,18.7,331c5.3,16.8,14.7,411.8,14.7,411.8s-215.8-5.6-245.1-3.4c-29.3,2.2-274.4,5.6-274.4,5.6s37.3-532.9,38.6-559.9
  						C167.9,178.2,157.2,66,157.2,66z"/>
          <?php elseif ($shape == 'shape_2') : ?>
            <polygon fill='#000' transform='translate(1200 0)' points="26.6,104.7 773.4,69.4 773.4,696.3 51.3,731.6 "/>
          <?php elseif ($shape == 'shape_3') : ?>
            <path fill='#000' transform='translate(1200 0)' d="M262.4,53.1c0,0,63.4,4.5,96.5,0s86-9.1,119.2-9.1s90.5,5.3,90.5,5.3l-42.2,687.1l-264,19.6
            	L262.4,53.1L262.4,53.1z"/>
          <?php elseif ($shape == 'shape_4') : ?>
            <path fill='#000' transform='translate(1200 0)' d="M135.5,37.5l505,44c0,0,12,143,12,169s-6,217,0,272s12,228,12,228l-497,12c0,0,3-199,3-240
            	S135.5,37.5,135.5,37.5z"/>
          <?php elseif ($shape == 'shape_5') : ?>
            <path fill='#000' transform='translate(1200 0)' d="M142,59.2c0,0,61,12,117,0s98-28,182-31s235,0,235,0l38,745c0,0-201-5-286-12s-268-34-268-34
            	l-22-534.1c0-0.6,0-1.2,0-1.8L142,59.2z"/>
          <?php else : ?>
            <polygon fill='#000' transform='translate(1200 0)' points="215.6,89.1 615.3,36 615.3,764 133.7,746.6 "/>
          <?php endif; ?>
				</mask>
			</defs>
			<rect x='0' y='0' fill='#fff' width='3200' height='800' mask='url(#<?php echo $clippingId; ?>)' />
		</svg>
	</div>
</div>
