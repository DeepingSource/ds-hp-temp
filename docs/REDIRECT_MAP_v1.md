# REDIRECT_MAP v1 — 구 사이트 → 신 IA (자동 생성 · [1-1])

> 생성: scripts/verify-redirects.mjs · 구 사이트 크롤 163 URL (https://www.deepingsource.io)

## 검증
- 정적 대조: `node scripts/verify-redirects.mjs` — 전 구 URL이 route(동일 경로) 또는 redirect로 커버됨, 누락 0.
- HTTP 검증: 프로덕션 빌드 서버 대상 `node scripts/verify-redirects.mjs --http http://localhost:3100` — 163 URL 전부 200(1홉 이하) / 외부 앱 리다이렉트, **2홉·404 0건**.
- 재크롤: `node scripts/crawl-old-site.mjs` (sitemap이 application/rss+xml로 서빙돼도 `<loc>` 추출).

## 정책
- **www→apex**: DNS/Vercel 도메인 레벨 처리(코드 아님). 신 canonical = apex(deepingsource.io).
- **로케일 프리픽스**: 구 사이트가 `/ko/`·`/jp/`를 써서, 기존 non-prefixed 규칙에 `:locale(ko|jp)` 미러를 추가(next.config.ts).
- **pi-manual**: 구 store insight 대시보드 매뉴얼. 구 slug가 신 docs 컬렉션과 불일치 → 404 방지로 `/products/saai-insight`(기능 17종 섹션)로 보냄.
- **시스템 페이지**(`/access-denied`·`/search`·`/untitled/*`): 신 사이트에 없음 → 홈으로.
- **인증**(`/log-in` 등): `app.deepingsource.io`로(302, 로케일 무관).

| 구 URL | 상태 | 새 URL | 방식 |
|---|---|---|---|
| `/` | route | `/` | 동일 경로 존재(200) |
| `/about-us` | redirect | `(next.config)` | redirect: /about-us |
| `/access-denied` | redirect | `(next.config)` | redirect: /access-denied |
| `/blog` | redirect | `(next.config)` | redirect: /blog |
| `/career` | redirect | `(next.config)` | redirect: /career |
| `/contact` | route | `/contact` | 동일 경로 존재(200) |
| `/jp` | route | `/jp` | 동일 경로 존재(200) |
| `/jp/about-us` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/about-us |
| `/jp/access-denied` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/access-denied |
| `/jp/blog` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/blog |
| `/jp/career` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/career |
| `/jp/contact` | route | `/jp/contact` | 동일 경로 존재(200) |
| `/jp/log-in` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/log-in |
| `/jp/news` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/news |
| `/jp/pi-docs` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-docs |
| `/jp/pi-manual/heatmap-by-time-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/inter-zone-traffic-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/line-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/login` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/main-path-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/seoljeong-kategori-teseuteu` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/visitor-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/visitor-path-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/pi-manual/zone-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/jp/post/adapting-to-ai-company-work-as-a-new-employee` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/all-products-are-experience-goods` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/deeping-source-pioneering-privacy-centric-retail-optimization-in-the-age-of-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/deeping-sources-commitment-to-safe-ai-achieving-soc2-type-2-certification` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/diving-deeper-how-heatmaps-dwell-time-and-attention-maps-revolutionize-retail-insights` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/enhancing-holiday-retail-strategy-with-advanced-vision-ai-technology` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/enhancing-retail-strategy-with-ab-test` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/how-ai-discovers-my-preferences-the-rise-of-intelligent-retail-systems` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/how-we-measure-the-experience-of-a-visiting-customer-in-a-store-visit-pass-stay-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/innovative-anonymization-how-deeping-source-enhances-ml-model-performance-2` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/knowledge-assembly` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/navigating-the-privacy-ai-paradox-with-seal` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/plus-insight-dashboard-zone-interest-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/privacy-in-machine-learning-applications-how-deeping-source-tackles-privacy-while-preserving-utility` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/seal-a-solution-for-compliance-with-the-eu-ai-act-and-gdpr` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/setting-ourselves-apart-actionable-insights-redefining-retail-with-computer-vision-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/the-birth-of-deeping-source` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/the-key-to-pleasant-brick-and-mortar-experiences` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/vision-ai-the-secret-ingredient-to-recapturing-missed-sales-opportunities-in-hypermarkets` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/why-anonymized-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/post/why-plus-insight-is-the-plus-your-business-needs-transforming-data-into-decisions` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/jp/privacy` | route | `/jp/privacy` | 동일 경로 존재(200) |
| `/jp/reset-password` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/reset-password |
| `/jp/seal` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/seal |
| `/jp/search` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/search |
| `/jp/sign-up` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/sign-up |
| `/jp/store-insight` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/store-insight |
| `/jp/storeagent` | route | `/jp/storeagent` | 동일 경로 존재(200) |
| `/jp/tech-anonymizer` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-anonymizer |
| `/jp/tech-spatial-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-spatial-ai |
| `/jp/tech-store-care-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-store-care-ai |
| `/jp/untitled/untitled-2` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/untitled/:path* |
| `/jp/update-password` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/update-password |
| `/jp/user-account` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/user-account |
| `/ko` | route | `/ko` | 동일 경로 존재(200) |
| `/ko/about-us` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/about-us |
| `/ko/access-denied` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/access-denied |
| `/ko/blog` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/blog |
| `/ko/career` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/career |
| `/ko/contact` | route | `/ko/contact` | 동일 경로 존재(200) |
| `/ko/log-in` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/log-in |
| `/ko/news` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/news |
| `/ko/pi-docs` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-docs |
| `/ko/pi-manual/heatmap-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/heatmap-by-time-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/heatmapbytime-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/inter-zone-traffic-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/line-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/login` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/main-path-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/seoljeong-kategori-teseuteu` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/visitor-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/visitor-path-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/pi-manual/zone-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/pi-manual/:slug* |
| `/ko/post/2024-nextrise-awards-deepingsource` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/2024-nextrise-awards-deepingsource-2` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/adapting-to-ai-company-work-as-a-new-employee` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/all-products-are-experience-goods` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/deeping-source-pioneering-privacy-centric-retail-optimization-in-the-age-of-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/deeping-source-story-about-deeping-source-not-dipping-source` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/deeping-sources-commitment-to-safe-ai-achieving-soc2-type-2-certification` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/diving-deeper-how-heatmaps-dwell-time-and-attention-maps-revolutionize-retail-insights` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/enhancing-holiday-retail-strategy-with-advanced-vision-ai-technology` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/enhancing-retail-strategy-with-ab-test` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/how-ai-discovers-my-preferences-the-rise-of-intelligent-retail-systems` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/how-we-measure-the-experience-of-a-visiting-customer-in-a-store-visit-pass-stay-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/innovative-anonymization-how-deeping-source-enhances-ml-model-performance-2` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/introducing-store-care-ai-revolutionizing-store-management-with-artificial-intelligence` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/knowledge-assembly` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/navigating-the-privacy-ai-paradox-with-seal` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/plus-insight-dashboard-zone-interest-analysis` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/privacy-in-machine-learning-applications-how-deeping-source-tackles-privacy-while-preserving-utility` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/seal-a-solution-for-compliance-with-the-eu-ai-act-and-gdpr` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/setting-ourselves-apart-actionable-insights-redefining-retail-with-computer-vision-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/the-birth-of-deeping-source` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/the-key-to-pleasant-brick-and-mortar-experiences` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/vision-ai-the-secret-ingredient-to-recapturing-missed-sales-opportunities-in-hypermarkets` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/why-anonymized-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/post/why-plus-insight-is-the-plus-your-business-needs-transforming-data-into-decisions` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/post/:slug |
| `/ko/privacy` | route | `/ko/privacy` | 동일 경로 존재(200) |
| `/ko/reset-password` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/reset-password |
| `/ko/seal` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/seal |
| `/ko/search` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/search |
| `/ko/sign-up` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/sign-up |
| `/ko/store-insight` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/store-insight |
| `/ko/storeagent` | route | `/ko/storeagent` | 동일 경로 존재(200) |
| `/ko/tech-anonymizer` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-anonymizer |
| `/ko/tech-spatial-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-spatial-ai |
| `/ko/tech-store-care-ai` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/tech-store-care-ai |
| `/ko/untitled/untitled-2` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/untitled/:path* |
| `/ko/update-password` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/update-password |
| `/ko/user-account` | redirect | `(next.config)` | redirect: /:locale(ko|jp)/user-account |
| `/log-in` | redirect | `(next.config)` | redirect: /log-in |
| `/news` | redirect | `(next.config)` | redirect: /news |
| `/pi-docs` | redirect | `(next.config)` | redirect: /pi-docs |
| `/pi-manual/heatmap-by-time-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/inter-zone-traffic-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/line-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/login` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/main-path-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/seoljeong-kategori-teseuteu` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/visitor-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/visitor-path-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/pi-manual/zone-analysis` | redirect | `(next.config)` | redirect: /pi-manual/:slug* |
| `/post/adapting-to-ai-company-work-as-a-new-employee` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/all-products-are-experience-goods` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/deeping-source-pioneering-privacy-centric-retail-optimization-in-the-age-of-ai` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/deeping-sources-commitment-to-safe-ai-achieving-soc2-type-2-certification` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/diving-deeper-how-heatmaps-dwell-time-and-attention-maps-revolutionize-retail-insights` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/enhancing-holiday-retail-strategy-with-advanced-vision-ai-technology` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/enhancing-retail-strategy-with-ab-test` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/how-ai-discovers-my-preferences-the-rise-of-intelligent-retail-systems` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/how-we-measure-the-experience-of-a-visiting-customer-in-a-store-visit-pass-stay-analysis` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/innovative-anonymization-how-deeping-source-enhances-ml-model-performance-2` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/introducing-store-care-ai-revolutionizing-store-management-with-artificial-intelligence` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/knowledge-assembly` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/navigating-the-privacy-ai-paradox-with-seal` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/plus-insight-dashboard-zone-interest-analysis` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/privacy-in-machine-learning-applications-how-deeping-source-tackles-privacy-while-preserving-utility` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/seal-a-solution-for-compliance-with-the-eu-ai-act-and-gdpr` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/setting-ourselves-apart-actionable-insights-redefining-retail-with-computer-vision-ai` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/the-birth-of-deeping-source` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/the-key-to-pleasant-brick-and-mortar-experiences` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/vision-ai-the-secret-ingredient-to-recapturing-missed-sales-opportunities-in-hypermarkets` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/why-anonymized-ai` | redirect | `(next.config)` | redirect: /post/:slug |
| `/post/why-plus-insight-is-the-plus-your-business-needs-transforming-data-into-decisions` | redirect | `(next.config)` | redirect: /post/:slug |
| `/privacy` | route | `/privacy` | 동일 경로 존재(200) |
| `/reset-password` | redirect | `(next.config)` | redirect: /reset-password |
| `/seal` | redirect | `(next.config)` | redirect: /seal |
| `/search` | redirect | `(next.config)` | redirect: /search |
| `/sign-up` | redirect | `(next.config)` | redirect: /sign-up |
| `/store-insight` | redirect | `(next.config)` | redirect: /store-insight |
| `/storeagent` | route | `/storeagent` | 동일 경로 존재(200) |
| `/tech-anonymizer` | redirect | `(next.config)` | redirect: /tech-anonymizer |
| `/tech-spatial-ai` | redirect | `(next.config)` | redirect: /tech-spatial-ai |
| `/tech-store-care-ai` | redirect | `(next.config)` | redirect: /tech-store-care-ai |
| `/untitled/untitled-2` | redirect | `(next.config)` | redirect: /untitled/:path* |
| `/update-password` | redirect | `(next.config)` | redirect: /update-password |
| `/user-account` | redirect | `(next.config)` | redirect: /user-account |
