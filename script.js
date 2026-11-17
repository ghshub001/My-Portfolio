/**
 * Shubham Kumar — Personal Portfolio JavaScript
 * Clean, lightweight, modular vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initStoryExplorer();
  initAlgorithmInteractions();
  initCopyButtons();
  initActiveNav();
  initBackToTop();
  updateFooterYear();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('shubham_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('shubham_theme', newTheme);
    });
  }

  // Listen for system theme changes if user hasn't overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('shubham_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b0f17' : '#fafafa');
    }
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  function toggleMenu(isOpen) {
    const currentState = menuBtn.getAttribute('aria-expanded') === 'true';
    const nextState = typeof isOpen === 'boolean' ? isOpen : !currentState;

    menuBtn.setAttribute('aria-expanded', String(nextState));
    menuBtn.classList.toggle('open', nextState);
    navMenu.classList.toggle('open', nextState);
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      menuBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Journey & Aims Explorer
   -------------------------------------------------------------------------- */
function initStoryExplorer() {
  const storyData = {
    journey: [
      {
        badge: "Milestone 01",
        timeline: "Origins & Under The Hood",
        title: "The Spark: Fascinated by How Things Work Under the Hood",
        navTitle: "Under The Hood",
        navDesc: "Fascination with software/hardware interactions",
        narrative: `I am an 18-year-old Computer Science student who is deeply passionate about building scalable, efficient, and user-centric games. My journey into technology began with a fascination for how things work under the hood—from understanding how software interacts with hardware to deciphering the mechanics behind complex interactive systems. That curiosity quickly evolved into a genuine love for programming.`,
        takeaway: "Curiosity is the best debugger: understanding how software communicates with hardware turns passive users into active architects.",
        tags: ["Curiosity-Driven", "First-Principles Thinking", "Love for Programming"]
      },
      {
        badge: "Milestone 02",
        timeline: "Core CS & Algorithmic Rigor",
        title: "The Forge: Diving Deep into Algorithms & Data Structures",
        navTitle: "Algorithms & DS",
        navDesc: "Moving from simple concepts to deep problem solving",
        narrative: `Over the years, I have explored various domains within computer science. Starting from foundational concepts, I soon dove deep into algorithms and data structures to hone my problem-solving skills. Competitive programming became my natural proving ground: breaking down convoluted constraints, recognizing patterns under time pressure, and writing clean, cache-friendly code.`,
        takeaway: "An algorithm isn't just theory—it is the difference between a game running at 60 FPS or choking under load.",
        tags: ["Data Structures", "Competitive Programming", "C++ STL", "Pattern Recognition"]
      },
      {
        badge: "Milestone 03",
        timeline: "Present & Continuous Learning",
        title: "The Mindset: Thriving in Complex Challenges & Continuous Learning",
        navTitle: "Continuous Learner",
        navDesc: "Tackling complex challenges and adapting rapidly",
        narrative: `I thrive in environments where I can tackle complex challenges and learn continuously. Whether wrestling with a subtle graph flow problem on Codeforces or understanding how game entities serialize state without frame stutters, the thrill of breaking down hard problems into manageable pieces is what keeps me coding with relentless curiosity.`,
        takeaway: "Never settle for code that merely works; strive for solutions that are elegant, provably correct, and performant.",
        tags: ["Continuous Learner", "Problem Solver", "High Resilience", "First Principles"]
      }
    ],
    aims: [
      {
        badge: "Aspiration 01",
        timeline: "Core Specialization",
        title: "The Target: Becoming a Skilled & Efficient Game Developer",
        navTitle: "Game Development",
        navDesc: "Scalable, efficient, and user-centric game systems",
        narrative: `My primary aim is to become a skilled and efficient game developer, grounded in strong computer science principles and equipped with a proven ability to solve non-trivial problems. Gaming is the ultimate convergence of performance, physics, graphics, and narrative—and I want to contribute to engineering experiences that feel truly fluid and responsive.`,
        takeaway: "Great games are engineered, not just designed. Rock-solid CS fundamentals are the bedrock of great player immersion.",
        tags: ["Game Development", "Engine Architecture", "Real-Time Systems", "Physics"]
      },
      {
        badge: "Aspiration 02",
        timeline: "Technical Mastery",
        title: "The Horizon: Expanding Technical Knowledge & Experience",
        navTitle: "Skill Expansion",
        navDesc: "Mastering advanced DS, systems profiling & ML",
        narrative: `To achieve this, I am eager to continuously expand my technical knowledge and practical experience. Whether it's mastering advanced data structures, profiling execution bottlenecks, or exploring machine learning for intelligent agents and procedural world generation, my goal is to apply these skills to create innovative and engaging gaming solutions that make a meaningful impact.`,
        takeaway: "Theory and practice must feed each other: every theoretical algorithm mastered finds a home in real-world systems.",
        tags: ["Machine Learning", "Memory Profiling", "Advanced Structures", "Game AI"]
      },
      {
        badge: "Aspiration 03",
        timeline: "Human Impact",
        title: "The Purpose: Creating Innovative Solutions with Meaningful Impact",
        navTitle: "Meaningful Impact",
        navDesc: "Building memorable, high-impact gaming experiences",
        narrative: `Ultimately, my goal is to apply my skills to create innovative and engaging gaming solutions that make a meaningful impact. Games have a unique ability to evoke emotion, spark curiosity, and bring communities together. I want to build games and tools that inspire players and developers the same way games once inspired me.`,
        takeaway: "Technology at its best creates memorable human experiences. The ultimate metric of code is the value and joy it delivers.",
        tags: ["Player Experience", "Innovative Solutions", "Community", "Scalability"]
      }
    ]
  };

  let currentMode = 'journey'; // 'journey' | 'aims'
  let currentStep = 0;

  const modeButtons = document.querySelectorAll('.mode-tab-btn');
  const viewButtons = document.querySelectorAll('.view-toggle-btn');
  const topicPills = document.querySelectorAll('.topic-pill-btn');
  const stepNavCol = document.getElementById('stepNavCol');
  const interactiveView = document.getElementById('storyInteractiveView');
  const fullView = document.getElementById('storyFullView');

  // Story Card Elements
  const badgeEl = document.getElementById('storyStepBadge');
  const timelineEl = document.getElementById('storyStepTimeline');
  const titleEl = document.getElementById('storyStepTitle');
  const bodyEl = document.getElementById('storyStepBody');
  const takeawayTextEl = document.getElementById('storyTakeawayText');
  const tagsWrapEl = document.getElementById('storyTagsWrap');
  const nextBtn = document.getElementById('btnNextStep');

  if (!stepNavCol || !bodyEl) return;

  function renderStepNavigation(mode) {
    stepNavCol.innerHTML = '';
    const steps = storyData[mode];

    steps.forEach((step, idx) => {
      const btn = document.createElement('button');
      btn.className = `step-nav-btn ${idx === currentStep ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === currentStep ? 'true' : 'false');
      btn.setAttribute('data-step', String(idx));

      btn.innerHTML = `
        <span class="step-num">0${idx + 1}</span>
        <div class="step-nav-info">
          <h4>${step.navTitle}</h4>
          <p>${step.navDesc}</p>
        </div>
      `;

      btn.addEventListener('click', () => {
        setStep(mode, idx);
      });

      stepNavCol.appendChild(btn);
    });
  }

  function setStep(mode, stepIdx) {
    currentMode = mode;
    currentStep = stepIdx;
    const steps = storyData[mode];
    const data = steps[stepIdx];

    // Update Mode Tabs
    modeButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    // Update Left Nav Buttons
    const navBtns = stepNavCol.querySelectorAll('.step-nav-btn');
    navBtns.forEach((btn, idx) => {
      const isSelected = idx === stepIdx;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
    });

    // Update Content with subtle fade
    const activeCard = document.querySelector('.story-active-card');
    if (activeCard) {
      activeCard.style.opacity = '0.4';
      activeCard.style.transform = 'translateY(4px)';
    }

    setTimeout(() => {
      if (badgeEl) badgeEl.textContent = data.badge;
      if (timelineEl) timelineEl.textContent = data.timeline;
      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) bodyEl.innerHTML = `<p>${data.narrative}</p>`;
      if (takeawayTextEl) takeawayTextEl.textContent = data.takeaway;

      if (tagsWrapEl) {
        tagsWrapEl.innerHTML = '';
        data.tags.forEach(t => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'narrative-tag';
          tagSpan.textContent = t;
          tagsWrapEl.appendChild(tagSpan);
        });
      }

      if (nextBtn) {
        const nextTextSpan = nextBtn.querySelector('span');
        if (stepIdx < steps.length - 1) {
          if (nextTextSpan) nextTextSpan.textContent = 'Next Milestone';
        } else if (mode === 'journey') {
          if (nextTextSpan) nextTextSpan.textContent = 'Explore My Aims →';
        } else {
          if (nextTextSpan) nextTextSpan.textContent = 'Restart Journey ↺';
        }
      }

      // Update Topic Pills
      topicPills.forEach(pill => {
        const pStep = parseInt(pill.getAttribute('data-target-step'), 10);
        const pMode = pill.getAttribute('data-target-mode');
        const isMatch = (pMode === mode && pStep === stepIdx);
        pill.classList.toggle('active', isMatch);
      });

      if (activeCard) {
        activeCard.style.opacity = '1';
        activeCard.style.transform = 'translateY(0)';
      }
    }, 120);
  }

  // Next Step Button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const steps = storyData[currentMode];
      if (currentStep < steps.length - 1) {
        setStep(currentMode, currentStep + 1);
      } else if (currentMode === 'journey') {
        currentMode = 'aims';
        renderStepNavigation('aims');
        setStep('aims', 0);
      } else {
        currentMode = 'journey';
        renderStepNavigation('journey');
        setStep('journey', 0);
      }
    });
  }

  // Mode Buttons Click
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode !== currentMode) {
        currentMode = mode;
        currentStep = 0;
        renderStepNavigation(mode);
        setStep(mode, 0);
      }
    });
  });

  // View Toggle (Interactive vs Full Text)
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const view = btn.getAttribute('data-view');
      if (view === 'interactive') {
        if (interactiveView) interactiveView.hidden = false;
        if (fullView) fullView.hidden = true;
      } else {
        if (interactiveView) interactiveView.hidden = true;
        if (fullView) fullView.hidden = false;
      }
    });
  });

  // Topic Jump Pills
  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetMode = pill.getAttribute('data-target-mode');
      const targetStep = parseInt(pill.getAttribute('data-target-step'), 10);

      // Ensure interactive view is visible
      viewButtons.forEach(b => {
        const isInteractive = b.getAttribute('data-view') === 'interactive';
        b.classList.toggle('active', isInteractive);
        b.setAttribute('aria-pressed', String(isInteractive));
      });
      if (interactiveView) interactiveView.hidden = false;
      if (fullView) fullView.hidden = true;

      if (targetMode !== currentMode) {
        currentMode = targetMode;
        renderStepNavigation(targetMode);
      }
      setStep(targetMode, targetStep);
    });
  });

  // Initialize Default State
  renderStepNavigation('journey');
  setStep('journey', 0);
}

/* --------------------------------------------------------------------------
   3. Algorithm Showcase (Accordion, Tabs & Filtering)
   -------------------------------------------------------------------------- */
function initAlgorithmInteractions() {
  const algoCards = document.querySelectorAll('.algo-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Accordion Expand / Collapse
  algoCards.forEach(card => {
    const summary = card.querySelector('.algo-card-summary');
    const details = card.querySelector('.algo-details');
    const toggleLabel = card.querySelector('.toggle-label');

    if (!summary || !details) return;

    function toggleCard() {
      const isExpanded = card.classList.contains('expanded');
      
      if (isExpanded) {
        card.classList.remove('expanded');
        summary.setAttribute('aria-expanded', 'false');
        details.hidden = true;
        if (toggleLabel) toggleLabel.textContent = 'View details & C++ implementation';
      } else {
        card.classList.add('expanded');
        summary.setAttribute('aria-expanded', 'true');
        details.hidden = false;
        if (toggleLabel) toggleLabel.textContent = 'Hide details';
      }
    }

    summary.addEventListener('click', toggleCard);

    summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });

    // Internal Tabs (Explanation vs Code)
    const tabBtns = card.querySelectorAll('.algo-tab-btn');
    const tabPanes = card.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = card.querySelector(`.tab-pane[data-pane="${targetTab}"]`);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  });

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      algoCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 150);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Copy to Clipboard (Email & Code Snippets)
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Copy Email Buttons
  const emailButtons = document.querySelectorAll('.copy-email-btn');
  emailButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'shubhamk211207@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!');
        
        // Provide subtle button text feedback
        const btnText = btn.querySelector('span') || btn.querySelector('.btn-text');
        if (btnText) {
          const original = btnText.textContent;
          btnText.textContent = 'Copied!';
          setTimeout(() => {
            btnText.textContent = original;
          }, 2000);
        }
      } catch (err) {
        // Fallback for older or restricted environments
        fallbackCopyText(email);
        showToast('Email copied to clipboard!');
      }
    });
  });

  // Copy Code Snippets
  const codeCopyButtons = document.querySelectorAll('.btn-copy-code');
  codeCopyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const wrapper = btn.closest('.code-wrapper');
      if (!wrapper) return;
      const codeBlock = wrapper.querySelector('code');
      if (!codeBlock) return;

      const codeText = codeBlock.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        showToast('Algorithm code snippet copied!');
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (err) {
        fallbackCopyText(codeText);
        btn.textContent = 'Copied!';
        showToast('Code copied to clipboard!');
        setTimeout(() => {
          btn.textContent = 'Copy Code';
        }, 2000);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.error('Fallback copy failed', e);
    }
    document.body.removeChild(textArea);
  }
}

/* --------------------------------------------------------------------------
   5. Active Navigation Highlighting on Scroll
   -------------------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   6. Back To Top
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. Dynamic Footer Year
   -------------------------------------------------------------------------- */
function updateFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
