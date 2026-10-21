/* Resultados locais dos jogos. Sem conta, servidor ou dependências externas.
   Se o navegador bloquear localStorage, a partida continua em memória. */
(function (QM) {
  'use strict';
  QM.app = QM.app || {};

  var CHAVE = 'quimica-master.progresso.v1';
  var persistente = true;
  var memoria = carregar();

  function numeroSeguro(valor, maximo) {
    return typeof valor === 'number' && isFinite(valor) && valor >= 0 && valor <= maximo;
  }

  function estatisticaValida(item) {
    return item && numeroSeguro(item.partidas, 1000000) &&
      numeroSeguro(item.melhorPercentual, 100) && numeroSeguro(item.melhorPontuacao, 1000000) &&
      numeroSeguro(item.ultimoPercentual, 100);
  }

  function identificadorValido(id) {
    return typeof id === 'string' && /^[a-z][a-z0-9-]{0,59}$/.test(id) &&
      ['constructor', 'prototype', '__proto__'].indexOf(id) === -1;
  }

  function vazio() { return { versao: 1, jogos: {} }; }

  function carregar() {
    try {
      var texto = window.localStorage.getItem(CHAVE);
      if (!texto) return vazio();
      var dados = JSON.parse(texto);
      if (!dados || dados.versao !== 1 || !dados.jogos || typeof dados.jogos !== 'object') return vazio();
      var limpo = vazio();
      Object.keys(dados.jogos).forEach(function (id) {
        var jogo = dados.jogos[id];
        if (!identificadorValido(id) || !estatisticaValida(jogo)) return;
        limpo.jogos[id] = copiar(jogo);
        limpo.jogos[id].niveis = {};
        if (!jogo.niveis || typeof jogo.niveis !== 'object') return;
        Object.keys(jogo.niveis).forEach(function (nivel) {
          if (identificadorValido(nivel) && estatisticaValida(jogo.niveis[nivel])) {
            limpo.jogos[id].niveis[nivel] = copiar(jogo.niveis[nivel]);
          }
        });
      });
      return limpo;
    } catch (erro) {
      /* JSON antigo/corrompido pode ser substituído; acesso bloqueado não. */
      if (!(erro instanceof SyntaxError)) persistente = false;
      return vazio();
    }
  }

  function copiar(item) {
    return {
      partidas: item.partidas,
      melhorPercentual: item.melhorPercentual,
      melhorPontuacao: item.melhorPontuacao,
      ultimoPercentual: item.ultimoPercentual
    };
  }

  function estatisticaNova() {
    return { partidas: 0, melhorPercentual: 0, melhorPontuacao: 0, ultimoPercentual: 0 };
  }

  function atualizar(item, percentual, pontos) {
    item.partidas = Math.min(1000000, item.partidas + 1);
    item.melhorPercentual = Math.max(item.melhorPercentual, percentual);
    item.melhorPontuacao = Math.max(item.melhorPontuacao, pontos);
    item.ultimoPercentual = percentual;
  }

  QM.app.obterProgressoJogo = function (id, nivel) {
    if (!identificadorValido(id)) return null;
    var item = Object.prototype.hasOwnProperty.call(memoria.jogos, id) ? memoria.jogos[id] : null;
    if (nivel) item = item && Object.prototype.hasOwnProperty.call(item.niveis, nivel) ? item.niveis[nivel] : null;
    return item ? copiar(item) : null;
  };

  QM.app.progressoPersistente = function () { return persistente; };

  QM.app.salvarResultadoJogo = function (id, nivel, acertos, total, pontos) {
    if (!identificadorValido(id) || !identificadorValido(nivel) ||
      !numeroSeguro(total, 10000) || total < 1 || !numeroSeguro(acertos, total) ||
      !numeroSeguro(pontos, total * 100)) return false;

    /* Lê resultados de outra aba antes de acrescentar esta partida. */
    if (persistente) {
      var atual = carregar();
      if (persistente) memoria = atual;
    }
    var percentual = Math.round(acertos * 100 / total);
    var item = memoria.jogos[id];
    if (!item) {
      item = estatisticaNova();
      item.niveis = {};
      memoria.jogos[id] = item;
    }
    if (!item.niveis[nivel]) item.niveis[nivel] = estatisticaNova();
    atualizar(item, percentual, pontos);
    atualizar(item.niveis[nivel], percentual, pontos);
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(memoria));
      persistente = true;
    } catch (erro) {
      persistente = false;
    }
    return true;
  };

  window.addEventListener('storage', function (evento) {
    if (evento.key === CHAVE || evento.key === null) memoria = carregar();
  });
})(window.QM = window.QM || {});
