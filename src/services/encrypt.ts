"use server";

import crypto from "crypto";

const SECRET_KEY = Buffer.from(process.env.CRYPTO_SECRET_KEY || "", "hex");

if (SECRET_KEY.length !== 32) {
  throw new Error("CRYPTO_SECRET_KEY harus 32-byte (64 karakter hex)");
}

export const encryptText = async (text: string): Promise<string> => {
  const iv = crypto.randomBytes(16); // IV unik tiap enkripsi
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decryptText = async (data: string): Promise<string> => {
  const [ivHex, encryptedData] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto?.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
