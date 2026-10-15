import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Transaction } from "../models/transactions.interface";
import { INCOME_MOVEMENT } from "../models/transactions.constants";
import { fetchTransactions } from "../services/transactions.service";
import { loadBudget, saveBudget } from "../services/budget.service";
import { getErrorMessage } from "../config/axios";
import {
  FinanceContext,
  type FinanceContextValue,
  type FinanceTotals,
} from "./financeContext";

const EMPTY_TOTALS: FinanceTotals = {
  income: 0,
  expenses: 0,
  savings: 0,
  available: 0,
};

export function FinanceProvider({ children }: { children: ReactNode }) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudgetState] = useState<number>(() => loadBudget().value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions(selectedMonth, selectedYear);
      setTransactions(data);
    } catch (err) {
      setError(getErrorMessage(err));
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setBudget = useCallback((value: number, date: string) => {
    saveBudget({ value, date });
    setBudgetState(value);
  }, []);

  const totals = useMemo<FinanceTotals>(() => {
    const base = transactions.reduce<FinanceTotals>((acc, tx) => {
      if (tx.movement === INCOME_MOVEMENT) {
        acc.income += tx.value;
      } else {
        acc.expenses += tx.value;
      }
      return acc;
    }, { ...EMPTY_TOTALS });

    return {
      ...base,
      savings: base.income - base.expenses,
      available: budget - base.expenses,
    };
  }, [transactions, budget]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      selectedMonth,
      selectedYear,
      setMonth: setSelectedMonth,
      setYear: setSelectedYear,
      transactions,
      budget,
      totals,
      loading,
      error,
      refresh,
      setBudget,
    }),
    [
      selectedMonth,
      selectedYear,
      transactions,
      budget,
      totals,
      loading,
      error,
      refresh,
      setBudget,
    ]
  );

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}
