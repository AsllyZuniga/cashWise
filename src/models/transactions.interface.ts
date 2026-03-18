// src/models/transactions.interface.ts
export interface Transaction {
  id?: string;
  value: number;
  description: string;
  entryDate: string;
  movement: number;
  methodOfPayment: number;
  relation: number;
}
