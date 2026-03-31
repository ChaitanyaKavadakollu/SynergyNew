export const nodes = [
  { id: "React", group: "skill", radius: 20 },
  { id: "NodeJS", group: "skill", radius: 15 },
  { id: "Machine Learning", group: "skill", radius: 25 },
  { id: "Python", group: "skill", radius: 30 },
  { id: "UI/UX", group: "skill", radius: 18 },
  
  { id: "Rahul", group: "student", radius: 10 },
  { id: "Neha", group: "student", radius: 10 },
  { id: "Aditi", group: "student", radius: 10 },
  { id: "Karan", group: "student", radius: 10 },
];

export const edges = [
  { source: "Rahul", target: "React", value: 2 },
  { source: "Rahul", target: "NodeJS", value: 2 },
  { source: "Rahul", target: "Machine Learning", value: 3 },
  { source: "Rahul", target: "Python", value: 3 },
  
  { source: "Neha", target: "Python", value: 4 },
  { source: "Neha", target: "Machine Learning", value: 2 },
  
  { source: "Aditi", target: "UI/UX", value: 5 },
  { source: "Aditi", target: "React", value: 1 },
  
  { source: "Karan", target: "Python", value: 3 }
];
