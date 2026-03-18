# Contributing to 30 Days

Welcome, stranger. This project belongs to whoever shows up.

Here's everything you need to know to leave your mark.

---

## The Rules (read these first)

1. **Add anything you want. Delete nothing.** Once something is in, it stays in until day 30.
2. **Comment your code.** Other contributors — people you've never met — will read it and build on top of it.
3. **No malicious content.** No phishing, no spam, no scrapers, no anything that could harm someone. You are fully responsible for the security and content of your submission.
4. **The end date is fixed.** April 17, 2026. The clock doesn't stop.
5. **On April 17, 2026 — it's gone.** No archive. No revival.

---

## How to Fork and Contribute

```bash
# 1. Fork the repo on GitHub (button in the top right)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/thirty-days.git
cd thirty-days

# 3. Make your changes (see options below)

# 4. Commit with a clear message
git add .
git commit -m "Add: [your name] — [what you added]"

# 5. Push to your fork
git push origin main

# 6. Open a pull request to the original repo
#    Title format: "Add: [your name] — [what you added]"
```

---

## Option A: Sign the Guestbook

The simplest contribution. Leave your name and one sentence.

Open `guestbook.json` and add your entry at the end of the array:

```json
{
  "name": "Your Name",
  "message": "One sentence. That's all you get.",
  "date": "YYYY-MM-DD",
  "github": "your-github-handle"
}
```

Rules:
- `message` must be one sentence
- `date` is the date you're adding your entry (YYYY-MM-DD format)
- `github` is optional but encouraged — your handle, no `@`
- Do not delete other entries

---

## Option B: Add a Contribution

Got something to build? A game, a tool, a poem, an experiment, a joke — anything goes.

### Step 1: Create your folder

Add your files inside `/contributions/`:

```
contributions/
  your-name/
    index.html   ← entry point for your contribution
    ...          ← whatever else you need
```

You can add as many files as you want. Keep them inside your named folder so they don't collide with other contributors.

### Step 2: Add the required comment block

Every contribution file must include a header comment block:

**HTML files:**
```html
<!--
  CONTRIBUTOR: Your Name (@github_handle)
  DATE: YYYY-MM-DD
  DESCRIPTION: What this does in one sentence
  CONTACT: optional — email, site, whatever
-->
```

**JavaScript files:**
```javascript
/*
  CONTRIBUTOR: Your Name (@github_handle)
  DATE: YYYY-MM-DD
  DESCRIPTION: What this does in one sentence
  CONTACT: optional
*/
```

**CSS files:**
```css
/*
  CONTRIBUTOR: Your Name (@github_handle)
  DATE: YYYY-MM-DD
  DESCRIPTION: What these styles do in one sentence
  CONTACT: optional
*/
```

### Step 3: Add your card to index.html

Open `index.html` and find the `<script id="contributions-data">` tag near the bottom. Add your entry to the JSON array:

```json
{
  "title": "My Thing",
  "description": "One sentence about what it does.",
  "author": "Your Name (@github_handle)",
  "url": "./contributions/your-name/index.html"
}
```

### Step 4: Open a PR

That's it. Open a pull request to main. Use the title format:
`Add: [your name] — [what you built]`

---

## Adding to the Shared Stylesheet or Script

If your contribution needs to touch `styles/main.css` or `scripts/main.js`:

- **Only add to the bottom.** There's a clearly marked contributor zone at the end of each file.
- **Do not modify existing rules or functions.** Only append new ones.
- **Use the CSS variables** defined in `:root` in `main.css` for consistency.

If your addition is large, create a separate file instead:
- `styles/your-name.css`
- `scripts/your-name.js`

Then add a `<link>` or `<script>` tag in `index.html` — there's a marked spot for that too.

---

## Security

You are responsible for the security of your own code.

Common things to avoid:
- Don't `eval()` user input
- Don't make requests to external servers without disclosing it in your comment block
- Don't store or transmit personal data
- Don't try to access or modify other contributors' work via JavaScript
- Don't embed tracking scripts or fingerprinting code

If you spot a security issue in someone else's contribution, open an issue on GitHub describing the problem (without exploiting it).

---

## What Not to Submit

- Content that targets or harms individuals
- Automated bots or scripts that spam the repo
- Anything designed to break the page for other users
- Content that violates GitHub's Terms of Service

Use common sense. You're contributing to something strangers will see.

---

## Questions?

Open an issue on GitHub. The community will figure it out.

---

*This project has no owner after day 1. It belongs to whoever shows up.*
