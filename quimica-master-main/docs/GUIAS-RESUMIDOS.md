# Guias resumidos

## Contribuição (CONTRIBUTING)
- Branches: `feature/nome-da-funcionalidade`, `fix/nome-do-bug`.
- Commits curtos no imperativo ("adiciona jogo de ligações").
- Pull Request descrevendo o quê, o porquê e como testar; um PR por
  funcionalidade. Arquivos compartilhados (`index.html`, `services.js`,
  `views.js`): mudanças pequenas e justificadas — é onde ocorrem conflitos.
- Antes do PR: abrir o `index.html` e testar as 3 abas + sua funcionalidade.

## Como adicionar reportagens (ADDING-ARTICLES)
- Objeto novo em `scripts/data/reportagens-data.js` com `titulo`, `resumo`
  (breve, fiel), `fonte` (instituição) e `url`.
- Confirme o link abrindo a página antes de salvar. Proibido `href="#"`.
- A página lista o cartão automaticamente.

## Como adicionar elementos (ADDING-ELEMENTS)
- Objeto novo em `scripts/data/elementos-data.js` com `numero`, `simbolo`,
  `nome`, `massa`, `grupo`, `periodo`, `categoria` (chave existente em
  `QM.dados.categorias` — crie a categoria nova junto com a cor CSS em
  `periodic-table.css` e o rótulo na legenda).
- A grade posiciona a célula por `grupo` (coluna) × `periodo` (linha).
- Confira número atômico, símbolo e massa em fonte confiável (IUPAC).

## Offline e distribuição (OFFLINE-AND-DISTRIBUTION)
- Funciona 100% offline: sem CDNs de CSS/JS; a fonte Clash Display é a
  única referência externa e degrada sem quebrar o layout.
- Pendrive: copie a pasta completa; abra `index.html` com duplo clique.
- Link: publique a pasta em GitHub Pages ou Netlify (arrastar a pasta).
- Links das reportagens exigem internet — o aviso está na própria página.

## Testes (TESTING)
- Checklist manual (sem ambiente de testes automatizados nesta etapa):
  1. As 3 abas navegam e marcam estado ativo.
  2. "Jogar agora" abre a página correta dos 2 jogos; "Voltar ao catálogo" funciona.
  3. Abrir `#/jogo/impostor` e `#/jogo/balanceamento` direto na barra funciona.
  4. Os 4 links de reportagem abrem a página real em nova aba.
  5. Nenhum erro no console (F12).
  6. Layout em largura de celular (F12 → modo responsivo).
- Pendências conhecidas: mecânicas dos jogos, 118 elementos, busca/filtros,
  persistência de pontuação.