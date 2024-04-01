const ProcessPedidosENotas = require('../classes/processPedidosENotasClass');

const pedido_validos = [
    {
      id: '1.txt',
      data: '﻿{"número_item": 1, "código_produto": "K13", "quantidade_produto": 5, "valor_unitário_produto": 15.00}\r\n' +
        '{"número_item": 2, "código_produto": "SD9", "quantidade_produto": 12, "valor_unitário_produto": 5.00}\r\n' +
        '{"número_item": 3, "código_produto": "MR2", "quantidade_produto": 10, "valor_unitário_produto": 17.30}\r\n' +
        '{"número_item": 4, "código_produto": "A22", "quantidade_produto": 12, "valor_unitário_produto": 10.00}'
    },
    {
      id: '2.txt',
      data: '﻿{"número_item": 1, "código_produto": "XK1", "quantidade_produto": 25, "valor_unitário_produto": 20.00}\r\n' +
        '{"número_item": 2, "código_produto": "WF99", "quantidade_produto": 90, "valor_unitário_produto": 1.70}\r\n' +
        '{"número_item": 3, "código_produto": "HU5", "quantidade_produto": 90, "valor_unitário_produto": 33.00}'
    }
]

const notas_validas = [
    {
      id: 'N1.txt',
      data: '﻿{"id_pedido": "1", "número_item": 4, "quantidade_produto": 4}\r\n' +
        '{"id_pedido": "1", "número_item": 2, "quantidade_produto": 12}'
    },
    {
      id: 'N2.txt',
      data: '﻿{"id_pedido": "2", "número_item": 1, "quantidade_produto": 5}\r\n' +
        '{"id_pedido": "2", "número_item": 3, "quantidade_produto": 90}'
    },
    {
      id: 'N6.txt',
      data: '﻿{"id_pedido": "1", "número_item": 3, "quantidade_produto": 3}\r\n' +
        '{"id_pedido": "1", "número_item": 4, "quantidade_produto": 8}\r\n' +
        '{"id_pedido": "1", "número_item": 1, "quantidade_produto": 4}'
    }
]

describe('ProcessadorPedidosENotas', () => {
    let processador;

    beforeEach(() => {
        processador = new ProcessPedidosENotas();
    });

    describe('criarPedidos', () => {
        test('should create valid pedidos', () => {
            
            expect(processador.criarPedidos(pedido_validos)).toBe(true);
        });

        test('should throw error for invalid pedidos', () => {
            const pedidos = [
                { id: '1', data: '[{"número_item": 1, "código_produto": "A1", "quantidade_produto": "invalid", "valor_unitário_produto": 5}]' }
            ];
    
            expect(() => processador.criarPedidos(pedidos)).toThrowError('Dados inválidos em pedido 1!!!');
        });
    });

    describe('criarNotas', () => {
        beforeEach(() => {
            processador.criarPedidos(pedido_validos);
        });

        test('should create valid notas', () => {
    
            expect(processador.criarNotas(notas_validas)).toBe(true);
        });

        test('should throw error for invalid notas', () => {
            const notas = [
                { id: '1', data: '[{"id_pedido": "1", "número_item": 1, "quantidade_produto": "invalid"}]' }
            ];

            expect(() => processador.criarNotas(notas)).toThrowError('Dados inválidos em Nota 1!!!');
        });
    });
    
    describe('processarPedidosNotas', () => {
       

        test('should process pedidos and notes', () => {
            processador.criarPedidos(pedido_validos);
            
            processador.criarNotas(notas_validas);
            
            expect(processador.processarPedidosNotas()).toBe(true);
        });

        test('should process pedidos and notes without error', () => {

            const notas_invalidas2 = [{
                id: 'N1.txt',
                data: 
                  '﻿{"id_pedido": "1", "número_item": 1, "quantidade_produto": 400}\r\n' +
                  '{"id_pedido": "1", "número_item": 2, "quantidade_produto": 12}'
              },
             ];

            processador.criarPedidos(pedido_validos);
            processador.criarNotas(notas_invalidas2);
            
            expect(() => processador.processarPedidosNotas()).toThrowError(/Pedido 1: a quantidade de produtos para o item 1 ultrapassou a quantidade de produto disponível/); 
        });

       
    });

    describe('gerarPedidosPendentes', () => {
        beforeEach(() => {
            processador.criarPedidos(pedido_validos);
            processador.criarNotas(notas_validas);
            processador.processarPedidosNotas();
        });

        test('should generate pedidos pendentes without', () => {
            const pedidosPendentes = new Map([
                ['1', {
                    valorTotalPedido: 428,
                    saldoValor: 136.1,
                    itensPendentes: [
                        { numero_item: 1, saldo_da_quantidade: 1 },
                        { numero_item: 3, saldo_da_quantidade: 7 }
                    ]
                }],
                ['2', {
                    valorTotalPedido: 3623,
                    saldoValor: 553,
                    itensPendentes: [
                        { numero_item: 1, saldo_da_quantidade: 20 },
                        { numero_item: 2, saldo_da_quantidade: 90 }
                    ]
                }]
            ]);
    
            expect(processador.gerarPedidosPendentes()).toEqual(pedidosPendentes);
        });        
    });

});
