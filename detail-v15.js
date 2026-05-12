    const sticky = document.querySelector(".sticky");
    const productIntro = document.querySelector("#product-intro");
    const finalSection = document.querySelector("#final");

    const toggleSticky = () => {
      if (!sticky || !productIntro) return;
      const y = window.scrollY;
      const showAfter = productIntro.offsetTop - 80;
      const finalTop = finalSection ? finalSection.offsetTop - window.innerHeight * 0.8 : Infinity;
      sticky.classList.toggle("visible", y > showAfter && y < finalTop);
    };

    toggleSticky();
    window.addEventListener("scroll", toggleSticky, { passive: true });

    document.querySelectorAll(".js-speed-video").forEach((video) => {
      video.playbackRate = 1.5;
      video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 1.5;
      });
    });

    document.querySelectorAll(".js-double-speed-video").forEach((video) => {
      video.playbackRate = 2;
      video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 2;
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
            const startsAtOneSecond = !!v.closest(".sentence-select");
            if (entry.isIntersecting) {
              try { v.currentTime = startsAtOneSecond ? 1 : 0; } catch (_) {}
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
            const once = entry.target.classList.contains("motion-once");
            if (entry.isIntersecting) {
              entry.target.classList.remove("motion-in");
              void entry.target.offsetWidth;
              entry.target.classList.add("motion-in");
              if (once) {
                motionObserver.unobserve(entry.target);
              }
            } else if (!once) {
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
