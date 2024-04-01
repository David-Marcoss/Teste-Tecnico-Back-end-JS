const { ValidateNotas } = require('../classes/notasValidator.js');

const pedidos = new Map([
    ['1', [
        {
            'número_item': 2,
            'código_produto': 'K13',
            quantidade_produto: 5,
            'valor_unitário_produto': 15
        },
        {
            'número_item': 4,
            'código_produto': 'SD9',
            quantidade_produto: 12,
            'valor_unitário_produto': 5
        },
        {
            'número_item': 3,
            'código_produto': 'MR2',
            quantidade_produto: 10,
            'valor_unitário_produto': 17.3
        },
        {
            'número_item': 1,
            'código_produto': 'A22',
            quantidade_produto: 9,
            'valor_unitário_produto': 10
        }
    ]],
    ['2', [
        {
            'número_item': 2,
            'código_produto': 'XK1',
            quantidade_produto: 25,
            'valor_unitário_produto': 20
        },
        {
            'número_item': 3,
            'código_produto': 'WF99',
            quantidade_produto: 90,
            'valor_unitário_produto': 1.7
        },
        {
            'número_item': 1,
            'código_produto': 'HU5',
            quantidade_produto: 5,
            'valor_unitário_produto': 33
        }
    ]]
]);

describe('ValidateNotas', () => {
    describe('isValid', () => {
        test('should return true for valid data (main validation function)', () => {
            const data = [
                { id_pedido: '1', número_item: 1, quantidade_produto: 10 },
                {id_pedido: "1", número_item: 4, quantidade_produto: 4},
                {id_pedido: "1", número_item: 2, quantidade_produto: 5},
            ];
            expect(ValidateNotas.isValid(data, pedidos)).toBe(true);
        });

        test('should return false for invalid data (main validation function)', () => {
            const data = [
                { id_pedido: "1", número_item: 1, quantidade_produto: "10" },
                {id_pedido: "1", número_item: 4, quantidade_produto: 4},
                {id_pedido: "1", número_item: 2, quantidade_produto: 5},
            ];
            expect(ValidateNotas.isValid(data, pedidos)).toBe(false);
        });
    });

    describe('validateDataTypes', () => {
        test('should return true for valid data types', () => {
            const data = [
                { id_pedido: "1", número_item: 1, quantidade_produto: 10 },
                {id_pedido: "1", número_item: 4, quantidade_produto: 4},
                {id_pedido: "2", número_item: 2, quantidade_produto: 5},
                {id_pedido: "2", número_item: 3, quantidade_produto: 5},
            ];
            expect(ValidateNotas.validateDataTypes(data)).toBe(true);
        });

        test('should return False for invalid data types', () => {
            const data1 = [{ id_pedido: "1", número_item: 1, quantidade_produto: "10" }];
            const data2 = [{ id_pedido: "1", número_item: -10, quantidade_produto: 10 }];
            const data3 = [{ id_pedido: "pedido@1", número_item: 1, quantidade_produto: 10 }];

            expect(ValidateNotas.validateDataTypes(data1)).toBe(false);
            expect(ValidateNotas.validateDataTypes(data2)).toBe(false);
            expect(ValidateNotas.validateDataTypes(data3)).toBe(false);
        });
    });

    describe('validateIdPedidosInNotas', () => {
        test('should return true for valid IDs', () => {
            const data = [
                { id_pedido: "1", número_item: 1, quantidade_produto: 10 },
                {id_pedido: "1", número_item: 4, quantidade_produto: 4},
                {id_pedido: "2", número_item: 2, quantidade_produto: 5},
            ];
            expect(ValidateNotas.validateIdPedidosInNotas(data, pedidos)).toBe(true);
        });

        test('should return false for invalid IDs', () => {
            const data = [
                { id_pedido: 'P7', número_item: 1, quantidade_produto: 10 },
                {id_pedido: "P8", número_item: 4, quantidade_produto: 4},
            ];
            expect(ValidateNotas.validateIdPedidosInNotas(data, pedidos)).toBe(false);
        });
    });

    describe('validateNumeroItemPedidosInNotas', () => {
        test('should return true for valid items', () => {
            const data = [
                { id_pedido: "1", número_item: 1, quantidade_produto: 10 },
                {id_pedido: "1", número_item: 4, quantidade_produto: 4},
                {id_pedido: "1", número_item: 2, quantidade_produto: 5},
            ];
            expect(ValidateNotas.validateNumeroItemPedidosInNotas(data, pedidos)).toBe(true);
        });

        test('should return false for invalid items', () => {
            const data = [
                { id_pedido: "1", número_item: 1000, quantidade_produto: 10 },
                {id_pedido: "1", número_item: 4000, quantidade_produto: 4},
            ];
            expect(ValidateNotas.validateNumeroItemPedidosInNotas(data, pedidos)).toBe(false);
        });
    });

    describe('numeroItemExistsInPedido', () => {
        test('should return true if item exists in pedido', () => {
            const pedido = [
                { 'número_item': 1 },
                { 'número_item': 3 },
                { 'número_item': 4 }
            ];
            expect(ValidateNotas.numeroItemExistsInPedido(4, pedido)).toBe(true);
        });

        test('should return false if item does not exist in pedido', () => {
            const pedido = [
                { 'número_item': 2 },
                { 'número_item': 4 },
                { 'número_item': 6 }
            ];
            expect(ValidateNotas.numeroItemExistsInPedido(3, pedido)).toBe(false);
        });
    });
});
