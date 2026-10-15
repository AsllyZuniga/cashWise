import { beforeEach, describe, expect, it, vi } from "vitest";

const { get, post, put, del } = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
}));

vi.mock("../config/axios", () => ({
  default: {
    get,
    post,
    put,
    delete: del,
  },
}));

import {
  fetchTransactions,
  fetchGraphTotals,
  fetchDeleteTransaction,
} from "./transactions.service";

describe("transactions.service", () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
    put.mockReset();
    del.mockReset();
  });

  it("consulta las transacciones por mes y año", async () => {
    const transactions = [{ id: "1", value: 100 }];
    get.mockResolvedValue({ data: transactions });

    const result = await fetchTransactions(3, 2026);

    expect(get).toHaveBeenCalledWith("/Transaction/3/2026");
    expect(result).toEqual(transactions);
  });

  it("elimina una transacción y devuelve el status", async () => {
    del.mockResolvedValue({ status: 204 });

    const status = await fetchDeleteTransaction("abc");

    expect(del).toHaveBeenCalledWith("/Transaction/abc");
    expect(status).toBe(204);
  });

  it("normaliza totales cuando la API devuelve un arreglo de números", async () => {
    get.mockResolvedValue({ data: [10, 20, 30] });

    const result = await fetchGraphTotals(2026);

    expect(result[0]).toEqual({ month: 1, total: 10 });
    expect(result[2]).toEqual({ month: 3, total: 30 });
  });

  it("normaliza totales con objetos { month, total }", async () => {
    get.mockResolvedValue({ data: [{ month: 5, total: 500 }] });

    const result = await fetchGraphTotals(2026);

    expect(result).toEqual([{ month: 5, total: 500 }]);
  });

  it("normaliza totales cuando la API devuelve un mapa por mes", async () => {
    get.mockResolvedValue({ data: { "1": 100, "2": 200 } });

    const result = await fetchGraphTotals(2026);

    expect(result).toEqual([
      { month: 1, total: 100 },
      { month: 2, total: 200 },
    ]);
  });
});
