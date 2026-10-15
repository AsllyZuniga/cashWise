import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MonthSelector from "./monthSelector";
import { FinanceProvider } from "../../context/FinanceProvider";

vi.mock("../../services/transactions.service", () => ({
  fetchTransactions: vi.fn().mockResolvedValue([]),
}));

describe("MonthSelector", () => {
  it("renderiza los doce meses", async () => {
    render(
      <FinanceProvider>
        <MonthSelector />
      </FinanceProvider>
    );

    expect(await screen.findByText("Ene")).toBeInTheDocument();
    expect(screen.getByText("Dic")).toBeInTheDocument();
  });
});
