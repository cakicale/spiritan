import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icon";
import { contactEmail, contactHref } from "@/lib/site";

export const metadata: Metadata = { title: "Contact | Spiritan", description: "Get in touch with Spiritan for questions, demo feedback or distribution partnerships. Built in Serbia for players across the Balkans." };

export default function ContactPage() {
  return (
    <main id="main" className="contact-page">
      <section className="container contact-layout" aria-labelledby="contact-title"><div className="contact-copy"><p className="eyebrow">THE CONVERSATION STARTS HERE</p><h1 id="contact-title">Let&apos;s talk<br /><span>games.</span></h1><p className="contact-intro">Questions, feedback or a shared idea for what comes next? We&apos;d like to hear from you.</p><div className="contact-method"><Icon name="mail" /><div><span>EMAIL US</span><a href={contactHref()}>{contactEmail}</a></div></div><div className="contact-method"><Icon name="globe" /><div><span>WHERE WE&apos;RE STARTING</span><p>Based in Serbia. Building for the Balkans.</p></div></div><div className="partnership-card"><Icon name="sparkles" /><h2>A possible partnership?</h2><p>We&apos;re exploring authorised distribution partnerships as we prepare Spiritan for launch.</p><a className="text-link" href={contactHref("Spiritan / Partnership")}>Let&apos;s explore it<Icon name="arrow-right" /></a></div></div><ContactForm /></section>
      <section className="container contact-questions" id="questions" aria-labelledby="questions-title"><div><p className="eyebrow">A LITTLE MORE CONTEXT</p><h2 id="questions-title">Before you ask.</h2><p>Answers to a few questions about this first look at Spiritan.</p><Link className="text-link" href="/about">Read our story<Icon name="arrow-right" /></Link></div><div className="faq-list"><details open><summary>Can I buy a game here yet?<span aria-hidden="true">+</span></summary><p>Spiritan is currently a demo. You can browse, choose a platform and complete a simulated checkout. No money is charged and no game keys are delivered.</p></details><details><summary>Are these the final games and prices?<span aria-hidden="true">+</span></summary><p>The listings and prices are illustrative. Our launch catalogue, product availability and regional restrictions will depend on confirmed distribution agreements.</p></details><details><summary>How do I choose my platform?<span aria-hidden="true">+</span></summary><p>Use the platform filter in the <Link href="/games">games catalogue</Link>, or choose a platform tag on a game card. On the game page, select the edition you want before adding it to your cart.</p></details><details><summary>Can I share feedback or discuss a partnership?<span aria-hidden="true">+</span></summary><p>Absolutely. Use the email link above or send a message with the form. We&apos;d like to hear from players and potential distribution partners.</p></details></div></section>
      <section className="container page-cta"><div><p className="eyebrow">BACK TO THE GOOD STUFF</p><h2>Your next adventure is waiting.</h2></div><Link className="button button-primary" href="/games">Explore games<Icon name="arrow-right" /></Link></section>
    </main>
  );
}
