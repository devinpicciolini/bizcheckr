"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

interface SlateCapitalPageProps {
  customerId?: string;
  env?: "sandbox" | "live";
}

const SlateCapitalPage = ({ customerId = "demo-customer", env = "sandbox" }: SlateCapitalPageProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        if (!response.ok) {
          throw new Error("Failed to fetch session token");
        }

        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your capital overview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://components.tryslatehq.com/slate.esm.js"
        type="module"
        strategy="lazyOnload"
      />
      <div className="container mx-auto p-4">
        {/* @ts-expect-error - Slate web component */}
        <slate-capital env={env} user-token={token} />
      </div>
    </>
  );
};

export default function SlatePage() {
  return <SlateCapitalPage />;
}