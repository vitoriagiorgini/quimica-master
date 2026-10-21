/* Quiz de múltipla escolha com questões sorteadas para preparação ao ENEM.
   Cada rodada contém 5 perguntas de nível médio, sem repetição na mesma rodada. */
(function (QM) {
  'use strict';

  function escapar(valor) {
    return String(valor == null ? '' : valor).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function embaralhar(lista) {
    var copia = lista.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temporario = copia[i];
      copia[i] = copia[j];
      copia[j] = temporario;
    }
    return copia;
  }

  function registrar(config) {
    var estado = {};

    function reiniciar() {
      config.perguntas = embaralhar(config.bancoPerguntas).slice(0, 5);
      estado.indice = 0;
      estado.pontuacao = 0;
      estado.respondida = false;
      estado.selecao = null;
      estado.feedback = null;
      estado.finalizado = false;
    }
    reiniciar();

    function render() {
      if (estado.finalizado) {
        return '<section class="qm-jogo qm-tema-' + config.tema + '"><a class="qm-voltar" href="#/">← Voltar ao catálogo</a>' +
          '<header class="qm-jogo-cabecalho"><div><p class="qm-selo">' + config.materia +
          '</p><h1 class="qm-titulo">' + config.titulo + '</h1><p class="qm-intro-texto">Rodada concluída!</p></div>' +
          '<div class="qm-marca" aria-hidden="true">' + config.marca + '</div></header><section class="qm-sessao">' +
          '<div class="qm-painel"><h2 class="qm-subtitulo">Você fez ' + estado.pontuacao + ' de 50 pontos</h2><p>Você acertou ' +
          (estado.pontuacao / 10) + ' de 5 perguntas.</p><p>' + mensagemResultado(estado.pontuacao) + '</p><div class="qm-acoes">' +
          '<button type="button" class="qm-botao qm-botao-primario" data-custom-acao="reiniciar">Nova rodada (5 perguntas)</button>' +
          '<a class="qm-botao qm-botao-secundario" href="#/">Voltar ao catálogo</a></div></div></section></section>';
      }

      var q = config.perguntas[estado.indice];
      var alternativas = q.opcoes.map(function (opcao, i) {
        var classe = 'qm-alternativa';
        if (estado.respondida && i === q.respostaCorreta) classe += ' qm-correta';
        if (estado.respondida && i === estado.selecao && i !== q.respostaCorreta) classe += ' qm-incorreta';
        return '<button type="button" class="' + classe + '" data-custom-acao="responder" data-indice="' + i + '"' +
          (estado.respondida ? ' disabled' : '') + '><span class="qm-alternativa-letra">' + String.fromCharCode(65 + i) +
          '</span><span>' + escapar(opcao) + '</span></button>';
      }).join('');
      var feedback = estado.respondida
        ? '<div class="qm-feedback"><strong>' + (estado.feedback.correta ? 'Resposta correta!' : 'Resposta incorreta.') +
          '</strong><p>' + escapar(q.explicacao) + '</p></div>' : '';
      var textoBotao = estado.indice === 4 ? 'Ver resultado' : 'Próxima pergunta';

      return '<section class="qm-jogo qm-tema-' + config.tema + '"><a class="qm-voltar" href="#/">← Voltar ao catálogo</a>' +
        '<header class="qm-jogo-cabecalho"><div><p class="qm-selo">' + config.materia + '</p><h1 class="qm-titulo">' +
        config.titulo + '</h1><p class="qm-intro-texto">' + config.introducao + '</p></div><div class="qm-marca" aria-hidden="true">' +
        config.marca + '</div></header><section class="qm-sessao"><div class="qm-painel">' +
        '<div class="qm-resumo-regras"><span>Pergunta ' + (estado.indice + 1) + ' de 5</span><span>Pontuação: ' + estado.pontuacao +
        ' / 50</span></div><h2 class="qm-subtitulo qm-pergunta">' + escapar(q.pergunta) +
        '</h2><div class="qm-alternativas" role="group" aria-label="Alternativas">' + alternativas + '</div>' + feedback +
        '<div class="qm-acoes">' + (estado.respondida ? '<button type="button" class="qm-botao qm-botao-primario" data-custom-acao="proxima">' +
        textoBotao + ' →</button>' : '') + '</div></div></section></section>';
    }

    function mensagemResultado(pontos) {
      if (pontos === 50) return 'Excelente! Você acertou todas as questões.';
      if (pontos >= 30) return 'Bom trabalho! Revise as explicações para consolidar o conteúdo.';
      return 'Continue estudando! Reveja as explicações e tente uma nova rodada.';
    }

    QM.app.registrarJogo(config.metadados, function () { return render(); });
    document.addEventListener('click', function (e) {
      var botao = e.target.closest && e.target.closest('[data-custom-acao]');
      if (!botao) return;
      var raiz = botao.closest('.qm-jogo');
      if (!raiz || !raiz.querySelector('.qm-titulo') || raiz.querySelector('.qm-titulo').textContent !== config.titulo) return;
      var acao = botao.getAttribute('data-custom-acao');
      if (acao === 'reiniciar') reiniciar();
      else if (acao === 'responder' && !estado.respondida) {
        estado.selecao = Number(botao.getAttribute('data-indice'));
        estado.respondida = true;
        var pergunta = config.perguntas[estado.indice];
        var correta = estado.selecao === pergunta.respostaCorreta;
        if (correta) estado.pontuacao += 10;
        estado.feedback = { correta: correta };
      } else if (acao === 'proxima' && estado.respondida) {
        if (estado.indice === 4) estado.finalizado = true;
        else {
          estado.indice++;
          estado.respondida = false;
          estado.selecao = null;
          estado.feedback = null;
        }
      } else return;
      QM.router.rotear();
    });
  }

  registrar({
    metadados: { id: 'quimica-geral', titulo: 'Fundamentos da Química', materia: 'Química Geral', topicos: ['Propriedades da matéria', 'Estequiometria', 'Soluções', 'Reações químicas'], dificuldade: 'Médio', descricao: 'Pratique conceitos de Química Geral com questões aleatórias de nível médio.', rota: '#/jogo/quimica-geral' },
    tema: 'organica',
    titulo: "Química Geral",
    materia: "Química Geral",
    marca: "QG",
    introducao: 'Rodada com 5 questões aleatórias de nível médio, preparadas para revisar conteúdos do ENEM.',
    bancoPerguntas: [
  {
    "pergunta": "Uma amostra de material tem massa de 120 g e volume de 40 cm³. Qual é sua densidade?",
    "opcoes": [
      "0,3 g/cm³",
      "3,0 g/cm³",
      "4,0 g/cm³",
      "80 g/cm³"
    ],
    "respostaCorreta": 1,
    "explicacao": "A densidade é calculada por d = m/V. Assim, 120 g ÷ 40 cm³ = 3,0 g/cm³."
  },
  {
    "pergunta": "Para separar uma mistura de água e etanol, líquidos miscíveis com diferentes pontos de ebulição, utiliza-se principalmente:",
    "opcoes": [
      "Filtração simples",
      "Decantação",
      "Destilação fracionada",
      "Imantação"
    ],
    "respostaCorreta": 2,
    "explicacao": "A destilação fracionada permite separar líquidos miscíveis com diferentes temperaturas de ebulição."
  },
  {
    "pergunta": "Quantos mols existem em 18 g de água (H₂O)? Considere massa molar igual a 18 g/mol.",
    "opcoes": [
      "0,5 mol",
      "1 mol",
      "2 mol",
      "18 mol"
    ],
    "respostaCorreta": 1,
    "explicacao": "A quantidade de matéria é n = m/M. Logo, 18 g ÷ 18 g/mol = 1 mol."
  },
  {
    "pergunta": "Na reação 2 H₂ + O₂ → 2 H₂O, quantos mols de água são formados a partir de 4 mol de H₂, com oxigênio em excesso?",
    "opcoes": [
      "1 mol",
      "2 mol",
      "4 mol",
      "8 mol"
    ],
    "respostaCorreta": 2,
    "explicacao": "A proporção entre H₂ e H₂O é 2:2, isto é, 1:1. Portanto, 4 mol de H₂ formam 4 mol de água."
  },
  {
    "pergunta": "Uma solução contém 20 g de sal dissolvidos em 500 mL de solução. Qual é sua concentração comum em g/L?",
    "opcoes": [
      "10 g/L",
      "20 g/L",
      "40 g/L",
      "100 g/L"
    ],
    "respostaCorreta": 2,
    "explicacao": "500 mL correspondem a 0,5 L. A concentração comum é 20 g ÷ 0,5 L = 40 g/L."
  },
  {
    "pergunta": "Uma solução aquosa apresenta pH 2. Em comparação com uma solução de pH 4, ela apresenta concentração de H⁺:",
    "opcoes": [
      "10 vezes menor",
      "2 vezes maior",
      "100 vezes maior",
      "100 vezes menor"
    ],
    "respostaCorreta": 2,
    "explicacao": "Cada unidade de pH representa uma variação de dez vezes. A diferença de duas unidades corresponde a 10² = 100 vezes mais H⁺."
  },
  {
    "pergunta": "Ao dissolver sal de cozinha em água, a temperatura de ebulição da solução tende a ser:",
    "opcoes": [
      "Menor que a da água pura",
      "Maior que a da água pura",
      "Sempre igual à da água pura",
      "Independente da quantidade de soluto"
    ],
    "respostaCorreta": 1,
    "explicacao": "A presença de um soluto não volátil, como o sal, eleva a temperatura de ebulição da água."
  },
  {
    "pergunta": "Qual alternativa representa uma transformação química?",
    "opcoes": [
      "Gelo derretendo",
      "Papel sendo cortado",
      "Ferro enferrujando",
      "Álcool evaporando"
    ],
    "respostaCorreta": 2,
    "explicacao": "Na ferrugem, o ferro reage com substâncias do ambiente e forma novos compostos, caracterizando transformação química."
  },
  {
    "pergunta": "Um átomo neutro possui número atômico 11 e número de massa 23. Quantos nêutrons ele possui?",
    "opcoes": [
      "11",
      "12",
      "23",
      "34"
    ],
    "respostaCorreta": 1,
    "explicacao": "O número de nêutrons é o número de massa menos o número atômico: 23 − 11 = 12."
  },
  {
    "pergunta": "Qual tipo de ligação ocorre predominantemente entre o sódio (Na) e o cloro (Cl) no NaCl?",
    "opcoes": [
      "Covalente apolar",
      "Metálica",
      "Iônica",
      "Ponte de hidrogênio"
    ],
    "respostaCorreta": 2,
    "explicacao": "O sódio tende a perder um elétron e o cloro a recebê-lo, formando íons que se atraem eletrostaticamente."
  },
  {
    "pergunta": "Em uma reação exotérmica, o sistema:",
    "opcoes": [
      "Absorve calor do ambiente",
      "Libera calor para o ambiente",
      "Não troca energia",
      "Sempre aumenta sua massa"
    ],
    "respostaCorreta": 1,
    "explicacao": "Uma reação exotérmica libera energia na forma de calor para o ambiente; sua variação de entalpia é negativa."
  },
  {
    "pergunta": "Qual fator geralmente aumenta a velocidade de uma reação química entre reagentes em solução?",
    "opcoes": [
      "Diminuir a temperatura",
      "Diminuir a concentração dos reagentes",
      "Adicionar um catalisador",
      "Reduzir o contato entre reagentes"
    ],
    "respostaCorreta": 2,
    "explicacao": "Um catalisador oferece um caminho reacional com menor energia de ativação, aumentando a velocidade sem ser consumido globalmente."
  },
  {
    "pergunta": "Na reação Zn + Cu²⁺ → Zn²⁺ + Cu, qual espécie sofre oxidação?",
    "opcoes": [
      "Cu²⁺",
      "Zn",
      "Cu",
      "Zn²⁺"
    ],
    "respostaCorreta": 1,
    "explicacao": "O zinco passa de NOX 0 para +2, perdendo elétrons; portanto, sofre oxidação."
  },
  {
    "pergunta": "Uma mistura apresenta água, areia e sal totalmente dissolvido. Qual sequência permite recuperar a areia e, depois, obter o sal sólido?",
    "opcoes": [
      "Destilação e imantação",
      "Filtração e evaporação",
      "Decantação e peneiração",
      "Centrifugação e fusão"
    ],
    "respostaCorreta": 1,
    "explicacao": "A filtração retém a areia; depois, a evaporação da água permite obter o sal que estava dissolvido."
  },
  {
    "pergunta": "Qual afirmação descreve corretamente um equilíbrio químico dinâmico?",
    "opcoes": [
      "A reação para completamente",
      "As concentrações de reagentes e produtos são necessariamente iguais",
      "As velocidades das reações direta e inversa são iguais",
      "Só existem produtos no recipiente"
    ],
    "respostaCorreta": 2,
    "explicacao": "No equilíbrio dinâmico, as reações direta e inversa continuam ocorrendo com velocidades iguais, mantendo constantes as concentrações macroscópicas."
  }
]
  });
})(window.QM = window.QM || {});
