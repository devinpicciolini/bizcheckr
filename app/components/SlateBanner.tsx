"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

interface SlateBannerProps {
  customerId: string;
  env?: "live" | "sandbox";
}

export default function SlateBanner({ customerId, env = "sandbox" }: SlateBannerProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      fetchToken();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  if (loading || !token) {
    return null;
  }

  return (
    <>
      <Script 
        src="https://components.tryslatehq.com/slate.esm.js" 
        type="module" 
        strategy="lazyOnload" 
      />
      {/* @ts-expect-error Slate web component */}
      <slate-pre-approval-banner-v2 env={env} user-token={token} />
    </>
  );
}