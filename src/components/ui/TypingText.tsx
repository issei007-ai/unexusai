"use client";
import { useState, useEffect } from "react";

const WORDS = [
  "intelligent marketing",
  "AI automation",
  "compound growth",
  "real results",
];

export default function TypingText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Typing logic
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        55
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        28
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span>
      <span className="text-gradient-flow">{displayed}</span>
      <span
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.85em",
          background: "var(--color-accent-400)",
          marginLeft: "3px",
          verticalAlign: "middle",
          borderRadius: "2px",
          opacity: blink ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}
