/**
 * Phone number input. Plain single field (with country code typed inline),
 * lightly validated to look like a phone number to reduce false leads.
 */
export default function PhoneField({ required = true }: { required?: boolean }) {
  return (
    <div>
      <label className="form-label">Phone number</label>
      <input
        className="form-input"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="off"
        required={required}
        pattern="[0-9 ()+\-]{6,20}"
        title="Enter a valid phone number"
      />
    </div>
  );
}
