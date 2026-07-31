/* ------------------------------------------------------------------
   Site content & configuration for Angela Barhouch's practice.
   Everything a non-developer might want to tweak lives here.
   ------------------------------------------------------------------ */

export const site = {
  name: "Angela Barhouch",
  role: "Licensed Clinical Psychologist & Psychotherapist",
  credential: "CBT & DBT Trained",
  location: "Beirut, Lebanon",

  /* Must match the Google Business Profile character for character — name,
     address and phone consistency between the site and GBP is foundational
     for local search. Dekwaneh sits in the Matn district of Mount Lebanon
     Governorate (not Beirut Governorate), inside Greater Beirut. */
  address: {
    street: "FortyFour Tower",
    locality: "Dekwaneh",
    region: "Mount Lebanon Governorate",
    country: "LB",
    display: "FortyFour Tower, Dekwaneh",
    area: "Greater Beirut",
  },

  /* Canonical Google Maps listing, by CID. Decoded from the listing's own
     geocode (FID 0x151f179dadb73797:0xeababe886ff05c0c) rather than copied
     from a share URL, so it carries no session tokens and won't rot.
     Linking site <-> profile ties the two entities together for Google. */
  googleMapsUrl: "https://maps.google.com/?cid=16914040843746171916",

  /* Consultation languages. Worth surfacing prominently: "Arabic speaking
     psychologist" and "French speaking therapist" are distinct, high-intent
     searches in Lebanon. BCP-47 codes feed structured data. */
  languages: [
    { code: "en", label: "English" },
    { code: "ar", label: "Arabic" },
    { code: "fr", label: "French" },
  ],

  /* Mirrors the Google Business Profile hours exactly. */
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
      label: "Mon – Thu",
      display: "9:00 AM – 6:00 PM",
    },
    {
      days: ["Friday"],
      opens: "09:00",
      closes: "16:00",
      label: "Friday",
      display: "9:00 AM – 4:00 PM",
    },
  ],
  closedDays: ["Saturday", "Sunday"],

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

/* The header nav is already at its width limit, so FAQ lives in the footer. */
export const footerNav = [...nav.slice(0, -1), { label: "FAQ", href: "#faq" }, nav[nav.length - 1]];

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
export type AudienceIconName = "children" | "teens" | "adults" | "parents" | "work" | "orgs";

export type Audience = {
  icon: AudienceIconName;
  title: string;
  tint: string;
  accent: string;
  body: string;
  tag: string;
};

export const audiences: Audience[] = [
  {
    icon: "children",
    title: "Children",
    tint: "var(--color-tint-kids)",
    accent: "var(--color-honey)",
    body: "Play-informed, parent-supported care that helps little ones feel understood and build early coping skills.",
    tag: "Ages 4–12",
  },
  {
    icon: "teens",
    title: "Teens & adolescents",
    tint: "var(--color-tint-teens)",
    accent: "var(--color-sky)",
    body: "A confidential space for identity, self-esteem, emotional regulation and the weight of academic stress.",
    tag: "Ages 13–18",
  },
  {
    icon: "adults",
    title: "Adults",
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Structured CBT & DBT for anxiety, mood, trauma and the patterns you're ready to gently rewrite.",
    tag: "Individuals",
  },
  {
    icon: "parents",
    title: "Parents",
    tint: "var(--color-tint-parents)",
    accent: "var(--color-blush)",
    body: "Psychoeducation and parenting-skills coaching to strengthen the relationship at home.",
    tag: "Families",
  },
  {
    icon: "work",
    title: "Corporate & businesses",
    tint: "var(--color-tint-work)",
    accent: "var(--color-honey)",
    body: "Workplace wellbeing sessions, stress and burnout workshops, and psychoeducation for managers and teams.",
    tag: "Teams & staff",
  },
  {
    icon: "orgs",
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

/* ------------------------------------------------------------------
   FAQ. Doubles as the source for FAQPage structured data, so every
   answer must stay factually accurate and self-contained — search and
   AI assistants quote these verbatim, without surrounding context.
   ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "Where is Angela Barhouch's practice located?",
    a: "The practice is at FortyFour Tower in Dekwaneh, in the Matn district just north of Beirut, Lebanon. Sessions are available in person there, or online by secure video anywhere in Lebanon and abroad.",
  },
  {
    q: "Do you offer a free consultation or intro call?",
    a: "No. There is no free intro call. Therapy begins with a full first session — a complete clinical assessment — so the work starts from the very first hour.",
  },
  {
    q: "How do I book a therapy session?",
    a: "Booking happens on WhatsApp, directly with Angela rather than through a receptionist or an online scheduler. Message her with who the session is for and what's going on, and she'll suggest times, confirm the fee, and send the address or video link.",
  },
  {
    q: "Who does Angela work with?",
    a: "Children (roughly ages 4–12), teenagers and adolescents (13–18), adults, and parents. She also delivers training and workshops for schools, NGOs, and companies, and provides clinical supervision for practitioners.",
  },
  {
    q: "What is CBT and DBT?",
    a: "Cognitive Behavioral Therapy (CBT) is a structured, evidence-based therapy that works on the links between thoughts, feelings, and behaviour. Dialectical Behavior Therapy (DBT) builds practical skills for emotional regulation, distress tolerance, mindfulness, and relationships. Angela has specialized training in both.",
  },
  {
    q: "What does Angela treat?",
    a: "ADHD, autism spectrum disorder and other neurodevelopmental conditions, anxiety disorders, depression and mood difficulties, trauma, emotional dysregulation, personality disorders, low self-esteem, identity development, academic stress, and interpersonal difficulties.",
  },
  {
    q: "How many therapy sessions will I need?",
    a: "Session 1 is a full assessment and session 2 covers psychoeducation and case formulation. From session 3 onward the treatment plan begins and therapy continues for as long as your goals need, reviewed together as you progress. It is not a fixed three-session package.",
  },
  {
    q: "Is therapy confidential?",
    a: "Yes. Everything shared in session is protected by professional ethical standards. For teenagers, sessions are confidential by design and parents are contacted only in an emergency, or when there is a risk to the teenager's safety or someone else's.",
  },
  {
    q: "Do you offer therapy in Arabic or French?",
    a: "Yes. Angela Barhouch works in Arabic, French and English, and sessions can be held in whichever of the three you are most comfortable thinking and feeling in. You can also mix languages within a session.",
  },
  {
    q: "What are your opening hours?",
    a: "Monday to Thursday, 9:00 AM to 6:00 PM, and Friday 9:00 AM to 4:00 PM. The practice is closed on Saturday and Sunday. WhatsApp messages sent outside those hours are answered when the practice reopens.",
  },
  {
    q: "Do you offer online therapy in Lebanon?",
    a: "Yes. Sessions are available by secure video for clients anywhere in Lebanon and internationally, with the same structure as in-person therapy at the Dekwaneh practice.",
  },
  {
    q: "Do you provide training for organisations?",
    a: "Yes. Angela delivers CBT-informed workshops for schools and NGOs, wellbeing and burnout sessions for corporate teams, and clinical supervision and CBT skills training for psychologists and therapists. Training enquiries start on the same WhatsApp chat as therapy bookings.",
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
