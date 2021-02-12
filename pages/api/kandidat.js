import { getKandidat } from './fetch';

export default async function handler(req, res) {
	const allData = (await getKandidat()) || [];
	res.status(200).json(allData);
}
