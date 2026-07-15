import DocTranslationNotice from '@/components/docs/DocTranslationNotice';

/**
 * Wraps the product-docs routes (index + all detail pages, incl. /ko·/jp requests
 * rewritten to this base route). Injects the interim en/jp "translation pending"
 * notice for the Korean-only detail pages without touching their content.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocTranslationNotice />
      {children}
    </>
  );
}
