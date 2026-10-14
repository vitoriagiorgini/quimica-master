/* ============ CAMADA: APRESENTAÇÃO — Layout e views (visual do MVP) ============ */
(function (QM) {
  'use strict';
  QM.ui = QM.ui || {};

  var ABAS = [
    { rotulo: 'Meus Jogos', rota: '#/', icone: 'jogos' },
    { rotulo: 'Sites e Reportagens', rota: '#/sites-e-reportagens', icone: 'jornal' },
    { rotulo: 'Tabela Periódica', rota: '#/tabela-periodica', icone: 'grade' }
  ];

  function cabecalho(rotaAtiva) {
    var links = ABAS.map(function (aba) {
      var ativa = aba.rota === rotaAtiva ? ' class="ativo" aria-current="page"' : '';
      return '<a href="' + aba.rota + '"' + ativa + '>' + ICONES[aba.icone] + aba.rotulo + '</a>';
    }).join('');
    return '<header class="cabecalho"><div class="cabecalho-inner">' +
      '<a class="logo" href="#/">' + ICONES.atomoLogo + ' Química Master</a>' +
      '<nav class="navegacao" aria-label="Navegação principal">' + links + '</nav></div></header>';
  }
  
  /* Ícones SVG inline (funcionam offline, sem Font Awesome). */
  var ICONES = {
    atomo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
    molecula: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8M16 7.5l-3 8M8.5 6h7"/></svg>',
    gota: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    erlenmeyer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>',
    dna: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 3c0 6 10 6 10 9s-10 3-10 9M17 3c0 6-10 6-10 9s10 3 10 9"/></svg>',
    globo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></svg>',
    impostor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/></svg>',
    atomoLogo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/></svg>',
    frascoLogo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/></svg>',
    livro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>',
    linkExterno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h6v6M21 3l-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>',
    jogos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="8" width="20" height="10" rx="5"/><path d="M7 11v4M5 13h4"/><path d="M16 12h.01M18.5 14h.01"/></svg>',
    jornal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="15" height="16" rx="2"/><path d="M18 8h3v10a2 2 0 0 1-2 2M7 9h7M7 13h7M7 17h4"/></svg>',
    grade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  };

  function cabecalho(rotaAtiva) {
    var links = ABAS.map(function (aba) {
      var ativa = aba.rota === rotaAtiva ? ' class="ativo" aria-current="page"' : '';
      return '<a href="' + aba.rota + '"' + ativa + '>' + aba.rotulo + '</a>';
    }).join('');
    return '<header class="cabecalho"><div class="cabecalho-inner">' +
      '<a class="logo" href="#/">' + ICONES.atomoLogo + ' Química Master</a>' +
      '<nav class="navegacao" aria-label="Navegação principal">' + links + '</nav></div></header>';
  }

  function rodape() {
    /* "Contato" e "Política de Privacidade" são texto estático (sem página real ainda — sem link morto). */
    return '<footer class="rodape"><div class="rodape-inner">' +
      '<nav><a href="#/documentacao">Sobre o Projeto</a><span>Contato</span><span>Política de Privacidade</span></nav>' +
      '<span class="logo-rodape">' + ICONES.frascoLogo + ' Química Master</span>' +
      '</div></footer>';
  }

  QM.ui.renderizar = function (conteudo, rotaAtiva) {
    document.getElementById('app').innerHTML =
      cabecalho(rotaAtiva) + '<main><div class="container">' + conteudo + '</div></main>' + rodape();
  };

  /* ---- View: catálogo (cards coloridos do MVP) ---- */
  QM.ui.viewCatalogo = function () {
    var painel = QM.app.obterPainelPontuacao();

    var cartoes = QM.app.listarCatalogo().map(function (c) {
      var classeTexto = c.texto === 'claro' ? ' texto-claro' : '';
      var classeBotao = c.texto === 'claro' ? ' claro' : '';
      var topicos = c.topicos.map(function (t) { return '<span class="chip">' + t + '</span>'; }).join('');
      var dica = c.dica ? '<span class="chip-dica">' + c.dica + '</span>' : '';
      var donut = c.pontuacaoDemo
        ? '<div class="pontuacao-linha"><span class="donut" style="--pct:' + c.pontuacaoDemo + '"></span>Sua Pontuação: ' + c.pontuacaoDemo + '%</div>'
        : '';
      var acao = c.rota
        ? '<a class="botao-jogar' + classeBotao + '" href="' + c.rota + '">Jogar Agora</a>'
        : '<span class="botao-jogar' + classeBotao + ' em-breve">Em breve</span>';
      return '<article class="cartao-jogo' + classeTexto + '" style="--card-bg:' + c.bg + ';--card-texto:' + (c.texto === 'claro' ? '#ffffff' : '#111827') + '">' +
        '<div class="icone-area">' + ICONES[c.icone] + '</div>' +
        '<h2>' + c.area + '</h2>' +
        '<p class="nome-jogo">Jogo: "' + c.jogo + '"' + dica + '</p>' +
        '<div class="meta"><span><span class="rotulo">Tipo de Jogo</span> ' + c.tipo + '</span>' +
        '<span><span class="rotulo">Dificuldade</span> ' + c.dificuldade + '</span></div>' +
        '<div><span class="rotulo">Tópicos Abordados</span><div class="topicos">' + topicos + '</div></div>' +
        donut +
        '<div class="rodape-cartao">' + acao + '</div></article>';
    }).join('');

    function itemPonto(p) {
      return '<div class="item-ponto">' + p.tema + ' (' + p.valor + '%)</div>';
    }
    var rotulosMelhorar = painel.melhorar.map(function (p) {
      return itemPonto(p) + '<span class="botao-estatico">' + p.rotulo + '</span>';
    }).join('');

    var secaoPontuacao =
      '<section class="secao-pontuacao">' +
        '<h2>Sua Pontuação e Pontos de Melhoria</h2>' +
        '<div class="barra-xp">' + painel.xp + '</div>' +
        '<div class="colunas-pontuacao">' +
          '<div class="painel-pontos fortes"><h3>(Pontos Fortes)</h3>' + painel.fortes.map(itemPonto).join('') + '</div>' +
          '<div class="painel-pontos melhorar"><h3>(Pontos a Melhorar)</h3>' + rotulosMelhorar + '</div>' +
        '</div></section>';

    return '<div class="hero">' +
        '<h1>Pronto para Dominar a Química? Escolha Seu Jogo!</h1>' +
        '<p>Explore jogos educativos interativos para cada matéria e suba de nível nos seus conhecimentos práticos.</p>' +
      '</div>' +
      '<div class="grade-jogos">' + cartoes + '</div>' +
      secaoPontuacao;
  };

  /* ---- View: reportagens (padrão aprovado na imagem) ---- */
  QM.ui.viewReportagens = function () {
    var cartoes = QM.app.listarReportagens().map(function (r) {
      return '<article class="cartao-reportagem">' +
        '<span class="fonte-label">' + ICONES.livro + ' FONTE: ' + r.fonte + '</span>' +
        '<h2>' + r.titulo + '</h2>' +
        '<p>' + r.resumo + '</p>' +
        '<a class="botao-reportagem" target="_blank" rel="noopener" href="' + r.url + '">Ler reportagem original ' + ICONES.linkExterno + '</a>' +
        '</article>';
    }).join('');

    return '<div class="hero"><h1>Conteúdo Extra! 📰</h1>' +
        '<p>Curadoria de reportagens e recursos sobre o mundo da Química, com fontes confiáveis. Os links abrem em nova aba e exigem internet.</p></div>' +
      '<div class="grade-reportagens">' + cartoes + '</div>';
  };

  /* ---- View: tabela periódica (períodos 1–3) ---- */
  QM.ui.viewTabela = function () {
    var celulas = QM.app.listarElementos().map(function (e) {
      return '<div class="elemento cat-' + e.categoria + '" style="grid-column:' + e.grupo + ';grid-row:' + e.periodo + '">' +
        '<span class="numero">' + e.numero + '</span><span class="simbolo">' + e.simbolo + '</span>' +
        '<span class="nome">' + e.nome + '</span><span class="massa">' + e.massa + '</span></div>';
    }).join('');
    var legenda = QM.app.listarCategorias().map(function (c) {
      return '<span><i class="cat-' + c.chave + '"></i>' + c.rotulo + '</span>';
    }).join('');

    return '<div class="hero"><h1>Tabela Periódica Interativa</h1>' +
        '<p>Consulte os elementos químicos rapidamente para te ajudar nos minijogos.</p></div>' +
      /* ----'<div class="aviso">⚠️ Esta etapa apresenta os períodos 1–3 (18 elementos). Os demais grupos serão adicionados na próxima etapa — ver Documentação → Como adicionar elementos.</div>' +---- */
      '<div class="container-tabela"><div class="grade-periodica">' + celulas +
        '<div class="faixa-lantanideos">Metais de Transição e Séries dos Lantanídeos/Actinídeos — reservadas para etapas futuras</div>' +
      '</div></div>' +
      '<div class="legenda-periodica" aria-label="Legenda de categorias">' + legenda + '</div>';
  };

  /* ---- View: documentação (conteúdo inalterado) ---- */
  QM.ui.viewDocumentacao = function () {
    return '<div class="doc">' +
      '<h1 class="hero" style="font-size:1.8rem">Documentação</h1>' +
      '<section><h2>Visão do projeto</h2><p>Plataforma educacional de jogos de Química em HTML, CSS e JavaScript puros, sem build e sem backend. Abra o <code>index.html</code> com duplo clique.</p></section>' +
      '<section><h2>Arquitetura em camadas</h2><ul>' +
        '<li><strong>Dados</strong> (<code>scripts/data/</code>): catálogo, reportagens, elementos e painel de pontuação.</li>' +
        '<li><strong>Domínio</strong> (<code>scripts/domain/</code>): contrato de jogo e validação.</li>' +
        '<li><strong>Aplicação</strong> (<code>scripts/application/</code>): registro central e serviços de consulta.</li>' +
        '<li><strong>Apresentação</strong> (<code>scripts/presentation/</code>): roteador, layout e views.</li>' +
        '<li><strong>Jogos</strong> (<code>scripts/games/</code>): módulos independentes registrados na plataforma.</li></ul>' +
        '<p>Regra de dependência: Dados → Domínio → Aplicação → Jogos → Apresentação.</p></section>' +
      '<section><h2>Como adicionar um jogo</h2><ol>' +
        '<li>Crie <code>scripts/games/seu-jogo.js</code> com metadados e função <code>render()</code>.</li>' +
        '<li>Registre com <code>QM.app.registrarJogo(metadados, render)</code>.</li>' +
        '<li>Adicione a tag <code>&lt;script&gt;</code> no <code>index.html</code> antes dos arquivos de apresentação.</li>' +
        '<li>Para o card do catálogo, adicione a entrada em <code>scripts/data/jogos-data.js</code> com a <code>rota</code>.</li></ol></section>' +
      '<section><h2>Como adicionar reportagens</h2><ol><li>Objeto novo em <code>scripts/data/reportagens-data.js</code> com título, resumo, fonte e URL verificada.</li></ol></section>' +
      '<section><h2>Como adicionar elementos</h2><ol><li>Objeto novo em <code>scripts/data/elementos-data.js</code> com número, símbolo, nome, massa, grupo, período e categoria.</li></ol></section>' +
      '<section><h2>Uso offline e distribuição</h2><p>Tudo funciona sem internet, exceto a fonte display (degrada para fonte do sistema) e os links externos. Pendrive: copie a pasta inteira.</p></section>' +
      '<section><h2>Testes e pendências</h2><p>Implementado: navegação, catálogo visual do protótipo, páginas dos 2 jogos (estrutura), 4 reportagens verificadas, tabela dos períodos 1–3. Pendente: mecânicas, 118 elementos, busca e filtros.</p></section>' +
      '</div>';
  };
})(window.QM = window.QM || {});