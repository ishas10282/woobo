document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* =====================================
     ELEMENTS
  ===================================== */

  const section = document.querySelector(".process-section");
  const wrap = document.querySelector(".process-wrap");
  const lineFill = document.querySelector(".process-line-fill");
  const steps = gsap.utils.toArray(".process-step");

  /* 요소 없으면 실행 안 함 */

  if (!section || !wrap || !lineFill || !steps.length) {
    return;
  }

  /* =====================================
     INITIAL STATE
  ===================================== */

  steps.forEach((step, index) => {
    const image = step.querySelector(".step-image");
    const content = step.querySelector(".step-content");
    const number = step.querySelector(".step-number");

    if (!image || !content || !number) return;

    const isRight = step.classList.contains("step-right");

    /* 이미지와 텍스트 등장 방향 */

    const imageX = isRight ? -120 : 120;
    const contentX = isRight ? 120 : -120;

    gsap.set(step, {
      autoAlpha: index === 0 ? 1 : 0,
    });

    gsap.set(image, {
      autoAlpha: index === 0 ? 1 : 0,
      x: index === 0 ? 0 : imageX,
      scale: index === 0 ? 1 : 0.96,
    });

    gsap.set(content, {
      autoAlpha: index === 0 ? 1 : 0,
      x: index === 0 ? 0 : contentX,
      y: index === 0 ? 0 : 20,
    });

    gsap.set(number, {
      scale: 0.8,
    });
  });

  /* =====================================
     MAIN TIMELINE
  ===================================== */

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,

      start: "top top",

      /* Step당 약 100vh 스크롤 */

      end: () => `+=${steps.length * window.innerHeight}`,

      pin: wrap,

      scrub: 1,

      anticipatePin: 1,

      invalidateOnRefresh: true,
    },
  });

  /* =====================================
     STEP ANIMATION
  ===================================== */

  steps.forEach((step, index) => {
    const image = step.querySelector(".step-image");
    const content = step.querySelector(".step-content");
    const number = step.querySelector(".step-number");

    if (!image || !content || !number) return;

    const isRight = step.classList.contains("step-right");

    const imageX = isRight ? -120 : 120;
    const contentX = isRight ? 120 : -120;

    const position = index * 3;

    /* ---------------------------------
       STEP 활성화
    --------------------------------- */

    tl.call(
      () => {
        steps.forEach((item) => {
          item.classList.remove("active");
        });

        step.classList.add("active");
      },
      null,
      position,
    );

    /* ---------------------------------
       현재 STEP 표시
    --------------------------------- */

    tl.set(
      step,
      {
        autoAlpha: 1,
      },
      position,
    );

    /* ---------------------------------
       번호 활성화
    --------------------------------- */

    tl.to(
      number,
      {
        scale: 1,

        duration: 0.3,

        ease: "back.out(1.8)",
      },
      position,
    );

    /* ---------------------------------
       이미지 등장
    --------------------------------- */

    tl.to(
      image,
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,

        duration: 0.7,

        ease: "power3.out",
      },
      position + 0.15,
    );

    /* ---------------------------------
       텍스트 등장
    --------------------------------- */

    tl.to(
      content,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,

        duration: 0.7,

        ease: "power3.out",
      },
      position + 0.35,
    );

    /* =================================
       LINE PROGRESS
    ================================= */

    const lineProgress = (index + 1) / steps.length;

    tl.to(
      lineFill,
      {
        scaleY: lineProgress,

        duration: 1,

        ease: "none",
      },
      position,
    );

    /* =================================
       이전 STEP OUT
    ================================= */

    if (index > 0) {
      const prevStep = steps[index - 1];

      tl.to(
        prevStep,
        {
          autoAlpha: 0,

          duration: 0.35,

          ease: "power2.out",
        },
        position - 0.3,
      );
    }
  });

  /* =====================================
     REFRESH
  ===================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
