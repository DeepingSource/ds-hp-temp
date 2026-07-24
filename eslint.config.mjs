import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Animation / mockup / interactive-demo layer: these SSG mockups intentionally
  // drive time- and scroll-based state (and refs) from effects, which the new
  // react-hooks rules flag. Downgraded to warnings here (still visible, but
  // non-blocking) per the cleanup decision — see CLEANUP_REVIEW.md §E.
  {
    files: [
      "src/components/mockups/**/*.{ts,tsx}",
      "src/components/sections/**/*.{ts,tsx}",
      "src/components/industries/**/*.{ts,tsx}",
      "src/components/ui/{CountUp,IosStatusBar,IpadStatusBar}.tsx",
      "src/hooks/{useScrollAnimation,useCountUp,useMockupLoop}.{ts,tsx}",
      "src/lib/mockup-time.ts",
      "src/app/storeagent/blog/BlogContent.tsx",
      "src/components/blog/ArticleRenderer.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/error-boundaries": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Nested standalone project (own git history) — not part of this app.
    "Hompage/**",
    // Archived dead code (MM 1-⑩ — 빌드 그래프 밖, 유지보수 대상 아님).
    "src/components/_archive/**",
  ]),
]);

export default eslintConfig;
