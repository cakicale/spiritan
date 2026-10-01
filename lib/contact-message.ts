export const contactTopics = ["General question", "Partnership", "Demo feedback"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export type ContactMessage = {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
};

type ReadResult =
  | { status: "spam" }
  | { status: "invalid"; error: string }
  | { status: "ready"; message: ContactMessage };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidMessage = "Please add your name and a message of at least 10 characters.";

function textField(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isTopic(value: string): value is ContactTopic {
  return contactTopics.some((topic) => topic === value);
}

export function readContactMessage(input: unknown): ReadResult {
  if (!input || typeof input !== "object") return { status: "invalid", error: "Please check the form and try again." };
  const data = input as Record<string, unknown>;
  if (typeof data.company === "string" && data.company.trim()) return { status: "spam" };
  const name = textField(data.name, 100);
  const email = textField(data.email, 254);
  const message = textField(data.message, 2000);
  const topic = textField(data.topic, 40);
  if (!name || message.length < 10) return { status: "invalid", error: invalidMessage };
  if (!emailPattern.test(email)) return { status: "invalid", error: "Please enter a valid email address." };
  if (!isTopic(topic)) return { status: "invalid", error: "Please choose what the message is about." };
  return { status: "ready", message: { name, email, topic, message } };
}
