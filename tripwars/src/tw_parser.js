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

function parsePostResults(p, isOp){
	var file = p.querySelector('.file-info a'),
		trip = p.querySelector('.intro span.trip'),
		refs = p.querySelectorAll('div.body a[onclick^=highlightReply]'),
		name = p.querySelector('.intro span.name'),
		spoils = p.querySelectorAll('div.body span.spoiler'),
		img = p.querySelector('img.post-image'), imgSrc, imgW, imgH,
		pid = p.id.replace('reply_', ''),
		hits = [], rnd, i, j, r, m, t, atck, tCost, e;

	if(!trip) return null;
	trip = trip.textContent.substring(0,12);
	name = name.textContent;

	if(!tgPostHits[pid]){
		tgPostHits[pid] = {from: trip, hits:{}};
	}else{
		return false;
	}

	p.classList.add('tw-' + bytesToHex(strToUTF8Arr(trip)));

	if(img){
		m = img.src.match(/thumb(\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$)/i);
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
		
		if(m[1].toUpperCase() == 'S' && tgStats[trip].energy > 5 && tgStats[m[4]] && !tgStats[m[4]].shkvarki[trip]){
			tgStats[trip].energy -= 5;
			tgStats[m[4]].shkvarki[trip] = true;
		}

		if(m[1].toUpperCase() == 'T' && m[3] && tgStats[m[4]]){
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

		if(m[1].toUpperCase() == 'F' && tgStats[trip].energy >= 50 && tgStats[m[4]]){
			tgStats[trip].energy -= 30;
			tgStats[m[4]].energy += 25;
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

function parseTripGame(){
	var posts = document.querySelectorAll('form div.post.reply'),
		i;

	parsePostResults(document.querySelector('form div.post.op'), true);

	for (i = 0; i < posts.length && i < 500; i++) {
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

			$('#twConfArea').val(savedState);
			$('#twHash').text(md5(savedState).match(/[0-9-a-f]{4}/ig).join('-'));
		}
	}
}
