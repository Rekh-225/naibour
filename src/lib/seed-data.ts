import { UserProfile, NeedPost } from "./types";

// ─── 15 Diverse Budapest Profiles ─────────────────────────────────

export const SEED_PROFILES: UserProfile[] = [
  {
    id: "prof-1",
    userName: "Anna K.",
    neighborhood: "District VII",
    avatarColor: "#E8927C",
    bio: "Animal lover and part-time dog trainer. I spend most of my free time at the local shelter.",
    offerings: [
      { id: "o-1a", skill: "Dog walking", category: "pet care", availability: "weekdays" },
      { id: "o-1b", skill: "Pet sitting", category: "pet care", availability: "flexible" },
      { id: "o-1c", skill: "Dog training (basics)", category: "pet care" },
      { id: "o-1d", skill: "Cat grooming", category: "pet care" },
      { id: "o-1e", skill: "House sitting", category: "home services", availability: "weekends" },
    ],
    openToNegotiation: true,
    trustScore: 4.2,
    verified: true,
    linkedSocials: ["linkedin"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-2",
    userName: "Bence T.",
    neighborhood: "District V",
    avatarColor: "#7CC0E8",
    bio: "Certified accountant with 10 years of experience. I also do financial coaching on the side.",
    offerings: [
      { id: "o-2a", skill: "Personal tax filing", category: "finance" },
      { id: "o-2b", skill: "Bookkeeping", category: "finance" },
      { id: "o-2c", skill: "Financial planning advice", category: "finance" },
      { id: "o-2d", skill: "VAT returns for small businesses", category: "finance" },
      { id: "o-2e", skill: "Excel / spreadsheet setup", category: "technology" },
      { id: "o-2f", skill: "Budget coaching", category: "finance" },
    ],
    openToNegotiation: false,
    trustScore: 4.8,
    verified: true,
    linkedSocials: ["linkedin", "facebook"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-3",
    userName: "Clara M.",
    neighborhood: "District XIII",
    avatarColor: "#B07CE8",
    bio: "PhD student in physics. I love teaching and making complicated things simple.",
    offerings: [
      { id: "o-3a", skill: "Math tutoring (all levels)", category: "education" },
      { id: "o-3b", skill: "Physics tutoring", category: "education" },
      { id: "o-3c", skill: "University entrance exam prep", category: "education" },
      { id: "o-3d", skill: "Homework help (STEM)", category: "education" },
      { id: "o-3e", skill: "Research assistance", category: "education" },
      { id: "o-3f", skill: "LaTeX document formatting", category: "technology" },
    ],
    openToNegotiation: true,
    trustScore: 4.5,
    verified: false,
    linkedSocials: ["linkedin"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-4",
    userName: "Dávid R.",
    neighborhood: "District XI",
    avatarColor: "#7CE8A3",
    bio: "Handyman by trade, 20 years in construction. There's nothing around the house I can't fix.",
    offerings: [
      { id: "o-4a", skill: "Plumbing repairs", category: "home services" },
      { id: "o-4b", skill: "Interior painting", category: "home services" },
      { id: "o-4c", skill: "Furniture assembly", category: "home services" },
      { id: "o-4d", skill: "Drywall patching", category: "home services" },
      { id: "o-4e", skill: "Electrical (minor)", category: "home services" },
      { id: "o-4f", skill: "Tile work", category: "home services" },
      { id: "o-4g", skill: "Door / lock replacement", category: "home services" },
    ],
    openToNegotiation: true,
    trustScore: 4.0,
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-5",
    userName: "Eszter N.",
    neighborhood: "District VII",
    avatarColor: "#E8D07C",
    bio: "Professional cleaner for 8 years. I also bake cakes and pastries for events.",
    offerings: [
      { id: "o-5a", skill: "Deep cleaning (apartments)", category: "home services" },
      { id: "o-5b", skill: "Move-in/move-out cleaning", category: "home services" },
      { id: "o-5c", skill: "Window cleaning", category: "home services" },
      { id: "o-5d", skill: "Custom cake baking", category: "food services" },
      { id: "o-5e", skill: "Pastry catering (events)", category: "food services" },
    ],
    openToNegotiation: true,
    trustScore: 3.9,
    verified: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-6",
    userName: "Ferenc L.",
    neighborhood: "District IX",
    avatarColor: "#7CE8D8",
    bio: "Full-stack web developer. I build websites, apps, and automations. Also a home barista.",
    offerings: [
      { id: "o-6a", skill: "Website development", category: "technology" },
      { id: "o-6b", skill: "Landing page design", category: "technology" },
      { id: "o-6c", skill: "Bug fixing (web apps)", category: "technology" },
      { id: "o-6d", skill: "SEO setup", category: "technology" },
      { id: "o-6e", skill: "Social media automation", category: "technology" },
      { id: "o-6f", skill: "Coffee brewing workshop", category: "food services" },
    ],
    openToNegotiation: false,
    trustScore: 4.6,
    verified: true,
    linkedSocials: ["linkedin", "github"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-7",
    userName: "Gréta S.",
    neighborhood: "District XIII",
    avatarColor: "#E87CA0",
    bio: "Social worker specialising in elder care. I genuinely enjoy helping people in my community.",
    offerings: [
      { id: "o-7a", skill: "Grocery shopping for elderly", category: "elder care" },
      { id: "o-7b", skill: "Elderly companionship visits", category: "elder care" },
      { id: "o-7c", skill: "Medication reminders / pickup", category: "elder care" },
      { id: "o-7d", skill: "Light housekeeping for seniors", category: "elder care" },
      { id: "o-7e", skill: "Errand running", category: "errands" },
    ],
    openToNegotiation: true,
    trustScore: 4.3,
    verified: true,
    linkedSocials: ["facebook"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-8",
    userName: "Hanna V.",
    neighborhood: "District VI",
    avatarColor: "#C0E87C",
    bio: "Freelance photographer. I do corporate headshots, events, and product photography.",
    offerings: [
      { id: "o-8a", skill: "Professional headshots", category: "creative services" },
      { id: "o-8b", skill: "Event photography", category: "creative services" },
      { id: "o-8c", skill: "Product photography", category: "creative services" },
      { id: "o-8d", skill: "Photo retouching", category: "creative services" },
      { id: "o-8e", skill: "Lightroom presets / editing lessons", category: "education" },
    ],
    openToNegotiation: true,
    trustScore: 4.1,
    verified: false,
    linkedSocials: ["instagram"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-9",
    userName: "István B.",
    neighborhood: "District II",
    avatarColor: "#7C8AE8",
    bio: "Retired chef. I cook traditional Hungarian food and run pop-up dinner parties.",
    offerings: [
      { id: "o-9a", skill: "Hungarian home cooking", category: "food services" },
      { id: "o-9b", skill: "Meal prep (weekly)", category: "food services" },
      { id: "o-9c", skill: "Dinner party catering", category: "food services" },
      { id: "o-9d", skill: "Cooking lessons (Hungarian cuisine)", category: "education" },
      { id: "o-9e", skill: "Preserves & pickling", category: "food services" },
    ],
    openToNegotiation: true,
    trustScore: 3.7,
    verified: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-10",
    userName: "Judit F.",
    neighborhood: "District VIII",
    avatarColor: "#E8A07C",
    bio: "Graphic designer and illustrator. I can make anything look beautiful.",
    offerings: [
      { id: "o-10a", skill: "Logo design", category: "creative services" },
      { id: "o-10b", skill: "Flyer / poster design", category: "creative services" },
      { id: "o-10c", skill: "Social media graphics", category: "creative services" },
      { id: "o-10d", skill: "Brand identity packages", category: "creative services" },
      { id: "o-10e", skill: "Illustration", category: "creative services" },
      { id: "o-10f", skill: "Canva template creation", category: "creative services" },
    ],
    openToNegotiation: false,
    trustScore: 4.4,
    verified: true,
    linkedSocials: ["linkedin", "instagram"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-11",
    userName: "Kristóf P.",
    neighborhood: "District III",
    avatarColor: "#7CE8C0",
    bio: "Music teacher and café owner. I teach guitar, piano, and ukulele. Also have 200+ bottles of wine in my cellar.",
    offerings: [
      { id: "o-11a", skill: "Guitar lessons", category: "education" },
      { id: "o-11b", skill: "Piano lessons", category: "education" },
      { id: "o-11c", skill: "Ukulele lessons", category: "education" },
      { id: "o-11d", skill: "Wine (bulk, Hungarian)", category: "goods", description: "200+ bottles of Egri Bikavér, Tokaji, etc." },
      { id: "o-11e", skill: "Wine tasting event hosting", category: "food services" },
      { id: "o-11f", skill: "Live music for events", category: "creative services" },
    ],
    openToNegotiation: true,
    trustScore: 4.7,
    verified: true,
    linkedSocials: ["facebook", "instagram"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-12",
    userName: "Laura H.",
    neighborhood: "District V",
    avatarColor: "#E87CD0",
    bio: "Yoga instructor and wellness coach. I also make handmade candles and soaps.",
    offerings: [
      { id: "o-12a", skill: "Private yoga sessions", category: "fitness" },
      { id: "o-12b", skill: "Group yoga classes", category: "fitness" },
      { id: "o-12c", skill: "Meditation coaching", category: "fitness" },
      { id: "o-12d", skill: "Handmade candles (bulk)", category: "goods", description: "Soy wax, various scents, gift sets available" },
      { id: "o-12e", skill: "Handmade soaps", category: "goods" },
      { id: "o-12f", skill: "Wellness workshop hosting", category: "fitness" },
    ],
    openToNegotiation: true,
    trustScore: 4.9,
    verified: true,
    linkedSocials: ["linkedin", "instagram"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-13",
    userName: "Márton G.",
    neighborhood: "District XI",
    avatarColor: "#A0E87C",
    bio: "Bike mechanic and cycling enthusiast. I run a small garage out of my apartment building.",
    offerings: [
      { id: "o-13a", skill: "Bike repair", category: "maintenance" },
      { id: "o-13b", skill: "Bike tune-up", category: "maintenance" },
      { id: "o-13c", skill: "Wheel truing", category: "maintenance" },
      { id: "o-13d", skill: "Bike fitting / sizing", category: "maintenance" },
      { id: "o-13e", skill: "Used bike parts (inventory)", category: "goods", description: "Tires, chains, brake pads, saddles" },
    ],
    openToNegotiation: true,
    trustScore: 4.0,
    verified: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-14",
    userName: "Nóra J.",
    neighborhood: "District IX",
    avatarColor: "#E8E07C",
    bio: "Freelance translator (HU ↔ EN ↔ DE). Also a licensed real estate agent.",
    offerings: [
      { id: "o-14a", skill: "Hungarian → English translation", category: "language services" },
      { id: "o-14b", skill: "Hungarian → German translation", category: "language services" },
      { id: "o-14c", skill: "Document notarisation assistance", category: "legal" },
      { id: "o-14d", skill: "Real estate advice (Budapest)", category: "consulting" },
      { id: "o-14e", skill: "Apartment viewings / tours", category: "consulting" },
      { id: "o-14f", skill: "Hungarian language lessons", category: "education" },
    ],
    openToNegotiation: false,
    trustScore: 4.5,
    verified: true,
    linkedSocials: ["linkedin"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prof-15",
    userName: "Olivér D.",
    neighborhood: "District VI",
    avatarColor: "#7CBAE8",
    bio: "Former banker turned startup advisor. I have contacts everywhere and 50kg of specialty coffee beans I import from Colombia.",
    offerings: [
      { id: "o-15a", skill: "Personal tax returns", category: "finance" },
      { id: "o-15b", skill: "Startup / business advice", category: "consulting" },
      { id: "o-15c", skill: "Investor pitch coaching", category: "consulting" },
      { id: "o-15d", skill: "Specialty coffee beans (bulk)", category: "goods", description: "Colombian single-origin, 50kg available" },
      { id: "o-15e", skill: "Networking introductions", category: "consulting" },
      { id: "o-15f", skill: "Financial modelling", category: "finance" },
    ],
    openToNegotiation: true,
    trustScore: 4.3,
    verified: true,
    linkedSocials: ["linkedin", "twitter"],
    createdAt: new Date().toISOString(),
  },
];

// ─── Sample Need Posts ────────────────────────────────────────────
//
// RING DESIGN — these needs + profile offerings form guaranteed cycles:
//
// 2-WAY #1: Anna(prof-1) offers "Dog walking" → Bence needs it
//           Bence(prof-2) offers "Personal tax filing" → Anna needs it
//
// 3-WAY #1: Eszter(prof-5) offers "Deep cleaning" → Clara needs it
//           Clara(prof-3) offers "Math tutoring" → Dávid needs it
//           Dávid(prof-4) offers "Furniture assembly" → Eszter needs a website... no,
//             → Gréta needs it, and Gréta offers elder care → but let's keep it clean:
//           Dávid(prof-4) offers "Plumbing repairs" → Eszter needs plumbing (new need)
//             ... actually let's be explicit:
//
// 3-WAY #1: Clara(prof-3) offers "Math tutoring" → Dávid(prof-4) needs "math tutoring"
//           Dávid(prof-4) offers "Furniture assembly" → Gréta(prof-7) needs "furniture assembly"
//           Gréta(prof-7) offers "Errand running" → Clara(prof-3) needs "errand running"
//
// 3-WAY #2: Hanna(prof-8) offers "Professional headshots" → István(prof-9) needs "headshots"
//           István(prof-9) offers "Hungarian home cooking" → Judit(prof-10) needs "home cooking"
//           Judit(prof-10) offers "Logo design" → Hanna(prof-8) needs "logo design"
//
// 4-WAY #1: Kristóf(prof-11) offers "Guitar lessons" → Laura(prof-12) needs "guitar lessons"
//           Laura(prof-12) offers "Group yoga classes" → Márton(prof-13) needs "yoga"
//           Márton(prof-13) offers "Bike repair" → Nóra(prof-14) needs "bike repair"
//           Nóra(prof-14) offers "Hungarian → English translation" → Kristóf(prof-11) needs "translation"
//
// 3-WAY #3: Eszter(prof-5) offers "Deep cleaning" → Clara(prof-3) needs "deep cleaning"
//           Clara(prof-3) offers "Physics tutoring" → Ferenc(prof-6) needs "physics tutoring"
//           Ferenc(prof-6) offers "Website development" → Eszter(prof-5) needs "website"
//

export const SEED_NEEDS: NeedPost[] = [
  // Anna needs tax filing → Bence offers it (2-way ring #1)
  {
    id: "need-1",
    profileId: "prof-1",
    rawNeed: "I need help with my personal tax filing this month — it's due soon and I'm lost",
    parsedNeeds: [{ skill: "personal tax filing", category: "finance" }],
    urgency: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Bence needs dog walking → Anna offers it (2-way ring #1)
  {
    id: "need-2",
    profileId: "prof-2",
    rawNeed: "I need someone to walk my dog 3 times a week — I travel for work",
    parsedNeeds: [{ skill: "dog walking", category: "pet care" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Clara needs deep cleaning → Eszter offers it (3-way ring #3) + errand running → Gréta offers (3-way #1)
  {
    id: "need-3",
    profileId: "prof-3",
    rawNeed: "I need my apartment deep-cleaned before my parents visit, and someone to run some errands for me",
    parsedNeeds: [
      { skill: "deep cleaning", category: "home services" },
      { skill: "errand running", category: "errands" },
    ],
    urgency: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Dávid needs math tutoring → Clara offers it (3-way ring #1)
  {
    id: "need-4",
    profileId: "prof-4",
    rawNeed: "I need math tutoring for my daughter's university entrance exam",
    parsedNeeds: [{ skill: "math tutoring", category: "education" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Eszter needs website development → Ferenc offers it (3-way ring #3)
  {
    id: "need-5",
    profileId: "prof-5",
    rawNeed: "I need a website built for my small bakery — just a landing page with menu and ordering info",
    parsedNeeds: [{ skill: "website development", category: "technology" }],
    urgency: "low",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Ferenc needs physics tutoring → Clara offers it (3-way ring #3) + elder care → Gréta offers
  {
    id: "need-6",
    profileId: "prof-6",
    rawNeed: "I need a physics tutor for my son, and someone to help my elderly mother with grocery shopping",
    parsedNeeds: [
      { skill: "physics tutoring", category: "education" },
      { skill: "grocery shopping for elderly", category: "elder care" },
    ],
    urgency: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Gréta needs furniture assembly → Dávid offers it (3-way ring #1)
  {
    id: "need-7",
    profileId: "prof-7",
    rawNeed: "I need furniture assembled — just bought a new IKEA wardrobe and desk",
    parsedNeeds: [{ skill: "furniture assembly", category: "home services" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Hanna needs logo design → Judit offers it (3-way ring #2)
  {
    id: "need-8",
    profileId: "prof-8",
    rawNeed: "I need a logo designed for my photography business and some interior painting done",
    parsedNeeds: [
      { skill: "logo design", category: "creative services" },
      { skill: "interior painting", category: "home services" },
    ],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // István needs professional headshots → Hanna offers them (3-way ring #2)
  {
    id: "need-9",
    profileId: "prof-9",
    rawNeed: "I need professional headshots for my LinkedIn profile and new cookbook cover",
    parsedNeeds: [{ skill: "professional headshots", category: "creative services" }],
    urgency: "low",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Judit needs home cooking → István offers it (3-way ring #2)
  {
    id: "need-10",
    profileId: "prof-10",
    rawNeed: "I need someone to cook healthy meals for my family this week — I'm recovering from surgery",
    parsedNeeds: [{ skill: "Hungarian home cooking", category: "food services" }],
    urgency: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Kristóf needs translation → Nóra offers it (4-way ring #1)
  {
    id: "need-11",
    profileId: "prof-11",
    rawNeed: "I need a Hungarian-to-English translator for my café menu and business documents",
    parsedNeeds: [{ skill: "Hungarian → English translation", category: "language services" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Laura needs guitar lessons → Kristóf offers them (4-way ring #1)
  {
    id: "need-12",
    profileId: "prof-12",
    rawNeed: "I want to learn guitar — always wanted to play but never got started",
    parsedNeeds: [{ skill: "guitar lessons", category: "education" }],
    urgency: "low",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Márton needs yoga → Laura offers it (4-way ring #1)
  {
    id: "need-13",
    profileId: "prof-13",
    rawNeed: "I need a yoga instructor for my office team — weekly group sessions for 6 people",
    parsedNeeds: [{ skill: "group yoga classes", category: "fitness" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Nóra needs bike repair → Márton offers it (4-way ring #1)
  {
    id: "need-14",
    profileId: "prof-14",
    rawNeed: "I need my bike fixed — flat tire and the gears are slipping badly",
    parsedNeeds: [{ skill: "bike repair", category: "maintenance" }],
    urgency: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  // Olivér needs networking / startup advice — links into other rings as alternate
  {
    id: "need-15",
    profileId: "prof-15",
    rawNeed: "I need bookkeeping help and a coffee brewing workshop for my team",
    parsedNeeds: [
      { skill: "bookkeeping", category: "finance" },
      { skill: "coffee brewing workshop", category: "food services" },
    ],
    urgency: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
];
