<?php
if (!is_pjax()) {
	get_header();
}
else {
?>
<title><?php wp_title(''); ?> | <?php bloginfo('name');
}
?>
</title>
<article id="article" class="<?php if ( is_pjax() ) { ?>pjax <?php } ?><?php if ( is_home() ) { ?>home <?php } ?><?php if ( is_single() ) { ?>single <?php } ?><?php if ( is_404() ) { ?>404 <?php } ?><?php if ( is_page_template('guestbook.php') ) { ?>guestbook <?php } ?>">
<?php include(TEMPLATEPATH.'/section.php'); ?>
</article>
<article id="comments" class="<?php if ( is_pjax() ) { ?>pjax <?php } ?><?php if ( is_home() ) { ?>home <?php } ?><?php if ( is_single() ) { ?>single <?php } ?><?php if ( is_404() ) { ?>404 <?php } ?><?php if ( is_page_template('guestbook.php') ) { ?>guestbook <?php } ?>">
	<?php comments_template('', true); ?>
</article>
</div> <!--content-->
<?php
if (!is_pjax()) {
	get_footer();
}
?>