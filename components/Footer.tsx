export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="mx-6 my-12 rounded-2xl border border-white/10 bg-white/[.03] p-5 text-center text-xs text-muted"
    >
      © {new Date().getFullYear()} Atul Singh. Built with care.
    </footer>
  );
}
