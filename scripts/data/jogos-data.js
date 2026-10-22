/* ============ CAMADA: DADOS — Catálogo visual e jogos ============
   Cores de fundo dos cards extraídas do protótipo original.
   texto: 'claro' = título branco | 'escuro' = título preto.
   pontuacaoDemo: dado de demonstração do protótipo — NÃO é registro real.
   rota null = jogo ainda não implementado (botão "Em breve"). */
(function (QM) {
  'state strict';
  QM.dados = QM.dados || {};

  QM.dados.catalogo = [
    { id: 'balanceamento', area: 'Química Geral & Inorgânica', jogo: 'Equilibre as Equações', tipo: 'Quiz de balanceamento', dificuldade: '3 níveis', topicos: ['Balanceamento', 'Lei de Lavoisier', 'Estequiometria'], pontuacaoDemo: null, bg: '#D5F583', texto: 'escuro', icone: 'atomo', rota: '#/jogo/balanceamento' },
    { id: 'nomeie-molecula', area: 'Química Orgânica', jogo: 'Nomeie a Molécula', tipo: 'Quiz visual', dificuldade: '3 níveis', topicos: ['Hidrocarbonetos', 'Grupos Funcionais', 'Nomenclatura'], pontuacaoDemo: null, bg: '#3FBDFC', texto: 'escuro', icone: 'molecula', rota: '#/jogo/nomeie-molecula' },
    { id: 'desafio-entalpia', area: 'Físico-Química', jogo: 'Desafio da Entalpia', tipo: 'Quiz e cálculo', dificuldade: '3 níveis', topicos: ['Termoquímica', 'Lei de Hess', 'Energia de ligação'], pontuacaoDemo: null, bg: '#9B51E0', texto: 'claro', icone: 'gota', rota: '#/jogo/desafio-entalpia' },
    { id: 'misterio-misturas', area: 'Química Analítica', jogo: 'Mistério das Misturas', tipo: 'Quiz de casos', dificuldade: '3 níveis', topicos: ['Classificação de misturas', 'Métodos de separação', 'Propriedades físicas'], pontuacaoDemo: null, bg: '#FDD835', texto: 'escuro', icone: 'erlenmeyer', rota: '#/jogo/misterio-misturas' },
    { id: 'bioquimica', area: 'Bioquímica', jogo: 'Reconstrua a Proteína', tipo: 'Quiz ENEM', dificuldade: '3 níveis', topicos: ['Biomoléculas', 'Enzimas', 'Metabolismo'], pontuacaoDemo: null, bg: '#F48FB1', texto: 'claro', icone: 'dna', rota: '#/jogo/bioquimica' },
    { id: 'quimica-ambiental', area: 'Química Ambiental', jogo: 'Redução de Carbono', tipo: 'Quiz educativo', dificuldade: '3 níveis', topicos: ['Poluição e tratamento', 'Ciclos biogeoquímicos', 'Sustentabilidade'], pontuacaoDemo: null, bg: '#FF9800', texto: 'claro', icone: 'globo', rota: '#/jogo/quimica-ambiental', dica: 'Dica Rápida' },
    { id: 'quimica-geral', area: 'Química Geral', jogo: 'Desafios de Química Geral', tipo: 'Quiz ENEM', dificuldade: '3 níveis', topicos: ['Matéria e propriedades', 'Estequiometria', 'Soluções', 'Eletroquímica'], pontuacaoDemo: null, bg: '#D5F583', texto: 'escuro', icone: 'atomo', rota: '#/jogo/quimica-geral' }
  ];

  QM.dados.painelPontuacao = {
    xp: 'Pontuação Global: 920 XP. Mandou bem, Químico!',
    fortes: [
      { tema: 'Estereoquímica', valor: 95 },
      { tema: 'Nomenclatura IUPAC', valor: 90 }
    ],
    melhorar: [
      { tema: 'Reações de Adição', valor: 50, rotulo: 'Dica de Estudo' },
      { tema: 'Equilíbrio Químico', valor: 45, rotulo: 'Link para Lição' }
    ]
  };

  QM.dados.jogos = [
    { 
      id: 'impostor', 
      titulo: 'Encontre o Impostor', 
      materia: 'Química Geral', 
      topicos: ['Famílias químicas', 'Classificação dos elementos'], 
      dificuldade: 'Médio', 
      descricao: 'Analise grupos de elementos e identifique qual deles não pertence ao conjunto, justificando pela estrutura eletrônica e pelas propriedades periódicas.', 
      rota: '#/jogo/impostor' 
    },
    
    { 
      id: 'quimica-ambiental', 
      titulo: 'Redução de Carbono', 
      materia: 'Química Ambiental', 
      topicos: ['Poluição e tratamento', 'Ciclos biogeoquímicos', 'Sustentabilidade'], 
      dificuldade: '3 níveis', 
      descricao: 'Investigue água, ar e solo, interprete processos ambientais e escolha soluções sustentáveis com base na química.', 
      rota: '#/jogo/quimica-ambiental' 
    },
    { id: 'bioquimica', titulo: 'Reconstrua a Proteína', materia: 'Bioquímica', topicos: ['Biomoléculas', 'Enzimas', 'Metabolismo energético'], dificuldade: '3 níveis', descricao: 'Revise biomoléculas e processos celulares com questões contextualizadas para o ENEM.', rota: '#/jogo/bioquimica' },
    { id: 'quimica-geral', titulo: 'Desafios de Química Geral', materia: 'Química Geral', topicos: ['Matéria e propriedades', 'Estequiometria', 'Soluções', 'Eletroquímica'], dificuldade: '3 níveis', descricao: 'Pratique conceitos e situações-problema de Química Geral no estilo ENEM.', rota: '#/jogo/quimica-geral' }
  ];
})(window.QM = window.QM || {});
