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
  email: "angela.barhouch@hotmail.com",
  emailHref: "mailto:angela.barhouch@hotmail.com",
  modes: "In-person & Online",

  /* Every "Book a session" CTA on the site opens this chat.
     Booking happens directly with Angela on WhatsApp Business. */
  whatsappUrl: "https://wa.me/message/GKBJIIJAJNRJJ1",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Who I help", href: "#who" },
  { label: "How it works", href: "#process" },
  { label: "Focus", href: "#focus" },
  { label: "Training", href: "#training" },
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

/* The cards render as one-liners (icon + title only). `body` and `tag` are
   kept here as reference copy but are not currently displayed. */
export const audiences = [
  {
    emoji: "🧸",
    title: "Children",
    tint: "var(--color-tint-kids)",
    accent: "var(--color-honey)",
    body: "Play-informed, parent-supported care that helps little ones feel understood and build early coping skills.",
    tag: "Ages 4–12",
  },
  {
    emoji: "🎧",
    title: "Teens & adolescents",
    tint: "var(--color-tint-teens)",
    accent: "var(--color-sky)",
    body: "A confidential space for identity, self-esteem, emotional regulation and the weight of academic stress.",
    tag: "Ages 13–18",
  },
  {
    emoji: "🌿",
    title: "Adults",
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Structured CBT & DBT for anxiety, mood, trauma and the patterns you're ready to gently rewrite.",
    tag: "Individuals",
  },
  {
    emoji: "🤝",
    title: "Parents",
    tint: "var(--color-tint-parents)",
    accent: "var(--color-blush)",
    body: "Psychoeducation and parenting-skills coaching to strengthen the relationship at home.",
    tag: "Families",
  },
  {
    emoji: "💼",
    title: "Corporate & businesses",
    tint: "var(--color-tint-work)",
    accent: "var(--color-honey)",
    body: "Workplace wellbeing sessions, stress and burnout workshops, and psychoeducation for managers and teams.",
    tag: "Teams & staff",
  },
  {
    emoji: "🎓",
    title: "NGOs & training",
    tint: "var(--color-tint-orgs)",
    accent: "var(--color-sky)",
    body: "Accredited CBT-informed training, workshops and clinical supervision for NGOs, schools and practitioners.",
    tag: "Organisations",
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
        title: "Treatment plan starts",
        body: "Clear, collaborative goals delivered through CBT & DBT — reviewed and adjusted for as many sessions as your progress needs.",
        line: "Session 3+ · ongoing",
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
        title: "Feedback & treatment plan starts",
        body: "Back with parents for feedback and psychoeducation, then therapy begins — an ongoing plan reviewed together as your child progresses.",
        line: "Session 3+ · ongoing",
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
        title: "Confidential case formulation",
        body: "We map out what's going on and share the formulation with your teen. Sessions stay private — parents are contacted only in an emergency or when there's a risk to their safety or someone else's.",
        line: "Session 2",
      },
      {
        title: "Treatment plan starts",
        body: "Goals set with your teen and worked through with CBT & DBT, continuing for as many sessions as their progress needs.",
        line: "Session 3+ · ongoing",
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

/* ------------------------------------------------------------------
   Accredited CBT training. Figures below are taken straight from
   Angela's letter of completion; update here if it's ever reissued.
   The awarding body is deliberately not named on the site.
   ------------------------------------------------------------------ */
export const trainingProgramme = "Accredited CBT Psychotherapy & Training Programme";

export const trainingStats = [
  { value: "2,432", label: "Total training hours" },
  { value: "1,350", label: "Supervision hours" },
  { value: "High Distinction", label: "Final award" },
];

export const trainingPathways = [
  {
    tag: "Pathway I",
    title: "CBT for Complex Cases",
    items: [
      "Personality disorders",
      "Psychosis & schizophrenia",
      "Trauma & PTSD",
      "Ending treatment & relapse management",
    ],
  },
  {
    tag: "Pathway II",
    title: "CBT for Children & Adolescents",
    items: [
      "Adjusting CBT for children",
      "Session structure with parents & adolescents",
      "OCD, phobias, social & test anxiety",
      "ADHD / ODD, trauma & separation anxiety",
      "Typical vs atypical anxiety in children",
    ],
  },
  {
    tag: "Pathway III",
    title: "CBT for Trainers & Supervisors",
    items: [
      "CBT supervision & group supervision",
      "The supervisory relationship & contracting",
      "Identifying training needs & evaluating impact",
      "Ethics & diversity, including neurodiversity",
    ],
  },
];

/* Training and workshops Angela delivers to organisations. */
export const trainingOffers = [
  {
    title: "Schools & NGOs",
    body: "CBT-informed workshops for teachers, counsellors and frontline staff — child and adolescent mental health, anxiety, behaviour and safeguarding conversations.",
  },
  {
    title: "Corporate & teams",
    body: "Practical sessions on stress, burnout, emotional regulation and supporting a struggling colleague, sized to your team and schedule.",
  },
  {
    title: "Practitioners",
    body: "Clinical supervision and CBT skills training for psychologists and therapists, grounded in accredited supervisor-level qualification.",
  },
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
