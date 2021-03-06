<?php
  $id = get_page_by_title('landing')->ID;
  $image = get_field('landing_page_image', $id);
  $mp4 = get_field('landing_page_video_mp4', $id);
  $webm = get_field('landing_page_video_webm', $id);
?>

<div class='landing hidden trigger' data-title='INDEX'>
  <div class='landing__image'>
    <?php if ($mp4 != '' || $webm != ''): ?>
      <video autoplay muted loop playsinline>
        <?php if ($mp4): ?>
          <source src="<?php echo $mp4; ?>" type="video/mp4">
        <?php endif; if ($webm): ?>
          <source src="<?php echo $webm; ?>" type="video/webm">
        <?php endif; ?>
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
