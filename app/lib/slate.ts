const SLATE_API_URLS = {
  sandbox: "https://api-sandbox.tryslatehq.com",
  live: "https://api.tryslatehq.com",
};

export const createUserSessionToken = async (externalId: string): Promise<{ token: string }> => {
  const apiKey = process.env.SLATE_API_KEY;
  const env = process.env.SLATE_ENV as "sandbox" | "live";

  if (!apiKey) {
    throw new Error("SLATE_API_KEY is required");
  }

  if (!env || !SLATE_API_URLS[env]) {
    throw new Error("SLATE_ENV must be 'sandbox' or 'live'");
  }

  const response = await fetch(`${SLATE_API_URLS[env]}/user-session-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ externalId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create session token: ${response.statusText}`);
  }

  return response.json();
};