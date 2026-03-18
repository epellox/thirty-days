# How to Contribute

Quick reference for contributors. Full guide: [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## Fastest path

**Sign the guestbook:**

Add your entry to `guestbook.json`:
```json
{
  "name": "Your Name",
  "message": "One sentence.",
  "date": "YYYY-MM-DD",
  "github": "your-handle"
}
```

---

**Add a contribution:**

1. Create `contributions/your-name/index.html` (or whatever files you need)
2. Add the required header comment to every file:

```html
<!--
  CONTRIBUTOR: Your Name (@github_handle)
  DATE: YYYY-MM-DD
  DESCRIPTION: What this does in one sentence
-->
```

3. Add your card to the `<script id="contributions-data">` JSON in `index.html`
4. Open a PR

---

## Golden rules

- Add only. Never delete.
- Comment everything.
- No malicious content.
- Keep it inside your `/contributions/your-name/` folder.

---

*This project ends April 17, 2026. Make it count.*
