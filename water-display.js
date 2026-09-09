$(document).ready(function () {
  videoSound();
  // adminSwiper();

  function videoSound() {
    $(".video-sound").on("click", function () {
      const $btn = $(this);
      const video = $btn.closest(".video-wrap").find("video").get(0);

      video.muted = !video.muted;

      $btn.toggleClass("active", !video.muted);

      if (video.muted) {
        $btn.attr("aria-label", "소리 켜기");
      } else {
        $btn.attr("aria-label", "소리 끄기");
      }
    });
  }

  function adminSwiper() {
    const adminswiper = new Swiper(".adminSwiper", {
      speed: 1200,
      effect: "fade",

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
});
