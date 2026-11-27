import { NextResponse } from "next/server";
import { createAssignment, listAssignments } from "@/lib/assignments";

export async function GET() {
  return NextResponse.json(listAssignments());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const assignment = createAssignment(body);
    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request body";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}