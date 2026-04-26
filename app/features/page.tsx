import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

// /features was a section on the home page (#features). Mirror the
// /pricing redirect so URL-bar typists don't 404.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function FeaturesRedirect(): never {
  permanentRedirect("/#features");
}
