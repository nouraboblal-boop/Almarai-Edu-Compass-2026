import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "./assets/styles-BrIyfE51.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "بوابة المعلم الذكية" },
      { name: "description", content: "بوابة المعلم الذكية — إدارة الفصول والطلاب وتتبع التقدم بسهولة." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "بوابة المعلم الذكية" },
      { property: "og:description", content: "بوابة المعلم الذكية - إدارة الفصول والطلاب وتتبع التقدم" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "بوابة المعلم الذكية" },
      { name: "twitter:description", content: "بوابة المعلم الذكية - إدارة الفصول والطلاب وتتبع التقدم" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e11a885-110b-47b6-99a6-c9941f55d6e0/id-preview-ca932c47--3253f672-beca-4304-82e9-510fb2937b64.lovable.app-1778152978246.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e11a885-110b-47b6-99a6-c9941f55d6e0/id-preview-ca932c47--3253f672-beca-4304-82e9-510fb2937b64.lovable.app-1778152978246.png" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$8 = () => import("./tests-O9-usIHY.js");
const Route$8 = createFileRoute("/tests")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./reports-CX4HMarx.js");
const Route$7 = createFileRoute("/reports")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./profile-BUR8yOn8.js");
const Route$6 = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./paths-DM6JilF8.js");
const Route$5 = createFileRoute("/paths")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./map-kEZYUzHK.js");
const Route$4 = createFileRoute("/map")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./login-BlQ2oKQC.js");
const Route$3 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "تسجيل الدخول | بوابة المعلم الذكية"
    }, {
      name: "description",
      content: "بوابة المعلم الذكية - سجل دخولك لإدارة فصولك"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./grammar-DF1AnfIP.js");
const Route$2 = createFileRoute("/grammar")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./classes-Dj9jTP2C.js");
const Route$1 = createFileRoute("/classes")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DkkjNqcJ.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TestsRoute = Route$8.update({
  id: "/tests",
  path: "/tests",
  getParentRoute: () => Route$9
});
const ReportsRoute = Route$7.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$9
});
const ProfileRoute = Route$6.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$9
});
const PathsRoute = Route$5.update({
  id: "/paths",
  path: "/paths",
  getParentRoute: () => Route$9
});
const MapRoute = Route$4.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const GrammarRoute = Route$2.update({
  id: "/grammar",
  path: "/grammar",
  getParentRoute: () => Route$9
});
const ClassesRoute = Route$1.update({
  id: "/classes",
  path: "/classes",
  getParentRoute: () => Route$9
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  ClassesRoute,
  GrammarRoute,
  LoginRoute,
  MapRoute,
  PathsRoute,
  ProfileRoute,
  ReportsRoute,
  TestsRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const FALLBACK_LOCATION = { pathname: "/", search: "", hash: "" };
function buildRouterOptions(startRouterOptions) {
  const queryClient = new QueryClient();
  const { context: startContext, ...startOptions } = startRouterOptions ?? {};
  const rawLoc = startRouterOptions?.location;
  let location;
  if (rawLoc != null && typeof rawLoc === "object") {
    const pathname = typeof rawLoc.pathname === "string" && rawLoc.pathname.length > 0 ? rawLoc.pathname : "/";
    location = {
      ...rawLoc,
      pathname,
      search: typeof rawLoc.search === "string" ? rawLoc.search : "",
      hash: typeof rawLoc.hash === "string" ? rawLoc.hash : ""
    };
  } else {
    location = { ...FALLBACK_LOCATION };
  }
  return {
    ...startOptions,
    routeTree,
    location,
    context: {
      ...typeof startContext === "object" && startContext ? startContext : {},
      queryClient
    },
    scrollRestoration: startRouterOptions?.scrollRestoration ?? true,
    defaultPreloadStaleTime: startRouterOptions?.defaultPreloadStaleTime ?? 0
  };
}
const getRouter = (startRouterOptions) => {
  try {
    return createRouter(buildRouterOptions(startRouterOptions));
  } catch (err) {
    console.error("[router] createRouter failed; retrying with fallback location '/'", err);
    return createRouter(
      buildRouterOptions({
        ...startRouterOptions,
        location: { ...FALLBACK_LOCATION }
      })
    );
  }
};
export {
  getRouter as default,
  getRouter
};
