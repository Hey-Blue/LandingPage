import React from "react";
import SubscribeForm from "@/components/SubscribeForm";

export default function Newsletter() {
  return (
  <section className="w-full py-16 bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Subscribe to our newsletter
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Get updates on our mission, events, and ways to get involved. We send only good stuff.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <SubscribeForm />
          <p className="mt-3 text-xs text-muted-foreground text-center">
            By subscribing, you agree to our privacy policy and terms.
          </p>
        </div>
      </div>
    </section>
  );
}
