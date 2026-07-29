/* ==========================================================
   Componente: Rodapé
   Monta o <footer> com links rápidos, institucional e contato.
   Depende de components/js/core.js.
   ========================================================== */
(function () {
  "use strict";

  var SB = window.SBLayout;

  var footerHTML =
    '<footer class="footer" id="footer">' +
    '  <div class="footer__sobre">' +
    '    <img width="70" height="80" src="' + SB.logoRodape + '" alt="Sangue Bom">' +
    "    <p>Incentivar e facilitar a doação de sangue, conectando pessoas e salvando vidas.</p>" +
    "  </div>" +
    '  <nav class="footer__links" aria-label="Links rápidos">' +
    "    <h3>Links Rápidos</h3>" +
    '    <ul role="list">' +
    '      <li><a href="' + SB.pagesDir + 'criterios.html">Quem Pode Doar</a></li>' +
    '      <li><a href="' + SB.pagesDir + 'beneficios.html">Benefícios</a></li>' +
    '      <li><a href="' + SB.pagesDir + 'locais.html">Locais de Doação</a></li>' +
    '      <li><a href="' + SB.pagesDir + 'historia.html">Histórias que Inspiram</a></li>' +
    '      <li><a href="' + SB.pagesDir + 'patrocinadores.html">Patrocínio</a></li>' +
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

  function mountFooter() {
    var slot = document.getElementById("site-footer");
    if (slot) {
      slot.replaceWith(SB.nodeFrom(footerHTML));
    } else {
      document.body.appendChild(SB.nodeFrom(footerHTML));
    }
  }

  SB.mountFooter = mountFooter;
})();
