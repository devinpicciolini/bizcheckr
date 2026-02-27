export interface CreateUserSessionTokenResponse {
  token: string;
}

export interface SlateError {
  defined: boolean;
  code: string;
  status: number;
  message: string;
  data?: object;
}

const getSlateApiUrl = (): string => {
  const env = process.env.SLATE_ENV;
  return env === "live" 
    ? "https://api.tryslatehq.com"
    : "https://api-sandbox.tryslatehq.com";
};

export const createUserSessionToken = async (externalId: string): Promise<CreateUserSessionTokenResponse> => {
  const apiKey = process.env.SLATE_API_KEY;
  if (!apiKey) {
    throw new Error("SLATE_API_KEY environment variable is required");
  }

  const apiUrl = getSlateApiUrl();
  
  try {
    const response = await fetch(`${apiUrl}/user-session-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ externalId }),
    });

    if (!response.ok) {
      const error: SlateError = await response.json();
      throw new Error(`Slate API error: ${error.message}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user session token");
  }
};