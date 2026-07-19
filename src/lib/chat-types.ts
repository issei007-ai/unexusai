/** Types for the scripted chat. The engine reads these; the script is data. */

export type ChatAnswers = {
  name?: string;
  email?: string;
  phone?: string;
  /** What they're interested in — saved onto the lead as `need`. */
  interest?: string;
  /** Preferred call window — turns the lead into a booking. */
  when?: string;
  /** Preferred call date, stored human-readable e.g. "Tue 21 Jul 2026". */
  date?: string;
};

export type ChatOption = {
  /** Button text the visitor sees. */
  label: string;
  /** Id of the node to jump to (or SUBMIT). */
  next: string;
  /** Shorthand for sets: { interest }. */
  interest?: string;
  /** Merge these answers when the option is clicked. */
  sets?: Partial<ChatAnswers>;
};

export type ChatInput = {
  field: "name" | "email" | "phone" | "date";
  placeholder: string;
  kind: "text" | "email" | "tel" | "date";
  /** Next node id, or SUBMIT to fire the lead. */
  next: string;
};

export type ChatNode = {
  /** Bot bubbles printed on entering. Supports {name} and {when} tokens. */
  bot: string[];
  options?: ChatOption[];
  input?: ChatInput;
};

export type ChatFlow = Record<string, ChatNode>;

/** Sentinel `next` value that submits the collected answers to /api/lead. */
export const SUBMIT = "__submit";

/** Entry node id. */
export const START = "start";

/** Safe node to fall back to if a link is ever broken. */
export const FALLBACK = "start";
