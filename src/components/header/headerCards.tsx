import { HEADER_CARDS } from "./header.constants";
import { UiCard, UiButton } from "../../webComponents";

export default function HeaderCards() {
  return (
    <>
      {HEADER_CARDS.map((card, index) => (
        <UiCard key={index}>
          <div className="card-content">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content-elements">
              <h3>{card.title}: {card.value}</h3>
              {index === 0 && (
                <UiButton className="btn-agregar">Agregar</UiButton>
              )}
            </div>
          </div>
        </UiCard>
      ))}
    </>
  );
}
