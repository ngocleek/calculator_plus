import React, { useContext } from "react";

import { ResultsContext } from "../contexts/ResultsContext";
import {format, formatRelative} from "date-fns";
import StyledEquation from "./StyledEquation";

import vi from 'date-fns/locale/vi';

function Recent() {
  const {
    history,
  } = React.useContext(ResultsContext)

	const formatRelativeLocale = {
		yesterday: "'Hôm qua'",
		today: "'Hôm nay'",
		other: 'MM/dd/yyyy',
	};

	const locale = {
		...vi,
		formatRelative: token => formatRelativeLocale[token],
	};

  function formatExpression(expression) {
    const parts = expression.split(/([+\-*/])/); // Split by operators

    return parts.map((part, index) => {
      // If it's an operator, add <wbr /> before it
      if (["+","-","*","/"].includes(part)) {
        const operatorSymbol = part === "*" ? "×" : part === "/" ? "÷" : part;
        return (
          <span key={index} className="px-0.5">
            <wbr />
            {operatorSymbol}
          </span>
        );
      }
      // Return the number or part of the expression as is
      return <span key={index}>{part}</span>;
    });
  }

	console.log("history", history);

	return (
		<div className="w-full h-auto mb-10 font-light text-gray-300">
			
			<ul className="w-full divide-y divide-gray-700">
			{history.map((data, index) => (
				<li className="py-1" key={index}>
					<div className="flex items-center space-x-4">
						<div className="flex-1 min-w-16">
							<p className="text-sm font-medium truncate text-white">
								{format(data.time, "HH:mm aaa")}
							</p>
							<p className="text-sm text-white truncate dark:text-gray-400">
							{formatRelative(data.time, new Date(), { locale })}
							</p>
						</div>
						<div className="text-lg font-thin text-end tracking-wider text-operation">
						{formatExpression(data.expression)} <span className="text-white font-medium">= {data.result}</span>
						</div>
					</div>
				</li>
			))}
			</ul>
		</div>
	);
}

export default Recent;
