var tgStats = {},
	tgPostHits = {},
	rikaNipah = '!NipaJ2fn2k';

function killTrip(trip){
	if(!tgStats[trip] || tgStats[trip].energy > 0) return true;
	tgStats[trip].energy = 0;
	tgStats[trip].shkvarki = {};
	tgStats[trip].title = null;
	tgStats[trip].ava = null;
}

var imRegEx = /thumb(\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$)/i,
    zipRegEx = /\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.zip$/i;

function checkAndExec(params, onlyCheck){
	var atackr = tgStats[params.who],
		target = tgStats[params.target],
		cmd = params.cmd.toUpperCase(),
		rnd = params.rnd,
		file = params.file,
		r = parseInt(params.title),
		atck, t, tCost, i, mt;

	if(!atackr || !target) return {status: "ERROR", msg: "Ой, что-то пошло не так."};

	if(atackr.trip == target.trip) return {status: "ERROR", msg: "На себя команды применять нельзя."};

	if(file && cmd == 'A' && atackr.energy > 5 && target){
		if(onlyCheck){return {status: "OK"};}

		if(r > 0){
			mt = new MersenneTwister(rnd);

			for (i = 0; i < r && i < 5; i++) {
				atck = Math.round(mt.genrand_real1() * 55 - 5);
				atackr.energy -= 5;
				if(atck < 0){
					atackr.energy += atck;
				}else{
					target.energy -= atck;
				}
				if(atackr.energy <= 5 || target.energy <= 0) break;
			}
		}else{
			console.log('Single A');
			atck = Math.round(((rnd & 255) / 255) * 55 - 5);
			atackr.energy -= 5;
			if(atck < 0){
				atackr.energy += atck;
			}else{
				target.energy -= atck;
			}
		}		
	}

	if(file && cmd == 'A' && atackr.energy <= 5){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больше 5 энергии для этой команды."};
	}

	if(file && cmd == 'R' && atackr.energy > 100 && target){	
		if(atackr.energy <= target.energy){return {status: "ERROR", msg: "Нужно быть сильнее жертвы."};}
		if(target.raped == curThread){return {status: "ERROR", msg: "Уже рейпнут же."};}
		if(onlyCheck){return {status: "OK"};}
		
		atck = (rnd & 255) / 255;
		if(atck < 0.5){
			t = atackr.energy;
			atackr.energy = target.energy;
			target.energy = t;
			atackr.energy -= 100;
			return true;
		}

		target.raped = curThread;
		atackr.energy -= 100;
	}
	
	if(cmd == 'R' && atackr.energy <= 100){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 100 энергии для этой команды."};
	}
		
	if(cmd == 'S' && atackr.energy > 250 && target){
		if(target.shkvarki[atackr.trip]) return {status: "ERROR", msg: "Уже зашкварено."};
		if(onlyCheck){return {status: "OK"};}

		atackr.energy -= 5;
		target.shkvarki[atackr.trip] = true;
	}

	if(cmd == 'S' && atackr.energy <= 250){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 250 энергии для активации этой команды."};
	}

	if(cmd == 'T' && atackr.energy > 250 && target){
		tCost = 10;
		if(target.title){
			tCost = target.title.cost * 2;
			if(tCost > 1280) tCost = 1280;
		}
		
		if(atackr.energy <= tCost) return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее "+tCost+" энергии для этой команды."};
		if(onlyCheck){return {status: "OK"};}

		target.title ={
			from: atackr.trip,
			cost: tCost,
			title: params.title
		};

		atackr.energy -= tCost;
	}

	if(cmd == 'T' && atackr.energy <= 250){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 250 энергии для активации этой команды."};
	}

	if(cmd == 'F' && atackr.energy >= 250 && target){
		if(onlyCheck){return {status: "OK"};}

		if(r > 0){
			for (i = 0; i < r && i < 5; i++) {
				atackr.energy -= 60;
				target.energy += 50;
				if(atackr.energy <= 60) break;
			}
		}else{
			atackr.energy -= 60;
			target.energy += 50;			
		}
	}
	
	if(cmd == 'F' && atackr.energy <= 250){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 250 энергии для активации этой команды."};
	}

	if(params.imgSrc && cmd == 'I' && atackr.energy > 250 && target){
		if(onlyCheck){return {status: "OK"};}

		atackr.energy -= 250;
		target.ava = {
			from: atackr.trip,
			src: params.imgSrc,
			width: params.imgW,
			height: params.imgH,
			thread: curThread
		};
	}

	if(cmd == 'I' && atackr.energy <= 250){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 250 энергии для этой команды."};
	}

	if(cmd == 'K' && atackr.energy >= 500 && target){
		if(Object.keys(atackr.shkvarki).length < 10) return {status: "ERROR", msg: "Ты должен быть Кудахом чтоб набухнуть."};
		if(onlyCheck){return {status: "OK"};}

		atackr.energy = 0;
		target.energy -= Math.floor(target.energy / 2);
	}

	if(cmd == 'K' && atackr.energy <= 500){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 500 энергии для этой команды."};
	}

	if(cmd == 'O' && atackr.energy > 250 && target){
		t = Object.keys(target.shkvarki);
		var sk = null;

		if(t.length === 0) return {status: "ERROR", msg: "Нечего отсасывать."};

		for (i = 0; i < t.length; i++) {			
			if(!atackr.shkvarki[t[i]]){
				sk = t[i];
				break;
			}
		}

		if(!sk) return {status: "ERROR", msg: "Нечего отсасывать. (У тебя уже есть все эти шкварки)"};
		if(onlyCheck){return {status: "OK"};}

		atackr.energy -= 50;
		atackr.shkvarki[sk] = true;
		target.shkvarki[sk] = undefined;
		delete target.shkvarki[sk];
	}

	if(cmd == 'O' && atackr.energy <= 250){
		return {status: "ERROR", msg: "Недостаточно энергии. Нужно иметь больее 250 энергии для активации этой команды."};
	}
	
	return {status: "OK"};
}

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
		tgStats[trip] = {name: name, trip: trip, energy: 0, shkvarki: {}, title: null};
	}

	if(tgStats[trip].raped != curThread){
		m = pid.match(/(\d)\1+$/);

		if(m){
			e = Math.pow(10, m[0].length - 1);
		}else{
			e = 1;
		}
		tgStats[trip].energy += e;
	}
	tgStats[trip].name = name;


	tgStats[trip].lastThread = curThread;
	
	for (i = 0; i < spoils.length; i++) {
		m = spoils[i].textContent.match(/^([a-z0-9])(:([a-z0-9а-я\-\s]{0,30}))?:(!{1,2}.+)$/i);
		if(!m) continue;
		if(m[4] == trip) break;

		checkAndExec({
			cmd: m[1],
			who: trip,
			target: m[4],
			rnd: rnd,
			file: file,
			title: m[3],
			imgSrc: imgSrc,
			imgW: imgW,
			imgH: imgH,
		});
		killTrip(trip);
		killTrip(m[4]);
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
		if(curThread != baseThread){
			baseThread = curThread;
			genSaveState();
		}
	}
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

		obj.twBaseStats[t].prev = obj.twBaseStats[t].energy;

		obj.twBaseStats[t].energy = obj.twBaseStats[t].energy - Math.min(Math.floor(obj.twBaseStats[t].energy * 0.02), 100);
		
		if(obj.twBaseStats[t].energy <= 10) continue;
				
		newTgStats[t] = obj.twBaseStats[t];
	}

	baseThread = obj.twBaseThread;
	tgStats = newTgStats;
}

function hashStats(){
	var finalStr = '>' + baseThread,
		trips = Object.keys(tgStats),
		i, p;

		for (i = 0; i < trips.length; i++) {
			p = tgStats[trips[i]];

			finalStr += '[' +trips[i] + '|'	+ p.name + '|' + p.energy + '|' + p.lastThread + '|';
			
			if(p.title) finalStr += +p.title.title + '|' + p.title.from + '|' + p.title.cost + '|';

			finalStr += Object.keys(p.shkvarki).sort().join('|') + '|';

			if(p.nipaBomber) finalStr += 'nipaBomber|';
			if(p.rikaWiped) finalStr += 'rikaWiped|';
					 
			finalStr += ']';
		}
		return md5(utf8ArrToStr(finalStr));
}
