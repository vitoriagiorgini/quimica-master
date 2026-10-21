# Química Master

Plataforma educacional de jogos de Química, projeto acadêmico de extensão.
Base visual aprovada do MVP, reorganizada em arquivos separados por camadas.

## Objetivo
Estudar e revisar Química por meio de jogos, com uma base de código que
outros estudantes consigam entender e ampliar sem retrabalho.

## Tecnologias
HTML, CSS e JavaScript puros (scripts clássicos, sem módulos ES, sem build,
sem framework). Única referência externa: a fonte Clash Display via CDN —
sem internet, o site degrada para fonte do sistema sem quebrar o layout.

## Como executar
Abra `index.html` com duplo clique em qualquer navegador. Não precisa
servidor, instalação nem internet. Para distribuir por pendrive, copie a
pasta inteira do projeto.

## Estrutura
- `styles/` — CSS por responsabilidade (tokens/layout, componentes, páginas, tabela).
- `scripts/data/` — dados puros (jogos, reportagens, elementos).
- `scripts/domain/` — contrato de jogo e validação.
- `scripts/application/` — registro central de jogos e serviços de consulta.
- `scripts/games/` — módulos independentes de cada jogo.
- `scripts/presentation/` — roteador, layout e views.
- `docs/` — arquitetura, guias de extensão e changelog.
- `prototype/` — cópia intacta do MVP original (não alterar).

## O que está implementado
- Navegação real entre as 3 abas (roteador por hash).
- Catálogo com 2 jogos e páginas próprias (estrutura visual, sem mecânica).
- 4 reportagens reais com links verificados (out/2026).
- Tabela periódica dos períodos 1–3 com legenda por categoria.

## Limitações conhecidas
- Mecânicas dos jogos ainda não implementadas (páginas preparam a estrutura).
- Tabela com 18 de 118 elementos; busca e filtros ficam para a próxima etapa.
- Links externos das reportagens exigem internet.
- Sem persistência de pontuação nesta etapa.

## Como contribuir
Leia `docs/ARCHITECTURE.md` e `docs/ADDING-A-GAME.md` antes de alterar
arquivos compartilhados. Licença: definir com a instituição (sugestão: MIT).

## Jogos de preparação para o ENEM

Bioquímica e Química Geral possuem três níveis de dificuldade (iniciante, intermediário e avançado), com oito questões por nível. Cada partida sorteia seis questões do nível escolhido, sem repetição dentro da rodada. As questões incluem dicas e explicações para apoiar a revisão. Os botões ‘Jogar Agora’ do catálogo seguem o padrão branco.
