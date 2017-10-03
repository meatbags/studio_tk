<?php
  get_header();
  $sections = get_field('section');
  $count = 0;
  while ( have_posts() ) : the_post();
?>

<div class='single'>
  <div class='text-large'>
    <?php echo get_the_content(); ?>
  </div>
  <div class='grid text-medium'>
    <?php foreach ($sections as $section): ?>
      <div class='grid__half'>
        <div class='grid'>
          <div class='grid__quarter'>(A)</div>
          <div class='grid__threequarters text-right'>
          <?php
            if ($section['section_title'] == '')
              echo '&nbsp;';
            else
              echo '(' . $section['section_title'] . ')';
            ?>
          </div>
        </div>
        <div>
          <?php echo $section['section_text']; ?>
        </div>
      </div>
    <?php
      $count++;
      endforeach;
    ?>
  </div>
</div>

<?php
  endwhile;
  get_footer();
?>
