<?php
  $type = get_field('menu_type');
?>
<div class='item__image parallax parallax-once parallax-rise parallax-fade'>
  <?php
    if ($type == 'type_static') :
      $image = get_field('image_single')['sizes']['large'];
      ?>
      <img class='img-fit' src='<?php echo $image;?>' />
  <?php
    elseif ($type == 'type_hover') :
      $images = get_field('image_double');
      $src1 = $images[0]['hover_image']['sizes']['large'];
      $src2 = $images[1]['hover_image']['sizes']['large'];
      ?>
      <img class='reveal inverted display-none img-fit' src='<?php echo $src1;?>' />
      <img class='reveal display-none img-fit' src='<?php echo $src2; ?>' />
  <?php
    elseif ($type == 'type_inspector') :
      get_template_part('inspector/inspector');
    endif;
  ?>
</div>
