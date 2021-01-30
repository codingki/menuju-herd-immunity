import { getAll, fetchCovidApi, fetchFromKemkes } from './api/fetch';
var _ = require('lodash');
import moment from 'moment';

export default function SocialImage({ allData, covidData, kemkesData }) {
	const dataVax = allData.allVaksins;
	const distribusiVax = allData.allDistribusiVaksins;
	const penelitianVax = allData.penelitianVaksin;
	const kandidatVax = allData.allKandidatVaksins;

	const totalCase = covidData.confirmed.value;
	const recovered = covidData.recovered.value;
	const lastUpdate = covidData.lastUpdate;
	const countTotalCase = covidData.confirmed.value;

	const dateDivaksin = kemkesData.tanggal;
	const totalDivaksin = kemkesData.jumlahDivaksin;

	const populasiIndonesia = 271349889;
	const targetVaksinasi = 181554465;

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
	return (
		<div
			className="bg-bg flex flex-row px-5"
			style={{ width: 1024, height: 512 }}
		>
			<div className="m-auto text-center p-5 h-auto w-auto">
				<h1 className="text-gray-200 text-3xl  font-medium">Indonesia</h1>
				<p className="text-6xl font-bold m-1  " style={{ color: '#20BFA9' }}>
					{totalDivaksin == 0 ? 'Calculating..' : countHI().toFixed(4) + ' %'}
				</p>
				<p className="text-gray-200 text-3xl font-medium">
					menuju “herd immunity” covid-19
				</p>
				<div className="my-4 ">
					<div
						className="shadow w-full rounded "
						style={{ backgroundColor: '#232228' }}
					>
						<div
							className="text-xs leading-none py-1 text-center h-8  rounded"
							style={{
								width: countHI().toFixed(4) + '%',
								backgroundColor: '#20BFA9',
							}}
						></div>
					</div>
				</div>
				<div className="text-center mx-auto ">
					<p className="font-medium text-center text-gray-400 text-xs ">
						Note: Pengkalkulasian kasar ini diambil dari ((Total orang yang
						sembuh + Jumlah orang yang sudah divaksinasi) / Target vaksinasi) X
						100%
					</p>
					<p className="font-medium text-center text-gray-400 text-sm mt-2">
						Disclaimer: Data ini tidak 100% valid
					</p>
					<p className="font-medium text-center text-gray-400 text-sm mt-2">
						{moment().format('DD-MM-YYYY')}
					</p>
				</div>
			</div>
			<div className="my-auto  ">
				<div className="grid grid-cols gap-3">
					<div className="">
						<p className="font-semibold text-xl text-white">
							Total orang yang sembuh
						</p>
						<p className="font-bold text-4xl my-2" style={{ color: '#2DCDE5' }}>
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
							({moment(lastUpdate).format('YYYY/MM/d HH:mm')})
						</p>
					</div>
					<div className="">
						<p className="font-semibold text-xl text-white">
							Total orang yang telah divaksinasi
						</p>
						<p className="font-bold text-4xl my-2" style={{ color: '#45EE41' }}>
							{numberWithCommas(totalDivaksin)}
						</p>
						<p className="text-gray-500">
							sumber:{' '}
							<a
								className="font-semibold hover:underline"
								href="https://www.kemkes.go.id/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Website Resmi Kemenkes (Last scraped: {dateDivaksin})
							</a>
						</p>
					</div>
					<div className="">
						<p className="font-semibold text-xl text-white">
							Total sasaran vaksinasi
						</p>
						<p className="font-bold text-4xl my-2" style={{ color: '#FFB800' }}>
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
	);
}

export async function getServerSideProps() {
	const allData = (await getAll()) || [];
	const covidData = (await fetchCovidApi()) || [];
	const kemkesData = (await fetchFromKemkes()) || [];

	return {
		props: { allData, covidData, kemkesData },
	};
}
