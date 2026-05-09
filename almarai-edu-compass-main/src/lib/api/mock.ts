import type { ApiLayer } from "./client";
import type { ApiResult, TeacherProfile } from "./types";

const mockProfile: TeacherProfile = {
  id: "teacher-1",
  name: "أ. هبة",
  email: "teacher@school.com",
  subject: "اللغة العربية",
  school: "مدرسة الفصاحة",
};

export class MockApiClient implements ApiLayer {
  async getTeacherProfile(): Promise<ApiResult<TeacherProfile>> {
    return {
      data: mockProfile,
      status: 200,
    };
  }
}
