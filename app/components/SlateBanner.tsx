"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface SlateBannerProps {
  customerId: string;
  env?: "live" | "sandbox";
}

export default function SlateBanner({ customerId, env = "sandbox" }: SlateBannerProps) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/slate/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId }),
        });
        const data = await response.json();
        setUserToken(data.token);
      } catch (error) {
        console.error("Failed to fetch Slate session token:", error);
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      fetchToken();
    }
  }, [customerId]);

  if (loading || !userToken) return null;

  return (
    <>
      <Script
        src="https://components.tryslatehq.com/slate.esm.js"
        type="module"
        strategy="lazyOnload"
      />
      {/* @ts-expect-error Slate web component */}
      <slate-pre-approval-banner-v2
        env={env}
        user-token={userToken}
      />
    </>
  );
}
