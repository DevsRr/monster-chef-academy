import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(value) {
  if (!value) {
    return "Recently";
  }

  if (typeof value === "object") {
    return "Syncing...";
  }

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function getTimestampValue(value) {
  return typeof value === "number" ? value : 0;
}

export function formatList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
