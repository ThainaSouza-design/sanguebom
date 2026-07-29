/* ==========================================================
   Componente: Cabeçalho (menu)
   Monta o <header> com a navegação principal, o botão "Quero
   Doar" e o menu mobile (hambúrguer). Depende de components/js/core.js.
   ========================================================== */
(function () {
  "use strict";

  var SB = window.SBLayout;

  // Itens do menu. Cada item leva à sua própria página; o destaque
  // (classe "start") vai para a página atual. Contato fica sem
  // função por enquanto.
  var navItems = [
    { key: "inicio", href: SB.root + "index.html", label: "Início" },
    { key: "quem", href: SB.pagesDir + "criterios.html", label: "Quem Pode Doar" },
    { key: "beneficios", href: SB.pagesDir + "beneficios.html", label: "Benefícios" },
    { key: "locais", href: SB.pagesDir + "locais.html", label: "Locais de Doação" },
    { key: "historias", href: SB.pagesDir + "historia.html", label: "Histórias" },
    { key: "patrocinio", href: SB.pagesDir + "patrocinadores.html", label: "Patrocinio" },
    { key: "contato", href: "#footer", label: "Contato" }
  ];

  var navHTML = navItems
    .map(function (it) {
      var cls = it.key === SB.page ? ' class="start"' : "";
      return '<a href="' + it.href + '"' + cls + ">" + it.label + "</a>";
    })
    .join("");

  var headerHTML =
    '<header class="header">' +
    '  <div class="header__inner">' +
    '    <div class="logo">' +
    '      <a href="' + SB.root + 'index.html"><img src="' + SB.logo + '" alt="Sangue Bom"></a>' +
    "    </div>" +
    '    <nav class="navbar" id="site-nav" aria-label="Navegação principal">' +
    navHTML +
    "    </nav>" +
    '    <div class="header__actions">' +
    '      <div class="Doar">' +
    '        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener">' +
    '          <img src="' + SB.coracao + '" alt="coração">' +
    "          <span>Quero Doar</span>" +
    "        </a>" +
    "      </div>" +
    '      <button type="button" class="nav-toggle" id="nav-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Abrir menu">' +
    '        <span class="nav-toggle__bar"></span>' +
    '        <span class="nav-toggle__bar"></span>' +
    '        <span class="nav-toggle__bar"></span>' +
    "      </button>" +
    "    </div>" +
    "  </div>" +
    "</header>";

  // Menu mobile (hambúrguer): abre/fecha o .navbar em telas estreitas.
  // O painel usa position:absolute (ver CSS), então abrir/fechar nunca
  // muda header.offsetHeight — é isso que mantém fixHeaderSpacing() correto.
  function bindNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function openNav() {
      nav.classList.add("is-open");
      toggle.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
    }

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeNav);
    }

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 1501px)");
    function handleDesktopChange(e) {
      if (e.matches) closeNav();
    }
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  // O header fica fixo no topo (position: fixed), então some do fluxo
  // normal da página. Aqui reservamos, dinamicamente, o mesmo espaço no
  // topo do body (e no scroll para os links âncora, como "Contato") do
  // tamanho real do header, já que sua altura varia entre páginas e
  // larguras de tela.
  function fixHeaderSpacing() {
    var header = document.querySelector(".header");
    if (!header) return;

    function apply() {
      var altura = header.offsetHeight + "px";
      document.body.style.paddingTop = altura;
      document.documentElement.style.scrollPaddingTop = altura;
    }

    apply();
    window.addEventListener("load", apply);

    if (window.ResizeObserver) {
      new ResizeObserver(apply).observe(header);
    } else {
      window.addEventListener("resize", apply);
    }
  }

  function mountHeader() {
    var slot = document.getElementById("site-header");
    if (slot) {
      slot.replaceWith(SB.nodeFrom(headerHTML));
    } else {
      document.body.insertBefore(SB.nodeFrom(headerHTML), document.body.firstChild);
    }
    fixHeaderSpacing();
    bindNavToggle();
  }

  // Link "Pular para o conteúdo": fica invisível até receber foco (Tab),
  // permitindo que quem navega por teclado pule o cabeçalho/menu.
  // Precisa ser inserido por último em body.firstChild para ficar antes
  // do header (que já ocupa essa posição nas páginas sem #site-header).
  function mountSkipLink() {
    var alvo = document.getElementById("conteudo-principal");
    if (!alvo) return;
    var link = document.createElement("a");
    link.href = "#conteudo-principal";
    link.className = "skip-link";
    link.textContent = "Pular para o conteúdo";
    document.body.insertBefore(link, document.body.firstChild);
  }

  SB.mountHeader = mountHeader;
  SB.mountSkipLink = mountSkipLink;
})();
