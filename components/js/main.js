/* ==========================================================
   Orquestrador dos componentes (header, footer, cta, acessibilidade).
   Deve ser o último script carregado, depois de core.js e de todos
   os componentes — chama os métodos que eles registraram em
   window.SBLayout e injeta o CSS deles caso a página não tenha
   incluído os <link> estaticamente.
   ========================================================== */
(function () {
  "use strict";

  var SB = window.SBLayout;

  // Garante que o CSS dos componentes esteja carregado (caso a página
  // não tenha incluído os <link> estaticamente).
  function ensureComponentsCSS() {
    // O index carrega css/style.css, que já contém os estilos do
    // header/footer/cta/acessibilidade.
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
