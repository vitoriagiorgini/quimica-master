/* ============ MÓDULO DE JOGO: Encontre o Impostor ============
   Independente dos demais módulos. Nesta etapa: apenas estrutura visual.
   MECÂNICA FUTURA: rodadas, seleção do impostor, feedback e pontuação
   devem ser implementados dentro deste arquivo, sem alterar a plataforma. */
(function (QM) {
  'use strict';

  var metadados = {
    id: 'impostor',
    titulo: 'Encontre o Impostor',
    materia: 'Química Geral',
    topicos: ['Famílias químicas', 'Classificação dos elementos'],
    dificuldade: 'Médio',
    descricao: 'Analise grupos de elementos e identifique qual deles não pertence ao conjunto, justificando pela estrutura eletrônica e pelas propriedades periódicas.',
    rota: '#/jogo/impostor'
  };

  function render() {
    return '' +
      '<div class="pagina-jogo">' +
        '<a class="voltar" href="#/">← Voltar ao catálogo</a>' +
        '<h1 class="titulo-secao">' + metadados.titulo + '</h1>' +
        '<p class="subtitulo-secao">' + metadados.descricao + '</p>' +
        '<h2>Como jogar</h2>' +
        '<ul class="lista-instrucoes">' +
          '<li>Leia o desafio apresentado e observe o grupo de elementos.</li>' +
          '<li>Identifique qual elemento <strong>não pertence</strong> ao grupo.</li>' +
          '<li>Selecione o impostor e receba a explicação química da resposta.</li>' +
          '<li>Acumule acertos ao longo das rodadas e conclua a partida.</li>' +
        '</ul>' +
        '<div class="area-reservada" id="area-mecanica-impostor">' +
          '<strong>Área principal do jogo</strong>' +
          'Mecânica em desenvolvimento — estrutura preparada para implementação futura.' +
        '</div>' +
        '<div class="area-reservada" id="area-resultado-impostor" style="margin-top:16px">' +
          '<strong>Resultado da partida</strong>' +
          'Espaço reservado para pontuação e mensagens de fim de jogo.' +
        '</div>' +
      '</div>';
  }

  QM.app.registrarJogo(metadados, render);
})(window.QM = window.QM || {});