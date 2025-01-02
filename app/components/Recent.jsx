import React, { useContext, useState, useEffect } from "react";

import { ResultsContext } from "../contexts/ResultsContext";
import { format, formatRelative } from "date-fns";
import { Calendar } from "primereact/calendar";
import StyledEquation from "./StyledEquation";
import vi from "date-fns/locale/vi";

function Recent() {
  const { history } = React.useContext(ResultsContext);
  const [dates, setDates] = useState(null);
  const [filteredHistory, setFilteredHistory] = useState(history);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  useEffect(() => {
    if (dates === null) {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter((row) => {
          const current = new Date(format(row.time, "P"));
          const start = new Date(format(dates[0], "P"));
          const end =
            dates[1] !== null ? new Date(format(dates[1], "P")) : start;
          return current >= start && current <= end;
        })
      );
    }
  }, [dates]);

  const formatRelativeLocale = {
    lastWeek: "MM/dd/yyyy",
    yesterday: "'Hôm qua'",
    today: "'Hôm nay'",
    other: "MM/dd/yyyy",
  };

  const locale = {
    ...vi,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  function formatExpression(expression) {
    const parts = expression.split(/([+\-*/])/); // Split by operators

    return parts.map((part, index) => {
      // If it's an operator, add <wbr /> before it
      if (["+", "-", "*", "/"].includes(part)) {
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

  return (
    <>
      <div className="flex flex-col-reverse w-full h-full mb-5 mt-7 overflow-auto font-light text-gray-300">
        <ul className="w-full divide-y divide-gray-700">
          {filteredHistory.map((data, index) => (
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
                  {formatExpression(data.expression)}{" "}
                  <span className="text-white font-medium">
                    = {data.result}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        maxDate={new Date()}
        readOnlyInput
        hideOnRangeSelection
        showButtonBar
        pt={{
          input: { root: "text-center" },
        }}
      />
    </>
  );
}

export default Recent;
