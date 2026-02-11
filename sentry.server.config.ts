// This file configures the initialization of Sentry on the server.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Uncomment to enable Sentry error tracking
/*
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust sample rate for production
  tracesSampleRate: 1.0,
  
  // Set sampling rate for profiling
  profilesSampleRate: 1.0,
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release version
  release: process.env.NEXT_PUBLIC_BUILD_ID ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
});
*/
