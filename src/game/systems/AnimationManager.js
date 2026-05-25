export const popTransition = {
  type: "spring",
  stiffness: 420,
  damping: 18,
};

export const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.28 },
};
