import { useState } from "react";
import { UiPanelModal, UiInput, UiButton } from "../../webComponents";

interface FormState {
  value: string;
  date: string;
}

export default function BudgetModalForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    value: "",
    date: "",
  });

  const handleChange = (field: keyof FormState, newValue: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSave = () => {
    console.log("Presupuesto guardado:", form);
    onClose();
  };

  return (
    <UiPanelModal visible={isOpen}>
      <div className="modal-header">
        <h2>Agregar presupuesto del mes</h2>
      </div>

      <div className="modal-body space-y-4">
        <div>
          <label htmlFor="value" className="block mb-1 font-medium">
            Valor
          </label>
          <UiInput
            type="number"
            name="value"
            inputId="value"
            value={form.value}
            onValueChange={(e) => handleChange(e.detail.name, e.detail.value)}
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Fecha
          </label>
          <UiInput
            type="date"
            name="date"
            inputId="date"
            value={form.date}
            onValueChange={(e) => handleChange(e.detail.name, e.detail.value)}
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
