/* ============ CAMADA: APLICAÇÃO — Registro central e serviços ============ */
(function (QM) {
  'use strict';
  QM.app = QM.app || {};

  var registro = {};

  QM.app.registrarJogo = function (jogo, render) {
    if (!QM.dominio.jogoValido(jogo) || typeof render !== 'function') {
      console.error('[Química Master] Jogo inválido ou sem render():', jogo && jogo.id);
      return false;
    }
    registro[jogo.id] = { metadados: jogo, render: render };
    return true;
  };

  QM.app.obterJogo = function (id) { return registro[id] || null; };
  QM.app.listarJogos = function () {
    return Object.keys(registro).map(function (id) { return registro[id].metadados; });
  };

  /* NOVO: catálogo visual (cards do protótipo) e painel de pontuação demo. */
  QM.app.listarCatalogo = function () { return QM.dados.catalogo.slice(); };
  QM.app.obterPainelPontuacao = function () { return QM.dados.painelPontuacao; };

  QM.app.listarReportagens = function () { return QM.dados.reportagens.slice(); };
  QM.app.listarElementos = function () { return QM.dados.elementos.slice(); };
  QM.app.listarCategorias = function () { return QM.dados.categorias.slice(); };
})(window.QM = window.QM || {});