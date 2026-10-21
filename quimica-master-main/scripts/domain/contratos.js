/* ============ CAMADA: DOMÍNIO — Contratos centrais ============
   Define o contrato que TODO jogo deve cumprir para entrar no catálogo.
   Valida na inicialização; jogo inválido aparece no console e é ignorado. */
(function (QM) {
  'use strict';
  QM.dominio = QM.dominio || {};

  QM.dominio.CAMPOS_OBRIGATORIOS_DO_JOGO = ['id', 'titulo', 'materia', 'topicos', 'dificuldade', 'descricao', 'rota'];

  QM.dominio.jogoValido = function (jogo) {
    if (!jogo || typeof jogo !== 'object') return false;
    return QM.dominio.CAMPOS_OBRIGATORIOS_DO_JOGO.every(function (campo) {
      var valor = jogo[campo];
      return campo === 'topicos' ? Array.isArray(valor) && valor.length > 0 : Boolean(valor);
    });
  };
})(window.QM = window.QM || {});