export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMine: boolean;
}

export interface MentorRequest {
  id: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  mentorName: string;
  status: "pending" | "accepted" | "rejected";
  introMessage: string; // The max 500 char initial message
  requestedAt: string;
  messages: ChatMessage[]; // The ongoing conversation if accepted
}

export const mockMentorRequests: MentorRequest[] = [
  {
    id: "req-001",
    studentId: "student-id",
    studentName: "Test Student",
    mentorId: "M-001",
    mentorName: "Dr. Mehta",
    status: "accepted",
    introMessage: "Hello sir, I am very interested in your AI research and would love some guidance on backend development for ML ops.",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    messages: [
      {
        id: "msg-001",
        senderId: "student-id",
        senderName: "Test Student",
        content: "Hello sir, I am very interested in your AI research and would love some guidance on backend development for ML ops.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        isMine: true,
      },
      {
        id: "msg-002",
        senderId: "M-001",
        senderName: "Dr. Mehta",
        content: "Sure, let's start with NodeJS and system design basics. What is your current proficiency with REST APIs?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
        isMine: false,
      },
      {
        id: "msg-003",
        senderId: "student-id",
        senderName: "Test Student",
        content: "I've built a few basic Express servers, but I struggle with scaling and database optimization.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        isMine: true,
      }
    ]
  },
  {
    id: "req-002",
    studentId: "student-id",
    studentName: "Test Student",
    mentorId: "M-002",
    mentorName: "Sarah Jenkins",
    status: "pending",
    introMessage: "Hi Sarah! I saw your talk on Frontend Architecture. I'm trying to decide between Next.js and plain React for my final year project. Would love your insight!",
    requestedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    messages: [
       {
        id: "msg-101",
        senderId: "student-id",
        senderName: "Test Student",
        content: "Hi Sarah! I saw your talk on Frontend Architecture. I'm trying to decide between Next.js and plain React for my final year project. Would love your insight!",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        isMine: true,
      }
    ]
  }
];
