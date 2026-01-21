import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://www.msprods.fr',
  base: '/',

  adapter: node({
    mode: 'standalone'
  })
});