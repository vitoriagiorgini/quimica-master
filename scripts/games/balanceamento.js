/* ============ MÓDULO DE JOGO: Balanceamento de Equações ============
   Independente do módulo impostor. Nesta etapa: apenas estrutura visual.
   MECÂNICA FUTURA: inserção de coeficientes, verificação da conservação
   de átomos e pontuação — tudo dentro deste arquivo. */
(function (QM) {
  'use strict';

  var metadados = {
    id: 'balanceamento',
    titulo: 'Balanceamento de Equações',
    materia: 'Química Geral / Estequiometria',
    topicos: ['Leis das reações', 'Coeficientes estequiométricos'],
    dificuldade: 'Médio-avançado',
    descricao: 'Ajuste os coeficientes das equações químicas até conservar o número de átomos de cada elemento entre reagentes e produtos.',
    rota: '#/jogo/balanceamento'
  };

  function render() {
    return '' +
      '<div class="pagina-jogo">' +
        '<a class="voltar" href="#/">← Voltar ao catálogo</a>' +
        '<h1 class="titulo-secao">' + metadados.titulo + '</h1>' +
        '<p class="subtitulo-secao">' + metadados.descricao + '</p>' +
        '<h2>Como jogar</h2>' +
        '<ul class="lista-instrucoes">' +
          '<li>Leia a equação química apresentada com coeficientes incompletos.</li>' +
          '<li>Insira ou selecione os coeficientes de cada espécie.</li>' +
          '<li>Verifique a resposta: a conservação de átomos é validada elemento a elemento.</li>' +
          '<li>Receba feedback e avance para a próxima equação.</li>' +
        '</ul>' +
        '<div class="area-reservada" id="area-equacao-balanceamento">' +
          '<strong>Área da equação</strong>' +
          'Mecânica em desenvolvimento — estrutura preparada para implementação futura.' +
        '</div>' +
        '<div class="area-reservada" id="area-interacao-balanceamento" style="margin-top:16px">' +
          '<strong>Área de interação</strong>' +
          'Espaço reservado para os campos de coeficientes e mensagens de resultado.' +
        '</div>' +
      '</div>';
  }

  QM.app.registrarJogo(metadados, render);
})(window.QM = window.QM || {});