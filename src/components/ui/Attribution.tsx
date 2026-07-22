"use client";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures campaign attribution (gclid / UTM) once, on first landing. Mounted
 * in the root layout so it fires before the visitor navigates on to a form.
 * Renders nothing.
 */
export default function Attribution() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
