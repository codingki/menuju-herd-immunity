import Head from 'next/head';
import {
	getAll,
	fetchCovidApi,
	fetchFromKemkes,
	fetchCekDiri,
} from './api/fetch';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import moment from 'moment';
import KandidatVaksin from '../components/KandidatVaksin';
import Phase from '../components/Phase';
var _ = require('lodash');

export default function Home({ allData, covidData, kemkesData }) {
	const dataVax = allData.allVaksins;
	const distribusiVax = allData.allTahapanImunisasis;
	const penelitianVax = allData.penelitianVaksin;
	const kandidatVax = allData.allKandidatVaksins;

	const totalCase = covidData.confirmed.value;
	const recovered = covidData.recovered.value;
	const lastUpdate = covidData.lastUpdate;

	const dateDivaksin = kemkesData.lastUpdate;
	const totalDivaksin = kemkesData.latest.vaksinasi2;

	const populasiIndonesia = kemkesData.populasiIndonesia;
	const targetVaksinasi = 181554465;
	// const targetVaksinasi = kemkesData.latest.total_sasaran_vaksinasi;

	const totalVaksin = _.sumBy(dataVax, function (o) {
		return o.jumlah;
	});

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function countHI() {
		const totalImun = recovered + totalDivaksin;
		const percentage = totalImun / targetVaksinasi;
		return percentage * 100;
	}
	const urlImage = `https://menujuherdimmunity.id/api/image`;
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>Indonesia Menuju Herd Immunity</title>
				<meta
					name="description"
					content="Seberapa jauh sih kita menuju herd immunity covid-19?"
				/>
				<meta property="og:image" content={urlImage} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Indonesia Menuju Herd Immunity" />
				<meta name="twitter:image" content={urlImage} />
				<meta name="twitter:domain" content="https://menujuherdimmunity.id" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
					key="viewport"
				/>
			</Head>
			<div id="home" className="bg-bg flex h-screen flex-col ">
				<div className="container max-w-screen-lg m-auto text-center px-5 md:px-20">
					<h1 className="text-gray-200 text-xl md:text-4xl  font-medium">
						Indonesia
					</h1>
					<p
						className="text-4xl md:text-7xl  font-bold m-1 md:m-3 "
						style={{ color: '#20BFA9' }}
					>
						{totalDivaksin == 0 ? 'Calculating..' : countHI().toFixed(4) + ' %'}
					</p>
					<p className="text-gray-200 text-xl md:text-4xl  font-medium">
						menuju <i>herd immunity</i> covid-19
					</p>
					<div className="my-4 lg:my-10 ">
						<div
							className="shadow w-full rounded "
							style={{ backgroundColor: '#232228' }}
						>
							<div
								className="text-xs leading-none py-1 text-center h-8 md:h-10 lg:h-12 rounded"
								style={{
									width: countHI().toFixed(4) + '%',
									backgroundColor: '#20BFA9',
								}}
							></div>
						</div>
					</div>
					<div className="text-center mx-auto ">
						<p className="font-medium text-center text-gray-400 text-xs ">
							Catatan: Pengkalkulasian kasar ini diambil dari ((Total orang yang
							sembuh + Jumlah orang yang sudah menerima vaksin dosis 2) / Target
							vaksinasi) X 100%
						</p>
						<p className="font-sm text-center text-gray-400 text-sm my-2">
							Disclaimer: Penentuan pengkalkulasian diambil tanpa dampingan
							ahli, hanya berdasarkan riset.
						</p>
						<AnchorLink
							className="text-lg font-medium "
							href="#data"
							style={{ color: '#20BFA9' }}
						>
							Lihat datanya
						</AnchorLink>
					</div>
				</div>
			</div>
			<div id="data" className="bg-bg flex min-h-screen h-auto  flex-col">
				<div className="container m-auto max-w-screen-lg  px-5">
					<div className="mx-auto text-center  m-5  ">
						<p className="font-semibold text-xl text-white">
							Total Kasus covid-19 di Indonesia
						</p>
						<p
							className="font-bold text-4xl my-2 "
							style={{ color: '#C82C2C' }}
						>
							±{numberWithCommas(totalCase)}
						</p>
						<p className="text-gray-500">
							sumber:{' '}
							<a
								href="https://github.com/mathdroid/covid-19-api"
								className="font-semibold hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Mathdroid covid-19 API
							</a>{' '}
							({moment(lastUpdate).format('DD MMM YYYY HH:mm')})
						</p>
					</div>
					<div className="flex gap-6 flex-col  md:flex-row ">
						<div
							className="p-6 rounded-xl text-gray-200 flex-1 "
							style={{ backgroundColor: '#232228' }}
						>
							<p className="font-semibold text-xl text-gray-100">
								Apa itu <i>Herd Immunity</i>
							</p>
							<p className="font-normal text-md md:text-lg mt-2 leading-relaxed text-gray-200">
								<i>Herd Immunity</i> adalah perlindungan tidak langsung dari
								penyakit menular yang terjadi ketika suatu populasi kebal baik
								melalui vaksinasi atau kekebalan yang dikembangkan melalui
								infeksi sebelumnya.
							</p>

							<p className="font-normal text-md md:text-lg leading-relaxed mt-2">
								Persentase orang yang perlu memiliki antibodi untuk mencapai
								<i> herd immunity</i> terhadap suatu penyakit berbeda-beda dari
								satu penyakit ke penyakit lain. Sebagai contoh, untuk mencapai
								<i> herd immunity</i> terhadap campak, sekitar <b>95%</b>{' '}
								populasi harus diimunisasi. 5% penduduk lain akan terlindungi
								karena campak tidak akan menyebar di antara orang-orang yang
								diimunisasi. Untuk polio, ambangnya adalah sekitar 80%.
							</p>
							<p className="text-gray-400 mt-2 ">
								sumber:{' '}
								<a
									className="font-semibold hover:underline"
									href="https://www.who.int/indonesia/news/novel-coronavirus/qa/qa-lockdown-and-herd-immunity"
									target="_blank"
									rel="noopener noreferrer"
								>
									WHO
								</a>
							</p>
							<p className="font-normal text-lg mt-2 leading-relaxed">
								Indonesia sendiri menargetkan vaksinasi covid-19 ±66,9% dari
								total populasi yaitu 181,554,465.
							</p>
							<p className="text-gray-400 mt-2 ">
								sumber:{' '}
								<a
									className="font-semibold hover:underline"
									href="https://twitter.com/KemenkesRI/status/1352621085393440771"
									target="_blank"
									rel="noopener noreferrer"
								>
									@KemenkesRI
								</a>
							</p>
						</div>
						<div className="flex-1 md:my-auto md:my-10 my-20  ">
							<div className="grid grid-cols gap-4 px-6">
								<div className="">
									<p className="font-semibold text-xl text-white">
										Total orang yang sembuh dari covid-19
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#2DCDE5' }}
									>
										{numberWithCommas(recovered)}
									</p>
									<p className="text-gray-500">
										sumber:{' '}
										<a
											href="https://github.com/mathdroid/covid-19-api"
											className="font-semibold hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											Mathdroid covid-19 API
										</a>{' '}
										({moment(lastUpdate).format('DD MMM YYYY HH:mm')})
									</p>
								</div>
								<div className="">
									<p className="font-semibold text-xl text-white">
										Total dosis vaksin yang dimiliki Indonesia
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#45EE41' }}
									>
										{numberWithCommas(totalVaksin)}
									</p>
									<p className="text-gray-500">
										sumber: Diambil dari berbagai sumber
									</p>
								</div>
								<div className="">
									<p className="font-semibold text-xl text-white">
										Total penduduk Indonesia
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#4186EE' }}
									>
										±{numberWithCommas(populasiIndonesia)}
									</p>
									<p className="text-gray-500">
										sumber:{' '}
										<a
											className="font-semibold hover:underline"
											href="https://dukcapil.kemendagri.go.id/berita/baca/642/cetak-sejarah-jumlah-penduduk-2020-versi-bps-dan-kemendagri-sama"
											target="_blank"
											rel="noopener noreferrer"
										>
											Kemendagri (Desember 2020)
										</a>
									</p>
								</div>
								<div className="">
									<p className="font-semibold text-xl text-white">
										Total sasaran vaksinasi
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#FFB800' }}
									>
										±{numberWithCommas(targetVaksinasi)}
									</p>
									<p className="text-gray-500">
										sumber:{' '}
										<a
											className="font-semibold hover:underline"
											href="https://www.kemkes.go.id/"
											target="_blank"
											rel="noopener noreferrer"
										>
											Website Resmi Kemenkes
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mx-auto text-center m-5">
						<p className="font-semibold text-xl text-white">
							Orang yang telah divaksinasi(2 Dosis)
						</p>
						<p className="font-bold text-4xl my-2" style={{ color: '#FFF' }}>
							±
							{totalDivaksin == 0
								? 'Getting data..'
								: numberWithCommas(totalDivaksin)}
						</p>
						<p className="text-gray-500">
							sumber:{' '}
							<a
								className="font-semibold hover:underline"
								href="https://www.kemkes.go.id/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Website Resmi Kemenkes (
								{moment(dateDivaksin).format('DD MMM YYYY HH:mm')})
							</a>
						</p>
					</div>
					<div className="text-center mx-auto ">
						<AnchorLink
							className="text-lg font-bold "
							href="#distribusi"
							style={{ color: '#20BFA9' }}
						>
							Target Tahapan Vaksinasi COVID-19
						</AnchorLink>
					</div>
				</div>
			</div>

			{/* <div
				id="vaksin"
				className="bg-bg flex  h-auto sm:py-20 py-10 flex-col min-h-screen "
			>
				<div className="container-small m-auto max-w-screen-lg  px-5">
					<h1 className="font-bold text-2xl md:text-4xl text-gray-100 text-center">
						Ketersediaan Vaksin
					</h1>
					<p className="text-center text-gray-300 font-medium text-lg mt-2">
						Jumlah dosis vaksin yang tersedia di Indonesia (diambil dari
						berbagai sumber)
					</p>

					<div className="flex flex-col mt-10">
						{dataVax.map((vax, index) => (
							<div className="p-1" key={vax.id}>
								{index !== 0 && (
									<div className="h-4 w-4 rounded-full w-1 mx-auto bg-gray-700" />
								)}
								{index > 0 && (
									<div
										className="h-20 w-1 mx-auto rounded"
										style={{ backgroundColor: '#232228' }}
									/>
								)}

								<div className="h-4 w-4 rounded-full w-1 mx-auto bg-gray-700" />
								<p className="font-semibold text-lg mt-2 text-center text-gray-200">
									{vax.title}
								</p>
								<p className="font-bold sm:text-6xl text-center text-white text-4xl">
									{numberWithCommas(vax.jumlah)}
								</p>
								<p className="font-normal text-lg text-center text-gray-400 mt-2">
									{moment(vax.tanggal).format('DD MMMM YYYY')}
								</p>
								<p className="font-normal text-md text-center text-gray-500">
									sumber:{' '}
									<a
										className="text-lg font-medium "
										href={vax.link}
										style={{ color: '#20BFA9' }}
										target="_blank"
										rel="noopener noreferrer"
									>
										{vax.sumber}
									</a>
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="text-center mx-auto ">
					<AnchorLink
						className="text-lg font-bold "
						href="#distribusi"
						style={{ color: '#20BFA9' }}
					>
						Target Tahapan Vaksinasi COVID-19
					</AnchorLink>
				</div>
			</div> */}
			<div
				id="distribusi"
				className="bg-bg flex  h-auto sm:py-20 py-10 flex-col min-h-screen "
			>
				<div className="container-small m-auto max-w-screen-lg  px-5">
					<h1 className="font-bold text-2xl md:text-4xl text-gray-100 text-center">
						Target Tahapan Vaksinasi COVID-19
					</h1>
					<p className="text-center text-gray-300 font-medium text-lg mt-2">
						Pemerintah menargetkan vaksin COVID-19 tersedia secara bertahap
						mempertimbangkan ketersediaan vaksin, tenaga kesehatan, serta sarana
						dan prasarana kesehatan.
					</p>
					<p className="font-normal text-md text-center text-gray-500">
						sumber:{' '}
						<a
							className="text-lg font-medium "
							href="http://indonesiabaik.id/infografis/target-tahapan-vaksinasi-covid-19"
							style={{ color: '#20BFA9' }}
							target="_blank"
							rel="noopener noreferrer"
						>
							indonesiabaik.id
						</a>
					</p>

					<div className="flex flex-col mt-10">
						{distribusiVax.map((vax, index) => (
							<div className="p-1" key={vax.id}>
								{index !== 0 && (
									<div className="h-4 w-4 rounded-full w-1 mx-auto bg-gray-700" />
								)}
								{index > 0 && (
									<div
										className="h-20 w-1 mx-auto rounded"
										style={{ backgroundColor: '#232228' }}
									/>
								)}

								<div className="h-4 w-4 rounded-full w-1 mx-auto bg-gray-700" />
								<p className="font-bold text-lg text-center text-white mt-2">
									{vax.tahap}
								</p>
								<p className="font-normal text-lg text-center text-gray-400 ">
									{vax.bulan}
								</p>
								<p className="font-semibold text-lg text-center text-gray-200">
									{vax.judul}
								</p>

								<p className="font-bold sm:text-6xl text-center text-white text-4xl">
									{numberWithCommas(vax.dosis)}
								</p>
								<p className="font-semibold text-lg  text-center text-gray-300">
									Dosis
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="text-center mx-auto mt-6 ">
					<AnchorLink
						className="text-lg font-bold "
						href="#penelitian"
						style={{ color: '#20BFA9' }}
					>
						Penelitian Vaksin
					</AnchorLink>
				</div>
			</div>
			<div
				id="penelitian"
				className="bg-bg flex h-screen sm:py-20 py-10 flex-col "
			>
				<div className="container m-auto max-w-screen-lg  px-5  ">
					<h1 className="font-bold text-2xl md:text-4xl text-gray-100 text-center">
						Penelitian Vaksin Dunia
					</h1>
					<p className="text-center text-gray-500 font-medium text-lg mt-2">
						Dikumpulkan dari bing.com/covid (terakhir diupdate pada{' '}
						{moment(penelitianVax.lastUpdate).format('DD MMM YYYY')})
					</p>
					<div className="flex flex-row  my-10">
						<Phase
							phase="Preclinical"
							desc="Not yet in human trials"
							color="898989"
							number={penelitianVax.preclinical}
						/>
						<Phase
							phase="Phase I"
							desc="Not yet in human trials"
							color="FF6B00"
							number={penelitianVax.phase1}
						/>
						<Phase
							phase="Phase II"
							desc="Extended safety trials"
							color="E1D800"
							number={penelitianVax.phase2}
						/>
						<Phase
							phase="Phase III"
							desc="Large-scale trials"
							color="0076CB"
							number={penelitianVax.phase3}
						/>
						<Phase
							phase="Limited Approval"
							desc="Approved for limited use"
							color="9900CF"
							number={penelitianVax.limitedApproval}
						/>
					</div>
					<div className="flex flex-row  my-10">
						<Phase
							phase="Approved"
							desc="Approved for human use"
							color="45EE41"
							number={penelitianVax.approved}
						/>
					</div>
				</div>
				<div className="text-center mx-auto ">
					<AnchorLink
						className="text-lg font-bold "
						href="#kandidat"
						style={{ color: '#20BFA9' }}
					>
						Kandidat Vaksin
					</AnchorLink>
				</div>
			</div>
			<div
				id="kandidat"
				className="bg-bg flex min-h-screen h-auto sm:py-20 flex-col"
			>
				<div className="container m-auto max-w-screen-lg  px-5  ">
					<h1 className="font-bold text-2xl md:text-4xl text-gray-100 text-center">
						Kandidat Vaksin Teratas
					</h1>
					<p className="text-center text-gray-500 font-medium text-lg mt-2 mb-10">
						Dikumpulkan dari bing.com/covid (terakhir diupdate pada{' '}
						{moment(penelitianVax.lastUpdate).format('DD MMM YYYY')})
					</p>

					<div
						className="py-2 px-6 pb-6 rounded-xl text-gray-200 overflow-auto "
						style={{ backgroundColor: '#232228' }}
					>
						<table className="table-auto min-w-full whitespace-nowrap">
							<thead>
								<tr>
									<th className=" text-semibold text-left py-4 whitespace-no-wrap border-b-2 border-gray-200 ">
										Tahapan
									</th>
									<th className=" text-semibold text-left py-4 whitespace-no-wrap border-b-2 border-gray-200 ">
										Dibuat oleh
									</th>
									<th className="text-semibold text-left py-4 whitespace-no-wrap border-b-2 border-gray-200 ">
										Tipe Vaksin
									</th>
								</tr>
							</thead>
							<tbody>
								{kandidatVax.map((item) => (
									<KandidatVaksin key={item.id} data={item} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className=" bg-bg p-5">
				<div className="max-w-screen-sm flex md:flex-row flex-col mx-auto gap-2">
					<div className="text-center mx-auto  ">
						<AnchorLink
							className="text-lg font-bold "
							href="#home"
							style={{ color: '#20BFA9' }}
						>
							Kembali ke atas
						</AnchorLink>
					</div>
					<div className="text-center mx-auto  ">
						<a
							className="text-lg font-bold "
							href="https://twitter.com/intent/tweet?url=https://menujuherdimmunity.id/&text=Seberapa jauh sih kita menuju herd immunity covid-19?"
							target="_blank"
							style={{ color: '#20BFA9' }}
						>
							Bagikan ini ke twitter
						</a>
					</div>
				</div>
			</div>

			<div
				className="  flex flex-col mx-auto p-5"
				style={{ backgroundColor: '#1e1d20' }}
			>
				<p className="font-medium text-center text-gray-400">
					Semua sumber sudah tertera
				</p>
				<p className="font-medium text-center text-gray-400">
					Dibuat & dikelola oleh{' '}
					<a
						className="font-medium text-center "
						href="https://twitter.com/kikiding"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#20BFA9' }}
					>
						@kikiding
					</a>
				</p>
				<a
					className="font-medium text-center "
					href="https://karyakarsa.com/kikiding"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: '#20BFA9' }}
				>
					🙌 Dukung!
				</a>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const allData = (await getAll()) || [];
	const covidData = (await fetchCovidApi()) || [];
	const kemkesData = (await fetchCekDiri()) || [];

	return {
		props: { allData, covidData, kemkesData },
	};
}
