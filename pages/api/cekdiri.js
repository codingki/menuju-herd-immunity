import { fetchVaksinasiCekdiri } from './fetch';
import Cors from 'cors';
const cors = Cors({
	methods: ['GET', 'HEAD'],
	origin: '*',
});

function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default async function handler(req, res) {
	const allData = (await fetchVaksinasiCekdiri()) || [];
	const data = {
		latest: allData.monitoring[allData.monitoring.length - 1],
		lastUpdate: allData.last_updated,
	};
	await runMiddleware(req, res, cors);
	res.status(200).json(data);
}
