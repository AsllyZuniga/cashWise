import { useState } from "react";
import { UiButton } from "@asllyzuniga/react-library";
import TransactionForm from "./transactionForm";
import "./Transaction.scss"; // Asegúrate de importar los estilos

export default function Transaction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Contenedor que empuja el botón a la derecha */}
      <div className="transaction-header">
        <UiButton
          className="new-transaction-button react-transaction"
          onClick={() => setIsOpen(true)}
        >
          + Nueva Transacción
        </UiButton>
      </div>

      {/* Modal */}
      <TransactionForm
        externalOpen={isOpen}
        onCloseExternal={() => setIsOpen(false)}
      />
    </>
  );
}
