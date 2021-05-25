const fs = require('fs')

// loc-resolve
const locrFiles = fs.readdirSync('./resolve');
for (let file of locrFiles) {
	let mp = new Map();
	try {
		const data = JSON.parse(fs.readFileSync(`./resolve/${file}`));
		for (let k in data) {
			for (let v of data[k]) {
				if (mp.has(v.toLowerCase()))
					console.log(`Duplicate item in string resolver: "${v}" for "${k}": in "${file}"`)
				mp.set(v.toLowerCase(), k);
			}
			mp.set(k.toLowerCase(), k);
		}
	} catch (err) {
		console.log(`Cannot handle file ${file}: ${err.message}`);
	}
}

// loc-str
const locFiles = fs.readdirSync('./loc');
for (let file of locFiles) {
	let mp = new Map();
	try {
		const data = dotNotate(JSON.parse(fs.readFileSync(`./loc/${file}`)));
		for (let k in data)
			mp.set(k, compile(data[k]));
	} catch (err) {
		console.log(`Cannot handle file ${file}: ${err.message}`);
	}
}

// lang-data
try {
	const langData = JSON.parse(fs.readFileSync('./lang-data.json'));
	for (let lang in langData) {
		for (let prop of ['gameLanguage', 'languageName', 'gameLanguageName', 'timezone', 'timezoneName']) {
			if (typeof langData[lang][prop] !== 'string' || !langData[lang][prop] instanceof String)
				console.log(`Missing or incorrect property in lang-data: "${prop}", language "${lang}"`)
		}
	}
} catch (err) {
	console.log(`Cannot handle file ${file}: ${err.message}`);
}

function compile(str) {
	// TODO: try to compile as ES6 string
	return str;
}

function dotNotate(obj, target, prefix) {
	target = target || {},
		prefix = prefix || '';

	Object.keys(obj).forEach(function (key) {
		if (typeof (obj[key]) === 'object') {
			dotNotate(obj[key], target, prefix + key + '.');
		} else {
			return target[prefix + key] = obj[key];
		}
	});

	return target;
}

console.log('DONE')