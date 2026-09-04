$(document).ready(function () {
  scrollTrigger();
  customDropdown();

  function customDropdown() {
    const $customMenu = $(".custom-menu-all");
    const $customDrop = $(".custom-dropdown");

    $customMenu.click(function (e) {
      e.preventDefault();

      $customDrop.stop().slideToggle();
    });
    $(".top_banner_close").appendTo(".custom-top-banner");

    $(".top_banner_close").click(function () {
      $(".custom-top-banner").slideUp();
    });
  }

  // --------- 스크롤트리거
  function scrollTrigger() {
    // Fade, Scale 통합 애니메이션 설정
    const animations = {
      "slide-in": {
        from: { x: "100%", opacity: 0 },
        to: { x: 0, opacity: 1 },
      },

      "focus-in": {
        from: { filter: "blur(30px)", opacity: 0 },
        to: { filter: "blur(0px)", opacity: 1 },
      },

      "fade-up": {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },

      "fade-left": {
        from: { x: -50, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },

      "fade-right": {
        from: { x: 50, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },

      "scale-up": {
        from: {
          scaleY: 0,
          transformOrigin: "center bottom",
        },
        to: {
          scaleY: 1,
        },
      },

      "scale-down": {
        from: {
          scaleY: 0,
          transformOrigin: "center top",
        },
        to: {
          scaleY: 1,
        },
      },

      "scale-left": {
        from: {
          scaleX: 0,
          transformOrigin: "right center",
        },
        to: {
          scaleX: 1,
        },
      },

      "scale-right": {
        from: {
          scaleX: 0,
          transformOrigin: "left center",
        },
        to: {
          scaleX: 1,
        },
      },
    };

    // Fade, Scale 애니메이션 실행
    $(".section").each(function () {
      const section = $(this);

      // 일반 애니메이션 요소
      const selector = Object.keys(animations)
        .map((name) => "." + name)
        .join(",");

      const items = section.find(selector);

      // fill-text
      const fillTexts = section.find(".fill-text");

      // 초기 상태
      items.each(function () {
        const el = $(this);

        $.each(animations, function (className, animation) {
          if (el.hasClass(className)) {
            gsap.set(el, animation.from);
          }
        });
      });

      // fill-text 초기 상태
      if (fillTexts.length) {
        gsap.set(fillTexts, {
          backgroundPosition: "100% 0",
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        // markers: true,

        onEnter: () => {
          // 기존 애니메이션
          items.each(function (index) {
            const el = $(this);

            $.each(animations, function (className, animation) {
              if (el.hasClass(className)) {
                gsap.killTweensOf(el);

                gsap.to(el, {
                  ...animation.to,
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * 0.15,
                  overwrite: "auto",
                });
              }
            });
          });

          // fill-text 순차 애니메이션
          if (fillTexts.length) {
            gsap.killTweensOf(fillTexts);

            gsap.to(fillTexts, {
              backgroundPosition: "0% 0",
              duration: 1,
              ease: "power2.out",
              stagger: 0.3,
              overwrite: "auto",
            });
          }
        },

        onLeaveBack: () => {
          // 기존 요소 초기화
          items.each(function () {
            const el = $(this);

            $.each(animations, function (className, animation) {
              if (el.hasClass(className)) {
                gsap.killTweensOf(el);
                gsap.set(el, animation.from);
              }
            });
          });

          // fill-text 초기화
          if (fillTexts.length) {
            gsap.killTweensOf(fillTexts);

            gsap.set(fillTexts, {
              backgroundPosition: "100% 0",
            });
          }
        },
      });
    });
  }
});
