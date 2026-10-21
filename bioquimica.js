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
    metadados: { id: 'bioquimica', titulo: 'Reconstrua a Proteína', materia: 'Bioquímica', topicos: ['Biomoléculas', 'Proteínas', 'DNA/RNA', 'Metabolismo'], dificuldade: 'Médio', descricao: 'Revise Bioquímica com questões aleatórias de nível médio.', rota: '#/jogo/bioquimica' },
    tema: 'organica',
    titulo: "Bioquímica",
    materia: "Bioquímica",
    marca: "BIO",
    introducao: 'Rodada com 5 questões aleatórias de nível médio, preparadas para revisar conteúdos do ENEM.',
    bancoPerguntas: [
  {
    "pergunta": "Após uma refeição rica em carboidratos, qual molécula é usada pelos animais para armazenar glicose principalmente no fígado e nos músculos?",
    "opcoes": [
      "Celulose",
      "Glicogênio",
      "Quitina",
      "Amido"
    ],
    "respostaCorreta": 1,
    "explicacao": "O glicogênio é um polissacarídeo de reserva energética dos animais, armazenado especialmente no fígado e nos músculos."
  },
  {
    "pergunta": "Uma enzima deixa de funcionar adequadamente após exposição a temperatura muito elevada. Qual explicação é mais provável?",
    "opcoes": [
      "A enzima virou um carboidrato",
      "O calor alterou sua estrutura tridimensional",
      "A enzima foi convertida em DNA",
      "O substrato deixou de possuir átomos"
    ],
    "respostaCorreta": 1,
    "explicacao": "Temperaturas elevadas podem desnaturar proteínas, alterando a forma do sítio ativo e reduzindo sua atividade."
  },
  {
    "pergunta": "Qual é a principal diferença entre o DNA e o RNA quanto à pentose presente?",
    "opcoes": [
      "DNA tem ribose e RNA tem glicose",
      "DNA tem desoxirribose e RNA tem ribose",
      "Ambos têm apenas frutose",
      "RNA não possui açúcar"
    ],
    "respostaCorreta": 1,
    "explicacao": "O DNA contém desoxirribose, enquanto o RNA contém ribose."
  },
  {
    "pergunta": "Durante a respiração celular aeróbia, a maior parte do ATP é produzida em qual etapa?",
    "opcoes": [
      "Glicólise",
      "Fermentação lática",
      "Fosforilação oxidativa",
      "Replicação do DNA"
    ],
    "respostaCorreta": 2,
    "explicacao": "A fosforilação oxidativa, associada à cadeia transportadora de elétrons na membrana interna mitocondrial, produz a maior parte do ATP."
  },
  {
    "pergunta": "Qual é o produto líquido energético da glicólise por molécula de glicose?",
    "opcoes": [
      "2 ATP",
      "4 ATP líquidos",
      "36 ATP",
      "Nenhum ATP"
    ],
    "respostaCorreta": 0,
    "explicacao": "A glicólise produz 4 ATP, mas consome 2 ATP; o saldo líquido é de 2 ATP por glicose."
  },
  {
    "pergunta": "Uma pessoa com alimentação muito pobre em proteínas pode ter prejuízo na cicatrização. Isso ocorre porque proteínas:",
    "opcoes": [
      "São usadas exclusivamente para armazenar informação genética",
      "Participam da formação de tecidos e de processos de reparo",
      "Impedem toda reação química celular",
      "Substituem diretamente todas as vitaminas"
    ],
    "respostaCorreta": 1,
    "explicacao": "Proteínas estruturais e enzimas participam da construção, manutenção e reparação dos tecidos."
  },
  {
    "pergunta": "Qual grupo de moléculas é formado principalmente por aminoácidos unidos por ligações peptídicas?",
    "opcoes": [
      "Lipídios",
      "Proteínas",
      "Ácidos nucleicos",
      "Sais minerais"
    ],
    "respostaCorreta": 1,
    "explicacao": "Proteínas são polímeros de aminoácidos conectados por ligações peptídicas."
  },
  {
    "pergunta": "Na fotossíntese, a energia luminosa é convertida principalmente em energia química armazenada em moléculas orgânicas. Qual molécula é sintetizada no ciclo de Calvin como produto direto utilizado para formar açúcares?",
    "opcoes": [
      "G3P (gliceraldeído-3-fosfato)",
      "Oxigênio molecular",
      "Ácido lático",
      "Ureia"
    ],
    "respostaCorreta": 0,
    "explicacao": "O ciclo de Calvin utiliza CO₂, ATP e NADPH para produzir G3P, que pode ser utilizado na síntese de carboidratos."
  },
  {
    "pergunta": "Qual é a função principal dos fosfolipídios nas células?",
    "opcoes": [
      "Armazenar informação hereditária",
      "Formar a bicamada das membranas celulares",
      "Catalisar todas as reações metabólicas",
      "Transportar oxigênio no sangue"
    ],
    "respostaCorreta": 1,
    "explicacao": "Por serem anfipáticos, os fosfolipídios organizam-se em bicamada e constituem a base estrutural das membranas celulares."
  },
  {
    "pergunta": "Em uma situação de exercício intenso, com oferta insuficiente de oxigênio para atender à demanda muscular, a fermentação lática permite:",
    "opcoes": [
      "Produzir mais ATP que a respiração aeróbia",
      "Regenerar NAD⁺ para manter a glicólise",
      "Transformar proteínas diretamente em DNA",
      "Interromper toda produção de ATP"
    ],
    "respostaCorreta": 1,
    "explicacao": "A conversão de piruvato em lactato regenera NAD⁺, permitindo que a glicólise continue produzindo pequenas quantidades de ATP."
  },
  {
    "pergunta": "Qual base nitrogenada está presente no RNA no lugar da timina encontrada no DNA?",
    "opcoes": [
      "Adenina",
      "Citosina",
      "Uracila",
      "Guanina"
    ],
    "respostaCorreta": 2,
    "explicacao": "No RNA, a uracila ocupa o lugar da timina; adenina, citosina e guanina ocorrem nos dois ácidos nucleicos."
  },
  {
    "pergunta": "A falta de insulina prejudica o controle da glicemia porque esse hormônio normalmente:",
    "opcoes": [
      "Aumenta a entrada de glicose em determinados tecidos e favorece seu armazenamento",
      "Quebra diretamente o DNA",
      "Impede a digestão de proteínas no estômago",
      "Transforma glicose em oxigênio"
    ],
    "respostaCorreta": 0,
    "explicacao": "A insulina favorece a captação de glicose por tecidos como músculo e tecido adiposo e estimula processos de armazenamento, ajudando a reduzir a glicemia."
  },
  {
    "pergunta": "Qual vitamina é necessária para a síntese adequada de colágeno e sua deficiência pode causar sangramento gengival e dificuldade de cicatrização?",
    "opcoes": [
      "Vitamina C",
      "Vitamina D",
      "Vitamina K",
      "Vitamina B12"
    ],
    "respostaCorreta": 0,
    "explicacao": "A vitamina C participa da síntese e estabilização do colágeno; sua deficiência pode causar escorbuto."
  },
  {
    "pergunta": "Qual é o papel do ATP no metabolismo celular?",
    "opcoes": [
      "Armazenar permanentemente a informação genética",
      "Atuar como intermediário de transferência de energia",
      "Formar exclusivamente a parede celular vegetal",
      "Substituir todas as enzimas"
    ],
    "respostaCorreta": 1,
    "explicacao": "O ATP transfere energia entre reações celulares, sendo consumido em processos que necessitam de energia."
  },
  {
    "pergunta": "Uma mutação altera a sequência de bases de um gene. Qual consequência é possível?",
    "opcoes": [
      "Nunca haverá efeito na célula",
      "A sequência de aminoácidos de uma proteína pode ser alterada",
      "Todos os lipídios serão convertidos em glicose",
      "O número de cromossomos sempre dobrará"
    ],
    "respostaCorreta": 1,
    "explicacao": "Uma mutação pode alterar códons e modificar a sequência de aminoácidos de uma proteína, embora algumas mutações não alterem a proteína."
  }
]
  });
})(window.QM = window.QM || {});
