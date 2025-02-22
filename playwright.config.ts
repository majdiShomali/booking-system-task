import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',  
  timeout: 90000, // Global timeout: 90s
  expect: { timeout: 5000 }, 
  projects: [
    {
      name: 'booking-system-task',
      use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
      },
    },
  ],

  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});