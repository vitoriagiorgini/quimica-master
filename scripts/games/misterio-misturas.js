/* ============ MÓDULO DE JOGO: Mistério das Misturas ============
   Banco independente: 6 casos por nível, todos apresentados em cada partida.
   A mecânica comum (níveis, dicas, conferência, reinício, resultado e recordes)
   vem de QM.quiz. Cada caso mostra a mistura e pede o método de separação.
   Para adicionar um caso, siga o formato de "caso()" e confirme que apenas uma
   alternativa resolve a situação descrita. */
(function (QM) {
  'use strict';

  function escapar(texto) {
    return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function cartao(titulo, descricao) {
    /* O tipo da mistura já aparece na etiqueta da questão (topico). */
    return '<div class="qm-cartao-mistura"><h3>' + escapar(titulo) + '</h3><p class="qm-texto-suave">' + escapar(descricao) + '</p></div>';
  }

  /* A primeira alternativa de "opcoes" é sempre a correta; o QM.quiz embaralha a ordem na tela. */
  function caso(id, nivel, titulo, tipo, descricao, opcoes, dica, explicacao) {
    return {
      id: id,
      nivel: nivel,
      topico: tipo,
      enunciado: 'Qual é o método ideal para separar esta mistura?',
      visual: cartao(titulo, descricao),
      tipo: 'escolha',
      opcoes: opcoes.map(function (texto, indice) { return { id: String.fromCharCode(97 + indice), texto: texto }; }),
      correta: 'a',
      dica: dica,
      explicacao: explicacao
    };
  }

  QM.quiz.registrar({
    metadados: {
      id: 'misterio-misturas',
      titulo: 'Mistério das Misturas',
      materia: 'Química Analítica',
      topicos: ['Classificação de misturas', 'Métodos de separação', 'Propriedades físicas'],
      dificuldade: '3 níveis',
      descricao: 'Investigue misturas, identifique suas propriedades e escolha o método de separação adequado, de sólidos e líquidos simples a gases e soluções.',
      rota: '#/jogo/misterio-misturas'
    },
    tema: 'misturas',
    marca: 'NaCl',
    introducao: 'Toda mistura guarda pistas. Observe as fases, o estado físico e as propriedades das substâncias para descobrir como separá-las.',
    regras: [
      'Escolha um nível e resolva seis casos de misturas.',
      'Leia a descrição do caso e identifique o tipo de mistura: homogênea ou heterogênea, e os estados físicos envolvidos.',
      'Analise as propriedades físicas, como densidade, solubilidade, ponto de ebulição e atração magnética, e escolha o método de separação.',
      'Use a dica quando precisar. Depois de responder, leia a explicação para entender por que o método funciona.'
    ],
    niveis: [
      { id: 'iniciante', titulo: 'Iniciante', descricao: 'Misturas heterogêneas simples.' },
      { id: 'intermediario', titulo: 'Intermediário', descricao: 'Soluções, densidades e propriedades específicas.' },
      { id: 'avancado', titulo: 'Avançado', descricao: 'Líquidos miscíveis, gases e sequências de separação.' }
    ],
    questoes: [
      /* Iniciante — misturas heterogêneas simples. */
      caso('mis-01', 'iniciante', 'Água + Areia', 'Heterogênea (sólido e líquido)',
        'Uma amostra de água do rio contém areia fina em suspensão, e o objetivo é reter o sólido em um material poroso.',
        ['Filtração', 'Destilação simples', 'Evaporação', 'Sublimação'],
        'Pense em um material que deixa o líquido passar, mas segura as partículas sólidas.',
        'A filtração retém o sólido insolúvel (areia) no meio filtrante, enquanto o líquido atravessa.'),
      caso('mis-02', 'iniciante', 'Água + Óleo', 'Heterogênea (líquido e líquido)',
        'Dois líquidos imiscíveis, que não se misturam, formam duas fases bem distintas.',
        ['Funil de decantação', 'Destilação fracionada', 'Peneiração', 'Sublimação'],
        'Em líquidos imiscíveis, o mais denso fica embaixo, e existe uma vidraria com torneira para escoá-lo.',
        'O funil de decantação (ou de separação) escoa primeiro o líquido mais denso pela torneira, deixando o outro no funil.'),
      caso('mis-03', 'iniciante', 'Arroz + Pedrinhas', 'Heterogênea (sólido e sólido)',
        'Em um pacote de arroz há pequenas pedras de tamanho semelhante aos grãos, que precisam ser retiradas uma a uma.',
        ['Catação', 'Filtração', 'Destilação simples', 'Evaporação'],
        'Os componentes são grãos visíveis e fáceis de separar à mão.',
        'Na catação, os fragmentos são separados manualmente. É o método mais simples para sólidos visíveis e de tamanho parecido.'),
      caso('mis-04', 'iniciante', 'Limalha de Ferro + Areia', 'Heterogênea (sólido e sólido)',
        'Pó de ferro e areia foram misturados. Um dos componentes é atraído por ímãs e o outro não.',
        ['Separação magnética', 'Filtração', 'Decantação', 'Destilação'],
        'Use uma propriedade que só um dos componentes possui: a atração por um ímã.',
        'O ferro é atraído pelo ímã e a areia não. A separação magnética remove o ferro sem dissolver nem aquecer a mistura.'),
      caso('mis-05', 'iniciante', 'Areia + Brita', 'Heterogênea (sólido e sólido)',
        'Dois sólidos de granulometrias bem diferentes: grãos finos de areia e pedras grandes.',
        ['Peneiração', 'Evaporação', 'Destilação simples', 'Centrifugação'],
        'O tamanho das partículas é a diferença principal. Pense na ferramenta usada em obras.',
        'A peneiração (tamisação) usa uma malha. Os grãos menores passam pelos furos e as partículas maiores ficam retidas.'),
      caso('mis-06', 'iniciante', 'Água barrenta em repouso', 'Heterogênea (sólido e líquido)',
        'Em um tanque, partículas de argila mais densas que a água se depositam lentamente no fundo, e a água clara fica por cima.',
        ['Decantação', 'Destilação', 'Sublimação', 'Catação'],
        'Aqui a própria gravidade separa as fases, sem precisar de filtro.',
        'Na decantação, o sólido mais denso se deposita no fundo com o repouso, e o líquido sobrenadante pode ser transferido para outro recipiente.'),

      /* Intermediário — soluções e propriedades específicas. */
      caso('mis-07', 'intermediario', 'Água + Sal de cozinha', 'Homogênea (sólido e líquido)',
        'É preciso recuperar tanto o sal quanto a água pura a partir de uma solução homogênea.',
        ['Destilação simples', 'Decantação', 'Filtração', 'Peneiração'],
        'O sal não evapora, mas a água sim. Para recuperar a água também, é preciso condensá-la.',
        'A destilação simples evapora o componente mais volátil (água) e o condensa em outro frasco, deixando o sal no balão.'),
      caso('mis-08', 'intermediario', 'Serragem + Areia', 'Heterogênea (sólido e sólido)',
        'Dois sólidos heterogêneos: um tem densidade menor que a da água, e o outro, maior.',
        ['Flotação', 'Destilação', 'Centrifugação', 'Sublimação'],
        'Ao adicionar água, um dos sólidos flutua e o outro afunda.',
        'Ao adicionar água, a serragem flutua por ser menos densa e a areia afunda, o que permite separá-las por flotação.'),
      caso('mis-09', 'intermediario', 'Sal + Areia', 'Heterogênea (sólido e sólido)',
        'Grãos finos de sal e de areia estão misturados, e a catação seria impraticável. Um dos sólidos é solúvel em água; o outro, não.',
        ['Dissolução fracionada seguida de filtração', 'Sublimação', 'Catação', 'Destilação fracionada'],
        'Use um solvente que dissolva apenas um dos componentes e depois separe o sólido que sobrou.',
        'Ao adicionar água, apenas o sal se dissolve. A filtração retém a areia, e a solução pode então ser evaporada para recuperar o sal.'),
      caso('mis-10', 'intermediario', 'Sangue em tubo de ensaio', 'Heterogênea (sólido disperso em líquido)',
        'No laboratório, é preciso separar o plasma das células sanguíneas, que sedimentam lentamente por conta própria.',
        ['Centrifugação', 'Destilação simples', 'Sublimação', 'Peneiração'],
        'O objetivo é acelerar a sedimentação com um equipamento que gira em alta rotação.',
        'A centrifuga gera uma força muito maior que a gravidade, que empurra as células mais densas para o fundo do tubo e deixa o plasma por cima.'),
      caso('mis-11', 'intermediario', 'Naftalina + Areia', 'Heterogênea (sólido e sólido)',
        'Dois sólidos: a naftalina passa diretamente do estado sólido para o gasoso com aquecimento suave, e a areia não.',
        ['Sublimação', 'Filtração', 'Decantação', 'Flotação'],
        'Procure o método que aproveita a mudança direta de sólido para gás.',
        'Aquecendo levemente a mistura, a naftalina sublima e pode ser recolhida em uma superfície fria. A areia permanece no recipiente.'),
      caso('mis-12', 'intermediario', 'Água do mar em salinas', 'Homogênea (sólido e líquido)',
        'Em tanques rasos expostos ao sol e ao vento, só interessa recuperar o sal dissolvido na água do mar.',
        ['Evaporação', 'Centrifugação', 'Catação', 'Filtração'],
        'Quando só o sólido importa, não é necessário aproveitar a água.',
        'A água evapora com o calor do sol e o sal, que não evapora, se acumula no fundo do tanque. Como não é preciso recuperar a água, a evaporação basta.'),

      /* Avançado — líquidos miscíveis, gases e sequências. */
      caso('mis-13', 'avancado', 'Água + Álcool', 'Homogênea (líquido e líquido)',
        'Mistura homogênea de dois líquidos miscíveis com pontos de ebulição diferentes.',
        ['Destilação fracionada', 'Destilação simples', 'Decantação', 'Flotação'],
        'Dois líquidos voláteis exigem uma coluna que separe os vapores por temperatura.',
        'A coluna de fracionamento enriquece o vapor no líquido de menor ponto de ebulição, o que permite separar líquidos miscíveis.'),
      caso('mis-14', 'avancado', 'Oxigênio + Nitrogênio (ar atmosférico)', 'Homogênea (gás e gás)',
        'Como separar individualmente os gases componentes do ar atmosférico, para uso industrial?',
        ['Liquefação fracionada', 'Filtração', 'Decantação', 'Sublimação'],
        'Transforme o ar em líquido por resfriamento e compressão. Cada gás volta a ferver em uma temperatura própria.',
        'O ar é resfriado e comprimido até se liquefazer. Em seguida, sua destilação fracionada separa os componentes pelos pontos de ebulição.'),
      caso('mis-15', 'avancado', 'Corantes de uma tinta preta', 'Homogênea (mistura de solutos)',
        'Uma tinta contém vários pigmentos dissolvidos. Cada pigmento tem afinidade diferente por um solvente que sobe por uma fita de papel.',
        ['Cromatografia', 'Filtração', 'Centrifugação', 'Peneiração'],
        'Os componentes viajam em velocidades diferentes por um suporte, conforme sua afinidade com a fase móvel.',
        'Na cromatografia em papel, cada pigmento é arrastado pelo solvente a uma velocidade distinta, formando faixas separadas no papel.'),
      caso('mis-16', 'avancado', 'Ferro + Areia + Sal de cozinha', 'Heterogênea (três sólidos)',
        'Três sólidos misturados: o ferro é magnético, o sal é solúvel em água e a areia não é solúvel nem magnética. Qual é uma sequência correta de separação?',
        ['Separação magnética, dissolução em água com filtração e evaporação',
          'Destilação simples, filtração e catação',
          'Evaporação, separação magnética e flotação',
          'Centrifugação, sublimação e decantação'],
        'Comece pelo componente que se separa sem adicionar nada. Depois use um solvente para o que se dissolve.',
        'O ímã retira o ferro. Ao adicionar água, o sal se dissolve e a areia é retida na filtração. A evaporação da solução recupera o sal.'),
      caso('mis-17', 'avancado', 'Iodo dissolvido em água', 'Homogênea (sólido e líquido)',
        'O iodo está dissolvido em água, mas é muito mais solúvel em um solvente orgânico imiscível com a água, como o cicloexano.',
        ['Extração por solvente em funil de separação', 'Destilação simples', 'Filtração', 'Peneiração'],
        'Adicione um segundo líquido que dissolva melhor o iodo e que não se misture com a água.',
        'Ao agitar com o solvente orgânico, o iodo migra para ele. As duas fases, imiscíveis, são separadas no funil de separação.'),
      caso('mis-18', 'avancado', 'Nitrato de potássio + Cloreto de sódio', 'Homogênea (dois sais dissolvidos)',
        'Dois sais dissolvidos em água quente. A solubilidade de um deles cai muito mais que a do outro ao esfriar a solução.',
        ['Cristalização fracionada', 'Filtração simples', 'Separação magnética', 'Peneiração'],
        'Resfrie a solução e observe qual sal deixa de ficar dissolvido primeiro.',
        'Ao resfriar, o sal cuja solubilidade diminui mais cristaliza primeiro e pode ser retirado. O outro permanece dissolvido na solução.')
    ]
  });
})(window.QM = window.QM || {});
