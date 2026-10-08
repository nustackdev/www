import posthog from 'posthog-js';

/** PostHog init shared by every site. Call from the site's instrumentation-client.ts. */
export function initAnalytics() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (process.env.NODE_ENV !== 'production' || !token) return;
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://t.nustack.dev',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30',
  });
}
