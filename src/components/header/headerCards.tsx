import { HEADER_CARDS } from './header.constants';
import { UiCard, UiButton } from '../../webComponents';

export default function HeaderCards() {
  return (
    <>
      {HEADER_CARDS.map((card, index) => (
        <UiCard key={index}>
          <div className="card-content">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-text">
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          </div>

          {index === 0 && (
            <div slot="footer">
              <UiButton>Agregar</UiButton>
            </div>
          )}
        </UiCard>
      ))}
    </>
  );
}
