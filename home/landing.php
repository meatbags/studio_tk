<?php
  $page = get_page_by_title('landing');
  $image = get_field('landing_page_image', $page->ID);
  $mp4 = get_field('landing_page_video_mp4', $page->ID);
  $webm = get_field('landing_page_video_webm', $page->ID);
?>

<div class='landing'>
  <div class='landing__image'>
    <?php if ($mp4 != '' || $webm != ''): ?>
      <video loop autoplay>
        <source src="<?php echo $mp4; ?>" type="video/mp4">
        <source src="<?php echo $webm; ?>" type="video/webm">
      </video>
    <?php elseif ($image != ''): ?>
      <img src='<?php echo $image; ?>'/>
    <?php endif; ?>
  </div>
  <div class='landing__title'>
    <div class='landing__title__inner'>
      <div class='text-huge'>
        <?php echo get_bloginfo('name'); ?>
      </div>
      <div class='text-small'>
        <?php echo get_bloginfo('description'); ?>
      </div>
    </div>
  </div>
</div>
