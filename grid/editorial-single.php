<?php
  $title = get_the_title();
  $image = get_field('main_image')['sizes']['large'];
  $video = get_field('main_video');
  $date = get_the_date();
  $excerpt = get_the_excerpt();
  $link = get_the_permalink();
  // get_site_url() . '/editorials/'
?>

<div class='grid__full'>
  <div class='item editorial-item'>
    <a href='<?php echo $link ?>'>
      <div class='item__inner reveal-children'>
        <div class='item__inner__date reveal text-large'>
          <?php echo $title; ?>
        </div>
        <div class='item__inner__image'>
          <?php if ($video != ''): ?>
            <video loop autoplay playsinline muted>
              <source src="<?php echo $video['url']; ?>" type="video/mp4">
            </video>
          <?php else: ?>
            <img src='<?php echo $image;?>' />
          <?php endif; ?>
        </div>
        <div class='item__inner__desc'>
          <div class='item__inner__desc__title uppercase text-mediumsmall'>
            (<?php echo $date; ?>)
          </div>
          <div class='item__inner__desc__content font-serif text-mediumsmall'>
            <?php echo $excerpt; ?>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
