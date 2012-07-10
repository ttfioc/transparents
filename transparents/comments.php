<?php if (isset($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))die ('<script>window.location="/"</script>');
if ( post_password_required() ) { ?>
	<p class="nocomments">This post is password protected. Enter the password to view comments.</p>
	<?php
	return;
}
if ( have_comments() ) :
if ( !is_page_template('guestbook.php') ) :?>
	<h3 id="commentstitle">Comments</h3>
	<ol class="commentslist">
		<?php wp_list_comments('type=all&callback=mytheme_comment'); ?>
	</ol>
	<?php endif;
		else :
		if ( comments_open() ) :
		else :?>
			<p class="nocomments"></p>
		<?php endif;
endif;
if ( comments_open() ) : ?>
	<div id="respond">
		<h3>Leave a Comment:</h3>
		<div id="cancel-comment-reply">
			<small><?php cancel_comment_reply_link() ?></small>
		</div>
		<?php if ( get_option('comment_registration') && !is_user_logged_in() ) : ?>
			<p><?php printf(__('You must be <a href="%s">logged in</a> to post a comment.', 'kubrick'), wp_login_url( get_permalink() )); ?></p>
			<?php else : ?>
				<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">
					<?php if ( is_user_logged_in() ) : ?>
						<p><?php printf(__('Login as <a href="%1$s">%2$s</a>.', 'kubrick'), get_option('siteurl') . '/wp-admin/profile.php', $user_identity); ?> <a href="<?php echo wp_logout_url(get_permalink()); ?>" title="<?php _e('Logout of this account', 'kubrick'); ?>"><?php _e('logout &raquo;', 'kubrick'); ?></a></p>
						<?php else : ?>
							<div class="formsub1"><div class="formsub2"><p id="inputauthor">
								<label for="author">Name<?php if ($req) _e("<span class='required'>*</span>", "kubrick"); ?></label>
								</br><input type="text" name="author" id="author" value="<?php echo esc_attr($comment_author); ?>" tabindex="1" <?php if ($req) echo "aria-required='true'"; ?> />
							</p></div></div>
							<div class="formsub1"><div class="formsub2"><p id="inputemail">
								<label for="email">Email<?php if ($req) _e("<span class='required'>*</span>", "kubrick"); ?></label>
								</br><input type="text" name="email" id="email" value="<?php echo esc_attr($comment_author_email); ?>" tabindex="2" <?php if ($req) echo "aria-required='true'"; ?> />
							</p></div></div>
							<div class="formsub1"><div class="formsub2"><p id="inputurl">
								<label for="url">Website</label>
								</br><input type="text" name="url" id="url" value="<?php echo  esc_attr($comment_author_url); ?>" tabindex="3" />
							</p></div></div>
							<div id="ajaxgravatar"><img src="http://0.gravatar.com/avatar/0?s=40" alt="Gravatar"></div>
							<?php endif; ?>
							<div class="formsub3"><div class="formsub2">
							<textarea name="comment" id="comment"  tabindex="4"></textarea>
							</div></div>
							<p id="inputsubmit"><input name="submit" type="submit" id="submit" tabindex="5" value="POST THE COMMENT (CTRL + ENTER)" />
									<?php comment_id_fields(); ?>
								</p>
					<?php do_action('comment_form', $post->ID); ?>
				</form>
		<?php endif;  ?>
	</div>
<?php endif;
if (is_page_template('guestbook.php') ) :?>
	<h3 id="commentstitle">Comments</h3>
	<ol class="commentslist">
		<?php wp_list_comments('reverse_top_level=ture&type=comment&callback=mytheme_comment');?>
	</ol>
<?php endif; ?>