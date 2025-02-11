"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  onSuccess?: () => void;
  compact?: boolean; // for tighter layout inside modal
  buttonStyle?: "ui" | "site"; // choose button style system
};

export default function SubscribeForm({ onSuccess, compact = false, buttonStyle = "ui" }: Props) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus("idle");
    setMessage(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errText =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.detail || "Subscription failed";
        setStatus("error");
        setMessage(errText);
      } else {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox.");
        setEmail("");
        onSuccess?.();
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <form onSubmit={handleSubmit} className="w-full">
  <div className={`flex flex-col sm:flex-row gap-3 sm:items-center`}>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full sm:flex-1 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground/70 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {buttonStyle === "site" ? (
            <button type="submit" disabled={loading} className="sm:w-auto w-full btn btn-primary">
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          ) : (
            <Button type="submit" disabled={loading} className="sm:w-auto w-full">
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          )}
        </div>
      </form>

      {status !== "idle" && message && (
        <Alert variant={status === "error" ? "destructive" : "default"}>
          <AlertTitle>{status === "error" ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
