/* ============ CAMADA: DADOS — Elementos químicos (períodos 1–3) ============
   Para ampliar a tabela, adicione objetos neste array com grupo e período
   reais (ver docs/GUIAS-RESUMIDOS.md → "Como adicionar elementos"). */
(function (QM) {
  'use strict';
  QM.dados = QM.dados || {};

  QM.dados.elementos = [
    { numero: 1,  simbolo: 'H',  nome: 'Hidrogênio',           massa: '1,008',   grupo: 1,  periodo: 1, categoria: 'nao-metal' },
    { numero: 2,  simbolo: 'He', nome: 'Hélio',                massa: '4,0026',  grupo: 18, periodo: 1, categoria: 'gas-nobre' },
    { numero: 3,  simbolo: 'Li', nome: 'Lítio',                massa: '6,94',    grupo: 1,  periodo: 2, categoria: 'metal-alcalino' },
    { numero: 4,  simbolo: 'Be', nome: 'Berílio',              massa: '9,0122',  grupo: 2,  periodo: 2, categoria: 'metal-alcalinoterroso' },
    { numero: 5,  simbolo: 'B',  nome: 'Boro',                 massa: '10,81',   grupo: 13, periodo: 2, categoria: 'semimetal' },
    { numero: 6,  simbolo: 'C',  nome: 'Carbono',              massa: '12,011',  grupo: 14, periodo: 2, categoria: 'nao-metal' },
    { numero: 7,  simbolo: 'N',  nome: 'Nitrogênio',           massa: '14,007',  grupo: 15, periodo: 2, categoria: 'nao-metal' },
    { numero: 8,  simbolo: 'O',  nome: 'Oxigênio',             massa: '15,999',  grupo: 16, periodo: 2, categoria: 'nao-metal' },
    { numero: 9,  simbolo: 'F',  nome: 'Flúor',                massa: '18,998',  grupo: 17, periodo: 2, categoria: 'halogenio' },
    { numero: 10, simbolo: 'Ne', nome: 'Neônio',               massa: '20,180',  grupo: 18, periodo: 2, categoria: 'gas-nobre' },
    { numero: 11, simbolo: 'Na', nome: 'Sódio',                massa: '22,990',  grupo: 1,  periodo: 3, categoria: 'metal-alcalino' },
    { numero: 12, simbolo: 'Mg', nome: 'Magnésio',             massa: '24,305',  grupo: 2,  periodo: 3, categoria: 'metal-alcalinoterroso' },
    { numero: 13, simbolo: 'Al', nome: 'Alumínio',             massa: '26,982',  grupo: 13, periodo: 3, categoria: 'metal' },
    { numero: 14, simbolo: 'Si', nome: 'Silício',              massa: '28,085',  grupo: 14, periodo: 3, categoria: 'semimetal' },
    { numero: 15, simbolo: 'P',  nome: 'Fósforo',              massa: '30,974',  grupo: 15, periodo: 3, categoria: 'nao-metal' },
    { numero: 16, simbolo: 'S',  nome: 'Enxofre',              massa: '32,06',   grupo: 16, periodo: 3, categoria: 'nao-metal' },
    { numero: 17, simbolo: 'Cl', nome: 'Cloro',                massa: '35,45',   grupo: 17, periodo: 3, categoria: 'halogenio' },
    { numero: 18, simbolo: 'Ar', nome: 'Argônio',              massa: '39,95',   grupo: 18, periodo: 3, categoria: 'gas-nobre' }
  ];

  QM.dados.categorias = [
    { chave: 'nao-metal',              rotulo: 'Não-metal' },
    { chave: 'gas-nobre',              rotulo: 'Gás nobre' },
    { chave: 'metal-alcalino',         rotulo: 'Metal alcalino' },
    { chave: 'metal-alcalinoterroso',  rotulo: 'Metal alcalinoterroso' },
    { chave: 'semimetal',              rotulo: 'Semimetal' },
    { chave: 'halogenio',              rotulo: 'Halogênio' },
    { chave: 'metal',                  rotulo: 'Metal' }
  ];
})(window.QM = window.QM || {});