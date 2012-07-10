<?php
if (!is_pjax()) {
	get_header();
}
?>
<article id="article"><section class="post"><div class="entry">
404 not found.<br/>
Please reconfirm that you haven't entered a wrong url.<br/>
<a herf="<?php bloginfo('url'); ?>">Click here</a> to to go back to homepage.
</div></section></article>
<?php get_footer();?>