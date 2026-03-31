export const ROLES = {
  STUDENT: "student",
  FACULTY: "faculty",
  MANAGEMENT: "management",
  ADMIN: "admin",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface UserSession {
  id: string;
  email: string;
  role: Role;
  name: string;
  approvalStatus?: "pending_approval" | "approved" | "rejected";
}

export const getDashboardRoute = (role: Role): string => {
  switch (role) {
    case ROLES.STUDENT:
      return "/app/student/dashboard";
    case ROLES.FACULTY:
      return "/app/faculty/dashboard";
    case ROLES.MANAGEMENT:
      return "/app/management/dashboard";
    case ROLES.ADMIN:
      return "/app/admin/dashboard";
    default:
      return "/login";
  }
};
