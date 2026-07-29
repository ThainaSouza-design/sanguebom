/* ==========================================================
   Componentização do Cabeçalho (menu) + CTA + Rodapé
   Fonte única de verdade para o header, a chamada "Já conferiu
   tudo?" e o footer do site. Injeta os três em qualquer página
   que carregue este script, ajustando os caminhos automaticamente
   conforme a página esteja na raiz (index.html) ou em /pages/.
   ========================================================== */
(function () {
  "use strict";

  // Detecta se a página atual está dentro da pasta /pages/.
  var inPages = /\/pages\//.test(window.location.pathname);

  // Prefixo até a raiz do projeto a partir da página atual.
  var root = inPages ? "../" : "";

  // Caminho até a pasta das subpáginas a partir da página atual.
  // Na home (raiz) é "pages/"; dentro de /pages/ é "" (mesma pasta).
  var pagesDir = inPages ? "" : "pages/";

  var logo = root + "assets/img/Logo.png";
  var logoRodape = root + "assets/img/logo-rodape.png";
  var coracao = root + "assets/img/Polygon 2.png";

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

  // Itens do menu. Cada item leva à sua própria página; o destaque
  // (classe "start") vai para a página atual. Contato fica sem
  // função por enquanto.
  var navItems = [
    { key: "inicio", href: root + "index.html", label: "Início" },
    { key: "quem", href: pagesDir + "criterios.html", label: "Quem Pode Doar" },
    { key: "beneficios", href: pagesDir + "beneficios.html", label: "Benefícios" },
    { key: "locais", href: pagesDir + "locais.html", label: "Locais de Doação" },
    { key: "historias", href: pagesDir + "historia.html", label: "Histórias" },
    { key: "patrocinio", href: pagesDir + "patrocinadores.html", label: "Patrocinio" },
    { key: "contato", href: "#footer", label: "Contato" }
  ];

  var navHTML = navItems
    .map(function (it) {
      var cls = it.key === page ? ' class="start"' : "";
      return '<a href="' + it.href + '"' + cls + ">" + it.label + "</a>";
    })
    .join("");

  var headerHTML =
    '<header class="header">' +
    '  <div class="header__inner">' +
    '    <div class="logo">' +
    '      <a href="' + root + 'index.html"><img src="' + logo + '" alt="Sangue Bom"></a>' +
    "    </div>" +
    '    <nav class="navbar" id="site-nav" aria-label="Navegação principal">' +
    navHTML +
    "    </nav>" +
    '    <div class="header__actions">' +
    '      <div class="Doar">' +
    '        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener">' +
    '          <img src="' + coracao + '" alt="coração">' +
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

  var footerHTML =
    '<footer class="footer" id="footer">' +
    '  <div class="footer__sobre">' +
    '    <img width="70" height="80" src="' + logoRodape + '" alt="Sangue Bom">' +
    "    <p>Incentivar e facilitar a doação de sangue, conectando pessoas e salvando vidas.</p>" +
    "  </div>" +
    '  <nav class="footer__links" aria-label="Links rápidos">' +
    "    <h3>Links Rápidos</h3>" +
    '    <ul role="list">' +
    '      <li><a href="' + pagesDir + 'criterios.html">Quem Pode Doar</a></li>' +
    '      <li><a href="' + pagesDir + 'beneficios.html">Benefícios</a></li>' +
    '      <li><a href="' + pagesDir + 'locais.html">Locais de Doação</a></li>' +
    '      <li><a href="' + pagesDir + 'historia.html">Histórias que Inspiram</a></li>' +
    '      <li><a href="' + pagesDir + 'patrocinadores.html">Patrocínio</a></li>' +
    "    </ul>" +
    "  </nav>" +
    '  <nav class="footer__institucional" aria-label="Institucional">' +
    "    <h3>Institucional</h3>" +
    '    <ul role="list">' +
    '      <li><a href="#">Política de Privacidade</a></li>' +
    '      <li><a href="#">Termos de Uso</a></li>' +
    '      <li><a href="#">Transparência</a></li>' +
    '      <li><a href="#footer">Contato</a></li>' +
    "    </ul>" +
    "  </nav>" +
    '  <div class="footer__contato">' +
    "    <h3>Fale Conosco</h3>" +
    '    <ul role="list">' +
    "      <li>" +
    '        <img width="80" height="80" src="https://img.icons8.com/ios/100/ffffff/whatsapp--v1.png" alt="WhatsApp">' +
    '        <a href="tel:+5511999999999">(11) 99999-9999</a>' +
    "      </li>" +
    "      <li>" +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/70/ffffff/new-post--v1.png" alt="E-mail">' +
    '        <a href="mailto:contato@sanguebom.org.br">contato@sanguebom.org.br</a>' +
    "      </li>" +
    "    </ul>" +
    '    <div class="footer__redes">' +
    '      <a href="https://facebook.com" target="_blank" rel="noopener">' +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/facebook--v1.png" alt="Facebook">' +
    "      </a>" +
    '      <a href="https://instagram.com" target="_blank" rel="noopener">' +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/instagram-new--v1.png" alt="Instagram">' +
    "      </a>" +
    "    </div>" +
    "  </div>" +
    '  <p class="footer__copyright">©2026 Sangue Bom. Todos os direitos reservados.</p>' +
    "</footer>";

  // Chamada "Já conferiu tudo?" — fica logo acima do rodapé.
  var ctaHTML =
    '<section class="cta-doar">' +
    '  <div class="cta-doar__texto">' +
    "    <h2>Já conferiu tudo?</h2>" +
    "    <p>Se você atende aos critérios, doe sangue e ajude a salvar até 4 vidas.</p>" +
    "  </div>" +
    '  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" class="btn-doar">' +
    '    <img src="' + coracao + '" alt="Coração">' +
    "    Quero doar agora" +
    "  </a>" +
    "</section>";

  // Garante que o CSS do layout esteja carregado (caso a página
  // não tenha incluído o <link> estaticamente).
  function ensureLayoutCSS() {
    if (document.querySelector('link[data-layout-css]')) return;
    if (document.querySelector('link[href$="components/layout.css"]')) return;
    // O index carrega style.css, que já contém os estilos do header/footer/CTA.
    if (document.querySelector('link[href$="css/style.css"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = root + "components/layout.css";
    link.setAttribute("data-layout-css", "");
    document.head.appendChild(link);
  }

  function nodeFrom(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html.trim();
    return tmp.firstElementChild;
  }

  function mountHeader() {
    var slot = document.getElementById("site-header");
    if (slot) {
      slot.replaceWith(nodeFrom(headerHTML));
    } else {
      document.body.insertBefore(nodeFrom(headerHTML), document.body.firstChild);
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

  function mountCTA() {
    var slot = document.getElementById("site-cta");
    if (slot) {
      slot.replaceWith(nodeFrom(ctaHTML));
    } else {
      document.body.appendChild(nodeFrom(ctaHTML));
    }
  }

  function mountFooter() {
    var slot = document.getElementById("site-footer");
    if (slot) {
      slot.replaceWith(nodeFrom(footerHTML));
    } else {
      document.body.appendChild(nodeFrom(footerHTML));
    }
  }

  // Widget oficial do governo (VLibras): traduz o conteúdo da página para
  // Língua Brasileira de Sinais. Script carregado sob demanda a partir do
  // domínio oficial vlibras.gov.br.
  function mountVLibras() {
    if (document.querySelector("[vw]")) return;

    var wrapper = document.createElement("div");
    wrapper.setAttribute("vw", "");
    wrapper.className = "enabled";
    wrapper.innerHTML =
      '<div vw-access-button class="active"></div>' +
      '<div vw-plugin-wrapper>' +
      '  <div class="vw-plugin-top-wrapper"></div>' +
      "</div>";
    document.body.appendChild(wrapper);

    var script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = function () {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      a11ySincronizarComVLibras(15);
    };
    document.body.appendChild(script);
  }

  // O VLibras posiciona o próprio botão via JS deles (não é confiável
  // sobrescrever só por CSS). Aqui a gente mede onde o botão do VLibras
  // realmente está na tela e encosta o nosso botão/painel bem ao lado,
  // com algumas tentativas porque o widget deles carrega de forma
  // assíncrona e pode levar um instante pra aparecer.
  function a11ySincronizarComVLibras(tentativasRestantes) {
    var vlibrasBotao = document.querySelector("[vw-access-button]");
    var meuBotao = document.getElementById("a11y-abrir");
    if (!meuBotao) return;

    if (!vlibrasBotao || !vlibrasBotao.offsetWidth) {
      if (tentativasRestantes > 0) {
        setTimeout(function () {
          a11ySincronizarComVLibras(tentativasRestantes - 1);
        }, 400);
      }
      return;
    }

    var rect = vlibrasBotao.getBoundingClientRect();
    var tamanho = Math.max(rect.width, rect.height);
    var topo = rect.top - tamanho - 12;
    var esquerda = rect.left + (rect.width - tamanho) / 2;

    meuBotao.style.setProperty("position", "fixed", "important");
    meuBotao.style.setProperty("width", tamanho + "px", "important");
    meuBotao.style.setProperty("height", tamanho + "px", "important");
    meuBotao.style.setProperty("font-size", (tamanho * 0.825) + "px", "important");
    meuBotao.style.setProperty("top", topo + "px", "important");
    meuBotao.style.setProperty("left", esquerda + "px", "important");
    meuBotao.style.setProperty("right", "auto", "important");
    meuBotao.style.setProperty("bottom", "auto", "important");
  }

  // ---------------------------------------------------------------
  // Painel de acessibilidade próprio (fonte, cores, imagens, lupa).
  // Fica ao lado do ícone do VLibras. Preferências salvas em
  // localStorage e reaplicadas em toda navegação (site multi-página).
  // ---------------------------------------------------------------
  var A11Y_CHAVE = "sangueBom:a11yPainel";
  var A11Y_PADRAO = {
    fonteTamanho: 0,
    fonteLegivel: false,
    negrito: false,
    linhaEspacada: false,
    letraEspacada: false,
    semImagens: false,
    lupa: false,
    contraste: false,
    intensidade: 0,
    daltonico: 0
  };
  var A11Y_PASSOS_FONTE = ["100%", "112%", "125%", "137%"];
  var A11Y_NOMES_INTENSIDADE = ["Padrão", "Reduzida", "Aumentada"];
  var A11Y_NOMES_DALTONICO = ["Nenhum", "Protanopia", "Deuteranopia", "Tritanopia"];

  var a11yEstado = null;
  var a11yLupaEl = null;
  var a11yLupaConteudo = null;
  var a11yLupaMove = null;

  function a11yLerEstado() {
    var estado = {};
    var chave;
    for (chave in A11Y_PADRAO) estado[chave] = A11Y_PADRAO[chave];
    try {
      var salvo = JSON.parse(localStorage.getItem(A11Y_CHAVE));
      if (salvo) {
        for (chave in estado) {
          if (salvo.hasOwnProperty(chave)) estado[chave] = salvo[chave];
        }
      }
    } catch (e) {
      // localStorage indisponível ou valor inválido: segue com o padrão.
    }
    return estado;
  }

  function a11ySalvarEstado(estado) {
    try {
      localStorage.setItem(A11Y_CHAVE, JSON.stringify(estado));
    } catch (e) {
      // Armazenamento indisponível (ex.: modo privado) — ignora.
    }
  }

  // Filtros SVG de simulação de daltonismo (matrizes padrão de
  // aproximação de protanopia/deuteranopia/tritanopia).
  function a11yInjetarFiltrosSVG() {
    if (document.getElementById("a11y-filtros-svg")) return;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "a11y-filtros-svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";
    svg.style.overflow = "hidden";
    svg.innerHTML =
      "<defs>" +
      '<filter id="a11y-protanopia"><feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/></filter>' +
      '<filter id="a11y-deuteranopia"><feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/></filter>' +
      '<filter id="a11y-tritanopia"><feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/></filter>' +
      "</defs>";
    document.body.appendChild(svg);
  }

  // Contraste, intensidade e daltonismo usam a mesma propriedade CSS
  // (filter) no <html>, então precisam ser combinados numa única string
  // em vez de cada um mexer em filter isoladamente (o que sobrescreveria
  // os outros).
  function a11yFiltroCombinado(estado) {
    var partes = [];
    if (estado.contraste) partes.push("invert(1) hue-rotate(180deg)");
    if (estado.intensidade === 1) partes.push("saturate(50%)");
    if (estado.intensidade === 2) partes.push("saturate(180%)");
    if (estado.daltonico === 1) partes.push("url(#a11y-protanopia)");
    if (estado.daltonico === 2) partes.push("url(#a11y-deuteranopia)");
    if (estado.daltonico === 3) partes.push("url(#a11y-tritanopia)");
    return partes.join(" ");
  }

  function a11yAplicar(estado) {
    var html = document.documentElement;
    html.style.fontSize = A11Y_PASSOS_FONTE[estado.fonteTamanho];
    html.classList.toggle("a11y-fonte-legivel", estado.fonteLegivel);
    html.classList.toggle("a11y-negrito", estado.negrito);
    html.classList.toggle("a11y-linha-espacada", estado.linhaEspacada);
    html.classList.toggle("a11y-letra-espacada", estado.letraEspacada);
    html.classList.toggle("a11y-sem-imagens", estado.semImagens);
    html.style.filter = a11yFiltroCombinado(estado);
    a11yAtualizarLupa(estado.lupa);
  }

  function a11yPosicionarLupa(clientX, clientY) {
    if (!a11yLupaEl || !a11yLupaEl.classList.contains("ativa")) return;
    var tamanho = 220;
    var zoom = 2;
    a11yLupaEl.style.left = (clientX - tamanho / 2) + "px";
    a11yLupaEl.style.top = (clientY - tamanho / 2) + "px";

    var px = clientX + window.scrollX;
    var py = clientY + window.scrollY;
    var tx = -(px - tamanho / (2 * zoom));
    var ty = -(py - tamanho / (2 * zoom));
    a11yLupaConteudo.style.transform = "scale(" + zoom + ") translate(" + tx + "px, " + ty + "px)";
  }

  // Lupa de conteúdo: clona o <body> uma vez por ativação e usa
  // transform (scale + translate) pra ampliar, em tempo real, o trecho
  // sob o cursor dentro de uma lente circular. Como é um clone estático,
  // conteúdo que muda dinamicamente (ex.: busca de locais.html) só
  // atualiza dentro da lente se ela for desativada e reativada.
  function a11yAtualizarLupa(ativa) {
    if (ativa) {
      if (!a11yLupaEl) {
        a11yLupaEl = document.createElement("div");
        a11yLupaEl.className = "a11y-lupa";
        a11yLupaEl.setAttribute("aria-hidden", "true");
        a11yLupaConteudo = document.createElement("div");
        a11yLupaConteudo.className = "a11y-lupa__conteudo";
        a11yLupaEl.appendChild(a11yLupaConteudo);
      }
      if (a11yLupaEl.parentNode) a11yLupaEl.parentNode.removeChild(a11yLupaEl);
      a11yLupaConteudo.innerHTML = "";
      a11yLupaConteudo.appendChild(document.body.cloneNode(true));
      a11yLupaConteudo.style.width = document.documentElement.scrollWidth + "px";
      document.body.appendChild(a11yLupaEl);
      a11yLupaEl.classList.add("ativa");

      if (!a11yLupaMove) {
        a11yLupaMove = function (e) {
          a11yPosicionarLupa(e.clientX, e.clientY);
        };
        document.addEventListener("mousemove", a11yLupaMove);
      }
    } else {
      if (a11yLupaEl) a11yLupaEl.classList.remove("ativa");
      if (a11yLupaMove) {
        document.removeEventListener("mousemove", a11yLupaMove);
        a11yLupaMove = null;
      }
    }
  }

  function a11yCartaoHTML(campo, acao, icone, label) {
    return (
      '<button type="button" class="a11y-cartao" data-a11y-acao="' + acao + '" data-a11y-campo="' + campo + '" aria-pressed="false">' +
      '<span class="a11y-cartao__icone" aria-hidden="true">' + icone + "</span>" +
      '<span class="a11y-cartao__label">' + label + "</span>" +
      '<span class="a11y-cartao__nivel"></span>' +
      "</button>"
    );
  }

  function a11yTemAlteracoes(estado) {
    var chave;
    for (chave in A11Y_PADRAO) {
      if (estado[chave] !== A11Y_PADRAO[chave]) return true;
    }
    return false;
  }

  function a11yAtualizarUI() {
    var painel = document.getElementById("a11y-painel");
    if (!painel) return;
    var cartoes = painel.querySelectorAll("[data-a11y-campo]");
    for (var i = 0; i < cartoes.length; i++) {
      var el = cartoes[i];
      var campo = el.getAttribute("data-a11y-campo");
      var valor = a11yEstado[campo];
      var ativo = typeof valor === "boolean" ? valor : valor > 0;
      el.setAttribute("aria-pressed", ativo ? "true" : "false");
      el.classList.toggle("is-ativo", ativo);
      var nivelEl = el.querySelector(".a11y-cartao__nivel");
      if (!nivelEl) continue;
      if (campo === "intensidade") nivelEl.textContent = A11Y_NOMES_INTENSIDADE[valor];
      else if (campo === "daltonico") nivelEl.textContent = A11Y_NOMES_DALTONICO[valor];
      else if (campo === "fonteTamanho") nivelEl.textContent = valor === 0 ? "" : A11Y_PASSOS_FONTE[valor];
      else nivelEl.textContent = "";
    }

    var restaurar = document.getElementById("a11y-restaurar");
    if (restaurar) restaurar.hidden = !a11yTemAlteracoes(a11yEstado);
  }

  function mountAcessibilidade() {
    a11yInjetarFiltrosSVG();
    a11yEstado = a11yLerEstado();

    var toggleHTML =
      '<button type="button" class="a11y-abrir" id="a11y-abrir" aria-haspopup="dialog" aria-expanded="false" aria-controls="a11y-painel" aria-label="Abrir painel de acessibilidade">' +
      '<span aria-hidden="true">♿</span>' +
      "</button>";

    var painelHTML =
      '<div class="a11y-modal" id="a11y-painel">' +
      '<div class="a11y-modal__painel" role="dialog" aria-modal="true" aria-labelledby="a11y-painel-titulo">' +
      '<div class="a11y-painel__cabecalho">' +
      '<h2 id="a11y-painel-titulo">Acessibilidade</h2>' +
      '<button type="button" class="a11y-painel__fechar" id="a11y-fechar" aria-label="Fechar painel de acessibilidade">&times;</button>' +
      "</div>" +
      '<div class="a11y-painel__corpo">' +
      "<section>" +
      "<h3>Controle de fonte</h3>" +
      '<div class="a11y-grade">' +
      a11yCartaoHTML("fonteTamanho", "cycle:fonteTamanho:4", "A+", "Tamanho de fonte") +
      a11yCartaoHTML("fonteLegivel", "toggle:fonteLegivel", "Aa", "Estilo de texto") +
      a11yCartaoHTML("negrito", "toggle:negrito", "B", "Letras destacadas") +
      a11yCartaoHTML("linhaEspacada", "toggle:linhaEspacada", "↕", "Espaço entre linhas") +
      a11yCartaoHTML("letraEspacada", "toggle:letraEspacada", "↔", "Espaço entre letras") +
      "</div>" +
      "</section>" +
      "<section>" +
      "<h3>Conteúdo</h3>" +
      '<div class="a11y-grade">' +
      a11yCartaoHTML("semImagens", "toggle:semImagens", "🚫", "Esconder imagens") +
      a11yCartaoHTML("lupa", "toggle:lupa", "🔍", "Lupa de conteúdo") +
      "</div>" +
      "</section>" +
      "<section>" +
      "<h3>Controle de cor</h3>" +
      '<div class="a11y-grade">' +
      a11yCartaoHTML("contraste", "toggle:contraste", "◐", "Contraste de cores") +
      a11yCartaoHTML("intensidade", "cycle:intensidade:3", "◑", "Intensidade de cores") +
      a11yCartaoHTML("daltonico", "cycle:daltonico:4", "🎨", "Modo daltônico") +
      "</div>" +
      "</section>" +
      "</div>" +
      '<div class="a11y-painel__rodape">' +
      '<button type="button" class="a11y-restaurar" id="a11y-restaurar" hidden>Restaurar ao padrão</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    document.body.appendChild(nodeFrom(toggleHTML));
    document.body.appendChild(nodeFrom(painelHTML));

    var abrir = document.getElementById("a11y-abrir");
    var painel = document.getElementById("a11y-painel");
    var fechar = document.getElementById("a11y-fechar");
    var restaurar = document.getElementById("a11y-restaurar");

    function abrirPainel() {
      painel.classList.add("is-open");
      abrir.setAttribute("aria-expanded", "true");
    }

    function fecharPainel() {
      painel.classList.remove("is-open");
      abrir.setAttribute("aria-expanded", "false");
    }

    abrir.addEventListener("click", function () {
      if (painel.classList.contains("is-open")) fecharPainel();
      else abrirPainel();
    });

    fechar.addEventListener("click", function () {
      fecharPainel();
      abrir.focus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && painel.classList.contains("is-open")) {
        fecharPainel();
        abrir.focus();
      }
    });

    // Clicar no fundo escurecido (fora do cartão do painel) fecha.
    painel.addEventListener("click", function (e) {
      if (e.target === painel) fecharPainel();
    });

    var cartoes = painel.querySelectorAll("[data-a11y-acao]");
    for (var i = 0; i < cartoes.length; i++) {
      cartoes[i].addEventListener("click", function (e) {
        var el = e.currentTarget;
        var acao = el.getAttribute("data-a11y-acao").split(":");
        var campo = acao[1];
        if (acao[0] === "toggle") {
          a11yEstado[campo] = !a11yEstado[campo];
        } else if (acao[0] === "cycle") {
          var total = parseInt(acao[2], 10);
          a11yEstado[campo] = (a11yEstado[campo] + 1) % total;
        }
        a11ySalvarEstado(a11yEstado);
        a11yAplicar(a11yEstado);
        a11yAtualizarUI();
      });
    }

    restaurar.addEventListener("click", function () {
      var chave;
      a11yEstado = {};
      for (chave in A11Y_PADRAO) a11yEstado[chave] = A11Y_PADRAO[chave];
      try {
        localStorage.removeItem(A11Y_CHAVE);
      } catch (e) {
        // Armazenamento indisponível — ignora.
      }
      a11yAplicar(a11yEstado);
      a11yAtualizarUI();
    });

    a11yAplicar(a11yEstado);
    a11yAtualizarUI();
  }

  function init() {
    ensureLayoutCSS();
    mountHeader();
    mountSkipLink();
    mountCTA();
    mountFooter();
    mountVLibras();
    mountAcessibilidade();
    a11ySincronizarComVLibras(15);

    window.addEventListener("resize", function () {
      a11ySincronizarComVLibras(0);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
