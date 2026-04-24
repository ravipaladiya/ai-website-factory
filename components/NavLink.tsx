"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
};

function normalize(path: string): string {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export default function NavLink({
  href,
  className,
  activeClassName,
  children,
}: Props) {
  const pathname = usePathname() ?? "/";
  const isHash = href.startsWith("#") || href.startsWith("/#");
  const isExternal = /^https?:\/\//i.test(href);

  const targetPath = isHash
    ? "/"
    : normalize(href.split("?")[0].split("#")[0]);
  const current = !isHash && !isExternal && normalize(pathname) === targetPath;

  const finalClass = [className, current ? activeClassName : null]
    .filter(Boolean)
    .join(" ");

  if (isExternal) {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={finalClass}
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    return (
      <a href={href} className={finalClass}>
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={finalClass}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </NextLink>
  );
}
