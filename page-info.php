<?php
  get_header();
  $sections = get_field('section');
  $count = 0;
  $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  while ( have_posts() ) : the_post();
?>

<div class='single-page'>
  <!-- page content /pages -->

  <div class='single__content text-large'>
    <?php echo get_the_content(); ?>
    <?php get_template_part('newsletter'); ?>
    <br />
  </div>

  <!-- fields section content -->

  <div class='grid single-sections'>
    <?php foreach ($sections as $section):
      $letter = $letters[$count % sizeof($letters)];
      ?>
      <div class='grid__half responsive text-medium'>
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
        <div class='single__text text-paragraph'>
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
