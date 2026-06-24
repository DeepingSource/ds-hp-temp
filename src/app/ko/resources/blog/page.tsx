// /ko/resources/blog — the blog is Korean-only content and is not localized.
// The header/footer/resources-hub prefix nav links with the active locale, so
// without this route /ko/resources/blog 404s. Re-export the canonical blog
// index so the locale-prefixed entry point resolves; article links inside go to
// the unprefixed /resources/blog/<slug> pages, and canonical stays /resources/blog.
import BlogPage, { metadata } from '@/app/resources/blog/page';

export { metadata };
export default BlogPage;
