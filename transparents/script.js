/**
 * WordPress jQuery-Ajax-Comments v1.3 by Willin Kan.
 * URI: http://kan.willin.org/?p=1271
 */
	var ajaxcomment = function(){
	var i = 0, got = -1, len = document.getElementsByTagName('script').length;
	while ( i <= len && got == -1){
		var js_url = document.getElementsByTagName('script')[i].src,
				got = js_url.indexOf('script.js'); i++ ;
	}
	var 	ajax_php_url = js_url.replace('script.js','comments-ajax.php'),
			wp_url = js_url.substr(0, js_url.indexOf('wp-content')),
			pic_sb = wp_url + 'wp-admin/images/wpspin_dark.gif', // 提交 icon
			pic_no = wp_url + 'wp-admin/images/no.png',      // 錯誤 icon
			pic_ys = wp_url + 'wp-admin/images/yes.png',     // 成功 icon
			txt1 = '<div id="loading"><img src="' + pic_sb + '" style="vertical-align:middle;" alt=""/> Please wait a while...</div>',
			txt2 = '<div id="error">#</div>',
			txt3 = '"><img src="' + pic_ys + '" style="vertical-align:middle;" alt=""/> Thanks for your comment!',
			edit, num = 1, comm_array=[]; comm_array.push('');

	jQuery(document).ready(function($) {
			$comments = $('#comments-title'); // 評論數的 ID
			$cancel = $('#cancel-comment-reply-link'); cancel_text = $cancel.text();
			$submit = $('#commentform #submit'); $submit.attr('disabled', false);
			$('#comment').after( txt1 + txt2 ); $('#loading').hide(); $('#error').hide();

	/** submit */
	$('#commentform').submit(function() {
		if($("#author")[0]){
			if($("#comment")[0].value == "" || $("#author")[0].value == "" || $("#comment")[0].value == ""){
				alert("Please check whether your name,email and your comment are all filled!\nTo post a comment,these are required at least.");
				return false;
			}
			else if($("#comment")[0].value!=="" && !RegExp(/[\u4E00-\u9FA5]/).test($("#comment")[0].value)){
				alert("Please input some Chinese words like \"你好\" in your comments to pass the spam test.\nThanks for your patient!");
				return false;
			}
		}
			$('#loading').slideDown();
			$submit.attr('disabled', true).fadeTo('slow', 0.5);
			if ( edit ) $('#comment').after('<input type="text" name="edit_id" id="edit_id" value="' + edit + '" style="display:none;" />');

	/** Ajax */
		$.ajax( {
			url: ajax_php_url,
			data: $(this).serialize(),
			type: $(this).attr('method'),

			error: function(request) {
				$('#loading').slideUp();
				$('#error').slideDown().html('<img src="' + pic_no + '" style="vertical-align:middle;" alt=""/> ' + request.responseText);
				setTimeout(function() {$submit.attr('disabled', false).fadeTo('slow', 1); $('#error').slideUp();}, 3000);
				},

			success: function(data) {
				$('#loading').hide();
				comm_array.push($('#comment').val());
				$('textarea').each(function() {this.value = ''});
				var t = addComment, cancel = t.I('cancel-comment-reply-link'), temp = t.I('wp-temp-form-div'), respond = t.I(t.respondId), post = t.I('comment_post_ID').value, parent = t.I('comment_parent').value;

	// comments
			if ( ! edit && $comments.length ) {
				n = parseInt($comments.text().match(/\d+/));
				$comments.text($comments.text().replace( n, n + 1 ));
			}

	// show comment
			new_htm = '" id="new_comm_' + num + '"></';
			new_htm = ( parent == '0' ) ? ('\n<ol style="clear:both;" class="commentslist' + new_htm + 'ol>') : ('\n<ul class="children new_comm' + new_htm + 'ul>');

			ok_htm = '\n<span class="postsuccess" id="success_' + num + txt3;;
			ok_htm += '</span><span></span>\n';

			$('#respond').before(new_htm);
			$('#new_comm_' + num).hide().append(data);
			$('#new_comm_' + num + ' li').append(ok_htm);
			$('#new_comm_' + num).fadeIn(1000);

			$body.animate( { scrollTop: $('#new_comm_' + num).offset().top - 200}, 900);
			countdown(); num++ ; edit = ''; $('*').remove('#edit_id');
			cancel.style.display = 'none';
			cancel.onclick = null;
			t.I('comment_parent').value = '0';
			if ( temp && respond ) {
				temp.parentNode.insertBefore(respond, temp);
				temp.parentNode.removeChild(temp)
			}
			}
		}); // end Ajax
	return false;
	}); // end submit
	/** comment-reply.dev.js */

	addComment = {
		moveForm : function(commId, parentId, respondId, postId, num) {
			var t = this, div, comm = t.I(commId), respond = t.I(respondId), cancel = t.I('cancel-comment-reply-link'), parent = t.I('comment_parent'), post = t.I('comment_post_ID');
			if ( edit ) exit_prev_edit();
			num ? (
				t.I('comment').value = comm_array[num],
				edit = t.I('new_comm_' + num).innerHTML.match(/(comment-)(\d+)/)[2],
				$new_sucs = $('#success_' + num ), $new_sucs.hide(),
				$new_comm = $('#new_comm_' + num ), $new_comm.hide(),
				$cancel.text(cancel_edit)
			) : $cancel.text(cancel_text);

			t.respondId = respondId;
			postId = postId || false;

			if ( !t.I('wp-temp-form-div') ) {
				div = document.createElement('div');
				div.id = 'wp-temp-form-div';
				div.style.display = 'none';
				respond.parentNode.insertBefore(div, respond)
			}

			!comm ? (
				temp = t.I('wp-temp-form-div'),
				t.I('comment_parent').value = '0',
				temp.parentNode.insertBefore(respond, temp),
				temp.parentNode.removeChild(temp)
			) : comm.parentNode.insertBefore(respond, comm.nextSibling);

			$body.animate( { scrollTop: $('#respond').offset().top - 180 }, 400);

			if ( post && postId ) post.value = postId;
			parent.value = parentId;
			cancel.style.display = '';

			cancel.onclick = function() {
				if ( edit ) exit_prev_edit();
				var t = addComment, temp = t.I('wp-temp-form-div'), respond = t.I(t.respondId);

				t.I('comment_parent').value = '0';
				if ( temp && respond ) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp);
				}
				this.style.display = 'none';
				this.onclick = null;
				return false;
			};

			try { t.I('comment').focus(); }
			catch(e) {}

			return false;
		},

		I : function(e) {
			return document.getElementById(e);
		}
	}; // end addComment

	function exit_prev_edit() {
			$new_comm.show(); $new_sucs.show();
			$('textarea').each(function() {this.value = ''});
			edit = '';
	}

	var wait = 15, submit_val = $submit.val();
	function countdown() {
		if ( wait > 0 ) {
			$submit.val(wait); wait--; setTimeout(countdown, 1000);
		} else {
			$submit.val(submit_val).attr('disabled', false).fadeTo('slow', 1);
			wait = 15;
	}
	}
	});
}// end ajax comment
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)
+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[
g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-
1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);
m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
/*!
 * pjax(ajax + history.pushState) for jquery
 *
 * by welefen
 */
(function($) {
	var Util = {
		support : {
			pjax : window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/),
			storage : !!window.localStorage
		},
		toInt : function(obj) {
			return parseInt(obj);
		},
		stack : {},
		getTime : function() {
			return new Date * 1;
		},
		// 获取URL不带hash的部分,切去掉pjax=true部分
		getRealUrl : function(url) {
			url = (url || '').replace(/\#.*?$/, '');
			url = url.replace('?pjax=true', '').replace('&pjax=true', '');
			return url;
		},
		// 获取url的hash部分
		getUrlHash : function(url) {
			return url.replace(/^[^\#]*(?:\#(.*?))?$/, '$1');
		},
		// 获取本地存储的key
		getLocalKey : function(src) {
			var s = 'pjax_' + encodeURIComponent(src);
			return {
				data : s + '_data',
				time : s + '_time',
				title : s + '_title'
			};
		},
		// 清除所有的cache
		removeAllCache : function() {
			if (!Util.support.storage)
				return;
			for ( var name in localStorage) {
				if ((name.split('_') || [ '' ])[0] === 'pjax') {
					delete localStorage[name];
				}
			}
		},
		// 获取cache
		getCache : function(src, time, flag) {
			var item, vkey, tkey, tval;
			time = Util.toInt(time);
			if (src in Util.stack) {
				item = Util.stack[src], ctime = Util.getTime();
				if ((item.time + time * 1000) > ctime) {
					return item;
				} else {
					delete Util.stack[src];
				}
			} else if (flag && Util.support.storage) { // 从localStorage里查询
				var l = Util.getLocalKey(src);
				vkey = l.data;
				tkey = l.time;
				item = localStorage.getItem(vkey);
				if (item) {
					tval = Util.toInt(localStorage.getItem(tkey));
					if ((tval + time * 1000) > Util.getTime()) {
						return {
							data : item,
							title : localStorage.getItem(l.title)
						};
					} else {
						localStorage.removeItem(vkey);
						localStorage.removeItem(tkey);
						localStorage.removeItem(l.title);
					}
				}
			}
			return null;
		},
		// 设置cache
		setCache : function(src, data, title, flag) {
			var time = Util.getTime(), key;
			Util.stack[src] = {
				data : data,
				title : title,
				time : time
			};
			if (flag && Util.support.storage) {
				key = Util.getLocalKey(src);
				localStorage.setItem(key.data, data);
				localStorage.setItem(key.time, time);
				localStorage.setItem(key.title, title);
			}
		},
		// 清除cache
		removeCache : function(src) {
			src = Util.getRealUrl(src || location.href);
			delete Util.stack[src];
			if (Util.support.storage) {
				var key = Util.getLocalKey(src);
				localStorage.removeItem(key.data);
				localStorage.removeItem(key.time);
				localStorage.removeItem(key.title);
			}
		}
	};
	// pjax
	var pjax = function(options) {
		options = $.extend({
			selector : '',
			container : '',
			callback : function() {},
			fitler : function() {}
		}, options);
		if (!options.container || !options.selector) {
			throw new Error('selector & container options must be set');
		}
		$('body').delegate(options.selector, 'click', function(event) {
			if (event.which > 1 || event.metaKey) {
				return true;
			}
			var $this = $(this), href = $this.attr('href');
			// 过滤
			if (typeof options.filter === 'function') {
				if (options.filter.call(this, href, this) === true){
					return true;
				}
			}
			if(href.indexOf('#respond') > 0 || href.indexOf('/wp-admin') > 0 || href.indexOf('/wp-content') > 0){
				return true;
			}
			if(href.slice(0,1)==="#"){//href直接就是个hash
				return true;
			}
			if(href.indexOf("#") > 0){//href是url+hash
				if(location.href.indexOf('#') > 0 &&//本页带锚点
					href.indexOf('#') > 0 &&//href也带锚点
					href.indexOf(location.href.slice(0,-location.hash.length)) === 0){
					return true;
				}
				if(location.href.indexOf('#') === -1 &&//本页不带锚点
					href.indexOf(location.href) === 0 &&//href包含本页地址
					location.href !== "http://"+location.host && location.href !== "http://"+location.host+"/"){//本页不是主页
						return true;
				}
			}//这是我自己写的“只是hash不同”，welefeng老师原版的看不懂……（by ttfioc）
			event.preventDefault();
			options = $.extend(true, options, {
				url : href,
				element : this
			});
			// 发起请求
			pjax.request(options);
		});
	};
	pjax.xhr = null;
	pjax.options = {};
	pjax.state = {};

	// 默认选项
	pjax.defaultOptions = {
		timeout : 25000,
		element : null,
		cache : 0, // 缓存时间, 0为不缓存, 单位为秒
		storage : false, // 是否使用localstorage将数据保存到本地
		url : '', // 链接地址
		push : true, // true is push, false is replace, null for do nothing
		show : '', // 展示的动画
		title : '', // 标题
		titleSuffix : '',// 标题后缀
		type : 'GET',
		data : {
			pjax : true
		},
		dataType : 'html',
		callback : null, // 回调函数
		// for jquery
		beforeSend : function(xhr) {
			var ajaxloading = document.createElement("div");
			var loadbar2 = $("#loadbar2");
			loadbar2.css("opacity","1");
			$body.animate({scrollTop: $('#header').offset().top}, 300);
			$("#article>*,#comments>*").animate({opacity:"0"});
			loadbar2.css({
				"transition":"width 5s ease 0s",
				"MozTransition":"width 5s ease 0s",
				"WebkitTransition":"width 5s ease 0s",
				"OTransition":"width 5s ease 0s",
				"width":"80%"
			});
			ajaxloading.id = "ajaxloading";
			ajaxloading.innerHTML = "<a href=\"\" title=\"If your speed is too slow,click here to open the link you clicked directly.\"><div></div></a>";
			document.body.appendChild(ajaxloading);
			$("#ajaxloading a").attr("href",pjax.options.url);
			$(pjax.options.container).trigger('pjax.start', [ xhr, pjax.options ]);
			xhr && xhr.setRequestHeader('X-PJAX', true);
		},
		error : function() {
			pjax.options.callback && pjax.options.callback.call(pjax.options.element, {
				type : 'error'
			});
			location.href = pjax.options.url;
		},
		complete : function(xhr) {
			$("title:first").html($("title:last").html());
			var loadbar2 = $("#loadbar2");
			$("#ajaxloading")[0].style.opacity=0;
			$("title:last,#ajaxloading").remove();
			loadbar2.css({
				"transition":"width 1s ease-in 0s",
				"MozTransition":"width 1s ease-in 0s",
				"WebkitTransition":"width 1s ease-in 0s",
				"OTransition":"width 1s ease-in 0s",
				"width":"100%"
			});
			$(pjax.options.container).trigger('pjax.end', [ xhr, pjax.options ]);
			$("#article>*,#comments>*").animate({opacity:"1"},"slow");
			ajaxcomment();//再调用一次不然没法ajax提交
			sthaboutcomment();//这个也是再调用一次
			yetAnotherImgSlide();
			setTimeout('$("#loadbar2").css("opacity","0");',1000);
			setTimeout('$("#loadbar2").css("width","0");',1100);
			if(location.href.indexOf('#')!=-1){
				location.href = location.href;
			}
		}
	};
	// 展现动画
	pjax.showFx = {
		"_default" : function(data, callback, isCached) {
			this.html(data);
			callback && callback.call(this, data, isCached);
		},
		transparents : function(data,callback,isCached){
			$("#article>*,#comments>*").css("opacity","0");
			this.html(data);
		}
	}
	// 展现函数
	pjax.showFn = function(showType, container, data, fn, isCached) {
		var fx = null;
		if (typeof showType === 'function') {
			fx = showType;
		} else {
			if (!(showType in pjax.showFx)) {
				showType = "_default";
			}
			fx = pjax.showFx[showType];
		}
		fx && fx.call(container, data, function() {
			var hash = location.hash;
			if (hash != '') {
				location.href = hash;
				//for FF
				if(/Firefox/.test(navigator.userAget)){
					history.replaceState($.extend({}, pjax.state, {
						url : null
					}), document.title);
				}
			} else {
				window.scrollTo(0, 0);
			}
			fn && fn.call(this, data, isCached);
		}, isCached);
	}
	// success callback
	pjax.success = function(data, isCached) {
		// isCached default is success
		if (isCached !== true) {
			isCached = false;
		}
		if ((data || '').indexOf('<html') != -1) {
			pjax.options.callback && pjax.options.callback.call(pjax.options.element, {
				type : 'error'
			});
			location.href = pjax.options.url;
			return false;
		}
		var title = pjax.options.title, el;
		pjax.state = {
			container : pjax.options.container,
			timeout : pjax.options.timeout,
			cache : pjax.options.cache,
			storage : pjax.options.storage,
			show : pjax.options.show,
			title : title,
			url : pjax.options.oldUrl
		};
		var query = $.param(pjax.options.data);
		if (query != "") {
			pjax.state.url = pjax.options.url + (/\?/.test(pjax.options.url) ? "&" : "?") + query;
		}
		if (pjax.options.push) {
			if (!pjax.active) {
				history.replaceState($.extend({}, pjax.state, {
					url : null
				}), document.title);
				pjax.active = true;
			}
			history.pushState(pjax.state, document.title, pjax.options.oldUrl);
		} else if (pjax.options.push === false) {
			history.replaceState(pjax.state, document.title, pjax.options.oldUrl);
		}
		pjax.options.showFn && pjax.options.showFn(data, function() {
			pjax.options.callback && pjax.options.callback.call(pjax.options.element,{
				type : isCached? 'cache' : 'success'
			});
		}, isCached);
		// 设置cache
		if (pjax.options.cache && !isCached) {
			Util.setCache(pjax.options.url, data, title, pjax.options.storage);
		}
	};

	// 发送请求
	pjax.request = function(options) {
		options = $.extend(true, pjax.defaultOptions, options);
		var cache, container = $(options.container);
		options.oldUrl = options.url;
		options.url = Util.getRealUrl(options.url);
		if($(options.element).length){
			cache = Util.toInt($(options.element).attr('data-pjax-cache'));
			if (cache) {
				options.cache = cache;
			}
		}
		if (options.cache === true) {
			options.cache = 0;
		}
		options.cache = Util.toInt(options.cache);
		// 如果将缓存时间设为0，则将之前的缓存也清除
		if (options.cache === 0) {
			Util.removeAllCache();
			Util.removeCache();
		}
		// 展现函数
		if (!options.showFn) {
			options.showFn = function(data, fn, isCached) {
				pjax.showFn(options.show, container, data, fn, isCached);
			};
		}
		pjax.options = options;
		pjax.options.success = pjax.success;
		if (options.cache && (cache = Util.getCache(options.url, options.cache, options.storage))) {
			options.beforeSend();
			options.title = cache.title;
			pjax.success(cache.data, true);
			options.complete();
			return true;
		}
		if (pjax.xhr && pjax.xhr.readyState < 4) {
			pjax.xhr.onreadystatechange = $.noop;
			pjax.xhr.abort();
		}
		pjax.xhr = $.ajax(pjax.options);
	};

	// popstate event
	var popped = ('state' in window.history), initialURL = location.href;
	$(window).bind('popstate', function(event) {
		var initialPop = !popped && location.href == initialURL;
		popped = true;
		if (initialPop) return;
		var state = event.state;
		if (state && state.container) {
			if ($(state.container).length) {
				var data = {
					url : state.url || location.href,
					container : state.container,
					push : null,
					timeout : state.timeout,
					cache : state.cache,
					storage : state.storage
				};
				pjax.request(data);
			} else {
				window.location = location.href;
			}
		}
	});

	// not support
	if (!Util.support.pjax) {
		pjax = function() {
			return true;
		};
		pjax.request = function(options) {
			if (options && options.url) {
				location.href = options.url;
			}
		};
	}
	// pjax bind to $
	$.pjax = pjax;
	$.pjax.util = Util;

	// extra
	if ($.inArray('state', $.event.props) < 0) {
		$.event.props.push('state')
	}

})(jQuery);
$(function(){
	$.pjax({
	selector: "a[href^='http://" + location.hostname +"']",
	container: '#content', //内容替换的容器
	show: 'transparents', //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
	cache: false, //是否使用缓存
	storage: false, //是否使用本地存储
	titleSuffix: '', //标题后缀
	fitler: function(href){},
	callback: function(){}
	})
})
//////////pjax end/////////////////
///////股沟统计///////
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23063336-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
/////////////sthaboutcomment///////
//自动获取gravatar头像和评论草稿和ctrl enter放一块了…提交信息检测功能在comment ajax部分
var sthaboutcomment = function(){
	if($("#comment").length){
		$("#comment")[0].onkeyup = function(event){
			if(event.ctrlKey==1){
				if(event.keyCode==13){
					document.getElementById('submit').click();
				}
			}
			if(event.altKey==1){
				if(event.keyCode==83){
					document.getElementById('submit').click();
				}
			}
		}
		if($("#email").length){
			var loadavatar = function(){
				$("#ajaxgravatar").html('<img alt="Gravatar" src="'+ "http://0.gravatar.com/avatar/" + hex_md5($.trim($("#email").val()).toLowerCase()) +'?s=45"/>')
			}
			loadavatar();
			$("#email")[0].onblur = loadavatar;
			if(localStorage){
				var postid = $(".post")[0].id.substring(5);
				var draftid = "draft" + postid;
				if(localStorage[draftid] == null){
					localStorage[draftid] = $("#comment")[0].value;
				}
				else{
					$("#comment")[0].value = localStorage[draftid];
				};
				$("#comment")[0].onchange = function(){localStorage[draftid] = this.value;}
				$(window).unload(function(){
					if(localStorage[draftid] === ""){
						localStorage.removeItem(draftid);
					}
				});
			}
		}
	}
};sthaboutcomment();
/////sthaboutcomment end/////
////////yetanotherimgslide(by ttfioc)//////
var yetAnotherImgSlide = function(){
	var links = document.getElementsByTagName("a");
	var imglinks = [];
	for(var i=0;i<links.length;i++){
		var tn = links[i].firstChild.tagName;
		if((links[i].className.indexOf("noslide") === -1 &&
			links[i].target !== "_blank")&&
			(links[i].href.slice(-3)==="jpg" ||
			links[i].href.slice(-3)==="png" ||
			links[i].className==="slideimg")){
			imglinks.push(links[i])
		}
	}
	for(var j=0;j<imglinks.length;j++){
		imglinks[j].style.cursor = 'url("http://static.tieba.baidu.com/tb/img/frs/cur_zin.cur"), pointer'
		imglinks[j].onclick = function(){
			return false;
		};
		imglinks[j].addEventListener("click",function(event){
			if(event.button === 0){
				var slide = document.createElement("div");
				var closeslide = document.createElement("div");
				var slidecontainer = document.createElement("div");
				var slideimg = document.createElement("img");
				var x,y,mstartx,mstarty;
				//和pjaxloading是一个
				var imgloading = document.createElement("div");
				imgloading.id = "imgloading";
				imgloading.innerHTML = "<a href=\"\" title=\"If your speed is too slow,click here to open the link you clicked directly.\"><div></div></a>";
				//loading end
				slide.id = "slide";
				closeslide.id = "closeslide";
				slidecontainer.id = "slidecontainer";
				slideimg.id = "slideimg";
				slideimg.src = this.href;
				slidecontainer.appendChild(slideimg);
				slidecontainer.appendChild(closeslide);
				slide.appendChild(slidecontainer);
				document.body.appendChild(slide);
				document.body.appendChild(imgloading);
				//又来了
				$("#imgloading a").attr("href",this.href);
				//没了
				document.getElementById("slideimg").onload = function(){
					setTimeout(function(){
						document.getElementById('slideimg').style.opacity = 1
					},400);
					setTimeout(function(){
						$("#imgloading").remove();
					},300);
				}
				closeslide.onclick=function(){
					slide.style.opacity = "0";
					setTimeout(function(){
						document.body.removeChild(document.getElementById('slide'));
					},300);
					if(document.getElementById('imgloading')){
						document.getElementById('imgloading').style.opacity = "0";
						setTimeout(function(){
							document.body.removeChild(document.getElementById('imgloading'));
						},300);						
					}
				}
				document.onkeyup=function(event){
					if(document.getElementById('slide') && event.keyCode===27){
						slide.style.opacity = "0";
						setTimeout("document.body.removeChild(document.getElementById('slide'))",300)
					}
				}
				slideimg.onmousedown = function(event){
					if(event.button === 0){
						x = this.offsetLeft;
						y = this.offsetTop;
						mstartx = event.clientX;
						mstarty = event.clientY;
						this.className = "dragging";
						this.style.position = "fixed";
						this.style.top = y+1 + "px";
						this.style.left = x+1 + "px";
						document.body.onmousemove = function(event){
							if(slideimg.className === "dragging"){
								slideimg.style.top = y + event.clientY - mstarty + "px";
								slideimg.style.left = x + event.clientX - mstartx + "px";
							}
							slideimg.onmouseup = function(event){
								this.className = "";
								this.style.top = y + event.clientY - mstarty -1+ "px";
								this.style.left = x + event.clientX - mstartx -1+ "px";
								return false;
							}
							return false;
						}
						return false;
					}
				}
			}
		}
		)
	}
};yetAnotherImgSlide();
//endimgslide//
//////////////jsplayer by ttfioc///////////////////////
if(getComputedStyle(leftaside).display !== 'none'){
	(function(){//生成播放列表+播放
		var alllist = [
			{
			title:"FAIR SKIES",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1117",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1135"
			},
			{
			title:"M38+39",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1118",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1131"
			},
			{
			title:"Voice Of Light (Feat. Aika Sekiyama)",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1129",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1130"
			},
			{
			title:"ハナミズキ",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1120",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1132"
			},
			{
			title:"愛してる",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1121",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1133"
			},
			{
			title:"理(ことわり)",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1119",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1134"
			},
			{
			title:"忘れられし幻夢の狭間",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1122",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1136"
			},
			{
			title:"夏影",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1124",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1138"
			},
			{
			title:"一人にしないで",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1125",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1140"
			},
			{
			title:"桜色舞うころ",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1126",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1141"
			},
			{
			title:"仄かに煌く光",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1128",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1139"
			},
			{
			title:"渚",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1127",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1142"
			},
			{
			title:"始まりのヒト",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1144",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1146"
			},
			{
			title:"Release My Soul",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1145",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1147"
			},
			{
			title:"Always Together",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1323",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1312"
			},
			{
			title:"D.A.Y.BREAK",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1324",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1313"
			},
			{
			title:"my long forgotten cloistered sleep",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1325",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1316"
			},
			{
			title:"Will",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1322",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1314"
			},
			{
			title:"アンインストール",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1319",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1310"
			},
			{
			title:"キミガタメ",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1321",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1315"
			},
			{
			title:"キミにカエル。",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1320",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1311"
			},
			{
			title:"まどろみの約束",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1318",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1309"
			},
			{
			title:"Endless Story",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1333",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1340"
			},
			{
			title:"Stay Gold",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1330",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1341"
			},
			{
			title:"βios",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1326",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1335"
			},
			{
			title:"リクの思い出",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1332",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1334"
			},
			{
			title:"ロスト・バタフライ",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1328",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1336"
			},
			{
			title:"涟漪",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1329",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1338"
			},
			{
			title:"星降る森",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1327",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1337"
			},
			{
			title:"雪の華",
			mp3:"http://storage.live.com/items/48BC8CF9CA8EF426!1331",
			ogg:"http://storage.live.com/items/48BC8CF9CA8EF426!1339"
			}
		]
		var list = [];
		for(var i=0;i<6;i++){
			var x=Math.floor(Math.random()*alllist.length);
			list.push(alllist[x]);
			alllist = alllist.slice(0,x).concat(alllist.slice(x+1,alllist.length));
		}
		var jsplayer = document.getElementById("jsplayer");
		var jsplayersound = document.getElementById("jsplayersound");
		var jsplayersoundnxt = document.getElementById("jsplayersoundnxt");
		var jsplay = document.getElementById("jsplay");
		var jspause = document.getElementById("jspause");
		var jsstop = document.getElementById("jsstop");
		var checkbrowser = function(){//检查浏览器支持播放什么格式的
			if(jsplayersound.canPlayType("audio/mpeg")){return "mp3";}
			else if(jsplayersound.canPlayType("audio/ogg")){return "ogg";}
			else{return false;}
		}
		var ended = function(){//循环播放
			var p = parseInt(jsplayersound.className)
			if(p === (list.length - 1)){
				this.src = list[0][checkbrowser()];
				this.className = "0thsong";
				jsplayer.childNodes[0].className = "jsplaying";
			}
			else{
				this.src = list[p + 1][checkbrowser()];
				this.className = (p + 1) + "thsong"
				jsplayer.childNodes[p + 1].className = "jsplaying";
			}
			jsplayer.childNodes[p].className = "";
			this.play();
		}
		var durationchange = function(){
			setInterval(function(){
				var jsprogress2 = document.getElementById('jsprogress2');
				var jsplayersound = document.getElementById('jsplayersound');
				var width = jsplayersound.currentTime/jsplayersound.duration;
				jsprogress2.style.width = (width * 100) + '%';
			},100)
		}
		var addtolist = function(){
			for(var i = 0;i < list.length;i++){//把曲目加入播放列表
				var songli = document.createElement("li");
				var songhref = document.createElement("a");
				songhref.href = list[i][checkbrowser()];
				songhref.innerHTML = list[i].title;
				jsplayer.appendChild(songli);
				jsplayer.lastChild.appendChild(songhref);
				jsplayer.getElementsByTagName("a")[i].onclick = function(){//点击播放
					var that = this;
					var countarr = function(){
						for(j=0;j<jsplayer.getElementsByTagName("a").length;j++){
							if(that === jsplayer.getElementsByTagName("a")[j])
							return j;
						}
					}
					jsplayersound.className = countarr()+"thsong";
					for(var h = 0;h < jsplayer.childNodes.length;h++){
						jsplayer.childNodes[h].className = "";
					}
					jsplayer.childNodes[countarr()].className = "jsplaying";
					jsplay.style.display = "none";
					jspause.style.display = "block";
					if(jsplayersound.currentTime !== 0){
						jsplayersoundnxt.src = that.href;
						for(var i=0;i<10;i++){
							setTimeout(function(){
								jsplayersound.volume-=.1;
							},250*i)
						}
						setTimeout(function(){
							jsplayersound.src = that.href;
							jsplayersound.volume = 1;
							jsplayersound.play();
						},2500)
					}
					else{
						jsplayersound.src = that.href;
						jsplayersound.volume = 1;
						jsplayersound.play();
					}
					return false;
				}
			}
			jsplayer.childNodes[0].className = "jsplaying";
			jsplayersound.className = "0thsong";
			jsplayersound.src = jsplayer.getElementsByTagName("a")[0].href;
			jsplayersound.volume = 1;
		}
		var jsplayit = function(){//播放
			jsplayersound.play();
			if(jsplayersound.volume < 1){
				for(var i=0;i<10;i++){
					setTimeout(function(){
						jsplayersound.volume+=.1;
					},150*i)
				}
			}
			this.style.display = "none";
			jspause.style.display = "block";
		}
		var jspauseit = function(){//暂停
			for(var i=0;i<10;i++){
				setTimeout(function(){
					jsplayersound.volume-=.1;
				},150*i)
			}
			setTimeout(function(){
				jsplayersound.pause();
			},1500)
			this.style.display = "none";
			jsplay.style.display = "block";
		}
		var jsstopit = function(){//停止（jsplaying和jsplayersound的class、src都归零）
			for(var i=0;i<10;i++){
				setTimeout(function(){
					jsplayersound.volume-=.1;
				},150*i)
			}
			jspause.style.display = "none";
			jsplay.style.display = "block";
			for(i in jsplayer.childNodes){jsplayer.childNodes[i].className = "";}
			jsplayer.childNodes[0].className = "jsplaying";
			jsplayersound.className = "0thsong";		
			setTimeout(function(){
				jsplayersound.src = "";
				jsplayersound.src = jsplayer.getElementsByTagName("a")[0].href;
				jsplayersound.volume = 1;
			},1500)
		}
		addtolist();
		jsplayer.parentNode.appendChild(jsplayersound);
		jsplay.onclick = jsplayit;
		jspause.onclick = jspauseit;
		jsstop.onclick = jsstopit;
		jsplayersoundnxt.src = list[0][checkbrowser()];
		jsplayersound.addEventListener("ended", ended);
		jsplayersound.addEventListener("durationchange", durationchange);
		jsplayersound.onreadystatechange = function(){
			if(jsplayersound.readyState === 4){
				var p = parseInt(jsplayersound.className)
				if(p === (list.length - 1)){
					jsplayersoundnxt.src = list[0][checkbrowser()];
				}
				else{
					jsplayersoundnxt.src = list[p + 1][checkbrowser()];
				}
				nxt = clearInterval(nxt)
			}
		}
		//make some other style by jquery to fit the theme
		var jsheight = $("#jsplayer").height();
		$("#jsplayer").css("marginTop",-20-jsheight/2+"px");
		$("#navup")[0].onclick = function(){$body.animate({scrollTop: $('#header').offset().top},300);};
		$("#navdown")[0].onclick = function(){$body.animate({scrollTop: $('#footer').offset().top},300);};
	})();//jsplayer end
}
////////onload///////
$("#article").ready(function(){
	$("#loadbar2").css({
		"transition":"width 2s ease-out 0s,opacity .1s linear 0s",
		"MozTransition":"width 2s ease-out 0s,opacity .1s linear 0s",
		"WebkitTransition":"width 2s ease-out 0s,opacity .1s linear 0s",
		"OTransition":"width 2s ease-out 0s,opacity .1s linear 0s",
		"width":"50%"
	});
})
$(document).ready(function($){
	$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
	$("#loadbar2").animate({width:"75%"});//loadbar变长
	ajaxcomment();
});
window.onload = function(){
	$("#loadbar2").css({
		"transition":"width .5s ease 0s",
		"MozTransition":"width .5s ease 0s",
		"WebkitTransition":"width .5s ease 0s",
		"OTransition":"width .5s ease 0s",
		"width":"100%"
	});
	$("#loadbar2").animate({width:"100%"});
	setTimeout('$("#loadbar2").css("opacity","0");',1000);
	setTimeout('$("#loadbar2").css("width","0");',1100);
}