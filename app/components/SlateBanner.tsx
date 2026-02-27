"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

interface SlateBannerProps {
  customerId: string;
  env?: "sandbox" | "live";
}

const SlateBanner = ({ customerId, env = "sandbox" }: SlateBannerProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("/api/slate/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ externalId: customerId }),
        });

        if (!response.ok) {
          console.error("Failed to fetch Slate session token");
          return;
        }

        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        console.error("Error fetching Slate session token:", err);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchToken();
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
      {/* @ts-expect-error - Slate web component */}
      <slate-pre-approval-banner-v2 
        env={env} 
        user-token={token}
      />
    </>
  );
};

export default SlateBanner;