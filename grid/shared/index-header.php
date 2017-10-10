<?php
  $id = get_the_ID();
  $type = get_field('menu_type');
  $categories = get_the_category();
  $firstCategory = (sizeof($categories) > 0) ? '(' . $categories[0]->name . ')' : '&nbsp;';
  $title = get_the_title();
  $letters = array();
  $end = sizeof($categories) - 1;

  foreach ($categories as $cat) {
    switch ($cat->slug) {
      case 'textiles':
        array_push($letters, 'A');
        break;
      case 'print':
        array_push($letters, 'B');
        break;
      case 'identities':
        array_push($letters, 'C');
        break;
      case 'digital':
        array_push($letters, 'D');
        break;
    }
  }

  sort($letters);
  $lettersText = join(', ', $letters);
?>

<div class='grid text-medium uppercase <?php
  if ($type == 'type_inspector'){
    echo 'index-trigger';
  }?>' data-post='<?php echo $id; ?>'>
  <div class='grid__quarter'>(<?php echo $lettersText; ?>)</div>
  <div class='grid__half text-centre reveal'><?php echo $title; ?></div>
  <div class='grid__quarter text-right'><?php echo $firstCategory; ?></div>
</div>
