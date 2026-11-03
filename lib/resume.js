// Christian's resume, used as the "brain" of the AI clone chatbot.
// Keep this in sync with public/ChristianIkireziResume.pdf when the resume changes.
// Phone number intentionally omitted so the bot never hands it out.
export const RESUME = `CHRISTIAN IKIREZI
Contact: christianikirezi@gmail.com (preferred) · school email chrispri@my.yorku.ca · christianikirezi.com · github.com/chrisprince-ic · linkedin.com/in/christian-ikirezi-8b395021a
Resume download: the "Resume" button on this site.

EDUCATION
York University, Lassonde School of Engineering — Toronto, ON
Bachelor of Science (Honours) in Computer Science. Expected graduation: May 2028.
Relevant coursework: Data Structures and Algorithms, Operating Systems, Computer Organization, Linear Algebra.
Fellowship: YSpace Inventor to Founder Fellowship (2026).
Certifications: React Native; Fundamentals of React.js (O'Reilly).

TECHNICAL SKILLS
Languages: Python, Java, TypeScript, JavaScript, SQL, HTML/CSS, Pine Script.
Frontend: React, React Native, Next.js.
Backend & data: Node.js, Firebase, stored procedures.
Testing: Playwright, end-to-end (E2E) testing, regression testing.
Developer tools: Git, Maven, Nx.
APIs & platforms: OpenAI API, Stripe.

EXPERIENCE
PointClickCare (Co-op) — Software Engineer Intern, Mississauga, ON. Sep 2026 – Present.
- Migrated Nautilus, a React/TypeScript healthcare billing micro-frontend, from the legacy UI to the new design system and made it responsive across desktop and tablet, giving billing staff one consistent interface.
- Diagnosed an Edit Details defect where saved edits failed to persist: confirmed via browser network requests that updated values left the client correctly, then traced them through application logs and SQL stored procedures to input-field flags that caused the database to ignore the new values; fixed it and validated with Playwright E2E tests.
- Built a reusable unsaved-changes guard adopted across 13 call sites with zero consumer changes, warning users before they navigate away from in-progress billing work.
- Fixed initialization and timing defects that could load the settings page blank or clear it while users were typing.
- Strengthened automated regression tests by temporarily reverting each fix to confirm its test failed, and removed 2 tests that still passed against broken behavior, so regressions fail CI before reaching users.

PROJECTS
Exee AI (exetasy.com) — Founder & Lead Developer, YSpace, York University, Toronto. Apr 2026 – Present.
- Built a full-stack AI exam-prep platform (Next.js, TypeScript, Firebase, OpenAI API) where students practice AI-generated exams and lab tests and see how ready they are before test day.
- Designed a teacher dashboard where instructors describe what to assess, the AI generates the practice exam, and the class view surfaces readiness, difficulty calibration, and weak topic areas.
- Integrated Stripe subscriptions and launched the product live; running an A/B study with students to measure the platform's effect on grades.

Macrovia (macrovia.health) — Developer, iOS app, Toronto. 2025 – Present.
- Built an iOS calorie and health tracker that analyzes a photo of a meal and returns estimated calories and macros using an AI vision pipeline.
- Integrated a smart wristband SDK to sync activity and health data, combining food intake and energy burned in one daily dashboard.
- Shipped as a live subscription product, using Firebase for authentication and storage and Stripe for payments.

Algorithmic Trading Bot — Python, MetaTrader 5, Pine Script.
- Built a modular Python/MT5 trading bot for XAUUSD, GBPUSD, EURUSD, and USDJPY that detects fair value gaps, order blocks, and liquidity sweeps; audited and rewrote the companion Pine Script strategy (v2, v2.1).`;

// Extra context from the portfolio site itself (not on the resume).
export const SITE_EXTRAS = `- Based in Toronto, Canada; open to software roles and remote work.
- Product-focused; cares about UI/UX and human-centered interfaces. Sketches ideas on a whiteboard first, then builds them end to end.
- Other portfolio projects: IceComm, an online marketplace focused on frictionless checkout and trust signals (Next.js, React, Tailwind); a YouTube clone with streaming, auth and comments (React, Next.js, Firebase, Tailwind).`;
