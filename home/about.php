<?php
  $about = get_page_by_title('about')->post_content;
?>

<div class='about trigger' data-title='ABOUT'>
  <div class='about__inner'>
    <div class='about__inner__text'>
      <?php echo $about; ?>
    </div>
    <div class='about__inner__subscribe'>
      For more insights and previews subscribe our Newsletter
      and follow us on Instagram & Facebook.<br /><br />
      <?php get_template_part('newsletter'); ?>
    </div>
  </div>
</div>
