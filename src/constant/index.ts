type PlanType = {
  id: number;
  price: string;
  title: string;
  description: string;
  limits: string[];
  features: string[];
}[];

export const PLANS: PlanType = [
  {
    id: 1,
    price: "$0/month",
    title: "free",
    description: "For small teams testing AI triage.",
    limits: [
      "Up to 500 tickets/month",
      "1 organization",
      "2 users",
      "1 knowledge base",
      "Community support",
    ],
    features: [
      "Webhook ticket ingestion",
      "Basic AI intent classification",
      "Basic sentiment detection",
      "Auto-reply suggestions",
      "Manual human review",
      "Basic audit logs",
      "Single model support",
      "Basic analytics dashboard",
      "Knowledge base upload (max 5 documents)",
      "Standard email support",
    ],
  },
  {
    id: 2,
    price: "$49/month",
    title: "starter",
    description: "For growing teams automating support.",
    limits: [
      "Up to 5,000 tickets/month",
      "1 organization",
      "10 users",
      "3 knowledge bases",
      "Email support",
    ],
    features: [
      "Everything in Free",
      "AI-powered RAG responses",
      "Custom routing rules engine",
      "Automated ticket escalation",
      "Confidence scoring",
      "AI performance dashboard",
      "Human-in-the-loop feedback system",
      "Detailed audit trail explorer",
      "Multi-document knowledge base",
      "Usage tracking dashboard",
      "Basic integration management",
      "Priority email support",
    ],
  },
  {
    id: 3,
    price: "$149/month",
    title: "pro",
    description: "For advanced teams needing full automation & control.",
    limits: [
      "Up to 25,000 tickets/month",
      "Unlimited users",
      "Unlimited knowledge bases",
      "API access",
      "Priority support",
    ],
    features: [
      "Everything in Starter",
      "Advanced AI analytics dashboard",
      "Model performance tracking",
      "Prompt version tracking",
      "Multi-model routing (future-ready)",
      "Advanced rule conditions",
      "Custom queue management",
      "AI cost tracking & breakdown",
      "SLA & escalation insights",
      "Exportable audit logs",
      "Organization-level usage insights",
      "Role-based access control",
      "Webhook retry & reliability guarantees",
      "Dedicated onboarding support",
    ],
  },
];
