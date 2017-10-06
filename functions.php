<?php

function ajax_load(){
  header("Content-Type: application/json");

  $postCount = $_POST["postCount"];
  $offset = $_POST["offset"];
  $type = $_POST["type"];
  $query = new WP_Query(array(
    'suppress_filters' => true,
    'post_type' => $type,
    'posts_per_page' => $postCount,
    'order' => 'DESC',
    'orderby' => 'menu_order'
  ));

  $count = 0;
  $output = '';

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      if ($count >= $offset) {
        if ($type == 'index') {
          if ($count % 2 == 0) {
            echo "<div class='grid__divider'></div>";
          }

          get_template_part('grid/index-single');
        } else if ($type == 'editorials') {
          echo "<div class='divider'></div>";
          get_template_part('grid/editorial-single');
        }
      }

      $count++;
    }
  }

  die();
}
add_action('wp_ajax_nopriv_ajax_load', 'ajax_load');
add_action('wp_ajax_ajax_load', 'ajax_load');

function teuber_setup()
{
	add_theme_support('title-tag');
	add_theme_support('automatic-feed-links');
	add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'teuber_setup');

function remove_admin_post_types() {
  remove_menu_page('edit.php'); // posts
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'remove_admin_post_types');

function add_admin_post_types() {
	register_post_type('index', array(
		'label' => 'Index',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'index'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-aside',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
	register_post_type('editorials', array(
		'label' => 'Editorials',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'editorials'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-aside',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
}
add_action('init', 'add_admin_post_types');

add_action( 'comment_form_before', 'teuber_enqueue_comment_reply_script' );
function teuber_enqueue_comment_reply_script()
{
	if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}

add_filter( 'the_title', 'teuber_title' );
function teuber_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}

add_filter( 'wp_title', 'teuber_filter_wp_title' );
function teuber_filter_wp_title( $title )
{
	return $title . esc_attr( get_bloginfo( 'name' ) );
}

add_action( 'widgets_init', 'teuber_widgets_init' );
function teuber_widgets_init()
{
	register_sidebar( array (
		'name' => __( 'Sidebar Widget Area', 'teuber' ),
		'id' => 'primary-widget-area',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => "</li>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	));
}

function teuber_custom_pings( $comment )
{
	$GLOBALS['comment'] = $comment;
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
	<?php
}


function my_login_logo_one() {
?>
	<style type="text/css">
	body.login div#login h1 a {
		background-image: url();
	}
	body.login div#login h1:after {
		content: "TEUBER | KOHLHOFF"
	}
	</style>
<?php
} add_action( 'login_enqueue_scripts', 'my_login_logo_one' );

add_filter( 'woocommerce_enqueue_styles', '__return_false' );
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

add_action( 'wp_enqueue_scripts', 'teuber_load_scripts' );
function teuber_load_scripts()
{
	// remove woo styles
	wp_enqueue_script( 'teuberscript', get_stylesheet_directory_uri() . '/lib/js/build/app.min.js');
	wp_register_style( 'teuberstyle', get_stylesheet_directory_uri() . '/lib/css/style.css' );
	//wp_register_style( 'fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
	wp_enqueue_style( 'teuberstyle' );
	wp_enqueue_style( 'fontawesome' );
}
