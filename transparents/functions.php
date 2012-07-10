<?php
/* Ajax */
function is_pjax(){
	return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'] === 'true';
}
/* Different Favicon for Backend */
function favicon4admin() {
	echo '<link rel="Shortcut Icon" type="image/x-icon" href="' . get_bloginfo('wpurl') . '/wp-admin/favicon.ico" />';
}
add_action( 'admin_head', 'favicon4admin' );
/* TinyMCE */
function enable_more_buttons($buttons) {
	$buttons[] = 'hr';
	$buttons[] = 'del';
	$buttons[] = 'sub';
	$buttons[] = 'sup';
	$buttons[] = 'fontselect';
	$buttons[] = 'fontsizeselect';
	$buttons[] = 'cleanup';
	$buttons[] = 'styleselect';
	return $buttons;
}
add_filter("mce_buttons_3", "enable_more_buttons");
?>
<?php
/* wp-list-comments */
function mytheme_comment($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment;
?>
<li <?php comment_class(); ?>>
<div id="comment-<?php comment_ID(); ?>" class="singlecomment">
	<div class="comment-author">
		<?php echo get_avatar( $comment->comment_author_email, 40 ); ?>
		<?php printf(__('<cite class="fn">%s</cite> <span class="says">says on </span>'), get_comment_author_link()) ?><?php printf(__('%1$s at %2$s'),get_comment_date('m/d'),get_comment_time('H:i:s'))?> via <?php useragent_output_custom(); ?>:
	</div>
	<div class="commenttext">
	<?php if ($comment->comment_approved == '0') : ?>
		<strong class="moderation">Your comment is awaiting moderation.</strong>
		<br/>
	<?php endif; ?>
		<?php comment_text() ?>
	</div>
	<div class="reply">
		<?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?><?php edit_comment_link(__('Edit'),'  ','') ?>
	</div>
</div>
<?php
}
?>
<?php
/* 去掉tag的rel过验证… */
add_filter( 'the_category', 'add_nofollow_cat' );
function add_nofollow_cat( $text ) {
$text = str_replace('rel="category tag"', "", $text); return $text;
}
//别没事老ping自己
function disable_self_ping( &$links ) {
    foreach ( $links as $l => $link )
        if ( 0 === strpos( $link, get_option( 'home' ) ) )
            unset($links[$l]);
}
add_action( 'pre_ping', 'disable_self_ping' );
?>