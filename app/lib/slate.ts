const SLATE_API_BASE_URL = process.env.SLATE_ENV === "live" 
  ? "https://api.tryslatehq.com"
  : "https://api-sandbox.tryslatehq.com";

const SLATE_API_KEY = process.env.SLATE_API_KEY;

if (!SLATE_API_KEY) {
  throw new Error("SLATE_API_KEY environment variable is required");
}

export async function createUserSessionToken(externalId: string): Promise<{ token: string }> {
  const response = await fetch(`${SLATE_API_BASE_URL}/user-session-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": SLATE_API_KEY,
    },
    body: JSON.stringify({ externalId }),
  });

  if (!response.ok) {
    throw new Error(`Slate API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}