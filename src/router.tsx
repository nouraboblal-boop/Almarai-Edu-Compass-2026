import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

type CreateRouterOptions = Parameters<typeof createRouter>[0];

/** Options Start may pass when instantiating the router (includes SSR `location`). */
type StartRouterOptions = Partial<CreateRouterOptions> & {
  location?: {
    pathname?: string;
    search?: string;
    hash?: string;
  } & Record<string, unknown>;
};

const FALLBACK_LOCATION = { pathname: "/", search: "", hash: "" };

function buildRouterOptions(startRouterOptions?: StartRouterOptions): CreateRouterOptions {
  const queryClient = new QueryClient();
  const { context: startContext, ...startOptions } = (startRouterOptions ?? {}) as StartRouterOptions;

  const rawLoc = startRouterOptions?.location;
  let location: unknown;

  if (rawLoc != null && typeof rawLoc === "object") {
    const pathname =
      typeof rawLoc.pathname === "string" && rawLoc.pathname.length > 0 ? rawLoc.pathname : "/";
    location = {
      ...rawLoc,
      pathname,
      search: typeof rawLoc.search === "string" ? rawLoc.search : "",
      hash: typeof rawLoc.hash === "string" ? rawLoc.hash : "",
    };
  } else {
    location = { ...FALLBACK_LOCATION };
  }

  return {
    ...startOptions,
    routeTree,
    location,
    context: {
      ...(typeof startContext === "object" && startContext ? startContext : {}),
      queryClient,
    },
    scrollRestoration: startRouterOptions?.scrollRestoration ?? true,
    defaultPreloadStaleTime: startRouterOptions?.defaultPreloadStaleTime ?? 0,
  } as CreateRouterOptions;
}

export const getRouter = (startRouterOptions?: StartRouterOptions) => {
  try {
    return createRouter(buildRouterOptions(startRouterOptions));
  } catch (err) {
    console.error("[router] createRouter failed; retrying with fallback location '/'", err);
    return createRouter(
      buildRouterOptions({
        ...startRouterOptions,
        location: { ...FALLBACK_LOCATION },
      }),
    );
  }
};

export default getRouter;
