"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

interface SlateCapitalPageProps {
  customerId?: string;
  env?: "live" | "sandbox";
}

export default function SlateCapitalPage({ 
  customerId = "demo-customer", 
  env = "sandbox" 
}: SlateCapitalPageProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/slate/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ externalId: customerId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch session token");
        }

        const { token } = await response.json();
        setToken(token);
      } catch (err) {
        console.error("Error fetching Slate token:", err);
        setError("Failed to load financing information");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your financing information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Script 
        src="https://components.tryslatehq.com/slate.esm.js" 
        type="module" 
        strategy="lazyOnload" 
      />
      <h1 className="text-3xl font-bold mb-8">Capital Overview</h1>
      {/* @ts-expect-error Slate web component */}
      <slate-capital env={env} user-token={token} />
    </div>
  );
}