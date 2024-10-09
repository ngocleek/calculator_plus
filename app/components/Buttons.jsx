import React from "react";
import {
	PiDivide,
	PiMinus,
	PiX,
	PiPlus,
	PiPercent,
	PiPlusMinus,
} from "react-icons/pi";

import Number from "./Number";
import Utility from "./Utility";
import Operation from "./Operation";
import Calculate from "./Calculate";

function Buttons() {
	return (
		<div className="grid grid-cols-4 place-items-center gap-4 text-4xl font-thin">
			<Utility value="AC" ancho="w-18" />
			<Utility value="+/-" label={<PiPlusMinus className="mx-auto" />} />
			<Utility value="%" label={<PiPercent className="mx-auto" />} />
			<Operation value="/" label={<PiDivide className="mx-auto" />} />
			<Number value="7" ancho="w-18" />
			<Number value="8" ancho="w-18" />
			<Number value="9" ancho="w-18" />
			<Operation value="*" label={<PiX className="mx-auto" />} />
			<Number value="4" ancho="w-18" />
			<Number value="5" ancho="w-18" />
			<Number value="6" ancho="w-18" />
			<Operation value="-" label={<PiMinus className="mx-auto" />} />
			<Number value="1" ancho="w-18" />
			<Number value="2" ancho="w-18" />
			<Number value="3" ancho="w-18" />
			<Operation value="+" label={<PiPlus className="mx-auto" />} />
			<Number value="0" width="w-full" space="col-span-2" />
			<Number value="." />
			<Calculate />
		</div>
	);
}

export default Buttons;
