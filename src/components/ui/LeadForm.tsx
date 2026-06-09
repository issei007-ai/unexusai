"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  submitLabel?: string;
  note?: string;
}

/**
 * Client form wrapper. Until the backend is wired (Phase 5), submitting routes
 * to the designed /thank-you page so the flow feels real end-to-end.
 */
export default function LeadForm({ children, submitLabel = "Submit", note }: Props) {
  const router = useRouter();
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/thank-you");
      }}
    >
      {children}
      <button type="submit" className="btn btn-primary btn-lg w-full">
        {submitLabel}
      </button>
      {note && (
        <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>
          {note}
        </p>
      )}
    </form>
  );
}
