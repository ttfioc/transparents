<?php
if (!is_pjax()) {
	get_header();
}
else {
?>
<title><?php bloginfo('name');
}
?>
</title>
<article id="article" class="<?php if ( is_pjax() ) { ?>pjax <?php } ?><?php if ( is_home() ) { ?>home <?php } ?><?php if ( is_single() ) { ?>single <?php } ?><?php if ( is_404() ) { ?>404 <?php } ?><?php if ( is_page_template('guestbook.php') ) { ?>guestbook <?php } ?>">
	<?php if(have_posts()) : ?>
		<?php include(TEMPLATEPATH.'/section.php'); ?>
	<?php else : ?>
		<div class="post">
			<h2>404 Not Found!</h2>
		</div>
	<?php endif; ?>
</article>
<div class="bottomshadow"></div>
<?php
if (!is_pjax()) {
	get_footer();
}
?>