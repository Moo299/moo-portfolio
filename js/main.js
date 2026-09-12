/**
 * PORTFOLIO JAVASCRIPT LOGIC
 * Digital Business Technology Student Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Typing Animation in Hero Section
  initTypingEffect();

  // 3. Project Filter System
  initProjectFilter();

  // 4. Modal Project Details Handler
  initProjectModal();

  // 5. Contact Form Submission Handling
  initContactForm();

  // 6. Navbar Scroll Effect & Scroll To Top
  initScrollEffects();

  // 7. Skills Animated Progress Bars on Scroll
  initSkillBars();
});

/* ===================================================
   1. THEME SWITCHER (Light / Dark)
   =================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(activeTheme);

  themeToggleBtn.addEventListener('click', () => {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(activeTheme);
    localStorage.setItem('portfolio-theme', activeTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill';
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
    }
  }
}

/* ===================================================
   2. TYPING EFFECT
   =================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const words = [
    'Digital Business Technology',
    'E-Commerce Specialist',
    'Data Analytics Enthusiast',
    'Digital Marketing & SEO',
    'Web & UI/UX Designer'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ===================================================
   3. PROJECT FILTER SYSTEM
   =================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ===================================================
   4. PROJECT MODAL HANDLER
   =================================================== */
const projectData = {
  1: {
    title: 'E-Commerce Platform & Online Shop',
    category: 'E-Commerce / Web',
    date: 'ธันวาคม 2024',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    description: 'โปรเจกต์พัฒนาระบบร้านค้าออนไลน์และจัดการคลังสินค้าสำหรับธุรกิจขนาดกลางและขนาดย่อม (SME) พร้อมระบบชำระเงินออนไลน์ (Payment Gateway) และระบบแดชบอร์ดสรุปยอดขายสำหรับผู้ดูแลร้าน',
    tools: ['HTML5/Bootstrap', 'JavaScript', 'Firebase', 'Stripe API', 'Figma'],
    highlights: [
      'เชื่อมต่อระบบการชำระเงินผ่าน PromptPay และบัตรเครดิต',
      'ระบบจัดการสต็อกสินค้าแบบ Real-time',
      'ออกแบบ User Experience ให้ซื้อง่ายใน 3 ขั้นตอน (Checkout Flow)'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  2: {
    title: 'Sales & Customer Analytics Dashboard',
    category: 'Data Analytics',
    date: 'ตุลาคม 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    description: 'การวิเคราะห์ข้อมูลพฤติกรรมการซื้อของผู้บริโภคและแนวโน้มยอดขายเพื่อวางกลยุทธ์ทางธุรกิจ โดยใช้ Power BI และ Python ในการคลีนข้อมูล แปลงข้อมูล และสร้างแดชบอร์ดแสดงผลเชิงภาพ (Data Visualization)',
    tools: ['Power BI', 'Microsoft Excel (Advanced)', 'Python (Pandas/Matplotlib)', 'SQL'],
    highlights: [
      'วิเคราะห์กลุ่มลูกค้าด้วย RFM Analysis เพื่อจัดกลุ่มโปรโมชั่น',
      'แดชบอร์ดสรุปยอดขายแยกตามภูมิภาคและประเภทสินค้า',
      'พยากรณ์ยอดขายล่วงหน้าเพื่อเตรียมสต็อกสินค้า'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  3: {
    title: 'Digital Marketing & Content Strategy Campaign',
    category: 'Digital Marketing',
    date: 'สิงหาคม 2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    description: 'แคมเปญการตลาดดิจิทัลแบบครบวงจรสำหรับเปิดตัวแบรนด์สินค้าสุขภาพ สร้างคอนเทนต์บน TikTok, Facebook และ Instagram พร้อมวางแผนการยิงโฆษณา (Meta Ads & TikTok Ads) และทำ SEO On-Page',
    tools: ['Meta Ads Manager', 'Google Analytics 4', 'TikTok for Business', 'Canva Pro', 'SEMrush'],
    highlights: [
      'เพิ่ม Engagement Rate ให้เพจขึ้น 180% ในระยะเวลา 2 เดือน',
      'ผลตอบแทนจากค่าโฆษณา (ROAS) เฉลี่ยอยู่ที่ 4.2x',
      'สร้างคอนเทนต์วิดีโอสั้นไวรัลมียอดเข้าชมรวมกว่า 250,000 ครั้ง'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  4: {
    title: 'FinTech Mobile App UI/UX Design',
    category: 'UI/UX Design',
    date: 'มิถุนายน 2024',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    description: 'การออกแบบประสบการณ์และส่วนติดต่อผู้ใช้ (UI/UX) สำหรับแอปพลิเคชันบริหารจัดการการเงินส่วนบุคคลและการออมเงินสำหรับคนรุ่นใหม่ (Gen Z) เน้นความเรียบง่าย ปลอดภัย และมี Gamification',
    tools: ['Figma', 'FigJam', 'Adobe Illustrator', 'Design Thinking'],
    highlights: [
      'ทำ User Research และ Empathy Mapping จากกลุ่มตัวอย่าง 50 คน',
      'สร้าง Interactive Prototype ที่มีการทดสอบ Usability Test',
      'ออกแบบ Design System & Component Library สำหรับนักพัฒนา'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  5: {
    title: 'Smart Business Inventory Web App',
    category: 'Web Development',
    date: 'เมษายน 2024',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    description: 'เว็บแอปพลิเคชันจัดการสินค้าคงคลัง แจ้งเตือนสินค้าใกล้หมดอายุ และสแกน QR Code / Barcode เพื่อเบิก-จ่ายสินค้า ช่วยลดความผิดพลาดในการนับสต็อกได้ถึง 90%',
    tools: ['HTML5/Bootstrap 5', 'JavaScript', 'PHP/MySQL', 'HTML5-QRCode'],
    highlights: [
      'สแกนบาร์โค้ดผ่านกล้องมือถือได้ทันทีโดยไม่ต้องโหลดแอป',
      'ระบบแจ้งเตือนอัตโนมัติผ่าน LINE Notify เมื่อสินค้าเหลือน้อย',
      'ออกรายงาน PDF และ Excel สรุปรายวัน/รายเดือน'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  6: {
    title: 'SEO & Content Marketing for Tech Blog',
    category: 'Digital Marketing',
    date: 'กุมภาพันธ์ 2024',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1000&q=80',
    description: 'การเพิ่มทราฟฟิกเว็บไซต์ด้วยกลยุทธ์การทำ SEO แบบออร์แกนิก (Organic Search) ค้นคว้าคีย์เวิร์ด (Keyword Research) และเขียนบทความ Technical & Business เพื่อสร้าง Lead เข้าสู่ธุรกิจ',
    tools: ['WordPress', 'Yoast SEO', 'Google Search Console', 'Ahrefs'],
    highlights: [
      'ติดหน้าแรก Google (Top 3 Ranking) สำหรับ 12 คีย์เวิร์ดหลัก',
      'Organic Traffic เพิ่มขึ้น 320% ภายในระยะเวลา 4 เดือน',
      'สร้าง Lead ผู้สนใจบริการผ่านฟอร์มเฉลี่ย 45 รายต่อเดือน'
    ],
    demoUrl: '#',
    codeUrl: '#'
  }
};

function initProjectModal() {
  const modalElement = document.getElementById('projectDetailModal');
  if (!modalElement) return;

  const projectModal = new bootstrap.Modal(modalElement);
  const detailButtons = document.querySelectorAll('.view-project-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-id');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modalProjectImg').src = data.image;
        document.getElementById('modalProjectTitle').textContent = data.title;
        document.getElementById('modalProjectCategory').textContent = data.category;
        document.getElementById('modalProjectDate').textContent = data.date;
        document.getElementById('modalProjectDesc').textContent = data.description;
        
        // Tags
        const tagsContainer = document.getElementById('modalProjectTools');
        tagsContainer.innerHTML = data.tools.map(t => `<span class="project-tag">${t}</span>`).join('');

        // Highlights list
        const highlightsContainer = document.getElementById('modalProjectHighlights');
        highlightsContainer.innerHTML = data.highlights.map(h => `<li><i class="bi bi-check-circle-fill text-primary me-2"></i>${h}</li>`).join('');

        projectModal.show();
      }
    });
  });
}

/* ===================================================
   5. CONTACT FORM
   =================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');
  if (!contactForm || !toast) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      e.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Loading State
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>กำลังส่ง...';
    submitBtn.disabled = true;

    // Simulate sending delay
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      contactForm.reset();
      contactForm.classList.remove('was-validated');

      // Show Toast Notification
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }, 1000);
  });
}

/* ===================================================
   6. NAVBAR & SCROLL EFFECTS
   =================================================== */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar-custom');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar Scrolled style
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ===================================================
   7. SKILL BARS ANIMATION
   =================================================== */
function initSkillBars() {
  const progressBars = document.querySelectorAll('.progress-bar-custom');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}
