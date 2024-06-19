// src/utils/decompress.ts
import { inflate } from "pako";

export const decompressString = async (zlibString: string) => {
  const zlibData = Uint8Array.from(atob(zlibString), (c) => c.charCodeAt(0));
  const decompressedData = inflate(zlibData, { to: "string" });
  return JSON.parse(decompressedData);
};
