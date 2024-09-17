import { UserRole } from "./user-role.enum";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}