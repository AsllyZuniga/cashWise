import "./monthSelector.scss";
import { MONTHS_OPTIONS } from "./monthSelector.constants";
import { UiButton } from "@asllyzuniga/react-library";
import { useFinance } from "../../context/financeContext";

export default function MonthSelector() {
  const { selectedMonth, setMonth } = useFinance();

  return (
    <div className="month-selector">
      {MONTHS_OPTIONS.map((month) => (
        <UiButton
          key={month.value}
          className={`month-selector__button ${
            selectedMonth === Number(month.value) ? "active" : ""
          }`}
          onClick={() => setMonth(Number(month.value))}
        >
          {month.label}
        </UiButton>
      ))}
    </div>
  );
}
