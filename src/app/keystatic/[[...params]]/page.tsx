'use client';
// Must be a Client Component: @keystatic/core/ui ships a `react-server` export
// condition whose <Keystatic> renders `null` on the server. Under Next 16's RSC
// the admin page would otherwise mount nothing (blank /keystatic). 'use client'
// pulls in the real client UI. (Regressed on the Next 16 upgrade.)
import { makePage } from '@keystatic/next/ui/app';
import keystaticConfig from '../../../../keystatic.config';

export default makePage(keystaticConfig);
