/* ==========================================================
   Núcleo compartilhado dos componentes (header, footer, cta,
   acessibilidade). Detecta caminhos relativos conforme a página
   esteja na raiz (index.html) ou em /pages/, identifica a página
   atual e expõe um helper de criação de nós DOM a partir de HTML.
   Precisa ser carregado antes dos demais scripts de components/js/.
   ========================================================== */
window.SBLayout = (function () {
  "use strict";

  // Detecta se a página atual está dentro da pasta /pages/.
  var inPages = /\/pages\//.test(window.location.pathname);

  // Prefixo até a raiz do projeto a partir da página atual.
  var root = inPages ? "../" : "";

  // Caminho até a pasta das subpáginas a partir da página atual.
  // Na home (raiz) é "pages/"; dentro de /pages/ é "" (mesma pasta).
  var pagesDir = inPages ? "" : "pages/";

  // Identifica a página atual para destacar o item de menu correspondente.
  var page = (function () {
    var p = decodeURIComponent(window.location.pathname).toLowerCase();
    if (/criterios/.test(p)) return "quem";
    if (/beneficios/.test(p)) return "beneficios";
    if (/hist[oó]ria/.test(p)) return "historias";
    if (/patrocinadores/.test(p)) return "patrocinio";
    if (/locais/.test(p)) return "locais";
    return "inicio";
  })();

  function nodeFrom(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html.trim();
    return tmp.firstElementChild;
  }

  return {
    root: root,
    pagesDir: pagesDir,
    page: page,
    logo: root + "assets/img/Logo.png",
    logoRodape: root + "assets/img/logo-rodape.png",
    coracao: root + "assets/img/Polygon 2.png",
    nodeFrom: nodeFrom
  };
})();
