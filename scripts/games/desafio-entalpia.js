/* ============ MÓDULO DE JOGO: Desafio da Entalpia ============
   Banco autoral: 24 desafios, com oito questões em cada nível.
   A interface, o sorteio e a pontuação pertencem a QM.quiz.
   Valores de tabelas são arredondados conforme informado no desafio.
   Diagramas usam uma referência comum arbitrária: não são entalpias absolutas.
   Referências de conteúdo e dados estão em "fontes", ao final deste arquivo. */
(function (QM) {
  'use strict';

  function textoSeguro(valor) {
    return String(valor).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function numero(valor) {
    return String(valor).replace('.', ',').replace('-', '−');
  }

  function equacao(texto, legenda) {
    return '<p class="qm-equacao">' + textoSeguro(texto) + '</p>' +
      (legenda ? '<p class="qm-legenda">' + textoSeguro(legenda) + '</p>' : '');
  }

  function tabela(titulo, cabecalhos, linhas) {
    var resultado = '<table class="qm-tabela-dados"><caption>' +
      textoSeguro(titulo) + '</caption><thead><tr>';
    var i;
    var j;
    for (i = 0; i < cabecalhos.length; i += 1) {
      resultado += '<th scope="col">' + textoSeguro(cabecalhos[i]) + '</th>';
    }
    resultado += '</tr></thead><tbody>';
    for (i = 0; i < linhas.length; i += 1) {
      resultado += '<tr>';
      for (j = 0; j < linhas[i].length; j += 1) {
        resultado += j === 0 ? '<th scope="row">' + textoSeguro(linhas[i][j]) + '</th>' :
          '<td>' + textoSeguro(linhas[i][j]) + '</td>';
      }
      resultado += '</tr>';
    }
    return resultado + '</tbody></table>';
  }

  function diagramaEnergia(id, reagentes, produtos) {
    var minimo = Math.min(reagentes, produtos);
    var amplitude = Math.max(reagentes, produtos) - minimo;
    var yReagentes = 178 - (reagentes - minimo) / amplitude * 96;
    var yProdutos = 178 - (produtos - minimo) / amplitude * 96;
    var sentido = yProdutos > yReagentes ? 1 : -1;
    var titulo = 'Diagrama de entalpia: reagentes em ' + numero(reagentes) +
      ' kJ e produtos em ' + numero(produtos) + ' kJ.';
    var descricao = 'Eixo vertical: entalpia relativa H, em kJ. Eixo horizontal: progresso da reação. ' +
      'A seta de ΔH liga o nível dos reagentes ao nível dos produtos, sem informar o resultado.';

    return '<svg class="qm-diagrama-energia" viewBox="0 0 520 250" ' +
      'xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="' + id + '-titulo ' + id + '-desc" ' +
      'style="display:block;width:100%;height:auto;max-height:260px">' +
      '<title id="' + id + '-titulo">' + textoSeguro(titulo) + '</title>' +
      '<desc id="' + id + '-desc">' + textoSeguro(descricao) + '</desc>' +
      '<g font-family="Arial, sans-serif" fill="currentColor">' +
        '<path d="M48 42 V210 H492" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M43 49 L48 40 L53 49 M483 205 L493 210 L483 215" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<text x="16" y="25" font-size="17">H relativo (kJ)</text>' +
        '<text x="261" y="239" text-anchor="middle" font-size="17">Progresso da reação</text>' +
        '<path d="M80 ' + yReagentes + ' H220 M335 ' + yProdutos + ' H482" fill="none" stroke="#7240ad" stroke-width="5"/>' +
        '<path d="M220 ' + yReagentes + ' H282 M282 ' + yProdutos + ' H335" fill="none" stroke="#9b82b8" stroke-width="1.5" stroke-dasharray="5 5"/>' +
        '<text x="80" y="' + (yReagentes - 36) + '" font-size="17">Reagentes</text>' +
        '<text x="80" y="' + (yReagentes - 12) + '" font-size="21" font-weight="bold">' + numero(reagentes) + ' kJ</text>' +
        '<text x="335" y="' + (yProdutos - 36) + '" font-size="17">Produtos</text>' +
        '<text x="335" y="' + (yProdutos - 12) + '" font-size="21" font-weight="bold">' + numero(produtos) + ' kJ</text>' +
        '<path d="M282 ' + yReagentes + ' V' + (yProdutos - sentido * 8) + '" fill="none" stroke="#7240ad" stroke-width="2.5"/>' +
        '<path d="M276 ' + (yProdutos - sentido * 10) + ' L282 ' + yProdutos + ' L288 ' + (yProdutos - sentido * 10) + ' Z" fill="#7240ad"/>' +
        '<text x="293" y="' + ((yReagentes + yProdutos) / 2 + 6) + '" font-size="20" font-weight="bold">ΔH</text>' +
      '</g></svg>' +
      '<div class="qm-dados-energia"><span>Reagentes: <strong>' + numero(reagentes) + ' kJ</strong></span>' +
      '<span>Produtos: <strong>' + numero(produtos) + ' kJ</strong></span></div>' +
      '<p class="qm-legenda">Valores didáticos para a mesma quantidade de matéria e uma referência comum. ' +
      'O esquema representa apenas os estados inicial e final.</p>';
  }

  QM.quiz.registrar({
    metadados: {
      id: 'desafio-entalpia',
      titulo: 'Desafio da Entalpia',
      materia: 'Físico-Química',
      topicos: ['Termoquímica', 'Lei de Hess', 'Energia de ligação'],
      dificuldade: '3 níveis',
      descricao: 'Interprete diagramas de energia, descubra o sinal de ΔH e resolva desafios de termoquímica, da troca de calor à Lei de Hess.',
      rota: '#/jogo/desafio-entalpia'
    },
    tema: 'entalpia',
    introducao: 'Para onde foi a energia? Leia os dados, acompanhe as transformações e descubra a variação de entalpia em cada desafio.',
    regras: [
      'Escolha um nível. Cada partida traz seis questões sorteadas entre os oito desafios daquele nível.',
      'Observe as unidades, os coeficientes e os estados físicos: (s) sólido, (l) líquido e (g) gasoso.',
      'ΔH = H dos produtos − H dos reagentes. O sinal faz parte da resposta.',
      'Na relação ΔH = qₚ, considere um sistema fechado a pressão constante, com apenas trabalho de expansão ou compressão (PV).',
      'Nos cálculos, use os valores fornecidos. O ΔH em kJ se refere às quantidades, em mol, indicadas pelos coeficientes da equação.'
    ],
    niveis: [
      { id: 'iniciante', titulo: 'Iniciante', descricao: 'Sinais de ΔH, troca de calor e leitura de diagramas.' },
      { id: 'intermediario', titulo: 'Intermediário', descricao: 'Cálculos, inversão de reações e proporções.' },
      { id: 'avancado', titulo: 'Avançado', descricao: 'Lei de Hess, entalpias de formação e energias de ligação.' }
    ],
    questoes: [
      {
        id: 'ent-iniciante-01',
        nivel: 'iniciante',
        topico: 'Sinal de ΔH',
        enunciado: 'Um sistema libera 75 kJ de calor para o ambiente, a pressão constante e com apenas trabalho PV. Qual é o ΔH do sistema?',
        visual: equacao('Sistema → 75 kJ de calor para o ambiente', 'Situação didática. Observe a direção da transferência de calor.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '+75 kJ' },
          { id: 'b', texto: '−75 kJ' },
          { id: 'c', texto: '0 kJ' },
          { id: 'd', texto: '+150 kJ' }
        ],
        correta: 'b',
        dica: 'Analise a troca de calor do ponto de vista do sistema: a energia entra ou sai?',
        explicacao: 'O calor sai do sistema, portanto qₚ = −75 kJ. Nas condições indicadas, ΔH = qₚ = −75 kJ. O processo é exotérmico.'
      },
      {
        id: 'ent-iniciante-02',
        nivel: 'iniciante',
        topico: 'Sinal de ΔH',
        enunciado: 'A pressão constante e com apenas trabalho PV, um sistema absorve 32 kJ de calor. Informe seu ΔH, em kJ.',
        visual: equacao('Ambiente → 32 kJ de calor para o sistema', 'Situação didática. Responda com o valor e seu sinal.'),
        tipo: 'numero',
        resposta: 32,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'O calor recebido pelo sistema tem sinal positivo.',
        explicacao: 'Como o sistema recebe calor, qₚ = +32 kJ. A pressão constante e havendo apenas trabalho PV, ΔH = qₚ = +32 kJ: processo endotérmico.'
      },
      {
        id: 'ent-iniciante-03',
        nivel: 'iniciante',
        topico: 'Diagrama de entalpia',
        enunciado: 'Observe os níveis de entalpia. Como se classifica essa transformação do estado inicial para o final?',
        visual: diagramaEnergia('ent-diagrama-iniciante-03', 100, 40),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'Endotérmica, pois ΔH é positivo.' },
          { id: 'b', texto: 'Sem variação de entalpia, pois ΔH é zero.' },
          { id: 'c', texto: 'Exotérmica, pois ΔH é negativo.' },
          { id: 'd', texto: 'Não é possível identificar o sinal de ΔH.' }
        ],
        correta: 'c',
        dica: 'Compare a altura dos produtos com a altura dos reagentes.',
        explicacao: 'ΔH = 40 − 100 = −60 kJ. Os produtos estão em um nível de entalpia menor; o processo é exotérmico.'
      },
      {
        id: 'ent-iniciante-04',
        nivel: 'iniciante',
        topico: 'Diagrama de entalpia',
        enunciado: 'No diagrama, os produtos têm entalpia maior que os reagentes. Qual afirmação descreve o processo?',
        visual: diagramaEnergia('ent-diagrama-iniciante-04', 20, 85),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'É endotérmico: ΔH > 0.' },
          { id: 'b', texto: 'É exotérmico: ΔH < 0.' },
          { id: 'c', texto: 'É exotérmico: ΔH > 0.' },
          { id: 'd', texto: 'Não há variação de entalpia: ΔH = 0.' }
        ],
        correta: 'a',
        dica: 'Na subtração produtos menos reagentes, o primeiro valor é maior.',
        explicacao: 'ΔH = 85 − 20 = +65 kJ. O sinal positivo caracteriza um processo endotérmico. Nas condições de pressão constante e apenas trabalho PV, o sistema absorve calor.'
      },
      {
        id: 'ent-iniciante-05',
        nivel: 'iniciante',
        topico: 'Entalpia e calor',
        enunciado: 'Em um sistema fechado a pressão constante, com apenas trabalho PV, a variação de entalpia é igual a qual grandeza?',
        visual: equacao('H = U + pV', 'H: entalpia; U: energia interna; p: pressão; V: volume.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'Ao tempo necessário para a reação terminar.' },
          { id: 'b', texto: 'À energia de ativação da reação.' },
          { id: 'c', texto: 'À temperatura final, em graus Celsius.' },
          { id: 'd', texto: 'Ao calor trocado pelo sistema a pressão constante.' }
        ],
        correta: 'd',
        dica: 'A relação procurada é ΔH = qₚ. O que representa q?',
        explicacao: 'Nessas condições, ΔH = qₚ. O calor tem unidade de energia; temperatura, tempo e energia de ativação são grandezas distintas.'
      },
      {
        id: 'ent-iniciante-06',
        nivel: 'iniciante',
        topico: 'Mudança de estado',
        enunciado: 'Gelo puro derrete a 0 °C e 1 atm, recebendo calor sem variar a temperatura durante a fusão. Como se classifica a transformação?',
        visual: equacao('H₂O(s) → H₂O(l)', 'Fusão da água: sólido → líquido.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'Exotérmica, com ΔH negativo.' },
          { id: 'b', texto: 'Endotérmica, com ΔH positivo.' },
          { id: 'c', texto: 'Sem troca de energia, pois a temperatura não muda.' },
          { id: 'd', texto: 'Com ΔH igual à temperatura de 0 °C.' }
        ],
        correta: 'b',
        dica: 'A temperatura pode ficar constante durante uma mudança de estado mesmo com transferência de calor.',
        explicacao: 'A fusão absorve calor, portanto ΔH é positivo. Durante a mudança de fase nas condições indicadas, receber calor não exige que a temperatura aumente.'
      },
      {
        id: 'ent-iniciante-07',
        nivel: 'iniciante',
        topico: 'Entalpia e catalisador',
        enunciado: 'Uma reação ocorre com e sem catalisador, com os mesmos reagentes, produtos, quantidades, temperaturas e pressões. O que acontece com seu ΔH?',
        visual: equacao('Mesmo estado inicial → mesmo estado final', 'Compare a variação de entalpia entre os mesmos estados.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'Sempre muda de negativo para positivo.' },
          { id: 'b', texto: 'Torna-se zero em qualquer reação.' },
          { id: 'c', texto: 'Permanece o mesmo.' },
          { id: 'd', texto: 'Diminui na mesma proporção que o tempo de reação.' }
        ],
        correta: 'c',
        dica: 'A entalpia é função de estado: importa onde o processo começa e termina.',
        explicacao: 'O catalisador altera o caminho reacional e a barreira de ativação. Como os estados inicial e final são os mesmos, a diferença de entalpia e o ΔH não mudam.'
      },
      {
        id: 'ent-iniciante-08',
        nivel: 'iniciante',
        topico: 'Interpretando ΔH',
        enunciado: 'O único dado disponível sobre uma reação é ΔH = −120 kJ. Qual conclusão pode ser feita a partir dele?',
        visual: equacao('ΔH = −120 kJ', 'Valor didático para as quantidades da reação considerada.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: 'A reação é exotérmica nas condições desse dado.' },
          { id: 'b', texto: 'A reação necessariamente termina em um segundo.' },
          { id: 'c', texto: 'A reação é espontânea em qualquer temperatura.' },
          { id: 'd', texto: 'A energia de ativação é exatamente 120 kJ.' }
        ],
        correta: 'a',
        dica: 'O sinal de ΔH permite classificar a troca energética, mas não revela todos os aspectos de uma reação.',
        explicacao: 'O valor negativo indica um processo exotérmico. Somente ΔH não determina a rapidez, a energia de ativação ou a espontaneidade em qualquer temperatura.'
      },
      {
        id: 'ent-intermediario-01',
        nivel: 'intermediario',
        topico: 'Cálculo de ΔH',
        enunciado: 'Use os níveis relativos do diagrama para calcular ΔH = Hprodutos − Hreagentes, em kJ.',
        visual: diagramaEnergia('ent-diagrama-intermediario-01', 185, 62.5),
        tipo: 'numero',
        resposta: -122.5,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Subtraia 185 de 62,5. Preserve o sinal do resultado.',
        explicacao: 'ΔH = 62,5 − 185 = −122,5 kJ. A entalpia diminui, portanto a transformação é exotérmica.'
      },
      {
        id: 'ent-intermediario-02',
        nivel: 'intermediario',
        topico: 'Cálculo de ΔH',
        enunciado: 'Calcule, em kJ, a variação de entalpia dessa transformação usando o diagrama.',
        visual: diagramaEnergia('ent-diagrama-intermediario-02', 45.5, 129),
        tipo: 'numero',
        resposta: 83.5,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'O valor dos produtos é 129 kJ e o dos reagentes é 45,5 kJ.',
        explicacao: 'ΔH = 129 − 45,5 = +83,5 kJ. O resultado positivo caracteriza uma transformação endotérmica.'
      },
      {
        id: 'ent-intermediario-03',
        nivel: 'intermediario',
        topico: 'Reação inversa',
        enunciado: 'A formação de 1 mol de água líquida tem o ΔH indicado. Qual é o ΔH para decompor 1 mol de H₂O(l) em H₂(g) e ½ O₂(g), nas mesmas condições?',
        visual: equacao('H₂(g) + ½ O₂(g) → H₂O(l)     ΔH = −285,8 kJ', 'Dado padrão a 25 °C, arredondado. A reação pedida é a inversa.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '−285,8 kJ' },
          { id: 'b', texto: '−571,6 kJ' },
          { id: 'c', texto: '+142,9 kJ' },
          { id: 'd', texto: '+285,8 kJ' }
        ],
        correta: 'd',
        dica: 'Inverter a reação troca o sinal de ΔH, sem mudar seu módulo.',
        explicacao: 'Na inversão, ΔH passa de −285,8 para +285,8 kJ. O produto da reação original se torna reagente, e a variação de entalpia muda de sinal.'
      },
      {
        id: 'ent-intermediario-04',
        nivel: 'intermediario',
        topico: 'Escala da reação',
        enunciado: 'Calcule o ΔH para a equação 2 N₂(g) + 6 H₂(g) → 4 NH₃(g), usando o dado abaixo.',
        visual: equacao('N₂(g) + 3 H₂(g) → 2 NH₃(g)     ΔH = −91,8 kJ', 'Dado a 25 °C, calculado com ΔHf°[NH₃(g)] = −45,9 kJ/mol. Use o valor fornecido.'),
        tipo: 'numero',
        resposta: -183.6,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Cada coeficiente da equação foi multiplicado por dois.',
        explicacao: 'Ao duplicar todos os coeficientes, duplicamos ΔH: 2 × (−91,8) = −183,6 kJ. A proporção acompanha a quantidade de matéria transformada.'
      },
      {
        id: 'ent-intermediario-05',
        nivel: 'intermediario',
        topico: 'Inversão e escala',
        enunciado: 'Determine o ΔH da equação H₂O(l) → H₂(g) + ½ O₂(g) a partir da equação fornecida.',
        visual: equacao('2 H₂(g) + O₂(g) → 2 H₂O(l)     ΔH = −571,6 kJ', 'Dado padrão a 25 °C, arredondado. Compare o sentido e todos os coeficientes.'),
        tipo: 'numero',
        resposta: 285.8,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Inverta o sentido da equação e, depois, divida todos os coeficientes por dois.',
        explicacao: 'Primeiro, a inversão muda ΔH para +571,6 kJ. Depois, dividir a equação por dois também divide ΔH: +571,6 ÷ 2 = +285,8 kJ.'
      },
      {
        id: 'ent-intermediario-06',
        nivel: 'intermediario',
        topico: 'Quantidade de matéria',
        enunciado: 'Qual é o ΔH, em kJ, para a combustão completa de 0,25 mol de etanol, com oxigênio em excesso e água líquida como produto?',
        visual: equacao('C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l)', 'ΔH = −1366,8 kJ para 1 mol de etanol, a 25 °C. Dado arredondado.'),
        tipo: 'numero',
        resposta: -341.7,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'A quantidade de etanol corresponde a um quarto da quantidade da equação.',
        explicacao: 'ΔH = 0,25 × (−1366,8) = −341,7 kJ. A pergunta pede a variação do sistema, por isso o sinal negativo deve ser mantido.'
      },
      {
        id: 'ent-intermediario-07',
        nivel: 'intermediario',
        topico: 'Entalpia dos produtos',
        enunciado: 'Usando a mesma referência de entalpia, qual é o valor de H dos produtos para os dados abaixo?',
        visual: tabela('Dados didáticos para a mesma quantidade de matéria', ['Grandeza', 'Valor'], [
          ['H dos reagentes', '−140 kJ'],
          ['ΔH da transformação', '−65 kJ']
        ]),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '−75 kJ' },
          { id: 'b', texto: '−205 kJ' },
          { id: 'c', texto: '+205 kJ' },
          { id: 'd', texto: '+75 kJ' }
        ],
        correta: 'b',
        dica: 'Reorganize ΔH = Hprodutos − Hreagentes para isolar Hprodutos.',
        explicacao: 'Hprodutos = Hreagentes + ΔH = −140 + (−65) = −205 kJ. Valores relativos negativos são possíveis; o que determina a transformação é a diferença entre os estados.'
      },
      {
        id: 'ent-intermediario-08',
        nivel: 'intermediario',
        topico: 'Estados físicos e entalpia',
        enunciado: 'Com os dados fornecidos, qual é o ΔH da condensação de 1 mol de H₂O(g) para H₂O(l), a 25 °C?',
        visual: tabela('Entalpias padrão de formação a 25 °C, arredondadas', ['Substância', 'ΔHf° (kJ/mol)'], [
          ['H₂O(g)', '−241,8'],
          ['H₂O(l)', '−285,8']
        ]) + equacao('H₂O(g) → H₂O(l)', 'As duas fases devem ser comparadas na mesma temperatura.'),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '+44,0 kJ' },
          { id: 'b', texto: '0 kJ' },
          { id: 'c', texto: '−44,0 kJ' },
          { id: 'd', texto: '−527,6 kJ' }
        ],
        correta: 'c',
        dica: 'Subtraia o valor da fase gasosa do valor da fase líquida.',
        explicacao: 'ΔH = −285,8 − (−241,8) = −44,0 kJ. A condensação é exotérmica; alterar o estado físico altera a entalpia.'
      },
      {
        id: 'ent-avancado-01',
        nivel: 'avancado',
        topico: 'Lei de Hess',
        enunciado: 'Use a Lei de Hess para calcular ΔH da reação CO(g) + ½ O₂(g) → CO₂(g).',
        visual: tabela('Equações termoquímicas a 25 °C, valores arredondados', ['Etapa', 'ΔH (kJ)'], [
          ['C(s, grafite) + O₂(g) → CO₂(g)', '−393,5'],
          ['C(s, grafite) + ½ O₂(g) → CO(g)', '−110,5']
        ]),
        tipo: 'numero',
        resposta: -283,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Mantenha a primeira equação e inverta a segunda, para cancelar o carbono grafite.',
        explicacao: 'A segunda equação invertida tem ΔH = +110,5 kJ. Somando as equações e cancelando C(s, grafite) e ½ O₂(g), obtemos a reação desejada. ΔH = −393,5 + 110,5 = −283,0 kJ.'
      },
      {
        id: 'ent-avancado-02',
        nivel: 'avancado',
        topico: 'Lei de Hess',
        enunciado: 'Calcule ΔH para N₂(g) + 2 O₂(g) → 2 NO₂(g), combinando as duas etapas.',
        visual: tabela('Dados a 25 °C, derivados de entalpias de formação arredondadas', ['Etapa', 'ΔH (kJ)'], [
          ['N₂(g) + O₂(g) → 2 NO(g)', '+180,5'],
          ['2 NO(g) + O₂(g) → 2 NO₂(g)', '−114,1']
        ]),
        tipo: 'numero',
        resposta: 66.4,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'O NO aparece como produto da primeira etapa e reagente da segunda.',
        explicacao: 'Somamos as equações e cancelamos 2 NO(g). Os dois termos de O₂ somam 2 O₂(g). ΔH = +180,5 + (−114,1) = +66,4 kJ.'
      },
      {
        id: 'ent-avancado-03',
        nivel: 'avancado',
        topico: 'Entalpia de formação',
        enunciado: 'Calcule ΔH da combustão de 1 mol de metano na equação abaixo, usando as entalpias de formação da tabela.',
        visual: equacao('CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)') +
          tabela('ΔHf° a 25 °C: dados fornecidos, arredondados', ['Substância', 'ΔHf° (kJ/mol)'], [
            ['CH₄(g)', '−74,6'],
            ['O₂(g)', '0'],
            ['CO₂(g)', '−393,5'],
            ['H₂O(l)', '−285,8']
          ]),
        tipo: 'numero',
        resposta: -890.5,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Some os valores dos produtos, incluindo duas águas, e subtraia a soma dos reagentes.',
        explicacao: 'ΔH = [−393,5 + 2 × (−285,8)] − [−74,6 + 2 × 0] = −965,1 − (−74,6) = −890,5 kJ. O₂(g), elemento em seu estado padrão de referência, tem ΔHf° = 0.'
      },
      {
        id: 'ent-avancado-04',
        nivel: 'avancado',
        topico: 'Entalpia de formação',
        enunciado: 'Qual é o ΔH para a combustão de 1 mol de etanol, conforme a equação e a tabela abaixo?',
        visual: equacao('C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l)') +
          tabela('ΔHf° a 25 °C: dados fornecidos, arredondados', ['Substância', 'ΔHf° (kJ/mol)'], [
            ['C₂H₅OH(l)', '−277,6'],
            ['O₂(g)', '0'],
            ['CO₂(g)', '−393,5'],
            ['H₂O(l)', '−285,8']
          ]),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '+1366,8 kJ' },
          { id: 'b', texto: '−1644,4 kJ' },
          { id: 'c', texto: '−401,7 kJ' },
          { id: 'd', texto: '−1366,8 kJ' }
        ],
        correta: 'd',
        dica: 'Há dois CO₂ e três H₂O nos produtos. Subtrair uma entalpia negativa equivale a somar seu módulo.',
        explicacao: 'Produtos: 2 × (−393,5) + 3 × (−285,8) = −1644,4 kJ. Reagentes: −277,6 + 3 × 0 = −277,6 kJ. Portanto, ΔH = −1644,4 − (−277,6) = −1366,8 kJ.'
      },
      {
        id: 'ent-avancado-05',
        nivel: 'avancado',
        topico: 'Lei de Hess e proporção',
        enunciado: 'Combine as etapas e calcule ΔH para formar 1 mol de água gasosa: H₂(g) + ½ O₂(g) → H₂O(g).',
        visual: tabela('Dados a 25 °C, derivados de valores de formação arredondados', ['Etapa', 'ΔH (kJ)'], [
          ['N₂(g) + 3 H₂(g) → 2 NH₃(g)', '−91,8'],
          ['2 NH₃(g) + ³⁄₂ O₂(g) → N₂(g) + 3 H₂O(g)', '−633,6']
        ]),
        tipo: 'numero',
        resposta: -241.8,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'Some as etapas, cancele NH₃ e N₂ e observe quantos mols de água foram formados.',
        explicacao: 'A soma produz 3 H₂(g) + ³⁄₂ O₂(g) → 3 H₂O(g), com ΔH = −91,8 − 633,6 = −725,4 kJ. Dividindo toda a equação e seu ΔH por três: −725,4 ÷ 3 = −241,8 kJ.'
      },
      {
        id: 'ent-avancado-06',
        nivel: 'avancado',
        topico: 'Energia de ligação',
        enunciado: 'Estime ΔH para H₂(g) + Cl₂(g) → 2 HCl(g) com as energias de ligação fornecidas.',
        visual: equacao('H—H(g) + Cl—Cl(g) → 2 H—Cl(g)') +
          tabela('Energias de ligação em fase gasosa: aproximação', ['Ligação', 'Energia (kJ/mol de ligações)'], [
            ['H—H', '436'],
            ['Cl—Cl', '243'],
            ['H—Cl', '432']
          ]),
        tipo: 'numero',
        resposta: -185,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'ΔH ≈ energia das ligações rompidas − energia das ligações formadas. Conte dois H—Cl.',
        explicacao: 'Rompidas: 436 + 243 = 679 kJ. Formadas: 2 × 432 = 864 kJ. Assim, ΔH ≈ 679 − 864 = −185 kJ para a equação escrita. Energias de ligação fornecem uma estimativa.'
      },
      {
        id: 'ent-avancado-07',
        nivel: 'avancado',
        topico: 'Energia de ligação',
        enunciado: 'Estime ΔH para a hidrogenação do eteno: C₂H₄(g) + H₂(g) → C₂H₆(g). Use o modelo de energias médias da tabela.',
        visual: equacao('H₂C=CH₂(g) + H—H(g) → H₃C—CH₃(g)') +
          tabela('Energias médias em fase gasosa: aproximação', ['Ligação', 'Energia (kJ/mol de ligações)'], [
            ['C=C', '611'],
            ['H—H', '436'],
            ['C—C', '345'],
            ['C—H', '415']
          ]),
        tipo: 'escolha',
        opcoes: [
          { id: 'a', texto: '+128 kJ' },
          { id: 'b', texto: '−128 kJ' },
          { id: 'c', texto: '−543 kJ' },
          { id: 'd', texto: '+287 kJ' }
        ],
        correta: 'b',
        dica: 'Quatro ligações C—H aparecem dos dois lados e se cancelam neste modelo. Nos produtos, restam duas C—H novas e uma C—C.',
        explicacao: 'Após cancelar quatro C—H de cada lado, ΔH ≈ (611 + 436) − (345 + 2 × 415) = 1047 − 1175 = −128 kJ. A conta usa energias médias; não é o valor experimental exato.'
      },
      {
        id: 'ent-avancado-08',
        nivel: 'avancado',
        topico: 'Energia de ligação',
        enunciado: 'Estime ΔH para CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g), considerando as energias médias fornecidas.',
        visual: equacao('CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g)') +
          tabela('Energias médias em fase gasosa: aproximação', ['Ligação', 'Energia (kJ/mol de ligações)'], [
            ['C—H', '415'],
            ['Cl—Cl', '243'],
            ['C—Cl', '330'],
            ['H—Cl', '432']
          ]),
        tipo: 'numero',
        resposta: -104,
        tolerancia: 0.05,
        unidade: 'kJ',
        dica: 'As três C—H presentes nos produtos cancelam três das quatro C—H dos reagentes, usando o modelo de energias médias.',
        explicacao: 'Depois do cancelamento, rompemos uma C—H e uma Cl—Cl e formamos uma C—Cl e uma H—Cl. ΔH ≈ (415 + 243) − (330 + 432) = 658 − 762 = −104 kJ. O resultado é uma estimativa para a equação escrita.'
      }
    ],
    fontes: [
      {
        titulo: 'IUPAC Gold Book — definição de entalpia',
        url: 'https://goldbook.iupac.org/terms/view/E02141'
      },
      {
        titulo: 'OpenStax Chemistry 2e, 5.3 — entalpia e Lei de Hess',
        url: 'https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy'
      },
      {
        titulo: 'OpenStax Chemistry 2e, apêndice G — dados termodinâmicos',
        url: 'https://openstax.org/books/chemistry-2e/pages/g-standard-thermodynamic-properties-for-selected-substances'
      },
      {
        titulo: 'OpenStax Chemistry 2e, 7.5 — energias de ligação',
        url: 'https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds'
      },
      {
        titulo: 'OpenStax Chemistry 2e, 12.7 — catálise e energia de ativação',
        url: 'https://openstax.org/books/chemistry-2e/pages/12-7-catalysis'
      },
      {
        titulo: 'OpenStax Chemistry 2e, 16.4 — energia livre e espontaneidade',
        url: 'https://openstax.org/books/chemistry-2e/pages/16-4-free-energy'
      }
    ]
  });
})(window.QM = window.QM || {});
