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
        setLoading(true);
        setError(null);
        
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
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your financing overview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Capital</h1>
          <p className="text-red-400">{error}</p>
        </div>
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
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Capital Overview</h1>
          {/* @ts-expect-error - Slate web component */}
          <slate-capital 
            env={env} 
            user-token={token}
          />
        </div>
      </div>
    </>
  );
};

export default SlateCapitalPage;