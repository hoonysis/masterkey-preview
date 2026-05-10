    const sticky = document.querySelector(".sticky");
    const productIntro = document.querySelector("#product-intro");
    const earlybird = document.querySelector("#earlybird");

    const toggleSticky = () => {
      if (!sticky || !productIntro || !earlybird) return;
      const y = window.scrollY;
      const showAfter = productIntro.offsetTop + productIntro.offsetHeight * 0.45;
      const hideAfter = earlybird.offsetTop - 160;
      sticky.classList.toggle("visible", y > showAfter && y < hideAfter);
    };

    toggleSticky();
    window.addEventListener("scroll", toggleSticky, { passive: true });

    document.querySelectorAll(".js-speed-video").forEach((video) => {
      video.playbackRate = 1.5;
      video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 1.5;
      });
    });

    document.querySelectorAll(".js-workbook-video").forEach((video) => {
      video.playbackRate = 1.5;
      video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 1.5;
      });
    });

    const productVideos = document.querySelectorAll(".product-video");
    if ("IntersectionObserver" in window && productVideos.length > 0) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const v = entry.target;
            if (entry.isIntersecting) {
              try { v.currentTime = 0; } catch (_) {}
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      productVideos.forEach((v) => videoObserver.observe(v));
    }

    const motionSections = document.querySelectorAll(".js-motion-section");
    if ("IntersectionObserver" in window && motionSections.length > 0) {
      const motionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("motion-in");
              void entry.target.offsetWidth;
              entry.target.classList.add("motion-in");
            } else {
              entry.target.classList.remove("motion-in");
            }
          });
        },
        { threshold: 0.42 }
      );
      motionSections.forEach((section) => motionObserver.observe(section));
    } else {
      motionSections.forEach((section) => section.classList.add("motion-in"));
    }
