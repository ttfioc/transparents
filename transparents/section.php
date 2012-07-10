<?php
while(have_posts()) : the_post(); ?>
<section class="post" id="post-<?php the_ID(); ?>" >
	<a href="<?php the_permalink(); ?>"  class="posttitle"><h3><?php the_title(); ?></h3></a>
	<div class="postmetadata" id="postmetadata-<?php the_ID(); ?>">
<?php
if ( is_page()):
	if (is_page_template('guestbook.php') )://留言板的meta只留下留言数
?>
			<?php comments_popup_link('NO COMMENTS', '1 COMMENT', '% COMMENTS'); ?>
<?php
	else ://about页面不输出meta
	endif;
else://其他的照常
?>
			POSTED ON <?php the_time('m/d'); ?> IN <?php the_category(' AND ') ?> ; <?php the_tags('TAGGED WITH ', ', ' , ' '); ?>;<?php comments_popup_link('NO COMMENTS', '1 COMMENT', '% COMMENTS'); ?>
<?php
endif;//meta分类结束
?>
	<?php if ( is_user_logged_in() ):?><?php edit_post_link('EDIT',';');?><?php endif; ?>
	</div>
	<div class="entry" id="entry-<?php the_ID(); ?>">
		<?php the_content('(Read more...)'); ?>
	</div>
</section>
<?php
endwhile;
if ( is_home() || is_archive()):
?>
<div id="navhistory">
	<div id="recentposts">
		<?php previous_posts_link('&laquo; Recent Posts') ?>
	</div>
	<div id="oldposts">
		<?php next_posts_link('Old Posts &raquo;') ?>
	</div>
</div>
<?php
endif;
if ( is_single() ):
?>
<div id="navhistory">
	<div id="recentposts">
		<?php previous_post_link('&laquo; %link'); ?>
	</div>
	<div id="oldposts">
		<?php next_post_link('%link &raquo;'); ?>
	</div>
</div>
<?php
endif;
?>