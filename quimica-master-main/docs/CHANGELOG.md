# Changelog

## Outubro 2026 — Reportagens por tema
- Aba "Sites e Reportagens" ganhou menu lateral de temas; ao escolher um tema
  o submenu lista as reportagens e os cartões aparecem ao lado.
- Novas rotas: `#/sites-e-reportagens/:tema` e `#/sites-e-reportagens/:tema/:id`.
- Menu com ícone por tema, subtópicos em árvore, campo de busca e cards com banner
  opcional (campo `imagem`). Visual neutro: sem fundos azul-claro e sem ícones repetidos.
- Menu mais largo; cada tema pode ser expandido/recolhido pela seta; sem linha de árvore.
- Cabeçalho único (removido o cartão duplicado com borda e sombra); título e texto de abertura menores,
  com o texto em uma linha; no celular o menu vira um botão hambúrguer que abre um painel.

## Outubro 2026 — Refatoração estrutural
- Código separado em camadas (dados, domínio, aplicação, jogos, apresentação).
- Registro central de jogos com contrato validado; catálogo gerado do registro.
- Dados de reportagens e elementos separados da apresentação.
- Documentação: README, ARCHITECTURE, ADDING-A-GAME e guias resumidos.

## Outubro 2026 — Base funcional
- 3 abas navegáveis, páginas estruturais dos 2 jogos, 4 reportagens reais
  verificadas, tabela periódica dos períodos 1–3 com legenda.
## Atualização — Bioquímica e Química Geral (preparação para o ENEM)
- Botões “Jogar Agora” do catálogo padronizados em branco.
- Adicionados jogos de Bioquímica e Química Geral com três níveis de dificuldade.
- Cada matéria possui 24 questões (8 por nível), com enunciado contextualizado, quatro alternativas, dica e explicação.
- Cada rodada dos dois jogos sorteia cinco questões sem repetição dentro da partida; os demais jogos mantêm a configuração padrão de seis desafios.
- Incluídas identidades visuais específicas para Bioquímica e Química Geral, aproveitando o motor de quizzes existente.
