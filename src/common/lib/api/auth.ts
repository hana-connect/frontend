import { apiClient } from "@/common/lib/api/api-client";

type LoginRequest = {
  memberId: number;
  password: string;
};

type LoginResponse = {
  message: string;
  data: {
    memberId: number;
    name: string;
    role: string;
    memberRole: string;
  };
};

export async function login(body: LoginRequest) {
  return apiClient.post<LoginResponse>("/api/auth/login", body);
}
