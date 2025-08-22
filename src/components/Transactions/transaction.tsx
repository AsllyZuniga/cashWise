import { useState } from "react";
import { UiButton } from "../../webComponents";
import TransactionForm from "./transactionForm";

export default function Transaction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UiButton
        className="new-transaction-button"
        onClick={() => setIsOpen(true)}
      >
        + Nueva Transacción
      </UiButton>

      <TransactionForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
