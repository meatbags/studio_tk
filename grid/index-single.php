<?php
  $id = get_the_ID();
  $url = '#' . get_the_title();
  $type = get_field('menu_type');
  $classes = ($type != 'type_inspector') ? 'index-trigger filter-item ' : 'filter-item ';
  $categories = get_the_category();
  foreach ($categories as $cat) {
    $classes .= 'filter-' . $cat->slug . ' ';
  }
?>

<div data-post='<?php echo $id; ?>' class='item grid__half responsive height-75 <?php echo $classes; ?>'>
  <?php if ($type != 'type_inspector'): ?>
    <a href='<?php echo $url; ?>'>
      <div class='item__inner reveal-children'>
      <?php
        get_template_part('grid/shared/index-header');
        get_template_part('grid/shared/index-body');
      ?>
      </div>
    </a>
  <?php else: ?>
    <div class='item__inner reveal-children'>
      <a href='<?php echo $url; ?>'>
        <?php get_template_part('grid/shared/index-header'); ?>
      </a>
      <?php get_template_part('grid/shared/index-body'); ?>
    </div>
  <?php endif; ?>
</div>
