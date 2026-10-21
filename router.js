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
    
    /* Captura rotas no padrão #/jogo/id (ex: #/jogo/impostor, #/jogo/balanceamento, #/jogo/organica) */
    var partida = hash.match(/^#\/jogo\/([\w-]+)$/);
    if (partida) {
      var jogo = QM.app.obterJogo(partida[1]);
      if (jogo) return jogo.render();
    }
    
    /* #/sites-e-reportagens/:tema  e  #/sites-e-reportagens/:tema/:id */
    var reportagem = hash.match(/^#\/sites-e-reportagens\/([\w-]+)(?:\/([\w-]+))?$/);
    if (reportagem) return QM.ui.viewReportagens(reportagem[1], reportagem[2]);
    
    return '<div class="container"><h1>Página não encontrada</h1>' +
           '<p><a href="#/">Voltar ao catálogo de jogos</a></p></div>';
  }

  /* Seção = primeiros dois níveis da rota (#/sites-e-reportagens/tema/id → #/sites-e-reportagens).
     Só volta ao topo quando a seção muda; trocar de tema/reportagem no menu mantém a rolagem. */
  var secaoAnterior = null;
  function secaoDe(hash) { return hash.split('/').slice(0, 2).join('/'); }

  QM.router.rotear = function () {
    var hash = window.location.hash || '#/';
    QM.ui.renderizar(resolver(hash), hash);
    var secao = secaoDe(hash);
    if (secao !== secaoAnterior) window.scrollTo(0, 0);
    secaoAnterior = secao;
  };

  QM.router.iniciar = function () {
    window.addEventListener('hashchange', QM.router.rotear);
    QM.router.rotear();
  };
})(window.QM = window.QM || {});