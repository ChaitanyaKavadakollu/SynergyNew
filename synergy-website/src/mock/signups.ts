export interface BaseSignup {
  id: string;
  name: string;
  email: string;
  department: string;
  proofUrl: string; // Mock URL for proof document
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface StudentSignup extends BaseSignup {
  type: "student";
  universityId: string;
  year: string;
}

export interface FacultySignup extends BaseSignup {
  type: "faculty";
  employeeId: string;
}

export interface ManagementSignup extends BaseSignup {
  type: "management";
  roleTitle: string;
}

export type SignupRequest = StudentSignup | FacultySignup | ManagementSignup;

export const mockSignups: SignupRequest[] = [
  {
    id: "req-stu-001",
    type: "student",
    name: "Neha Sharma",
    email: "neha@student.synergy.edu",
    department: "Computer Science",
    universityId: "STU-2024-001",
    year: "3rd Year",
    proofUrl: "id_card_neha.pdf",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "req-stu-002",
    type: "student",
    name: "Rohan Kapoor",
    email: "rohan@student.synergy.edu",
    department: "Information Technology",
    universityId: "STU-2024-082",
    year: "2nd Year",
    proofUrl: "admission_letter_rohan.pdf",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "req-fac-001",
    type: "faculty",
    name: "Dr. Alok Nath",
    email: "anath@faculty.synergy.edu",
    department: "Mathematics",
    employeeId: "FAC-MATH-092",
    proofUrl: "faculty_id_092.png",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "req-mgt-001",
    type: "management",
    name: "Suresh Iyer",
    email: "suresh.iyer@management.synergy.edu",
    department: "Administration",
    roleTitle: "Dean of Student Affairs",
    proofUrl: "appointment_letter_dean.pdf",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  }
];
