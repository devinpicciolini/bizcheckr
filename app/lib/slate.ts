// Slate API Client
// Documentation: https://tryslatehq.apidocumentation.com/slate-api

const SLATE_API_URL = process.env.SLATE_ENV === "live"
  ? "https://api.tryslatehq.com"
  : "https://api-sandbox.tryslatehq.com";

const SLATE_API_KEY = process.env.SLATE_API_KEY;

/**
 * Create a user session token for Slate embeddable components.
 * This token authenticates the user with Slate's frontend components.
 */
export async function createUserSessionToken(customerId: string): Promise<string> {
  if (!SLATE_API_KEY) {
    throw new Error("SLATE_API_KEY environment variable is not set");
  }

  const response = await fetch(`${SLATE_API_URL}/user-session-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": SLATE_API_KEY,
    },
    body: JSON.stringify({ customerId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Slate API error: ${response.status} - ${error.message || "Unknown error"}`);
  }

  const data = await response.json();
  return data.token;
}
