import { beforeEach, describe, expect, it } from "vitest";
import { loadBudget, saveBudget } from "./budget.service";

describe("budget.service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("devuelve un presupuesto vacío cuando no hay datos", () => {
    expect(loadBudget()).toEqual({ value: 0, date: "" });
  });

  it("guarda y recupera un presupuesto", () => {
    saveBudget({ value: 250000, date: "2026-01-01" });

    expect(loadBudget()).toEqual({ value: 250000, date: "2026-01-01" });
  });

  it("tolera datos corruptos en el almacenamiento", () => {
    localStorage.setItem("cashwise.budget", "{no-json");

    expect(loadBudget()).toEqual({ value: 0, date: "" });
  });
});
