import { useEffect, useState } from "react";

export default function TypewriterText({ words = [] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return undefined;
    }

    const currentWord = words[index];

    if (!reverse && subIndex === currentWord.length) {
      const timeout = window.setTimeout(() => setReverse(true), 1100);
      return () => window.clearTimeout(timeout);
    }

    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((currentIndex) => (currentIndex + 1) % words.length);
      return undefined;
    }

    const timeout = window.setTimeout(
      () => setSubIndex((current) => current + (reverse ? -1 : 1)),
      reverse ? 45 : 90,
    );

    return () => window.clearTimeout(timeout);
  }, [index, reverse, subIndex, words]);

  if (!words.length) {
    return null;
  }

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      <span>{words[index].substring(0, subIndex)}</span>
      <span className="ml-1 inline-block h-7 w-[2px] animate-pulse bg-accent" />
    </span>
  );
}
