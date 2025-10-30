// src/lib/db/accountDB.ts
import Dexie, { Table } from "dexie";

export interface Account {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  token?: string;
  encrypt?: string;
  lastUsed: Date;
  type: "GOOGLE" | "SECRET";
}

export class AccountDB extends Dexie {
  accounts!: Table<Account, string>;

  constructor() {
    super("AccountDB");
    this.version(2).stores({
      accounts: "id, name, email, lastUsed",
    });
  }
}

export const accountDB = new AccountDB();
