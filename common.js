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

    // ==============================
    // Scroll Animation
    // ==============================

    $(".section").each(function () {
      const section = $(this);

      // 애니메이션 클래스 선택
      const selector = Object.keys(animations)
        .map((name) => "." + name)
        .join(",");

      const items = section.find(selector);

      // fill-text
      const fillTexts = section.find(".fill-text");

      // ==============================
      // 초기 상태 설정
      // ==============================

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
          backgroundPosition: "100% 0%",
        });
      }

      // ==============================
      // 애니메이션 초기화
      // ==============================

      function resetAnimation() {
        // 일반 애니메이션 요소 초기화
        items.each(function () {
          const el = $(this);

          $.each(animations, function (className, animation) {
            if (el.hasClass(className)) {
              // 진행 중인 애니메이션 제거
              gsap.killTweensOf(el);

              // 초기 상태로 복귀
              gsap.set(el, animation.from);
            }
          });
        });

        // fill-text 초기화
        if (fillTexts.length) {
          gsap.killTweensOf(fillTexts);

          gsap.set(fillTexts, {
            backgroundPosition: "100% 0%",
          });
        }
      }

      // ==============================
      // 애니메이션 실행
      // ==============================

      function playAnimation() {
        // 일반 요소 애니메이션
        items.each(function (index) {
          const el = $(this);

          $.each(animations, function (className, animation) {
            if (el.hasClass(className)) {
              // 기존 Tween 제거
              gsap.killTweensOf(el);

              gsap.to(el, {
                ...animation.to,

                // 너무 빠르지 않게
                duration: 2,

                // 부드럽고 자연스러운 등장
                ease: "power3.out",

                // 요소별 순차 등장
                delay: index * 0.15,

                overwrite: "auto",
              });
            }
          });
        });

        // ==============================
        // fill-text 애니메이션
        // ==============================

        if (fillTexts.length) {
          gsap.killTweensOf(fillTexts);

          gsap.to(fillTexts, {
            backgroundPosition: "0% 0%",

            duration: 1.2,

            ease: "power3.out",

            // 순차적으로 텍스트 채우기
            stagger: 0.18,

            delay: 0.1,

            overwrite: "auto",
          });
        }
      }

      // ==============================
      // ScrollTrigger
      // ==============================

      ScrollTrigger.create({
        trigger: section,

        // 화면에 어느 정도 들어왔을 때 실행
        start: "top 70%",

        // 거의 화면을 벗어났을 때 초기화
        end: "bottom 30%",

        // markers: true,

        // 아래 방향으로 진입
        onEnter: playAnimation,

        // 위 방향으로 재진입
        onEnterBack: playAnimation,

        // 아래 방향으로 섹션 이탈
        onLeave: resetAnimation,

        // 위 방향으로 섹션 이탈
        onLeaveBack: resetAnimation,
      });
    });
  }
});
