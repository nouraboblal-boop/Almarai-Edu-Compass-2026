import entry from "./entry-server";
import type { Register } from "@tanstack/react-router";
import type { RequestHandler } from "@tanstack/react-start/server";

type AppRequestHandler = RequestHandler<Register>;

export function createServerEntry(serverEntry: { fetch: AppRequestHandler }) {
  return {
    async fetch(...args: Parameters<AppRequestHandler>) {
      return await serverEntry.fetch(...args);
    },
  };
}

export default createServerEntry({ fetch: entry });
