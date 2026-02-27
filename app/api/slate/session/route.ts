import { NextRequest, NextResponse } from "next/server";
import { createUserSessionToken } from "@/app/lib/slate";

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "customerId is required" },
        { status: 400 },
      );
    }

    const { token } = await createUserSessionToken(customerId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating Slate session token:", error);
    return NextResponse.json(
      { error: "Failed to create session token" },
      { status: 500 },
    );
  }
}