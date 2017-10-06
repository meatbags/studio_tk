<?php
  $id = get_the_ID();
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
        <?php
          if ($type == 'type_static') :
            $image = get_field('image_single')['sizes']['large'];
            ?>
            <img src='<?php echo $image;?>' />
        <?php
          elseif ($type == 'type_hover') :
            $images = get_field('image_double');
            $src1 = $images[0]['hover_image']['sizes']['large'];
            $src2 = $images[1]['hover_image']['sizes']['large'];
            ?>
            <img class='reveal inverted display-none' src='<?php echo $src1;?>' />
            <img class='reveal display-none' src='<?php echo $src2; ?>' />
        <?php
          elseif ($type == 'type_inspector') :
            $shape = get_field('shape');
            ?>
            <div class='inspector'>
              <?php get_template_part('lib/img/' . $shape); ?>
            </div>
        <?php endif; ?>
      </div>
    </div>
  </a>
</div>
