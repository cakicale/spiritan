"use client";

import { useState, type FormEvent } from "react";
import { contactTopics, type ContactTopic } from "@/lib/contact-message";
import { CatalogueSelect } from "./catalogue-select";
import { Icon } from "./icon";

const topicOptions = contactTopics.map((topic) => ({ value: topic, label: topic }));

export function ContactForm() {
  const [topic, setTopic] = useState<ContactTopic>("General question");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");
    if (!name || message.length < 10) {
      setError("Please add your name and a message of at least 10 characters.");
      return;
    }
    setError("");
    setSent(false);
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, company }),
      });
      const payload = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setError(payload?.error ?? "We couldn't send your message. Please try the email link instead.");
        return;
      }
      form.reset();
      setTopic("General question");
      setSent(true);
    } catch {
      setError("We couldn't send your message. Please try the email link instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={sendMessage} aria-busy={sending}>
      <p className="eyebrow">SAY HELLO</p><h2>What&apos;s on your mind?</h2><p className="contact-form-intro">A question, an idea or simply your next favourite game.</p>
      <div className="contact-form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex" maxLength={100} required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label></div>
      <div className="contact-topic"><span>What&apos;s it about?</span><CatalogueSelect label="What's it about?" value={topic} options={topicOptions} onChange={setTopic} /></div>
      <label>Your message<textarea name="message" placeholder="Tell us a little about it…" rows={5} minLength={10} maxLength={2000} required /></label>
      <label className="contact-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <button type="submit" className="button button-primary" disabled={sending}>{sending ? "Sending message…" : "Send message"}<Icon name="mail" /></button>
      {sent ? <p className="contact-form-status" role="status">Message sent. We'll reply to the email you entered.</p> : <p className="contact-form-note">Your message is sent directly to us.</p>}
      {error && <p className="checkout-error" role="alert">{error}</p>}
    </form>
  );
}
