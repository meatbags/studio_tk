<?php
	// NOTE: shape paths are 800x800
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
					<rect fill='#fff' x='0' y='0' width='3200' height='800'/>
          <?php if ($shape == 'shape_1') : ?>
						<path fill='#000' transform='translate(1200 0)' d="M149.6,99.4c0,0,45.9,1,69.5,0c23.6-1,147.3-16.5,196-21.7C463.7,72.5,626.3,57,626.3,57s13.9,289.2,19.5,304.7c5.6,15.5,15.3,379.1,15.3,379.1s-225.2-5.2-255.7-3.1C374.7,739.9,119,743,119,743s38.9-490.7,40.3-515.5C160.7,202.7,149.6,99.4,149.6,99.4z"/>
          <?php elseif ($shape == 'shape_2') : ?>
						<polygon fill='#000' transform='translate(1200 0)' points="67.9,147.5 732.1,116 732.1,673.5 89.9,705 "/>
          <?php elseif ($shape == 'shape_3') : ?>
						<path fill='#000' transform='translate(1200 0)' d="M176.1,52.1c0,0,92.6,4.5,141.2,0S443,43,491.5,43s132.3,5.3,132.3,5.3l-61.8,689l-386,19.7V50
							z"/>
          <?php elseif ($shape == 'shape_4') : ?>
						<path fill='#000' transform='translate(1200 0)' d="M58,139.4L692.8,171c0,0,15.1,102.8,15.1,121.5c0,18.7-7.5,156,0,195.5S723,652,723,652l-624.8,8.6c0,0,3.8-143.1,3.8-172.5C102,458.6,58,139.4,58,139.4z"/>
          <?php elseif ($shape == 'shape_5') : ?>
						<path fill='#000' transform='translate(1200 0)' d="M90.3,168.2c0,0,66.5,8.8,127.6,0s106.9-20.6,198.4-22.8c91.6-2.2,256.2,0,256.2,0L714,693.2c0,0-219.2-3.7-311.8-8.8s-292.2-25-292.2-25L86,266.7c0-0.4,0-0.9,0-1.3L90.3,168.2z"/>
          <?php else : ?>
						<polygon fill='#000' transform='translate(1200 0)' points="162.2,147 671,103.8 671,696.2 58,682.1 "/>
          <?php endif; ?>
				</mask>
			</defs>
			<rect x='0' y='0' fill='#fff' width='3200' height='800' mask='url(#<?php echo $clippingId; ?>)' />
		</svg>
	</div>
</div>
