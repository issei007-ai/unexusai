"use client";
import { useState, useEffect } from "react";

const DEFAULT_WORDS = [
  "You're not seeing it in revenue",
  "You're not getting enough leads",
  "You're not showing up on AI search",
];

export default function TypingText({ words }: { words?: string[] }) {
  const WORDS = words && words.length ? words : DEFAULT_WORDS;
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

  // Reserve space for the longest line so the heading never reflows mid-type.
  const longest = WORDS.reduce((a, b) => (b.length > a.length ? b : a), "");

  const cursor = (
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
  );

  return (
    <span style={{ position: "relative", display: "inline-block", textAlign: "center" }}>
      {/* Invisible spacer holds the height/width of the longest line */}
      <span aria-hidden="true" style={{ visibility: "hidden" }}>{longest}</span>
      {/* Animated text overlaid on the reserved space */}
      <span style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
        <span className="text-gradient">{displayed}</span>
        {cursor}
      </span>
    </span>
  );
}
