<?php
  $postType = get_post_type();
?>

<div class='loading-bar <?php if ($postType == 'editorials') { echo 'inverted'; } ?>'>
  <div class='loading-bar__inner'></div>
</div>
