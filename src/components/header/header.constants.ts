import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";

export type HeaderCardId = "available" | "expenses" | "savings";

export interface HeaderCardConfig {
  id: HeaderCardId;
  image: string;
  title: string;
}

export const HEADER_CARDS: HeaderCardConfig[] = [
  {
    id: "available",
    image: img1,
    title: "Puedes gastar",
  },
  {
    id: "expenses",
    image: img2,
    title: "Gasto total",
  },
  {
    id: "savings",
    image: img3,
    title: "Vas ahorrando",
  },
];

export const YEARS_OPTIONS = Array.from(
  { length: 6 },
  (_, index) => new Date().getFullYear() - index
).map((year) => ({
  id: String(year),
  value: String(year),
  label: String(year),
}));
