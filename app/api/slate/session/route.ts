import { NextRequest, NextResponse } from "next/server";
import { createUserSessionToken } from "@/app/lib/slate";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { customerId } = body;

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
};