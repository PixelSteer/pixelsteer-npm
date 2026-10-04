# PixelSteer

**Point at your interface. Describe what you want. Let your coding agent take it from there.**

[PixelSteer](https://pixelsteer.com) adds a friendly visual-feedback layer to your local frontend. Open your app through PixelSteer, click the exact elements you want to change, leave a note, and send that context to your coding agent.

No more describing “the button near the card on the right.” PixelSteer shows your agent exactly what you mean.

## Get started

Install PixelSteer in your frontend project:

```bash
npm install --save-dev pixelsteer
```

Start your app as usual, then point PixelSteer at its local URL:

```bash
npx pixelsteer --target http://localhost:3000 --project-root .
```

Open the URL PixelSteer prints in your terminal and start clicking.

Your development server may use a different port—for example, Vite commonly uses `5173`. Pass the URL your app actually prints when it starts.

## Add a convenient script

You can keep the command close at hand in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "pixelsteer": "pixelsteer --target http://localhost:5173 --project-root ."
  }
}
```

Then run your app and PixelSteer in two terminals:

```bash
npm run dev
npm run pixelsteer
```

## How it fits into your workflow

1. Run your frontend and PixelSteer.
2. Open the browser URL shown by PixelSteer.
3. Select one or more elements and describe the change you want.
4. Send the feedback to your coding agent.
5. Watch your app update as the agent edits the source.

PixelSteer works with coding agents including Codex, Claude Code, and OpenCode. Feedback stays grounded in the page you are looking at while your agent makes changes in the real project files.

## Requirements

- Node.js 18 or newer
- Windows, macOS, or Linux
- An x86-64 or ARM64 computer
- A frontend running on a local development server

The npm package automatically installs the correct PixelSteer executable for your platform and verifies its SHA-256 checksum.

## Learn more

Visit **[pixelsteer.com](https://pixelsteer.com)** for guides, examples, and everything else PixelSteer.
