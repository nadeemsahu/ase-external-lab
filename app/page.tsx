"use client";

import { useState, useEffect } from "react";
import type { Assignment } from "@/types";

export default function AssignmentTracker() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const loadAssignments = async () => {
    try {
      const response = await fetch("/api/assignments");
      if (response.ok) {
        setAssignments(await response.json());
        setError("");
      } else {
        setError("Failed to load assignments");
      }
    } catch {
      setError("Failed to load assignments");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { title, course, dueDate } = newAssignment;
    if (!title || !course || !dueDate) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, course, dueDate }),
      });

      if (response.ok) {
        setNewAssignment({ title: "", course: "", dueDate: "" });
        await loadAssignments();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create assignment");
      }
    } catch {
      setError("Failed to create assignment");
    }
  };

  useEffect(() => {
    async function init() {
      await loadAssignments();
    }
    init();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Student Assignment Tracker
        </h1>

        {error && (
          <div className="mb-4 text-red-500 bg-red-50 p-2 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
              placeholder="Assignment title"
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              value={newAssignment.course}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, course: e.target.value })
              }
              placeholder="Course name"
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <input
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, dueDate: e.target.value })
              }
              className="border rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-500 text-white rounded p-2 hover:bg-zinc-600 transition"
          >
            Add Assignment
          </button>
        </form>

        <div className="w-full">
          <ul className="space-y-3">
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="flex items-center justify-between p-3 border-b-2 border-zinc-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        assignment.completed
                          ? "text-gray-400 line-through"
                          : "text-zinc-800"
                      }`}
                    >
                      {assignment.title}
                    </span>
                    <span
                      className={`text-sm ${
                        assignment.completed ? "text-gray-500" : "text-zinc-600"
                      }`}
                    >
                      {assignment.course}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      assignment.completed ? "text-gray-400" : "text-zinc-600"
                    }`}
                  >
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setError("Edit not implemented yet")}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setError("Delete not implemented yet")}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}