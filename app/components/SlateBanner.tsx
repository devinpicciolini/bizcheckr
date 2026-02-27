"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface SlateBannerProps {
  customerId: string;
  env?: "live" | "sandbox";
}

export const SlateBanner: React.FC<SlateBannerProps> = ({ 
  customerId, 
  env = "sandbox" 
}) => {
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