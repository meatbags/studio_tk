<?php get_header(); ?>
<div class='editorial'>
  <div class='grid'>
<?php
  if (have_posts()):
		while (have_posts()):
      the_post();

      // get fields
      $title = get_the_title();
      $content = get_the_content();
      $date = get_the_date();
      $mainImage = get_field('main_image')['sizes']['large'];
      $sections = get_field('sections');
      ?>

      <div class='grid section'>
        <div class='grid__full section-full'>
          <img src='<?php echo $mainImage?>' />
        </div>
        <div class='grid__quarter responsive editorial__date text-right text-large'>
          (<?php echo $date; ?>)
        </div>
        <div class='grid__threefifths responsive editorial__description text-mediumsmall font-serif'>
          <?php echo $content; ?>
        </div>
      </div>

      <?php
        foreach ($sections as $section):
          $type = $section['layout_type'];
        // full screen image/ video

        if ($type == 'type_full') {
          $media = $section['media_type'];
          $caption = $section['caption'];
          ?>
          <div class='section pad'>
            <div class='section-full'>
              <div class='section-full__inner'>
                <?php if ($media == 'type_image'): ?>
                  <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
                <?php elseif ($media == 'type_video'): ?>
                  <video loop autoplay>
                    <source src="<?php echo $section['video']; ?>" type="video/mp4">
                  </video>
                <?php
                  endif;
                  if ($caption != ''): ?>
                <div class='section-full__inner__caption text-mediumsmall'>
                  <?php echo $caption; ?>
                </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
          <?php
        }

        // single image/ video with margin

        elseif ($type == 'type_single') {
          $media = $section['media_type'];
          $caption = $section['caption'];
          ?>
          <div class='section pad'>
            <div class='section-single'>
              <div class='section-single__inner'>
              <?php if ($media == 'type_image'): ?>
                <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
              <?php elseif ($media == 'type_video'): ?>
                <video loop autoplay>
                  <source src="<?php echo $section['video']; ?>" type="video/mp4">
                </video>
              <?php endif; ?>
              <?php if ($caption != ''): ?>
                <div class='section-single__inner__caption text-mediumsmall font-serif'>
                  <?php echo $caption; ?>
                </div>
              <?php endif; ?>
              </div>
            </div>
          </div>
          <?php
        }

        // two images w/ margin

        elseif ($type == 'type_double') {
          ?>
          <div class='section pad'>
            <div class='grid'>
            <?php
            $images = $section['images'];
            foreach ($images as $img):
              $src = $img['image']['sizes']['large'];
              $caption = $img['caption'];
              ?>
              <div class='grid__half responsive section-double'>
                <div class='section-double__inner font-serif'>
                  <img src='<?php echo $src; ?>' />
                  <?php if ($caption != ''): ?>
                    <div class='section-double__inner__caption text-mediumsmall'>
                      <?php echo $caption; ?>
                    </div>
                  <?php endif; ?>
                </div>
              </div>
            <?php endforeach; ?>
            </div>
          </div>
          <?php
        }

        // text area

        elseif ($type == 'type_text') {
          $textTitle = $section['text_title'];
          $text = $section['text_area'];
          ?>
          <div class='section pad'>
            <div class='section-textarea'>
              <div class='section-textarea__inner'>
                <div class='section-textarea__inner__title text-mediumsmall'>
                  <?php echo $textTitle; ?>
                </div>
                <div class='section-textarea__inner__text font-serif text-mediumsmall'>
                  <?php echo $text; ?>
                </div>
              </div>
            </div>
          </div>
          <?php
        }

        // related projects (index)

        elseif ($type == 'type_related') {
          $projects = $section['related_projects'];
          $ids = array($projects[0]['project']->ID, $projects[1]['project']->ID);
          $query = new WP_Query(array(
            'post_type' => 'index',
            'post__in' => $ids
          ));
          ?>
          <div class='section'>
            <div class='section-related grid__full background-white text-centre text-medium text-black'>
              RELATED PROJECTS
            </div>
            <div class='grid index-grid text-black text-medium index-grid-related'>
              <?php
              if ($query->have_posts()) {
          			while ($query->have_posts()) {
          				$query->the_post();
                  get_template_part('grid/index-single-home');
                }
              }
              ?>
            </div>
          </div>
          <?php
        }
      ?>
      <?php

      endforeach;
    endwhile;
  endif;
?>
  </div>
</div>
<?php get_footer(); ?>
