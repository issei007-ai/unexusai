/**
 * Splits a heading into word spans for the motion layer. The words stay real
 * text in the server HTML (same string, same spaces), so crawlers and screen
 * readers read the heading exactly as before.
 */
export default function LxSplit({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="lx-w" style={{ ["--i" as string]: from + i }}>
            <span>{w}</span>
          </span>
        </span>
      ))}
    </>
  );
}
