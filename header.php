<!DOCTYPE html>
<!-- xavier-burrow.com -->
<html lang="en">
<head>
	<title><?php wp_title(); ?></title>
	<meta name="description" content="<?php bloginfo(); ?>">
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/lib/icon/favicon.png">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

	<?php wp_head(); ?>

	<script>
		/* <![CDATA[ */
		var themePath = '<?php echo get_template_directory_uri(); ?>';
		var ajaxUrl = '<?php echo admin_url('admin-ajax.php'); ?>';
		var pageTitle = '<?php echo get_the_title(); ?>';
		var isHome = '<?php echo is_home(); ?>';
		/* ]]> */
	</script>
</head>

<body <?php body_class(); ?>>

<!--
<div class='loading-screen'>
	<div class='loading-screen__message'>
		loading...
	</div>
</div>
-->

<div class="content" id="aws_main">
	<div class="wrapper">
		<?php get_template_part('nav'); ?>
