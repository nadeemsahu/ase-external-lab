import type { Assignment } from "@/types";

export type NewAssignmentInput = {
  title: string;
  course: string;
  dueDate: string;
};

const seed: Assignment[] = [
  { id: "1", title: "Math Homework", course: "Mathematics 101", dueDate: "2026-12-01", completed: false },
  { id: "2", title: "History Essay", course: "World History", dueDate: "2026-12-05", completed: false },
  { id: "3", title: "Lab Report", course: "Chemistry 201", dueDate: "2026-12-03", completed: true },
];

let assignments: Assignment[] = [...seed];

/** Return all assignments sorted by due date (earliest first). */
export function listAssignments(): Assignment[] {
  return [...assignments].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/** Validate and create a new assignment. Throws on invalid input. */
export function createAssignment(input: NewAssignmentInput): Assignment {
  const { title, course, dueDate } = input;
  if (!title || !course || !dueDate) {
    throw new Error("title, course and dueDate are required");
  }

  const nextId = assignments.length
    ? Math.max(...assignments.map((a) => Number(a.id))) + 1
    : 1;

  const assignment: Assignment = {
    id: String(nextId),
    title: String(title),
    course: String(course),
    dueDate: String(dueDate),
    completed: false,
  };
  assignments.push(assignment);
  return assignment;
}

/** Reset the in-memory store (used by tests). */
export function resetAssignments() {
  assignments = [...seed];
}