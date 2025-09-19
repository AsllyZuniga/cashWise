import { useState } from "react";
import { UiPanelModal, UiInput, UiButton, UiSelect, UiTable } from "../../webComponents";
import "./Transaction.scss";

interface FormState {
  concept: string;
  movement: string;
  amount: string;
  paymentMethod: string;
  relation: string;
  date: string;
}

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<FormState[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addTransaction = (transaction: FormState) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <div className="transaction-manager space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Movimientos</h2>
        {/* Botón principal para abrir modal */}
        <UiButton onClick={() => setIsOpen(true)}>+ Nueva transacción</UiButton>
      </div>

      {/* Tabla de movimientos */}
      <UiTable
        headers={[
          { field: "date", label: "Fecha de ingreso" },
          { field: "concept", label: "Descripción" },
          { field: "movement", label: "Movimiento" },
          { field: "amount", label: "Valor" },
          { field: "paymentMethod", label: "Método de pago" },
          { field: "relation", label: "Relación" },
        ]}
        data={transactions}
      />

      {/* Modal con formulario */}
      <TransactionForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={addTransaction}
      />
    </div>
  );
}

function TransactionForm({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>({
    concept: "",
    movement: "",
    amount: "",
    paymentMethod: "",
    relation: "",
    date: "",
  });

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: keyof FormState) => (e: any) => {
    handleChange(field, String(e.detail.value));
  };

  const handleInputChange = (field: keyof FormState) => (e: any) => {
    handleChange(field, e.detail.value);
  };

  const handleSave = () => {
    onSave(form);
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
