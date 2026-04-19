# get.cracked

get cracked is a study tracker for backend-focused learning.

It is designed for people working through a long prep plan and wanting a cleaner way to keep up with sessions, notes, reminders, and momentum without losing progress.

## Highlights

- Track progress session by session
- Keep short notes for each study block
- Use reminders to stay consistent
- Export and restore your progress whenever you want
- Keep using it in guest mode or connect an account when account features are available

## How It Works

The app is built to feel simple day to day:

- Your progress stays available on the device you are using
- Notes and reminders are part of the same flow, not separate tools
- Backup and restore are available so your progress is portable
- Account support can extend that experience across devices when configured

## Run Locally

1. Install dependencies.

```bash
npm install
```

2. Start the development server.

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## Optional Account Features

This project works without any account setup.

If you want sign-in and synced progress for your own deployment, copy [.env.example](.env.example) to `.env.local` and add the values required for your project.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Notes

- This repository is intended to stay safe for public sharing
- Secrets and local environment values should never be committed
- The app remains usable even when optional account features are not configured
