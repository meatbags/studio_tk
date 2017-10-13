<?php
  get_header();
  $sections = get_field('section');
  $count = 0;
  $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  $end = sizeof($sections) - 1;
  while ( have_posts() ) : the_post();
?>

<div class='single-page'>
  <div class='single__content text-large'>
    <?php echo get_the_content(); ?>
    <br/><br/>
  </div>
  <div class='grid text-mediumsmall'>
    <?php foreach ($sections as $section):
      $letter = $letters[$count % sizeof($letters)];
      ?>
      <div class='grid__half responsive'>
        <div class='grid'>
          <div class='grid__fifth'>(<?php echo $letter; ?>)</div>
          <div class='grid__threequarters grid__expand text-right'>
          <?php
            if ($section['section_title'] == '')
              echo '&nbsp;';
            else
              echo '(' . $section['section_title'] . ')';
            ?>
          </div>
        </div>
        <div>
          <br />
          <?php echo $section['section_text']; ?>
        </div>
      </div>
      <?php
        if ($count >= 1 && $count % 2 == 1): ?>
          <div class='grid__divider'></div>
        <?php
        elseif ($count == $end && $count % 2 == 0): ?>
          <div class='grid__half mobile-hide'>
            <div class='grid'>
              <div class='grid__fifth'>(<?php echo $letters[($count + 1) % sizeof($letters)] ?>)</div>
              <div class='grid__threequarters grid__expand text-right'>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
            </div>
            <div>
              <br />
            </div>
          </div>
        <?php
        endif;

        $count++;
      endforeach;
    ?>
  </div>
</div>

<?php
  endwhile;
  get_footer();
?>
