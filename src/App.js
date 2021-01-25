import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import moment from 'moment';
var _ = require('lodash');

function App(props) {
	const [totalCase, setTotalCase] = useState(0);
	const [countTotalCase, setCountTotalCase] = useState(0);
	const [lastUpdate, setLastUpdate] = useState('-');
	// const [totalVaksin, setTotalVaksin] = useState(0);

	const dataVax = props.dataVaksin.allVaksins;
	const totalVaksin = _.sumBy(dataVax, function (o) {
		return o.jumlah;
	});

	const pendudukIndonesia = 271349889;

	useEffect(() => {
		getCovidData();
	}, []);

	function getCovidData() {
		fetch(`https://covid19.mathdro.id/api/countries/Indonesia`)
			.then((res) => res.json())
			.then((data) => {
				setCountTotalCase(data.confirmed.value);
				setLastUpdate(data.lastUpdate);
				setTotalCase(numberWithCommas(data.confirmed.value));
			})
			.catch((err) => {
				console.log(err);
				setTotalCase('Error');
			});
	}

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function countHI() {
		const totalImun = countTotalCase + totalVaksin;
		const percentage = totalImun / pendudukIndonesia;
		return percentage * 100;
	}

	return (
		<>
			<div id="home" className="bg-bg flex h-screen flex-col ">
				<div className="container max-w-screen-lg m-auto text-center px-2">
					<h1 className="text-gray-200 text-xl md:text-4xl  font-medium">
						Indonesia
					</h1>
					<p
						className="text-4xl md:text-7xl  font-bold m-1 md:m-3 "
						style={{ color: '#20BFA9' }}
					>
						{countHI().toFixed(4)} %
					</p>
					<p className="text-gray-200 text-xl md:text-4xl  font-medium">
						menuju “herd immunity” covid-19
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
						<p className="font-medium text-center text-gray-400">
							Disclaimer: Data ini tidak 100% valid
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
			<div
				id="data"
				className="bg-bg flex md:h-screen h-auto sm:py-20 flex-col"
			>
				<div className="container-small m-auto max-w-screen-lg  px-5">
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
								<i> herd immunity</i> terhadap campak, sekitar 95% populasi
								harus diimunisasi. 5% penduduk lain akan terlindungi karena
								campak tidak akan menyebar di antara orang-orang yang
								diimunisasi.
							</p>
							<p className="text-gray-400 mt-2 ">
								sumber:{' '}
								<a
									className="font-semibold hover:underline"
									href="https://www.who.int/indonesia/news/novel-coronavirus/qa/qa-lockdown-and-herd-immunity"
									target="_blank"
								>
									WHO
								</a>
							</p>
							<p className="font-normal text-lg mt-2 leading-relaxed">
								Saya mengambil contoh dari campak yaitu 95% populasi harus
								divaksinasi atau imun terhadap covid.
							</p>
						</div>
						<div className="flex-1 md:my-auto md:my-10 my-20  ">
							<div className="grid grid-cols gap-4 px-6">
								<div className="">
									<p className="font-semibold text-xl text-white">
										Total Kasus covid-19 di Indonesia
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#C82C2C' }}
									>
										{totalCase}
									</p>
									<p className="text-gray-500">
										sumber:{' '}
										<a
											href="https://github.com/mathdroid/covid-19-api"
											className="font-semibold hover:underline"
											target="_blank"
										>
											Mathdroid covid-19 API
										</a>{' '}
										({moment(lastUpdate).format('YYYY/MM/d HH:mm')})
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
										±{numberWithCommas(pendudukIndonesia)}
									</p>
									<p className="text-gray-500">
										sumber:{' '}
										<a
											className="font-semibold hover:underline"
											href="https://dukcapil.kemendagri.go.id/berita/baca/642/cetak-sejarah-jumlah-penduduk-2020-versi-bps-dan-kemendagri-sama"
											target="_blank"
										>
											Kemendagri (Desember 2020)
										</a>
									</p>
								</div>
								<div className="">
									<p className="font-semibold text-xl text-white">
										Untuk menuju <i>herd immunity</i>
									</p>
									<p
										className="font-bold text-4xl my-2"
										style={{ color: '#FFB800' }}
									>
										±{numberWithCommas(Math.ceil(pendudukIndonesia * 0.95))}
									</p>
									<p className="text-white">
										orang harus imun terhadap covid atau divaksinasi
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center mx-auto ">
					<AnchorLink
						className="text-lg font-bold "
						href="#vaksin"
						style={{ color: '#20BFA9' }}
					>
						Jumlah Vaksin
					</AnchorLink>
				</div>
			</div>
			<div
				id="vaksin"
				className="bg-bg flex  h-auto sm:py-20 flex-col min-h-screen "
			>
				<div className="container-small m-auto max-w-screen-lg  px-5">
					<h1 className="font-bold text-2xl md:text-4xl text-gray-100 text-center">
						Jumlah Vaksin
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
									{vax.tanggal}
								</p>
								<p className="font-normal text-md text-center text-gray-500">
									sumber:{' '}
									<a
										className="text-lg font-medium "
										href={vax.link}
										style={{ color: '#20BFA9' }}
										target="_blank"
									>
										{vax.sumber}
									</a>
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				className="flex flex-col mx-auto p-5"
				style={{ backgroundColor: '#1e1d20' }}
			>
				<p className="font-medium text-center text-gray-400">
					Semua sumber sudah tertera
				</p>
				<p className="font-medium text-center text-gray-400">
					Dibuat oleh{' '}
					<a
						className="font-medium text-center "
						href="https://twitter.com/kikiding"
						target="_blank"
						style={{ color: '#20BFA9' }}
					>
						@kikiding
					</a>
				</p>
				<a
					className="font-medium text-center "
					href="https://karyakarsa.com/kikiding"
					target="_blank"
					style={{ color: '#20BFA9' }}
				>
					🙌 Dukung!
				</a>
			</div>
		</>
	);
}

export default App;
