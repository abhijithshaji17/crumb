/* ============================================================
   CRUMB — hero canvas: floating pages, knowledge particles,
   neural connections. Documents occasionally "bake" into
   glowing memory cards.
   Usage: CrumbHero.init(canvasEl, { palette, density })
   ============================================================ */
(function () {
  "use strict";

  const DEFAULTS = {
    particleCount: 64,
    pageCount: 7,
    linkDistance: 130,
    palette: {
      particle: "rgba(201,138,46,ALPHA)",
      particleAlt: "rgba(61,126,201,ALPHA)",
      link: "rgba(201,138,46,ALPHA)",
      page: "#fdf6e4",
      pageLine: "rgba(43,54,68,0.22)",
      glow: "#eda63e"
    }
  };

  function init(canvas, userOpts) {
    if (!canvas) return;
    const opts = Object.assign({}, DEFAULTS, userOpts || {});
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = 1, raf = 0, running = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- particles ----------
    const particles = [];
    function spawnParticle(initial) {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        alt: Math.random() < 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.02
      };
    }

    // ---------- floating pages ----------
    const pages = [];
    function spawnPage(initial) {
      const w = 54 + Math.random() * 40;
      const h = w * 1.34;
      const fromLeft = Math.random() < 0.5;
      return {
        w, h,
        x: initial ? Math.random() * W : (fromLeft ? -w - 20 : W + 20),
        y: Math.random() * H,
        vx: (Math.random() * 0.35 + 0.15) * (fromLeft ? 1 : -1),
        rot: (Math.random() - 0.5) * 0.7,
        vr: (Math.random() - 0.5) * 0.002,
        bob: Math.random() * Math.PI * 2,
        bobSpeed: 0.004 + Math.random() * 0.01,
        opacity: initial ? 0.25 + Math.random() * 0.3 : 0,
        baking: false,
        bakeTimer: Math.random() * 420 + 320,
        bakeDuration: 150
      };
    }

    // ---------- layout ----------
    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        for (let i = 0; i < opts.particleCount; i++) particles.push(spawnParticle(true));
        for (let i = 0; i < opts.pageCount; i++) pages.push(spawnPage(true));
      }
    }

    // ---------- draw ----------
    function a(color, alpha) {
      return color.replace("ALPHA", alpha.toFixed(3));
    }

    function drawLinks() {
      const dist = opts.linkDistance;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i], q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < dist * dist) {
            const t = 1 - Math.sqrt(d2) / dist;
            ctx.strokeStyle = a(opts.palette.link, t * 0.14);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    }

    function drawParticles(t) {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
        p.pulse += p.pulseSpeed;
        const glow = 0.5 + 0.5 * Math.sin(p.pulse);
        const color = p.alt ? opts.palette.particleAlt : opts.palette.particle;
        ctx.fillStyle = a(color, 0.35 + glow * 0.4);
        ctx.shadowColor = a(color, 0.9);
        ctx.shadowBlur = 8 + glow * 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawPage(p, t) {
      // movement
      p.x += p.vx;
      p.y += Math.sin(t * 0.0006 + p.bob) * 0.3;
      p.rot += p.vr;
      if (p.opacity < 1) p.opacity = Math.min(1, p.opacity + 0.008);
      if (p.x > W + p.w + 60) { Object.assign(p, spawnPage(false)); p.opacity = 0; }
      if (p.x < -p.w - 60) { Object.assign(p, spawnPage(false)); p.opacity = 0; }

      // bake cycle: page -> glowing memory card -> page
      p.bakeTimer--;
      if (p.bakeTimer <= 0) {
        p.baking = true;
        p.bakeTimer = Infinity;
        p.bakeLeft = p.bakeDuration;
      }
      if (p.baking) {
        p.bakeLeft--;
        if (p.bakeLeft <= 0) {
          p.baking = false;
          p.bakeTimer = 420 + Math.random() * 460;
        }
      }

      const cx = p.x, cy = p.y;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;

      if (p.baking) {
        const k = 1 - p.bakeLeft / p.bakeDuration;
        const glowA = 0.35 + 0.65 * Math.sin(k * Math.PI);
        ctx.shadowColor = opts.palette.glow;
        ctx.shadowBlur = 26 * glowA;
        ctx.fillStyle = "#fff4d8";
        roundRect(-p.w / 2 - 6, -p.h / 2 - 6, p.w + 12, p.h + 12, 14);
        ctx.fill();
        ctx.shadowBlur = 0;
        // card border
        ctx.strokeStyle = "rgba(237,166,62," + (0.85 * glowA).toFixed(3) + ")";
        ctx.lineWidth = 1.6;
        roundRect(-p.w / 2 - 6, -p.h / 2 - 6, p.w + 12, p.h + 12, 14);
        ctx.stroke();
        // crumb chip
        ctx.fillStyle = "rgba(237,166,62," + (0.9 * glowA).toFixed(3) + ")";
        roundRect(-16, -p.h / 2 + 6, 32, 12, 6);
        ctx.fill();
        ctx.fillStyle = "#1c1205";
        ctx.font = "600 8px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("CRUMB", 0, -p.h / 2 + 15);
      } else {
        ctx.fillStyle = opts.palette.page;
        roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 10);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1;
        roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 10);
        ctx.stroke();
        ctx.fillStyle = opts.palette.pageLine;
        const lines = 4;
        for (let i = 0; i < lines; i++) {
          const lw = p.w * (0.82 - i * 0.1);
          roundRect(-p.w / 2 + 10, -p.h / 2 + 12 + i * 12, lw, 4, 2);
          ctx.fill();
        }
        // amber corner tab
        ctx.fillStyle = "rgba(237,166,62,0.7)";
        roundRect(p.w / 2 - 14, -p.h / 2 - 1, 14, 5, 3);
        ctx.fill();
      }
      ctx.restore();
    }

    function roundRect(x, y, w, h, r) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    }

    // ---------- loop ----------
    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      drawLinks();
      drawParticles(t);
      for (const p of pages) drawPage(p, t);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduced) {
        // single static render
        drawLinks();
        for (const p of particles) {
          ctx.fillStyle = a(opts.palette.particle, 0.5);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
        for (const p of pages) { p.opacity = 0.6; drawPage(p, 0); }
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function stop() { running = false; cancelAnimationFrame(raf); }
    function wake() { running = true; raf = requestAnimationFrame(frame); }

    // visibility pause
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else wake();
    });

    resize();
    start();
    window.addEventListener("resize", resize);
  }

  window.CrumbHero = { init: init };
})();