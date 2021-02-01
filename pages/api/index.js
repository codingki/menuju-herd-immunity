const express = require('express');
const request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

// const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/api', (req, res) => {
	request(
		{ url: 'https://www.kemkes.go.id/' },
		async (error, response, body) => {
			if (error || response.statusCode !== 200) {
				return res.status(500).json({ type: 'error', message: err.message });
			}
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
			res.json(await fetchFromKemkes());
		}
	);
});

async function fetchFromKemkes() {
	const { data } = await axios.get('https://www.kemkes.go.id/');
	const $ = cheerio.load(data);
	let result = [];
	const date = $('li.info-date').text();
	const clearDate = date.split('Kondisi ');

	let jsonData = {};
	let kasus = [];
	let lastKey = '';
	let counter = 1;

	$('li.info-case')
		.find('td')
		.each(function (i, elem) {
			if (counter == 1) {
				lastKey = $(elem).text();
			}
			if (counter == 3) {
				jsonData[lastKey] = parseInt($(elem).text().split('.').join(''));
				kasus.push($(elem).text());
				lastKey = '';
				counter = 0;
			}
			counter++;
		});

	const send = {
		tanggal: clearDate[1],
		jumlahDivaksin: jsonData['Vaksinasi-1'] + jsonData['Vaksinasi-2'],
	};
	return send;
}

module.exports = app;
