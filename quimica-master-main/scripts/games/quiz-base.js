/* Rodadas, interação e revisão compartilhadas pelos jogos de perguntas.
   Cada módulo define suas questões e seus desenhos; o roteador não conhece
   as regras. Eventos delegados funcionam mesmo quando a view é recriada. */
(function (QM) {
  'use strict';
  QM.quiz = QM.quiz || {};

  var jogos = {};
  var RODADAS = 6;
  var PONTOS_ACERTO = 100;
  var PONTOS_COM_DICA = 70;

  function escapar(valor) {
    return String(valor == null ? '' : valor).replace(/[&<>"']/g, function (caractere) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[caractere];
    });
  }

  function embaralhar(lista) {
    var copia = lista.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var valor = copia[i];
      copia[i] = copia[j];
      copia[j] = valor;
    }
    return copia;
  }

  function numeroLocal(valor) { return String(valor).replace('.', ',').replace(/^-/, '−'); }

  function lerNumero(valor) {
    var texto = String(valor).trim().replace(/\u2212/g, '-');
    if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(texto)) return null;
    var numero = Number(texto.replace(',', '.'));
    return isFinite(numero) ? numero : null;
  }

  /* ---- Equações químicas: leitura de fórmulas e contagem de átomos ---- */
  var SUBSCRITOS = { 0: '\u2080', 1: '\u2081', 2: '\u2082', 3: '\u2083', 4: '\u2084', 5: '\u2085', 6: '\u2086', 7: '\u2087', 8: '\u2088', 9: '\u2089' };
  var COEFICIENTE_MAXIMO = 30;

  function formulaTexto(formula) {
    return String(formula).replace(/\d/g, function (digito) { return SUBSCRITOS[digito]; });
  }

  function formulaHtml(formula) {
    return escapar(formula).replace(/(\d+)/g, '<sub>$1</sub>');
  }

  /* Converte "Ca3(PO4)2" em { Ca: 3, P: 2, O: 8 }. Devolve null se a fórmula for inválida. */
  function contarAtomos(formula) {
    var texto = String(formula);
    var pilha = [{}];
    var i = 0;
    function lerNumeroInteiro() {
      var inicio = i;
      while (i < texto.length && /\d/.test(texto.charAt(i))) i++;
      return inicio === i ? 1 : parseInt(texto.slice(inicio, i), 10);
    }
    while (i < texto.length) {
      var c = texto.charAt(i);
      if (c === '(') { pilha.push({}); i++; }
      else if (c === ')') {
        if (pilha.length < 2) return null;
        i++;
        var multiplo = lerNumeroInteiro();
        var grupo = pilha.pop();
        Object.keys(grupo).forEach(function (el) { pilha[pilha.length - 1][el] = (pilha[pilha.length - 1][el] || 0) + grupo[el] * multiplo; });
      } else if (/[A-Z]/.test(c)) {
        var simbolo = c;
        i++;
        if (i < texto.length && /[a-z]/.test(texto.charAt(i))) { simbolo += texto.charAt(i); i++; }
        var quantidade = lerNumeroInteiro();
        pilha[pilha.length - 1][simbolo] = (pilha[pilha.length - 1][simbolo] || 0) + quantidade;
      } else return null;
    }
    return pilha.length === 1 && Object.keys(pilha[0]).length ? pilha[0] : null;
  }

  function somarAtomos(termos, coeficientes) {
    var total = {};
    termos.forEach(function (termo, indice) {
      var atomos = contarAtomos(termo.formula);
      Object.keys(atomos).forEach(function (el) { total[el] = (total[el] || 0) + atomos[el] * coeficientes[indice]; });
    });
    return total;
  }

  function contagemEquacao(questao, coeficientes) {
    var reagentes = somarAtomos(questao.reagentes, coeficientes.r);
    var produtos = somarAtomos(questao.produtos, coeficientes.p);
    var elementos = Object.keys(reagentes);
    Object.keys(produtos).forEach(function (el) { if (elementos.indexOf(el) === -1) elementos.push(el); });
    return {
      reagentes: reagentes,
      produtos: produtos,
      elementos: elementos,
      balanceada: elementos.every(function (el) { return (reagentes[el] || 0) === (produtos[el] || 0); })
    };
  }

  function equacaoTexto(questao, coeficientes) {
    function lado(termos, lista) {
      return termos.map(function (termo, indice) {
        return (lista[indice] > 1 ? lista[indice] + ' ' : '') + formulaTexto(termo.formula);
      }).join(' + ');
    }
    return lado(questao.reagentes, coeficientes.r) + ' \u2192 ' + lado(questao.produtos, coeficientes.p);
  }

  function tituloNivel(jogo) {
    return jogo.config.niveis.filter(function (n) { return n.id === jogo.estado.nivel; })[0].titulo;
  }

  function atual(jogo) { return jogo.estado.rodadas[jogo.estado.indice]; }

  function textoCorreto(questao) {
    if (questao.tipo === 'numero') return numeroLocal(questao.resposta) + ' ' + questao.unidade;
    if (questao.tipo === 'equacao') return equacaoTexto(questao, questao.corretos);
    return questao.opcoes.filter(function (opcao) { return opcao.id === questao.correta; })[0].texto;
  }

  function botao(acao, texto, estilo, extras) {
    return '<button type="button" class="qm-botao qm-botao-' + (estilo || 'secundario') +
      '" data-qm-acao="' + acao + '"' + (extras || '') + '>' + texto + '</button>';
  }

  function fontes(config) {
    if (!config.fontes || !config.fontes.length) return '';
    var links = config.fontes.filter(function (fonte) { return /^https:\/\//.test(fonte.url); }).map(function (fonte) {
      return '<li><a href="' + escapar(fonte.url) + '" target="_blank" rel="noopener noreferrer">' + escapar(fonte.titulo) + '</a></li>';
    }).join('');
    return '<details class="qm-fontes"><summary>Referências para estudar</summary><ul>' + links +
      '</ul><p class="qm-nota">Os desafios funcionam sem internet. Os links abrem materiais externos.</p></details>';
  }

  function inicio(jogo) {
    var config = jogo.config;
    var totalRodadas = config.rodadas || RODADAS;
    var recorde = QM.app.obterProgressoJogo(config.metadados.id, jogo.estado.nivel);
    var niveis = config.niveis.map(function (nivel) {
      return '<button type="button" class="qm-nivel" data-qm-acao="nivel" data-qm-nivel="' + escapar(nivel.id) +
        '" aria-pressed="' + (nivel.id === jogo.estado.nivel) + '"><strong>' + escapar(nivel.titulo) +
        '</strong><span>' + escapar(nivel.descricao) + '</span></button>';
    }).join('');
    return '<div class="qm-inicio-grid"><section class="qm-painel">' +
      '<p class="qm-sobretitulo">Sua próxima descoberta</p><h2 class="qm-subtitulo" tabindex="-1">Escolha seu nível</h2>' +
      '<p class="qm-texto-suave">Comece pelo básico ou avance para um desafio maior.</p>' +
      '<div class="qm-niveis" role="group" aria-label="Nível da partida">' + niveis + '</div>' +
      '<div class="qm-resumo-regras"><span>' + totalRodadas + ' desafios</span><span>Até ' + (totalRodadas * PONTOS_ACERTO) + ' pontos</span><span>Sem cronômetro</span></div>' +
      '<p class="qm-recorde">' + (recorde ? 'Seu recorde em ' + escapar(tituloNivel(jogo)) + ': <strong>' + recorde.melhorPontuacao +
        ' pontos</strong> · melhor acerto: ' + recorde.melhorPercentual + '%.' : 'Uma nova marca começa aqui. Complete sua primeira partida neste nível!') + '</p>' +
      '<div class="qm-acoes">' + botao('iniciar', 'Começar partida <span aria-hidden="true">→</span>', 'primario') + '</div>' +
      '<p class="qm-nota">' + (QM.app.progressoPersistente() ? 'Os recordes ficam salvos neste navegador, sem criar uma conta.' :
        'O armazenamento está bloqueado. Seus resultados ficarão disponíveis enquanto esta página estiver aberta.') + '</p></section>' +
      '<aside class="qm-painel qm-guia"><p class="qm-sobretitulo">Antes de começar</p><h2 class="qm-subtitulo">Como jogar</h2>' +
      '<ol class="qm-regras">' + config.regras.map(function (regra) { return '<li>' + escapar(regra) + '</li>'; }).join('') + '</ol>' +
      '<p class="qm-nota">Cada acerto vale 100 pontos; com dica, vale 70. Uma resposta errada vale 0, mas sempre vem com explicação.</p>' +
      fontes(config) + '</aside></div>';
  }

  function alternativas(jogo, questao) {
    var estado = jogo.estado;
    return '<div class="qm-alternativas" role="group" aria-label="Alternativas">' + estado.opcoes.map(function (opcao, indice) {
      var selecionada = estado.selecao === opcao.id;
      var classe = selecionada ? ' qm-selecionada' : '';
      var indicacao = '';
      if (estado.respondida) {
        if (opcao.id === questao.correta) { classe += ' qm-correta'; indicacao = 'Resposta correta'; }
        else if (selecionada) { classe += ' qm-incorreta'; indicacao = 'Sua resposta'; }
      }
      return '<button type="button" class="qm-alternativa' + classe + '" data-qm-acao="escolher" data-qm-opcao="' +
        escapar(opcao.id) + '" aria-pressed="' + selecionada + '"' + (estado.respondida ? ' disabled' : '') + '>' +
        '<span class="qm-letra" aria-hidden="true">' + String.fromCharCode(65 + indice) + '</span><span class="qm-opcao-texto">' +
        escapar(opcao.texto) + (indicacao ? '<small class="qm-estado-opcao">' + indicacao + '</small>' : '') + '</span></button>';
    }).join('') + '</div>';
  }

  function campoNumerico(jogo, questao) {
    var id = jogo.config.metadados.id;
    var estado = jogo.estado;
    return '<form class="qm-form-resposta" novalidate><div class="qm-campo-numero"><label for="qm-numero-' + id + '">Sua resposta</label>' +
      '<div class="qm-entrada-numero"><input class="qm-numero" id="qm-numero-' + id + '" type="text" inputmode="decimal" autocomplete="off"' +
      ' maxlength="20" placeholder="Ex.: −125,5" value="' + escapar(estado.valor) + '" aria-describedby="qm-ajuda-' + id +
      (estado.erro ? ' qm-erro-' + id : '') + '" aria-invalid="' + Boolean(estado.erro) + '"' + (estado.respondida ? ' disabled' : '') + '>' +
      '<button type="button" class="qm-botao qm-botao-secundario qm-trocar-sinal" data-qm-acao="sinal" aria-label="Alternar sinal da resposta"' +
      (estado.respondida ? ' disabled' : '') + '>±</button><span class="qm-unidade">' + escapar(questao.unidade) + '</span></div>' +
      '<p class="qm-nota" id="qm-ajuda-' + id + '">Inclua o sinal. Use vírgula ou ponto nos decimais; o botão ± troca o sinal. Digite só o número.</p>' +
      (estado.erro ? '<p class="qm-erro" id="qm-erro-' + id + '" role="alert">' + escapar(estado.erro) + '</p>' : '') +
      '<button class="qm-sr-only" type="submit" tabindex="-1"' + (estado.respondida ? ' disabled' : '') + '>Conferir resposta</button></div></form>';
  }

  function termoEquacao(jogo, termo, lado, indice) {
    var estado = jogo.estado;
    var valor = estado.coef[lado][indice];
    var nome = formulaTexto(termo.formula);
    var travado = estado.respondida ? ' disabled' : '';
    return '<div class="qm-termo"><div class="qm-coef" role="group" aria-label="Coeficiente de ' + escapar(nome) + '">' +
      '<button type="button" class="qm-coef-botao" data-qm-acao="coef" data-qm-lado="' + lado + '" data-qm-idx="' + indice +
      '" data-qm-passo="1" aria-label="Aumentar o coeficiente de ' + escapar(nome) + '"' + travado + '>+</button>' +
      '<output class="qm-coef-valor" aria-live="polite">' + valor + '</output>' +
      '<button type="button" class="qm-coef-botao" data-qm-acao="coef" data-qm-lado="' + lado + '" data-qm-idx="' + indice +
      '" data-qm-passo="-1" aria-label="Diminuir o coeficiente de ' + escapar(nome) + '"' + travado + '>\u2212</button></div>' +
      '<span class="qm-formula-quimica">' + formulaHtml(termo.formula) + '</span></div>';
  }

  function equacaoInterativa(jogo, questao) {
    var estado = jogo.estado;
    var contagem = contagemEquacao(questao, estado.coef);
    function lado(termos, chave) {
      return termos.map(function (termo, indice) {
        return termoEquacao(jogo, termo, chave, indice) + (indice < termos.length - 1 ? '<span class="qm-operador" aria-hidden="true">+</span>' : '');
      }).join('');
    }
    function coluna(titulo, totais) {
      return '<div class="qm-contador-coluna"><h4>' + titulo + '</h4>' + contagem.elementos.map(function (el) {
        var igual = (contagem.reagentes[el] || 0) === (contagem.produtos[el] || 0);
        return '<div class="qm-item-atomo ' + (igual ? 'qm-balanceado' : 'qm-desbalanceado') + '"><span>' + escapar(el) +
          '</span><strong>' + (totais[el] || 0) + ' <small>' + (igual ? 'igual' : 'diferente') + '</small></strong></div>';
      }).join('') + '</div>';
    }
    return '<div class="qm-equacao-exibicao" role="group" aria-label="Equação química para balancear">' +
      lado(questao.reagentes, 'r') + '<span class="qm-seta" aria-label="produz">\u2192</span>' + lado(questao.produtos, 'p') + '</div>' +
      '<div class="qm-contador-atomos" aria-label="Contagem de átomos">' + coluna('Reagentes', contagem.reagentes) + coluna('Produtos', contagem.produtos) + '</div>' +
      '<p class="qm-nota">Use + e \u2212 para ajustar os coeficientes. A contagem de átomos se atualiza a cada mudança.</p>';
  }

  function feedback(jogo, questao) {
    var estado = jogo.estado;
    var resposta = estado.historico[estado.historico.length - 1];
    return '<section class="qm-feedback qm-feedback-' + (resposta.acertou ? 'acerto' : 'erro') + '" tabindex="-1" aria-label="Resultado da resposta">' +
      '<h3>' + (resposta.acertou ? 'Isso mesmo! +' + resposta.pontos + ' pontos' : 'Vamos entender essa resposta') + '</h3>' +
      '<p><strong>Resposta correta: ' + escapar(textoCorreto(questao)) + '.</strong></p>' +
      (resposta.nota ? '<p>' + escapar(resposta.nota) + '</p>' : '') + '<p>' + escapar(questao.explicacao) + '</p></section>';
  }

  function partida(jogo) {
    var estado = jogo.estado;
    var questao = atual(jogo);
    var concluidas = estado.indice + (estado.respondida ? 1 : 0);
    var proxima = estado.indice === estado.rodadas.length - 1 ? 'Ver meu resultado' : 'Próximo desafio <span aria-hidden="true">→</span>';
    var html = '<section class="qm-painel qm-partida" data-qm-pergunta="' + escapar(questao.id) + '">' +
      '<div class="qm-status"><div class="qm-status-item"><span>Seu nível</span><strong>' + escapar(tituloNivel(jogo)) + '</strong></div>' +
      '<div class="qm-status-item"><span>Desafio</span><strong>' + (estado.indice + 1) + ' / ' + estado.rodadas.length + '</strong></div>' +
      '<div class="qm-status-item"><span>Pontuação</span><strong>' + estado.pontos + ' pts</strong></div></div>' +
      '<div class="qm-progresso" role="progressbar" aria-label="Desafios respondidos" aria-valuemin="0" aria-valuemax="' + estado.rodadas.length +
      '" aria-valuenow="' + concluidas + '"><div class="qm-progresso-preenchido" style="width:' + (concluidas * 100 / estado.rodadas.length) + '%"></div></div>' +
      '<div class="qm-questao-topo"><span class="qm-tag">' + escapar(questao.topico) + '</span><span class="qm-texto-suave">' +
      (questao.tipo === 'numero' ? 'Calcule e responda' : questao.tipo === 'equacao' ? 'Ajuste os coeficientes' : 'Escolha uma alternativa') + '</span></div>' +
      '<h2 class="qm-pergunta" tabindex="-1">' + escapar(questao.enunciado) + '</h2>' +
      (questao.visual ? '<div class="qm-visual">' + questao.visual + '</div>' : '') +
      (questao.tipo === 'numero' ? campoNumerico(jogo, questao) : questao.tipo === 'equacao' ? equacaoInterativa(jogo, questao) : alternativas(jogo, questao));
    if (estado.dicaUsada) html += '<aside class="qm-dica" tabindex="-1"><strong>Uma pista para você</strong><p>' + escapar(questao.dica) + '</p></aside>';
    if (estado.respondida) html += feedback(jogo, questao);
    html += '<div class="qm-rodape-partida"><div class="qm-acoes">' +
      botao('dica', estado.dicaUsada ? 'Dica utilizada' : 'Quero uma dica', 'secundario', estado.dicaUsada || estado.respondida ? ' disabled' : '') +
      botao('pedir-reinicio', 'Reiniciar', 'secundario') + '</div>' +
      (estado.respondida ? botao('proxima', proxima, 'primario') : botao('confirmar', 'Conferir resposta', 'primario',
        questao.tipo === 'escolha' && estado.selecao === null ? ' disabled' : '')) + '</div>';
    if (estado.confirmarReinicio) html += '<div class="qm-aviso-saida" tabindex="-1"><p><strong>Reiniciar esta partida?</strong> ' +
      (estado.historico.length === estado.rodadas.length ? 'O resultado concluído já foi registrado. Você começará uma nova tentativa.' : 'Os pontos desta tentativa serão descartados.') + '</p>' +
      '<div class="qm-acoes">' + botao('cancelar-reinicio', 'Continuar jogando', 'primario') + botao('reiniciar', 'Sim, reiniciar', 'secundario') + '</div></div>';
    return html + '</section>';
  }

  function resultados(jogo) {
    var estado = jogo.estado;
    var total = estado.rodadas.length;
    var percentual = Math.round(estado.acertos * 100 / total);
    var mensagem = percentual === 100 ? 'Você fechou a partida!' : percentual >= 67 ? 'Bom trabalho! Vamos continuar?' : 'Cada tentativa ensina algo novo.';
    var revisao = estado.historico.map(function (resposta, indice) {
      var questao = resposta.questao;
      return '<details class="qm-revisao-item"><summary>' + (indice + 1) + '. ' + escapar(questao.topico) + ' · ' +
        (resposta.acertou ? 'Acertou' : 'Rever resposta') + ' · ' + resposta.pontos + ' pts</summary><div class="qm-revisao-corpo">' +
        '<p><strong>' + escapar(questao.enunciado) + '</strong></p>' + (questao.visual ? '<div class="qm-visual">' + questao.visual + '</div>' : '') +
        '<p>Sua resposta: <strong>' + escapar(resposta.texto) + '</strong>.</p><p>Resposta correta: <strong>' + escapar(textoCorreto(questao)) + '</strong>.</p>' +
        (resposta.nota ? '<p>' + escapar(resposta.nota) + '</p>' : '') + '<p>' + escapar(questao.explicacao) + '</p>' + (resposta.comDica ? '<p class="qm-nota">Você utilizou uma dica neste desafio.</p>' : '') + '</div></details>';
    }).join('');
    var recorde = QM.app.obterProgressoJogo(jogo.config.metadados.id, estado.nivel);
    return '<section class="qm-painel"><div class="qm-resultados-cabecalho"><p class="qm-sobretitulo">Partida concluída · ' + escapar(tituloNivel(jogo)) + '</p>' +
      '<h2 class="qm-subtitulo" tabindex="-1">' + mensagem + '</h2><p class="qm-resultado-numero">' + estado.pontos + '<small> / ' + (estado.rodadas.length * PONTOS_ACERTO) + ' pontos</small></p></div>' +
      '<div class="qm-metricas"><div class="qm-metrica"><span>Acertos</span><strong>' + estado.acertos + ' de ' + total + '</strong></div>' +
      '<div class="qm-metrica"><span>Aproveitamento</span><strong>' + percentual + '%</strong></div>' +
      '<div class="qm-metrica"><span>Recorde neste nível</span><strong>' + (recorde ? recorde.melhorPontuacao : estado.pontos) + ' pts</strong></div></div>' +
      '<p class="qm-nota qm-salvar-aviso">' + (QM.app.progressoPersistente() ? 'Resultado salvo neste navegador.' :
        'Seu navegador não permitiu salvar. O resultado permanece disponível enquanto esta página estiver aberta.') + '</p>' +
      '<div class="qm-acoes">' + botao('iniciar', 'Jogar novamente', 'primario') + botao('inicio', 'Escolher outro nível', 'secundario') +
      '<a class="qm-botao qm-botao-secundario" href="#/">Voltar ao catálogo</a></div></section>' +
      '<section class="qm-painel qm-revisao"><p class="qm-sobretitulo">Aprenda com sua partida</p><h2 class="qm-subtitulo">Revisão dos desafios</h2>' +
      '<p class="qm-texto-suave">Abra cada desafio para conferir a estrutura ou os dados, sua resposta e a explicação.</p>' + revisao + fontes(jogo.config) + '</section>';
  }

  function conteudo(jogo) {
    if (jogo.estado.fase === 'partida') return partida(jogo);
    if (jogo.estado.fase === 'resultado') return resultados(jogo);
    return inicio(jogo);
  }

  function focar(raiz, seletor) {
    var alvo = raiz.querySelector(seletor);
    if (alvo) alvo.focus();
  }

  function atualizarTela(jogo, raiz, seletor) {
    raiz.querySelector('.qm-sessao').innerHTML = conteudo(jogo);
    if (seletor) focar(raiz, seletor);
  }

  function prepararRodada(jogo) {
    var estado = jogo.estado;
    var questao = atual(jogo);
    estado.opcoes = questao.tipo === 'escolha' ? embaralhar(questao.opcoes) : [];
    estado.coef = {
      r: questao.tipo === 'equacao' ? questao.reagentes.map(function () { return 1; }) : [],
      p: questao.tipo === 'equacao' ? questao.produtos.map(function () { return 1; }) : []
    };
    estado.selecao = null;
    estado.valor = '';
    estado.respondida = false;
    estado.dicaUsada = false;
    estado.erro = '';
    estado.confirmarReinicio = false;
  }

  function iniciar(jogo) {
    var estado = jogo.estado;
    estado.rodadas = embaralhar(jogo.config.questoes.filter(function (questao) { return questao.nivel === estado.nivel; })).slice(0, jogo.config.rodadas || RODADAS);
    estado.indice = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.historico = [];
    estado.fase = 'partida';
    prepararRodada(jogo);
  }

  function confirmar(jogo, raiz) {
    var estado = jogo.estado;
    if (estado.fase !== 'partida' || estado.respondida) return;
    var questao = atual(jogo);
    var acertou;
    var texto;
    var nota = '';
    if (questao.tipo === 'equacao') {
      acertou = contagemEquacao(questao, estado.coef).balanceada;
      texto = equacaoTexto(questao, estado.coef);
      var minima = estado.coef.r.every(function (valor, i) { return valor === questao.corretos.r[i]; }) &&
        estado.coef.p.every(function (valor, i) { return valor === questao.corretos.p[i]; });
      if (acertou && !minima) nota = 'Sua equação está balanceada, mas os menores coeficientes inteiros são os indicados acima.';
    } else if (questao.tipo === 'numero') {
      var campo = raiz.querySelector('.qm-numero');
      estado.valor = campo.value;
      var numero = lerNumero(estado.valor);
      if (numero === null) {
        estado.erro = 'Digite um número válido, como −125,5. Não inclua a unidade.';
        atualizarTela(jogo, raiz, '.qm-numero');
        return;
      }
      acertou = Math.abs(numero - questao.resposta) <= (typeof questao.tolerancia === 'number' ? questao.tolerancia : 0.05) + 1e-9;
      texto = numeroLocal(numero) + ' ' + questao.unidade;
    } else {
      var opcao = estado.opcoes.filter(function (item) { return item.id === estado.selecao; })[0];
      if (!opcao) return;
      acertou = opcao.id === questao.correta;
      texto = opcao.texto;
    }
    estado.respondida = true;
    estado.erro = '';
    var pontos = acertou ? (estado.dicaUsada ? PONTOS_COM_DICA : PONTOS_ACERTO) : 0;
    estado.pontos += pontos;
    if (acertou) estado.acertos++;
    estado.historico.push({ questao: questao, texto: texto, acertou: acertou, pontos: pontos, comDica: estado.dicaUsada, nota: nota });
    /* Salva ao responder a última questão, mesmo se a pessoa sair antes de
       clicar em "Ver meu resultado". A trava respondida evita contagem dupla. */
    if (estado.indice === estado.rodadas.length - 1) {
      QM.app.salvarResultadoJogo(jogo.config.metadados.id, estado.nivel, estado.acertos, estado.rodadas.length, estado.pontos);
    }
    atualizarTela(jogo, raiz, '.qm-feedback');
  }

  function localizar(elemento) {
    if (!elemento || !elemento.closest) return null;
    var raiz = elemento.closest('.qm-jogo[data-jogo]');
    var jogo = raiz && jogos[raiz.getAttribute('data-jogo')];
    return jogo ? { raiz: raiz, jogo: jogo } : null;
  }

  document.addEventListener('input', function (evento) {
    if (!evento.target.classList.contains('qm-numero')) return;
    var contexto = localizar(evento.target);
    if (contexto) contexto.jogo.estado.valor = evento.target.value;
  });

  document.addEventListener('submit', function (evento) {
    if (!evento.target.classList.contains('qm-form-resposta')) return;
    evento.preventDefault();
    var contexto = localizar(evento.target);
    if (contexto) confirmar(contexto.jogo, contexto.raiz);
  });

  document.addEventListener('click', function (evento) {
    var alvo = evento.target.closest && evento.target.closest('button[data-qm-acao]');
    if (!alvo || alvo.disabled) return;
    var contexto = localizar(alvo);
    if (!contexto) return;
    var jogo = contexto.jogo;
    var raiz = contexto.raiz;
    var estado = jogo.estado;
    var acao = alvo.getAttribute('data-qm-acao');
    if (acao === 'nivel' && estado.fase === 'inicio') {
      var nivel = alvo.getAttribute('data-qm-nivel');
      if (!jogo.config.niveis.some(function (n) { return n.id === nivel; })) return;
      estado.nivel = nivel;
      atualizarTela(jogo, raiz, '[data-qm-nivel="' + nivel + '"]');
    } else if ((acao === 'iniciar' && estado.fase !== 'partida') || (acao === 'reiniciar' && estado.confirmarReinicio)) {
      iniciar(jogo);
      atualizarTela(jogo, raiz, '.qm-pergunta');
    } else if (acao === 'inicio' && estado.fase === 'resultado') {
      estado.fase = 'inicio';
      atualizarTela(jogo, raiz, '.qm-subtitulo');
    } else if (estado.fase === 'partida') {
      if (acao === 'escolher' && !estado.respondida) {
        estado.selecao = alvo.getAttribute('data-qm-opcao');
        atualizarTela(jogo, raiz, '[data-qm-opcao="' + estado.selecao + '"]');
      } else if (acao === 'confirmar') confirmar(jogo, raiz);
      else if (acao === 'dica' && !estado.respondida && !estado.dicaUsada) {
        estado.dicaUsada = true;
        atualizarTela(jogo, raiz, '.qm-dica');
      } else if (acao === 'coef' && !estado.respondida) {
        var lado = alvo.getAttribute('data-qm-lado');
        var posicao = parseInt(alvo.getAttribute('data-qm-idx'), 10);
        var passo = parseInt(alvo.getAttribute('data-qm-passo'), 10);
        if ((lado !== 'r' && lado !== 'p') || !estado.coef[lado] || !isFinite(posicao) || estado.coef[lado][posicao] === undefined || (passo !== 1 && passo !== -1)) return;
        estado.coef[lado][posicao] = Math.min(COEFICIENTE_MAXIMO, Math.max(1, estado.coef[lado][posicao] + passo));
        atualizarTela(jogo, raiz, '[data-qm-acao="coef"][data-qm-lado="' + lado + '"][data-qm-idx="' + posicao + '"][data-qm-passo="' + passo + '"]');
      } else if (acao === 'sinal' && !estado.respondida) {
        var valor = estado.valor.trim().replace(/\u2212/g, '-');
        estado.valor = valor.charAt(0) === '-' ? valor.slice(1) : '-' + valor.replace(/^\+/, '');
        var campo = raiz.querySelector('.qm-numero');
        campo.value = estado.valor;
        campo.focus();
      } else if (acao === 'proxima' && estado.respondida) {
        if (estado.indice === estado.rodadas.length - 1) {
          estado.fase = 'resultado';
          atualizarTela(jogo, raiz, '.qm-subtitulo');
        } else {
          estado.indice++;
          prepararRodada(jogo);
          atualizarTela(jogo, raiz, '.qm-pergunta');
        }
      } else if (acao === 'pedir-reinicio' || acao === 'cancelar-reinicio') {
        estado.confirmarReinicio = acao === 'pedir-reinicio';
        atualizarTela(jogo, raiz, estado.confirmarReinicio ? '.qm-aviso-saida' : '[data-qm-acao="pedir-reinicio"]');
      }
    }
  });

  function configurarValido(config) {
    if (!config || !QM.dominio.jogoValido(config.metadados) || !Array.isArray(config.niveis) || !Array.isArray(config.questoes)) return false;
    var ids = {};
    var valido = config.questoes.every(function (questao) {
      if (!questao.id || ids[questao.id] || !questao.enunciado || !questao.dica || !questao.explicacao ||
        !config.niveis.some(function (nivel) { return nivel.id === questao.nivel; })) return false;
      ids[questao.id] = true;
      if (questao.tipo === 'equacao') {
        var c = questao.corretos;
        var termosValidos = function (termos, lista) {
          return Array.isArray(termos) && termos.length > 0 && Array.isArray(lista) && lista.length === termos.length &&
            termos.every(function (termo) { return termo && contarAtomos(termo.formula); }) &&
            lista.every(function (valor) { return Number.isInteger(valor) && valor >= 1 && valor <= COEFICIENTE_MAXIMO; });
        };
        return Boolean(c) && termosValidos(questao.reagentes, c.r) && termosValidos(questao.produtos, c.p) &&
          contagemEquacao(questao, c).balanceada;
      }
      if (questao.tipo === 'numero') return typeof questao.resposta === 'number' && isFinite(questao.resposta) && Boolean(questao.unidade);
      if (questao.tipo !== 'escolha' || !Array.isArray(questao.opcoes) || questao.opcoes.length < 2) return false;
      var opcoes = {};
      return questao.opcoes.every(function (opcao) {
        if (!opcao.id || opcoes[opcao.id] || !opcao.texto) return false;
        opcoes[opcao.id] = true;
        return true;
      }) && questao.opcoes.filter(function (opcao) { return opcao.id === questao.correta; }).length === 1;
    });
    return valido && config.niveis.length > 0 && config.niveis.every(function (nivel) {
      return config.questoes.filter(function (questao) { return questao.nivel === nivel.id; }).length >= (config.rodadas || RODADAS);
    });
  }

  QM.quiz.registrar = function (config) {
    if (!configurarValido(config)) {
      console.error('[Química Master] Configuração de quiz inválida:', config && config.metadados && config.metadados.id);
      return false;
    }
    var id = config.metadados.id;
    var jogo = { config: config, estado: { fase: 'inicio', nivel: config.niveis[0].id } };
    jogos[id] = jogo;
    return QM.app.registrarJogo(config.metadados, function () {
      return '<section class="qm-jogo qm-tema-' + escapar(config.tema) + '" data-jogo="' + escapar(id) + '">' +
        '<a class="qm-voltar" href="#/">← Voltar ao catálogo</a><header class="qm-jogo-cabecalho"><div>' +
        '<p class="qm-selo">' + escapar(config.metadados.materia) + '</p><h1 class="qm-titulo">' + escapar(config.metadados.titulo) + '</h1>' +
        '<p class="qm-intro-texto">' + escapar(config.introducao) + '</p></div><div class="qm-marca" aria-hidden="true">' +
        (config.marca || (config.tema === 'entalpia' ? 'ΔH' : 'CH<sub>3</sub>')) + '</div></header><div class="qm-sessao">' + conteudo(jogo) + '</div></section>';
    });
  };
})(window.QM = window.QM || {});
