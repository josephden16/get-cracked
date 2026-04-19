Here are the most impactful improvements, roughly in order of value:

**Features**

- ✅ **Today's session** — pin the next undone session at the top of the page so there's zero friction deciding what to do
- ✅ **Session notes** — a text area per card to jot down what you built/learned; stored in localStorage
- ✅ **Search/filter by keyword** — type to filter session titles, useful once you're mid-plan
- ✅ **Per-phase progress** — show `4/10 done` next to each phase header, not just the global bar
- ✅ **Undo last check** — one accidental click can mess up your streak; a brief toast with "Undo" would fix that

**UX polish**

- ✅ **Better empty states** — the "Done" and "To do" filters show nothing with no message when empty; add a short prompt
- **Keyboard shortcut** — pressing `Space` or `Enter` on a focused card to toggle it done
- ✅ **Streak milestone toasts** — a brief inline message at 7, 14, 30 days to acknowledge progress

**Technical**

- **PWA manifest + service worker** — makes it installable on desktop/mobile and works offline (Vite has a plugin for this: `vite-plugin-pwa`)
- ✅ **Export progress** — download a JSON snapshot of completed sessions + dates as a backup

**Design**

- ✅ **Check animation** — a small scale/fade on the circle when toggling done feels much more satisfying than an instant state swap
- ✅ **Wider max-width on large screens** — 780px feels narrow on a 1440p monitor; 960px would use the space better
