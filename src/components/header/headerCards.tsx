import { useState } from "react";
import { HEADER_CARDS } from "./header.constants";
import { UiCard, UiButton } from "../../webComponents";
import BudgetModalForm from "../budgetModalForm/budgetModalForm";

export default function HeaderCards() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {HEADER_CARDS.map((card, index) => (
        <UiCard key={index}>
          <div className="card-content">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content-elements">
              <h3>
                {card.title}: {card.value}
              </h3>
              {index === 0 && (
                <UiButton
                  className="btn-agregar"
                  onClick={() => setOpenModal(true)}
                >
                  Agregar
                </UiButton>
              )}
            </div>
          </div>
        </UiCard>
      ))}

      {/* Modal */}
      <BudgetModalForm isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
