/* =====================================================
   DeepGuard AI – JavaScript
   ===================================================== */

/* ==========================================================
   MATRIX RAIN CANVAS
   ========================================================== */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = 'DEEPGUARDAI0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|!@#$%^&*';
  const fontSize = 13;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px Space Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const alpha = Math.random() > 0.5 ? 1 : 0.4;
      ctx.fillStyle = `rgba(255,${Math.floor(80 + Math.random()*60)},0,${alpha})`;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  window._matrixInterval = setInterval(drawMatrix, 40);
})();


/* ==========================================================
   TYPEWRITER EFFECT
   ========================================================== */
function typeText(el, text, speed, cb) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
      if (cb) cb();
    }
  }, speed);
}

/* ==========================================================
   SPLASH / BOOT SEQUENCE
   ========================================================== */
(function runBoot() {
  const lines = [
    { id: 'bl1', text: 'Initializing DeepGuard AI...', delay: 600 },
    { id: 'bl2', text: 'Loading EfficientNet-B0 model...', delay: 1800 },
    { id: 'bl3', text: 'Calibrating detection pipeline...', delay: 3000 },
    { id: 'bl4', text: 'System READY. Authenticity verified.', delay: 4400 },
  ];

  // Progress bar
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  let pct = 0;
  const pInterval = setInterval(() => {
    pct += 0.8;
    if (pct >= 100) { pct = 100; clearInterval(pInterval); }
    fill.style.width = pct + '%';
    label.textContent = Math.round(pct) + '%';
  }, 45);

  lines.forEach(({ id, text, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      const typedEl = el.querySelector('.typed');
      el.classList.add('visible');
      typeText(typedEl, text, 30, () => {
        if (id === 'bl4') {
          setTimeout(() => {
            document.getElementById('enter-btn').style.display = 'inline-flex';
          }, 400);
        }
      });
    }, delay);
  });
})();


/* ==========================================================
   ENTER APP
   ========================================================== */
function enterApp() {
  const splash = document.getElementById('splash-screen');
  const app = document.getElementById('main-app');

  // Stop matrix
  clearInterval(window._matrixInterval);

  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.style.display = 'none';
    app.classList.remove('hidden');
    setTimeout(() => app.classList.add('visible'), 50);
    initApp();
  }, 800);
}

/* ==========================================================
   MAIN APP INIT
   ========================================================== */
function initApp() {
  initNavbar();
  initTabIndicator();
  initCounters();
  initScrollAnimations();
  initFileInput();
}

/* ==========================================================
   NAVBAR SCROLL EFFECT
   ========================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  });
}

/* ==========================================================
   TAB INDICATOR
   ========================================================== */
let currentTab = 'image';

function initTabIndicator() {
  positionIndicator('tab-image');
}

function positionIndicator(id) {
  const btn = document.getElementById(id);
  const indicator = document.getElementById('tab-indicator');
  if (!btn || !indicator) return;
  const btnRect = btn.getBoundingClientRect();
  const parentRect = btn.closest('.tab-switcher').getBoundingClientRect();
  indicator.style.width = btnRect.width + 'px';
  indicator.style.left = (btnRect.left - parentRect.left) + 'px';
}

function switchTab(tab) {
  currentTab = tab;
  const tabs = { image: 'tab-image', video: 'tab-video', audio: 'tab-audio' };
  Object.keys(tabs).forEach(t => {
    const btn = document.getElementById(tabs[t]);
    btn.classList.toggle('active', t === tab);
    btn.setAttribute('aria-selected', t === tab);
  });
  positionIndicator(tabs[tab]);

  // Update drop zone text
  const dz = {
    image: { title: 'Drop your image here', sub: 'or click to browse files', types: 'Supports: JPG, PNG, WEBP', accept: 'image/*' },
    video: { title: 'Drop your video here', sub: 'or click to browse files', types: 'Supports: MP4, AVI, MOV', accept: 'video/*' },
    audio: { title: 'Drop your audio here', sub: 'or click to browse files', types: 'Supports: WAV, MP3, FLAC', accept: 'audio/*' },
  };
  const cfg = dz[tab];
  document.getElementById('dz-title').textContent = cfg.title;
  document.getElementById('dz-sub').textContent = cfg.sub;
  document.getElementById('dz-types').textContent = cfg.types;
  document.getElementById('file-input').setAttribute('accept', cfg.accept);

  // Toggle icons
  ['image', 'video', 'audio'].forEach(t => {
    const svg = document.getElementById('dz-svg-' + t);
    if (svg) svg.classList.toggle('hidden', t !== tab);
  });

  // Reset detector on tab switch
  resetDetector();
}

/* ==========================================================
   COUNTER ANIMATION
   ========================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.hstat-num');
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = String(target).includes('.');
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

/* ==========================================================
   SCROLL ANIMATIONS (IntersectionObserver)
   ========================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.feat-card, .step-card, .stat-card, .hero-badge, .hero-title, .hero-desc'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.dataset.delay = i * 80;
    observer.observe(el);
  });
}

/* ==========================================================
   FILE HANDLING
   ========================================================== */
function initFileInput() {
  const input = document.getElementById('file-input');
  input.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });
}

function onDragOver(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.add('drag-over');
}
function onDragLeave(e) {
  document.getElementById('drop-zone').classList.remove('drag-over');
}
function onDrop(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
}

function handleFile(file) {
  const dropZone = document.getElementById('drop-zone');
  const previewZone = document.getElementById('preview-zone');
  const filename = document.getElementById('preview-filename');
  const content = document.getElementById('preview-content');

  dropZone.classList.add('hidden');
  previewZone.classList.remove('hidden');
  filename.textContent = file.name;
  content.innerHTML = '';

  const url = URL.createObjectURL(file);

  if (file.type.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = file.name;
    content.appendChild(img);
  } else if (file.type.startsWith('video/')) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '220px';
    content.appendChild(video);
  } else if (file.type.startsWith('audio/')) {
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    audio.style.width = '100%';
    content.appendChild(audio);
  } else {
    content.innerHTML = `<div style="color:var(--gray);font-size:0.85rem;padding:24px;">📁 ${file.name}</div>`;
  }

  window._currentFile = file;
}

function removeFile() {
  document.getElementById('drop-zone').classList.remove('hidden');
  document.getElementById('preview-zone').classList.add('hidden');
  document.getElementById('preview-content').innerHTML = '';
  document.getElementById('file-input').value = '';
  window._currentFile = null;
}

/* ==========================================================
   ANALYZE (Connected to Gradio API)
   ========================================================== */
const GRADIO_URL = '/gradio';

async function analyzeFile() {
  if (!window._currentFile) return;

  // Show scanning state
  document.getElementById('result-idle').classList.add('hidden');
  document.getElementById('result-output').classList.add('hidden');
  document.getElementById('result-scanning').classList.remove('hidden');

  const steps = ['ss1', 'ss2', 'ss3', 'ss4'];
  let stepIdx = 0;
  steps.forEach(id => document.getElementById(id).className = 'scan-step');
  document.getElementById(steps[0]).classList.add('active');

  const stepTimer = setInterval(() => {
    if (stepIdx < steps.length - 1) {
      document.getElementById(steps[stepIdx]).classList.remove('active');
      document.getElementById(steps[stepIdx]).classList.add('done');
      stepIdx++;
      document.getElementById(steps[stepIdx]).classList.add('active');
    }
  }, 1000);

  try {
    const file = window._currentFile;
    const reader = new FileReader();
    
    // Read file as base64 to send to Gradio
    const base64Promise = new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    
    const base64Data = await base64Promise;

    // Call Gradio API 
    // Index 0: Image, 1: Video, 2: Audio
    let endpointIdx = 0;
    if (currentTab === 'video') endpointIdx = 1;
    if (currentTab === 'audio') endpointIdx = 2;

    const payload = JSON.stringify({ data: [base64Data], fn_index: endpointIdx });
    const headers = { "Content-Type": "application/json" };

    // Use our ultra-stable custom API route in FastAPI
    let response = await fetch(`/custom_api/predict`, { method: "POST", headers, body: payload });

    if (!response.ok) throw new Error(`Backend failed with status ${response.status}. Is app.py running?`);
    
    const json = await response.json();
    const resultText = json.data[0];

    clearInterval(stepTimer);
    steps.forEach(id => document.getElementById(id).classList.add('done'));
    
    // Process results
    processBackendResult(resultText);
    
  } catch (error) {
    clearInterval(stepTimer);
    console.error("API Error:", error);
    alert("Connection Error: " + error.message);
    resetDetector();
  }
}

function processBackendResult(text) {
  document.getElementById('result-scanning').classList.add('hidden');
  document.getElementById('result-output').classList.remove('hidden');

  // Parse result from pipeline.py (e.g., "The image is REAL. \n Deepfakes Confidence: 2.5%")
  const isReal = text.toUpperCase().includes('REAL');
  const confidenceMatch = text.match(/(\d+\.?\d*)%/);
  const confidenceStr = confidenceMatch ? confidenceMatch[1] : '0';
  const confidence = parseFloat(confidenceStr);
  const fakeConf = (100 - confidence).toFixed(1);

  const verdictLabel = document.getElementById('verdict-label');
  const verdictIcon = document.getElementById('verdict-icon');
  const verdictConf = document.getElementById('verdict-conf');
  const realFill = document.getElementById('real-fill');
  const fakeFill = document.getElementById('fake-fill');
  const realPct = document.getElementById('real-pct');
  const fakePct = document.getElementById('fake-pct');
  const raw = document.getElementById('result-raw');

  if (isReal) {
    verdictLabel.textContent = 'REAL';
    verdictLabel.className = 'verdict-label real-verdict';
    verdictIcon.textContent = '✅';
    verdictConf.textContent = `${(100-confidence).toFixed(1)}% Deepfake Confidence – Likely Authentic`;
    document.getElementById('result-verdict').style.borderColor = 'rgba(255,100,0,0.3)';
  } else {
    verdictLabel.textContent = 'FAKE';
    verdictLabel.className = 'verdict-label fake-verdict';
    verdictIcon.textContent = '🚫';
    verdictConf.textContent = `${confidence}% Deepfake Confidence – Manipulation Detected`;
    document.getElementById('result-verdict').style.borderColor = 'rgba(255,50,50,0.35)';
  }

  // Animate bars
  setTimeout(() => {
    if (isReal) {
      realFill.style.width = (100 - confidence) + '%';
      fakeFill.style.width = confidence + '%';
      realPct.textContent = (100-confidence).toFixed(1) + '%';
      fakePct.textContent = confidence + '%';
    } else {
      realFill.style.width = (100 - confidence) + '%';
      fakeFill.style.width = confidence + '%';
      realPct.textContent = (100-confidence).toFixed(1) + '%';
      fakePct.textContent = confidence + '%';
    }
  }, 100);

  const file = window._currentFile;
  raw.textContent =
    `File: ${file.name}\nType: ${file.type}\nStatus: ANALYSIS COMPLETE\n` +
    `Backend Response: ${text.replace('\n', ' ')}\n` +
    `Deepfakes Confidence: ${isReal ? confidence + '%' : confidence + '%'}`;
}

function resetDetector() {
  document.getElementById('result-idle').classList.remove('hidden');
  document.getElementById('result-output').classList.add('hidden');
  document.getElementById('result-scanning').classList.add('hidden');
  document.getElementById('result-verdict').style.borderColor = '';
  document.getElementById('real-fill').style.width = '0%';
  document.getElementById('fake-fill').style.width = '0%';
  removeFile();
}

/* ==========================================================
   MOBILE MENU
   ========================================================== */
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  if (links) {
    const visible = links.style.display === 'flex';
    links.style.display = visible ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '68px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = '#000';
    links.style.padding = '16px 24px';
    links.style.borderBottom = '1px solid rgba(255,100,0,0.15)';
    if (cta) cta.style.display = visible ? 'none' : 'block';
  }
});

/* ==========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================== */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  e.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});
