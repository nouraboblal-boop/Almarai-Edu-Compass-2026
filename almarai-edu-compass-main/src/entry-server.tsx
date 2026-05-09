import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

/**
 * TanStack Start resolves the router from `#tanstack-router-entry` → `src/router.tsx` (`getRouter`).
 * Do not pass `createRouter` here — it is ignored by `createStartHandler` and could break the handler.
 * Pathname / location guards live in `router.tsx`.
 */
export default createStartHandler(defaultStreamHandler);
