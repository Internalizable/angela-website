/* ------------------------------------------------------------------
   Site content & configuration for Angela Barhouch's practice.
   Everything a non-developer might want to tweak lives here.
   ------------------------------------------------------------------ */

export const site = {
  name: "Angela Barhouch",
  role: "Licensed Clinical Psychologist & Psychotherapist",
  credential: "CBT & DBT Trained",
  location: "Beirut, Lebanon",
  phone: "+961 78 993 743",
  phoneHref: "tel:+96178993743",
  email: "hello@angelabarhouch.com",
  modes: "In-person & Online",

  /* Replace with Angela's real Calendly scheduling link.
     The whole booking section + nav button read from this one value. */
  calendlyUrl: "https://calendly.com/angela-barhouch/intro-call",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Who I help", href: "#who" },
  { label: "How it works", href: "#process" },
  { label: "Focus", href: "#focus" },
  { label: "Book", href: "#book" },
];

export const stats = [
  { value: "8+ yrs", label: "Clinical practice" },
  { value: "CBT · DBT", label: "Evidence-based" },
  { value: "AUB", label: "Psychology instructor" },
];

export const credentials = [
  { school: "Kingston University, London", detail: "MSc Clinical Psychology" },
  { school: "American University of Beirut", detail: "BA Psychology · Special Ed. Diploma" },
  { school: "Oxford University", detail: "CBT Supervision & Anxiety / Depression" },
  { school: "Beck Institute", detail: "Advanced CBT for ADHD & Case Conceptualization" },
];

export const audiences = [
  {
    emoji: "🧸",
    title: "Children",
    tint: "var(--tint-kids)",
    accent: "var(--honey)",
    body: "Play-informed, parent-supported care that helps little ones feel understood and build early coping skills.",
    tag: "Ages 4–12",
  },
  {
    emoji: "🎧",
    title: "Teenagers",
    tint: "var(--tint-teens)",
    accent: "var(--sky)",
    body: "A confidential space for identity, self-esteem, emotional regulation and the weight of academic stress.",
    tag: "Ages 13–18",
  },
  {
    emoji: "🌿",
    title: "Adults",
    tint: "var(--tint-adults)",
    accent: "var(--sage)",
    body: "Structured CBT & DBT for anxiety, mood, trauma and the patterns you're ready to gently rewrite.",
    tag: "Individuals",
  },
  {
    emoji: "🤝",
    title: "Parents",
    tint: "var(--tint-parents)",
    accent: "var(--blush)",
    body: "Psychoeducation and parenting-skills coaching to strengthen the relationship at home.",
    tag: "Families",
  },
];

export type ProcessTrack = {
  key: string;
  label: string;
  steps: { title: string; body: string; line: string }[];
};

export const processTracks: ProcessTrack[] = [
  {
    key: "adult",
    label: "Adults",
    steps: [
      {
        title: "Assessment",
        body: "A comprehensive first session to understand your concerns, history and how you're functioning right now.",
        line: "Session 1",
      },
      {
        title: "Psychoeducation",
        body: "We walk through the therapeutic model, your formulation and what the diagnosis means — in plain language.",
        line: "Session 2",
      },
      {
        title: "Treatment",
        body: "Clear, collaborative goals delivered through CBT & DBT, monitored and adjusted as you grow.",
        line: "Ongoing",
      },
    ],
  },
  {
    key: "child",
    label: "Children",
    steps: [
      {
        title: "Parents first",
        body: "We begin with you to gather developmental history and understand what's bringing your child in.",
        line: "Session 1",
      },
      {
        title: "Meeting your child",
        body: "A gentle session with your child, paced to their comfort and built around play and trust.",
        line: "Session 2",
      },
      {
        title: "Feedback & plan",
        body: "Back with parents for feedback, psychoeducation and a treatment plan reviewed throughout therapy.",
        line: "Session 3",
      },
    ],
  },
  {
    key: "teen",
    label: "Teens",
    steps: [
      {
        title: "Straight to the teen",
        body: "Therapy begins directly with your teenager so trust is theirs from the very first session.",
        line: "Session 1",
      },
      {
        title: "Confidential by design",
        body: "Sessions stay private under ethical guidelines — a space that's genuinely their own.",
        line: "Always",
      },
      {
        title: "Safety first",
        body: "Parents are contacted only in an emergency or when there's a risk to your teen's safety or others'.",
        line: "If needed",
      },
    ],
  },
];

export const focusAreas = [
  "Anxiety disorders",
  "Depression & mood",
  "ADHD",
  "Autism spectrum",
  "Emotional dysregulation",
  "Trauma-related difficulties",
  "Personality disorders",
  "Low self-esteem",
  "Identity development",
  "Academic stress",
  "Interpersonal challenges",
  "Behavioural difficulties",
];

export const values = [
  {
    title: "Collaborative",
    body: "You're the expert on your life. We set goals together and check in on what's working.",
  },
  {
    title: "Structured",
    body: "Evidence-based CBT & DBT gives every session a clear purpose and direction.",
  },
  {
    title: "Compassionate",
    body: "Warmth and zero judgement — therapy should feel safe before it feels like work.",
  },
];
