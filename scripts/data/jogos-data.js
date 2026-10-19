/* ============ CAMADA: DADOS — Catálogo visual e jogos ============
   Cores de fundo dos cards extraídas do protótipo original.
   texto: 'claro' = título branco | 'escuro' = título preto.
   pontuacaoDemo: dado de demonstração do protótipo — NÃO é registro real.
   rota null = jogo ainda não implementado (botão "Em breve"). */
(function (QM) {
  'use strict';
  QM.dados = QM.dados || {};

  QM.dados.catalogo = [
    { area: 'Química Geral & Inorgânica', jogo: 'Equilibre as Equações', tipo: 'Quiz', dificuldade: 'Fácil', topicos: ['Estrutura Atômica', 'Tabela Periódica'], pontuacaoDemo: 85, bg: '#D5F583', texto: 'escuro', icone: 'atomo', rota: '#/jogo/balanceamento' },
    { area: 'Química Orgânica', jogo: 'Nomeie a Molécula', tipo: 'Quiz', dificuldade: 'Médio', topicos: ['Hidrocarbonetos', 'Grupos Funcionais'], pontuacaoDemo: 85, bg: '#3FBDFC', texto: 'escuro', icone: 'molecula', rota: null },
    { area: 'Físico-Química', jogo: 'Desafio da Entalpia', tipo: 'Quiz', dificuldade: 'Difícil', topicos: ['Termodinâmica', 'Cinética Química'], pontuacaoDemo: 85, bg: '#9B51E0', texto: 'claro', icone: 'gota', rota: null },
    { area: 'Química Analítica', jogo: 'Mistério das Misturas', tipo: 'Quiz', dificuldade: 'Fácil', topicos: ['Titulação', 'Instrumentação'], pontuacaoDemo: 65, bg: '#FDD835', texto: 'escuro', icone: 'erlenmeyer', rota: null },
    { area: 'Bioquímica', jogo: 'Reconstrua a Proteína', tipo: 'Quiz', dificuldade: 'Médio', topicos: ['Proteínas', 'DNA/RNA'], pontuacaoDemo: 85, bg: '#F48FB1', texto: 'claro', icone: 'dna', rota: null },
    { area: 'Química Ambiental', jogo: 'Redução de Carbono', tipo: 'Quiz', dificuldade: '—', topicos: ['Ciclos Biogeoquímicos', 'Sustentabilidade'], pontuacaoDemo: 85, bg: '#FF9800', texto: 'claro', icone: 'globo', rota: null, dica: 'Dica Rápida' },
    { area: 'Química Geral', jogo: 'Encontre o Impostor', tipo: 'Quiz', dificuldade: 'Médio', topicos: ['Famílias químicas', 'Classificação dos elementos'], pontuacaoDemo: null, bg: '#6366F1', texto: 'claro', icone: 'impostor', rota: '#/jogo/impostor' }
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
      id: 'balanceamento', 
      titulo: 'Balanceamento de Equações', 
      materia: 'Química Geral / Estequiometria', 
      topicos: ['Leis das reações', 'Coeficientes estequiométricos'], 
      dificuldade: 'Médio-avançado', 
      descricao: 'Ajuste os coeficientes das equações químicas até conservar o número de átomos de cada elemento entre reagentes e produtos.', 
      rota: '#/jogo/balanceamento' 
    },
    { 
      id: 'organica', 
      titulo: 'Desafio de Química Orgânica', 
      materia: 'Química Orgânica', 
      topicos: ['Funções orgânicas', 'Cadeias carbônicas', 'Nomenclatura IUPAC'], 
      dificuldade: 'Médio', 
      descricao: 'Identifique funções orgânicas, estruturas de cadeias carbônicas e a nomenclatura IUPAC correta de diversos compostos.', 
      rota: '#/jogo/organica' 
    }
  ];
})(window.QM = window.QM || {});