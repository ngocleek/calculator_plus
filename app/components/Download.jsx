import React from "react";
import { format } from "date-fns";
import { CiSaveUp2 } from "react-icons/ci";
import { useResults } from "../hooks/useResults";

export default function Download() {
  const { history } = useResults();

  function convertToCSV() {
    let csvContent = "date, time, expression, result\r\n";
    history.forEach((row) => {
      csvContent +=
        [
          format(row.time, "P"),
          format(row.time, "pp"),
          row.expression,
          row.result,
        ].join(", ") + "\r\n";
    });
    return new Blob([csvContent], { type: "text" });
  }
  function downloadFile() {
    const aTag = document.createElement("a"),
      url = URL.createObjectURL(convertToCSV());
    aTag.href = url;
    aTag.download = `cal_history${new Date().toJSON().slice(0, 10)}.csv`;
    document.body.appendChild(aTag);
    aTag.click();
    setTimeout(function () {
      document.body.removeChild(aTag);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  return (
    <CiSaveUp2
      onClick={downloadFile}
      className="relative size-9 fill-current text-gray-400 hover:cursor-pointer hover:scale-110 transition-all duration-200"
    />
  );
}
