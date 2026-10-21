# Arquitetura

## Camadas e responsabilidades

| Camada | Pasta | Responsabilidade | Pode depender de |
|---|---|---|---|
| Dados | `scripts/data/` | Arrays puros: jogos, reportagens, elementos, categorias | nada |
| Domínio | `scripts/domain/` | Contrato de jogo (`CAMPOS_OBRIGATORIOS_DO_JOGO`) e validação | Dados (apenas tipos) |
| Aplicação | `scripts/application/` | Registro central de jogos e serviços de consulta | Domínio, Dados |
| Jogos | `scripts/games/` | Metadados + `render()` de cada jogo; registro no catálogo | Aplicação |
| Apresentação | `scripts/presentation/` | Roteador, layout, views; consome só serviços | Aplicação |

Regra fundamental: **dependência sempre aponta para baixo**. A apresentação
nunca lê `QM.dados` diretamente; os jogos nunca alteram navegação ou layout.

## Fluxo da aplicação

1. `index.html` carrega os scripts na ordem: dados → domínio → aplicação →
   jogos → apresentação → `main.js`.
2. `main.js` chama `QM.router.iniciar()`, que escuta `hashchange`.
3. O roteador resolve a rota (`#/`, `#/jogo/:id`, `#/sites-e-reportagens`,
   `#/tabela-periodica`, `#/documentacao`) e pede a view correspondente.
4. A view consulta os serviços (`QM.app.*`) e devolve HTML.
5. `QM.ui.renderizar()` monta cabeçalho + conteúdo + rodapé em `#app`.

## Contrato de um jogo

Todo jogo registrado deve ter: `id` (único), `titulo`, `materia`, `topicos`
(array), `dificuldade`, `descricao`, `rota` — e uma função `render()` que
devolve o HTML da página. A validação está em `scripts/domain/contratos.js`;
jogo inválido é rejeitado com erro no console, sem quebrar a plataforma.

## Decisões técnicas

- **Scripts clássicos em vez de módulos ES**: módulos ES não funcionam via
  `file://` (bloqueio de CORS dos navegadores). Com scripts clássicos e o
  namespace global `QM`, o projeto abre com duplo clique — requisito do
  laboratório e do pendrive. O custo é a ordem de carregamento no HTML;
  ela está documentada e comentada no `index.html`.
- **Namespace único `window.QM`**: evita variáveis globais soltas e deixa
  a origem de cada função explícita (`QM.app.listarJogos`).
- **Views como funções que devolvem HTML**: proporcional ao escopo; sem
  framework de componentes. Os dados exibidos vêm dos serviços, nunca de
  literais espalhados pelas views.