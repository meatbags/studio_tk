<?php
  get_header();
  $sections = get_field('section');
  $count = 0;
  $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  while ( have_posts() ) : the_post();
?>

<div class='single-page'>
  <div class='single__content text-large'>
    <?php echo get_the_content(); ?>
    <?php get_template_part('newsletter'); ?>
    <br />
  </div>
  <div class='grid text-medium'>
    <?php foreach ($sections as $section):
      $letter = $letters[$count % sizeof($letters)];
      ?>
      <div class='grid__half responsive'>
        <div class='grid'>
          <div class='grid__quarter'>(<?php echo $letter; ?>)</div>
          <div class='grid__threequarters text-right'>
          <?php
            if ($section['section_title'] == '')
              echo '&nbsp;';
            else
              echo '(' . $section['section_title'] . ')';
            ?>
          </div>
        </div>
        <div class='single__text text-normal'>
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
