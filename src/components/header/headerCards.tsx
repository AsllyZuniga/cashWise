import { useState } from "react";
import { HEADER_CARDS, type HeaderCardId } from "./header.constants";
import { UiCard, UiButton } from "@asllyzuniga/react-library";
import BudgetModalForm from "../budgetModalForm/budgetModalForm";
import { useFinance } from "../../context/financeContext";
import { formatCurrency } from "../../utils/currency";

export default function HeaderCards() {
  const [openModal, setOpenModal] = useState(false);
  const { totals } = useFinance();

  const values: Record<HeaderCardId, string> = {
    available: formatCurrency(totals.available),
    expenses: formatCurrency(totals.expenses),
    savings: formatCurrency(totals.savings),
  };

  return (
    <>
      {HEADER_CARDS.map((card) => (
        <UiCard key={card.id}>
          <div className="card-content">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content-elements">
              <h3>
                {card.title}: {values[card.id]}
              </h3>
              {card.id === "available" && (
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

      <BudgetModalForm isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
