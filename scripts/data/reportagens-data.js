/* ============ CAMADA: DADOS — Reportagens ============
   Links verificados manualmente em outubro/2026. Para adicionar novas,
   siga docs/GUIAS-RESUMIDOS.md → "Como adicionar reportagens". */
(function (QM) {
  'use strict';
  QM.dados = QM.dados || {};

  /* Temas: viram os chips de tópicos (#) abaixo da pesquisa. A ordem aqui é a ordem dos chips.
     Temas sem nenhuma reportagem não aparecem. */
  QM.dados.temasReportagens = [
    { chave: 'quimica-organica',      rotulo: 'Química orgânica',      icone: 'livro' },
    { chave: 'termoquimica',          rotulo: 'Termoquímica',          icone: 'trofeu' },
    { chave: 'tabela-periodica',      rotulo: 'Tabela periódica',      icone: 'erlenmeyer' },
    { chave: 'quimica-ambiental',     rotulo: 'Química ambiental',     icone: 'folha' },
    { chave: 'quimica-de-alimentos',  rotulo: 'Química de alimentos',  icone: 'termometro' },
    { chave: 'materiais-e-polimeros', rotulo: 'Materiais e polímeros', icone: 'molecula' }
  ];
  /* icone (aparece nos cartões sem imagem; ícones disponíveis): livro, trofeu, erlenmeyer, folha, termometro,
     grade (tabela periódica), molecula, atomo, gota, dna, globo. */

  /* Padrão de cada reportagem (mesma ordem e mesmo formato em todas):
     id        único, sem espaços
     tema      uma chave de temasReportagens
     destaque  (opcional) 1 ou 2: aparece nos cartões grandes do topo
     rotuloMenu, titulo, resumo, fonte, url
     data      (opcional) ex.: '10 jul 2024'
     leitura   (opcional) minutos de leitura
     imagem    (opcional) caminho da foto, ex.: 'assets/img/calorias.jpg'; sem imagem, mostra o ícone do tema */
  QM.dados.reportagens = [
    {
      id: 'nobel-quimica',
      tema: 'quimica-organica',
      destaque: 1,
      rotuloMenu: 'Prêmio Nobel de Química',
      titulo: 'The Nobel Prize in Chemistry',
      resumo: 'Página oficial do Prêmio Nobel de Química, destacando os laureados (incluindo os mais recentes de 2026), fatos históricos e as descobertas premiadas pela Academia Real das Ciências da Suécia.',
      fonte: 'NobelPrize.org',
      url: 'https://www.nobelprize.org/prizes/chemistry/',
      imagem: 'assets/img/nobel.jpg'
    },

    {
      id: 'verdade-sobre-calorias',
      tema: 'termoquimica',
      destaque: 2,
      rotuloMenu: 'A verdade sobre as calorias',
      titulo: 'A verdade sobre as calorias',
      resumo: 'A contagem de calorias e a perda de peso são mais complexas do que parecem. Estudos mostram que o corpo gasta energia na digestão (termogênese) e se adapta ao emagrecimento, fazendo com que os alimentos forneçam menos calorias úteis do que os rótulos indicam.',
      fonte: 'Superinteressante',
      url: 'https://super.abril.com.br/saude/a-verdade-sobre-as-calorias/',
      imagem: 'assets/img/verdade-sobre-calorias.webp'
    },

    {
      id: '2000-calorias-por-dia',
      tema: 'termoquimica',
      rotuloMenu: 'A história das 2.000 calorias',
      titulo: 'Você deve comer 2.000 calorias por dia? Conheça a história por trás do número',
      resumo: 'A recomendação diária de 2.000 calorias presente nos rótulos foi criada na década de 1990 pela FDA, baseada em questionários imprecisos e arredondamentos, e não reflete as necessidades energéticas individuais reais de cada pessoa.',
      fonte: 'Superinteressante',
      url: 'https://super.abril.com.br/saude/voce-deve-comer-2-000-calorias-por-dia-conheca-a-historia-por-tras-do-numero/',
      imagem: 'assets/img/2000-calorias-por-dia.webp'
    },

    {
      id: 'henrique-toma-terras-raras',
      tema: 'tabela-periodica',
      rotuloMenu: 'Henrique Toma e as terras-raras',
      titulo: 'O químico Henrique Toma destacou-se por criar uma técnica de separação de terras-raras',
      resumo: 'Entrevista com o químico da USP sobre a nano-hidrometalurgia magnética, técnica mais limpa para separar terras-raras, e sua trajetória na química supramolecular e na nanotecnologia.',
      fonte: 'Revista Pesquisa FAPESP',
      url: 'https://revistapesquisa.fapesp.br/o-quimico-henrique-toma-destacou-se-por-criar-uma-tecnica-de-separacao-de-terras-raras/',
      imagem: 'assets/img/henrique-toma-terras-raras.jpg'
    },

    {
      id: 'plasticos-biodegradaveis',
      tema: 'quimica-organica',
      rotuloMenu: 'Plásticos biodegradáveis',
      titulo: 'Plásticos biodegradáveis: eles realmente desaparecem no ambiente?',
      resumo: 'Artigo do Instituto de Economia Agrícola (IEA-SP), de 2012, sobre a retirada das sacolas plásticas dos supermercados paulistas. O texto lembra que boa parte dos alimentos continua embalada em plástico e aponta que os plásticos biodegradáveis também trazem problemas ambientais, um bom ponto de partida para pensar no que o rótulo "biodegradável" realmente promete.',
      fonte: 'IEA-SP',
      url: 'https://iea.agricultura.sp.gov.br/out/TerTexto.php?codTexto=12289',
      imagem: 'assets/img/plasticos-biodegradaveis.jpg'
    },

    {
      id: 'eutrofizacao-peixes',
      tema: 'quimica-ambiental',
      rotuloMenu: 'Nutrientes na água e peixes',
      titulo: 'Por que o excesso de nutrientes na água pode matar peixes?',
      resumo: 'Página do Portal da Qualidade das Águas da ANA que explica o Índice do Estado Trófico (IET), usado para classificar rios e lagos conforme a quantidade de nutrientes e o crescimento de algas e plantas aquáticas. Ajuda a entender a eutrofização; o efeito sobre o oxigênio e sobre os peixes depende das condições de cada ambiente.',
      fonte: 'ANA',
      url: 'https://www.ana.gov.br/portalpnqa/indicadores-estado-trofico.aspx',
      imagem: 'assets/img/eutrofizacao-peixes.jpg'
    },

    {
      id: 'oleo-de-cozinha-descarte',
      tema: 'quimica-ambiental',
      rotuloMenu: 'Descarte do óleo de cozinha',
      titulo: 'Óleo de cozinha usado: o que acontece quando ele é descartado incorretamente?',
      resumo: 'Notícia de 2022 da Sudema (Paraíba) sobre os danos do descarte incorreto do óleo de cozinha, que pode contaminar o solo, prejudicar a rede de esgoto e atingir águas subterrâneas. A matéria também orienta sobre o descarte correto, a reciclagem e traz uma receita de sabão ecológico caseiro.',
      fonte: 'Sudema',
      url: 'https://sudema.pb.gov.br/noticias/descarte-incorreto-do-oleo-de-cozinha-contamina-o-meio-ambiente-saiba-o-que-fazer',
      imagem: 'assets/img/oleo-de-cozinha-descarte.png'
    },

    {
      id: 'qualidade-do-leite',
      tema: 'quimica-de-alimentos',
      rotuloMenu: 'Leite e Química',
      titulo: 'Leite e Química: como identificar alterações na composição dos alimentos?',
      resumo: 'Página do Ministério da Agricultura e Pecuária sobre o Programa Nacional de Qualidade do Leite (PNQL). O leite cru passa por análises mensais em laboratórios da rede oficial, e os resultados são publicados no Observatório da Qualidade do Leite. É um material institucional sobre controle de qualidade, não uma notícia sobre fraude.',
      fonte: 'MAPA',
      url: 'https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-animal/qualidade-do-leite-pnql',
      imagem: 'assets/img/qualidade-do-leite.jpg'
    },

    {
      id: 'grama-sintetica-polimeros',
      tema: 'materiais-e-polimeros',
      rotuloMenu: 'Grama sintética e polímeros',
      titulo: 'Grama sintética: quais materiais e polímeros estão por trás dela?',
      resumo: 'Artigo científico da Revista Matéria (SciELO) sobre a substituição do náilon por um compósito de polipropileno com fibra de vidro. Ele não trata de grama sintética, mas ajuda a entender propriedades de polímeros, como resistência e flexibilidade, que servem de base para pensar em materiais sintéticos como os de gramados artificiais.',
      fonte: 'Revista Matéria / SciELO',
      url: 'https://www.scielo.br/j/rmat/a/WSjQg33Qg76Vr9xkPpBbfYd/',
      imagem: 'assets/img/grama-sintetica-polimeros.jpg'
    },

    {
      id: 'quimica-no-prato',
      tema: 'quimica-de-alimentos',
      rotuloMenu: 'Química no prato',
      titulo: 'O que faz os alimentos mudarem de cor durante o preparo?',
      resumo: 'Registro da Embrapa (Infoteca-e) do artigo "Química no prato: aromas, sabores, texturas e cores", publicado na revista Ambrosia em dezembro de 2025. O texto explica as transformações químicas e físicas do preparo dos alimentos, como a reação de Maillard e a caramelização, que mudam cor, sabor e textura.',
      fonte: 'Embrapa',
      url: 'https://www.infoteca.cnptia.embrapa.br/infoteca/handle/doc/1188363',
      imagem: 'assets/img/quimica-no-prato.webp'
    }
  ];
})(window.QM = window.QM || {});