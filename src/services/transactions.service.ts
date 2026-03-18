import api from "../config/axios";
import { Transaction } from "../models/transactions.interface";

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

export const fetchGraphTotals = async (currentYear: number): Promise<any> => {
  const { data } = await api.get(
    `/Transaction/monthlyTotalsByYear/${currentYear}`
  );
  return data;
};
