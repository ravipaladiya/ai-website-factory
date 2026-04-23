import { MDXRemote } from "next-mdx-remote/rsc";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function H2({ children }: { children?: React.ReactNode }) {
  const id = typeof children === "string" ? slugify(children) : undefined;
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children?: React.ReactNode }) {
  const id = typeof children === "string" ? slugify(children) : undefined;
  return (
    <h3
      id={id}
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight"
    >
      {children}
    </h3>
  );
}

const components = {
  h2: H2,
  h3: H3,
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="mt-5 text-[1.0625rem] leading-[1.75] text-black/85 dark:text-white/85"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mt-4 ml-5 list-disc space-y-2 text-[1.0625rem] leading-[1.75] text-black/85 marker:text-brand-500 dark:text-white/85"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-4 ml-5 list-decimal space-y-2 text-[1.0625rem] leading-[1.75] text-black/85 marker:text-brand-500 dark:text-white/85"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/10"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="mt-5 overflow-x-auto rounded-xl bg-[#0b0e1a] p-4 font-mono text-[13px] leading-relaxed text-emerald-200/90 shadow-inner"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-black/95 dark:text-white/95" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-5 border-l-2 border-brand-500/40 pl-4 text-black/70 dark:text-white/70"
      {...props}
    />
  ),
};

export default function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
