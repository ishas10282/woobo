$(document).ready(function () {
  $(".sub-tab").on("click", function () {
    const $tab = $(this);

    const target = $tab.data("tab");
    const title = $tab.data("title");
    const bg = $tab.data("bg");

    const $heroTitle = $(".sub-hero__content h1");
    const $heroBg = $(".sub-hero__bg");
    const $targetPanel = $(`.tab-panel[data-panel="${target}"]`);

    /* 이미 활성화된 탭이면 종료 */

    if ($tab.hasClass("active")) return;

    /* =========================
     TAB ACTIVE
  ========================= */

    $(".sub-tab").removeClass("active");
    $tab.addClass("active");

    /* =========================
     HERO TITLE CHANGE
  ========================= */

    $heroTitle.stop(true, true).fadeOut(150, function () {
      $(this).text(title).fadeIn(250);
    });

    /* =========================
     HERO BACKGROUND CHANGE
  ========================= */

    $heroBg.stop(true, true).fadeTo(200, 0, function () {
      $(this).css("background-image", `url("${bg}")`);

      $(this).fadeTo(400, 1);
    });

    /* =========================
     CONTENT CHANGE
  ========================= */

    $(".tab-panel.active")
      .stop(true, true)
      .fadeOut(200, function () {
        $(this).removeClass("active");

        $targetPanel.addClass("active").hide().fadeIn(300);
      });
  });

  //   History
});
