import React from 'react';
import { useQuery } from 'graphql-hooks';
import App from './App';
const VAKSINQUERY = `query VAKSINQUERY {
	allVaksins(orderBy: tanggal_ASC) {
	id
	jumlah
	link
	sumber
	tanggal
	deskripsi
	title
	}
	allDistribusiVaksins(orderBy: tanggal_ASC) {
		id
		judul
		jumlah
		link
		sumber
		tanggal
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
}`;

function Fetch() {
	const { loading, error, data } = useQuery(VAKSINQUERY);
	if (loading)
		return (
			<div className="bg-bg flex h-screen flex-col ">
				<div className="container m-auto">
					<p className="text-white text-center font-bold">Loading...</p>
				</div>
			</div>
		);
	if (error)
		return (
			<div className="bg-bg flex h-screen flex-col ">
				<div className="container m-auto">
					<p className="text-white text-center font-bold">
						Terjadi Kesalahan, laporkan lewat twitter @kikiding
					</p>
				</div>
			</div>
		);
	if (data) return <App dataVaksin={data} />;
}

export default Fetch;
