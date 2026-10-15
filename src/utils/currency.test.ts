import { describe, expect, it } from "vitest";
import { formatCurrency } from "./currency";

describe("formatCurrency", () => {
  it("formatea un número entero con separador de miles", () => {
    expect(formatCurrency(1500)).toBe("$1.500");
  });

  it("redondea los decimales", () => {
    expect(formatCurrency(10.6)).toBe("$11");
  });

  it("formatea el cero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formatea valores negativos", () => {
    expect(formatCurrency(-250)).toBe("$-250");
  });
});
