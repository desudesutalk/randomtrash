function odometer() {
	var posts = document.querySelectorAll('form div.post.reply:not(.de-pview)'),
		i, lastPost, lastTime, qhPost, qhTime, qhNum = 0;

	if (posts.length > 1) {
		lastPost = parseInt(posts[posts.length - 1].id.replace('reply_', ''));
		lastTime = (new Date()).getTime();

		for (i = posts.length - 1; i >= 0; i--) {
			qhPost = parseInt(posts[i].id.replace('reply_', ''));
			qhTime = (new Date(posts[i].querySelector('time').getAttributeNode("datetime").value)).getTime();
			qhNum++;
			if (lastTime - qhTime >= 15 * 60 * 1000) break;
		}
		var secToBL = Math.floor((500 - posts.length) * ((lastTime - qhTime) / qhNum) / 1000),
			timeToBL = '',
			s = secToBL,
			d, h, m = 1;

		if (secToBL > 24 * 60 * 60) {
			d = Math.floor(s / 86400);
			s -= d * 86400;
			timeToBL = d + 'd ';
		}
		if (secToBL > 60 * 60) {
			h = Math.floor(s / 3600);
			s -= h * 3600;
			timeToBL += h + 'h ';
		}
		if (secToBL > 60) {
			m = Math.floor(s / 60);
			s -= m * 60;
		}
		timeToBL += m + 'm';

		if (secToBL <= 0) {
			timeToBL = 'NOW!';
		}		

		return {
			speed: Math.floor(qhNum / (lastTime - qhTime) * 1000 * 60 * 60),
			percent: Math.floor(qhNum / (1 + lastPost - qhPost) * 100),
			secondsToBL: secToBL,
			timeToBL: timeToBL
		};
	}

	return {
		speed: 0,
		percent: 0,
		secondsToBL: "?",
		timeToBL: "?"
	};
}

function updateOdometer(){
	var spd = odometer();
	$('#odometer').empty();
	if(spd.timeToBL == 'NOW!'){
		$('#odometer').append('<strong style="color: red;">Speed: ' + spd.speed + 'pph (' + spd.percent + '%) AUTOSAGE!!!</strong>');
	}else{
		$('#odometer').append('<span>Speed: ' + spd.speed + 'pph (' + spd.percent + '%) Autosage in: ' + spd.timeToBL+'</span>');
	}
	
}
