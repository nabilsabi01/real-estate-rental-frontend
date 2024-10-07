import { UserRole } from "./user-role.enum";

export interface AuthResponse {
  token: string;
  userRole: UserRole;
}