/* ------------------------------------------------------------------
   Site content & configuration for Angela Barhouch's practice.
   Everything a non-developer might want to tweak lives here.
   ------------------------------------------------------------------ */

/* Every URL on the site. Links and page definitions read from here, so a slug
   can only be changed in one place. */
export const paths = {
  home: "/",
  about: "/about",
  arabic: "/ar",
  cbt: "/cbt-therapy-beirut",
  dbt: "/dbt-therapy-beirut",
  online: "/online-therapy-lebanon",
  arabicSpeaking: "/arabic-speaking-psychologist",
  anxiety: "/anxiety-therapy-beirut",
  depression: "/depression-therapy-beirut",
  adhd: "/adhd-therapy-beirut",
  autism: "/autism-support-beirut",
  trauma: "/trauma-ptsd-therapy-beirut",
  personality: "/personality-disorder-therapy-beirut",
  children: "/child-therapy-beirut",
  teens: "/teen-therapy-beirut",
  adults: "/adult-therapy-beirut",
  parents: "/parent-coaching-beirut",
  corporate: "/corporate-training-lebanon",
  schools: "/school-ngo-training-lebanon",
  supervision: "/clinical-supervision-lebanon",
  chooseGuide: "/how-to-choose-a-psychologist-lebanon",
} as const;

export const site = {
  name: "Angela Barhouch",
  /* Spelling as it appears on the Ministry of Public Health register. */
  nameAr: "أنجيلا برهوش",
  /* Name forms used on her official registrations. They go into alternateName
     so assistants can connect this site to those records. */
  registeredNames: ["Angela Issam Barhouch", "Angela Isam Barhouch"],
  role: "Licensed Clinical Psychologist & Psychotherapist",
  credential: "CBT & DBT Trained",
  location: "Beirut, Lebanon",

  /* Drives sitemap lastmod, dateModified and the visible "last updated" line.
     Change it when the copy actually changes, not on every deploy: a date that
     moves without a real edit is a false freshness signal. */
  contentUpdated: "2026-11-06",

  /* Set to the ISO date Angela reviewed the clinical pages. While null, the
     site makes no "clinically reviewed" claim, visibly or in structured data,
     and the build prints a reminder. */
  clinicalReviewDate: null as string | null,

  /* Independently verifiable registration: the strongest trust signal the site
     has. Both records are public; Ministry Circular 113 also urges licence
     holders to display their licence. */
  licence: {
    number: "2021/3/20888",
    category: "Clinical",
    mophListUrl: "https://www.moph.gov.lb/en/Pages/0/40798/list-licensed-clinical-psychologists",
    orderName: "Order of Psychologists in Lebanon",
    orderUrl: "https://lopsy.org",
    orderProfileUrl: "https://lopsy.org/member/11066",
  },

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

  /* The tower's published position. Compare with the Google Business Profile
     pin if that listing is ever moved. */
  geo: { latitude: 33.8805, longitude: 35.5422 },

  /* Canonical Google Maps listing, by CID. Decoded from the listing's own
     geocode (FID 0x151f179dadb73797:0xeababe886ff05c0c) rather than copied
     from a share URL, so it carries no session tokens and won't rot.
     Linking site <-> profile ties the two entities together for Google. */
  googleMapsUrl: "https://maps.google.com/?cid=16914040843746171916",

  /* Profiles that already rank for "Angela Barhouch". They feed sameAs, which
     is how the graph states this domain and those accounts are one person —
     the association a new domain has to earn before it ranks for its own
     name. Only add profiles that are unambiguously hers; a wrong URL here
     asserts a false identity claim rather than a harmless dead link. */
  profiles: [
    "https://lopsy.org/member/11066",
    "https://www.aub.edu.lb/pages/profile.aspx?MemberId=ab174",
    "https://www.linkedin.com/in/angela-barhouch-8420631a1/",
    "https://www.instagram.com/angela.barhouch/",
  ],

  /* Consultation languages. Worth surfacing prominently: "Arabic speaking
     psychologist" is a distinct, high-intent search in Lebanon. BCP-47 codes
     feed structured data. */
  languages: [
    { code: "en", label: "English" },
    { code: "ar", label: "Arabic" },
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

/* Absolute paths so the same header works from every page: on the homepage the
   browser treats these as same-page jumps, elsewhere they load the homepage. */
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Who I help", href: "/#who" },
  { label: "How it works", href: "/#process" },
  { label: "Focus", href: "/#focus" },
  { label: "Training", href: "/#training" },
  { label: "Book", href: "/#book" },
];

/* The footer is the one place that links to every page, which is what lets
   crawlers reach them all and assistants see what the practice covers. */
export const footerGroups = [
  {
    title: "Therapy",
    links: [
      { label: "CBT therapy", href: paths.cbt },
      { label: "DBT therapy", href: paths.dbt },
      { label: "Online therapy", href: paths.online },
      { label: "Therapy in Arabic", href: paths.arabicSpeaking },
    ],
  },
  {
    title: "What I treat",
    links: [
      { label: "Anxiety", href: paths.anxiety },
      { label: "Depression", href: paths.depression },
      { label: "ADHD", href: paths.adhd },
      { label: "Autism support", href: paths.autism },
      { label: "Trauma & PTSD", href: paths.trauma },
      { label: "Personality disorders", href: paths.personality },
    ],
  },
  {
    title: "Who I help",
    links: [
      { label: "Children", href: paths.children },
      { label: "Teens", href: paths.teens },
      { label: "Adults", href: paths.adults },
      { label: "Parents", href: paths.parents },
      { label: "Companies", href: paths.corporate },
      { label: "Schools & NGOs", href: paths.schools },
      { label: "Clinical supervision", href: paths.supervision },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "About Angela", href: paths.about },
      { label: "How therapy works", href: "/#process" },
      { label: "Choosing a psychologist", href: paths.chooseGuide },
      { label: "FAQ", href: "/#faq" },
      { label: "Book a session", href: "/#book" },
    ],
  },
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

/* The itemised record behind the summary above, from Angela's professional
   profile. Degrees are kept apart from short courses because only degrees make
   her an alumna: structured data must not imply she graduated from Oxford. */
export const education = [
  { award: "MSc Clinical Psychology", school: "Kingston University, London", year: 2018 },
  { award: "BA Psychology", school: "American University of Beirut", year: 2017 },
  { award: "Post-Education Diploma in Special Education", school: "American University of Beirut", year: 2017 },
];

export const clinicalTrainings = [
  { award: "CBT Supervision Training (Becoming a Supervisor)", school: "Oxford University" },
  { award: "CBT for Anxiety Disorders", school: "Oxford University" },
  { award: "CBT for Depression", school: "Oxford University" },
  { award: "Advanced CBT Research and Clinical Applications for ADHD", school: "Beck Institute" },
  { award: "CBT Clinical Skills and Case Conceptualization", school: "Beck Institute" },
  { award: "Advanced Cognitive Behavioral Therapy Workshops", school: "Beck Institute" },
];

/* Lebanon's emergency and support lines. 1564 per the Ministry of Public Health. */
export const crisis = {
  lifeline: "1564",
  lifelineUrl: "https://moph.gov.lb/en/view/75556/1564-the-lifeline",
  emergencyNumbers: "112 or 140",
};

/* The cards render as one-liners (icon + title only). `body` and `tag` are
   kept here as reference copy but are not currently displayed. */
export type AudienceIconName = "children" | "teens" | "adults" | "parents" | "work" | "orgs";

export type Audience = {
  icon: AudienceIconName;
  title: string;
  href: string;
  tint: string;
  accent: string;
  body: string;
  tag: string;
};

export const audiences: Audience[] = [
  {
    icon: "children",
    title: "Children",
    href: paths.children,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Play-informed, parent-supported care that helps little ones feel understood and build early coping skills.",
    tag: "Ages 4–12",
  },
  {
    icon: "teens",
    title: "Teens & adolescents",
    href: paths.teens,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "A confidential space for identity, self-esteem, emotional regulation and the weight of academic stress.",
    tag: "Ages 13–18",
  },
  {
    icon: "adults",
    title: "Adults",
    href: paths.adults,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Structured CBT & DBT for anxiety, mood, trauma and the patterns you're ready to gently rewrite.",
    tag: "Individuals",
  },
  {
    icon: "parents",
    title: "Parents",
    href: paths.parents,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Psychoeducation and parenting-skills coaching to strengthen the relationship at home.",
    tag: "Families",
  },
  {
    icon: "work",
    title: "Corporate & businesses",
    href: paths.corporate,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
    body: "Workplace wellbeing sessions, stress and burnout workshops, and psychoeducation for managers and teams.",
    tag: "Teams & staff",
  },
  {
    icon: "orgs",
    title: "NGOs & training",
    href: paths.schools,
    tint: "var(--color-tint-adults)",
    accent: "var(--color-sage)",
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

export const focusAreas: { label: string; href: string }[] = [
  { label: "Anxiety disorders", href: paths.anxiety },
  { label: "Depression & mood", href: paths.depression },
  { label: "ADHD", href: paths.adhd },
  { label: "Autism spectrum", href: paths.autism },
  { label: "Emotional dysregulation", href: paths.dbt },
  { label: "Trauma-related difficulties", href: paths.trauma },
  { label: "Personality disorders", href: paths.personality },
  { label: "Low self-esteem", href: paths.teens },
  { label: "Identity development", href: paths.teens },
  { label: "Academic stress", href: paths.teens },
  { label: "Interpersonal challenges", href: paths.adults },
  { label: "Behavioural difficulties", href: paths.children },
];

/* ------------------------------------------------------------------
   Accredited CBT training Angela has completed. Content is taken
   straight from her certification; update here if it's ever reissued.
   The awarding body is deliberately not named on the site.
   ------------------------------------------------------------------ */
export const trainingProgramme = "Accredited CBT Psychotherapy & Training Programme";

export const trainingCertifications = [
  {
    title: "CBT for Complex Cases",
    items: [
      "Personality disorders",
      "Psychosis & schizophrenia",
      "Trauma & PTSD",
      "Ending treatment & relapse management",
    ],
  },
  {
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
    href: paths.schools,
    body: "CBT-informed workshops for teachers, counsellors and frontline staff — child and adolescent mental health, anxiety, behaviour and safeguarding conversations.",
  },
  {
    title: "Corporate & teams",
    href: paths.corporate,
    body: "Practical sessions on stress, burnout, emotional regulation and supporting a struggling colleague, sized to your team and schedule.",
  },
  {
    title: "Practitioners",
    href: paths.supervision,
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
    a: "The practice is at FortyFour Tower in Dekwaneh, next to Sin El Fil in the Matn district, just north of Beirut, Lebanon. Sessions are available in person there, or online by secure video anywhere in Lebanon and abroad.",
  },
  {
    q: "Is Angela Barhouch a licensed psychologist?",
    a: "Yes. Angela Barhouch holds a Lebanese Ministry of Public Health licence to practise as a clinical psychologist, number 2021/3/20888, and appears on the Ministry's published list of licensed psychologists. She is also listed in the directory of the Order of Psychologists in Lebanon.",
  },
  {
    q: "Is Angela a psychologist or a psychiatrist? Can she prescribe medication?",
    a: "Angela is a clinical psychologist, not a psychiatrist. She provides psychological assessment and psychotherapy and does not prescribe medication. In Lebanon, prescribing is reserved for licensed physicians, including psychiatrists, so any medication would be managed by a physician.",
  },
  {
    q: "How much does a session cost?",
    a: "Angela confirms the current session fee directly on WhatsApp before you book, so you know the cost before you commit to a session.",
  },
  {
    q: "Do you offer a free consultation or intro call?",
    a: "Questions before booking are welcome on WhatsApp. Message Angela with who the session is for and what's going on, and she'll answer what you need to know, explain how she works, and confirm the fee — at no cost. Rather than a separate intro call, therapy itself begins with a full first session, a complete clinical assessment, so the work starts from the very first hour.",
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
    a: "Session 1 is a full assessment and session 2 covers psychoeducation and case formulation. From session 3 onward the treatment plan begins and therapy continues for as long as your goals need, reviewed together as you progress.",
  },
  {
    q: "Is therapy confidential?",
    a: "Yes. Everything shared in session is protected by professional ethical standards. For teenagers, sessions are confidential by design and parents are contacted only in an emergency, or when there is a risk to the teenager's safety or someone else's.",
  },
  {
    q: "Do you offer therapy in Arabic?",
    a: "Yes. Angela Barhouch works in Arabic and English, and sessions can be held in whichever of the two you are most comfortable thinking and feeling in. You can also move between the two within a session.",
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
  {
    q: "What should I do in a mental health emergency?",
    a: "Do not wait for a WhatsApp reply. If you or someone else is in immediate danger in Lebanon, call 112 or 140. For confidential emotional support, call 1564, the national psychological support and suicide-prevention lifeline run by the Ministry of Public Health with Embrace, available 24/7.",
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
