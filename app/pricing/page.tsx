import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

// /pricing was a section on the home page (#pricing). Users routinely
// type /pricing into the URL bar -- send them to the section instead
// of 404'ing.
export const metadata: Metadata = {
  // Don't compete with the home page in search; the canonical pricing
  // surface is /#pricing.
  robots: { index: false, follow: true },
};

export default function PricingRedirect(): never {
  permanentRedirect("/#pricing");
}
