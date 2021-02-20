const API_URL = 'https://graphql.datocms.com';
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const prodUrl = 'https://menujuherdimmunity.id';

async function fetchAPI(query) {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_TOKEN}`,
		},
		body: JSON.stringify({
			query,
		}),
	});

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch API');
	}
	return json.data;
}

export async function fetchCovidApi() {
	const res = await fetch(`https://covid19.mathdro.id/api/countries/Indonesia`);

	const json = await res.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch Covid API');
	}
	return json;
}

export async function fetchCekDiri() {
	const res = await fetch(`https://menujuherdimmunity/api/cekdiri`);

	const json = await res.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch Covid API');
	}
	return json;
}

export async function fetchVaksinasiCekdiri() {
	const res = await fetch(`https://cekdiri.id/vaksinasi/`);

	const json = await res.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch cekdiri.id');
	}
	return json;
}

export async function fetchFromKemkes() {
	const res = await fetch(`${prodUrl}/api`);

	const json = await res.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to scrape Kemkes.go.id');
	}
	return json;
}

export async function getAll() {
	const data = fetchAPI(`
     {
        allVaksins(orderBy: tanggal_ASC) {
        id
        jumlah
        link
        sumber
        tanggal
        deskripsi
        title
        }
        allDistribusiVaksins(orderBy: id_ASC) {
            id
            judul
            jumlah
            link
            deskripsi
            sumber
            bulan
          }
          penelitianVaksin {
            limitedApproval
            phase1
            phase2
            phase3
            preclinical
            approved
            lastUpdate
          }
          allKandidatVaksins(orderBy: faseStatus_DESC) {
            id
            tipeVaksin
            dibuatOleh
            fase
            faseStatus
          }
          allTahapanImunisasis(orderBy: _createdAt_ASC) {
            tahap
            id
            dosis
            bulan
          }
    }
    `);
	return data;
}

export async function getPenilitian() {
	const data = fetchAPI(`
     {

          penelitianVaksin {
            limitedApproval
            phase1
            phase2
            phase3
            preclinical
            approved
            lastUpdate
          }

    }
    `);
	return data;
}

export async function getKandidat() {
	const data = fetchAPI(`
     {

          allKandidatVaksins(orderBy: faseStatus_DESC) {
            id
            tipeVaksin
            dibuatOleh
            fase
            faseStatus
          }
          penelitianVaksin {
            limitedApproval
            phase1
            phase2
            phase3
            preclinical
            approved
            lastUpdate
          }
    }
    `);
	return data;
}
