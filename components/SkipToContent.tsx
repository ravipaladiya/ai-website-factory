"use client";

import type { MouseEvent } from "react";

/**
 * Skip-to-content link rendered as the first focusable element of the
 * document. Without JS the anchor still works -- browsers scroll to
 * #main on activation. With JS we additionally move keyboard focus
 * into <main>, so the next Tab continues from inside the page content
 * (otherwise focus stays on the link / document and Tab walks back
 * into the header).
 *
 * Targeting <main id="main"> across the app instead of requiring every
 * page to add tabIndex={-1} keeps the focus management in one place.
 */
export default function SkipToContent() {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (typeof document === "undefined") return;
    const main = document.getElementById("main");
    if (!main) return; // fall through to default hash navigation

    e.preventDefault();
    const hadTabIndex = main.hasAttribute("tabindex");
    if (!hadTabIndex) main.setAttribute("tabindex", "-1");
    // Use preventScroll: false so we still get the visual scroll-to.
    main.focus({ preventScroll: false });
    main.scrollIntoView({ block: "start" });

    if (!hadTabIndex) {
      // Remove the synthetic tabindex once focus moves on so the
      // <main> doesn't sit in the AT tree as a focusable sink.
      const cleanup = () => {
        main.removeAttribute("tabindex");
        main.removeEventListener("blur", cleanup);
      };
      main.addEventListener("blur", cleanup);
    }
  }

  return (
    <a
      href="#main"
      onClick={onClick}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none"
    >
      Skip to content
    </a>
  );
}
