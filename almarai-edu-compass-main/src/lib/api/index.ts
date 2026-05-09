import { HttpApiClient, type ApiLayer } from "./client";
import { MockApiClient } from "./mock";

export function createApiLayer(): ApiLayer {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (typeof baseUrl === "string" && baseUrl.trim().length > 0) {
    return new HttpApiClient(baseUrl);
  }

  // Default to mock mode so existing frontend flows keep working.
  return new MockApiClient();
}
