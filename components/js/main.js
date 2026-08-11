(function () {
  "use strict";

  var SB = window.SBLayout;

  function ensureComponentsCSS() {
    if (document.querySelector('link[href$="css/style.css"]')) return;

    ["header", "footer", "cta", "acessibilidade"].forEach(function (nome) {
      var href = "components/css/" + nome + ".css";
      if (document.querySelector('link[href$="' + href + '"]')) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = SB.root + href;
      link.setAttribute("data-layout-css", "");
      document.head.appendChild(link);
    });
  }

  function init() {
    ensureComponentsCSS();
    SB.mountHeader();
    SB.mountSkipLink();
    SB.mountCTA();
    SB.mountFooter();
    SB.mountVLibras();
    SB.mountAcessibilidade();
    SB.sincronizarComVLibras(15);

    window.addEventListener("resize", function () {
      SB.sincronizarComVLibras(0);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
