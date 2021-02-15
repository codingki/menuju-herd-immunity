import { getPenilitian } from './fetch';
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
	const allData = (await getPenilitian()) || [];
	await runMiddleware(req, res, cors);
	res.status(200).json(allData);
}
