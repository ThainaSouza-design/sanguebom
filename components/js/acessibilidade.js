/* ==========================================================
   Componente: Acessibilidade
   Widget VLibras (Libras) + painel próprio de acessibilidade
   (fonte, cores, imagens, lupa). Preferências salvas em
   localStorage e reaplicadas em toda navegação (site multi-página).
   Depende de components/js/core.js.
   ========================================================== */
(function () {
  "use strict";

  var SB = window.SBLayout;

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
  function a11ySincronizarComVLibras(tentativasRestantes, rectAnterior) {
    var vlibrasBotao = document.querySelector("[vw-access-button]");
    var meuBotao = document.getElementById("a11y-abrir");
    if (!meuBotao) return;

    if (!vlibrasBotao || !vlibrasBotao.offsetWidth) {
      if (tentativasRestantes > 0) {
        setTimeout(function () {
          a11ySincronizarComVLibras(tentativasRestantes - 1);
        }, 400);
      } else {
        // Não deu pra medir a posição, mas melhor mostrar os botões
        // (mesmo sem sincronia perfeita) do que deixá-los invisíveis pra sempre.
        if (vlibrasBotao) vlibrasBotao.classList.add("a11y-vlibras-pronto");
        meuBotao.classList.add("a11y-vlibras-pronto");
      }
      return;
    }

    var rect = vlibrasBotao.getBoundingClientRect();

    // O botão deles já existe (offsetWidth > 0) mas ainda pode estar no meio
    // da animação de entrada deles (desliza de baixo pra cima). Só finaliza
    // quando a posição parar de mudar entre duas medições — senão a gente
    // trava nosso botão numa posição provisória e ele "sobe" atrás deles.
    var parado = rectAnterior &&
      Math.abs(rect.top - rectAnterior.top) < 1 &&
      Math.abs(rect.left - rectAnterior.left) < 1;

    if (!parado && tentativasRestantes > 0) {
      setTimeout(function () {
        a11ySincronizarComVLibras(tentativasRestantes - 1, rect);
      }, 150);
      return;
    }

    vlibrasBotao.classList.add("a11y-vlibras-pronto");
    meuBotao.classList.add("a11y-vlibras-pronto");

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

    document.body.appendChild(SB.nodeFrom(toggleHTML));
    document.body.appendChild(SB.nodeFrom(painelHTML));

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

  SB.mountVLibras = mountVLibras;
  SB.mountAcessibilidade = mountAcessibilidade;
  SB.sincronizarComVLibras = a11ySincronizarComVLibras;
})();
