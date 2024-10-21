import { useContext } from "react";
import { evaluate, string } from "mathjs";

import { ResultsContext } from "../contexts/ResultsContext";

function Utility({ value, label }) {
	const { display, setDisplay, setIsDone } = useContext(ResultsContext);

	function applyUtil(utility) {
		switch (utility) {
			case "AC":
				setDisplay((prev) => "");
				setIsDone(true);
				break;
			case "%":
				setDisplay((prev) => prev.concat("%"));
				break;
			case "DEL":
				setDisplay((prev) => prev.slice(0, prev.length-1));
				setIsDone(false);
				break;
		}
	}

	return (
		<button
			className="w-20 h-20 rounded-full text-black bg-utility text-3xl"
			onClick={() => applyUtil(value)}
		>
			{label ? label : value}
		</button>
	);
}

export default Utility;
