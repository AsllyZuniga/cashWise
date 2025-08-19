import { useState } from "react";
import "./monthselector.scss";
import { MONTHS_OPTIONS } from "./monthSelector.constansts";
import { UiButton } from "../../webComponents";

export default function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div className="month-selector">
      {MONTHS_OPTIONS.map((month) => (
        <UiButton
          key={month.value}
          className={`month-selector__button ${
            selectedMonth === month.value ? "active" : ""
          }`}
          onClick={() => setSelectedMonth(month.value)}
        >
          {month.label}
        </UiButton>
      ))}
    </div>
  );
}
