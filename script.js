/**
 * KARAN KUMAR V - CYBERSECURITY & ETHICAL HACKER PORTFOLIO
 * Interactive Engine: Matrix Rain, 3D Tilt, Cyber Terminal, Audit Simulator, Web Audio SFX
 */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initCustomCursor();
  initTypewriter();
  init3DTilt();
  initTerminal();
  initMobileMenu();
});

/* ==========================================================================
   1. MATRIX DIGITAL RAIN CANVAS
   ========================================================================== */
let matrixRunning = true;
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const characters = '01ABCDEF{}:<>!@#$%^&*()_+-=~[]|/\\01010101XYZ';
  const fontSize = 13;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100);
  }

  function draw() {
    if (!matrixRunning) return;

    ctx.fillStyle = 'rgba(2, 12, 16, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Leading character bright cyan/green, tail darker green
      if (Math.random() > 0.85) {
        ctx.fillStyle = '#00f0ff';
      } else {
        ctx.fillStyle = '#00ff88';
      }

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let intervalId = setInterval(draw, 35);

  // Toggle Button
  const matrixToggle = document.getElementById('matrixToggle');
  if (matrixToggle) {
    matrixToggle.addEventListener('click', () => {
      matrixRunning = !matrixRunning;
      const textSpan = matrixToggle.querySelector('.btn-text');
      if (matrixRunning) {
        canvas.style.opacity = '0.07';
        if (textSpan) textSpan.textContent = 'RAIN: ON';
        showToast('Matrix Rain: ENABLED');
      } else {
        canvas.style.opacity = '0';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (textSpan) textSpan.textContent = 'RAIN: OFF';
        showToast('Matrix Rain: DISABLED');
      }
      playCyberSound('click');
    });
  }
}

/* ==========================================================================
   2. CUSTOM GLOWING CYBER CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cur = document.getElementById('cur');
  const cdot = document.getElementById('cdot');
  if (!cur || !cdot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cdot.style.left = `${mouseX}px`;
    cdot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cur.style.left = `${curX}px`;
    cur.style.top = `${curY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Enlarge cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .tool-chip, .hero-stat-card, .disclosure-card, .project-card, .qc-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('active');
    });
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const twElem = document.getElementById('tw-text');
  if (!twElem) return;

  const phrases = [
    'Web Application Penetration Testing',
    'Burp Suite Advanced Traffic Analysis',
    'CERT-In Acknowledged Vulnerability Research',
    'AuthSentinel: JWT & Auth Security Analyzer',
    'GraphQL Injection & Schema Audit',
    'Session Replay & OTP Brute-Force Testing',
    'SecureHeaders: Automated Defense Suite'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 70;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      twElem.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 35;
    } else {
      twElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 70;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      speed = 1800; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400; // Pause before new
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   4. 3D TILT EFFECT
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotY = ((x - midX) / midX) * 7;
      const rotX = -((y - midY) / midY) * 7;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL (/bin/kv-sh)
   ========================================================================== */
function initTerminal() {
  const termInput = document.getElementById('terminalInput');
  const termOutput = document.getElementById('terminalOutput');
  if (!termInput || !termOutput) return;

  const commandHistory = [];
  let historyIdx = -1;

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      if (rawCmd) {
        commandHistory.push(rawCmd);
        historyIdx = commandHistory.length;
        executeTermCommand(rawCmd);
        termInput.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        termInput.value = commandHistory[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < commandHistory.length - 1) {
        historyIdx++;
        termInput.value = commandHistory[historyIdx];
      } else {
        historyIdx = commandHistory.length;
        termInput.value = '';
      }
    }
  });
}

window.executeTermCommand = function(cmd) {
  const termOutput = document.getElementById('terminalOutput');
  if (!termOutput) return;

  playCyberSound('terminal');

  // Print prompt line
  appendTermRow(`<span class="term-green">karan@sec-research:~$</span> <span class="term-hl">${escapeHtml(cmd)}</span>`);

  const cleanCmd = cmd.toLowerCase().trim();

  switch (cleanCmd) {
    case 'help':
      appendTermRow(`
        <span class="term-cyan">AVAILABLE COMMANDS:</span><br>
        &nbsp;&nbsp;<span class="term-green">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Operator profile & credentials<br>
        &nbsp;&nbsp;<span class="term-green">certin</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- CERT-In registered vulnerability case info<br>
        &nbsp;&nbsp;<span class="term-green">disclosures</span>&nbsp;- Full security research advisory portfolio<br>
        &nbsp;&nbsp;<span class="term-green">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;- AuthSentinel & SecureHeaders overview<br>
        &nbsp;&nbsp;<span class="term-green">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Pentesting arsenal & exploit proficiencies<br>
        &nbsp;&nbsp;<span class="term-green">education</span>&nbsp;&nbsp;&nbsp;- Academic background & degree details<br>
        &nbsp;&nbsp;<span class="term-green">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Direct encrypted communication channels<br>
        &nbsp;&nbsp;<span class="term-green">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal display buffer
      `);
      break;

    case 'whoami':
      appendTermRow(`
        <span class="term-cyan">[OPERATOR PROFILE]</span><br>
        Name: <span class="term-hl">Karan Kumar V</span><br>
        Role: <span class="term-green">Cybersecurity Student | Ethical Hacker | Penetration Tester</span><br>
        Specialization: Web Application Security & Vulnerability Assessment<br>
        Location: Erode, Tamil Nadu, India<br>
        Clearance: CERT-In Officially Acknowledged Security Researcher (2026)
      `);
      break;

    case 'certin':
      appendTermRow(`
        <span class="term-red">[CERT-In FORMAL CASE REGISTRATION // 2026]</span><br>
        Agency: <span class="term-green">Indian Computer Emergency Response Team</span><br>
        Target: railfeast.com<br>
        Vulnerabilities: <br>
        &nbsp;&nbsp;1. Critical OTP Brute Force (Missing Rate Limiting / Account Lockout)<br>
        &nbsp;&nbsp;2. Session Replay (Indefinite JWT Re-Authentication Flaw)<br>
        Status: <span class="term-green">OFFICIALLY ACKNOWLEDGED & FORMALLY REGISTERED</span>
      `);
      break;

    case 'disclosures':
      appendTermRow(`
        <span class="term-cyan">[RESPONSIBLE DISCLOSURE REPOSITORY]</span><br>
        <span class="term-red">1. railfeast.com [2026] - OTP Brute Force & Session Replay</span><br>
        &nbsp;&nbsp;&nbsp;Reported to: CERT-In | Impact: Financial & Personal Data Exposure<br>
        <span class="term-orange">2. railfeast.com [2026] - GraphQL Injection & Introspection</span><br>
        &nbsp;&nbsp;&nbsp;Schema Leak: password, accountNumber, ifscCode, bankName
      `);
      break;

    case 'projects':
      appendTermRow(`
        <span class="term-cyan">[SECURITY TOOLS DEVELOPED]</span><br>
        <span class="term-green">1. AuthSentinel</span> - Cross-Platform JWT & Auth Security Analyzer<br>
        &nbsp;&nbsp;&nbsp;Repo: <a href="https://github.com/KaranKumar-V-cyber/AuthSentinel.git" target="_blank" style="color:#00f0ff;">github.com/KaranKumar-V-cyber/AuthSentinel</a><br>
        <span class="term-green">2. Web Security Header Analyzer</span> - Browser Header Audit Utility<br>
        &nbsp;&nbsp;&nbsp;Repo: <a href="https://github.com/KaranKumar-V-cyber/SecureHeaders.git" target="_blank" style="color:#00f0ff;">github.com/KaranKumar-V-cyber/SecureHeaders</a>
      `);
      break;

    case 'skills':
      appendTermRow(`
        <span class="term-cyan">[ATTACK VECTORS & PENETRATION PROFICIENCY]</span><br>
        • IDOR / Broken Access Control [95%]<br>
        • Burp Suite Pro & Traffic Manipulation [92%]<br>
        • Authentication Bypass & Session Replay [90%]<br>
        • GraphQL Security & Schema Audit [88%]<br>
        • Cross-Site Scripting (XSS) [86%]<br>
        • SQL Injection (SQLi) & SQLMap [85%]<br>
        • Nmap Network Reconnaissance [85%]<br>
        • Server-Side Template Injection (SSTI) [82%]
      `);
      break;

    case 'education':
      appendTermRow(`
        <span class="term-cyan">[ACADEMIC BACKGROUND]</span><br>
        Degree: <span class="term-hl">B.E. Computer Science Engineering (Cyber Security)</span> [2024 - 2028]<br>
        Institution: CMS College of Engineering and Technology<br>
        Honors: Rajyapuraskar Award - Bharat Scouts and Guides (2025)
      `);
      break;

    case 'contact':
      appendTermRow(`
        <span class="term-cyan">[DIRECT COMMS]</span><br>
        Email: <span class="term-green">karankumar.kv.cyber@gmail.com</span><br>
        Phone: <span class="term-green">+91 8807880659</span><br>
        LinkedIn: <a href="https://www.linkedin.com/in/karan-kumar-kv/" target="_blank" style="color:#00f0ff;">linkedin.com/in/karan-kumar-kv</a><br>
        GitHub: <a href="https://github.com/KaranKumar-V-cyber" target="_blank" style="color:#00f0ff;">github.com/KaranKumar-V-cyber</a>
      `);
      break;

    case 'clear':
      termOutput.innerHTML = '';
      break;

    default:
      appendTermRow(`<span class="term-red">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="term-hl">'help'</span> for list.</span>`);
      break;
  }

  termOutput.scrollTop = termOutput.scrollHeight;
};

function appendTermRow(html) {
  const termOutput = document.getElementById('terminalOutput');
  const div = document.createElement('div');
  div.className = 'term-row';
  div.innerHTML = html;
  termOutput.appendChild(div);
  termOutput.scrollTop = termOutput.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   6. INTERACTIVE AUDIT SIMULATOR
   ========================================================================== */
let activeSimMode = 'authsentinel';

window.switchSimulatorTab = function(mode) {
  activeSimMode = mode;
  const tabAuth = document.getElementById('tabAuthSentinel');
  const tabSec = document.getElementById('tabSecureHeaders');
  const input = document.getElementById('simTargetInput');
  const output = document.getElementById('simOutput');

  playCyberSound('click');

  if (mode === 'authsentinel') {
    tabAuth.classList.add('active');
    tabSec.classList.remove('active');
    input.value = 'https://railfeast.com/api/v1/auth';
    output.innerHTML = `
      <div class="output-line cyan">// Mode: AuthSentinel [JWT & Auth Security Engine]</div>
      <div class="output-line">// Ready to audit token lifetimes, alg flaws, CORS & session replay.</div>
    `;
  } else {
    tabSec.classList.add('active');
    tabAuth.classList.remove('active');
    input.value = 'https://railfeast.com';
    output.innerHTML = `
      <div class="output-line cyan">// Mode: SecureHeaders [Defensive Browser Policy Scanner]</div>
      <div class="output-line">// Ready to inspect CSP, HSTS, X-Frame-Options, Cookie security flags.</div>
    `;
  }
};

window.openToolSimulator = function(mode) {
  switchSimulatorTab(mode);
  const el = document.getElementById('auditSimulator');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      runSimulation();
    }, 600);
  }
};

window.runSimulation = function() {
  const target = document.getElementById('simTargetInput').value.trim() || 'https://railfeast.com';
  const output = document.getElementById('simOutput');
  const btn = document.getElementById('simRunBtn');
  btn.disabled = true;
  btn.textContent = 'SCANNING...';

  playCyberSound('terminal');
  output.innerHTML = `<div class="output-line green">&gt; INITIATING ASSESSMENT ON: ${escapeHtml(target)}</div>`;

  const logs = activeSimMode === 'authsentinel' ? [
    { text: '[+] Resolving endpoint DNS & verifying SSRF protection...', delay: 300, color: 'dim' },
    { text: '[+] Requesting handshake // Analyzing authorization headers...', delay: 700, color: 'dim' },
    { text: '[*] JWT Detected: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', delay: 1100, color: 'cyan' },
    { text: '[!] AUDIT ALERT: Algorithm confusion test (alg: none) rejected.', delay: 1500, color: 'green' },
    { text: '[!] CRITICAL: Rate limiting headers missing on /auth/otp endpoint!', delay: 1900, color: 'red' },
    { text: '[!] CRITICAL: JWT expiration claim (exp) missing or perpetual session token detected.', delay: 2300, color: 'red' },
    { text: '[!] HIGH: Cookie "session_id" missing HttpOnly and SameSite flags.', delay: 2700, color: 'orange' },
    { text: '[+] Assessment complete. Generated finding report: [SEVERITY: CRITICAL - SCORE 42/100]', delay: 3100, color: 'white' }
  ] : [
    { text: '[+] Probing target headers for: ' + escapeHtml(target), delay: 300, color: 'dim' },
    { text: '[*] Content-Security-Policy (CSP): MISSING or Unsafe-Inline permitted', delay: 700, color: 'orange' },
    { text: '[*] Strict-Transport-Security (HSTS): max-age=31536000; includeSubDomains [PASS]', delay: 1100, color: 'green' },
    { text: '[*] X-Frame-Options: SAMEORIGIN [PROTECTED against Clickjacking]', delay: 1500, color: 'green' },
    { text: '[!] Access-Control-Allow-Origin: Wildcard (*) detected on authenticated path!', delay: 1900, color: 'red' },
    { text: '[*] X-Content-Type-Options: nosniff [PASS]', delay: 2300, color: 'green' },
    { text: '[+] Scan finished. Security Grade: B- (Remediation: Harden CSP & Restrict CORS)', delay: 2700, color: 'white' }
  ];

  logs.forEach(log => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = `output-line ${log.color}`;
      line.textContent = log.text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
      playCyberSound('click');
    }, log.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'ANALYZE';
  }, logs[logs.length - 1].delay + 200);
};

/* ==========================================================================
   7. TOOL INTELLIGENCE CHIPS
   ========================================================================== */
const toolIntelData = {
  'Burp Suite Pro': {
    title: 'TOOL INTEL: Burp Suite Professional',
    desc: 'Primary weapon for application traffic interception, custom Intruder payload configuration, session replay analysis, and constructing comprehensive Proof-of-Concept exploits for CERT-In disclosures.'
  },
  'Kali Linux': {
    title: 'TOOL INTEL: Kali Linux Operating System',
    desc: 'Dedicated offensive environment configured for network reconnaissance, protocol analysis, wordlist generation, and secure exploit research.'
  },
  'Nmap': {
    title: 'TOOL INTEL: Network Mapper (Nmap)',
    desc: 'Utilized for service enumeration, open port discovery, OS fingerprinting, and script-based scanning (NSE) during network security assessments.'
  },
  'SQLMap': {
    title: 'TOOL INTEL: SQLMap Automated Testing Suite',
    desc: 'Automates the detection and exploitation of SQL injection flaws, database fingerprinting, and backend schema extraction during authorized audits.'
  },
  'Docker': {
    title: 'TOOL INTEL: Docker Containerization',
    desc: 'Deploying isolated vulnerable test environments, reproducing security findings safely, and packaging AuthSentinel / SecureHeaders for cross-platform distribution.'
  },
  'FastAPI & Python': {
    title: 'TOOL INTEL: Python 3 & FastAPI Engine',
    desc: 'Crafting custom exploitation scripts, concurrency-safe token fuzzers, and the backend asynchronous API scanner driving AuthSentinel.'
  },
  'TypeScript & React': {
    title: 'TOOL INTEL: TypeScript & Next.js / React',
    desc: 'Building high-performance defensive security dashboards, visual vulnerability classification matrices, and client-side security analyzers.'
  },
  'PostgreSQL / SQLite': {
    title: 'TOOL INTEL: PostgreSQL & SQLite Storage',
    desc: 'Architecting secure data pipelines for historical scan logs, vulnerability definitions, and audit reports with parameterized query defenses.'
  }
};

window.showToolIntel = function(toolName) {
  const display = document.getElementById('toolIntelDisplay');
  const tiName = document.getElementById('tiName');
  const tiDesc = document.getElementById('tiDesc');
  const data = toolIntelData[toolName];

  playCyberSound('click');

  if (display && data) {
    tiName.textContent = data.title;
    tiDesc.textContent = data.desc;
    display.style.animation = 'none';
    display.offsetHeight; // trigger reflow
    display.style.animation = 'fadeInUp 0.4s ease';
  }
};

// SFX audio system disabled per user preference
function playCyberSound(type) {
  // Sound effects removed
}

/* ==========================================================================
   9. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
window.copyToClipboard = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`COPIED: ${text}`);
    playCyberSound('click');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>COPIED!</span>';
      setTimeout(() => {
        btn.innerHTML = orig;
      }, 1800);
    }
  }).catch(() => {
    showToast('Failed to copy. Please manually select text.');
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<span style="color:#00ff88;">[HUD]</span> ${escapeHtml(message)}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   10. CONTACT FORM SUBMISSION
   ========================================================================== */
window.handleFormSubmit = async function(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const formStatus = document.getElementById('formStatus');
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('messageBody').value.trim();

  if (!name || !email || !message) return;

  const origBtnContent = sendBtn.innerHTML;
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="btn-text">TRANSMITTING PACKET...</span>';
  if (formStatus) {
    formStatus.style.color = '#00f0ff';
    formStatus.textContent = '// Dispatching encrypted packet to karankumar.kv.cyber@gmail.com...';
  }

  showToast('TRANSMITTING PACKET // Sending email...');

  try {
    const response = await fetch('https://formsubmit.co/ajax/karankumar.kv.cyber@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: `[Cyber Portfolio] ${subject} - from ${name}`,
        _replyto: email,
        subject: subject,
        message: message
      })
    });

    const result = await response.json();

    if (response.ok && (result.success === 'true' || result.success === true)) {
      sendBtn.innerHTML = '<span class="btn-text" style="color:#00ff88;">✓ PACKET TRANSMITTED // DELIVERED</span>';
      if (formStatus) {
        formStatus.style.color = '#00ff88';
        formStatus.textContent = "✓ TRANSMISSION SUCCESSFUL // Message delivered to Karan's inbox.";
      }
      showToast('TRANSMISSION CONFIRMED // Email delivered!');
      form.reset();
      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = origBtnContent;
        if (formStatus) {
          formStatus.style.color = '';
          formStatus.textContent = '* Direct transmission sends payload directly to karankumar.kv.cyber@gmail.com';
        }
      }, 5000);
    } else {
      throw new Error(result.message || 'Dispatch error');
    }
  } catch (err) {
    console.warn('FormSubmit fallback:', err);
    // Seamless fallback to web email client / mailto so message is never lost
    const bodyText = `Sender Name / Org: ${name}\nEmail: ${email}\n\nTransmission Payload:\n${message}`;
    const mailSubject = encodeURIComponent(`[SECURITY COMM] ${subject}`);
    const mailBody = encodeURIComponent(bodyText);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=karankumar.kv.cyber@gmail.com&su=${mailSubject}&body=${mailBody}`;

    sendBtn.innerHTML = '<span class="btn-text">LAUNCHING EMAIL CLIENT...</span>';
    if (formStatus) {
      formStatus.style.color = '#ffaa00';
      formStatus.textContent = '! Redirecting to web email compose...';
    }
    showToast('FALLBACK ROUTE // Opening web email compose...');

    // Try opening Gmail Web, or fallback to system mailto
    const opened = window.open(gmailUrl, '_blank');
    if (!opened) {
      window.location.href = `mailto:karankumar.kv.cyber@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    }

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = origBtnContent;
    }, 4000);
  }
};

/* ==========================================================================
   11. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    playCyberSound('click');
  });

  // Close menu when a link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
