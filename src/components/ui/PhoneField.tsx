"use client";
import { useState } from "react";

/**
 * Phone input with a separate, manually-typable country-code box (not a
 * selector). The two visible fields are combined into a hidden `phone` input
 * so the lead arrives as one value, e.g. "+971 50 123 4567".
 */
export default function PhoneField({ required = true }: { required?: boolean }) {
  const [cc, setCc] = useState("+971");
  const [num, setNum] = useState("");
  const combined = `${cc.trim()} ${num.trim()}`.trim();

  return (
    <div>
      <label className="form-label">Phone number</label>
      <div className="flex gap-2">
        <input
          className="form-input"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          aria-label="Country code"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
          placeholder="+971"
          pattern="\+?[0-9]{1,4}"
          title="Country code, e.g. +971"
          style={{ width: 84, flexShrink: 0, textAlign: "center" }}
        />
        <input
          className="form-input"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          aria-label="Phone number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          required={required}
          pattern="[0-9 ()\-]{6,20}"
          title="Enter a valid phone number"
          style={{ flex: 1 }}
        />
      </div>
      <input type="hidden" name="phone" value={combined} />
    </div>
  );
}
