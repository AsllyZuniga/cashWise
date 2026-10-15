import { useState } from "react";
import { UiPanelModal, UiInput, UiButton } from "@asllyzuniga/react-library";
import { useFinance } from "../../context/financeContext";
import { useToast } from "../../context/toastContext";

interface FormState {
  value: string;
  date: string;
}

const EMPTY_FORM: FormState = { value: "", date: "" };

export default function BudgetModalForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const { setBudget } = useFinance();
  const { showToast } = useToast();

  const handleChange = (field: keyof FormState, newValue: string) => {
    setForm((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSave = () => {
    const value = Number(form.value);

    if (!Number.isFinite(value) || value <= 0) {
      showToast("El presupuesto debe ser un número mayor a 0.", "error");
      return;
    }

    setBudget(value, form.date);
    showToast("Presupuesto guardado exitosamente.", "success");
    setForm(EMPTY_FORM);
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
            inputId="value"
            value={form.value}
            onInputChange={(event) => handleChange("value", event.detail)}
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Fecha
          </label>
          <UiInput
            type="date"
            inputId="date"
            value={form.date}
            onInputChange={(event) => handleChange("date", event.detail)}
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
