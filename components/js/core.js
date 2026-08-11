window.SBLayout = (function () {
  "use strict";

  var inPages = /\/pages\//.test(window.location.pathname);

  var root = inPages ? "../" : "";

  var pagesDir = inPages ? "" : "pages/";

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
