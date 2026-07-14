import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../../keystatic.config';

// GitHub mode: makeRouteHandler가 KEYSTATIC_* env를 읽어 OAuth를 처리한다 (docs/PHASE_C_github-mode-setup.md §2).
export const { GET, POST } = makeRouteHandler({ config: keystaticConfig });
