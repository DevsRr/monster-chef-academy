export function supportsTouch() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export function normalizePointerPosition(event, element) {
  const rect = element.getBoundingClientRect();
  const pointer = event.touches?.[0] || event;
  return {
    x: pointer.clientX - rect.left,
    y: pointer.clientY - rect.top,
  };
}
