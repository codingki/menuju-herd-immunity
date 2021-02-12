import { getKandidat } from './fetch';

export default async function handler(req, res) {
	const allData = (await getKandidat()) || [];
	const data = {
		allKandidatVaksins: allData.allKandidatVaksins,
		lastUpdate: allData.penelitianVaksin.lastUpdate,
	};
	res.status(200).json(data);
}
