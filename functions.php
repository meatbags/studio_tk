<?php

// ajax

function ajax_load(){
    header("Content-Type: application/json");

	$value = (isset($_POST['value'])) ? $_POST['value'] : 0;
	$output = array('content' => '', 'complete' => false);
	
	// do stuff
    // $loop = new WP_Query(array());
	// wp_reset_postdata();
	
	die(json_encode($output));
}
add_action('wp_ajax_nopriv_ajax_load', 'ajax_load');
add_action('wp_ajax_ajax_load', 'ajax_load');

// setup

function teuber_setup()
{
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'teuber_setup' );

// customise admin

function add_admin_post_types() {
	register_post_type('stories', array(
		'label' => 'Stories',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'stories'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-aside',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
	
	register_post_type('projects', array(
		'label' => 'Projects',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'projects'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-aside',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
}
add_action('init', 'add_admin_post_types');

// defaults

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

// login logo

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


// scripts & styles
add_filter( 'woocommerce_enqueue_styles', '__return_false' );
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

add_action( 'wp_enqueue_scripts', 'teuber_load_scripts' );
function teuber_load_scripts()
{	
	// remove woo styles
	wp_enqueue_script( 'teuberscript', get_stylesheet_directory_uri() . '/lib/js/build/app.min.js');
	wp_register_style( 'teuberstyle', get_stylesheet_directory_uri() . '/lib/css/style.css' );
	wp_register_style( 'fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
	wp_enqueue_style( 'teuberstyle' );
	wp_enqueue_style( 'fontawesome' );
}

