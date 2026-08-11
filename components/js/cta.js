(function () {
  "use strict";

  var SB = window.SBLayout;

  var ctaHTML =
    '<section class="cta-doar">' +
    '  <div class="cta-doar__texto">' +
    "    <h2>Já conferiu tudo?</h2>" +
    "    <p>Se você atende aos critérios, doe sangue e ajude a salvar até 4 vidas.</p>" +
    "  </div>" +
    '  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" class="btn-doar">' +
    '    <img src="' + SB.coracao + '" alt="Coração">' +
    "    Quero doar agora" +
    "  </a>" +
    "</section>";

  function mountCTA() {
    var slot = document.getElementById("site-cta");
    if (slot) {
      slot.replaceWith(SB.nodeFrom(ctaHTML));
    } else {
      document.body.appendChild(SB.nodeFrom(ctaHTML));
    }
  }

  SB.mountCTA = mountCTA;
})();
