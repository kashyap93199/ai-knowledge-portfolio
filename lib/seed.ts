import { loadEnv } from "./load-env";
import { db, initSchema } from "./db";
import { syncAdminUser } from "./auth";
import { siteSettings, topics, workflowSteps, timelineEvents } from "./seed-content";
import {
  projects,
  resources,
  glossaryTerms,
  sampleContactMessage,
} from "./seed-content-more";

loadEnv();

// `npm run db:reset` wipes all data first; plain `npm run seed` only fills
// empty tables so it is safe to run on every deploy without clobbering
// admin edits (projects, settings, messages, etc.).
const reset = process.argv.includes("--reset");

const statuses: { table: string; action: string }[] = [];

function countRows(table: string): number {
  return (db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get() as { c: number }).c;
}

function shouldSeed(table: string, force: boolean): boolean {
  if (force) return true;
  const hasData = countRows(table) > 0;
  statuses.push({ table, action: hasData ? "skipped (already has data)" : "seeded" });
  return !hasData;
}

function clearTables(): void {
  const tables = [
    "ContactMessage",
    "GlossaryTerm",
    "Resource",
    "Project",
    "TimelineEvent",
    "WorkflowStep",
    "AiTopic",
    "Slide",
    "Section",
    "Page",
    "SiteSetting",
    "AdminUser",
  ];
  const wipe = db.transaction(() => {
    for (const table of tables) {
      db.exec(`DELETE FROM ${table};`);
    }
  });
  wipe();
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

function seedSiteSettings(force: boolean): void {
  if (!shouldSeed("SiteSetting", force)) return;
  const upsert = db.prepare(
    `INSERT INTO SiteSetting (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = datetime('now')`
  );
  for (const setting of siteSettings) {
    upsert.run(setting.key, setting.value);
  }
}

// ---------------------------------------------------------------------------
// Pages + sections (overview and about content)
// ---------------------------------------------------------------------------

function seedPagesAndSections(force: boolean): void {
  if (!shouldSeed("Section", force)) return;

  const pageInsert = db.prepare(
    `INSERT INTO Page (slug, title, description, "order", published)
     VALUES (?, ?, ?, ?, 1)
     ON CONFLICT(slug) DO UPDATE SET title = excluded.title, description = excluded.description, updatedAt = datetime('now')`
  );
  const sectionInsert = db.prepare(
    `INSERT INTO Section (pageId, type, title, subtitle, content, "order", visible)
     VALUES (?, ?, ?, ?, ?, ?, 1)`
  );
  const clearSections = db.prepare("DELETE FROM Section WHERE pageId = ?");

  const overviewPage = {
    slug: "overview",
    title: "AI Overview",
    description:
      "A clear, beginner-friendly introduction to Artificial Intelligence: what it is, why it matters, how it learns, and the ethical questions it raises.",
  };
  pageInsert.run(overviewPage.slug, overviewPage.title, overviewPage.description, 1);
  const overviewPageRow = db
    .prepare("SELECT id FROM Page WHERE slug = ?")
    .get("overview") as { id: number };

  const overviewSections: { type: string; title: string; subtitle: string; content: string }[] = [
    {
      type: "text",
      title: "What is Artificial Intelligence?",
      subtitle: "A definition in plain language",
      content:
        "Artificial Intelligence (AI) is the field of computer science devoted to building systems that perform tasks that normally require human intelligence — understanding language, recognizing images, making decisions, and generating creative work. Today's AI is narrow: each system is trained for a specific job, like translating text or detecting tumors. General intelligence, the flexible, multi-domain reasoning humans possess, remains a research goal rather than a product.\n\nWhat changed in recent years is scale. Neural networks trained on enormous datasets have become astonishingly capable at perception and language. An AI model can now draft an email, describe a photograph to someone who cannot see it, or suggest a treatment plan — but it has no understanding, goals, or awareness of its own. It is a statistical pattern-matcher of remarkable power.",
    },
    {
      type: "text",
      title: "Why AI Matters",
      subtitle: "From research labs to everyday life",
      content:
        "AI already shapes everyday life: search engines rank results, phones auto-correct and caption photos, banks flag fraud, streaming services suggest what to watch, and hospitals screen scans. The economic and social stakes are enormous. AI can accelerate scientific discovery — predicting protein structures, designing new materials, and analyzing clinical trials. It can make services more accessible through voice interfaces and translation. And it can automate tasks, which is why its effect on jobs, education, and inequality is a subject of urgent public debate.\n\nUnderstanding AI is not only for engineers. Citizens, policymakers, and professionals in every field will make decisions about AI systems — whether to trust them, regulate them, and use them. Literacy about what these systems can and cannot do is becoming a basic skill of the modern world.",
    },
    {
      type: "text",
      title: "How AI Systems Learn",
      subtitle: "Learning from examples, not rules",
      content:
        "Most modern AI does not follow rules written by programmers; it learns patterns from data. The process has three ingredients: data (examples of the task), a model (a flexible mathematical function with many adjustable parameters), and an objective (a measure of how wrong the model is).\n\nTraining repeatedly adjusts the model's parameters to reduce that wrongness. Show a vision model millions of labeled images and it gradually learns to recognize edges, textures, shapes, and finally objects. Show a language model billions of sentences and it learns the statistical structure of language — which word plausibly follows which. The result is a system that can handle situations its creators never explicitly programmed, which is both the power and the risk of the approach.",
    },
    {
      type: "comparison",
      title: "AI, ML, Deep Learning, and Generative AI",
      subtitle: "Concentric circles, not synonyms",
      content:
        "Think of these as nesting sets. AI is the whole field. Machine learning is the subset of AI that learns from data instead of rules. Deep learning is the subset of machine learning built on multi-layered neural networks. Generative AI is the subset of deep learning that creates new content — text, images, audio — rather than only classifying or predicting. Each layer adds specificity: every generative model is deep learning, every deep learning system is machine learning, and all of it is AI. The terms are often used loosely, but the hierarchy is a useful map.",
    },
    {
      type: "text",
      title: "Real-World Applications",
      subtitle: "Where AI is working today",
      content:
        "Medicine: AI screens mammograms, reads X-rays, and accelerates drug discovery. Transportation: self-driving research vehicles and route optimization keep deliveries moving. Language: translation, dictation, and accessibility tools break down barriers. Creativity: generative tools assist writers, designers, and musicians. Science: models predict protein structures and simulate materials. Everyday software: search, spam filtering, recommendations, and fraud detection run on AI quietly in the background. The common thread is that AI shines where patterns exist in large amounts of data — and struggles where data is scarce, ambiguous, or socially consequential.",
    },
    {
      type: "text",
      title: "Benefits and Limitations",
      subtitle: "An honest balance sheet",
      content:
        "Benefits: AI can process information at a scale no human can, work around the clock, reduce human error in repetitive tasks, find patterns invisible to the eye, and lower the cost of expertise through automation and assistance.\n\nLimitations: AI systems require large, high-quality datasets; they generalize poorly outside their training distribution; they cannot reason reliably, explain themselves, or handle novel situations with common sense; and they can encode bias, hallucinate facts, and be manipulated. Treating AI as an oracle — or dismissing it as a toy — are both mistakes. The responsible posture is calibration: know what a system was trained on, what it is for, and where it fails.",
    },
    {
      type: "text",
      title: "Ethical Considerations",
      subtitle: "Power demands responsibility",
      content:
        "Four questions recur in AI ethics. Fairness: do systems treat all people equally, or do biased datasets encode historic discrimination? Privacy: whose data trains these systems, and is consent meaningful? Transparency: can anyone understand or contest a decision the system makes? Accountability: who is responsible when an AI harms someone — the developer, the deployer, or the machine (it is never the machine)?\n\nResponsible practice addresses these questions through the whole lifecycle: documenting data, auditing outcomes across groups, keeping humans in the loop for consequential decisions, and being honest about limitations. Ethics is not an add-on to AI; it is a design constraint from the first line of code.",
    },
  ];

  clearSections.run(overviewPageRow.id);
  for (let i = 0; i < overviewSections.length; i++) {
    const s = overviewSections[i];
    sectionInsert.run(overviewPageRow.id, s.type, s.title, s.subtitle, s.content, i + 1);
  }

  const aboutPage = {
    slug: "about",
    title: "About",
    description:
      "Professional introduction, skills, technologies, and design philosophy of the creator of this AI portfolio.",
  };
  pageInsert.run(aboutPage.slug, aboutPage.title, aboutPage.description, 2);
  const aboutPageRow = db.prepare("SELECT id FROM Page WHERE slug = ?").get("about") as {
    id: number;
  };

  const aboutSections: { type: string; title: string; subtitle: string; content: string }[] = [
    {
      type: "text",
      title: "Hello — I’m a Builder of Intelligent Things",
      subtitle: "Full-stack engineer · AI enthusiast · Creative technologist",
      content:
        "I design and build software that sits at the intersection of machine learning, thoughtful design, and delightful interaction. This portfolio is my way of sharing what I know about AI with a wider audience: a complete, interactive tour of the field, from first principles to production pipelines.\n\nMy work spans the full stack — TypeScript applications, relational databases, REST APIs, and the 3D interfaces that make complex ideas tangible. I care deeply about craft: accessible interfaces, explainable systems, and code that reads well years later.",
    },
    {
      type: "text",
      title: "Skills",
      subtitle: "What I bring to a team",
      content:
        "Software engineering: TypeScript, Python, React, Next.js, Node.js, testing, and CI. Machine learning: model training, evaluation, and deployment; NLP and computer vision hands-on projects; prompt engineering and generative AI workflows. Design: interface design, design systems, accessibility, and data visualization. Communication: technical writing, teaching AI to beginners, and translating between business goals and technical trade-offs.",
    },
    {
      type: "text",
      title: "Technologies I Use",
      subtitle: "A free, open-source-first toolbox",
      content:
        "TypeScript · React · Next.js · Node.js · Python · PyTorch · scikit-learn · Tailwind CSS · Three.js / React Three Fiber · SQLite · PostgreSQL · Docker. I deliberately build with free and open-source tools — this entire website runs on them, from its database to its 3D engine.",
    },
    {
      type: "text",
      title: "Design Philosophy",
      subtitle: "Clarity before spectacle",
      content:
        "Great interfaces make complex systems feel approachable. My principles: motion should support content, never distract from it; every interactive element must work with a keyboard; readability outranks decoration; and a beautiful interface that confuses its user has failed. I use 3D and animation where they genuinely aid understanding — like visualizing how a neural network learns — and keep them subtle elsewhere.",
    },
    {
      type: "text",
      title: "AI Interest Areas",
      subtitle: "Where my curiosity lives",
      content:
        "Explainable and responsible AI — systems you can audit, not just admire. Education technology: turning abstract concepts into experiences people can see and touch, like this site's workflow journey. Applied NLP and generative tooling for knowledge work. And the engineering side: serving models efficiently, monitoring them in production, and building the feedback loops that keep them honest.",
    },
  ];

  clearSections.run(aboutPageRow.id);
  for (let i = 0; i < aboutSections.length; i++) {
    const s = aboutSections[i];
    sectionInsert.run(aboutPageRow.id, s.type, s.title, s.subtitle, s.content, i + 1);
  }
}

// ---------------------------------------------------------------------------
// Content tables
// ---------------------------------------------------------------------------

function seedTopics(force: boolean): void {
  if (!shouldSeed("AiTopic", force)) return;
  const insert = db.prepare(
    `INSERT INTO AiTopic (name, slug, shortDefinition, longDescription, examples, tools, freeResources, icon, "order", featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       name = excluded.name,
       shortDefinition = excluded.shortDefinition,
       longDescription = excluded.longDescription,
       examples = excluded.examples,
       tools = excluded.tools,
       freeResources = excluded.freeResources,
       icon = excluded.icon,
       "order" = excluded."order",
       featured = excluded.featured,
       updatedAt = datetime('now')`
  );
  for (const topic of topics) {
    insert.run(
      topic.name,
      topic.slug,
      topic.shortDefinition,
      topic.longDescription,
      topic.examples,
      topic.tools,
      topic.freeResources,
      topic.icon,
      topic.order,
      topic.featured ? 1 : 0
    );
  }
}

function seedWorkflow(force: boolean): void {
  if (!shouldSeed("WorkflowStep", force)) return;
  const insert = db.prepare(
    `INSERT INTO WorkflowStep (title, subtitle, description, details, inputs, outputs, tools, bestPractices, "order", icon, animationType)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT("order") DO UPDATE SET
       title = excluded.title,
       subtitle = excluded.subtitle,
       description = excluded.description,
       details = excluded.details,
       inputs = excluded.inputs,
       outputs = excluded.outputs,
       tools = excluded.tools,
       bestPractices = excluded.bestPractices,
       icon = excluded.icon,
       animationType = excluded.animationType,
       updatedAt = datetime('now')`
  );
  for (const step of workflowSteps) {
    insert.run(
      step.title,
      step.subtitle,
      step.description,
      step.details,
      step.inputs,
      step.outputs,
      step.tools,
      step.bestPractices,
      step.order,
      step.icon,
      step.animationType
    );
  }
}

function seedTimeline(force: boolean): void {
  if (!shouldSeed("TimelineEvent", force)) return;
  const insert = db.prepare(
    `INSERT INTO TimelineEvent (year, title, description, category, sourceNote, "order")
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT("order") DO UPDATE SET
       year = excluded.year,
       title = excluded.title,
       description = excluded.description,
       category = excluded.category,
       sourceNote = excluded.sourceNote,
       updatedAt = datetime('now')`
  );
  for (const event of timelineEvents) {
    insert.run(
      event.year,
      event.title,
      event.description,
      event.category,
      event.sourceNote,
      event.order
    );
  }
}

function seedProjects(force: boolean): void {
  if (!shouldSeed("Project", force)) return;
  const insert = db.prepare(
    `INSERT INTO Project (title, slug, summary, problem, solution, features, techStack, category, tags, imageUrl, demoUrl, repositoryUrl, "order", featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       title = excluded.title,
       summary = excluded.summary,
       problem = excluded.problem,
       solution = excluded.solution,
       features = excluded.features,
       techStack = excluded.techStack,
       category = excluded.category,
       tags = excluded.tags,
       imageUrl = excluded.imageUrl,
       demoUrl = excluded.demoUrl,
       repositoryUrl = excluded.repositoryUrl,
       "order" = excluded."order",
       featured = excluded.featured,
       updatedAt = datetime('now')`
  );
  for (const project of projects) {
    insert.run(
      project.title,
      project.slug,
      project.summary,
      project.problem,
      project.solution,
      project.features,
      project.techStack,
      project.category,
      project.tags,
      project.imageUrl,
      project.demoUrl,
      project.repositoryUrl,
      project.order,
      project.featured ? 1 : 0
    );
  }
}

function seedResources(force: boolean): void {
  if (!shouldSeed("Resource", force)) return;
  const insert = db.prepare(
    `INSERT INTO Resource (title, url, category, description, license, level)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(url) DO UPDATE SET
       title = excluded.title,
       category = excluded.category,
       description = excluded.description,
       license = excluded.license,
       level = excluded.level,
       updatedAt = datetime('now')`
  );
  for (const resource of resources) {
    insert.run(
      resource.title,
      resource.url,
      resource.category,
      resource.description,
      resource.license,
      resource.level
    );
  }
}

function seedGlossary(force: boolean): void {
  if (!shouldSeed("GlossaryTerm", force)) return;
  const insert = db.prepare(
    `INSERT INTO GlossaryTerm (term, slug, simpleDefinition, detailedDefinition, category, relatedTerms)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       term = excluded.term,
       simpleDefinition = excluded.simpleDefinition,
       detailedDefinition = excluded.detailedDefinition,
       category = excluded.category,
       relatedTerms = excluded.relatedTerms,
       updatedAt = datetime('now')`
  );
  for (const term of glossaryTerms) {
    insert.run(
      term.term,
      term.slug,
      term.simpleDefinition,
      term.detailedDefinition,
      term.category,
      term.relatedTerms
    );
  }
}

function seedSampleMessage(): void {
  const count = countRows("ContactMessage");
  if (count > 0) {
    statuses.push({ table: "ContactMessage", action: "skipped (inbox already has data)" });
    return;
  }
  db.prepare(
    "INSERT INTO ContactMessage (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)"
  ).run(
    sampleContactMessage.name,
    sampleContactMessage.email,
    sampleContactMessage.subject,
    sampleContactMessage.message,
    sampleContactMessage.status
  );
  statuses.push({ table: "ContactMessage", action: "seeded (1 sample message)" });
}

function seedAdminUser(): void {
  syncAdminUser();
  statuses.push({ table: "AdminUser", action: "synced from env credentials" });
}

function seed(): void {
  initSchema();

  if (reset) {
    clearTables();
    console.log("Existing data cleared (--reset).");
  }

  seedSiteSettings(reset);
  seedPagesAndSections(reset);
  seedTopics(reset);
  seedWorkflow(reset);
  seedTimeline(reset);
  seedProjects(reset);
  seedResources(reset);
  seedGlossary(reset);
  seedSampleMessage();
  seedAdminUser();

  console.log("✅ Seed complete.");
  console.log("---------------------------");
  for (const status of statuses) {
    console.log(`${status.table.padEnd(18)} ${status.action}`);
  }
  console.log("---------------------------");
  console.log(`Database file: ${process.env.DATABASE_PATH ?? "data/portfolio.db"}`);
  if (!reset) {
    console.log(
      "Tip: tables that already had data were left untouched so admin edits survive.\n     Use `npm run db:reset` to wipe everything and reseed from scratch."
    );
  }
  console.log(
    `Admin login: username "${process.env.ADMIN_USERNAME ?? "admin"}" with the ADMIN_PASSWORD from your .env file.`
  );
}

try {
  seed();
} catch (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}