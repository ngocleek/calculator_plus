import clsx from "clsx";

function StyledEquation({ equation }) {
  // Regex to split the equation into numbers and operators
  const parts = equation.split(/([+\-*\/])/);
  //÷×\-+

  return (
    <div>
      {parts.map((part, index) => {
        // Check if the part is an operator
        const isOperator = ['+','-','*','/'].includes(part);

        // styled operators
        const operators = {
          "+": "+",
          "-": "-",
          "*": "×",
          "/": "÷",
		      "%": "%"
        };
        // Return styled number or operator
        return (
          <span
            key={index}
            className={clsx(
              "inline-block tracking-wide break-words",
              {
                "text-3xl": equation.length > 30,
                "text-4xl": equation.length <= 30 && equation.length > 16,
                "text-5xl": equation.length <= 16 && equation.length > 8,
                "text-7xl": equation.length <= 8,
              },
              [isOperator ? "text-gray-400" : "text-white"]
            )}
          >
            {isOperator ? operators?.[part] : part || part}
          </span>
        );
      })}
    </div>
  );
}

export default StyledEquation;
