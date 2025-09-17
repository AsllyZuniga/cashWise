import { useState, useEffect } from "react";
import { UiPanelModal, UiInput, UiButton, UiSelect } from "../../webComponents";
import "./Transaction.scss";

interface FormState {
  concept: string;
  movement: string;
  amount: string;
  paymentMethod: string;
  relation: string;
  date: string;
}

export default function TransactionForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    concept: "",
    movement: "",
    amount: "",
    paymentMethod: "",
    relation: "",
    date: "",
  });

  const handleChange = (field: keyof FormState, newValue: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  // Manejador específico para UiSelect que usa el evento personalizado
  const handleSelectChange = (field: keyof FormState) => (e: any) => {
    console.log(`Cambio en ${field}:`, e.detail);
    handleChange(field, String(e.detail.value));
  };

  // Manejador específico para UiInput que usa el evento personalizado
  const handleInputChange = (field: keyof FormState) => (e: any) => {
    console.log(`Cambio en ${field}:`, e.detail);
    handleChange(field, e.detail.value);
  };

  // 🧹 limpiar campos cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setForm({
        concept: "",
        movement: "",
        amount: "",
        paymentMethod: "",
        relation: "",
        date: "",
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    console.log("Nueva transacción:", form);

    // 🧹 limpiar al guardar
    setForm({
      concept: "",
      movement: "",
      amount: "",
      paymentMethod: "",
      relation: "",
      date: "",
    });

    onClose();
  };

  return (
    <UiPanelModal visible={isOpen}>
      <div className="modal-header">
        <h2>Nueva transacción</h2>
      </div>

      <div className="modal-body transaction-form space-y-4">
        {/* Concepto */}
        <div>
          <label htmlFor="concept" className="block mb-1 font-medium">
            Concepto
          </label>
          <UiInput
            type="text"
            name="concept"
            inputId="concept"
            value={form.concept}
            onValueChange={handleInputChange("concept")}
          />
        </div>

        {/* Movimiento con UiSelect */}
        <UiSelect
          name="movement"
          label="Movimiento"
          options={[
            { id: "1", value: "pago", label: "Pago" },
            { id: "2", value: "gasto", label: "Gasto" },
            { id: "3", value: "inversion", label: "Inversión" },
            { id: "4", value: "ingreso", label: "Ingreso" },
          ]}
          value={form.movement}
          onValueChange={handleSelectChange("movement")}
        />

        {/* Valor */}
        <div>
          <label htmlFor="amount" className="block mb-1 font-medium">
            Valor
          </label>
          <UiInput
            type="number"
            name="amount"
            inputId="amount"
            value={form.amount}
            onValueChange={handleInputChange("amount")}
          />
        </div>

        {/* Método de pago con UiSelect */}
        <UiSelect
          name="paymentMethod"
          label="Método de pago"
          options={[
            { id: "1", value: "efectivo", label: "Efectivo" },
            { id: "2", value: "tarjeta", label: "Tarjeta de crédito" },
            { id: "3", value: "transferencia", label: "Transferencia" },
            { id: "4", value: "otro", label: "Otro" },
          ]}
          value={form.paymentMethod}
          onValueChange={handleSelectChange("paymentMethod")}
        />

        {/* Relación con UiSelect */}
        <UiSelect
          name="relation"
          label="Relación"
          options={[
            { id: "1", value: "esenciales", label: "Esenciales" },
            { id: "2", value: "bienestar", label: "Bienestar" },
            { id: "3", value: "placer", label: "Placer" },
            { id: "4", value: "aporte", label: "Aporte" },
          ]}
          value={form.relation}
          onValueChange={handleSelectChange("relation")}
        />

        {/* Fecha */}
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Fecha
          </label>
          <UiInput
            type="date"
            name="date"
            inputId="date"
            value={form.date}
            onValueChange={handleInputChange("date")}
          />
        </div>
      </div>

      <div className="modal-footer flex gap-2 justify-end">
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