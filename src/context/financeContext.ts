import { createContext, useContext } from "react";
import { Transaction } from "../models/transactions.interface";

export interface FinanceTotals {
  income: number;
  expenses: number;
  savings: number;
  available: number;
}

export interface FinanceContextValue {
  selectedMonth: number;
  selectedYear: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  transactions: Transaction[];
  budget: number;
  totals: FinanceTotals;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setBudget: (value: number, date: string) => void;
}

export const FinanceContext = createContext<FinanceContextValue | undefined>(
  undefined
);

export function useFinance(): FinanceContextValue {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance debe usarse dentro de un FinanceProvider");
  }
  return context;
}
