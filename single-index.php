<?php
  $title = get_the_title();
  $content = get_the_content();
  $sections = get_field('sections');
  $note = get_field('note');
  $shopLink = get_field('shop_link');
?>

<div class='index-overlay__item'>
<?php
  foreach ($sections as $sec) :
    $imgSrc = $sec['image']['url'];
    $videoSrc = $sec['video_file'];

    if ($videoSrc == ''): ?>
      <div class='item__image'>
        <img class='to-load' src='<?php echo $imgSrc; ?>' />
      </div>
    <?php else: ?>
      <div class='item__image'>
        <video loop autoplay playsinline muted>
          <source src="<?php echo $videoSrc; ?>" type="video/mp4">
        </video>
      </div>
  <?php endif;
    endforeach;
  ?>

  <div class='item__text'>
    <div class='item__description text-medium'>
      <?php echo $content; ?>
    </div>
    <?php if ($note != ''): ?>
      <div class='item__note text-small'>
        <?php echo $note; ?>
      </div>
    <?php endif; ?>
    <?php if ($shopLink != ''): ?>
      <?php
        $ids = array($shopLink->ID);
        $query = new WP_Query(array(
          'post_type' => 'product',
          'post__in' => $ids
        ));
        if ($query->have_posts()) {
          while ($query->have_posts()) {
            $query->the_post(); ?>
          <div class='item__orderhere text-medium'>
            <a href='<?php echo get_the_permalink(); ?>'>ORDER HERE</a>
          </div>
            <?php
          }
        }
      ?>
    <?php endif; ?>
  </div>
</div>
