[ADDING-A-GAME.md](https://github.com/user-attachments/files/33722436/ADDING-A-GAME.md)
# Como adicionar um novo jogo

Este guia permite criar um jogo completo sem alterar navegação, layout
global ou o código dos outros jogos.

## Passo a passo

1. **Crie o arquivo do jogo**: `scripts/games/meu-jogo.js`, copiando a estrutura de `scripts/games/nomeie-molecula.js` quando o jogo for um quiz
   com níveis e questões, usando `QM.quiz.registrar()` para reaproveitar a interface.
2. **Preencha os metadados** com todos os campos do contrato:
   `id` (único, sem espaços), `titulo`, `materia`, `topicos` (array),
   `dificuldade`, `descricao`, `rota` (`#/jogo/meu-jogo`).
3. **Implemente a página** dentro do `render()`: título, link "Voltar ao
   catálogo" (`href="#/"`), instruções e área principal do jogo.
4. **Registre o jogo** no final do arquivo:
   `QM.app.registrarJogo(metadados, render);`
5. **Carregue o script**: adicione no `index.html` a tag
   `<script src="scripts/games/meu-jogo.js"></script>` junto dos outros
   jogos (antes dos arquivos de `presentation/`).

Pronto: o catálogo lista o jogo automaticamente — nenhum outro arquivo
precisa ser editado. Se algum campo do contrato faltar, o jogo não entra
no catálogo e o console mostra o erro.

## Regras para a mecânica (quando implementar)

- Toda a lógica do jogo fica dentro do seu arquivo. Nada de regras nas
  views ou no roteador.
- Se precisar de estado (pontuação, rodadas), crie funções próprias no
  módulo; se precisar de persistência local, adicione um pequeno módulo
  em `scripts/application/` e documente em `ARCHITECTURE.md`.
- Não use `innerHTML` com dados digitados pelo jogador sem sanitizar.

## Exemplo mínimo funcional

```js
(function (QM) {
  'use strict';
  var metadados = {
    id: 'ligacoes', titulo: 'Tipos de Ligação', materia: 'Química Geral',
    topicos: ['Ligações químicas'], dificuldade: 'Fácil',
    descricao: 'Classifique compostos por tipo de ligação.',
    rota: '#/jogo/ligacoes'
  };
  function render() {
    return '<div class="pagina-jogo">' +
      '<a class="voltar" href="#/">← Voltar ao catálogo</a>' +
      '<h1 class="titulo-secao">' + metadados.titulo + '</h1>' +
      '<div class="area-reservada"><strong>Área principal do jogo</strong>' +
      'Mecânica em desenvolvimento.</div></div>';
  }
  QM.app.registrarJogo(metadados, render);
})(window.QM = window.QM || {});
