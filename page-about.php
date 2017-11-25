<?php
  get_header();
  $sections = get_field('section');
  $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  $end = sizeof($sections) - 1;
  $columnA = '';
  $columnB = '';

  while ( have_posts() ) : the_post();
?>

<div class='single-page'>
  <!-- page contents /pages -->

  <div class='single__content text-large'>
    <?php echo get_the_content(); ?>
    <br/><br/>
  </div>

  <!-- fields sections -->

  <?php
  $count = 0;
  foreach ($sections as $s) {
    $letter = $letters[$count % sizeof($letters)];
    $html = "<div class='grid'>" .
      "<div class='grid__fifth'>(" . $letter . ")</div>" .
      "<div class='grid__threequarters grid__expand text-right'>" .
      (($s['section_title'] == '') ? "&nbsp;" : '(' . $s['section_title'] . ')') .
      "</div></div><div class='text-paragraph'><br />" . $s["section_text"] . "</div><br />";

    if ($count % 2 == 0) {
      $columnA .= $html;
    } else {
      $columnB .= $html;
    }

    $count++;
  } ?>

  <div class='grid text-mediumsmall'>
    <div class='grid__half responsive'>
      <?php echo $columnA; ?>
    </div>
    <div class='grid__half responsive'>
      <?php echo $columnB; ?>
    </div>
  </div>
</div>

<?php
  endwhile;
  get_footer();
?>
