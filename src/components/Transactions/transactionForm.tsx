import { useState, useEffect } from "react";
import { UiPanelModal, UiInput, UiButton } from "../../webComponents";
import "./Transaction.scss";

export default function TransactionForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [concept, setConcept] = useState("");
  const [movement, setMovement] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [relation, setRelation] = useState("");
  const [date, setDate] = useState("");

  // 🧹 limpiar campos cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setConcept("");
      setMovement("");
      setAmount("");
      setPaymentMethod("");
      setRelation("");
      setDate("");
    }
  }, [isOpen]);

  const handleSave = () => {
    console.log("Nueva transacción:", {
      concept,
      movement,
      amount,
      paymentMethod,
      relation,
      date,
    });

    // 🧹 limpiar al guardar
    setConcept("");
    setMovement("");
    setAmount("");
    setPaymentMethod("");
    setRelation("");
    setDate("");

    onClose();
  };

  return (
    <UiPanelModal visible={isOpen}>
      <div className="modal-header">
        <h2>Nueva transacción</h2>
      </div>

      <div className="modal-body transaction-form">
        <div className="form-group">
          <label>Concepto</label>
          <UiInput
            type="text"
            value={concept}
            onInput={(e: any) => setConcept(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Movimiento</label>
          <select
            className="custom-select"
            value={movement}
            onChange={(e) => setMovement(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="pago">Pago</option>
            <option value="gasto">Gasto</option>
            <option value="inversion">Inversión</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </div>

        <div className="form-group">
          <label>Valor</label>
          <UiInput
            type="number"
            value={amount}
            onInput={(e: any) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Método de pago</label>
          <select
            className="custom-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="transferencia">Transferencia</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Relación</label>
          <select
            className="custom-select"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="esenciales">Esenciales</option>
            <option value="bienestar">Bienestar</option>
            <option value="placer">Placer</option>
            <option value="aporte">Aporte</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <UiInput
            type="date"
            value={date}
            onInput={(e: any) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="modal-footer">
        <UiButton className="cancel" onClick={onClose}>
          Cancelar
        </UiButton>
        <UiButton className="save" onClick={handleSave}>
          Guardar
        </UiButton>
      </div>
    </UiPanelModal>
  );
}
