import { paths } from "../site";

/* ------------------------------------------------------------------
   One entry per landing page. Assistants split a question like "CBT for
   teenage anxiety in Beirut, in Arabic" into several searches and pick the
   page that answers each part, so every topic needs its own URL.

   Rules for editing this file, because this is health content:
   - Statements about Angela must come from her professional profile or
     from something she has confirmed. Never add a service, technique,
     result or statistic she hasn't confirmed.
   - Statements about a condition or treatment need an entry in `sources`.
   - `lead` and every FAQ answer must make sense quoted alone, so they name
     Angela and the place rather than saying "we" or "here".
   ------------------------------------------------------------------ */

export type Source = { org: string; title: string; url: string };

export type TopicSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type TopicGroup = "therapy" | "condition" | "audience" | "organisation" | "guide";

export type Topic = {
  path: string;
  group: TopicGroup;
  /** Short name for breadcrumbs and related-page links. */
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: TopicSection[];
  faqs: { q: string; a: string }[];
  sources: Source[];
  related: string[];
  /** Adds the emergency note and marks the page as medical content. */
  clinical: boolean;
  /** The thing this page is about, for structured data. */
  about?: { type: "MedicalCondition" | "MedicalTherapy"; name: string; sameAs: string };
  serviceType: string;
};

const sources = {
  nimh: {
    org: "US National Institute of Mental Health",
    title: "Psychotherapies",
    url: "https://www.nimh.nih.gov/health/topics/psychotherapies",
  },
  niceAnxiety: {
    org: "NICE (UK)",
    title: "Generalised anxiety disorder and panic disorder in adults: management (CG113, updated 2020)",
    url: "https://www.nice.org.uk/guidance/cg113/chapter/Recommendations",
  },
  niceDepression: {
    org: "NICE (UK)",
    title: "Depression in adults: treatment and management (NG222, 2022)",
    url: "https://www.nice.org.uk/guidance/ng222/chapter/Recommendations",
  },
  niceDepressionYoung: {
    org: "NICE (UK)",
    title: "Depression in children and young people: identification and management (NG134, 2019)",
    url: "https://www.nice.org.uk/guidance/ng134/chapter/Recommendations",
  },
  nicePtsd: {
    org: "NICE (UK)",
    title: "Post-traumatic stress disorder (NG116, 2018)",
    url: "https://www.nice.org.uk/guidance/ng116/chapter/Recommendations",
  },
  niceAdhd: {
    org: "NICE (UK)",
    title: "Attention deficit hyperactivity disorder: diagnosis and management (NG87, updated 2019)",
    url: "https://www.nice.org.uk/guidance/ng87/chapter/Recommendations",
  },
  niceAutism: {
    org: "NICE (UK)",
    title: "Autism spectrum disorder in under 19s: support and management (CG170, updated 2021)",
    url: "https://www.nice.org.uk/guidance/cg170/chapter/Recommendations",
  },
  niceBpd: {
    org: "NICE (UK)",
    title: "Borderline personality disorder: recognition and management (CG78, 2009)",
    url: "https://www.nice.org.uk/guidance/cg78/chapter/Recommendations",
  },
  niceSelfHarm: {
    org: "NICE (UK)",
    title: "Self-harm: assessment, management and preventing recurrence (NG225, 2022)",
    url: "https://www.nice.org.uk/guidance/ng225/chapter/Recommendations",
  },
  whoAnxiety: {
    org: "World Health Organization",
    title: "Anxiety disorders: fact sheet (2026)",
    url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
  },
  whoDepression: {
    org: "World Health Organization",
    title: "Depression: fact sheet (2026)",
    url: "https://www.who.int/news-room/fact-sheets/detail/depression",
  },
  whoAdolescents: {
    org: "World Health Organization",
    title: "Mental health of adolescents: fact sheet (2025)",
    url: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health",
  },
  karam: {
    org: "The Lancet",
    title: "Karam EG et al. Prevalence and treatment of mental disorders in Lebanon: a national epidemiological survey (2006)",
    url: "https://hcp.hms.harvard.edu/publication/prevalence-and-treatment-mental-disorders-lebanon-national-epidemiological-survey",
  },
  mophCircular: {
    org: "Lebanese Ministry of Public Health",
    title: "Circular No. 113: mandatory licensing for the practice of the profession of psychologist (2017)",
    url: "https://moph.gov.lb/userfiles/files/Licensing%20of%20psychologists%20in%20Lebanon.pdf",
  },
  mophList: {
    org: "Lebanese Ministry of Public Health",
    title: "List of clinical psychologists with a license to practice in Lebanon",
    url: "https://www.moph.gov.lb/en/Pages/0/40798/list-licensed-clinical-psychologists",
  },
  order: {
    org: "Order of Psychologists in Lebanon",
    title: "Professional directory of members",
    url: "https://lopsy.org/members",
  },
} satisfies Record<string, Source>;

const WHERE = "in person at FortyFour Tower in Dekwaneh, Greater Beirut, or online by secure video";

export const topics: Topic[] = [
  /* ---------------------------- Therapies ---------------------------- */
  {
    path: paths.cbt,
    group: "therapy",
    label: "CBT therapy",
    title: "CBT Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "Cognitive Behavioral Therapy with licensed clinical psychologist Angela Barhouch in Dekwaneh, Beirut. For all ages, in Arabic or English, in person or online.",
    eyebrow: "Cognitive Behavioral Therapy",
    h1: "CBT therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who provides Cognitive Behavioral Therapy (CBT) for children, teenagers and adults, with parents involved where it helps. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "What is CBT?",
        body: [
          "Cognitive Behavioral Therapy is a structured, evidence-based psychotherapy. The US National Institute of Mental Health describes it as helping a person become aware of automatic ways of thinking that are inaccurate or harmful, question those thoughts, understand how they affect emotions and behaviour, and change self-defeating patterns.",
        ],
      },
      {
        heading: "What can CBT help with?",
        body: [
          "NICE, the UK's national guidance body, includes CBT among its recommended options for generalised anxiety disorder, panic disorder and depression in adults, and recommends trauma-focused CBT for post-traumatic stress disorder.",
          "In Angela's practice, CBT is used across anxiety disorders, depression and mood difficulties, ADHD, trauma-related difficulties, low self-esteem, academic stress and behavioural difficulties.",
        ],
      },
      {
        heading: "How CBT with Angela works",
        bullets: [
          "Session 1: a comprehensive assessment of your concerns, history and current functioning.",
          "Session 2: psychoeducation, in which Angela explains the therapeutic model, the formulation and what any diagnosis means.",
          "Session 3 onward: a collaborative treatment plan with clear goals, monitored and adjusted as you progress.",
        ],
      },
      {
        heading: "Angela's CBT training",
        bullets: [
          "CBT for Anxiety Disorders and CBT for Depression, Oxford University",
          "CBT Supervision Training (Becoming a Supervisor), Oxford University",
          "Advanced CBT Research and Clinical Applications for ADHD, Beck Institute",
          "CBT Clinical Skills and Case Conceptualization, Beck Institute",
          "Accredited CBT programme covering complex cases, children and adolescents, and trainers and supervisors",
        ],
      },
    ],
    faqs: [
      {
        q: "How many CBT sessions will I need with Angela Barhouch?",
        a: "Therapy with Angela is not a fixed package. The treatment plan starts at session 3 and continues for as long as your goals need. As a reference point, NICE describes CBT for generalised anxiety disorder as usually 12 to 15 weekly sessions, and individual CBT for depression as usually 8 sessions for less severe depression and 16 for more severe depression.",
      },
      {
        q: "Is CBT available in Arabic in Lebanon?",
        a: "Yes. Angela Barhouch provides CBT in Arabic and in English, in person in Dekwaneh, Greater Beirut, and online.",
      },
      {
        q: "Can I do CBT online?",
        a: "Yes. Angela Barhouch offers CBT by secure video, with the same structure as in-person sessions, for clients anywhere in Lebanon and abroad.",
      },
    ],
    sources: [sources.nimh, sources.niceAnxiety, sources.niceDepression, sources.nicePtsd],
    related: [paths.anxiety, paths.depression, paths.dbt, paths.online],
    clinical: true,
    about: {
      type: "MedicalTherapy",
      name: "Cognitive Behavioral Therapy",
      sameAs: "https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy",
    },
    serviceType: "Cognitive Behavioral Therapy",
  },
  {
    path: paths.dbt,
    group: "therapy",
    label: "DBT therapy",
    title: "DBT Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "DBT skills for emotional dysregulation and relationships with Angela Barhouch, licensed clinical psychologist in Beirut. Arabic or English, in person or online.",
    eyebrow: "Dialectical Behavior Therapy",
    h1: "DBT therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist trained in Dialectical Behavior Therapy (DBT). She uses DBT interventions in therapy for emotional dysregulation and interpersonal difficulties, in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "What is DBT?",
        body: [
          "Dialectical Behavior Therapy builds practical skills in four areas: emotional regulation, distress tolerance, mindfulness and relationships.",
        ],
      },
      {
        heading: "Who is DBT for?",
        body: [
          "In Angela's practice, DBT interventions are used alongside CBT with teenagers and adults working on emotional dysregulation, personality disorders and interpersonal difficulties.",
          "NICE guidance in the UK suggests considering a comprehensive DBT programme for women with borderline personality disorder for whom reducing recurrent self-harm is a priority, and DBT adapted for adolescents for young people with significant emotional dysregulation who frequently self-harm.",
        ],
      },
      {
        heading: "How DBT with Angela works",
        body: [
          "Therapy starts with a comprehensive assessment and a psychoeducation session, so you understand the model and your formulation before treatment begins. From session 3, you and Angela set clear goals and work through them using DBT and CBT interventions, adjusting the plan as you progress.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between CBT and DBT?",
        a: "CBT focuses on the links between thoughts, feelings and behaviour. DBT builds on this with specific skills for emotional regulation, distress tolerance, mindfulness and relationships. Angela Barhouch is trained in both and uses whichever interventions fit the treatment plan.",
      },
      {
        q: "Does Angela Barhouch offer DBT for teenagers?",
        a: "Yes. Angela works with teenagers on emotional regulation, using CBT and DBT interventions. Sessions with teenagers are confidential, and parents are contacted only in an emergency or when there is a risk to the teenager's safety or someone else's.",
      },
    ],
    sources: [sources.niceBpd, sources.niceSelfHarm],
    related: [paths.personality, paths.teens, paths.cbt, paths.adults],
    clinical: true,
    about: {
      type: "MedicalTherapy",
      name: "Dialectical Behavior Therapy",
      sameAs: "https://en.wikipedia.org/wiki/Dialectical_behavior_therapy",
    },
    serviceType: "Dialectical Behavior Therapy",
  },
  {
    path: paths.online,
    group: "therapy",
    label: "Online therapy",
    title: "Online Therapy in Lebanon, in Arabic or English | Angela Barhouch",
    description:
      "Online therapy by secure video with Angela Barhouch, a licensed clinical psychologist in Lebanon. CBT and DBT in Arabic or English, in Lebanon and abroad.",
    eyebrow: "Online sessions",
    h1: "Online therapy in Lebanon and abroad",
    lead: "Angela Barhouch, a licensed clinical psychologist in Lebanon, offers online therapy by secure video in Arabic and English. Sessions are available to clients anywhere in Lebanon and abroad, and follow the same structure as in-person therapy at her practice in Dekwaneh.",
    sections: [
      {
        heading: "Who online therapy suits",
        bullets: [
          "People in Lebanon who live outside Greater Beirut, or for whom travel is difficult",
          "Lebanese and Arabic-speaking people living abroad who want therapy in Arabic",
          "People whose work or study schedule makes a clinic visit hard to fit in",
        ],
      },
      {
        heading: "How online sessions work",
        body: [
          "Booking happens on WhatsApp, directly with Angela. Tell her who the session is for and what's going on, and she'll suggest times, confirm the fee and send the video link.",
          "Online therapy follows the same path as in-person therapy: a full assessment in session 1, psychoeducation and case formulation in session 2, and a treatment plan from session 3 onward.",
        ],
      },
      {
        heading: "Preparing for an online session",
        bullets: [
          "Find a private place where you won't be overheard or interrupted",
          "Use a stable internet connection, and headphones if others are nearby",
          "Keep Lebanon's emergency numbers, or your local ones if you're abroad, to hand",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I do online therapy with Angela Barhouch from outside Lebanon?",
        a: "Yes. Angela Barhouch offers online sessions by secure video to clients abroad as well as anywhere in Lebanon, in Arabic or English.",
      },
      {
        q: "Is online therapy different from in-person therapy with Angela?",
        a: "The structure is the same: an assessment, then psychoeducation and case formulation, then an ongoing treatment plan using CBT and DBT. The difference is the format, secure video rather than the practice in Dekwaneh.",
      },
    ],
    sources: [],
    related: [paths.arabicSpeaking, paths.cbt, paths.adults, paths.anxiety],
    clinical: true,
    serviceType: "Online psychotherapy",
  },
  {
    path: paths.arabicSpeaking,
    group: "therapy",
    label: "Therapy in Arabic",
    title: "Arabic-Speaking Psychologist in Beirut and Online | Angela Barhouch",
    description:
      "Angela Barhouch is an Arabic- and English-speaking licensed clinical psychologist in Beirut. CBT and DBT in Arabic, in person in Dekwaneh or online worldwide.",
    eyebrow: "Therapy in Arabic and English",
    h1: "An Arabic-speaking psychologist in Beirut and online",
    lead: `Angela Barhouch is a licensed clinical psychologist who works in Arabic and English. You can hold sessions in whichever of the two you are most comfortable thinking and feeling in, and move between them within a session, ${WHERE}.`,
    sections: [
      {
        heading: "Why language matters in therapy",
        body: [
          "Therapy depends on describing what is happening inside you with precision. Many people in Lebanon and across the Arabic-speaking diaspora move between Arabic and English every day, and some experiences are easier to name in one language than the other. With Angela, you don't have to choose in advance or stick to one.",
        ],
      },
      {
        heading: "Who Angela sees in Arabic",
        body: [
          "Angela works with children, teenagers, adults and parents, and treats concerns including anxiety, depression, ADHD, autism spectrum disorder, trauma, emotional dysregulation and personality disorders. The same structured CBT and DBT approach applies in both languages.",
        ],
      },
      {
        heading: "Arabic-speaking clients outside Lebanon",
        body: [
          "Online sessions by secure video are open to clients abroad, which makes therapy in Arabic possible for people living somewhere Arabic-speaking psychologists are hard to find.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch offer therapy in Arabic?",
        a: "Yes. Angela Barhouch works in Arabic and English, and sessions can be held in either. You can also move between the two within a session.",
      },
      {
        q: "Can I see an Arabic-speaking psychologist online from abroad?",
        a: "Yes. Angela Barhouch, a licensed clinical psychologist in Lebanon, offers online sessions in Arabic by secure video to clients abroad. Booking happens on WhatsApp.",
      },
    ],
    sources: [],
    related: [paths.arabic, paths.online, paths.adults, paths.cbt],
    clinical: true,
    serviceType: "Psychotherapy in Arabic",
  },

  /* ---------------------------- Conditions --------------------------- */
  {
    path: paths.anxiety,
    group: "condition",
    label: "Anxiety therapy",
    title: "Anxiety Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "CBT for anxiety with Angela Barhouch, licensed clinical psychologist trained at Oxford. For children, teens and adults in Beirut or online, in Arabic or English.",
    eyebrow: "Anxiety disorders",
    h1: "Anxiety therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who treats anxiety disorders in children, teenagers and adults using Cognitive Behavioral Therapy, with training in CBT for anxiety disorders from Oxford University. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How common is anxiety?",
        body: [
          "The World Health Organization reports that 470 million people had an anxiety disorder in 2023, about 5.8% of the world's population, and that only about 1 in 4 people who need treatment receive any.",
        ],
      },
      {
        heading: "How anxiety is treated",
        body: [
          "NICE guidance in the UK recommends offering CBT or applied relaxation when a person with generalised anxiety disorder chooses a high-intensity psychological treatment, and CBT for panic disorder. The US National Institute of Mental Health describes exposure therapy, a type of CBT, as a treatment used for anxiety disorders.",
        ],
      },
      {
        heading: "What Angela works on",
        bullets: [
          "Anxiety disorders in adults and young people",
          "OCD, phobias, social anxiety and test anxiety in children and teenagers",
          "Separation anxiety, and telling typical from atypical anxiety in children",
          "Anxiety alongside ADHD, autism spectrum disorder, depression or trauma",
        ],
      },
      {
        heading: "How therapy for anxiety starts",
        body: [
          "For adults, session 1 is a full assessment and session 2 explains the model and your formulation. The treatment plan starts at session 3. Children begin with a session for parents, and teenagers begin directly and confidentially.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need medication for anxiety, or can therapy be enough?",
        a: "That depends on the person and is worth discussing with a clinician. NICE guidance on generalised anxiety disorder says to base the choice between psychological and drug treatment on the person's preference, as there is no evidence that either is better. Angela Barhouch is a psychologist and does not prescribe; in Lebanon, medication is prescribed by physicians.",
      },
      {
        q: "How long does CBT for anxiety usually take?",
        a: "NICE describes CBT for generalised anxiety disorder as usually 12 to 15 weekly sessions. With Angela Barhouch there is no fixed package: the treatment plan continues for as long as your goals need, and you review progress together.",
      },
      {
        q: "Does Angela Barhouch treat anxiety in children?",
        a: "Yes. Angela works with children aged roughly 4 to 12 and teenagers aged 13 to 18, with training in CBT for OCD, phobias, social and test anxiety, and separation anxiety.",
      },
    ],
    sources: [sources.whoAnxiety, sources.niceAnxiety, sources.nimh],
    related: [paths.cbt, paths.children, paths.teens, paths.online],
    clinical: true,
    about: { type: "MedicalCondition", name: "Anxiety disorder", sameAs: "https://en.wikipedia.org/wiki/Anxiety_disorder" },
    serviceType: "Psychotherapy for anxiety disorders",
  },
  {
    path: paths.depression,
    group: "condition",
    label: "Depression therapy",
    title: "Depression Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "Evidence-based therapy for depression with Angela Barhouch, licensed clinical psychologist in Beirut. CBT and DBT in Arabic or English, in person or online.",
    eyebrow: "Depression and mood",
    h1: "Depression therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who treats depression and mood difficulties in teenagers and adults, with training in CBT for depression from Oxford University. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How common is depression?",
        body: [
          "The World Health Organization estimates that 5.2% of adults worldwide have depression. In Lebanon, a national survey published in The Lancet in 2006, using data from 2002 and 2003, found that only 10.9% of people with a mental disorder in the past year had obtained treatment.",
        ],
      },
      {
        heading: "How depression is treated",
        body: [
          "The WHO presents psychological treatment as a first-line approach to depression, which can be combined with antidepressants for moderate and severe depression, and lists CBT among the evidence-based options. NICE guidance in the UK also includes individual CBT among its treatment options for adults, and for young people aged 12 to 18 with moderate to severe depression.",
        ],
      },
      {
        heading: "How Angela works with depression",
        body: [
          "Therapy starts with a comprehensive assessment of your concerns, history and how you're functioning now. In session 2, Angela explains the formulation and what any diagnosis means in plain language. From session 3 you work through a collaborative plan with clear goals, using CBT and DBT interventions, with progress reviewed along the way.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does therapy for depression take?",
        a: "NICE describes individual CBT for depression as usually 8 sessions for less severe depression and 16 for more severe depression, with more sessions where needed. With Angela Barhouch there is no fixed package; therapy continues for as long as your goals need.",
      },
      {
        q: "Can a psychologist in Lebanon prescribe antidepressants?",
        a: "No. Lebanon's Ministry of Public Health states that psychologists must abstain from prescribing medication, which is an exclusive right of licensed physicians. Angela Barhouch provides psychotherapy; a physician such as a psychiatrist would manage any antidepressant.",
      },
    ],
    sources: [sources.whoDepression, sources.karam, sources.niceDepression, sources.niceDepressionYoung, sources.mophCircular],
    related: [paths.cbt, paths.adults, paths.teens, paths.chooseGuide],
    clinical: true,
    about: {
      type: "MedicalCondition",
      name: "Major depressive disorder",
      sameAs: "https://en.wikipedia.org/wiki/Major_depressive_disorder",
    },
    serviceType: "Psychotherapy for depression",
  },
  {
    path: paths.adhd,
    group: "condition",
    label: "ADHD therapy",
    title: "ADHD Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "Psychological support for ADHD in children, teens and adults with Angela Barhouch, a licensed clinical psychologist in Beirut trained at the Beck Institute.",
    eyebrow: "ADHD",
    h1: "ADHD therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works with children, teenagers and adults with ADHD, and with their parents. She has completed Advanced CBT Research and Clinical Applications for ADHD at the Beck Institute. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "What ADHD therapy involves",
        body: [
          "Psychological work for ADHD focuses on managing symptoms and the difficulties they cause day to day. NICE guidance in the UK says psychological treatment for adults with ADHD should include, as a minimum, a structured supportive intervention focused on ADHD with regular follow-up, and may involve elements of or a full course of CBT.",
          "For young people who have benefited from medication but still have significant difficulties, NICE suggests considering CBT that addresses areas such as social skills and problem-solving.",
        ],
      },
      {
        heading: "ADHD support at different ages",
        bullets: [
          "Children: parents come first, to share developmental history and concerns, and stay involved as therapy progresses",
          "Teenagers: confidential sessions on self-esteem, academic stress, emotional regulation and behaviour",
          "Adults: structured CBT and DBT interventions for the difficulties ADHD causes at work, in study and in relationships",
          "Parents: psychoeducation and parenting skills training",
        ],
      },
      {
        heading: "Parents of children with ADHD",
        body: [
          "NICE is explicit that recommending parent training does not imply bad parenting. Its aim is to build the skills that meet the above-average parenting needs of children with ADHD. Angela supports parents through psychoeducation, parenting skills training and guidance.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch prescribe ADHD medication?",
        a: "No. Angela Barhouch is a clinical psychologist and does not prescribe. In Lebanon, medication is prescribed by licensed physicians, so ADHD medication would be managed by a physician such as a psychiatrist.",
      },
      {
        q: "Does Angela Barhouch work with adults who have ADHD?",
        a: "Yes. Angela Barhouch works with ADHD in adults as well as children and teenagers, using CBT and DBT interventions, in Arabic or English, in person in Dekwaneh, Greater Beirut, or online.",
      },
    ],
    sources: [sources.niceAdhd, sources.mophCircular],
    related: [paths.children, paths.parents, paths.teens, paths.autism],
    clinical: true,
    about: {
      type: "MedicalCondition",
      name: "Attention deficit hyperactivity disorder",
      sameAs: "https://en.wikipedia.org/wiki/Attention_deficit_hyperactivity_disorder",
    },
    serviceType: "Psychotherapy for ADHD",
  },
  {
    path: paths.autism,
    group: "condition",
    label: "Autism support",
    title: "Autism Support and Therapy in Beirut | Angela Barhouch",
    description:
      "Psychological support for autistic children, teens and adults, and their parents, with Angela Barhouch, a licensed clinical psychologist in Beirut.",
    eyebrow: "Autism spectrum",
    h1: "Autism support and therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who supports autistic children, teenagers and adults, and their parents. She also holds a Post-Education Diploma in Special Education from the American University of Beirut. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "What therapy can focus on",
        body: [
          "Angela's work focuses on managing the difficulties that get in the way of daily life, such as anxiety, emotional dysregulation, behaviour, self-esteem and relationships, and on helping parents understand and respond to their child's needs.",
        ],
      },
      {
        heading: "How CBT can be adapted",
        body: ["For autistic children and young people with anxiety, NICE guidance in the UK suggests considering CBT adapted in ways such as:"],
        bullets: [
          "Emotion recognition training",
          "More written and visual information, with structured worksheets",
          "A more concrete and structured approach, with simplified activities",
          "Involving a parent or carer to support the work",
          "Regular breaks to help maintain attention",
        ],
      },
      {
        heading: "Support for parents",
        body: [
          "Angela works with parents through psychoeducation, parenting skills training and guidance aimed at strengthening the parent-child relationship, improving communication and managing behavioural and emotional difficulties.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch work with autistic adults?",
        a: "Yes. Angela Barhouch works with autism spectrum disorder across the lifespan, including children, teenagers and adults, in Arabic or English.",
      },
      {
        q: "How does therapy start for an autistic child?",
        a: "With Angela Barhouch, child therapy starts with a session for parents to gather developmental history and understand concerns. The second session is with the child, and the third is with parents for feedback, psychoeducation and treatment planning.",
      },
    ],
    sources: [sources.niceAutism],
    related: [paths.children, paths.parents, paths.adhd, paths.teens],
    clinical: true,
    about: { type: "MedicalCondition", name: "Autism spectrum disorder", sameAs: "https://en.wikipedia.org/wiki/Autism" },
    serviceType: "Psychological support for autism spectrum disorder",
  },
  {
    path: paths.trauma,
    group: "condition",
    label: "Trauma & PTSD therapy",
    title: "Trauma and PTSD Therapy in Beirut, Lebanon | Angela Barhouch",
    description:
      "Therapy for trauma and PTSD with Angela Barhouch, licensed clinical psychologist in Beirut. For children, teens and adults, in Arabic or English.",
    eyebrow: "Trauma and PTSD",
    h1: "Trauma and PTSD therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works with trauma-related difficulties in children, teenagers and adults. Her accredited CBT training includes trauma and PTSD in complex cases and in children and adolescents. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How trauma and PTSD are treated",
        body: [
          "NICE guidance in the UK recommends offering individual trauma-focused CBT to adults with a diagnosis or clinically important symptoms of PTSD more than one month after a traumatic event, and to children and young people aged 7 to 17 more than three months after one.",
          "NICE advises against drug treatments to prevent or treat PTSD in under-18s. For adults, it advises against drug treatments for prevention, and suggests considering them for treatment if the person prefers them.",
        ],
      },
      {
        heading: "How Angela works with trauma",
        body: [
          "Therapy starts with an assessment of your concerns, history and current functioning, followed by a session that explains the formulation and how treatment will work, so you know what to expect before the treatment plan begins. Goals are set together and reviewed as you progress.",
        ],
      },
      {
        heading: "Trauma in children and teenagers",
        body: [
          "For children, Angela begins with parents to understand developmental history and what's bringing the child in, then meets the child at a pace that suits them. Teenagers begin directly, and their sessions are confidential unless there is an emergency or a risk to their safety or someone else's.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is therapy for trauma available in Arabic in Lebanon?",
        a: "Yes. Angela Barhouch offers therapy for trauma-related difficulties in Arabic and English, in person in Dekwaneh, Greater Beirut, or online by secure video.",
      },
      {
        q: "What is the recommended treatment for PTSD?",
        a: "NICE guidance in the UK recommends individual trauma-focused CBT for adults, children and young people with PTSD, depending on age and time since the event. An assessment with a clinician is the way to find out what suits your situation.",
      },
    ],
    sources: [sources.nicePtsd],
    related: [paths.cbt, paths.adults, paths.teens, paths.depression],
    clinical: true,
    about: {
      type: "MedicalCondition",
      name: "Post-traumatic stress disorder",
      sameAs: "https://en.wikipedia.org/wiki/Post-traumatic_stress_disorder",
    },
    serviceType: "Psychotherapy for trauma and PTSD",
  },
  {
    path: paths.personality,
    group: "condition",
    label: "Personality disorders",
    title: "Personality Disorder Therapy in Beirut | Angela Barhouch",
    description:
      "Therapy for personality disorders and emotional dysregulation with Angela Barhouch, licensed clinical psychologist in Beirut, using CBT and DBT.",
    eyebrow: "Personality disorders",
    h1: "Therapy for personality disorders in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works with personality disorders and emotional dysregulation using CBT and DBT interventions. Her accredited CBT training covers personality disorders in complex cases. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How personality disorders are treated",
        body: [
          "Psychological therapy is central to treatment. NICE guidance on borderline personality disorder says drug treatment should not be used specifically for the disorder or its individual symptoms, and suggests considering a comprehensive DBT programme for women for whom reducing recurrent self-harm is a priority.",
        ],
      },
      {
        heading: "What therapy works on",
        bullets: [
          "Understanding patterns in emotions, thinking and relationships",
          "Skills for regulating intense emotions and tolerating distress",
          "Relationships and interpersonal difficulties",
          "Insight, effective coping skills and long-term resilience",
        ],
      },
      {
        heading: "How therapy with Angela starts",
        body: [
          "Session 1 is a comprehensive assessment. In session 2, Angela explains the formulation and what any diagnosis means in plain language. The treatment plan starts at session 3, with clear goals that are reviewed and adjusted as you progress.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch treat borderline personality disorder?",
        a: "Angela Barhouch works with personality disorders and emotional dysregulation, using CBT and DBT interventions in Arabic or English. A first assessment session establishes what's going on and whether her approach fits your needs.",
      },
      {
        q: "Is medication used to treat borderline personality disorder?",
        a: "NICE guidance says drug treatment should not be used specifically for borderline personality disorder or its individual symptoms, though a physician may treat coexisting conditions. Angela Barhouch is a psychologist and does not prescribe.",
      },
    ],
    sources: [sources.niceBpd],
    related: [paths.dbt, paths.adults, paths.trauma, paths.cbt],
    clinical: true,
    about: { type: "MedicalCondition", name: "Personality disorder", sameAs: "https://en.wikipedia.org/wiki/Personality_disorder" },
    serviceType: "Psychotherapy for personality disorders",
  },

  /* ----------------------------- Audiences --------------------------- */
  {
    path: paths.children,
    group: "audience",
    label: "Child therapy",
    title: "Child Psychologist in Beirut, Lebanon | Angela Barhouch",
    description:
      "Child therapy with Angela Barhouch, licensed clinical psychologist in Beirut. Parent-supported CBT for children aged 4 to 12, in Arabic or English.",
    eyebrow: "Children, ages 4 to 12",
    h1: "Child therapy in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works with children aged roughly 4 to 12, with parents involved throughout. Her accredited CBT training covers children and adolescents. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How child therapy with Angela works",
        bullets: [
          "Session 1, parents first: developmental history and what's bringing your child in",
          "Session 2, meeting your child: a gentle session paced to their comfort and built around play and trust",
          "Session 3 onward: feedback and psychoeducation with parents, then an ongoing treatment plan",
        ],
        body: ["Parental involvement is reviewed throughout therapy and adjusted according to your child's needs and progress."],
      },
      {
        heading: "What Angela helps children with",
        bullets: [
          "Anxiety, including OCD, phobias, social anxiety, test anxiety and separation anxiety",
          "ADHD, oppositional behaviour and other behavioural difficulties",
          "Autism spectrum disorder and other neurodevelopmental conditions",
          "Trauma-related difficulties",
          "Emotional regulation and low self-esteem",
        ],
      },
      {
        heading: "Angela's training with children",
        body: [
          "Angela's accredited CBT training for children and adolescents covers adjusting CBT for children, structuring sessions with parents, and telling typical from atypical anxiety. She also holds a Post-Education Diploma in Special Education from the American University of Beirut.",
        ],
      },
    ],
    faqs: [
      {
        q: "What age does Angela Barhouch start seeing children?",
        a: "Angela Barhouch works with children aged roughly 4 to 12, and with teenagers aged 13 to 18.",
      },
      {
        q: "Do parents attend child therapy sessions?",
        a: "Yes, in part. With Angela Barhouch, the first session is with parents, the second is with the child, and the third is with parents for feedback and planning. How much parents take part after that is reviewed as therapy progresses.",
      },
    ],
    sources: [],
    related: [paths.parents, paths.adhd, paths.autism, paths.anxiety],
    clinical: true,
    serviceType: "Child psychotherapy",
  },
  {
    path: paths.teens,
    group: "audience",
    label: "Teen therapy",
    title: "Therapist for Teenagers in Beirut, Lebanon | Angela Barhouch",
    description:
      "Confidential therapy for teenagers aged 13 to 18 with Angela Barhouch, licensed clinical psychologist in Beirut. Self-esteem, identity and academic stress.",
    eyebrow: "Teenagers, ages 13 to 18",
    h1: "Confidential therapy for teenagers in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works extensively with teenagers aged 13 to 18 on low self-esteem, emotional regulation, identity development, academic stress and behavioural difficulties. Sessions are confidential and run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How common are mental health difficulties in teenagers?",
        body: [
          "The World Health Organization estimates that one in seven 10- to 19-year-olds (14.3%) experience a mental health condition.",
        ],
      },
      {
        heading: "How teen therapy with Angela works",
        bullets: [
          "Session 1: therapy begins directly with your teenager, so the trust is theirs from the start",
          "Session 2: a confidential case formulation, shared with your teenager",
          "Session 3 onward: goals set with your teenager and worked through using CBT and DBT",
        ],
      },
      {
        heading: "What stays confidential",
        body: [
          "In line with ethical guidelines, sessions with teenagers are confidential, and parents are not told what is discussed. Parents are contacted only in an emergency, or when there is a risk to the teenager's safety or someone else's.",
        ],
      },
      {
        heading: "What Angela helps teenagers with",
        bullets: [
          "Low self-esteem and identity development",
          "Emotional regulation and behavioural difficulties",
          "Academic stress",
          "Anxiety and depression",
          "ADHD and autism spectrum disorder",
        ],
      },
    ],
    faqs: [
      {
        q: "Will Angela Barhouch tell parents what my teenager says in therapy?",
        a: "No. Angela Barhouch's sessions with teenagers are confidential. Parents are contacted only in an emergency, or when there is a risk to the teenager's safety or someone else's.",
      },
      {
        q: "Do parents come to the first session for teen therapy?",
        a: "No. With Angela Barhouch, therapy for teenagers begins directly with the teenager, which differs from child therapy, where parents attend the first session.",
      },
    ],
    sources: [sources.whoAdolescents, sources.niceDepressionYoung],
    related: [paths.anxiety, paths.depression, paths.dbt, paths.parents],
    clinical: true,
    serviceType: "Adolescent psychotherapy",
  },
  {
    path: paths.adults,
    group: "audience",
    label: "Adult therapy",
    title: "Therapist for Adults in Beirut, Lebanon | Angela Barhouch",
    description:
      "Structured CBT and DBT therapy for adults with Angela Barhouch, licensed clinical psychologist in Beirut. In Arabic or English, in person or online.",
    eyebrow: "Adults",
    h1: "Therapy for adults in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who works with young and middle-aged adults on anxiety, mood, trauma, ADHD, personality disorders, emotional dysregulation and interpersonal difficulties, using CBT and DBT. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "How adult therapy with Angela works",
        bullets: [
          "Session 1: a comprehensive assessment of your concerns, personal history and current functioning",
          "Session 2: psychoeducation, explaining the therapeutic model, any diagnosis and your formulation",
          "Session 3 onward: a collaborative treatment plan with clear goals, using CBT and DBT interventions",
        ],
        body: ["Goals and strategies are monitored and adjusted throughout, for as many sessions as your progress needs."],
      },
      {
        heading: "Confidentiality for adults",
        body: [
          "Clients sign an informed consent form outlining confidentiality and their rights. Information shared in session stays confidential, including if family members try to contact Angela. Confidentiality is breached only in cases of serious risk or legal obligation, and no identifying information is disclosed without your explicit consent.",
        ],
      },
      {
        heading: "Angela's approach",
        body: [
          "In Angela's words: \"My therapeutic approach is collaborative, structured, and compassionate, with a strong focus on helping clients develop insight, effective coping skills, and long-term psychological resilience.\"",
        ],
      },
    ],
    faqs: [
      {
        q: "Will Angela Barhouch speak to my family about my therapy?",
        a: "No. For adult clients, Angela Barhouch maintains confidentiality even if family members try to contact her. It is breached only in cases of serious risk or legal obligation.",
      },
      {
        q: "What happens in the first therapy session for adults?",
        a: "With Angela Barhouch, the first session is a comprehensive assessment to understand your concerns, personal history and current functioning. The second explains the therapeutic model, any diagnosis and your formulation, and the treatment plan starts from the third.",
      },
    ],
    sources: [],
    related: [paths.anxiety, paths.depression, paths.trauma, paths.online],
    clinical: true,
    serviceType: "Adult psychotherapy",
  },
  {
    path: paths.parents,
    group: "audience",
    label: "Parent coaching",
    title: "Parent Coaching and Guidance in Beirut | Angela Barhouch",
    description:
      "Parenting skills training and psychoeducation with Angela Barhouch, licensed clinical psychologist in Beirut. In Arabic or English, in person or online.",
    eyebrow: "Parents",
    h1: "Parent coaching and guidance in Beirut, Lebanon",
    lead: `Angela Barhouch is a licensed clinical psychologist who supports parents through psychoeducation, parenting skills training and guidance aimed at strengthening parent-child relationships. Sessions run in Arabic or English, ${WHERE}.`,
    sections: [
      {
        heading: "What parent sessions cover",
        bullets: [
          "Understanding what's behind your child's or teenager's behaviour and emotions",
          "Improving communication at home",
          "Evidence-based strategies for behavioural and emotional difficulties",
          "Supporting a child with ADHD, autism spectrum disorder or anxiety",
        ],
      },
      {
        heading: "Parent work does not mean bad parenting",
        body: [
          "NICE guidance on ADHD asks clinicians to explain that recommending parent training does not imply bad parenting. The aim is to build skills that meet the above-average parenting needs of children with ADHD. The same spirit applies to Angela's work with parents more widely.",
        ],
      },
      {
        heading: "How parents fit into their child's therapy",
        body: [
          "For children aged roughly 4 to 12, parents attend the first session and return for feedback after the child's session. For teenagers, therapy is confidential, so parent support happens separately from your teenager's sessions and without sharing what they discuss, unless there is a safety concern.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I see Angela Barhouch for parenting support without bringing my child?",
        a: "Yes. Angela Barhouch works with parents as well as children and teenagers, and supports them through psychoeducation, parenting skills training and guidance. Message her on WhatsApp to explain what's going on.",
      },
    ],
    sources: [sources.niceAdhd],
    related: [paths.children, paths.teens, paths.adhd, paths.autism],
    clinical: true,
    serviceType: "Parenting skills training and psychoeducation",
  },

  /* --------------------------- Organisations ------------------------- */
  {
    path: paths.corporate,
    group: "organisation",
    label: "Corporate training",
    title: "Corporate Wellbeing Training in Lebanon | Angela Barhouch",
    description:
      "Workplace wellbeing, stress and burnout workshops for companies in Lebanon, led by Angela Barhouch, licensed clinical psychologist and AUB instructor.",
    eyebrow: "Companies and teams",
    h1: "Corporate wellbeing training and workshops in Lebanon",
    lead: "Angela Barhouch is a licensed clinical psychologist and psychology instructor at the American University of Beirut who delivers workplace wellbeing sessions for companies in Lebanon, including stress and burnout workshops and psychoeducation for managers and teams.",
    sections: [
      {
        heading: "What sessions cover",
        bullets: [
          "Stress and burnout",
          "Emotional regulation at work",
          "Supporting a struggling colleague",
          "Psychoeducation for managers and teams",
        ],
      },
      {
        heading: "How training is arranged",
        body: [
          "Sessions are practical and sized to your team and schedule. Message Angela on WhatsApp with your team size, topic and timeframe, and she'll build the session around them. Training enquiries use the same WhatsApp chat as therapy bookings.",
        ],
      },
      {
        heading: "Who delivers the training",
        body: [
          "Angela combines clinical practice with university teaching. She teaches undergraduate psychology at the American University of Beirut, holds an MSc in Clinical Psychology from Kingston University, London, and is trained as a CBT trainer and supervisor.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch run burnout workshops for companies in Lebanon?",
        a: "Yes. Angela Barhouch delivers practical sessions on stress, burnout, emotional regulation and supporting a struggling colleague, sized to the team and schedule. Enquiries start on WhatsApp.",
      },
    ],
    sources: [],
    related: [paths.schools, paths.supervision, paths.about],
    clinical: false,
    serviceType: "Corporate wellbeing training",
  },
  {
    path: paths.schools,
    group: "organisation",
    label: "School & NGO training",
    title: "Mental Health Training for Schools and NGOs in Lebanon",
    description:
      "CBT-informed workshops for teachers, counsellors and NGO staff in Lebanon, led by Angela Barhouch, licensed clinical psychologist and AUB instructor.",
    eyebrow: "Schools and NGOs",
    h1: "Mental health training for schools and NGOs in Lebanon",
    lead: "Angela Barhouch is a licensed clinical psychologist who delivers CBT-informed workshops for teachers, counsellors and frontline staff at schools and NGOs in Lebanon, covering child and adolescent mental health, anxiety, behaviour and safeguarding conversations.",
    sections: [
      {
        heading: "What workshops cover",
        bullets: [
          "Child and adolescent mental health",
          "Anxiety, including typical and atypical anxiety in children",
          "Behaviour and emotional regulation",
          "Safeguarding conversations",
        ],
      },
      {
        heading: "Who the training is for",
        body: [
          "Workshops are designed for people who work directly with children and teenagers: teachers, school counsellors and frontline staff. Tell Angela your team size, topic and timeframe, and she'll build the session around them.",
        ],
      },
      {
        heading: "Who delivers the training",
        body: [
          "Angela has accredited CBT training in children and adolescents and as a trainer and supervisor, including identifying training needs and evaluating impact. She also holds a Post-Education Diploma in Special Education from the American University of Beirut, where she teaches psychology.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Angela Barhouch train teachers in Lebanon?",
        a: "Yes. Angela Barhouch delivers CBT-informed workshops for teachers, counsellors and frontline staff on child and adolescent mental health, anxiety, behaviour and safeguarding conversations. Enquiries start on WhatsApp.",
      },
    ],
    sources: [],
    related: [paths.corporate, paths.supervision, paths.children],
    clinical: false,
    serviceType: "Mental health training for schools and NGOs",
  },
  {
    path: paths.supervision,
    group: "organisation",
    label: "Clinical supervision",
    title: "Clinical Supervision and CBT Training in Lebanon | Angela Barhouch",
    description:
      "Clinical supervision and CBT skills training for psychologists and therapists in Lebanon with Angela Barhouch, trained in CBT supervision at Oxford University.",
    eyebrow: "For practitioners",
    h1: "Clinical supervision and CBT training in Lebanon",
    lead: "Angela Barhouch is a licensed clinical psychologist who provides clinical supervision and CBT skills training for psychologists and therapists in Lebanon. She has completed CBT Supervision Training (Becoming a Supervisor) at Oxford University, along with accredited training for CBT trainers and supervisors.",
    sections: [
      {
        heading: "What Angela's supervision training covers",
        bullets: [
          "CBT supervision and group supervision",
          "The supervisory relationship and contracting",
          "Identifying training needs and evaluating impact",
          "Ethics and diversity, including neurodiversity",
        ],
      },
      {
        heading: "CBT skills training",
        body: [
          "Alongside supervision, Angela offers CBT skills training for practitioners, drawing on her training at Oxford University and the Beck Institute and on her clinical work across children, teenagers, adults and parents.",
        ],
      },
      {
        heading: "How to enquire",
        body: ["Message Angela on WhatsApp with your background, what you're looking for and whether you're asking for yourself or a team."],
      },
    ],
    faqs: [
      {
        q: "Where can I find a CBT supervisor in Lebanon?",
        a: "Angela Barhouch is a licensed clinical psychologist in Lebanon who provides clinical supervision and CBT skills training for psychologists and therapists. She has completed CBT supervision training at Oxford University. The Order of Psychologists in Lebanon also publishes a directory of its members.",
      },
    ],
    sources: [sources.order],
    related: [paths.cbt, paths.schools, paths.about],
    clinical: false,
    serviceType: "Clinical supervision",
  },

  /* ------------------------------- Guide ----------------------------- */
  {
    path: paths.chooseGuide,
    group: "guide",
    label: "Choosing a psychologist",
    title: "How to Choose a Psychologist in Lebanon: A Practical Guide",
    description:
      "How to check a psychologist's licence in Lebanon, when to see a psychiatrist, and what to ask before your first session. A guide by psychologist Angela Barhouch.",
    eyebrow: "A practical guide",
    h1: "How to choose a psychologist in Lebanon",
    lead: "To choose a psychologist in Lebanon, first check that they hold a Ministry of Public Health licence, since Law 8/2017 requires it of every practising psychologist. Then ask about their training, approach, languages, fees and confidentiality. This guide, written by clinical psychologist Angela Barhouch, explains how.",
    sections: [
      {
        heading: "Step 1: Check the licence",
        body: [
          "Lebanon's Ministry of Public Health states that Law 8/2017 requires all practising psychologists to obtain a licence from the Ministry, and it prohibits providing psychology services without one. The licence is either clinical or educational, so ask which one the person holds.",
          "There are two public places to check. The Ministry publishes a list of licensed psychologists, though the file was last updated in February 2022, so someone licensed more recently may not appear. The Order of Psychologists in Lebanon publishes a directory of its members, which you can search by name.",
        ],
      },
      {
        heading: "Step 2: Decide between a psychologist and a psychiatrist",
        body: [
          "A clinical psychologist provides psychological assessment and psychotherapy. A psychiatrist is a physician who can prescribe medication. The Ministry of Public Health states that psychologists must abstain from prescribing, because prescribing is an exclusive right of licensed physicians.",
          "The choice isn't always either-or, and some people see both. If you're not sure, a first assessment with either professional can help you work out what you need.",
        ],
      },
      {
        heading: "Step 3: Ask these questions before you book",
        bullets: [
          "Which licence do you hold, and what is the number?",
          "What therapy do you use, and where did you train in it?",
          "Do you work with my concern, and with this age group?",
          "Can we work in Arabic, English or the language I prefer?",
          "In person or online? What does the first session involve?",
          "What is the fee, and how long does therapy usually last?",
          "What stays confidential, and when would that change?",
        ],
      },
      {
        heading: "Why it's worth seeking help",
        body: [
          "A national survey of 2,857 adults in Lebanon, published in The Lancet in 2006 with data from 2002 and 2003, found that 17.0% had met criteria for a mental disorder in the past year, and that only 10.9% of those people had obtained treatment.",
        ],
      },
      {
        heading: "How Angela Barhouch answers these questions",
        bullets: [
          "Licence: Ministry of Public Health licence number 2021/3/20888, clinical category, and listed in the Order of Psychologists in Lebanon's directory",
          "Therapy and training: CBT and DBT, with an MSc in Clinical Psychology from Kingston University, London, and CBT training at Oxford University and the Beck Institute",
          "Ages: children from roughly 4, teenagers, adults and parents",
          "Languages and format: Arabic and English, in person in Dekwaneh or online",
          "First session: a full clinical assessment, with no free consultation beforehand",
          "Fee: confirmed on WhatsApp before you book",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there an official list of licensed psychologists in Lebanon?",
        a: "Yes. Lebanon's Ministry of Public Health publishes a list of licensed psychologists, last updated in February 2022, and the Order of Psychologists in Lebanon publishes a searchable directory of its members at lopsy.org.",
      },
      {
        q: "Can a psychologist prescribe medication in Lebanon?",
        a: "No. Lebanon's Ministry of Public Health states that psychologists must abstain from prescribing medication, which is an exclusive right of physicians licensed by the Ministry and affiliated to the Order of Physicians.",
      },
      {
        q: "What is the difference between a psychologist and a psychiatrist in Lebanon?",
        a: "A clinical psychologist holds a Ministry of Public Health licence to practise psychology and provides assessment and psychotherapy. A psychiatrist is a physician who can also prescribe medication.",
      },
    ],
    sources: [sources.mophCircular, sources.mophList, sources.order, sources.karam],
    related: [paths.about, paths.cbt, paths.adults, paths.children],
    clinical: true,
    serviceType: "Psychological assessment and psychotherapy",
  },
];

export const topicsByPath: Record<string, Topic> = Object.fromEntries(topics.map((t) => [t.path, t]));

/* Short names for every linkable page, including those that aren't topics. */
export const pageLabels: Record<string, string> = {
  ...Object.fromEntries(topics.map((t) => [t.path, t.label])),
  [paths.about]: "About Angela Barhouch",
  [paths.arabic]: "العربية",
};
