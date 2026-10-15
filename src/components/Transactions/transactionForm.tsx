import { useCallback, useEffect, useRef, useState } from "react";
import {
  UiPanelModal,
  UiInput,
  UiButton,
  UiSelect,
  UiTable,
} from "@asllyzuniga/react-library";
import "./transaction.scss";
import {
  fetchSaveTransaction,
  fetchUpdateTransaction,
  fetchDeleteTransaction,
} from "../../services/transactions.service";
import { Transaction } from "../../models/transactions.interface";
import {
  MOVEMENTS,
  METHODS,
  RELATIONS,
} from "../../models/transactions.constants";
import { useFinance } from "../../context/financeContext";
import { useToast } from "../../context/toastContext";
import { getErrorMessage } from "../../config/axios";

interface TransactionFormProps {
  externalOpen?: boolean;
  onCloseExternal?: () => void;
}

interface FormState {
  concept: string;
  movement: string;
  amount: string;
  paymentMethod: string;
  relation: string;
  date: string;
}

interface TableRow extends FormState {
  id?: string;
}

const EMPTY_FORM: FormState = {
  concept: "",
  movement: "",
  amount: "",
  paymentMethod: "",
  relation: "",
  date: "",
};

const toFormState = (tx: Transaction): FormState => ({
  concept: tx.description || "",
  movement: String(tx.movement),
  amount: String(tx.value),
  paymentMethod: String(tx.methodOfPayment),
  relation: String(tx.relation),
  date: tx.entryDate?.split("T")[0] || "",
});

const toTransaction = (form: FormState, id?: string): Transaction => {
  const tx: Transaction = {
    value: Number(form.amount),
    description: form.concept,
    entryDate: form.date + "T00:00:00.000Z",
    movement: Number(form.movement),
    methodOfPayment: Number(form.paymentMethod),
    relation: Number(form.relation),
  };
  if (id) tx.id = id;
  return tx;
};

const buildOptions = (labels: string[]) =>
  labels.map((label, index) => ({
    id: String(index + 1),
    value: String(index + 1),
    label,
  }));

export default function TransactionForm({
  externalOpen,
  onCloseExternal,
}: TransactionFormProps) {
  const { transactions, loading, error, refresh } = useFinance();
  const { showToast, confirm } = useToast();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalOpen) {
      setForm(EMPTY_FORM);
      setEditingId(null);
      setModalOpen(true);
    }
  }, [externalOpen]);

  const handleEdit = useCallback(
    (id: string) => {
      const selected = transactions.find((tx) => tx.id === id);
      if (!selected) return;

      setForm(toFormState(selected));
      setEditingId(id);
      setModalOpen(true);
    },
    [transactions]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const selected = transactions.find((tx) => tx.id === id);
      if (!selected) return;

      const accepted = await confirm(
        `¿Seguro que quieres eliminar "${selected.description}"?`
      );
      if (!accepted) return;

      try {
        await fetchDeleteTransaction(id);
        await refresh();
        showToast("Transacción eliminada exitosamente.", "success");
      } catch (error) {
        showToast(`No se pudo eliminar: ${getErrorMessage(error)}`, "error");
      }
    },
    [transactions, confirm, refresh, showToast]
  );

  useEffect(() => {
    const node = tableRef.current;
    if (!node) return;

    const onClick = (event: Event) => {
      const target = event
        .composedPath()
        .find(
          (element): element is HTMLElement =>
            element instanceof HTMLElement &&
            element.dataset?.action !== undefined
        );
      if (!target) return;

      const { action, id } = target.dataset;
      if (!id) return;

      if (action === "edit") handleEdit(id);
      if (action === "delete") void handleDelete(id);
    };

    node.addEventListener("click", onClick);
    return () => node.removeEventListener("click", onClick);
  }, [handleEdit, handleDelete]);

  const handleSave = async () => {
    const required: (keyof FormState)[] = [
      "concept",
      "amount",
      "paymentMethod",
      "movement",
      "date",
    ];
    const missing = required.find((field) => !form[field]);

    if (missing) {
      showToast("Por favor completa todos los campos requeridos.", "error");
      return;
    }

    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) {
      showToast("El valor debe ser un número mayor a 0.", "error");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await fetchUpdateTransaction(toTransaction(form, editingId));
        showToast("Transacción actualizada exitosamente.", "success");
      } else {
        await fetchSaveTransaction(toTransaction(form));
        showToast("Transacción creada exitosamente.", "success");
      }

      await refresh();
      closeModal();
    } catch (error) {
      showToast(`Error al guardar: ${getErrorMessage(error)}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const closeModal = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModalOpen(false);
    onCloseExternal?.();
  };

  const tableData: TableRow[] = transactions.map((tx) => ({
    id: tx.id,
    ...toFormState(tx),
  }));

  const actionTemplate = (_value: unknown, row: TableRow) => {
    if (!row.id) return "";

    const base =
      "border:none;border-radius:6px;padding:6px 12px;font-size:13px;cursor:pointer;color:#fff;";

    return `<div style="display:flex;gap:8px;justify-content:center;">
      <button type="button" data-action="edit" data-id="${row.id}" style="${base}background:#2563eb;">Editar</button>
      <button type="button" data-action="delete" data-id="${row.id}" style="${base}background:#dc2626;">Eliminar</button>
    </div>`;
  };

  return (
    <>
      <div className="transaction-manager space-y-6">
        <h2 className="text-xl font-bold">Movimientos</h2>

        <div ref={tableRef}>
          {loading ? (
            <p>Cargando transacciones...</p>
          ) : error ? (
            <p className="transaction-manager__error">
              No se pudieron cargar las transacciones: {error}
            </p>
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
              data={tableData.map((row) => ({
                ...row,
                movement: MOVEMENTS[Number(row.movement) - 1] || row.movement,
                paymentMethod:
                  METHODS[Number(row.paymentMethod) - 1] || row.paymentMethod,
                relation: RELATIONS[Number(row.relation) - 1] || row.relation,
              }))}
              templates={{ actions: actionTemplate }}
            />
          )}
        </div>
      </div>

      <UiPanelModal visible={modalOpen}>
        <div className="modal-header">
          <h2>{editingId ? "Editar Transacción" : "Nueva Transacción"}</h2>
        </div>

        <div className="modal-body transaction-form">
          <div className="form-group">
            <label htmlFor="concept">Concepto</label>
            <UiInput
              type="text"
              inputId="concept"
              value={form.concept}
              onInputChange={(event) => handleChange("concept", event.detail)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="movement">Movimiento</label>
            <UiSelect
              name="movement"
              options={buildOptions(MOVEMENTS)}
              value={form.movement}
              onValueChange={(event) =>
                handleChange("movement", String(event.detail.value))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Valor</label>
            <UiInput
              type="number"
              inputId="amount"
              value={form.amount}
              onInputChange={(event) => handleChange("amount", event.detail)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Método de Pago</label>
            <UiSelect
              name="paymentMethod"
              options={buildOptions(METHODS)}
              value={form.paymentMethod}
              onValueChange={(event) =>
                handleChange("paymentMethod", String(event.detail.value))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="relation">Relación</label>
            <UiSelect
              name="relation"
              options={buildOptions(RELATIONS)}
              value={form.relation}
              onValueChange={(event) =>
                handleChange("relation", String(event.detail.value))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha</label>
            <UiInput
              type="date"
              inputId="date"
              value={form.date}
              onInputChange={(event) => handleChange("date", event.detail)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <UiButton className="cancel" onClick={closeModal} disabled={saving}>
            Cancelar
          </UiButton>
          <UiButton className="save" onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
          </UiButton>
        </div>
      </UiPanelModal>
    </>
  );
}
