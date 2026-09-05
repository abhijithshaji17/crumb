/* ============================================================
   CRUMB — landing page behavior
   ============================================================ */
(function () {
  "use strict";

  /* ---------- hero canvas ---------- */
  const heroCanvas = document.getElementById("heroCanvas");
  if (heroCanvas) {
    CrumbHero.init(heroCanvas, {
      particleCount: 60,
      pageCount: 7,
      linkDistance: 140
    });
  }

  /* ---------- sticky nav ---------- */
  const nav = document.getElementById("nav");
  const onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- page transition veil ---------- */
  const veil = document.getElementById("pageVeil");
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      e.preventDefault();
      if (veil) veil.classList.add("show");
      setTimeout(function () { window.location.href = href; }, 420);
    });
  });

  /* ---------- knowledge slices drag demo ---------- */
  const rack = document.getElementById("sliceRack");
  const tray = document.getElementById("sliceTray");
  const trayText = document.getElementById("trayText");
  if (rack && tray) {
    const active = new Set();
    const updateTray = function () {
      if (active.size === 0) {
        tray.classList.remove("lit");
        trayText.textContent = "Drop a knowledge slice here";
      } else {
        tray.classList.add("lit");
        trayText.textContent =
          active.size + " source" + (active.size > 1 ? "s" : "") + " active · " +
          Array.from(active).join(" · ");
      }
    };

    const toggleSlice = function (el) {
      const id = el.getAttribute("data-slice");
      if (active.has(id)) { active.delete(id); el.classList.remove("active"); }
      else { active.add(id); el.classList.add("active"); }
      updateTray();
    };

    // drag & drop
    rack.querySelectorAll(".demo-slice").forEach(function (el) {
      el.addEventListener("dragstart", function (e) {
        el.classList.add("dragging");
        e.dataTransfer.setData("text/plain", el.getAttribute("data-slice"));
        e.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragend", function () {
        el.classList.remove("dragging");
      });
      // click toggles too
      el.addEventListener("click", function () { toggleSlice(el); });
    });

    tray.addEventListener("dragover", function (e) {
      e.preventDefault();
      tray.classList.add("dragover");
    });
    tray.addEventListener("dragleave", function () {
      tray.classList.remove("dragover");
    });
    tray.addEventListener("drop", function (e) {
      e.preventDefault();
      tray.classList.remove("dragover");
      const id = e.dataTransfer.getData("text/plain");
      const el = rack.querySelector('[data-slice="' + id + '"]');
      if (el && !active.has(id)) {
        active.add(id);
        el.classList.add("active");
        updateTray();
        // little entrance wiggle
        el.animate(
          [{ transform: "scale(1.04)" }, { transform: "scale(1)" }],
          { duration: 350, easing: "cubic-bezier(.34,1.56,.64,1)" }
        );
      }
    });
  }
})();