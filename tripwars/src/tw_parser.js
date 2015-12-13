var tgStats = {},
	tgPostHits = {},
	rikaNipah = '!NipaJ2fn2k';

function killTrip(trip){
	if(tgStats[trip].energy > 0) return true;
	tgStats[trip].energy = 0;
	tgStats[trip].shkvarki = {};
	tgStats[trip].title = null;
	tgStats[trip].ava = null;
	
	if(trip == rikaNipah){
		tgStats[trip].rikaWiped = true;
	}
}

var imRegEx = /thumb(\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$)/i,
    zipRegEx = /\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.zip$/i;

function parsePostResults(p, isOp){
	var file = p.querySelector('.file-info a'),
		trip = p.querySelector('.intro span.trip'),
		refs = p.querySelectorAll('div.body a[onclick^=highlightReply]'),
		name = p.querySelector('.intro span.name'),
		spoils = p.querySelectorAll('div.body span.spoiler'),
		img = p.querySelector('img.post-image'), imgSrc, imgW, imgH,
		pid = p.id.replace('reply_', ''),
		hits = [], rnd, i, j, r, m, t, atck, tCost, e;

	p.classList.add('twParsed');

	if(file && file.href.match(zipRegEx)){
		if(!p.querySelector('.twStatsLoader')){
			$(p).find('div.body').before('<div class="twStatsLoader btn btn-primary"><i class="fa fa-upload"></i> Загрузить файл статсов</div>');
		}
	}

	if(!trip){
		p.classList.add('tw-isanonym');
		return null;
	}
	trip = trip.textContent.substring(0,12);
	name = name.textContent;

/*	if(!p.querySelector('.twTripCommand')){
		$(p).find('.intro .delete').after('<button class="twTripCommand"><i class="fa fa-tachometer"></i></button>');
	}*/

	if(!tgPostHits[pid]){
		tgPostHits[pid] = {from: trip, hits:{}};
	}else{
		return false;
	}

	p.classList.add('tw-' + bytesToHex(strToUTF8Arr(trip)));

	if(img){
		m = img.src.match(imRegEx);
		if(m){
			imgSrc = m[1];
			imgW = parseInt(img.style.width.replace('px',''));
			imgH = parseInt(img.style.height.replace('px',''));
		}		
	}

	if(file) {
		m = file.textContent.match(/\d+\-([0-9a-f]+)\./);
		rnd = parseInt(m[1], 16);
	}

	if(!tgStats[trip]){
		tgStats[trip] = {name: name, trip: trip, energy: 1, shkvarki: {}, title: null};
	}else{
		if(tgStats[trip].raped != curThread){
			e = isOp? 250 : 0;
			m = pid.match(/(\d)\1+$/);

			if(m){
				e += Math.pow(10, m[0].length - 1);
			}else{
				e++;
			}
			tgStats[trip].energy += e;
		}
		tgStats[trip].name = name;
	}

	tgStats[trip].lastThread = curThread;
	
	for (i = 0; i < spoils.length; i++) {
		m = spoils[i].textContent.match(/^([a-z0-9])(:([a-z0-9а-я\-\s]{0,30}))?:(!{1,2}.+)$/i);
		if(!m) continue;
		if(m[4] == trip) break;

		if(file && m[1].toUpperCase() == 'A' && tgStats[trip].energy > 5 && tgStats[m[4]]){
			atck = Math.round(((rnd & 255) / 255) * 55 - 5);
			tgStats[trip].energy -= 5;
			if(atck < 0){
				tgStats[trip].energy += atck;
				killTrip(trip);
			}else{
				tgStats[m[4]].energy -= atck;
				killTrip(m[4]);
			}
		}

		if(file && m[1].toUpperCase() == 'R' && tgStats[trip].energy > 100 && tgStats[m[4]]){
			if(tgStats[trip].energy <= tgStats[m[4]].energy) continue;
			
			atck = (rnd & 255) / 255;
			if(atck < 0.5){
				t = tgStats[trip].energy;
				tgStats[trip].energy = tgStats[m[4]].energy;
				tgStats[m[4]].energy = t;
				tgStats[trip].energy -= 100;
				killTrip(trip);
				break;
			}

			tgStats[m[4]].raped = curThread;
			tgStats[trip].energy -= 100;
		}
		
		if(m[1].toUpperCase() == 'S' && tgStats[trip].energy > 250 && tgStats[m[4]] && !tgStats[m[4]].shkvarki[trip]){
			tgStats[trip].energy -= 5;
			tgStats[m[4]].shkvarki[trip] = true;
		}

		if(m[1].toUpperCase() == 'T' && tgStats[trip].energy > 250 && m[3] && tgStats[m[4]]){
			tCost = 10;
			if(tgStats[m[4]].title){
				tCost = tgStats[m[4]].title.cost * 2;
			}
			if(tgStats[trip].energy <= tCost) break;

			tgStats[m[4]].title ={
				from: trip,
				cost: tCost,
				title: m[3]
			};

			tgStats[trip].energy -= tCost;
		}

		if(m[1].toUpperCase() == 'F' && tgStats[trip].energy >= 250 && tgStats[m[4]]){
			tgStats[trip].energy -= 30;
			tgStats[m[4]].energy += 25;
		}

		if(m[1].toUpperCase() == 'O' && tgStats[trip].energy > 50 && tgStats[m[4]]){
			t = Object.keys(tgStats[m[4]].shkvarki);
			if(t.length > 0){
				tgStats[trip].energy -= 50;
				r = t.pop();
				tgStats[trip].shkvarki[t] = true;
				tgStats[m[4]].shkvarki[t] = undefined;
				delete tgStats[m[4]].shkvarki[t];
			}
		}

		if(imgSrc && m[1].toUpperCase() == 'I' && tgStats[trip].energy > 250 && tgStats[m[4]]){
			tgStats[trip].energy -= 250;
			tgStats[m[4]].ava = {
				from: trip,
				src: imgSrc,
				width: imgW,
				height: imgH,
				thread: curThread
			};
		}

		if(m[1].toUpperCase() == 'K' && tgStats[trip].energy >= 500 && tgStats[m[4]] && Object.keys(tgStats[trip].shkvarki).length > 9){
			tgStats[trip].energy = 0;
			killTrip(trip);

			tgStats[m[4]].energy -= Math.floor(tgStats[m[4]].energy / 2);

			if(m[4] == rikaNipah && !tgStats[m[4]].rikaWiped){
				tgStats[trip].nipaBomber = true;
			}
		}

		break;
	}

	for (i = 0; i < refs.length; i++) {
		m = refs[i].textContent.match(/>>(\d+)/);
		if(!m) continue;
		t = m[1];

		if(!tgPostHits[t] || tgPostHits[t].from == trip || tgPostHits[t].hits[trip] || tgStats[tgPostHits[t].from].raped == curThread) continue;
		tgPostHits[t].hits[trip] = true;
		tgStats[tgPostHits[t].from].energy += tgStats[trip].energy > 50 ? 5 : 1;
	}

	return true;
}

function parseTripGame(callFrom){
	console.log('parseThread called from: ' + callFrom);
	console.time('parseThread');
	var posts = document.querySelectorAll('form div.post.reply'),
		op = document.querySelector('form div.post.op:not(.twParsed)'),
		i;

	if(op) parsePostResults(op , true);

	for (i = 0; i < posts.length && i < 500; i++) {
		if(posts[i].classList.contains('twParsed')) continue;
		parsePostResults(posts[i]);
	}
	
	renderTripGame();

	if(posts.length >= 500){
		if(!localStorage.twBaseThread || curThread > localStorage.twBaseThread){
			localStorage.twBaseThread = curThread;
			localStorage.twBaseStats = JSON.stringify(tgStats);

			savedState = JSON.stringify({
				twBaseStats: JSON.parse(localStorage.twBaseStats || "{}"),
				twBaseThread: localStorage.twBaseThread || curThread 
			});
			savedStateHash = hashStats();

			$('#twHash').text(savedStateHash.match(/[0-9-a-f]{4}/ig).join('-'));
		}
	}

	console.timeEnd('parseThread');
}


function applyStats(obj){
	if(!obj.twBaseThread || !obj.twBaseStats) throw('Stats file parse error');

	var newTgStats = {};

	for (var t in obj.twBaseStats) {
		
		if(curThread - parseInt(obj.twBaseStats[t].lastThread) > 50000 ) continue;
		
		obj.twBaseStats[t].ava = undefined;
		delete obj.twBaseStats[t].ava;
		obj.twBaseStats[t].raped = undefined;
		delete obj.twBaseStats[t].raped;

		obj.twBaseStats[t].energy = obj.twBaseStats[t].energy - Math.floor(obj.twBaseStats[t].energy * 0.02);
		
		if(obj.twBaseStats[t].energy <= 10) continue;
				
		newTgStats[t] = obj.twBaseStats[t];
	}

	baseThread = obj.twBaseThread;
	tgStats = newTgStats;
}

function hashStats(){
	var finalStr = localStorage.twBaseThread || curThread,
		stats = JSON.parse(localStorage.twBaseStats || "{}"),
		trips = Object.keys(stats),
		i, p;

		for (i = 0; i < trips.length; i++) {
			p = stats[trips[i]];

			finalStr += '[' +trips[i] + '|'	+ p.name + '|' + p.energy + '|' + p.lastThread + '|';
			
			if(p.title) finalStr += +p.title.title + '|' + p.title.from + '|' + p.title.cost + '|';

			finalStr += Object.keys(p.shkvarki).sort().join('|') + '|';

			if(p.nipaBomber) finalStr += 'nipaBomber|';
			if(p.rikaWiped) finalStr += 'rikaWiped|';
					 
			finalStr += ']';
		}

		return md5(utf8ArrToStr(finalStr));
}
