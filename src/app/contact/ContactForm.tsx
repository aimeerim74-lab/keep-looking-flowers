"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    eventDate: "",
    product: productName,
    description: "",
    budget: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-4xl text-charcoal mb-4">Thank you</p>
        <p className="text-charcoal-light">
          We've received your request and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Name *
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Email *
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Event Date
          </label>
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Approximate Budget
          </label>
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
            placeholder="e.g. $200–$500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Product / Inspiration
        </label>
        <input
          name="product"
          value={form.product}
          onChange={handleChange}
          className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
          placeholder="e.g. wedding bouquet, table centrepiece..."
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Tell us more *
        </label>
        <textarea
          required
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors resize-none"
          placeholder="Describe your vision, colour palette, occasion..."
        />
      </div>

      {status === "error" && (
        <p className="text-dusty-rose text-sm">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose disabled:opacity-50 transition-colors duration-300"
      >
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
