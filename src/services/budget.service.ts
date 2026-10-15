const STORAGE_KEY = "cashwise.budget";

export interface BudgetRecord {
  value: number;
  date: string;
}

const EMPTY_BUDGET: BudgetRecord = { value: 0, date: "" };

export const loadBudget = (): BudgetRecord => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_BUDGET;

    const parsed = JSON.parse(raw) as Partial<BudgetRecord>;
    const value = Number(parsed.value);

    return {
      value: Number.isFinite(value) ? value : 0,
      date: typeof parsed.date === "string" ? parsed.date : "",
    };
  } catch {
    return EMPTY_BUDGET;
  }
};

export const saveBudget = (record: BudgetRecord): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
};
