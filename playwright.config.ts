import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  timeout: 25_000,
  expect: { timeout: 7000 },
  use: {
    browserName: 'chromium',
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined },
  },
  projects: [
    { name: 'root', use: { baseURL: 'http://127.0.0.1:4173/' } },
    { name: 'github-pages', use: { baseURL: 'http://127.0.0.1:4173/Estudo-para-Concurso/' } },
  ],
  webServer: {
    command: 'node tests/serve-built.mjs',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
