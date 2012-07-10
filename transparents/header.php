<!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="description" content="Just another wordpress blog">
		<meta name="keywords" content="ttfioc">
		<title>
			<?php if ( is_home() ) { ?>HOME | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_search() ) { ?><?php echo $s; ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_single() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_page() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_category() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php single_cat_title(); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_month() ) { ?><?php _e('Archive', 'elegant-grunge') ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_tag() ) { ?><?php single_tag_title();?> | <?php bloginfo('name'); ?><?php } ?>
			<?php if ( is_404() ) { ?><?php _e(404) ?> <?php the_time('F'); ?> | <?php bloginfo('name'); ?><?php } ?>
		</title>
		<link href="<?php echo get_bloginfo('template_directory');?>/style.css" rel="stylesheet" type="text/css" media="all" />
	</head>
	<body>
		<header id="header">
			<div id="blogtitle">
				<a  title="HOME" href="<?php bloginfo('url'); ?>"><h1><?php bloginfo('name'); ?></h1></a>
				<br/>
				<h4><?php bloginfo('description'); ?></h4>
			</div>
			<nav id="navbar">
				<ul>
				<li><a href="<?php if ( is_user_logged_in() ) :echo admin_url(); else: bloginfo('url'); endif;?>"><?php if ( is_user_logged_in() ) :?>ADMIN<?php else:?>HOME<?php endif;?></a></li>
				<?php wp_list_pages('depth=1&sort_column=menu_order&title_li=' . __('') . '' ); ?>
				<?php wp_list_cats('sort_column=name'); ?>
				</ul>
			</nav>
		</header>
		<aside id="leftaside">
			<div id="leftcenter">
				<ul id="jsplayer"></ul>
				<div id="jsplayercover"><img alt="cover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABdElEQVQ4T7WUuUoEQRCGdzzRxRMvFgQzQ03UUNTMRDEXMTHSYFEx9AkGLwx8CTXQyGSfwEA8MPTCYGERdhEj9fuX7nUw2emGbvjoGqj6u7uqpqJMoBUF0s1IuBH6oAO+oAht0AuuB8u/LA0ZXbAOc/AAxzAGy9ACPw6vkl4BDmUMwgkswE3ikF0HwaTrOR9rEtaTt2EW7mAPJmAVmj3Er4iJJazgEXOA8vME3ZCDBo9UqEbPrsVJ/YCksLVtsXwPrcYruB3mYRxe4NKkZobdpyvUABcS7jcFW2K/hi2Yhh1oTf32P8dTzLyEByCGRSMsQQmrU3Rj13VGwKaEs6BWG4VXKJhUTLHrr3RZ0ruXhi2Q2kr2Nyj5sn1aTbFVfCtf9xV2CA3h2QOf8G7So9y7Hiz/D2nYIbRh8vzIfgRqPTuE6t7un4NqdBB8CKl31Rm3sA+TsAI+P0htCDUhMAwaPBV4g07QOHXNsbJSkoZPYKqcBxP+BSljRMKq/5vdAAAAAElFTkSuQmCC"/></div>
			</div>
			<ul id="jscontrols">
				<li id="jsplay"><img alt="play" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAA9ElEQVQ4T2NkoBFgpJG5DKMGw0MWX1DEAVX9BuK1QPyL1LjAZbAI0KCdQKwFxCuAeAkQ7yXFcFwGi0INNoQa9hRILwLixUB8nRgLiDUYZtYZqAUgH7zHZwGpBoPM+gfE26AWrAfSf7BZQI7BMHM+AxnLgXguEJ9CN5wSg2FmTQcyyoD4C7LhlBj8DRrBs4H0dmq4GBTGJ6BJcA2Qfk2NML4DNASWrm8B2f9xpQxig+Id0ABQCgCl5eNADMqReAEhg7WBundDvb0FPYLwmYzLYC6gpiIgBiWpVUD8nJALiY08kDoOIP6JLxzJcTGpDsRQP/RqEAD66DYXWlselQAAAABJRU5ErkJggg=="/></li>
				<li id="jspause"><img alt="pause" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAy0lEQVQ4T2NkoBFgpJG5DMPDYFZg8EgBMSdSMP0Hsp8C8Rcg5gdiSbQg/A6V/wMTxxYUykDJyUCshKSZDciuA+IlQJwBxBVA/ANJ/i6QnQXED/EZrA+UXAvEIAuQAciwTiBuAeJqNLnbQL4/EF+ntsG3gAYGjBoMCtbRoIAnutGgIC0o1IHKZ6OVFaCCqQqI5wJxIRBXAvEvpGx9E8hOBuIH+LI0qFRTBWJuJI3/gOw7QPwWiCWAWBGtrPgE5IPKC7hlw6OgR/MleVwARUpPF/Quzr8AAAAASUVORK5CYII="/></li>
				<li id="jsstop"><img alt="stop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAhklEQVQ4T2NkoBFgpJG5DKMGw0N2QIJCCGi9HRCz4Ing30C5g0D8AV0NPhdHAxXPBWJmPAb/AcqB1K0jxeBUoOLpRBgcA1SzctRgUBiPBgU4HZAVFElAjTOISG6RpKZjDaAGfyBmx5NBPkPT8DNS0jFILRMR5fU/bGoGpBAiwrG4lQw9FwMAyIsiF3Z3kZ4AAAAASUVORK5CYII="></li>
			</ul>
			<div id="jsprogress1">
				<div id="jsprogress2"></div>
			</div>
			<audio id="jsplayersound" controls="controls"></audio>
		</aside>
		<aside id="rightaside">
			<div id="navdown"><img alt="go bottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABoElEQVQ4T72UvSvFURjH7/USKYMQURQLA5MMRlkMUhbKSzcUGRQDgzIalGRg8z4qysBgNPkHMHsbWLyVkJfP9/Ybzv05v3PPTTz16Zzfc57z/T3nnOeceOyPLP5HurF/Ey5jBd3wAKdwGfRfaT+N1eXQz4cSqIYGkG8D7hUXzrgR3z5UwhNcB1zRXsAzFEMNVEFF8F1IewJdcGMTzsM5D+NGdmb3y5KMxj9gChZBMdY9bsa/CXUR4jb3Mc5e0NYlzXZ42qtZmIEsD/E3YiZgxYyNqop6gragyUP4gJgE3PkIK9NJmINch/gLY6NBEilhrjrWqa9Dq0N4h7FheAzHuIQ1NgRLUGARV60Pwq7tx+luXimTVqHDMnkb3whoO35YOmFN6AGdeJEx+5Z+Ag6jtslHWLdqGfoNEX2rxN5/I6y57bAG5aCr3Qe6FJHmk7Em68FZgLGgnabVNc5IuDbIUDfQND1QbaALcR4a05bsQfIBktkyHsCvZWe7MgqNqTI64cgl3MKg6lcvna/pOVW9n7mEtQrtaaaWUs++h5fpT2Lfx1BDF3anYzkAAAAASUVORK5CYII="/></div>
			<div id="navup"><img alt="go top" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABnklEQVQ4T72UzStFQRiH7/WZIkq+UixYWlooZUcWSsoK+VpJiaVSLJTCRiiXBQuUBX8BKUsrJcXCQmIhhUK+Es9P59a5pzlzzqVr6umc+847z8zceedEIylq0RR5I/8qrmYXLZCVxG7eyd2Gq/gY04q76VyF9CTEL+S2wq5NXEdnn2HF5cRqYR8ePZM+83sRzmxi7SLbM1CxKRiBCZgx7ObVHQt7ePUM2oRKOIJOOLX9VWHEaQjmYMglmuR9/K/iRgTrUOISnfPeBYd+8qAVq+SWoN8gmCc2/FtxMwM3oNAguCXWAXsmuW3Fqoxl6LH8l6r3Afjw5tjE7SSvQa5F/ESfal63LqH5ifPI0mokD2o7jjzh0viJe0mOgfeimCb5JDgIK+5Ok7iIBB1YU9BSXf0HvKv8rB8hHcYCZCQhVuooTMfHeFdcRscWNIA+hfq43MMNXMMD6DBLoRhUhvmgej+GNriQ3CuuIDbmSE946oZJeOdMorLSTnKgwJmgimeNE5vleWkSK6aKeANJvhQI0TKdVWuHPy3oSodwmlO+AVazQhdBrzFAAAAAAElFTkSuQmCC"/></div>
			<div id="rightcenter">
				<div id="adsense"><script type="text/javascript">google_ad_client = "ca-pub-0261873184670811";google_ad_slot = "5127016935";google_ad_width = 120;google_ad_height = 240;</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script></div>
				<div id="adcover"><img alt="cover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAACpUlEQVQ4T53VW4hNURjAcXPBuBXCA8k9t5ooLx4wJhqXB5dCmCK5lXmQa65NojSGhBJ5kXgRZXhAIZSU4UHzwMsYud8iGteY+f9Pa9WZfc4Zxq5fa59z1v722t/3rX3y2uU+OvNTbzjmJaY18fkL3uFHthDJC5zTBQMwFRPQCb8TFxeGwFcZb+BF8gbpgQ0wHFMwBwPDRXcZfyYC9+BzGUajFudwC0/xy7kxcHvOS7EeY+HjP8EuXIqT04J353wJ1sF0vcRt7MNDNMXA/miQRajHg3DBK8YrMJ9xrvntiWnoDxfl2BVVOIpGJ6sYx2A6TuAySrAa7/E5LXAB533xCYfhjeaHG91nrEC9QZ04MUxypdvwDEsxO9zkdZhnkI7hpt0YN8HOGBeuG8K4DHfiikfyoRIj4ONY7Y2waK7qA2Iq7IiZWIgDuId5Yb4L8rpHcbItNhfb8T0EtuXO4jyS7WbqNqABpmQFfHLrZId8i4EdDWRXLIaP7CNewGN4pBfPdpuOwfgKi3kKB2HBW+yoDnyejC0Yg0bYOm9RBH83eMzzUM7ddc57jr2weP6esVV78Z2PtSoEOsRou+XD3Hp4obWwj201U3cSpsDz1JHc0gZwg2zFDJzGTvh4ca6rL4dtFethgd/EoNkC+52FtC8NbkFc/TX8CcHNazXGw21sCmzTFke2l5ATBmEzLORx7MZHmGfbzMD29h7YNcl3SUYq4l3NnW8328dgy+HLph987Ek4ArvAHs84cq3YiRZyDVbC/W8h3Rj74aZwh9ZlC+p3rQWOhXTVbt9K+O4YBQt6EalXZFtX7HwLuQBr4bt2GM7AdJjznEdrK44XWUg3jS+km9gBd2NqI/zvir3O4pVgFmpwHTlTEG/0Lyt2rv8YfeBG8aX/16MZey2VGaBST7IAAAAASUVORK5CYII="/></div>
			</div>
			<div id="loadbar1">
				<div id="loadbar2"></div>
			</div>
		</aside>
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