import api from "../config/axios";
import { Transaction } from "../models/transactions.interface";
import { MonthlyTotal } from "../models/graph.interface";

export const fetchTransactions = async (
  month: number,
  year: number
): Promise<Transaction[]> => {
  const { data } = await api.get<Transaction[]>(
    `/Transaction/${month}/${year}`
  );
  return data;
};

export const fetchSaveTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  const { data } = await api.post<Transaction>("/Transaction", transaction);
  return data;
};

export const fetchUpdateTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  const { data } = await api.put<Transaction>("/Transaction", transaction);
  return data;
};

export const fetchDeleteTransaction = async (id: string): Promise<number> => {
  const { status } = await api.delete(`/Transaction/${id}`);
  return status;
};

const toMonthlyTotal = (value: unknown, fallbackMonth: number): MonthlyTotal => {
  if (typeof value === "number") {
    return { month: fallbackMonth, total: value };
  }

  const record = (value ?? {}) as Record<string, unknown>;
  const month = Number(record.month ?? record.mes ?? fallbackMonth);
  const total = Number(record.total ?? record.value ?? record.valor ?? 0);

  return {
    month: Number.isFinite(month) ? month : fallbackMonth,
    total: Number.isFinite(total) ? total : 0,
  };
};

const normalizeMonthlyTotals = (data: unknown): MonthlyTotal[] => {
  if (Array.isArray(data)) {
    return data.map((item, index) => toMonthlyTotal(item, index + 1));
  }

  if (data && typeof data === "object") {
    return Object.entries(data as Record<string, unknown>).map(
      ([key, value]) => toMonthlyTotal(value, Number(key))
    );
  }

  return [];
};

export const fetchGraphTotals = async (
  currentYear: number
): Promise<MonthlyTotal[]> => {
  const { data } = await api.get<unknown>(
    `/Transaction/monthlyTotalsByYear/${currentYear}`
  );
  return normalizeMonthlyTotals(data);
};
