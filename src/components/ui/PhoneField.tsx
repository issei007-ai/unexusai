"use client";
import { useState } from "react";

// Dial codes — markets we serve first, then common ones.
const CODES = ["+971", "+91", "+966", "+1", "+44", "+61", "+65", "+92", "+880", "+49", "+33", "+20"];

/**
 * Country-code selector + digits-only number input. Both submit by name
 * (countryCode, phone) so the lead pipeline captures the dialing code too.
 */
export default function PhoneField({ required = true }: { required?: boolean }) {
  const [num, setNum] = useState("");
  return (
    <div>
      <label className="form-label">Phone number</label>
      <div className="flex gap-2">
        <select
          name="countryCode"
          defaultValue="+971"
          aria-label="Country code"
          className="form-select"
          style={{ width: "5.75rem", flexShrink: 0, paddingLeft: "0.7rem", paddingRight: "1.3rem" }}
        >
          {CODES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          className="form-input"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          required={required}
          minLength={6}
          maxLength={15}
          value={num}
          onChange={(e) => setNum(e.target.value.replace(/[^0-9]/g, ""))}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
}
