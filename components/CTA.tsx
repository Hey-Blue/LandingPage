import Link from "next/link";

export default function CTA() {
  return (
    <section className="container-base py-16">
      <div className="card p-8 bg-gradient-to-br from-sky-50 to-white border-sky-100">
        <div className="grid gap-4 lg:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Ready to say HELLO?</h3>
            <p className="text-neutral-600 mt-1">Join thousands building stronger, safer communities with a simple connection.</p>
          </div>
          <div className="flex gap-3 lg:justify-end">
            <Link href="/app" className="btn btn-primary">Get the App</Link>
            <Link href="/donate" className="btn btn-outline">Support the mission</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
