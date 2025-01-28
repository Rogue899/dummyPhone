import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0281e2c0964fa8528fe3ecc61df590ba@o4508710814810112.ingest.de.sentry.io/4508710818873424",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration({
      maskAllText:false,
      blockAllMedia:false,
    }),
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
