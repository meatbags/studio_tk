<?php
  $count = $wp_query->current_post + 1;
  $title = get_the_title();
  $type = get_field('menu_type');
  $categories = get_the_category();
  $cat = (sizeof($categories) > 0) ? '(' . $categories[0]->name . ')' : '&nbsp;';
  $count = 'A';
?>

<div class='item grid__half grid__item'>
  <a href='<?php echo (is_home() ? get_site_url() . '/index/' : get_the_permalink()); ?>'>
    <div class='item__inner reveal-children'>
      <div class='grid text-medium uppercase'>
        <div class='grid__third'>(<?php echo $count; ?>)</div>
        <div class='grid__third text-centre reveal'><?php echo $title; ?></div>
        <div class='grid__third text-right'><?php echo $cat; ?></div>
      </div>
      <div class='item__image parallax parallax-once parallax-rise parallax-fade'>
        <?php if ($type == 'type_static') :
          $image = get_field('image_single')['sizes']['large'];
        ?>
          <img src='<?php echo $image;?>' />
        <?php elseif ($type == 'type_hover') :
          $images = get_field['image_double'];
          $im1 = $images[0]['hover_image'];
          $im2 = $images[1]['hover_image'];
        ?>
          <img src='<?php echo $im1;?>' />
          <img src='<?php echo $im1;?>' />
        <?php elseif ($type == 'type_inspector') :
          $shape = get_field('shape');
          $image = get_field('image_single')['url'];
          ?>
          <img src='<?php echo $image;?>' />
        <?php endif; ?>
      </div>
    </div>
  </a>
</div>
