export async function createUserSessionToken(externalId: string): Promise<{ token: string }> {
  const apiKey = process.env.SLATE_API_KEY;
  const env = process.env.SLATE_ENV || "sandbox";

  if (!apiKey) {
    throw new Error("SLATE_API_KEY is required");
  }

  const baseUrl = env === "live" 
    ? "https://api.tryslatehq.com"
    : "https://api-sandbox.tryslatehq.com";

  const response = await fetch(`${baseUrl}/user-session-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ externalId }),
  });

  if (!response.ok) {
    throw new Error(`Slate API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}