/* ============ MÓDULO DE JOGO: Equilibre as Equações ============
   Banco independente: 6 equações por nível, todas apresentadas em cada partida.
   A mecânica comum (níveis, dicas, conferência, reinício, resultado e recordes)
   vem de QM.quiz. Neste jogo, cada questão é do tipo "equacao": a pessoa ajusta
   os coeficientes e acompanha a contagem de átomos em tempo real.
   Para adicionar uma equação, informe as fórmulas (ex.: "Ca3(PO4)2") e os menores
   coeficientes inteiros em "corretos". O registro rejeita equações desbalanceadas. */
(function (QM) {
  'use strict';

  function termos(formulas) {
    return formulas.map(function (formula) { return { formula: formula }; });
  }

  function equacao(id, nivel, topico, enunciado, reagentes, produtos, coefReagentes, coefProdutos, dica, explicacao) {
    return {
      id: id,
      nivel: nivel,
      topico: topico,
      enunciado: enunciado,
      tipo: 'equacao',
      reagentes: termos(reagentes),
      produtos: termos(produtos),
      corretos: { r: coefReagentes, p: coefProdutos },
      dica: dica,
      explicacao: explicacao
    };
  }

  QM.quiz.registrar({
    metadados: {
      id: 'balanceamento',
      titulo: 'Equilibre as Equações',
      materia: 'Química Geral e Inorgânica',
      topicos: ['Balanceamento de equações', 'Lei de Lavoisier', 'Estequiometria'],
      dificuldade: '3 níveis',
      descricao: 'Ajuste os coeficientes estequiométricos e conserve a massa da reação, de sínteses simples a combustões e reações com vários elementos.',
      rota: '#/jogo/balanceamento'
    },
    tema: 'balanceamento',
    marca: 'H<sub>2</sub>O',
    introducao: 'Nenhum átomo some, nenhum átomo aparece. Ajuste os coeficientes até que reagentes e produtos tenham a mesma quantidade de cada elemento.',
    regras: [
      'Escolha um nível e balanceie as seis equações da partida.',
      'Use os botões + e − para ajustar o coeficiente de cada substância. O coeficiente multiplica todos os átomos da fórmula.',
      'Confira a contagem de átomos em tempo real: cada elemento deve ter o mesmo total nos reagentes e nos produtos.',
      'Use a dica quando precisar e clique em "Conferir resposta" para validar o balanceamento. Depois, leia a explicação.'
    ],
    niveis: [
      { id: 'iniciante', titulo: 'Iniciante', descricao: 'Reações simples de síntese.' },
      { id: 'intermediario', titulo: 'Intermediário', descricao: 'Combustões e oxidações.' },
      { id: 'avancado', titulo: 'Avançado', descricao: 'Estequiometria com mais elementos e grupos entre parênteses.' }
    ],
    questoes: [
      /* Iniciante — sínteses simples. */
      equacao('bal-01', 'iniciante', 'Síntese da água',
        'Balanceie a equação de formação da água.',
        ['H2', 'O2'], ['H2O'], [2, 1], [2],
        'Formação da água: comece igualando os átomos de oxigênio.',
        'O O₂ tem 2 átomos de oxigênio e a H₂O tem 1. Com coeficiente 2 na água, há 2 oxigênios e 4 hidrogênios, e então 2 H₂ fecham o balanço: 2 H₂ + O₂ → 2 H₂O.'),
      equacao('bal-02', 'iniciante', 'Síntese da amônia',
        'Balanceie a equação de formação da amônia.',
        ['N2', 'H2'], ['NH3'], [1, 3], [2],
        'Síntese da amônia: multiplique o H₂ por 3 para obter 6 átomos de hidrogênio no total.',
        'O N₂ tem 2 nitrogênios, então a amônia precisa de coeficiente 2, o que dá 6 hidrogênios. Três moléculas de H₂ fornecem esses 6 átomos: N₂ + 3 H₂ → 2 NH₃.'),
      equacao('bal-03', 'iniciante', 'Síntese do sal de cozinha',
        'Balanceie a formação do cloreto de sódio.',
        ['Na', 'Cl2'], ['NaCl'], [2, 1], [2],
        'O cloro é diatômico: Cl₂ tem dois átomos de cloro.',
        'O Cl₂ fornece 2 átomos de cloro, que formam 2 NaCl. Para ter 2 átomos de sódio também, o coeficiente do Na é 2: 2 Na + Cl₂ → 2 NaCl.'),
      equacao('bal-04', 'iniciante', 'Óxidos metálicos',
        'Balanceie a queima do magnésio no ar.',
        ['Mg', 'O2'], ['MgO'], [2, 1], [2],
        'O O₂ tem dois átomos de oxigênio, mas cada MgO tem apenas um.',
        'Para usar os 2 oxigênios do O₂ são necessárias 2 unidades de MgO, que exigem 2 átomos de magnésio: 2 Mg + O₂ → 2 MgO.'),
      equacao('bal-05', 'iniciante', 'Síntese do ácido clorídrico',
        'Balanceie a formação do cloreto de hidrogênio.',
        ['H2', 'Cl2'], ['HCl'], [1, 1], [2],
        'Cada HCl tem apenas um átomo de H e um de Cl. Quantos HCl são necessários para usar H₂ e Cl₂ inteiros?',
        'H₂ e Cl₂ têm dois átomos cada. Com coeficiente 2 no HCl, há 2 H e 2 Cl nos produtos; os reagentes ficam com coeficiente 1: H₂ + Cl₂ → 2 HCl.'),
      equacao('bal-06', 'iniciante', 'Oxidação do monóxido de carbono',
        'Balanceie a combustão do monóxido de carbono.',
        ['CO', 'O2'], ['CO2'], [2, 1], [2],
        'Cada CO₂ contém dois oxigênios. Compare com o O₂ e com o oxigênio já presente no CO.',
        'Cada CO traz 1 oxigênio e cada CO₂ tem 2. Com 2 CO, há 2 carbonos e 2 oxigênios; somando o O₂, são 4 oxigênios, que formam 2 CO₂: 2 CO + O₂ → 2 CO₂.'),

      /* Intermediário — combustões e oxidações. */
      equacao('bal-07', 'intermediario', 'Combustão do metano',
        'Balanceie a combustão completa do metano.',
        ['CH4', 'O2'], ['CO2', 'H2O'], [1, 2], [1, 2],
        'Balanceie o carbono, depois o hidrogênio e, por fim, o oxigênio.',
        'Com 1 CH₄ há 1 C e 4 H, que formam 1 CO₂ e 2 H₂O. Os produtos têm 2 + 2 = 4 oxigênios, fornecidos por 2 O₂: CH₄ + 2 O₂ → CO₂ + 2 H₂O.'),
      equacao('bal-08', 'intermediario', 'Formação da ferrugem',
        'Balanceie a oxidação do ferro.',
        ['Fe', 'O2'], ['Fe2O3'], [4, 3], [2],
        'O total de oxigênios deve ser par nos reagentes (O₂) e múltiplo de 3 nos produtos. Procure o menor número comum.',
        'O Fe₂O₃ tem 3 oxigênios e o O₂ tem 2; o menor múltiplo comum é 6. Assim, 2 Fe₂O₃ e 3 O₂ têm 6 oxigênios, e os 4 ferros vêm de 4 Fe: 4 Fe + 3 O₂ → 2 Fe₂O₃.'),
      equacao('bal-09', 'intermediario', 'Combustão do etano',
        'Balanceie a combustão completa do etano.',
        ['C2H6', 'O2'], ['CO2', 'H2O'], [2, 7], [4, 6],
        'Comece pelo carbono e pelo hidrogênio. Se o oxigênio ficar ímpar, dobre todos os coeficientes.',
        'Com 1 C₂H₆ seriam 2 CO₂ e 3 H₂O, totalizando 7 oxigênios, número ímpar. Dobrando tudo, 2 C₂H₆ produzem 4 CO₂ e 6 H₂O, com 14 oxigênios, vindos de 7 O₂: 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O.'),
      equacao('bal-10', 'intermediario', 'Combustão do eteno',
        'Balanceie a combustão completa do eteno.',
        ['C2H4', 'O2'], ['CO2', 'H2O'], [1, 3], [2, 2],
        'Cada C₂H₄ gera 2 CO₂ e 2 H₂O. Depois some os oxigênios dos produtos.',
        'Com 1 C₂H₄ há 2 C e 4 H, que formam 2 CO₂ e 2 H₂O. Os produtos têm 4 + 2 = 6 oxigênios, vindos de 3 O₂: C₂H₄ + 3 O₂ → 2 CO₂ + 2 H₂O.'),
      equacao('bal-11', 'intermediario', 'Oxidação do alumínio',
        'Balanceie a oxidação do alumínio.',
        ['Al', 'O2'], ['Al2O3'], [4, 3], [2],
        'Observe o oxigênio: O₂ tem 2 átomos e Al₂O₃ tem 3. Procure o menor múltiplo comum.',
        'O menor múltiplo comum entre 2 e 3 é 6: 3 O₂ e 2 Al₂O₃ têm 6 oxigênios. Os 2 Al₂O₃ trazem 4 alumínios, então: 4 Al + 3 O₂ → 2 Al₂O₃.'),
      equacao('bal-12', 'intermediario', 'Combustão do etanol',
        'Balanceie a combustão completa do etanol.',
        ['C2H5OH', 'O2'], ['CO2', 'H2O'], [1, 3], [2, 3],
        'O etanol já contém um oxigênio. Considere-o ao contar o oxigênio total.',
        'Com 1 C₂H₅OH há 2 C e 6 H, que formam 2 CO₂ e 3 H₂O. Os produtos têm 4 + 3 = 7 oxigênios; o etanol fornece 1, e os 6 restantes vêm de 3 O₂: C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O.'),

      /* Avançado — mais elementos e grupos entre parênteses. */
      equacao('bal-13', 'avancado', 'Combustão do propano',
        'Balanceie a combustão completa do propano.',
        ['C3H8', 'O2'], ['CO2', 'H2O'], [1, 5], [3, 4],
        'Combustão do propano: o oxigênio dos produtos exige um ajuste fino. Deixe-o por último.',
        'Com 1 C₃H₈ há 3 C e 8 H, que formam 3 CO₂ e 4 H₂O. Os produtos têm 6 + 4 = 10 oxigênios, vindos de 5 O₂: C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.'),
      equacao('bal-14', 'avancado', 'Metal e ácido',
        'Balanceie a reação entre alumínio e ácido clorídrico.',
        ['Al', 'HCl'], ['AlCl3', 'H2'], [2, 6], [2, 3],
        'O AlCl₃ tem 3 cloros e o H₂ tem 2 hidrogênios. O coeficiente do HCl será 6.',
        'Com 2 AlCl₃ há 2 Al e 6 Cl, então são necessários 6 HCl. Esses 6 H formam 3 H₂: 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂.'),
      equacao('bal-15', 'avancado', 'Combustão do butano',
        'Balanceie a combustão completa do butano.',
        ['C4H10', 'O2'], ['CO2', 'H2O'], [2, 13], [8, 10],
        'Com 1 C₄H₁₀, o oxigênio total daria um número não inteiro de O₂. Duplique os coeficientes.',
        'Com 1 C₄H₁₀ seriam 4 CO₂ e 5 H₂O, ou 13 oxigênios, o que exigiria 6,5 O₂. Dobrando tudo: 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O.'),
      equacao('bal-16', 'avancado', 'Combustão da glicose',
        'Balanceie a combustão completa da glicose.',
        ['C6H12O6', 'O2'], ['CO2', 'H2O'], [1, 6], [6, 6],
        'A glicose já tem 6 oxigênios. Conte o oxigênio total dos produtos e subtraia o que vem dela.',
        'Com 1 C₆H₁₂O₆ há 6 C e 12 H, que formam 6 CO₂ e 6 H₂O. Os produtos têm 12 + 6 = 18 oxigênios; a glicose fornece 6 e os outros 12 vêm de 6 O₂: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O.'),
      equacao('bal-17', 'avancado', 'Neutralização com grupos entre parênteses',
        'Balanceie a reação entre o hidróxido de cálcio e o ácido fosfórico.',
        ['Ca(OH)2', 'H3PO4'], ['Ca3(PO4)2', 'H2O'], [3, 2], [1, 6],
        'Comece pelo cálcio e pelo fósforo, que aparecem em apenas uma substância de cada lado.',
        'O Ca₃(PO₄)₂ exige 3 Ca(OH)₂ e 2 H₃PO₄. Os reagentes têm 6 + 6 = 12 hidrogênios, que formam 6 H₂O. O oxigênio fecha em 14 de cada lado: 3 Ca(OH)₂ + 2 H₃PO₄ → Ca₃(PO₄)₂ + 6 H₂O.'),
      equacao('bal-18', 'avancado', 'Redução do minério de ferro',
        'Balanceie a redução do óxido de ferro(III) pelo monóxido de carbono.',
        ['Fe2O3', 'CO'], ['Fe', 'CO2'], [1, 3], [2, 3],
        'O Fe₂O₃ tem 3 oxigênios, que passam para o CO₂. Quantos CO são necessários para recebê-los?',
        'O Fe₂O₃ libera 2 Fe e 3 oxigênios. Cada CO recebe 1 oxigênio e vira CO₂, então são necessários 3 CO: Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂.')
    ]
  });
})(window.QM = window.QM || {});
