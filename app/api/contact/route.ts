import { readContactMessage } from "@/lib/contact-message";
import { contactEmail } from "@/lib/site";

const fromAddress = "Spiritan <onboarding@resend.dev>";
const sendError = "We couldn't send your message. Please try the email link instead.";

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Messages can't be sent right now." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const parsed = readContactMessage(body);
  if (parsed.status === "spam") return Response.json({ ok: true });
  if (parsed.status === "invalid") return Response.json({ error: parsed.error }, { status: 400 });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress,
      to: [contactEmail],
      reply_to: parsed.message.email,
      subject: `Spiritan / ${parsed.message.topic}`,
      text: `${parsed.message.message}\n\nName: ${parsed.message.name}\nReply email: ${parsed.message.email}`,
    }),
  });

  if (!response.ok) return Response.json({ error: sendError }, { status: 502 });
  return Response.json({ ok: true });
}
