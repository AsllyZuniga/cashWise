import "./header.scss";
import { UiSelect } from "@asllyzuniga/react-library";
import HeaderCards from "./headerCards";
import { YEARS_OPTIONS } from "./header.constants";
import { useFinance } from "../../context/financeContext";

export default function Header() {
  const { selectedYear, setYear } = useFinance();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__top">
          <h1 className="header__title">Mis finanzas personales</h1>
          <UiSelect
            className="header__select"
            options={YEARS_OPTIONS}
            value={String(selectedYear)}
            onValueChange={(event) => setYear(Number(event.detail.value))}
          />
        </div>
        <div className="header__cards">
          <HeaderCards />
        </div>
      </div>
    </header>
  );
}
