/* ============ MÓDULO DE JOGO: Química Ambiental (Estilo Aliados do Saber) ============
   Mecânica baseada em Investigação Crítica e Análise de Afirmações (Fato vs. Ficção).
   Compatível com o motor QM.quiz. */
(function (QM) {
  'use strict';

  function opcoesVerdadeiroFalso() {
    return [
      { id: 'a', texto: 'Verdadeiro — A afirmação é quimicamente e ambientalmente correta.' },
      { id: 'b', texto: 'Falso — A afirmação contém um erro ou mito científico.' }
    ];
  }

  var configuracao = {
    metadados: {
      id: 'quimica-ambiental',
      titulo: 'Aliados do Saber: Redução de Carbono',
      materia: 'Química Ambiental',
      topicos: ['Pensamento crítico', 'Fake news ambientais', 'Sustentabilidade', 'Ciclos biogeoquímicos'],
      dificuldade: '3 níveis',
      descricao: 'Avalie afirmações sobre o meio ambiente, identifique mitos científicos e tome decisões baseadas em evidências da química.',
      rota: '#/jogo/quimica-ambiental'
    },
    tema: 'ambiental',
    introducao: 'Nem tudo o que dizem sobre sustentabilidade e química ambiental é verdade. Seja um Aliado do Saber: investigue cada afirmação, desmascare mitos e escolha o caminho da ciência!',
    regras: [
      'Escolha um nível para começar a investigação.',
      'Leia atentamente o caso ou alegação apresentada.',
      'Julgue se a afirmação é Verdadeira ou Falsa com base em conceitos químicos e ecológicos.',
      'Utilize a dica se precisar de ajuda nas evidências.',
      'Confira a explicação científica após responder para consolidar o aprendizado.'
    ],
    niveis: [
      { id: 'iniciante', titulo: 'Nível 1: Detetive Inicial', descricao: 'Investigação de mitos comuns sobre resíduos, água e ar.' },
      { id: 'intermediario', titulo: 'Nível 2: Perito Ambiental', descricao: 'Análise crítica sobre poluição, gases de efeito estufa e processos químicos.' },
      { id: 'avancado', titulo: 'Nível 3: Guardião Científico', descricao: 'Avaliação complexa sobre equilíbrio químico, pegada de carbono e químicos orgânicos.' }
    ],
    questoes: [
      /* NÍVEL INICIANTE */
      {
        id: "amb-i-01",
        nivel: "iniciante",
        topico: "Ciclos biogeoquímicos",
        enunciado: "AFIRMAÇÃO: 'A fotossíntese realizada por plantas e algas é um processo químico que libera gás carbônico (CO₂) na atmosfera, intensificando o efeito estufa.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Pense na função das plantas: elas consomem ou liberam CO₂ para produzir glicose?",
        explicacao: "FALSO. A fotossíntese REMOVE dióxido de carbono (CO₂) da atmosfera e libera Oxigênio (O₂). Quem libera CO₂ é a respiração celular e a combustão."
      },
      {
        id: "amb-i-02",
        nivel: "iniciante",
        topico: "Poluição da água",
        enunciado: "AFIRMAÇÃO: 'A eutrofização em lagos ocorre quando há excesso de nutrientes (como nitratos e fosfatos), provocando proliferação de algas e subsequente queda do oxigênio dissolvido na água.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Lembre-se do impacto da decomposição de algas no oxigênio da água.",
        explicacao: "VERDADEIRO. O excesso de nutrientes causa o descontrole populacional de algas. Ao morrerem, sua decomposição consome o oxigênio dissolvido, afetando peixes e a vida aquática."
      },
      {
        id: "amb-i-03",
        nivel: "iniciante",
        topico: "Resíduos sólidos",
        enunciado: "AFIRMAÇÃO: 'Pilhas e baterias podem ser descartadas no lixo comum sem riscos, pois são totalmente biodegradáveis em poucos meses no solo.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Pilhas contêm metais e compostos químicos que podem vazar.",
        explicacao: "FALSO. Pilhas e baterias contêm metais e compostos que podem contaminar solo e lençóis freáticos. Elas devem passar por logística reversa e descarte especial."
      },
      {
        id: "amb-i-04",
        nivel: "iniciante",
        topico: "Química atmosférica",
        enunciado: "AFIRMAÇÃO: 'O vapor de água é o gás de efeito estufa natural mais abundante na atmosfera terrestre.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Analise a presença da umidade na atmosfera antes da interferência humana.",
        explicacao: "VERDADEIRO. O vapor de água é o principal responsável pelo efeito estufa natural. A atividade humana, porém, intensifica o aquecimento ao aumentar gases como CO₂ e CH₄."
      },
      {
        id: "amb-i-05",
        nivel: "iniciante",
        topico: "Tratamento de água",
        enunciado: "AFIRMAÇÃO: 'A etapa de filtração na ETA (Estação de Tratamento de Água) serve para eliminar todos os microrganismos vivos, dispensando a cloração.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Filtros retêm partículas físicas suspensas; microrganismos exigem tratamento químico.",
        explicacao: "FALSO. A filtração retém partículas físicas sólidas remanescentes. A inativação de bactérias e vírus exige a etapa de desinfecção (como uso de cloro ou ozônio)."
      },
      {
        id: "amb-i-06",
        nivel: "iniciante",
        topico: "Resíduos e reciclagem",
        enunciado: "AFIRMAÇÃO: 'Na hierarquia de gestão de resíduos, a reciclagem é mais prioritária do que a prevenção e a redução do consumo.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "O que é melhor: evitar gerar o lixo ou ter que reciclá-lo depois?",
        explicacao: "FALSO. A prioridade máxima é Reduzir/Prevenir a geração de resíduos. Reciclar é uma etapa posterior para o que não pôde ser evitado ou reutilizado."
      },
      {
        id: "amb-i-07",
        nivel: "iniciante",
        topico: "Poluição do ar",
        enunciado: "AFIRMAÇÃO: 'A combustão incompleta de combustíveis fósseis em motores pode gerar Monóxido de Carbono (CO), um gás incolor, inodoro e altamente tóxico.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "O CO se liga à hemoglobina impedindo o transporte de oxigênio.",
        explicacao: "VERDADEIRO. Quando a quantidade de oxigênio na queima é insuficiente, forma-se CO, que reduz a capacidade do sangue de transportar oxigênio."
      },
      {
        id: "amb-i-08",
        nivel: "iniciante",
        topico: "Sustentabilidade",
        enunciado: "AFIRMAÇÃO: 'Durante a fase de operação, os painéis solares fotovoltaicos geram energia elétrica sem realizar combustão nem emitir CO₂ diretamente.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Considere como a luz do sol é convertida em eletricidade na célula solar.",
        explicacao: "VERDADEIRO. A conversão fotovoltaica é limpa no ponto de geração. O ciclo de vida do equipamento inclui impactos de fabricação, mas as emissões operacionais são nulas."
      },

      /* NÍVEL INTERMEDIÁRIO */
      {
        id: "amb-m-01",
        nivel: "intermediario",
        topico: "Chuva ácida",
        enunciado: "AFIRMAÇÃO: 'A chuva ácida é causada principalmente pela reação atmosférica entre a água e os gases SO₂ (dióxido de enxofre) e NOₓ (óxidos de nitrogênio).'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Estes gases reagem com o vapor de água formando ácidos sulfúrico e nítrico.",
        explicacao: "VERDADEIRO. A queima de combustíveis fósseis libera SO₂ e NOₓ, que formam ácidos fortes na atmosfera, acidificando solos e ecossistemas aquáticos."
      },
      {
        id: "amb-m-02",
        nivel: "intermediario",
        topico: "Demanda de oxigênio",
        enunciado: "AFIRMAÇÃO: 'Uma alta Demanda Bioquímica de Oxigênio (DBO) indica que a água está purificada e livre de matéria orgânica.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "DBO mede o oxigênio que os microrganismos precisam para consumir a sujeira orgânica.",
        explicacao: "FALSO. Quanto maior a DBO, MAIOR é a quantidade de matéria orgânica poluente presente na água, exigindo mais oxigênio das bactérias para sua degradação."
      },
      {
        id: "amb-m-03",
        nivel: "intermediario",
        topico: "Camada de ozônio",
        enunciado: "AFIRMAÇÃO: 'Os Clorofluorcarbonetos (CFCs) destroem o ozônio estratosférico porque liberam átomos de cloro sob radiação UV, catalisando a quebra do O₃.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Lembre-se da ação do cloro livre na estratosfera.",
        explicacao: "VERDADEIRO. O cloro liberado age como um catalisador: um único átomo de cloro pode destruir milhares de moléculas de ozônio (O₃)."
      },
      {
        id: "amb-m-04",
        nivel: "intermediario",
        topico: "Metais no ambiente",
        enunciado: "AFIRMAÇÃO: 'O mercúrio lançado em ambientes aquáticos não oferece perigo à saúde humana porque é eliminado rapidamente pelos peixes sem bioacumular.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Pense na conversão de mercúrio em metilmercúrio e na cadeia alimentar.",
        explicacao: "FALSO. O mercúrio transforma-se em metilmercúrio em meio aquático, uma forma lipofílica que bioacumula e se biomagnifica ao longo do topo da cadeia alimentar."
      },
      {
        id: "amb-m-05",
        nivel: "intermediario",
        topico: "Tratamento de efluentes",
        enunciado: "AFIRMAÇÃO: 'A coagulação e a floculação têm como função neutralizar cargas de partículas coloidais e agrupá-las em flocos maiores para facilitar a separação.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Essas etapas ajudam a juntar a 'sujeira fina' antes da decantação.",
        explicacao: "VERDADEIRO. Coagulares (como sulfato de alumínio) desestabilizam quimicamente a suspensão e a agitação promove a agregação em flocos fáceis de sedimentar."
      },
      {
        id: "amb-m-06",
        nivel: "intermediario",
        topico: "Gases de efeito estufa",
        enunciado: "AFIRMAÇÃO: 'O metano (CH₄) é um gás de efeito estufa irrelevante, pois possui potencial de aquecimento global muito inferior ao do dióxido de carbono (CO₂).'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Compare a capacidade de reter calor do metano por molécula em relação ao CO₂.",
        explicacao: "FALSO. Por molécula, o metano (CH₄) tem um potencial de aquecimento global dezenas de vezes MAIOR que o do CO₂ num período de 100 anos."
      },
      {
        id: "amb-m-07",
        nivel: "intermediario",
        topico: "Contaminação do solo",
        enunciado: "AFIRMAÇÃO: 'A biorremediação consiste no uso de organismos vivos (como bactérias, fungos ou plantas) para degradar ou neutralizar contaminantes no ambiente.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Considere o prefixo 'bio' no processo de remediação.",
        explicacao: "VERDADEIRO. A biorremediação aproveita o metabolismo de organismos vivos para transformar substâncias nocivas em compostos de menor toxicidade."
      },
      {
        id: "amb-m-08",
        nivel: "intermediario",
        topico: "Química verde",
        enunciado: "AFIRMAÇÃO: 'A Química Verde foca em tratar e limpar os poluentes ao final do processo fabril, sem se preocupar com o desenho inicial da reação.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "O princípio fundamental da Química Verde é a PREVENÇÃO da poluição na origem.",
        explicacao: "FALSO. A Química Verde prioriza a prevenção da geração de resíduos e o uso de matérias-primas e reativos seguros desde a concepção do processo."
      },

      /* NÍVEL AVANÇADO */
      {
        id: "amb-a-01",
        nivel: "avancado",
        topico: "Equilíbrio carbonato",
        enunciado: "AFIRMAÇÃO: 'A dissolução do CO₂ na água do mar forma ácido carbônico, aumentando os íons H⁺ e diminuindo a disponibilidade de íons carbonato (CO₃²⁻) para os corais.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Avalie as reações do sistema de equilíbrio de carbonatos em água acidificada.",
        explicacao: "VERDADEIRO. A acidificação oceânica desloca os equilíbrios químicos, reduzindo os íons carbonato essenciais para a calcificação de conchas e esqueletos de corais."
      },
      {
        id: "amb-a-02",
        nivel: "avancado",
        topico: "Eutrofização",
        enunciado: "AFIRMAÇÃO: 'Em ecossistemas eutrofizados, a mortandade de peixes ocorre prioritariamente de dia devido ao excesso de fotossíntese realizado pelas algas.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Pense na ausência de luz solar durante a noite e no consumo contínuo por respiração celular.",
        explicacao: "FALSO. À noite não há fotossíntese (geração de O₂), mas tanto as algas quanto os decompositores continuam respirando, levando a crises severas de anoxia e mortandade."
      },
      {
        id: "amb-a-03",
        nivel: "avancado",
        topico: "Oxidação de poluentes",
        enunciado: "AFIRMAÇÃO: 'O carvão ativado atua nos filtros removendo contaminantes orgânicos dissolvidos predominantemente pelo fenômeno físico-químico da adsorção.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Adsorção refere-se à fixação de moléculas na superfície porosa do sólido.",
        explicacao: "VERDADEIRO. A altíssima área superficial e porosidade do carvão ativado permitem adsorver compostos orgânicos responsáveis por odores, saboreis e toxinas."
      },
      {
        id: "amb-a-04",
        nivel: "avancado",
        topico: "Potencial redox",
        enunciado: "AFIRMAÇÃO: 'Ambientes anóxicos (pobres em O₂) favorecem reações de redução química que podem solubilizar metais como ferro e manganês para a água subterrânea.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Formas reduzidas Fe²⁺ e Mn²⁺ costumam ser mais solúveis do que as oxidizedas Fe³⁺ e Mn⁴⁺.",
        explicacao: "VERDADEIRO. A queda no potencial de oxirredução (condições redutoras) converte óxidos insolúveis de ferro e manganês em formas iônicas solúveis."
      },
      {
        id: "amb-a-05",
        nivel: "avancado",
        topico: "Poluentes atmosféricos",
        enunciado: "AFIRMAÇÃO: 'O ozônio troposférico (ao nível do solo) é um poluente secundário benéfico para os pulmões humanos, diferente do ozônio estratosférico.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Ozônio 'na estratosfera é bom, na troposfera é mal'.",
        explicacao: "FALSO. O ozônio troposférico é um forte oxidante e poluente tóxico que causa graves problemas respiratórios e danos às plantas."
      },
      {
        id: "amb-a-06",
        nivel: "avancado",
        topico: "Persistência ambiental",
        enunciado: "AFIRMAÇÃO: 'Poluentes Orgânicos Persistentes (POPs) resistem à degradação biológica e têm alta lipofilicidade, favorecendo o acúmulo em tecidos gordurosos.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "a",
        dica: "Substâncias lipofílicas dissolvem-se facilmente em gorduras e tecidos orgânicos.",
        explicacao: "VERDADEIRO. Devido à estabilidade química e afinidade por lipídios, os POPs bioacumulam-se nos organismos e biomagnificam-se ao longo da cadeia alimentar."
      },
      {
        id: "amb-a-07",
        nivel: "avancado",
        topico: "Pegada de carbono",
        enunciado: "AFIRMAÇÃO: 'O Potencial de Aquecimento Global (GWP) de qualquer gás de efeito estufa é sempre fixo e independente do tempo de permanência atmosférica considerado.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "O cálculo do GWP depende da janela de tempo analisada (ex: 20 anos vs. 100 anos).",
        explicacao: "FALSO. O GWP varia conforme o horizonte de tempo adotado (ex: GWP-20 ou GWP-100), pois gases diferentes possuem meias-vidas e taxas de degradação distintas na atmosfera."
      },
      {
        id: "amb-a-08",
        nivel: "avancado",
        topico: "Remediação e risco",
        enunciado: "AFIRMAÇÃO: 'Para determinar a técnica de remediação de um solo contaminado, basta medir a área do terreno, sendo irrelevante saber quais substâncias químicas estão presentes.'",
        tipo: 'escolha',
        opcoes: opcoesVerdadeiroFalso(),
        correta: "b",
        dica: "Diferentes produtos químicos exigem tratamentos físicos, químicos ou biológicos específicos.",
        explicacao: "FALSO. A escolha da tecnologia de remediação depende criticamente da identificação e concentração dos contaminantes, tipo de solo, hidrogeologia e riscos de exposição."
      }
    ],
    fontes: [
      { titulo: 'US EPA — Basic Information about Nutrient Pollution', url: 'https://www.epa.gov/nutrientpollution' },
      { titulo: 'US EPA — Climate Change Indicators', url: 'https://www.epa.gov/climate-indicators' },
      { titulo: 'US EPA — Basic Information about the Ozone Layer', url: 'https://www.epa.gov/ozone-layer-protection' },
      { titulo: 'USGS — Water Science School', url: 'https://www.usgs.gov/special-topics/water-science-school' },
      { titulo: 'UNEP — Pollution and environmental topics', url: 'https://www.unep.org/explore-topics' }
    ]
  };

  function iniciarInvestigacao(config) {
    var estado = { fase: 'inicio', nivel: 'iniciante', rodada: 0, revelados: {}, dica: null, selecao: [], pontos: 0 };
    var nomes = ['Luma', 'Nico', 'Teca', 'Zuri', 'Pipa', 'Bento', 'Maya', 'Theo'];
    var simbolos = ['🌿', '🌎', '💧', '♻️', '🌱', '☀️', '🌊', '🧪'];
    function escapar(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
    function misturar(a) { a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
    function preparar() {
      var questoes = config.questoes.filter(function(q){return q.nivel===estado.nivel;});
      estado.grupos = [questoes.slice(0,4),questoes.slice(4,8)];
      estado.rodada=0; estado.pontos=0; estado.fase='jogando'; prepararRodada();
    }
    function prepararRodada(){
      estado.revelados={};estado.dica=null;estado.selecao=[];
      estado.cartas=misturar(estado.grupos[estado.rodada].map(function(q,i){return {questao:q,nome:nomes[i+estado.rodada*4],simbolo:simbolos[i+estado.rodada*4]};}));
    }
    function render() {
      var html='<section class="qm-jogo qm-tema-ambiental qa-investigacao"><a class="qm-voltar" href="#/">← Voltar ao catálogo</a><header class="qm-jogo-cabecalho"><div><p class="qm-selo">Química Ambiental • Investigação científica</p><h1 class="qm-titulo">Redução de Carbono: Aliados do Saber</h1><p class="qm-intro-texto">Investigue afirmações sobre sustentabilidade, poluição e química ambiental. Descubra quem está espalhando informações falsas!</p></div><div class="qm-marca" aria-hidden="true">CO<sub>2</sub></div></header>';
      if(estado.fase==='inicio'){
        html+='<div class="qm-sessao"><h2>Escolha sua missão</h2><p>Em cada rodada, quatro personagens fazem afirmações. Investigue 8 afirmações por nível, distribuídas em duas rodadas de quatro personagens. Descubra os impostores usando evidências científicas.</p><div class="qa-niveis">';
        config.niveis.forEach(function(n){html+='<button class="qa-nivel'+(estado.nivel===n.id?' ativo':'')+'" data-qa="nivel" data-valor="'+n.id+'"><strong>'+escapar(n.titulo)+'</strong><span>'+escapar(n.descricao)+'</span></button>';});
        html+='</div><button class="qa-botao" data-qa="iniciar">Começar investigação →</button></div>';
      } else if(estado.fase==='jogando'){
        var falsos=estado.cartas.filter(function(c){return c.questao.correta==='b';}).length;
        var revelados=Object.keys(estado.revelados).length;
        html+='<div class="qm-sessao"><div class="qa-painel"><div><strong>Missão '+(estado.rodada+1)+' de '+estado.grupos.length+'</strong><p>Encontre os '+falsos+' impostores escondidos entre os personagens. Examine cada afirmação antes de decidir.</p></div><div class="qa-contadores"><span>🔎 '+(estado.rodada*4+revelados)+' de 8 afirmações investigadas</span><span>⭐ '+estado.pontos+' pontos</span></div></div><div class="qa-cartas">';
        estado.cartas.forEach(function(c,i){var q=c.questao;var revelado=estado.revelados[i];var falso=q.correta==='b';
          html+='<article class="qa-carta'+(revelado?(falso?' qa-impostor':' qa-aliado'):'')+'"><div class="qa-avatar" aria-hidden="true">'+c.simbolo+'</div><h3>'+escapar(c.nome)+'</h3><p class="qa-topico">'+escapar(q.topico)+'</p><p class="qa-afirmacao">'+escapar(q.enunciado.replace(/^AFIRMAÇÃO:\s*/,''))+'</p>';
          if(revelado){html+='<div class="qa-resultado"><strong>'+(falso?'⚠️ Impostor revelado!':'✅ Aliado do Saber!')+'</strong><p>'+escapar(q.explicacao)+'</p></div>';}
          else {if(estado.dica===i)html+='<p class="qa-dica">💡 '+escapar(q.dica)+'</p>';
            html+='<div class="qa-acoes"><button data-qa="dica" data-indice="'+i+'">💡 Dica</button><button data-qa="revelar" data-indice="'+i+'" data-palpite="b">Apontar impostor</button><button data-qa="revelar" data-indice="'+i+'" data-palpite="a">Defender aliado</button></div>';}
          html+='</article>';
        });
        html+='</div>';
        if(revelados===4)html+='<div class="qa-conclusao"><h2>Rodada investigada!</h2><p>Você examinou todas as evidências. '+(estado.rodada+1<estado.grupos.length?'Prepare-se para a próxima rodada.':'Missão concluída!')+'</p><button class="qa-botao" data-qa="proxima">'+(estado.rodada+1<estado.grupos.length?'Próxima rodada →':'Ver resultado →')+'</button></div>';
        html+='</div>';
      }else{
        html+='<div class="qm-sessao qa-conclusao"><h2>🏅 Investigação concluída!</h2><p>Você conquistou <strong>'+estado.pontos+' pontos</strong> em '+estado.grupos.length+' rodadas, analisando 8 afirmações de Química Ambiental.</p><button class="qa-botao" data-qa="reiniciar">Investigar novamente</button><button class="qa-botao qa-secundario" data-qa="niveis">Escolher outro nível</button></div>';
      }
      return html+'</section>';
    }
    QM.app.registrarJogo(config.metadados,render);
    document.addEventListener('click',function(event){
      var botao=event.target.closest('[data-qa]');if(!botao||!botao.closest('.qa-investigacao'))return;
      var acao=botao.getAttribute('data-qa'),indice=Number(botao.getAttribute('data-indice'));
      if(acao==='nivel')estado.nivel=botao.getAttribute('data-valor');
      if(acao==='iniciar'||acao==='reiniciar')preparar();
      if(acao==='niveis')estado.fase='inicio';
      if(acao==='dica')estado.dica=indice;
      if(acao==='revelar'&&!estado.revelados[indice]){
        var certo=estado.cartas[indice].questao.correta===botao.getAttribute('data-palpite');
        estado.revelados[indice]=true;if(certo)estado.pontos+=estado.dica===indice?70:100;
      }
      if(acao==='proxima'){estado.rodada++;if(estado.rodada>=estado.grupos.length)estado.fase='fim';else prepararRodada();}
      QM.router.rotear();
    });
  }

  iniciarInvestigacao(configuracao);
})(window.QM = window.QM || {});