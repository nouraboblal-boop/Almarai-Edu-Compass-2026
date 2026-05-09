export type ApiResult<T> = {
  data: T;
  status: number;
};

export type TeacherProfile = {
  id: string;
  name: string;
  email: string;
  subject: string;
  school: string;
};
