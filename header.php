<!DOCTYPE html>
<!-- by xavier-burrow.com -->
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
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

<body class="<?php echo join(' ', get_body_class('')) . ((is_page('Features') ? ' body-alt' : '')); ?>">

<?php get_template_part('loading'); ?>

<div class="content">
	<div class="wrapper">
		<?php get_template_part('nav'); ?>
