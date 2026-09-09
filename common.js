$(document).ready(function () {
  // sectionScroll();
  customHeader();
  scrollTrigger();
  initTabFromURL();

  function initTabFromURL() {
    const tabParam = new URLSearchParams(window.location.search).get("tab");

    const $tabs = $(".sub-tab");
    const $panels = $(".tab-panel");

    // 모든 active 제거
    $tabs.removeClass("active");
    $panels.removeClass("active").hide();

    // URL에 tab이 없는 경우
    // 기본 탭을 about으로 지정
    const targetTab = tabParam || $tabs.first().data("tab");

    const $targetTab = $tabs.filter(`[data-tab="${targetTab}"]`);

    const $targetPanel = $panels.filter(`[data-panel="${targetTab}"]`);

    if (!$targetTab.length || !$targetPanel.length) {
      return;
    }

    // 바로 active
    $targetTab.addClass("active");
    $targetPanel.addClass("active").show();

    // Hero
    const title = $targetTab.data("title");
    const bg = $targetTab.data("bg");

    $(".sub-hero__content h1").text(title);

    $(".sub-hero__bg").css("background-image", `url("${bg}")`);
  }

  /* =========================================
     페이지 이동 + 탭 전달
  ========================================= */

  $(document).on("click", ".page-link", function () {
    const page = $(this).data("page");
    const tab = $(this).data("tab");

    if (!page) return;

    let url = `${page}.html`;

    if (tab) {
      url += `?tab=${encodeURIComponent(tab)}`;
    }

    window.location.href = url;
  });

  /* =========================================
     서브 탭
  ========================================= */

  $(".sub-tab").on("click", function () {
    const $tab = $(this);

    const target = $tab.data("tab");
    const title = $tab.data("title");
    const bg = $tab.data("bg");

    const $heroTitle = $(".sub-hero__content h1");
    const $heroBg = $(".sub-hero__bg");
    const $targetPanel = $(`.tab-panel[data-panel="${target}"]`);

    if ($tab.hasClass("active")) return;

    $(".sub-tab").removeClass("active");
    $tab.addClass("active");

    $heroTitle.stop(true, true).fadeOut(150, function () {
      $(this).text(title).fadeIn(250);
    });

    $heroBg.stop(true, true).fadeTo(200, 0, function () {
      $(this).css("background-image", `url("${bg}")`).fadeTo(400, 1);
    });

    $(".tab-panel.active")
      .stop(true, true)
      .fadeOut(200, function () {
        $(this).removeClass("active");

        $targetPanel.addClass("active").hide().fadeIn(300);
      });
  });

  /* =========================================
     URL의 tab 값으로 탭 자동 활성화
  ========================================= */

  const tabParam = new URLSearchParams(window.location.search).get("tab");

  if (tabParam) {
    const $targetTab = $(`.sub-tab[data-tab="${tabParam}"]`);

    if ($targetTab.length) {
      $targetTab.trigger("click");
    }
  }

  // Fixed 버튼
  $(function () {
    // ========================================
    // Floating Contact Button
    // ========================================

    const floatingMenu = `
  <div class="floating-menu">

    <div class="floating-actions">

      <a href="tel:031-697-8299" class="floating-btn phone">
        <i class="fa-solid fa-phone"></i>
        <span>전화문의</span>
      </a>

      <a href="mailto:woobosys@woobosys.com" class="floating-btn mail">
        <i class="fa-solid fa-envelope"></i>
        <span>메일문의</span>
      </a>

      <!-- 팩스 -->
      <button type="button" class="floating-btn fax" data-fax>
        <i class="fa-solid fa-fax"></i>
        <span>팩스번호</span>
      </button>

      <a href="/contact.html" class="floating-btn inquiry">
        <i class="fa-solid fa-comment-dots"></i>
        <span>1:1 문의</span>
      </a>

    </div>

    <button type="button" class="floating-toggle" aria-label="문의 메뉴 열기">
      <i class="fa-solid fa-plus"></i>
    </button>

    <button type="button" class="floating-top" aria-label="페이지 상단으로 이동">
      <i class="fa-solid fa-arrow-up"></i>
    </button>

  </div>

  <!-- 팩스번호 팝업 -->
  <div class="fax-modal">
    <div class="fax-modal-dim"></div>

    <div class="fax-modal-box">

      <button type="button" class="fax-modal-close" aria-label="닫기">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="fax-modal-icon">
        <i class="fa-solid fa-fax"></i>
      </div>

      <p class="fax-modal-label">FAX</p>
      <strong class="fax-modal-number">0504-248-3046</strong>

      <button type="button" class="fax-copy">
        <i class="fa-regular fa-copy"></i>
        번호 복사
      </button>

    </div>
  </div>
`;

    $("body").append(floatingMenu);

    /* ========================================
   팩스번호 팝업
======================================== */

    $("[data-fax]").on("click", function () {
      $(".fax-modal").addClass("is-open");
      $("body").addClass("modal-open");
    });

    /* 팝업 닫기 */
    $(".fax-modal-close, .fax-modal-dim").on("click", function () {
      $(".fax-modal").removeClass("is-open");
      $("body").removeClass("modal-open");
    });

    /* ========================================
   팩스번호 복사
======================================== */

    $(".fax-copy").on("click", function () {
      const faxNumber = $(".fax-modal-number").text().trim();

      navigator.clipboard.writeText(faxNumber).then(function () {
        const button = $(".fax-copy");

        button.html(`
      <i class="fa-solid fa-check"></i>
      복사되었습니다
    `);

        setTimeout(function () {
          button.html(`
        <i class="fa-regular fa-copy"></i>
        번호 복사
      `);
        }, 1500);
      });
    });

    // ========================================
    // 문의 메뉴 열기 / 닫기
    // ========================================

    $(".floating-toggle").on("click", function () {
      $(".floating-menu").toggleClass("is-open");

      const isOpen = $(".floating-menu").hasClass("is-open");

      $(this).attr("aria-label", isOpen ? "문의 메뉴 닫기" : "문의 메뉴 열기");
    });

    // ========================================
    // TOP 버튼
    // ========================================

    $(".floating-top").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600,
      );
    });

    // ========================================
    // 스크롤 시 TOP 버튼 표시
    // ========================================

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $(".floating-top").addClass("is-visible");
      } else {
        $(".floating-top").removeClass("is-visible");
      }
    });

    // ========================================
    // 문의 버튼 클릭 후 메뉴 닫기
    // ========================================

    $(".floating-actions a").on("click", function () {
      $(".floating-menu").removeClass("is-open");
    });
  });

  // 공통
  function customHeader() {
    // 1차메뉴
    const Header = `
      <header id="header" class="header">
        <div class="header-inner">
          <div class="logo">
            <a href="index.html"
              ><img
                src="https://ecimg.cafe24img.com/pg3350b13371685013/wooboeco/logow.png"
                alt="logo"
            /></a>
          </div>
          <div class="gnb">
            <ul class="depth1-wrap">
              <li class="depth1">
                <a href="water-display.html"
                  ><span style="font-weight: 500;">스마트 물놀이 수질 전광판</span></a
                >
              </li>
              <li class="depth1">
                <a class="page-link" data-page="about" data-tab="about"
                  ><span>회사소개</span></a
                >
              </li>
              <li class="depth1">
                <a href="water-display.html"><span>사업소개</span></a>
              </li>
              <li class="depth1">
                <a class="page-link" data-page="cert" data-tab="cert"
                  ><span>연구개발</span></a
                >
              </li>
              <li class="depth1">
                <a href="#none"><span>고객지원</span></a>
              </li>
            </ul>
          </div>
        </div>
      </header>
`;

    $(".custom-wrap").append(Header);

    // 푸터
    const Footer = `
            <div class="explore">
        <div class="container">
          <div class="exp-grid">
            <ul class="exp-list">
              <li>
                <a class="exp-menu page-link" data-page="about" data-tab="about"
                  >회사소개</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="about" data-tab="about"
                  >ABOUT US</a
                >
              </li>
              <li>
                <a
                  class="exp-menu page-link"
                  data-page="about"
                  data-tab="history"
                  >연혁</a
                >
              </li>
              <li>
                <a
                  class="exp-menu page-link"
                  data-page="about"
                  data-tab="organization"
                  >조직도</a
                >
              </li>
              <li>
                <a
                  class="exp-menu page-link"
                  data-page="about"
                  data-tab="location"
                >
                  찾아오시는 길</a
                >
              </li>
            </ul>
            <ul class="exp-list">
              <li>
                <a class="exp-menu page-link" data-page="water-display"
                  >사업소개</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="water-display"
                  >스마트 물놀이 수질 전광판</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="gms"
                  >그린 모니터링 시스템</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="maintenance"
                  >수질 측정기기 유지관리</a
                >
              </li>
            </ul>
            <ul class="exp-list">
              <li>
                <a class="exp-menu page-link" data-page="cert" data-tab="cert"
                  >연구개발</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="cert" data-tab="cert"
                  >인증서 및 특허</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="cert" data-tab="rnd"
                  >기업 부설 연구소
                </a>
              </li>
            </ul>
            <ul class="exp-list">
              <li>
                <a class="exp-menu page-link" data-page="" data-tab=""
                  >고객지원</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="" data-tab=""
                  >공지사항</a
                >
              </li>
              <li>
                <a class="exp-menu page-link" data-page="" data-tab=""
                  >1:1문의</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer class="custom-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-logo page-link" data-page="index">
              <img
                src="https://ecimg.cafe24img.com/pg3350b13371685013/wooboeco/img/logow.png"
                alt="logo"
              />
            </div>
            <div class="footer-txt">
              <p>
                (주)우보환경시스템 성남시 중원구 갈마치로215 A-402호(상대원동,
                금강펜테리움IT타워)
              </p>
              <p>TEL : 031-697-8299 / FAX : 0504-248-3046</p>
              <p>COPYRIGHT ⓒ 2023 WooBoSYS. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </footer>
`;

    $(".custom-wrap").append(Footer);

    // 2차메뉴
    const $header = $("#header");
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
                      <a class="custom-drop-menu page-link" data-page="about" data-tab="about">ABOUT US</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu page-link" data-page="about" data-tab="history">연혁</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu page-link" data-page="about" data-tab="organization">조직도</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu page-link" data-page="about" data-tab="location">찾아오시는 길</a>
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
                      <a class="custom-drop-menu" href="water-display.html"
                        >스마트 물놀이 수질 전광판</a
                      >
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="gms.html"
                        >그린 모니터링 시스템</a
                      >
                    </li>
                    <li>
                      <a class="custom-drop-menu" href="maintenance.html"
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
                      <a class="custom-drop-menu page-link" data-page="cert" data-tab="certification">인증서 및 특허</a>
                    </li>
                    <li>
                      <a class="custom-drop-menu page-link" data-page="cert" data-tab="rnd">기업 부설 연구소</a>
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
    let isAnimating = false;
    let closeTimer = null;

    const hasSubHero = $(".sub-hero").length > 0;

    /* =====================================
   HEADER STATE
===================================== */

    function updateHeader() {
      const isActive = hasSubHero || isHover || isScrolled;

      $header.toggleClass("active", isActive);

      $logo.attr("src", isActive ? "img/logo.png" : "img/logow.png");
    }

    /* =====================================
   DROPDOWN OPEN
===================================== */

    function openDropdown() {
      clearTimeout(closeTimer);

      isHover = true;

      updateHeader();

      // 이미 열려있으면 종료
      if ($customDrop.is(":visible")) {
        return;
      }

      // 애니메이션 중이면 무시
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      $customDrop.stop(true, true).slideDown(300, function () {
        isAnimating = false;
      });
    }

    /* =====================================
   DROPDOWN CLOSE
===================================== */

    function closeDropdown() {
      isHover = false;

      clearTimeout(closeTimer);

      closeTimer = setTimeout(function () {
        // 다시 hover 상태면 닫지 않음
        if ($header.is(":hover")) {
          return;
        }

        // 애니메이션 중이면 조금 뒤 다시 체크
        if (isAnimating) {
          closeDropdown();

          return;
        }

        // 이미 닫혀있으면 종료
        if (!$customDrop.is(":visible")) {
          updateHeader();
          return;
        }

        isAnimating = true;

        $customDrop.stop(true, true).slideUp(300, function () {
          isAnimating = false;

          updateHeader();
        });
      }, 150);
    }

    /* =====================================
   HEADER HOVER
===================================== */

    const $gnb = $(".gnb");
    $gnb.on("mouseenter", function () {
      openDropdown();
    });

    $header.on("mouseleave", function () {
      closeDropdown();
    });

    /* =====================================
   SCROLL
===================================== */

    function checkScroll() {
      isScrolled = $(window).scrollTop() > 0;

      updateHeader();
    }

    $(window).on("scroll", checkScroll);

    /* =====================================
   INIT
===================================== */

    checkScroll();

    /* 새로고침 시 마우스가 이미 헤더 위에 있는 경우 */

    setTimeout(function () {
      if ($header.is(":hover")) {
        openDropdown();
      }
    }, 100);
  }

  // 섹션단위 스크롤
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

  // --------- 스크롤트리거
  function scrollTrigger() {
    // Fade, Scale 통합 애니메이션 설정
    const animations = {
      "gray-scale": {
        from: { filter: "grayscale(100%)" },
        to: { filter: "grayscale(0%)" },
      },
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
        end: "bottom 20%",

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
