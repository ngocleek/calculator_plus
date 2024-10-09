import clsx from "clsx";
import { PiDivide, PiPlus, PiX, PiMinus } from "react-icons/pi";

function StyledEquation({ equation }) {
	// Regex to split the equation into numbers and operators
	const parts = equation.split(/([+\-*\/])/);
	//÷×\-+
  console.log(parts);

	return (
		<div>
			{parts.map((part, index) => {
				// Check if the part is a number
				const isNumber = !isNaN(part);

				// styled operators
				const operators = {
					"+": "+",
					"-": "-",
					"*": "×",
					"/": "÷",
				}

				// Return styled number or operator
				return (
					<span
						key={index}
            className={clsx("inline-block tracking-wide break-words", {
              'text-3xl': equation.length > 30,
              'text-4xl': (equation.length <= 30 && equation.length > 16),
              'text-5xl': (equation.length <= 16 && equation.length > 8),
              'text-7xl': equation.length <= 8
            }, [isNumber ? "text-white" : "text-gray-400"])}
					>
						{isNumber ? part : operators?.[part]}
					</span>
				);
			})}
		</div>
	);
}

export default StyledEquation;
