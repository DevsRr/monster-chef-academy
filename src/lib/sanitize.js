import DOMPurify from "dompurify";

export function sanitizeText(value) {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

export function sanitizeMultilineText(value) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
    .replace(/\r\n/g, "\n")
    .trim();
}
