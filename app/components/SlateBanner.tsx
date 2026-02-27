"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

interface SlateBannerProps {
  customerId: string;
  env?: "sandbox" | "live";
}

export const SlateBanner = ({ customerId, env = "sandbox" }: SlateBannerProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/slate/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId }),
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        }
      } catch (error) {
        console.error("Failed to fetch Slate session token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
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
      {/* @ts-expect-error - Slate web component */}
      <slate-pre-approval-banner-v2 env={env} user-token={token} />
    </>
  );
};