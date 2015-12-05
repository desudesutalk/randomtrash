// ==UserScript==
// @name         SynchImgRepost
// @namespace    udp://SynchTripWars/*
// @version      0.0.1
// @description  post something useful
// @include      *://*syn-ch.com/*
// @include      *://*syn-ch.org/*
// @include      *://*syn-ch.ru/*
// @include      *://*syn-ch.com.ua/*
// @updateURL    https://github.com/desudesutalk/randomtrash/raw/master/sir/sir.user.js
// @copyright    2015+, me
// @run-at       document-end
// ==/UserScript==

$(window).ready(function() {
	var multiFiles, selectedFile, multiPos = 0, curFileLoaded, curFileData;

	if (settings.ajax) {

		$(window).off('quick-reply');

		function fileCatcher(evt, b) {
			selectedFile = evt.target.files[0];
		}

		function shuffle(inAarray) {
		    var counter = inAarray.length,
		        temp, index, array = [], i;

		    for (i = 0; i < inAarray.length; i++) {
		    	array.push(inAarray[i]);
		    };

		    // While there are elements in the array
		    while (counter > 0) {
		        // Pick a random index
		        index = Math.floor(Math.random() * counter);

		        // Decrease counter by 1
		        counter--;

		        // And swap the last element with it
		        temp = array[counter];
		        array[counter] = array[index];
		        array[index] = temp;
		    }

		    return array;
		}

		function fileMultiCatcher(evt, b) {
			multiFiles = shuffle(evt.target.files);
			multiPos = 0;
			if(multiFiles.length === 0){
				$('#saAvaPview').empty();
				curFileLoaded = null;
				curFileData = null;
			}else{
				loadNextImg();
			}
			console.log(multiFiles);
		}
		$('body').append('<input id="saMultiFile" type="file" style="display: none;" multiple />');
		$('input#saMultiFile').off('change').on('change', fileMultiCatcher);

		function loadNextImg(){
			if(multiFiles.length === 0) return false;

			var fReader = new FileReader();
			fReader.onload = function(fE) {
				curFileLoaded = new Uint8Array(fE.target.result);

				var blob = new Blob([curFileLoaded], {type: 'application/octet-binary'});
				var url = URL.createObjectURL(blob);
				$('#saAvaPview').empty().append('<img src="'+url+'" style="max-width: 150px; max-height: 150px">');

			};
			fReader.readAsArrayBuffer(multiFiles[multiPos]);
			curFileData = multiFiles[multiPos];
			multiPos++;
			if(multiPos >= multiFiles.length){
				multiPos = 0;
				multiFiles = shuffle(multiFiles);
			}
		}


		function dataURLtoBlob(dataURL, dataType) {
			var binary = atob(dataURL.split(',')[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], {
				type: dataType
			});
		}

		function imageFromText(text) {
			var n = text.split(" "),
				example = document.createElement('canvas'),
				ctx = example.getContext('2d'),
				i, x, y, gradient1;

			function rnd(max) {
				return Math.round(max * Math.random());
			}

			function rndrgb() {
				return "rgb(" + rnd(256) + "," + rnd(256) + "," + rnd(256) + ")";
			}

			example.width = 512;
			example.height = 512;
			ctx.fillStyle = rndrgb();
			ctx.fillRect(0, 0, example.width, example.height);

			for (i = 0; i <= 5 + rnd(10); i++) {
				gradient1 = ctx.createLinearGradient(0, rnd(512), 512, rnd(512));
				for (j = 0; j <= 1 + rnd(5); j++) {
					gradient1.addColorStop(Math.random(), rndrgb());
				}
				ctx.fillStyle = gradient1;
				ctx.fillRect(rnd(512) - 50, rnd(512) - 50, rnd(512), rnd(512));
			}

			ctx.font = 'italic 30px sans-serif';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.font = 'bold 30px sans-serif';

			for (i in n) {
				x = rnd(512 - 64) + 32;
				y = rnd(512 - 64) + 32;
				ctx.fillStyle = rndrgb();
				ctx.strokeStyle = rndrgb();
				ctx.fillText(n[i], x, y);
				ctx.strokeText(n[i], x, y);
			}

			return dataURLtoBlob(example.toDataURL("image/jpeg", Math.random()), 'image/jpeg');
		}



		var do_not_ajax = false;
		var postctrl = $('form[name=postcontrols]');

		function receive(data) {
			var lastPost = postctrl.find('.post').last(),
				lastID = lastPost.attr('id').replace(/reply_/, '');
			lastID = Number(lastID);
			var posts = $(data).find('.post.reply').filter(function(index, elem) {
				var id = Number($(elem).attr('id').replace(/reply_/, ''));
				return (id > lastID)
			}).each(function(index, element) {
				$(element).after('<br class="clear">');
			});
			if (settings.useAnimateCSS) {
				posts.addClass('animated fadeIn');
			}
			$(document).trigger('new_post', [posts]);
			lastPost.after(posts);
		}
		var setup_form = function($form) {

			$form.off('submit');

			$form.submit(function() {
				if (settings.growlEnabled) {
					messageGrowl = $.growl({
						message: _('Отправка...')
					}, {
						delay: 0
					});
				}
				if (do_not_ajax)
					return true;
				var form = $(this);
				var submitBtn = form.find('input[type="submit"]');
				var submit_txt = submitBtn.val();
				if (window.FormData === undefined)
					return true;
				var formData = new FormData(this);
				formData.append('json_response', '1');
				formData.append('post', submit_txt);
				var updateProgress = function(e) {
					var percentage;
					if (e.position === undefined) {
						percentage = Math.round(e.loaded * 100 / e.total);
					} else {
						percentage = Math.round(e.position * 100 / e.total);
					}
					if (settings.growlEnabled)
						messageGrowl.update('message', _('Posting... (#%)').replace('#', percentage));
					else
						$(form).find('input[type="submit"]').val(_('Posting... (#%)').replace('#', percentage));
				};
				var that = this;

				function _sendAjax() {
					$.ajax({
						url: that.action,
						type: 'POST',
						xhr: function() {
							var xhr = $.ajaxSettings.xhr();
							if (xhr.upload) {
								xhr.upload.addEventListener('progress', updateProgress, false);
							}
							return xhr;
						},
						success: function(post_response) {
							if (typeof Recaptcha != 'undefined') {
								Recaptcha.reload();
							}
							if ($('#captchaimg')) {
								$('#captchaimg').click();
							}
							if (typeof grecaptcha === "object") {
								grecaptcha.reset();
							}
							if (post_response.error) {
								if (post_response.banned) {
									if (settings.growlEnabled) {
										messageGrowl.update('message', post_response.banned);
									}
									do_not_ajax = true;
									submitBtn.each(function() {
										var $replacement = $('<input type="hidden">');
										$replacement.attr('name', $(that).attr('name'));
										$replacement.val(submit_txt);
										$(that).after($replacement).replaceWith($('<input type="button">').val(submit_txt));
									});
									form.submit();
								} else {
									if (settings.growlEnabled)
										messageGrowl.update('message', post_response.error);
									else
										alert(post_response.error);
									submitBtn.val(submit_txt);
									submitBtn.removeAttr('disabled');
								}
							} else if (post_response.redirect && post_response.id) {
								if (!$(form).find('input[name="thread"]').length) {
									document.location = post_response.redirect;
									stats.threads.created++;
									saveAndUpdateStats();
								} else {
									$.ajax({
										url: document.location,
										cache: false,
										contentType: false,
										processData: false
									}, 'html').done(receive).done(function() {
										stats.posts.sent++;
										saveAndUpdateStats();
										highlightReply(post_response.id);
										window.location.hash = post_response.id;
										$(window).scrollTop($('#reply_' + post_response.id).offset().top);
									}).always(function() {
										if (settings.growlEnabled)
											messageGrowl.close();
										$(form).find('input[type="submit"]').val(submit_txt);
										$(form).find('input[type="submit"]').removeAttr('disabled');
										$(form).find('input[name="subject"],input[name="file_url"], textarea[name="body"],input[type="file"],input[name="embed"]').val('').change();
										selectedFile = null;
										loadNextImg();
									})
								}
								submitBtn.val(_('Posted...'));
							} else {
								if (settings.growlEnabled)
									messageGrowl.update('message', _('An unknown error occured when posting!'));
								else
									alert(_('An unknown error occured when posting!'));
								submitBtn.val(submit_txt);
								submitBtn.removeAttr('disabled');
							}
						},
						error: function() {
							do_not_ajax = true;
							submitBtn.each(function() {
								var $replacement = $('<input type="hidden">');
								$replacement.attr('name', $(that).attr('name'));
								$replacement.val(submit_txt);
								$(that).after($replacement).replaceWith($('<input type="button">').val(submit_txt));
							});
							$(form).submit();
						},
						data: formData,
						cache: false,
						contentType: false,
						processData: false
					}, 'json');
				}

				if (!selectedFile) {
					if(curFileLoaded){
						var i, tail = new Uint8Array(8), fileData, ext;
						for (i = 0; i < tail.length; i++) tail[i] = Math.floor(Math.random() * 255);

						fileData = [curFileLoaded, tail];

						formData.append("file", new Blob(fileData, {type: curFileData.type}),curFileData.name);
					}else if ($('#txtimagify').attr('checked')) {
						formData.append("file", imageFromText($form.find('textarea#body').val()), 'TEXT.JPEG');
					}
					_sendAjax();
				} else {
					var fReader = new FileReader();
					fReader.onload = function(fE) {
						var i, tail = new Uint8Array(8), fileData, ext;
						for (i = 0; i < tail.length; i++) tail[i] = Math.floor(Math.random() * 255);

						fileData = [new Uint8Array(fE.target.result)];

						ext = selectedFile.name.match(/\.([a-z]+)$/i);
						if(ext && ['jpeg', 'jpg', 'gif', 'png', 'webm', 'mp3'].indexOf(ext[1].toLowerCase()) != -1){
							fileData.push(tail);
						}

						formData.append("file", new Blob(fileData, {type: selectedFile.type}),selectedFile.name);

						_sendAjax();
					};
					fReader.readAsArrayBuffer(selectedFile);
				}

				submitBtn.val(_('Posting...'));
				submitBtn.attr('disabled', true);
				return false;
			});

			$form.find('input[type=file]').off('change').on('change', fileCatcher);
			$form.find('input[name="subject"]').after('<label><input type="checkbox" id="txtimagify">txt2img</label>');
			$form.find('input[type=file]').parent().append('<hr/><i class="fa fa-folder-open-o" id="saOpenAvas"></i>&nbsp;<span id="saAvaPview"></span>');

			$form.find('#saOpenAvas').on('click', function(){$('input#saMultiFile').click();});
			$form.find('#saAvaPview').on('click', loadNextImg);
		};
		setup_form($('form[name="post"]'));
		$(window).on('quick-reply', function() {
			setup_form($('form#quick-reply'));
		});
	}
});
