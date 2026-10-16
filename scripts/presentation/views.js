/* ============ CAMADA: APRESENTAÇÃO — Layout e views (visual do MVP) ============ */
(function (QM) {
  'use strict';
  QM.ui = QM.ui || {};

  var ABAS = [
    { rotulo: 'Meus Jogos', rota: '#/', icone: 'jogos' },
    { rotulo: 'Sites e Reportagens', rota: '#/sites-e-reportagens', icone: 'jornal' },
    { rotulo: 'Tabela Periódica', rota: '#/tabela-periodica', icone: 'grade' }
  ];

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
    logoMarca: '<svg class="logo-marca" viewBox="0 0 52 60" fill="none" aria-hidden="true"><polygon points="26,3 49,16.5 49,43.5 26,57 3,43.5 3,16.5" fill="#0293d9" stroke="#0293d9" stroke-width="6" stroke-linejoin="round"/><g stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M24 21l9.5 5.5v11L24 43l-9.5-5.5v-11z"/><path d="M17.6 28.6v6.8"/><path d="M33.5 26.5L39.5 22l2-5M39.5 22l3.5 .8"/></g></svg>',
    menu: '<svg class="icone-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fechar: '<svg class="icone-fechar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    folha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4C10 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-6 11-16z"/><path d="M4 20c2-5 6-8 10-10"/></svg>',
    termometro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></svg>',
    trofeu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    livro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>',
    linkExterno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h6v6M21 3l-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>',
    jogos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="8" width="20" height="10" rx="5"/><path d="M7 11v4M5 13h4"/><path d="M16 12h.01M18.5 14h.01"/></svg>',
    destaque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    calendario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    relogio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    jornal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="15" height="16" rx="2"/><path d="M18 8h3v10a2 2 0 0 1-2 2M7 9h7M7 13h7M7 17h4"/></svg>',
    grade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  };

  function cabecalho(rotaAtiva) {
    var links = ABAS.map(function (aba) {
      var ativa = (aba.rota === rotaAtiva || rotaAtiva.indexOf(aba.rota + '/') === 0) ? ' class="ativo" aria-current="page"' : '';
      return '<a href="' + aba.rota + '"' + ativa + '>' + aba.rotulo + '</a>';
    }).join('');
    return '<header class="cabecalho"><div class="cabecalho-inner">' +
      '<a class="logo" href="#/">' + ICONES.logoMarca + ' Química Master</a>' +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">' + ICONES.menu + ICONES.fechar + '</button>' +
      '<nav class="navegacao" id="menu-principal" aria-label="Navegação principal">' + links + '</nav></div></header>';
  }

  function rodape() {
    /* "Contato" e "Política de Privacidade" são texto estático (sem página real ainda — sem link morto). */
    return '<footer class="rodape"><div class="rodape-inner">' +
      '<nav><a href="#/documentacao">Sobre o Projeto</a><span>Contato</span><span>Política de Privacidade</span></nav>' +
      '<span class="logo-rodape">' + ICONES.logoMarca + ' Química Master</span>' +
      '</div></footer>';
  }

  /* Menu do cabeçalho no celular: o botão abre/fecha; clicar num link, fora do menu ou Esc fecha. */
  function definirMenuAberto(cab, aberto) {
    cab.classList.toggle('menu-aberto', aberto);
    var botao = cab.querySelector('.menu-toggle');
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  }
  document.addEventListener('click', function (e) {
    var cab = document.querySelector('.cabecalho');
    if (!cab || !e.target.closest) return;
    if (e.target.closest('.menu-toggle')) {
      definirMenuAberto(cab, !cab.classList.contains('menu-aberto'));
    } else if (cab.classList.contains('menu-aberto') && (!cab.contains(e.target) || e.target.closest('.navegacao a'))) {
      definirMenuAberto(cab, false);
    }
  });
  document.addEventListener('keydown', function (e) {
    var cab = document.querySelector('.cabecalho');
    if (e.key === 'Escape' && cab && cab.classList.contains('menu-aberto')) {
      definirMenuAberto(cab, false);
      cab.querySelector('.menu-toggle').focus();
    }
  });

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

  /* ---- Busca e temas de Reportagens ---- */
  function normalizarBusca(texto) {
    return String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  /* Filtra os cartões pelo texto digitado (sem acento / maiúscula). Com busca ativa,
     procura em TODOS os temas; sem busca, mostra só o tema escolhido nos chips. */
  function filtrarReportagens(campo) {
    var area = campo.closest('.reportagens-pagina');
    if (!area) return;
    var termo = normalizarBusca(campo.value);
    var algum = 0;
    Array.prototype.forEach.call(area.querySelectorAll('.cartao-reportagem'), function (c) {
      var visivel = termo === ''
        ? c.getAttribute('data-no-escopo') === 'true'
        : normalizarBusca(c.getAttribute('data-busca')).indexOf(termo) !== -1;
      c.hidden = !visivel;
      if (visivel) algum++;
    });
    area.querySelector('.reportagens-vazio').hidden = algum > 0;
    var contagem = area.querySelector('.reportagens-contagem');
    if (contagem) contagem.textContent = algum + (algum === 1 ? ' reportagem' : ' reportagens');
    area.querySelector('.busca-limpar').hidden = termo === '';
    area.classList.toggle('buscando', termo !== '');
  }

  /* A página é re-renderizada a cada rota, então os eventos ficam no document (delegação). */
  document.addEventListener('input', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('busca-input')) filtrarReportagens(e.target);
  });
  document.addEventListener('click', function (e) {
    var limpar = e.target.closest ? e.target.closest('.busca-limpar') : null;
    if (!limpar) return;
    var campo = limpar.parentNode.querySelector('.busca-input');
    campo.value = '';
    filtrarReportagens(campo);
    campo.focus();
  });

  /* ---- View: reportagens — botão de pesquisa + tópicos/temas (chips) + cartões ----
     Rotas: #/sites-e-reportagens · /:tema · /:tema/:id  (tema e id vêm do roteador).
     Sem tema na URL = todas as reportagens. */
  QM.ui.viewReportagens = function (chaveTema, idReportagem) {
    var BASE = '#/sites-e-reportagens';
    var temas = QM.app.listarTemasReportagens();

    var topo = '<div class="hero"><h1>Química na Mídia</h1>' +
      '<p>Notícias e descobertas para estudar e entender a Química no dia a dia.</p></div>';

    if (!temas.length) return topo + '<p>Nenhuma reportagem cadastrada ainda.</p>';

    /* Tema inexistente na URL = todos. Reportagem inexistente = todas do escopo. */
    var temaAtivo = temas.filter(function (t) { return t.chave === chaveTema; })[0] || null;
    var todas = [];
    temas.forEach(function (t) {
      t.reportagens.forEach(function (r) { todas.push({ r: r, tema: t }); });
    });
    var reportagemAtiva = idReportagem
      ? (todas.filter(function (x) { return x.r.id === idReportagem && (!temaAtivo || x.tema === temaAtivo); })[0] || null)
      : null;

    function noEscopo(x) {
      if (reportagemAtiva) return x.r === reportagemAtiva.r;
      return !temaAtivo || x.tema === temaAtivo;
    }
    /* Destaques (máx. 2): cartões grandes no topo, só na visão "Todos" sem pesquisa. */
    var destaques = (temaAtivo || reportagemAtiva) ? [] : todas.filter(function (x) { return x.r.destaque; })
      .sort(function (a, b) { return a.r.destaque - b.r.destaque; }).slice(0, 2);
    function emDestaque(x) { return destaques.indexOf(x) !== -1; }
    var qtdEscopo = todas.filter(noEscopo).length;

    /* Chips de tópicos: "Todos" + um por tema, com # como no template. */
    var chips = '<a class="chip-tema' + (!temaAtivo ? ' ativo' : '') + '" href="' + BASE + '"' +
        (!temaAtivo && !reportagemAtiva ? ' aria-current="page"' : '') + '><span class="chip-hash">#</span>Todos</a>' +
      temas.map(function (t) {
        var ativo = t === temaAtivo;
        return '<a class="chip-tema' + (ativo ? ' ativo' : '') + '" href="' + BASE + '/' + t.chave + '"' +
          (ativo && !reportagemAtiva ? ' aria-current="page"' : '') + '><span class="chip-hash">#</span>' + t.rotulo + '</a>';
      }).join('');

    /* Formato do template: lista de linhas (miniatura à esquerda; fonte • tema; título; resumo; rodapé).
       Campos opcionais da reportagem: imagem, data (ex.: '10 jul 2024'), leitura (minutos). */
    var cartoes = todas.map(function (x) {
      var r = x.r;
      var visivelNaLista = noEscopo(x) && !emDestaque(x);
      var ocultar = visivelNaLista ? '' : ' hidden';
      var miniatura = r.imagem
        ? '<img class="item-miniatura" src="' + r.imagem + '" alt="" loading="lazy">'
        : '<div class="item-miniatura item-miniatura-padrao" aria-hidden="true">' + (ICONES[x.tema.icone] || ICONES.molecula) + '</div>';
      var inicial = String(r.fonte || '?').charAt(0).toUpperCase();
      var meta = (r.data ? '<span class="item-meta">' + ICONES.calendario + r.data + '</span>' : '') +
        (r.leitura ? '<span class="item-meta">' + ICONES.relogio + r.leitura + ' min de leitura</span>' : '');
      return '<article class="cartao-reportagem" data-no-escopo="' + visivelNaLista + '"' + ocultar +
        ' data-busca="' + (r.titulo + ' ' + r.resumo + ' ' + r.fonte + ' ' + x.tema.rotulo).replace(/"/g, '&quot;') + '">' +
        '<a class="item-miniatura-link" target="_blank" rel="noopener" href="' + r.url + '" tabindex="-1" aria-hidden="true">' + miniatura + '</a>' +
        '<div class="item-corpo">' +
          '<div class="item-origem"><span class="item-avatar">' + inicial + '</span>' +
            '<span class="item-fonte">' + r.fonte + '</span><span class="item-ponto-sep">•</span>' +
            '<span class="item-tema">' + x.tema.rotulo + '</span></div>' +
          '<h2><a target="_blank" rel="noopener" href="' + r.url + '">' + r.titulo + '</a></h2>' +
          '<p>' + r.resumo + '</p>' +
          '<div class="item-rodape">' + meta +
            '<a class="item-ler" target="_blank" rel="noopener" href="' + r.url + '">Ler reportagem original ' + ICONES.linkExterno + '</a></div>' +
        '</div></article>';
    }).join('');

    var blocoDestaques = destaques.length ? '<div class="destaques">' + destaques.map(function (x, i) {
      var r = x.r;
      var fundo = r.imagem
        ? '<img class="destaque-fundo" src="' + r.imagem + '" alt="" loading="lazy">'
        : '<div class="destaque-fundo destaque-fundo-padrao destaque-cor-' + (i + 1) + '" aria-hidden="true">' + (ICONES[x.tema.icone] || ICONES.molecula) + '</div>';
      return '<a class="cartao-destaque" target="_blank" rel="noopener" href="' + r.url + '">' + fundo +
        '<span class="destaque-selo">' + ICONES.destaque + ' Destaque #' + (i + 1) + '</span>' +
        '<div class="destaque-texto">' +
          '<div class="item-origem"><span class="item-avatar">' + String(r.fonte || '?').charAt(0).toUpperCase() + '</span>' +
            '<span class="item-fonte">' + r.fonte + '</span><span class="item-ponto-sep">•</span><span class="item-tema">' + x.tema.rotulo + '</span></div>' +
          '<h2>' + r.titulo + '</h2><p>' + r.resumo + '</p></div></a>';
    }).join('') + '</div>' : '';

    var voltar = reportagemAtiva
      ? '<a class="reportagens-ver-todas" href="' + BASE + (temaAtivo ? '/' + temaAtivo.chave : '') + '">Ver todas' + (temaAtivo ? ' do tema' : '') + '</a>'
      : '';

    var busca = '<div class="busca-reportagens"><span class="busca-icone">' + ICONES.lupa + '</span>' +
      '<input class="busca-input" type="search" placeholder="Pesquisar reportagens…" aria-label="Pesquisar reportagens" autocomplete="off">' +
      '<button type="button" class="busca-limpar" aria-label="Limpar pesquisa" hidden>' + ICONES.fechar + '</button></div>';

    return topo +
      '<div class="reportagens-pagina">' +
        busca +
        '<nav class="chips-temas" aria-label="Tópicos das reportagens">' + chips + '</nav>' +
        blocoDestaques +
        '<div class="reportagens-topo"><h2>' + (temaAtivo ? temaAtivo.rotulo : (destaques.length ? 'Mais reportagens' : 'Todas as reportagens')) + '</h2>' +
          (voltar || '<span class="reportagens-contagem">' + (qtdEscopo - destaques.length) + (qtdEscopo - destaques.length === 1 ? ' reportagem' : ' reportagens') + '</span>') + '</div>' +
        '<div class="grade-reportagens">' + cartoes + '</div>' +
        '<p class="reportagens-vazio" role="status" hidden>Nenhuma reportagem encontrada.</p>' +
      '</div>';
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
      '<section><h2>Como adicionar reportagens</h2><ol><li>Objeto novo em <code>scripts/data/reportagens-data.js</code> com id, tema (chave de <code>temasReportagens</code>), título, resumo, fonte e URL verificada.</li></ol></section>' +
      '<section><h2>Como adicionar elementos</h2><ol><li>Objeto novo em <code>scripts/data/elementos-data.js</code> com número, símbolo, nome, massa, grupo, período e categoria.</li></ol></section>' +
      '<section><h2>Uso offline e distribuição</h2><p>Tudo funciona sem internet, exceto a fonte display (degrada para fonte do sistema) e os links externos. Pendrive: copie a pasta inteira.</p></section>' +
      '<section><h2>Testes e pendências</h2><p>Implementado: navegação, catálogo visual do protótipo, páginas dos 2 jogos (estrutura), 4 reportagens verificadas, tabela dos períodos 1–3. Pendente: mecânicas, 118 elementos, busca e filtros.</p></section>' +
      '</div>';
  };
})(window.QM = window.QM || {});