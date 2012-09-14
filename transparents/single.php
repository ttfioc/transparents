<?php
if (!is_pjax()) {
	get_header();
}
else {
?>
<title>
	<?php if ( is_search() ) { ?><?php echo $s; ?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_single() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_page() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_category() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php single_cat_title(); ?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_month() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_tag() ) { ?><?php single_tag_title();?> | <?php bloginfo('name'); ?><?php } ?>
	<?php if ( is_404() ) { ?><?php _e(404) ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php }
}
?>
</title>
<article id="article" class="<?php if ( is_pjax() ) { ?>pjax <?php } ?><?php if ( is_home() ) { ?>home <?php } ?><?php if ( is_single() ) { ?>single <?php } ?><?php if ( is_404() ) { ?>_404 <?php } ?><?php if ( is_page() ) { ?>page <?php } ?><?php if ( is_page_template('guestbook.php') ) { ?>guestbook <?php } ?>">
	<?php include(TEMPLATEPATH.'/section.php'); ?>
	<?php if ( is_404() ) { ?>
		<section class="post"><div class="entry">
			404 not found.<br/>
			Please reconfirm that you haven't entered a wrong url.<br/>
			<a href="<?php bloginfo('url'); ?>">Click here</a> to to go back to homepage.
			</div>
		</section>
	<?php } ?>
</article>
<article id="comments" class="<?php if ( is_pjax() ) { ?>pjax <?php } ?><?php if ( is_home() ) { ?>home <?php } ?><?php if ( is_single() ) { ?>single <?php } ?><?php if ( is_404() ) { ?>_404 <?php } ?><?php if ( is_page() ) { ?>page <?php } ?><?php if ( is_page_template('guestbook.php') ) { ?>guestbook <?php } ?>">
	<?php comments_template('', true); ?>
</article>
<?php
if (!is_pjax()) {
	get_footer();
}
?>