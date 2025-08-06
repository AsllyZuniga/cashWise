import "./header.scss";
import { UiSelect } from "../../webComponents";
import HeaderCards from "./headerCards";
import { YEARS_OPTIONS } from "./header.constants";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__top">
            <h1 className="header__title">Mis finanzas personales</h1>
            <UiSelect className="header__select" options={YEARS_OPTIONS} />
          </div>
          <div className="header__cards">
            <HeaderCards />
          </div>
        </div>
      </header>
    </>
  );
}
