import { useState, useEffect } from "react";
import {
  UiPanelModal,
  UiInput,
  UiButton,
  UiSelect,
  UiTable,
} from "@asllyzuniga/react-library";
import "./Transaction.scss";
import {
  fetchTransactions,
  fetchSaveTransaction,
  fetchUpdateTransaction,
  fetchDeleteTransaction,
} from "../../services/transactions.service";
import { Transaction } from "../../models/transactions.interface";

interface TransactionFormProps {
  externalOpen?: boolean;
  onCloseExternal?: () => void;
}

interface FormState {
  id?: string;
  concept: string;
  movement: string;
  amount: string;
  paymentMethod: string;
  relation: string;
  date: string;
}

const MOVEMENTS = ["Pago", "Gasto", "Inversión", "Ingreso"];
const METHODS = ["Efectivo", "Tarjeta de crédito", "Transferencia", "Otro"];
const RELATIONS = ["Esenciales", "Bienestar", "Placer", "Aporte"];

const toFormState = (tx: Transaction): FormState => ({
  id: tx.id,
  concept: tx.description || "",
  movement: String(tx.movement),
  amount: String(tx.value),
  paymentMethod: String(tx.methodOfPayment),
  relation: String(tx.relation),
  date: tx.entryDate?.split("T")[0] || "",
});

const toTransaction = (form: FormState, includeId: boolean = false): Transaction => {
  const tx: Transaction = {
    value: Number(form.amount),
    description: form.concept,
    entryDate: form.date + "T00:00:00.000Z",
    movement: Number(form.movement),
    methodOfPayment: Number(form.paymentMethod),
    relation: Number(form.relation),
  };
  if (includeId && form.id) tx.id = form.id;
  return tx;
};

export default function TransactionForm({
  externalOpen,
  onCloseExternal,
}: TransactionFormProps) {
  const [transactions, setTransactions] = useState<FormState[]>([]);
  const [form, setForm] = useState<FormState>({
    concept: "",
    movement: "",
    amount: "",
    paymentMethod: "",
    relation: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (externalOpen) {
      resetForm();
      setEditIndex(null);
      setModalOpen(true);
    }
  }, [externalOpen]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const data = await fetchTransactions(now.getMonth() + 1, now.getFullYear());
      setTransactions(data.map(toFormState));
    } catch (error) {
      console.error("Error cargando transacciones:", error);
      alert("Error al cargar las transacciones.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.concept || !form.amount || !form.paymentMethod || !form.movement || !form.date) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      alert("El valor debe ser un número mayor a 0.");
      return;
    }

    try {
      if (editIndex !== null) {
        const updatedTx = toTransaction(form, true);
        const saved = await fetchUpdateTransaction(updatedTx);
        setTransactions((prev) =>
          prev.map((t, i) => (i === editIndex ? toFormState(saved) : t))
        );
        alert("Transacción actualizada exitosamente.");
      } else {
        const newTx = toTransaction(form, false);
        const saved = await fetchSaveTransaction(newTx);
        setTransactions((prev) => [...prev, toFormState(saved)]);
        alert("Transacción creada exitosamente.");
      }

      await loadTransactions();
      resetForm();
      setModalOpen(false);
      onCloseExternal?.();
    } catch (error: any) {
      console.error("Error guardando transacción:", error);
      alert(`Error al guardar la transacción: ${error.message}`);
    }
  };

  const handleEdit = (index: number) => {
    const selected = transactions[index];
    if (!selected) return;

    setForm({
      id: selected.id,
      concept: selected.concept || "",
      movement: String(selected.movement),
      amount: String(selected.amount),
      paymentMethod: String(selected.paymentMethod),
      relation: String(selected.relation),
      date: selected.date || "",
    });

    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDelete = async (index: number) => {
    const tx = transactions[index];
    if (!tx?.id) {
      alert("No se encontró el ID de la transacción.");
      return;
    }

    if (confirm(`¿Seguro que quieres eliminar "${tx.concept}"?`)) {
      try {
        await fetchDeleteTransaction(tx.id);
        setTransactions((prev) => prev.filter((_, i) => i !== index));
        alert("Transacción eliminada exitosamente.");
      } catch (error: any) {
        alert(`No se pudo eliminar: ${error.message}`);
      }
    }
  };

  const handleChange = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSelectChange = (field: keyof FormState) => (e: any) =>
    handleChange(field, String(e.detail.value));

  const handleInputChange = (field: keyof FormState) => (e: any) =>
    handleChange(field, e.detail.value);

  const resetForm = () => {
    setForm({
      concept: "",
      movement: "",
      amount: "",
      paymentMethod: "",
      relation: "",
      date: "",
    });
    setEditIndex(null);
  };

  const tableData = transactions.map((tx, index) => ({
    ...tx,
    movement: MOVEMENTS[Number(tx.movement) - 1] || tx.movement,
    paymentMethod: METHODS[Number(tx.paymentMethod) - 1] || tx.paymentMethod,
    relation: RELATIONS[Number(tx.relation) - 1] || tx.relation,
    _originalIndex: index,
  }));

  return (
    <>
      <div className="transaction-manager space-y-6">
        <h2 className="text-xl font-bold">Movimientos</h2>

        {loading ? (
          <p>Cargando transacciones...</p>
        ) : (
          <UiTable
            headers={[
              { field: "concept", label: "Concepto" },
              { field: "movement", label: "Movimiento" },
              { field: "amount", label: "Valor" },
              { field: "paymentMethod", label: "Método de Pago" },
              { field: "relation", label: "Relación" },
              { field: "date", label: "Fecha" },
              { field: "actions", label: "Acciones" },
            ]}
            data={tableData}
            templates={{
              actions: (_value: unknown, row: any) => {
                const container = document.createElement("div");
                container.style.display = "flex";
                container.style.gap = "8px";
                container.style.justifyContent = "center";

               
                const editBtn = document.createElement("ui-button");
                editBtn.textContent = "Editar"; 
                editBtn.setAttribute("variant", "primary");
                editBtn.onclick = () => handleEdit(row._originalIndex);
          
                const deleteBtn = document.createElement("ui-button");
                deleteBtn.textContent = "Eliminar";
                deleteBtn.setAttribute("variant", "danger");
                deleteBtn.onclick = () => handleDelete(row._originalIndex);

                container.appendChild(editBtn);
                container.appendChild(deleteBtn);
                return container;
              },
            }}
          />
        )}
      </div>

      {/* ✅ MODAL sin placeholders y con labels externos */}
      <UiPanelModal visible={modalOpen}>
        <div className="modal-header">
          <h2>{editIndex !== null ? "Editar Transacción" : "Nueva Transacción"}</h2>
        </div>

        <div className="modal-body transaction-form">
          <div className="form-group">
            <label htmlFor="concept">Concepto</label>
            <UiInput
              type="text"
              name="concept"
              inputId="concept"
              value={form.concept}
              onValueChange={handleInputChange("concept")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="movement">Movimiento</label>
            <UiSelect
              name="movement"
              options={MOVEMENTS.map((label, idx) => ({
                id: String(idx + 1),
                value: String(idx + 1),
                label,
              }))}
              value={form.movement}
              onValueChange={handleSelectChange("movement")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Valor</label>
            <UiInput
              type="number"
              name="amount"
              inputId="amount"
              value={form.amount}
              onValueChange={handleInputChange("amount")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Método de Pago</label>
            <UiSelect
              name="paymentMethod"
              options={METHODS.map((label, idx) => ({
                id: String(idx + 1),
                value: String(idx + 1),
                label,
              }))}
              value={form.paymentMethod}
              onValueChange={handleSelectChange("paymentMethod")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="relation">Relación</label>
            <UiSelect
              name="relation"
              options={RELATIONS.map((label, idx) => ({
                id: String(idx + 1),
                value: String(idx + 1),
                label,
              }))}
              value={form.relation}
              onValueChange={handleSelectChange("relation")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha</label>
            <UiInput
              type="date"
              name="date"
              inputId="date"
              value={form.date}
              onValueChange={handleInputChange("date")}
            />
          </div>
        </div>

        <div className="modal-footer">
          <UiButton
            className="cancel"
            onClick={() => {
              resetForm();
              setModalOpen(false);
              onCloseExternal?.();
            }}
          >
            Cancelar
          </UiButton>
          <UiButton className="save" onClick={handleSave}>
            {editIndex !== null ? "Actualizar" : "Guardar"}
          </UiButton>
        </div>
      </UiPanelModal>
    </>
  );
}
