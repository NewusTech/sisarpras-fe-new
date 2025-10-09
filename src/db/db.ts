import Dexie, { Table } from "dexie";

export interface CacheItem {
  key: string;
  data: any;
  updatedAt: Date;
  expiresAt?: Date; // optional
}

export interface OutboxItem {
  id?: number;
  url: string;
  data: any;
  method: "POST" | "PUT" | "DELETE";
  synced: string;
  createdAt: Date;
}

export class LocaleDB extends Dexie {
  cache!: Table<CacheItem, string>;
  outbox!: Table<OutboxItem, number>;

  constructor() {
    super("LocaleDB");
    this.version(1).stores({
      cache: "key, expiresAt",
      outbox: "++id, url, method, synced, createdAt",
    });
  }
}

export const db = new LocaleDB();
