import { getPenilitian } from './fetch';

export default async function handler(req, res) {
	const allData = (await getPenilitian()) || [];
	res.status(200).json(allData);
}
