<?php
  $page = get_page_by_title('landing');
  $image = get_field('landing_page_image', $page->ID);
  $mp4 = get_field('landing_page_video_mp4', $page->ID);
  $webm = get_field('landing_page_video_webm', $page->ID);
?>

<div class='landing hidden trigger' data-title='INDEX'>
  <div class='landing__image'>
    <?php if ($mp4 != '' || $webm != ''): ?>
      <video loop autoplay muted>
        <source src="<?php echo $mp4; ?>" type="video/mp4">
        <source src="<?php echo $webm; ?>" type="video/webm">
      </video>
    <?php elseif ($image != ''): ?>
      <img src='<?php echo $image; ?>'/>
    <?php endif; ?>
  </div>
  <div class='landing__title'>
    <div class='landing__title__inner'>
      <img src='<?php echo get_template_directory_uri(); ?>/lib/img/logo.svg' />
      <div class='landing__title__inner__text text-medium'>
        <?php echo get_bloginfo('description'); ?>
      </div>
    </div>
  </div>
</div>
