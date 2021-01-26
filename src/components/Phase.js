function Phase(props) {
	return (
		<div className="flex-1 text-center ">
			<p className="font-bold text-white lg:text-lg md:text-md text-xs md:h-8 h-10">
				{props.phase}
			</p>
			<p className="font-medium text-gray-200 text-xs md:h-8 sm:h-10 h-16 ">
				{props.desc}
			</p>

			<div
				className="flex h-1.5 mb-3 "
				style={{ backgroundColor: `#${props.color}` }}
			/>
			<p
				className="font-bold text-xl md:text-4xl my-3"
				style={{ color: `#${props.color}` }}
			>
				{props.number}
			</p>
		</div>
	);
}

export default Phase;
