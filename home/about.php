<?php
  $about = get_page_by_title('about')->post_content;
?>

<div class='about trigger' data-title='ABOUT'>
  <div class='about__inner'>
    <div class='about__inner__text text-large'>
      <?php echo $about; ?>
    </div>
    <div class='about__inner__subscribe font-serif'>
      <span class='transparent text-tiny'>
      For more insights and previews subscribe to our Newsletter<br />
      and follow us on Instagram & Facebook.<br /><br />
      </span>
      <span class='text-small'>
      <?php get_template_part('newsletter'); ?>
      </span>
    </div>
  </div>
</div>
