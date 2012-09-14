<!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="description" content="Just another wordpress blog">
		<meta name="keywords" content="ttfioc">
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>
			<?php if ( is_home() ) { ?><?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_search() ) { ?><?php echo $s; ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_single() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_page() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_category() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php single_cat_title(); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_month() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_tag() ) { ?><?php single_tag_title();?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_404() ) { ?><?php _e(404) ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php } ?>
		</title>
		<link href="<?php echo get_bloginfo('template_directory');?>/mobile.css?915" rel="stylesheet" type="text/css" media="screen and (max-device-width:1100px)"/>
		<link href="<?php echo get_bloginfo('template_directory');?>/style.css?915" rel="stylesheet" type="text/css" media="screen and (min-device-width:1100px)"/>
	</head>
	<body>
		<header id="header">
			<div id="blogtitle">
				<a  title="HOME" href="<?php bloginfo('url'); ?>"><h1><?php bloginfo('name'); ?></h1></a>
				<br/>
				<h4><?php bloginfo('description'); ?></h4>
			</div>
			<div class="topshadow"></div>
			<nav id="navbar">
				<ul>
				<li><a href="<?php if ( is_user_logged_in() ) :echo admin_url(); else: bloginfo('url'); endif;?>"><?php if ( is_user_logged_in() ) :?>ADMIN<?php else:?>HOME<?php endif;?></a></li>
				<?php wp_list_pages('depth=1&sort_column=menu_order&title_li=' . __('') . '' ); ?>
				<?php wp_list_cats('sort_column=name'); ?>
				</ul>
			</nav>
		</header><div class="bottomshadow"></div>
		<?php get_sidebar(); ?>
		<div id="content">
<!--[if IE 6]>
<script type="text/javascript">window.location='http://ttfioc.com/update'</script>
<![endif]-->
<!--[if IE 7]>
<script type="text/javascript">window.location='http://ttfioc.com/update'</script>
<![endif]-->
<!--[if IE 8]>
<script type="text/javascript">window.location='http://ttfioc.com/update'</script>
<![endif]-->
<!--[if IE 9]>
<div id="ie9box" style="border-top:solid #f2b100 5px;position:fixed;bottom:0px;left:15%;right:15%;width:auto;font-size:13px;padding:15px;background:#fff;color:#000;box-shadow:0 0 10px #000;text-align:center;z-index:50">您似乎正在使用IE，但我不建议这样，因为这里的部分功能IE不能支持,甚至显示出现错误。请考虑 <a style="color:#000;text-decoration:underline" href="http://ttfioc.com/update" title="致广大读者的一封信">换用一个非IE的浏览器</a> ，或 <a href="javascript:;" style="color:#000;text-decoration:underline" onclick="$('#ie9box').fadeOut();localStorage.iefirstvisit=0">坚持继续使用IE</a> 。</div>
<script type="text/javascript">
if (localStorage.iefirstvisit == 0){
$("#ie9box").remove();
}
</script>
<![endif]-->