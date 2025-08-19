import { useState } from "react";
import { UiPanelModal, UiInput, UiButton } from "../../webComponents";

export default function BudgetModalForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    console.log("Presupuesto guardado:", { value, date });
    onClose();
  };

  return (
    <UiPanelModal visible={isOpen}>
      <div className="modal-header">
        <h2>Agregar presupuesto del mes</h2>
      </div>

      <div className="modal-body space-y-4">
        <div>
          <label className="block mb-1 font-medium">Valor</label>
          <UiInput
            type="number"
            value={value}
            onInput={(e: any) => setValue(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha</label>
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
