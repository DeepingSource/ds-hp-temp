// Keystatic renders its own full-screen admin app; bypass the site's main
// padding so the CMS fills the viewport. Site Header/Footer are hidden on
// /keystatic by HeaderWrapper/FooterWrapper.
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[var(--z-modal)] bg-white">{children}</div>;
}
