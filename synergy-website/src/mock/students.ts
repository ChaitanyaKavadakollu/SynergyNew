export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  skills: string[];
  skillScore: number;
  avatarUrl?: string;
}

export const students: Student[] = [
  {
    id: "STU-001",
    name: "Rahul Sharma",
    email: "student@synergy.edu", // Demo credentials
    department: "Computer Science",
    year: 3,
    skills: ["React", "Node.js", "Machine Learning", "Python"],
    skillScore: 78,
    avatarUrl: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    id: "STU-002",
    name: "Aditi Desai",
    email: "aditi@synergy.edu",
    department: "Information Technology",
    year: 4,
    skills: ["UI/UX", "Figma", "Frontend Development"],
    skillScore: 84,
    avatarUrl: "https://i.pravatar.cc/150?u=aditi"
  },
  {
    id: "STU-003",
    name: "Karan Patel",
    email: "karan@synergy.edu",
    department: "Data Engineering",
    year: 2,
    skills: ["SQL", "AWS", "Python"],
    skillScore: 65,
  },
  {
    id: "STU-004",
    name: "Neha Gupta",
    email: "neha@synergy.edu",
    department: "Computer Science",
    year: 3,
    skills: ["C++", "Algorithms", "System Design"],
    skillScore: 92,
    avatarUrl: "https://i.pravatar.cc/150?u=neha"
  },
  {
    id: "STU-005",
    name: "Vikram Singh",
    email: "vikram@synergy.edu",
    department: "Electronics",
    year: 4,
    skills: ["IoT", "Embedded C", "Circuit Design"],
    skillScore: 71,
  }
];
