<?php get_header(); ?>
<div class='editorial'>
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

      echo $title;
      echo $content;
      echo $mainImage;
      echo $date;

      foreach ($sections as $section) {
        $type = $section['layout_type'];

        // full screen image/ video

        if ($type == 'type_full') {
          $media = $section['media_type'];
          $caption = $section['caption'];

          ?>
          <div class='editorial__full'>
            <?php
            if ($media == 'type_image') {
              ?>
              <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
              <?php
            } elseif ($media == 'type_video') {
              ?>
              <video loop autoplay>
                <source src="<?php echo $section['video']; ?>" type="video/mp4">
              </video>
              <?php
            }

            if ($caption != '') {
              echo $caption;
            }
            ?>
          </div>
          <?php
        }

        // single image/ video with margin

        elseif ($type == 'type_single') {
          $media = $section['media_type'];
          $caption = $section['caption'];

          ?>
          <div class='editorial__single'>
            <?php
            if ($media == 'type_image') {
              ?>
              <img src='<?php echo $section['image']['sizes']['large']; ?>'/>
              <?php
            } elseif ($media == 'type_video') {
              ?>
              <video loop autoplay>
                <source src="<?php echo $section['video']; ?>" type="video/mp4">
              </video>
              <?php
            }
            if ($caption != '') {
              echo $caption;
            }
            ?>
          </div>
          <?php
        }

        // two images w/ margin

        elseif ($type == 'type_double') {
          $images = $section['images'];

          ?>
          <div class='editorial__double'>
          <?php
            echo $images[0]['image']['sizes']['large'] . $images[0]['caption'];
            echo $images[1]['image']['sizes']['large'] . $images[1]['caption'];
          ?>
          </div>
          <?php
        }

        // text area

        elseif ($type == 'type_text') {
          $text = $section['text_area'];

          ?>
          <div class='editorial__textarea'>
            <?php echo $text; ?>
          </div>
          <?php
        }

        // related projects (type == index)

        elseif ($type == 'type_related') {
          $projects = $section['related_projects'];

          ?>
          <div class='editorial__related'>
            <?php
              echo $projects[0]['project']->ID;
              echo $projects[1]['project']->ID;
            ?>
          </div>
          <?php
        }
      }
    }
  }
?>
</div>
<?php get_footer(); ?>
