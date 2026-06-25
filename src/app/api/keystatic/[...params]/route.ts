import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../../keystatic.config';

// Local mode → no auth. (GitHub mode adds OAuth env in Phase 2.)
export const { GET, POST } = makeRouteHandler({ config: keystaticConfig });
