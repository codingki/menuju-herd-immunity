function KandidatVaksin(props) {
	const data = props.data;
	function color(status) {
		if (status === 1) {
			return '#898989';
		}
		if (status === 2) {
			return '#FF6B00';
		}
		if (status === 3) {
			return '#E1D800';
		}
		if (status === 4) {
			return '#0076CB';
		}
		if (status === 5) {
			return '#9900CF';
		}
		if (status === 6) {
			return '#45EE41';
		}
	}

	return (
		<tr className="hover:bg-hoverBg">
			<td className="px-2 py-4 whitespace-no-wrap border-b flex flex-row   border-gray-500 ">
				<div
					className="rounded-full h-2 w-2 my-auto mr-2"
					style={{
						backgroundColor: color(data.faseStatus),
					}}
				></div>
				{data.fase}
			</td>
			<td className="px-2 py-4 whitespace-no-wrap border-b   border-gray-500">
				{data.dibuatOleh}
			</td>
			<td className="px-2 py-4 whitespace-no-wrap border-b   border-gray-500">
				{data.tipeVaksin}
			</td>
		</tr>
	);
}

export default KandidatVaksin;
