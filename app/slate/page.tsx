"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface SlateCapitalPageProps {
  customerId: string;
  env?: "live" | "sandbox";
}

export default function SlateCapitalPage({ customerId, env = "sandbox" }: SlateCapitalPageProps) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/slate/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch session token");
        }

        const data = await response.json();
        setUserToken(data.token);
      } catch (err) {
        console.error("Failed to fetch Slate session token:", err);
        setError("Unable to load financing information. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      fetchToken();
    }
  }, [customerId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
        <p>Loading financing information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#ef4444" }}>
        <p>{error}</p>
      </div>
    );
  }

  if (!userToken) return null;

  return (
    <div>
      <Script
        src="https://components.tryslatehq.com/slate.esm.js"
        type="module"
        strategy="lazyOnload"
      />
      {/*
        slate-capital includes the pre-approval banner built in.
        Do NOT place slate-pre-approval-banner-v2 on the same page.
      */}
      {/* @ts-expect-error Slate web component */}
      <slate-capital
        env={env}
        user-token={userToken}
      />
    </div>
  );
}
