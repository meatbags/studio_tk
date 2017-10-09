<?php get_header(); ?>
<div class='editorial'>
  <div class='grid'>
<?php
  if (have_posts()) {
		while (have_posts()) {
      the_post();

      // get fields
      $title = get_the_title();
      $content = get_the_content();
      $date = get_the_date();
      $mainImage = get_field('main_image')['sizes']['large'];
      $sections = get_field('sections');

      ?>
      <div class='grid__full section-full'>
        <img src='<?php echo $mainImage?>' />
      </div>
      <div class='grid__quarter text-right padding text-large'>
        (<?php echo $date; ?>)
      </div>
      <div class='grid__half padding text-medium'>
        <?php echo $content; ?>
      </div>
      <div class='grid__quarter'></div>
      <?php

      foreach ($sections as $section) {
        $type = $section['layout_type'];

        // full screen image/ video
        if ($type == 'type_full') {
          $media = $section['media_type'];
          $caption = $section['caption'];
          ?>
          <div class='section'>
            <div class='grid__full section-full'>
              <?php if ($media == 'type_image'): ?>
                <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
              <?php elseif ($media == 'type_video'): ?>
                <video loop autoplay>
                  <source src="<?php echo $section['video']; ?>" type="video/mp4">
                </video>
              <?php endif; ?>
            </div>
            <?php if ($caption != ''): ?>
              <div class='grid__full'>
                <?php echo $caption; ?>
              </div>
            <?php endif; ?>
          </div>
          <?php
        }

        // single image/ video with margin
        elseif ($type == 'type_single') {
          $media = $section['media_type'];
          $caption = $section['caption'];
          ?>
          <div class='grid__full section section-full'>
            <?php if ($media == 'type_image'): ?>
              <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
            <?php elseif ($media == 'type_video'): ?>
              <video loop autoplay>
                <source src="<?php echo $section['video']; ?>" type="video/mp4">
              </video>
            <?php endif; ?>
          </div>
          <?php if ($caption != ''): ?>
            <div class='grid__full'>
              <?php echo $caption; ?>
            </div>
            </div>
          <?php endif;
        }

        // two images w/ margin
        elseif ($type == 'type_double') {
          $images = $section['images'];
          foreach ($images as $img): ?>

          <div class='grid__half section section-double'>
            <img src='<?php echo $img['image']['sizes']['large']; ?>' />
            <?php echo $img['caption']; ?>
          </div>

          <?php endforeach;
        }

        // text area

        elseif ($type == 'type_text') {
          $textTitle = $section['text_title'];
          $text = $section['text_area'];
          ?>
          <div class='grid__full section section-textarea'>
            <?php echo $textTitle; ?>
            <?php echo $text; ?>
          </div>
          <?php
        }

        // related projects (type == index)

        elseif ($type == 'type_related') {
          $projects = $section['related_projects'];
          $ids = array($projects[0]['project']->ID, $projects[1]['project']->ID);
          $query = new WP_Query(array(
            'post_type' => 'index',
            'post__in' => $ids
          ));
          ?>
          <div class='grid text-black index-grid index-grid-related grid__full'>
            <div class='grid__full text-centre text-large padding text-black'>
              RELATED PROJECTS
            </div>
            <?php
            if ($query->have_posts()) {
        			while ($query->have_posts()) {
        				$query->the_post();
                get_template_part('grid/index-single-home');
              }
            }
            ?>
          </div>
          <?php
        }
      }
    }
  }
?>
  </div>
</div>
<?php get_footer(); ?>
