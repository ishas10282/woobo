$(document).ready(function () {
  scrollTrigger();
  // sectionScroll();
  cafe24custom();
  customDropdown();

  function cafe24custom() {
    const $nav = $("#header .inner .top_nav_box .top_mypage");
    const $header = $("#header");
    const $topCategory = $(".top_category > ul");
    if (!$header.find(".custom-dropdown").length) {
      $header.prepend(`
		   <div class="custom-dropdown">
          <div class="custom-drop-wrap">
            <div class="custom-drop-grid">
              <div class="custom-drop-item">
                <div class="custom-drop-title">
                  <span class="custom-drop-txt">ABOUT</span>
                  <span class="custom-drop-line"></span>
                </div>
                <div class="custom-drop-link">
                  <ul class="custom-drop-list">
                    <li>
                      <a class="custom-drop-menu" href="">ABOUT US</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="">연혁</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="">조직도</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="">찾아오시는 길</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="custom-drop-item">
                <div class="custom-drop-title">
                  <span class="custom-drop-txt">BUSINESS</span>
                  <span class="custom-drop-line"></span>
                </div>
                <div class="custom-drop-link">
                  <ul class="custom-drop-list">
                    <li>
                      <a class="custom-drop-menu" href=""
                        >스마트 물놀이 수질 전광판</a
                      >
                    </li>
                    <li>
                      <a class="custom-drop-menu" href=""
                        >그린 모니터링 시스템</a
                      >
                    </li>
                    <li>
                      <a class="custom-drop-menu" href=""
                        >환경 측정기기 컨설팅</a
                      >
                    </li>
                    <li>
                      <a class="custom-drop-menu" href=""
                        >수질 측정기기 유지관리</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="custom-drop-item">
                <div class="custom-drop-title">
                  <span class="custom-drop-txt">R&D</span>
                  <span class="custom-drop-line"></span>
                </div>
                <div class="custom-drop-link">
                  <ul class="custom-drop-list">
                    <li>
                      <a class="custom-drop-menu" href="">기업 부설 연구소</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="">인증서 및 특허</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="custom-drop-item">
                <div class="custom-drop-title">
                  <span class="custom-drop-txt">SERVICE</span>
                  <span class="custom-drop-line"></span>
                </div>
                <div class="custom-drop-link">
                  <ul class="custom-drop-list">
                    <li>
                      <a class="custom-drop-menu" href="">공지사항</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="">1:1 문의</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
		`);
    }

    const $customDrop = $header.find(".custom-dropdown");
    const $logo = $header.find(".logo img");

    let isHover = false;
    let isScrolled = false;

    // 헤더 상태 업데이트
    function updateHeader() {
      const isActive = isHover || isScrolled;

      $header.toggleClass("active", isActive);

      // 로고 변경
      if (isActive) {
        $logo.attr("src", "img/logo.png");
      } else {
        $logo.attr("src", "img/logow.png");
      }
    }

    // 스크롤 상태 체크
    function checkScroll() {
      isScrolled = $(window).scrollTop() > 0;

      updateHeader();
    }

    // 헤더 마우스 진입
    $header.on("mouseenter", function () {
      isHover = true;

      $customDrop.stop(true, true).slideDown(300);

      updateHeader();
    });

    // 헤더 마우스 이탈
    $header.on("mouseleave", function () {
      isHover = false;

      $customDrop.stop(true, true).slideUp(300);

      updateHeader();
    });

    // 스크롤 이벤트
    $(window).on("scroll", function () {
      checkScroll();
    });

    // 최초 로드 시 상태 적용
    checkScroll();
  }

  function sectionScroll() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const sections = gsap.utils.toArray(".section");

    let currentIndex = 0;
    let isAnimating = false;

    window.addEventListener(
      "wheel",
      (e) => {
        // 애니메이션 중이면 스크롤 완전히 차단
        if (isAnimating) {
          e.preventDefault();
          return;
        }

        // 스크롤 방향 판단
        const direction = e.deltaY > 0 ? 1 : -1;

        // 다음 이동할 섹션
        const nextIndex = currentIndex + direction;

        // 첫 번째 / 마지막 섹션 제한
        if (nextIndex < 0 || nextIndex >= sections.length) {
          return;
        }

        // 기본 스크롤 차단
        e.preventDefault();

        // 잠금
        isAnimating = true;
        currentIndex = nextIndex;

        // 해당 섹션으로 이동
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: sections[currentIndex],
            autoKill: false,
          },
          ease: "power3.inOut",

          onComplete: () => {
            // 애니메이션 완료 후 잠금 해제
            isAnimating = false;
          },
        });
      },
      { passive: false },
    );
  }

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

      "fade-down": {
        from: { y: -50, opacity: 0 },
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
