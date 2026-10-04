import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  studioHost: 'ducrest-partners',
  deployment: {
    appId: 'c71ds3upcvwvktm3jsos99zu',
  },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
