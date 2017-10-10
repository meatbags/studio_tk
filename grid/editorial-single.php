<?php
  $title = get_the_title();
  $image = get_field('main_image')['sizes']['large'];
  $date = get_the_date();
  $excerpt = get_the_excerpt();
  $link = get_the_permalink();
?>

<div class='grid__full'>
  <div class='item editorial-item'>
    <a href='<?php if (is_home()) {
        echo get_site_url() . '/editorials/';
      } else {
        echo $link;
      }?>'>
      <div class='item__inner reveal-children'>
        <div class='item__inner__date reveal text-large'>
          (<?php echo $date; ?>)
        </div>
        <div class='item__inner__image'>
          <img src='<?php echo $image;?>' />
        </div>
        <div class='item__inner__desc'>
          <div class='item__inner__desc__title uppercase text-small'>
            <?php echo $title; ?>
          </div>
          <div class='item__inner__desc__content font-serif text-small'>
            <?php echo $excerpt; ?>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
