/* ============ CAMADA: APRESENTAÇÃO — Roteador ============
   Mapeia rotas (#/...) para views. Nenhuma regra de negócio aqui. */
(function (QM) {
  'use strict';
  QM.router = QM.router || {};

  var rotas = {
    '#/': function () { return QM.ui.viewCatalogo(); },
    '#/sites-e-reportagens': function () { return QM.ui.viewReportagens(); },
    '#/tabela-periodica': function () { return QM.ui.viewTabela(); },
    '#/documentacao': function () { return QM.ui.viewDocumentacao(); }
  };

  function resolver(hash) {
    if (rotas[hash]) return rotas[hash]();
    var partida = hash.match(/^#\/jogo\/([\w-]+)$/);
    if (partida) {
      var jogo = QM.app.obterJogo(partida[1]);
      if (jogo) return jogo.render();
    }
    return '<div class="container"><h1>Página não encontrada</h1>' +
           '<p><a href="#/">Voltar ao catálogo de jogos</a></p></div>';
  }

  QM.router.rotear = function () {
    var hash = window.location.hash || '#/';
    QM.ui.renderizar(resolver(hash), hash);
    window.scrollTo(0, 0);
  };

  QM.router.iniciar = function () {
    window.addEventListener('hashchange', QM.router.rotear);
    QM.router.rotear();
  };
})(window.QM = window.QM || {});