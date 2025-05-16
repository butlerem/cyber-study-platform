# Explab

Explab is a browser-based cybersecurity learning platform focused on hands-on web security challenges, similar to platforms like Hack The Box and TryHackMe. The app is designed for students and aspiring security professionals to practice offensive web security techniques in a safe, guided, and interactive environment.

Challenge categories include:

- SQL Injection (SQLi)
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Insecure Direct Object References (IDOR)
- Session Fixation, Logic Bugs, and more

Each challenge runs in an isolated environment, where users interact with a custom-built vulnerable web app and submit exploit payloads to uncover flags. These flags simulate real-world penetration testing tasks and are automatically validated by the system.

## How It Works

- Challenges are hosted as isolated containers or serverless endpoints with known vulnerabilities.
- Each challenge has a unique flag string that users must find through exploitation.
- Flags are submitted through the platform UI and verified server-side.
- User progress, submissions, and leaderboard stats are stored in **MongoDB**.

## Tech Stack

- **Next.js** – Frontend and API routes
- **React** – Interactive UI components
- **MongoDB & Mongoose** – Database for users, progress tracking, and challenge metadata
- **NextAuth** – Authentication with session support
- **Framer Motion** – Animations and transitions
- **Three.js** – 3D effects and visual styling
- **TailwindCSS** – Styling and component design
- **TypeScript** – Static typing for frontend/backend code
- **Docker or Serverless Hosting (e.g., Vercel Functions)** – Challenge environments

## Practical Learning

- Realistic vulnerabilities, crafted to mimic live production flaws
- Custom challenge scripting and dynamic flag generation
- Immediate feedback for submitted solutions

## Active Community

- Join fellow students and ethical hackers
- Share techniques, solve challenges, climb the leaderboard

## Contribute

- Submit new challenges using the JSON-based challenge format
