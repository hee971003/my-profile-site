(function () {
  "use strict";

  // 연도 표시
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 상단 바 스크롤 효과
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴 토글
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIconPath = "M6 18L18 6M6 6l12 12";
  const openIconPath = "M4 7h16M4 12h16M4 17h16";

  const setMenu = (open) => {
    mobileMenu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuIcon.querySelector("path").setAttribute("d", open ? closeIconPath : openIconPath);
  };

  menuBtn.addEventListener("click", () => {
    setMenu(mobileMenu.classList.contains("hidden"));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );

  // 스크롤 등장 애니메이션
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // 타이핑 효과
  const typedEl = document.getElementById("typed");
  const phrases = ["Java / Spring Boot 백엔드 개발자", "React · Next.js 프론트엔드", "Flutter · React Native 모바일", "Docker · Linux 인프라 운영"];
  if (typedEl) {
    let p = 0, c = 0, deleting = false;
    const tick = () => {
      const current = phrases[p];
      typedEl.textContent = current.slice(0, c);
      let delay = deleting ? 40 : 80;
      if (!deleting && c === current.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        delay = 300;
      }
      c += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    tick();
  }

  // 숫자 카운트업
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => countIo.observe(el));
  }

  // 연락처 클립보드 복사
  const toast = document.getElementById("copyToast");
  let toastTimer = null;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.remove("opacity-0");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add("opacity-0"), 1800);
  };

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast(`복사되었습니다: ${text}`);
      } catch (err) {
        showToast("복사에 실패했습니다. 직접 선택해 주세요.");
      }
    });
  });
})();
