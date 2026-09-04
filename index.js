$(document).ready(function () {
  mainSlide();
  projectAnimation();

  function projectAnimation() {
    const gridImg = $(".business .grid-item");
    const overTxt = $(".business .overlay-txt");
    let length = gridImg.length;

    let isMobile = false;
    if (window.innerWidth < 768) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    for (i = 0; i < length; i++) {
      let img = i + 1;
      gridImg.eq(i).css({
        backgroundImage: "url(img/business-" + img + ".jpg)",
      });
    }

    gridImg.mouseenter(function () {
      let index = $(this).index() + 1;
      overTxt.addClass("active");
      for (i = 0; i < length; i++) {
        gridImg.eq(i).css({
          backgroundImage: "url(img/business-" + index + ".jpg)",
        });
      }
    });

    gridImg.mouseleave(function () {
      overTxt.removeClass("active");
      for (i = 0; i < length; i++) {
        let img = i + 1;
        gridImg.eq(i).css({
          backgroundImage: "url(img/business-" + img + ".jpg)",
        });
      }
    });
  }

  function mainSlide() {
    const mainswiper = new Swiper(".mainSwiper", {
      loop: true,
      speed: 1200,
      effect: "fade",

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".main .swiper-next",
        prevEl: ".main .swiper-prev",
      },

      on: {
        init: function () {
          updateFraction(this);
          startProgress(6200);

          setTimeout(() => {
            playCurrentVideo(this);
          }, 300);
        },

        slideChange: function () {
          updateFraction(this);

          const duration = 6200;
          startProgress(duration);

          setTimeout(() => {
            playCurrentVideo(this);
          }, 300);
        },
      },
    });

    // 메인 슬라이드 프로그레스 바
    function startProgress(duration) {
      const fill = $(".progress-fill");
      fill.stop(true, true);

      fill.css("width", "0%");
      fill[0].offsetWidth;

      fill.animate(
        {
          width: "100%",
        },
        duration,
        "linear",
      );
    }

    // 페이지 수량 업데이트
    function updateFraction(swiper) {
      if (!swiper) return;

      $(".main .current").text(String(swiper.realIndex + 1).padStart(2, "0"));

      $(".main .total").text(
        String(
          $(".main .swiper-slide:not(.swiper-slide-duplicate)").length,
        ).padStart(2, "0"),
      );
    }

    // 비디오 재생
    function playCurrentVideo(swiper) {
      if (!swiper) return;

      const slide = swiper.slides[swiper.activeIndex];
      const video = slide.querySelector("video");

      if (!video) return;

      // 이미 재생 중이면 건드리지 않음
      if (!video.paused) return;

      video.currentTime = 0;

      video.play().catch((err) => {
        console.log("video play fail", err);
      });
    }
  }
});
