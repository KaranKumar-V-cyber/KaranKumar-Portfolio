# Karan Kumar V — Cybersecurity Portfolio

> A high-performance, cyber-themed personal portfolio website for **Karan Kumar V** — Cybersecurity Student, Ethical Hacker, Penetration Tester, and CERT-In Acknowledged Security Researcher. Inspired by the cyber aesthetic of `hiddendomy.github.io`.

---

## 🛡️ Key Features

- **Dark Cyber & Matrix Rain Aesthetic**:
  - Deep space cyberspace background palette (`#020c10`, `#051419`) with neon cyan (`#00f0ff`) and matrix green (`#00ff88`) glowing accents.
  - Interactive Canvas Matrix Rain with toggle controls (`⚡ RAIN: ON/OFF`).
  - Smooth custom glowing cursor (`#cur`, `#cdot`) and subtle CRT scanline effect.
  - Cyberpunk typography powered by Google Fonts (`Orbitron`, `Rajdhani`, and `Share Tech Mono`).
- **CERT-In Formal Recognition Showcase**:
  - Highlights the official 2026 acknowledgment and registered formal security case by the **Indian Computer Emergency Response Team (CERT-In)** for critical OTP brute force and session replay vulnerabilities (`railfeast.com`).
  - Details on collaborative GraphQL injection and introspection vulnerability disclosures.
- **Security Tools & Repositories**:
  - **AuthSentinel**: Cross-platform JWT and authentication security analyzer (Next.js, FastAPI, Docker, SSRF protection). [GitHub Repository](https://github.com/KaranKumar-V-cyber/AuthSentinel.git)
  - **Web Security Header Analyzer**: Automated defensive HTTP scanner for CSP, HSTS, CORS, and cookie flags. [GitHub Repository](https://github.com/KaranKumar-V-cyber/SecureHeaders.git)
- **Live Interactive Audit Simulator**:
  - Interactive simulation widget right on the page allowing visitors to test sample endpoints with real-time colored heuristic outputs and security scoring.
- **Interactive Cyber Terminal (`/bin/kv-sh`)**:
  - Built-in terminal emulator supporting commands: `whoami`, `certin`, `disclosures`, `projects`, `skills`, `education`, `contact`, and `clear`, with quick-click command suggestion buttons.
- **1-Click Copy & Secure Communications**:
  - Instant clipboard copy for email (`karankumar.kv.cyber@gmail.com`) and phone (`+91 8807880659`) with HUD toast feedback.
  - Direct LinkedIn and GitHub links.

---

## 📁 File Structure

```text
kv portfolio/
├── index.html        # Semantic HTML5 markup, meta tags, OpenGraph, and structure
├── style.css         # Cyberpunk styling, 3D tilt effects, HUD cards, responsive layout
├── script.js         # Matrix rain, audio SFX, terminal emulator, audit simulator
└── README.md         # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

Because this website is built with clean Vanilla HTML, CSS, and JavaScript, no build step or node installation is needed:

1. **Directly in Browser**:
   Double click [index.html](file:///d:/projects/kv%20portfolio/index.html) to open it in any modern browser.

2. **Using Python Local Server**:
   ```bash
   python -m http.server 8080
   ```
   Open `http://localhost:8080` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (Like hiddendomy.github.io)

1. Create a repository on GitHub named `KaranKumar-V-cyber.github.io` (for a personal root domain) or `portfolio`.
2. Push these files to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of cyber portfolio"
   git branch -M main
   git remote add origin https://github.com/KaranKumar-V-cyber/<repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository settings, go to **Settings > Pages > Build and deployment**, select **Deploy from a branch (`main` / root)**, and click **Save**.
4. Your website will be live at `https://karankumar-v-cyber.github.io`!
