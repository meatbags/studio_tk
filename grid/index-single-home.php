<?php
  $id = get_the_ID();
  $type = get_field('menu_type');
  $count = 'A';
  $url = get_site_url() . '/index/';
  $classes = ($type != 'type_inspector') ? 'index-trigger filter-item ' : 'filter-item ';
  $categories = get_the_category();
  foreach ($categories as $cat) {
    $classes .= 'filter-' . $cat->slug . ' ';
  }
?>

<div class='item grid__half responsive height-75 <?php echo $classes; ?>'>
  <a href='<?php echo $url; ?>'>
    <div class='item__inner reveal-children'>
    <?php
      get_template_part('grid/shared/index-header');
      get_template_part('grid/shared/index-body');
    ?>
    </div>
  </a>
</div>
