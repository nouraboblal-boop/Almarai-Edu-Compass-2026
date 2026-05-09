import type { ApiResult, TeacherProfile } from "./types";

export interface ApiLayer {
  getTeacherProfile(): Promise<ApiResult<TeacherProfile>>;
}

export class HttpApiClient implements ApiLayer {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...init,
    });

    const data = (await response.json()) as T;
    return {
      data,
      status: response.status,
    };
  }

  async getTeacherProfile() {
    return this.request<TeacherProfile>("/teacher/profile");
  }
}
