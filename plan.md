> I have a 14-week backend engineering study plan structured across 3 phases and 56 sessions. I want you to build a web app (HTML/CSS/JS, single file or simple Vite project) that turns this plan into an interactive progress tracker I can actually use daily.
>
> **The plan data is structured as follows:**
>
> - 3 phases: Foundations (weeks 1–6), Systems Depth (weeks 7–11), Staff-level Skills (weeks 12–14)
> - Each phase has weeks, each week has daily sessions
> - Each session has: a title, a task description, and a type tag (build / watch / read / reflect)
>
> **Features to build:**
>
> 1. **Progress tracking** — each session is a card I can check off. Persist state to `localStorage` so it survives page refreshes. Show a progress bar and completion percentage across the full plan.
> 2. **Resource links per session** — for every session card, surface 2–3 curated, real external links (docs, YouTube videos, blog posts, GitHub repos) that are directly relevant to that session's topic. Hard-code these into the data — don't fetch them dynamically.
> 3. **Reminders** — use the browser's Notification API to send a daily reminder at a user-configured time. The reminder should say which session is up next. Include a simple settings UI to set the reminder time and toggle it on/off.
>
> **UI requirements:**
>
> - Check the DESIGN.md for the design spec
> - Show the full plan by phase, collapsible by week
> - Each session card shows: title, task, type tag, resource links, and a checkbox
> - A sticky header with overall progress bar and streak counter (consecutive days with at least one session completed)
> - Filter view: All / To Do / Done
>
> **Tech constraints:**
>
> - Vite + React app
> - No backend, no auth — fully client-side
> - Must work offline after first load

---
