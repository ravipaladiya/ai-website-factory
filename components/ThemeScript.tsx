const script = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored === 'dark' || (!stored && systemDark);
    document.documentElement.classList.toggle('dark', shouldDark);
  } catch (_) {}
})();`;

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
