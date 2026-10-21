

export const jogoOrganicaData = [
  {
    id: 1,
    pergunta: "Qual é a função orgânica presente na molécula CH₃-CH₂-OH?",
    opcoes: ["Aldeído", "Álcool", "Cetona", "Ácido Carboxílico"],
    respostaCorreta: 1, // Índice da opção correta ("Álcool")
    explicacao: "A presença do grupo hidroxila (-OH) ligado a um carbono saturado caracteriza um álcool."
  },
  {
    id: 2,
    pergunta: "Qual o nome IUPAC do composto CH₃-CO-CH₃?",
    opcoes: ["Propanal", "Propan-1-ol", "Propanona", "Ácido Propanoico"],
    respostaCorreta: 2, // "Propanona"
    explicacao: "Trata-se de uma cetona com 3 carbonos (prefixo prop-, infixo -an-, sufixo -ona)."
  }
  // Adicione mais perguntas conforme desejar
];

export class JogoOrganica {
  constructor() {
    this.perguntas = [...jogoOrganicaData];
    this.indiceAtual = 0;
    this.pontuacao = 0;
  }

  getPerguntaAtual() {
    return this.perguntas[this.indiceAtual];
  }

  validarResposta(indiceSelecionado) {
    const Pergunta = this.getPerguntaAtual();
    const ehCorreto = indiceSelecionado === Pergunta.respostaCorreta;
    if (ehCorreto) {
      this.pontuacao += 10;
    }
    return { ehCorreto, explicacao: Pergunta.explicacao };
  }

  proximaPergunta() {
    this.indiceAtual++;
    return this.indiceAtual < this.perguntas.length;
  }

  reiniciar() {
    this.indiceAtual = 0;
    this.pontuacao = 0;
  }
}