import { useContext } from "react";

import { ResultsContext } from "../contexts/ResultsContext";

function Utility({ value, label }) {
	const { setDisplay } = useContext(ResultsContext);

	function applyUtil(utility) {
		switch (utility) {
			case "AC":
				console.log("AC");
				setDisplay("");
				break;
			case "%":
				console.log("%");
				break;
			case "+/-":
				console.log("+/-");
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
