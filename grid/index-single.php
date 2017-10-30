<?php
  $id = get_the_ID();
  $url = '#' . get_the_title();
  $type = get_field('menu_type');
  $classes = 'index-trigger filter-item ';
  $categories = get_the_category();
  foreach ($categories as $cat) {
    $classes .= 'filter-' . $cat->slug . ' ';
  }
?>

<div data-post='<?php echo $id; ?>' class='item grid__half responsive height-full <?php echo $classes; ?>'>
  <a href='<?php echo $url; ?>'>
    <div class='item__inner reveal-children'>
    <?php
      get_template_part('grid/shared/index-header');
      get_template_part('grid/shared/index-body');
    ?>
    </div>
  </a>
</div>
