<?php
  $id = get_the_ID();
  $type = get_field('menu_type');
  $categories = get_the_category();
  $itemType = get_field('item_type');
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

<div class='grid text-14 uppercase' data-post='<?php echo $id; ?>'>
  <div class='grid__quarter fixed'>(<?php echo $lettersText; ?>)</div>
  <div class='grid__half text-centre reveal fixed'><?php echo $title; ?></div>
  <div class='grid__quarter text-right fixed'>(<?php echo $itemType; ?>)</div>
</div>
