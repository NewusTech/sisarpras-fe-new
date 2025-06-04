import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatErrorMessages(
  errorData: Record<string, string[] | string>
): string {
  return Object.entries(errorData)
    .map(([field, messages]) => {
      const readableField = field
        .replace(/([A-Z])/g, " $1") // camelCase to space
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

      const text =
        Array.isArray(messages) && messages.length > 0
          ? messages.map((msg) => `• ${readableField}: ${msg}`).join("\n")
          : `• ${readableField}: ${messages}`;

      return text;
    })
    .join("\n");
}
