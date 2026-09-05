/* ============================================================
   CRUMB — Full Landing Page 300-Frame Butter-Smooth Background Scroll Engine
   Continuous LERP Interpolation Loop & Off-Thread Decoding
   ============================================================ */

(function () {
  "use strict";

  const TOTAL_FRAMES = 300;
  const FRAME_PATH_PREFIX = "assets/ezgif-frame-";
  const FRAME_PATH_SUFFIX = ".jpg";
  const LERP_FACTOR = 0.14; // Silky-smooth interpolation weight

  function padNumber(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  function initLandingFrameScroll() {
    const canvas = document.getElementById("heroFrameCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const frames = new Array(TOTAL_FRAMES);

    let targetFrameFloat = 0;
    let currentFrameFloat = 0;
    let lastRenderedIndex = -1;
    let isLoopRunning = false;

    // Resize canvas to match display size & device pixel ratio
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(Math.round(currentFrameFloat));
    }

    // Find nearest available loaded image to avoid black flashes
    function getBestLoadedImage(index) {
      if (frames[index] && frames[index].complete && frames[index].naturalWidth > 0) {
        return frames[index];
      }
      // Search backwards first
      for (let i = index - 1; i >= 0; i--) {
        if (frames[i] && frames[i].complete && frames[i].naturalWidth > 0) return frames[i];
      }
      // Search forwards
      for (let i = index + 1; i < TOTAL_FRAMES; i++) {
        if (frames[i] && frames[i].complete && frames[i].naturalWidth > 0) return frames[i];
      }
      return null;
    }

    // Draw frame onto canvas with aspect ratio cover scaling
    function renderFrame(index) {
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      const img = getBestLoadedImage(clampedIndex);
      if (!img) return;

      const rect = canvas.getBoundingClientRect();
      const cW = rect.width;
      const cH = rect.height;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      // Cover scale calculation
      const scale = Math.max(cW / iW, cH / iH);
      const x = (cW - iW * scale) / 2;
      const y = (cH - iH * scale) / 2;

      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, x, y, iW * scale, iH * scale);
    }

    // Preload all 300 frames asynchronously with decoding support
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumStr = padNumber(i, 3);
      img.src = `${FRAME_PATH_PREFIX}${frameNumStr}${FRAME_PATH_SUFFIX}`;

      img.onload = () => {
        if (img.decode) {
          img.decode().catch(() => {});
        }
        if (i === 1) renderFrame(0);
      };
      frames[i - 1] = img;
    }

    // Continuous LERP Loop for butter-smooth momentum interpolation
    function renderLoop() {
      const diff = targetFrameFloat - currentFrameFloat;

      if (Math.abs(diff) > 0.005) {
        currentFrameFloat += diff * LERP_FACTOR;
        const targetIndex = Math.round(currentFrameFloat);

        if (targetIndex !== lastRenderedIndex) {
          lastRenderedIndex = targetIndex;
          renderFrame(targetIndex);
        }
        requestAnimationFrame(renderLoop);
      } else {
        currentFrameFloat = targetFrameFloat;
        const finalIndex = Math.round(currentFrameFloat);
        if (finalIndex !== lastRenderedIndex) {
          lastRenderedIndex = finalIndex;
          renderFrame(finalIndex);
        }
        isLoopRunning = false;
      }
    }

    function startLoop() {
      if (!isLoopRunning) {
        isLoopRunning = true;
        requestAnimationFrame(renderLoop);
      }
    }

    // Scroll Handler mapping scroll position to target frame
    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      let progress = scrollTop / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      targetFrameFloat = progress * (TOTAL_FRAMES - 1);
      startLoop();
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    updateScrollProgress();
  }

  document.addEventListener("DOMContentLoaded", initLandingFrameScroll);
})();


