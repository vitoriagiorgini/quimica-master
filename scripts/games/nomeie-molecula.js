/* ============ MÓDULO DE JOGO: Nomeie a Molécula ============
   Banco independente: 8 questões por nível, sem dependências externas.
   A mecânica comum (sorteio, dicas, respostas e resultado) vem de QM.quiz.
   Para adicionar uma questão, siga os objetos abaixo e confira as ligações,
   a fórmula molecular e a existência de uma única alternativa correta. */
(function (QM) {
  'use strict';

  function escapar(texto) {
    return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function opcoes(a, b, c, d) {
    return [
      { id: 'a', texto: a },
      { id: 'b', texto: b },
      { id: 'c', texto: c },
      { id: 'd', texto: d }
    ];
  }

  /* Cada grupo fica ancorado em seu primeiro átomo. Assim, as ramificações
     se ligam ao C de CH/CH₂ e não à letra H. Os traços param antes das letras.
     "ordens" descreve as ligações da esquerda para a direita (1, 2 ou 3).
     "em" é o índice do grupo na cadeia, começando em zero. */
  function estrutura(id, formula, descricao, grupos, ordens, ramificacoes) {
    var larguras = { H: 22, C: 23, O: 24, OH: 46, Cl: 32, CH: 43, 'CH₂': 55, 'CH₃': 55, 'CH₄': 55 };
    var ramos = ramificacoes || [];
    var largura = Math.max(240, (grupos.length - 1) * 92 + 100);
    var altura = ramos.length ? 240 : 160;
    var eixoY = altura / 2;
    var inicioX = (largura - ((grupos.length - 1) * 92 + 55)) / 2 + 10;
    var nos = grupos.map(function (grupo, indice) {
      return { grupo: grupo, x: inicioX + indice * 92, y: eixoY };
    });
    var linhas = [];
    var textos = [];

    function ligar(a, b, ordem) {
      var vertical = a.x === b.x;
      var sentido = vertical ? (b.y > a.y ? 1 : -1) : 1;
      var x1 = vertical ? a.x : a.x + (larguras[a.grupo] || 55) - 3;
      var x2 = vertical ? b.x : b.x - 17;
      var y1 = vertical ? a.y + 22 * sentido : a.y;
      var y2 = vertical ? b.y - 22 * sentido : b.y;
      var deslocamentos = ordem === 3 ? [-6, 0, 6] : (ordem === 2 ? [-4, 4] : [0]);

      deslocamentos.forEach(function (deslocamento) {
        linhas.push('<line x1="' + (x1 + (vertical ? deslocamento : 0)) +
          '" y1="' + (y1 + (vertical ? 0 : deslocamento)) +
          '" x2="' + (x2 + (vertical ? deslocamento : 0)) +
          '" y2="' + (y2 + (vertical ? 0 : deslocamento)) + '"/>');
      });
    }

    for (var i = 0; i < grupos.length - 1; i += 1) {
      ligar(nos[i], nos[i + 1], ordens[i] || 1);
    }

    ramos.forEach(function (ramo) {
      var origem = nos[ramo.em];
      var destino = {
        grupo: ramo.grupo,
        x: origem.x,
        y: origem.y + (ramo.lado === 'baixo' ? 84 : -84)
      };
      ligar(origem, destino, ramo.ordem || 1);
      nos.push(destino);
    });

    nos.forEach(function (no) {
      textos.push('<text x="' + (no.x - 10) + '" y="' + (no.y + 10) + '">' +
        escapar(no.grupo) + '</text>');
    });

    return '<svg class="qm-estrutura" xmlns="http://www.w3.org/2000/svg"' +
      ' viewBox="0 0 ' + largura + ' ' + altura + '" width="100%" height="210"' +
      ' role="img" aria-labelledby="' + id + '-titulo ' + id + '-descricao" focusable="false">' +
      '<title id="' + id + '-titulo">Estrutura semidesenvolvida da molécula</title>' +
      '<desc id="' + id + '-descricao">' + escapar(descricao) + '</desc>' +
      '<g stroke="currentColor" stroke-width="2.8" stroke-linecap="round">' + linhas.join('') + '</g>' +
      '<g fill="currentColor" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600">' +
      textos.join('') + '</g></svg>' +
      '<p class="qm-formula">Fórmula molecular: <strong>' + escapar(formula) + '</strong></p>';
  }

  QM.quiz.registrar({
    metadados: {
      id: 'nomeie-molecula',
      titulo: 'Nomeie a Molécula',
      materia: 'Química Orgânica',
      topicos: ['Hidrocarbonetos', 'Grupos funcionais', 'Nomenclatura IUPAC'],
      dificuldade: '3 níveis',
      descricao: 'Observe estruturas, reconheça grupos funcionais e descubra o nome de moléculas, dos hidrocarbonetos às cadeias ramificadas.',
      rota: '#/jogo/nomeie-molecula'
    },
    tema: 'molecula',
    introducao: 'Cada estrutura conta uma história. Conte os carbonos, observe as ligações e escolha o nome que combina com a molécula.',
    regras: [
      'Escolha um nível e resolva seis moléculas sorteadas entre as oito disponíveis nele.',
      'Observe a estrutura semidesenvolvida e selecione uma das quatro alternativas.',
      'Um, dois ou três traços representam, respectivamente, ligações simples, duplas ou triplas.',
      'Use a dica quando precisar. Depois de responder, leia a explicação para entender o nome.'
    ],
    niveis: [
      { id: 'iniciante', titulo: 'Iniciante', descricao: 'Conte carbonos e reconheça ligações em hidrocarbonetos simples.' },
      { id: 'intermediario', titulo: 'Intermediário', descricao: 'Localize insaturações e identifique as principais funções oxigenadas.' },
      { id: 'avancado', titulo: 'Avançado', descricao: 'Desvende ramificações, ésteres e compostos halogenados.' }
    ],
    questoes: [
      /* Iniciante — hidrocarbonetos sem ramificações. */
      {
        id: 'mol-01', nivel: 'iniciante', topico: 'Alcanos',
        enunciado: 'Qual é o nome deste hidrocarboneto?',
        visual: estrutura('mol-01', 'CH₄',
          'Um átomo de carbono ligado a quatro átomos de hidrogênio: CH quatro.',
          ['CH₄'], []),
        tipo: 'escolha', opcoes: opcoes('Metano', 'Etano', 'Eteno', 'Metanol'), correta: 'a',
        dica: 'Há apenas um carbono. O prefixo associado a um carbono é met-.',
        explicacao: 'O único carbono faz quatro ligações simples com hidrogênios. Esse é o primeiro alcano da série: metano, de fórmula CH₄.'
      },
      {
        id: 'mol-02', nivel: 'iniciante', topico: 'Alcanos',
        enunciado: 'Conte os carbonos e nomeie a molécula.',
        visual: estrutura('mol-02', 'C₂H₆',
          'Dois grupos CH três unidos por uma ligação simples: CH três, ligação simples, CH três.',
          ['CH₃', 'CH₃'], [1]),
        tipo: 'escolha', opcoes: opcoes('Etano', 'Eteno', 'Etino', 'Propano'), correta: 'a',
        dica: 'Dois carbonos dão o prefixo et-. Observe se a ligação é simples, dupla ou tripla.',
        explicacao: 'A cadeia tem dois carbonos e apenas uma ligação simples entre eles. O prefixo et- e a terminação -ano formam etano.'
      },
      {
        id: 'mol-03', nivel: 'iniciante', topico: 'Alcanos',
        enunciado: 'Qual alternativa corresponde a esta cadeia?',
        visual: estrutura('mol-03', 'C₃H₈',
          'Cadeia CH três, CH dois, CH três, com duas ligações simples entre os grupos.',
          ['CH₃', 'CH₂', 'CH₃'], [1, 1]),
        tipo: 'escolha', opcoes: opcoes('Propano', 'Propeno', 'Butano', 'Metano'), correta: 'a',
        dica: 'O grupo CH₂ do meio também representa um carbono da cadeia.',
        explicacao: 'São três carbonos em sequência, sem ramificações nem ligações múltiplas. O nome é propano: prop- indica três carbonos e -ano indica um alcano.'
      },
      {
        id: 'mol-04', nivel: 'iniciante', topico: 'Alcanos',
        enunciado: 'Como se chama este hidrocarboneto de cadeia aberta?',
        visual: estrutura('mol-04', 'C₄H₁₀',
          'Cadeia CH três, CH dois, CH dois, CH três. Todas as ligações entre os carbonos são simples.',
          ['CH₃', 'CH₂', 'CH₂', 'CH₃'], [1, 1, 1]),
        tipo: 'escolha', opcoes: opcoes('Butano', 'But-1-eno', 'Pentano', 'Propano'), correta: 'a',
        dica: 'Conte cada grupo que contém a letra C. Quatro carbonos correspondem a but-.',
        explicacao: 'A cadeia contínua tem quatro carbonos unidos apenas por ligações simples. Portanto, seu nome é butano e sua fórmula molecular é C₄H₁₀.'
      },
      {
        id: 'mol-05', nivel: 'iniciante', topico: 'Alcanos',
        enunciado: 'Qual nome combina com a estrutura abaixo?',
        visual: estrutura('mol-05', 'C₅H₁₂',
          'Cadeia CH três, CH dois, CH dois, CH dois, CH três. Todas as ligações entre os grupos são simples.',
          ['CH₃', 'CH₂', 'CH₂', 'CH₂', 'CH₃'], [1, 1, 1, 1]),
        tipo: 'escolha', opcoes: opcoes('Pentano', 'Butano', 'Hexano', 'Pent-1-eno'), correta: 'a',
        dica: 'As duas extremidades CH₃ e os três grupos CH₂ somam quantos carbonos?',
        explicacao: 'Há cinco carbonos na cadeia principal. Como a cadeia é aberta, não ramificada e tem somente ligações simples, a molécula é o pentano.'
      },
      {
        id: 'mol-06', nivel: 'iniciante', topico: 'Alcenos',
        enunciado: 'Preste atenção na ligação central. Qual é o nome?',
        visual: estrutura('mol-06', 'C₂H₄',
          'Dois grupos CH dois ligados entre si por uma ligação dupla.',
          ['CH₂', 'CH₂'], [2]),
        tipo: 'escolha', opcoes: opcoes('Eteno', 'Etano', 'Etino', 'Propeno'), correta: 'a',
        dica: 'A dupla ligação entre carbonos é indicada pela terminação -eno.',
        explicacao: 'Dois carbonos dão et- e a ligação dupla dá -eno: eteno. Cada carbono completa suas quatro ligações com dois hidrogênios, resultando em C₂H₄.'
      },
      {
        id: 'mol-07', nivel: 'iniciante', topico: 'Alcenos',
        enunciado: 'Nomeie esta molécula com uma ligação dupla.',
        visual: estrutura('mol-07', 'C₃H₆',
          'CH dois ligado por ligação dupla a CH, que está ligado por ligação simples a CH três.',
          ['CH₂', 'CH', 'CH₃'], [2, 1]),
        tipo: 'escolha', opcoes: opcoes('Propeno', 'Propano', 'Eteno', 'Propino'), correta: 'a',
        dica: 'A molécula tem três carbonos e uma ligação dupla entre dois deles.',
        explicacao: 'A cadeia de três carbonos tem uma ligação dupla na extremidade. O prefixo prop- e a terminação -eno formam propeno, de fórmula C₃H₆.'
      },
      {
        id: 'mol-08', nivel: 'iniciante', topico: 'Alcinos',
        enunciado: 'Três traços entre os carbonos: qual é o nome da molécula?',
        visual: estrutura('mol-08', 'C₂H₂',
          'Hidrogênio ligado a carbono, ligação tripla entre os dois carbonos, e o segundo carbono ligado a hidrogênio: H, C, ligação tripla, C, H.',
          ['H', 'C', 'C', 'H'], [1, 3, 1]),
        tipo: 'escolha', opcoes: opcoes('Etino', 'Eteno', 'Etano', 'Propino'), correta: 'a',
        dica: 'A terminação -ino indica uma ligação tripla entre carbonos.',
        explicacao: 'A molécula tem dois carbonos unidos por uma ligação tripla, portanto se chama etino. Cada carbono também está ligado a um hidrogênio, dando C₂H₂.'
      },

      /* Intermediário — posições e funções oxigenadas. */
      {
        id: 'mol-09', nivel: 'intermediario', topico: 'Posição da insaturação',
        enunciado: 'Qual nome indica corretamente a posição da ligação dupla?',
        visual: estrutura('mol-09', 'C₄H₈',
          'Cadeia CH dois, dupla ligação, CH, ligação simples, CH dois, ligação simples, CH três.',
          ['CH₂', 'CH', 'CH₂', 'CH₃'], [2, 1, 1]),
        tipo: 'escolha', opcoes: opcoes('But-1-eno', 'But-2-eno', 'But-1-ino', 'Butano'), correta: 'a',
        dica: 'Comece a numeração pela extremidade mais próxima da dupla ligação.',
        explicacao: 'A cadeia tem quatro carbonos. Numerando a partir da esquerda, a dupla fica entre os carbonos 1 e 2. Usa-se o menor desses números no nome: but-1-eno.'
      },
      {
        id: 'mol-10', nivel: 'intermediario', topico: 'Posição da insaturação',
        enunciado: 'Identifique a ligação múltipla e sua posição.',
        visual: estrutura('mol-10', 'C₄H₆',
          'CH três ligado a carbono, ligação tripla entre os dois carbonos centrais, e ligação simples do último carbono central a CH três.',
          ['CH₃', 'C', 'C', 'CH₃'], [1, 3, 1]),
        tipo: 'escolha', opcoes: opcoes('But-2-ino', 'But-1-ino', 'But-2-eno', 'Butano'), correta: 'a',
        dica: 'A ligação tripla une os dois carbonos centrais de uma cadeia com quatro carbonos.',
        explicacao: 'A ligação tripla está entre os carbonos 2 e 3, qualquer que seja a ponta usada para numerar a cadeia. Quatro carbonos e tripla na posição 2 dão but-2-ino.'
      },
      {
        id: 'mol-11', nivel: 'intermediario', topico: 'Álcoois',
        enunciado: 'O grupo OH muda a função da molécula. Qual é o nome?',
        visual: estrutura('mol-11', 'CH₄O',
          'Um grupo CH três ligado por ligação simples ao oxigênio de um grupo OH.',
          ['CH₃', 'OH'], [1]),
        tipo: 'escolha', opcoes: opcoes('Metanol', 'Etanol', 'Metanal', 'Metano'), correta: 'a',
        dica: 'Conte somente os carbonos para escolher o prefixo. O OH caracteriza o álcool desta estrutura.',
        explicacao: 'Há um carbono ligado ao grupo hidroxila, OH. A função é álcool e recebe a terminação -ol. Assim, o nome é metanol; o oxigênio não conta como carbono da cadeia.'
      },
      {
        id: 'mol-12', nivel: 'intermediario', topico: 'Álcoois',
        enunciado: 'Qual é o nome deste álcool?',
        visual: estrutura('mol-12', 'C₂H₆O',
          'CH três ligado a CH dois, que está ligado ao oxigênio de OH. As duas ligações desenhadas são simples.',
          ['CH₃', 'CH₂', 'OH'], [1, 1]),
        tipo: 'escolha', opcoes: opcoes('Etanol', 'Metanol', 'Etanal', 'Etano'), correta: 'a',
        dica: 'O prefixo vem dos dois carbonos. Para álcool, use a terminação -ol.',
        explicacao: 'A cadeia tem dois carbonos e um grupo OH ligado a um carbono saturado. O nome do álcool é etanol, e a soma dos átomos da estrutura dá C₂H₆O.'
      },
      {
        id: 'mol-13', nivel: 'intermediario', topico: 'Posição da hidroxila',
        enunciado: 'Em qual carbono está o OH? Escolha o nome completo.',
        visual: estrutura('mol-13', 'C₃H₈O',
          'CH três ligado a CH, que está ligado a outro CH três. O carbono central também está ligado ao oxigênio de um grupo OH desenhado abaixo.',
          ['CH₃', 'CH', 'CH₃'], [1, 1], [{ em: 1, grupo: 'OH', lado: 'baixo' }]),
        tipo: 'escolha', opcoes: opcoes('Propan-2-ol', 'Propan-1-ol', 'Propanal', 'Propanona'), correta: 'a',
        dica: 'Numere a cadeia de três carbonos. O OH está ligado ao carbono do meio.',
        explicacao: 'A cadeia principal tem três carbonos e a hidroxila está no carbono 2. O número fica junto à parte do nome que ele localiza: propan-2-ol.'
      },
      {
        id: 'mol-14', nivel: 'intermediario', topico: 'Aldeídos',
        enunciado: 'Observe o carbono ligado ao oxigênio. Que nome corresponde à estrutura?',
        visual: estrutura('mol-14', 'C₃H₆O',
          'CH três ligado a CH dois, ligado a C, ligado a H. O último carbono faz uma ligação dupla com um oxigênio acima dele.',
          ['CH₃', 'CH₂', 'C', 'H'], [1, 1, 1], [{ em: 2, grupo: 'O', lado: 'cima', ordem: 2 }]),
        tipo: 'escolha', opcoes: opcoes('Propanal', 'Propanona', 'Propan-1-ol', 'Ácido propanoico'), correta: 'a',
        dica: 'A carbonila C=O está na extremidade, e seu carbono também está ligado a H.',
        explicacao: 'O grupo terminal C(=O)H caracteriza um aldeído. Seu carbono faz parte da cadeia, que soma três carbonos. O sufixo -al produz o nome propanal.'
      },
      {
        id: 'mol-15', nivel: 'intermediario', topico: 'Cetonas',
        enunciado: 'Nomeie a molécula indicando a posição da carbonila.',
        visual: estrutura('mol-15', 'C₄H₈O',
          'CH três ligado a C, ligado a CH dois, ligado a CH três. O segundo carbono está unido a um oxigênio por ligação dupla, desenhado acima.',
          ['CH₃', 'C', 'CH₂', 'CH₃'], [1, 1, 1], [{ em: 1, grupo: 'O', lado: 'cima', ordem: 2 }]),
        tipo: 'escolha', opcoes: opcoes('Butan-2-ona', 'Butanal', 'Butan-2-ol', 'Propanona'), correta: 'a',
        dica: 'O carbono de C=O fica entre dois carbonos: a função é cetona. Dê a ele o menor número possível.',
        explicacao: 'A cadeia tem quatro carbonos e a carbonila fica no carbono 2 quando a numeração começa pela ponta mais próxima. Como é uma cetona, usa-se -ona: butan-2-ona.'
      },
      {
        id: 'mol-16', nivel: 'intermediario', topico: 'Ácidos carboxílicos',
        enunciado: 'Qual nome identifica este composto com o grupo COOH?',
        visual: estrutura('mol-16', 'C₃H₆O₂',
          'CH três ligado a CH dois, ligado a C, ligado ao oxigênio de OH. O carbono ligado a OH também faz uma ligação dupla com outro oxigênio acima.',
          ['CH₃', 'CH₂', 'C', 'OH'], [1, 1, 1], [{ em: 2, grupo: 'O', lado: 'cima', ordem: 2 }]),
        tipo: 'escolha', opcoes: opcoes('Ácido propanoico', 'Ácido etanoico', 'Propanal', 'Propanoato de metila'), correta: 'a',
        dica: 'O carbono da carboxila C(=O)OH deve entrar na contagem da cadeia.',
        explicacao: 'A carboxila C(=O)OH identifica um ácido carboxílico. Contando o carbono desse grupo, a cadeia tem três carbonos: ácido propanoico.'
      },

      /* Avançado — ramificações, ésteres e halogenados.
         Não há centros estereogênicos nem duplas com isomeria E/Z a definir. */
      {
        id: 'mol-17', nivel: 'avancado', topico: 'Ramificações',
        enunciado: 'Escolha a maior cadeia contínua e nomeie a ramificação.',
        visual: estrutura('mol-17', 'C₄H₁₀',
          'Um grupo CH central está ligado, por ligações simples, a três grupos CH três: um à esquerda, um à direita e outro acima.',
          ['CH₃', 'CH', 'CH₃'], [1, 1], [{ em: 1, grupo: 'CH₃', lado: 'cima' }]),
        tipo: 'escolha', opcoes: opcoes('2-Metilpropano', 'Butano', '2-Metilbutano', 'Propano'), correta: 'a',
        dica: 'A molécula tem quatro carbonos no total, mas a maior sequência sem repetir um carbono contém três.',
        explicacao: 'A maior cadeia contínua tem três carbonos, formando propano como base. O carbono restante é um grupo metil ligado ao carbono 2: 2-metilpropano.'
      },
      {
        id: 'mol-18', nivel: 'avancado', topico: 'Ramificações',
        enunciado: 'Qual é o nome da cadeia ramificada abaixo?',
        visual: estrutura('mol-18', 'C₅H₁₂',
          'Cadeia CH três, CH, CH dois, CH três, com ligações simples. O segundo carbono também está ligado a um grupo CH três acima.',
          ['CH₃', 'CH', 'CH₂', 'CH₃'], [1, 1, 1], [{ em: 1, grupo: 'CH₃', lado: 'cima' }]),
        tipo: 'escolha', opcoes: opcoes('2-Metilbutano', 'Pentano', '2,2-Dimetilpropano', '3-Metilpentano'), correta: 'a',
        dica: 'A cadeia principal tem quatro carbonos. Numere pela ponta que deixa a ramificação com o menor número.',
        explicacao: 'A maior cadeia contínua possui quatro carbonos. Há um grupo metil no carbono 2 ao numerar pela esquerda; pela direita ele receberia 3. Escolhe-se 2-metilbutano.'
      },
      {
        id: 'mol-19', nivel: 'avancado', topico: 'Ramificações',
        enunciado: 'Duas ramificações iguais: como elas aparecem no nome?',
        visual: estrutura('mol-19', 'C₅H₁₂',
          'Um carbono central, sem hidrogênios, está ligado por ligações simples a quatro grupos CH três: à esquerda, à direita, acima e abaixo.',
          ['CH₃', 'C', 'CH₃'], [1, 1], [
            { em: 1, grupo: 'CH₃', lado: 'cima' },
            { em: 1, grupo: 'CH₃', lado: 'baixo' }
          ]),
        tipo: 'escolha', opcoes: opcoes('2,2-Dimetilpropano', '2-Metilbutano', 'Pentano', '2,3-Dimetilbutano'), correta: 'a',
        dica: 'A cadeia principal tem três carbonos, e os dois grupos metil restantes se ligam ao mesmo carbono.',
        explicacao: 'Qualquer maior cadeia contínua tem três carbonos. Os dois grupos metil fora dessa cadeia estão no carbono 2. Repete-se o localizador e usa-se di-: 2,2-dimetilpropano.'
      },
      {
        id: 'mol-20', nivel: 'avancado', topico: 'Alcenos ramificados',
        enunciado: 'Combine a posição da dupla com a posição da ramificação.',
        visual: estrutura('mol-20', 'C₅H₁₀',
          'CH dois ligado por ligação dupla a C, seguido por ligações simples a CH dois e CH três. O carbono da dupla sem hidrogênios também está ligado a um grupo CH três acima.',
          ['CH₂', 'C', 'CH₂', 'CH₃'], [2, 1, 1], [{ em: 1, grupo: 'CH₃', lado: 'cima' }]),
        tipo: 'escolha', opcoes: opcoes('2-Metilbut-1-eno', '3-Metilbut-1-eno', '2-Metilbut-2-eno', 'Pent-1-eno'), correta: 'a',
        dica: 'A cadeia principal com a dupla tem quatro carbonos. Dê à dupla o menor número antes de localizar o metil.',
        explicacao: 'Na cadeia de quatro carbonos, a dupla está entre 1 e 2. O grupo metil liga-se ao carbono 2. Juntando essas informações, o nome é 2-metilbut-1-eno.'
      },
      {
        id: 'mol-21', nivel: 'avancado', topico: 'Ésteres',
        enunciado: 'Observe os dois lados do grupo C(=O)O e nomeie o éster.',
        visual: estrutura('mol-21', 'C₃H₆O₂',
          'CH três ligado a C, ligado a O, ligado a outro CH três. O carbono ao lado do primeiro CH três também faz uma ligação dupla com um oxigênio acima.',
          ['CH₃', 'C', 'O', 'CH₃'], [1, 1, 1], [{ em: 1, grupo: 'O', lado: 'cima', ordem: 2 }]),
        tipo: 'escolha', opcoes: opcoes('Etanoato de metila', 'Metanoato de etila', 'Propanoato de metila', 'Ácido propanoico'), correta: 'a',
        dica: 'Conte a parte que inclui o carbono de C=O separadamente do grupo ligado ao oxigênio simples.',
        explicacao: 'A parte CH₃C(=O)O tem dois carbonos e corresponde ao etanoato. Do outro lado do oxigênio está CH₃, o grupo metila. O éster é etanoato de metila.'
      },
      {
        id: 'mol-22', nivel: 'avancado', topico: 'Ésteres',
        enunciado: 'Qual nome identifica corretamente as duas partes deste éster?',
        visual: estrutura('mol-22', 'C₅H₁₀O₂',
          'Cadeia CH três, CH dois, C, O, CH dois, CH três, com ligações simples ao longo da linha. O terceiro carbono está ligado por ligação dupla a um oxigênio acima.',
          ['CH₃', 'CH₂', 'C', 'O', 'CH₂', 'CH₃'], [1, 1, 1, 1, 1], [{ em: 2, grupo: 'O', lado: 'cima', ordem: 2 }]),
        tipo: 'escolha', opcoes: opcoes('Propanoato de etila', 'Etanoato de propila', 'Butanoato de metila', 'Propanoato de metila'), correta: 'a',
        dica: 'À esquerda, inclua o carbono de C=O na contagem. À direita do oxigênio simples, há dois carbonos.',
        explicacao: 'A parte CH₃CH₂C(=O)O possui três carbonos e dá propanoato. O grupo ligado ao oxigênio é CH₂CH₃, etila. O nome completo é propanoato de etila.'
      },
      {
        id: 'mol-23', nivel: 'avancado', topico: 'Halogenados',
        enunciado: 'Em qual posição o cloro substitui um hidrogênio?',
        visual: estrutura('mol-23', 'C₃H₇Cl',
          'CH três ligado a CH, ligado a CH três. O carbono central também está ligado por ligação simples a um átomo de cloro acima.',
          ['CH₃', 'CH', 'CH₃'], [1, 1], [{ em: 1, grupo: 'Cl', lado: 'cima' }]),
        tipo: 'escolha', opcoes: opcoes('2-Cloropropano', '1-Cloropropano', 'Cloroetano', '2-Clorobutano'), correta: 'a',
        dica: 'A base é uma cadeia de três carbonos. O cloro está ligado ao carbono central.',
        explicacao: 'A cadeia principal é a do propano, com três carbonos. O cloro aparece como prefixo cloro- no carbono 2, formando 2-cloropropano.'
      },
      {
        id: 'mol-24', nivel: 'avancado', topico: 'Halogenados',
        enunciado: 'Localize os dois átomos de cloro e escolha o nome.',
        visual: estrutura('mol-24', 'C₂H₄Cl₂',
          'Cloro ligado a CH dois, ligado a outro CH dois, ligado a cloro. Há um átomo de cloro em cada carbono, e todas as ligações são simples.',
          ['Cl', 'CH₂', 'CH₂', 'Cl'], [1, 1, 1]),
        tipo: 'escolha', opcoes: opcoes('1,2-Dicloroetano', '1,1-Dicloroetano', 'Cloroetano', '1,2-Dicloropropano'), correta: 'a',
        dica: 'Cl é o símbolo do cloro, não um carbono. A cadeia tem dois carbonos, cada um ligado a um cloro.',
        explicacao: 'A cadeia de dois carbonos dá etano. Há dois substituintes cloro, um no carbono 1 e outro no carbono 2. O prefixo di- e os localizadores produzem 1,2-dicloroetano.'
      }
    ],
    fontes: [
      {
        titulo: 'IUPAC — Guia breve de nomenclatura orgânica (regras e numeração)',
        url: 'https://iupac.qmul.ac.uk/BriefGuide/organic.html'
      },
      {
        titulo: 'Sociedade Brasileira de Química — Nomenclatura de moléculas orgânicas em português',
        url: 'https://qnesc.sbq.org.br/online/qnesc13/v13a05.pdf'
      },
      {
        titulo: 'PubChem — Estrutura do 2-metilbut-1-eno',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/11240'
      },
      {
        titulo: 'PubChem — Estrutura do etanoato de metila',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/6584'
      },
      {
        titulo: 'PubChem — Estrutura do propanoato de etila',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/7749'
      }
    ]
  });
})(window.QM = window.QM || {});
