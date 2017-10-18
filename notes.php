<!--
old method for linking fabric inspector

/index-single & index-single-home
$classes = ($type != 'type_inspector') ? 'index-trigger filter-item ' : 'filter-item ';

<div class='item__inner reveal-children'>
  <a href='<?php echo $url; ?>'>
    <?php get_template_part('grid/shared/index-header'); ?>
  </a>
  <?php get_template_part('grid/shared/index-body'); ?>
</div>

/index-header
<?php
  if ($type == 'type_inspector'){
    echo 'index-trigger';
  }?>

-->
