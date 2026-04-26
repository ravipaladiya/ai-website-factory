// Next.js can't trace the `runtime` segment-config field through a
// re-export, so it has to be declared as a literal in this file.
export const runtime = "nodejs";

export {
  default,
  alt,
  size,
  contentType,
  generateStaticParams,
} from "./opengraph-image";
