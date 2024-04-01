const { ValidatePedidos } = require('../classes/pedidosValidator.js');

describe('ValidatePedidos', () => {
    describe('validateDataTypes', () => {
        test('should return true for valid data types', () => {
            const data = [
                { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 2, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
                { número_item: 3, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
            ];
            expect(ValidatePedidos.validateDataTypes(data)).toBe(true);
        });

        test('should return false for invalid data types', () => {
            const data = [
                { número_item: '1', código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 2, código_produto: 'DEF456', quantidade_produto: '20', valor_unitário_produto: 7.8 },
                { número_item: 3, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: '3.2' }
            ];
            expect(ValidatePedidos.validateDataTypes(data)).toBe(false);
        });
    });

    describe('validateRepetitionNumeroItem', () => {
        test('should return true when no repetition of número_item', () => {
            const data = [
                { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 2, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
                { número_item: 3, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
            ];
            expect(ValidatePedidos.validateRepetitionNumeroItem(data)).toBe(true);
        });

        test('should return false when repetition of número_item exists', () => {
            const data = [
                { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 2, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
                { número_item: 2, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
            ];
            expect(ValidatePedidos.validateRepetitionNumeroItem(data)).toBe(false);
        });
    });

    describe('validateNumeroItemSequencia', () => {
        test('should return true when números de item are in sequence', () => {
            const data = [
                { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 2, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
                { número_item: 3, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
            ];
            expect(ValidatePedidos.validateNumeroItemSequencia(data)).toBe(true);
        });

        test('should return false when números de item are not in sequence', () => {
            const data = [
                { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
                { número_item: 3, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
                { número_item: 2, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
            ];
            expect(ValidatePedidos.validateNumeroItemSequencia(data)).toBe(false);
        });
    });

    test('isValid should return true for valid data (main validation function)', () => {
        const data = [
            { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: 5.5 },
            { número_item: 2, código_produto: 'DEF456', quantidade_produto: 20, valor_unitário_produto: 7.8 },
            { número_item: 3, código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
        ];
        expect(ValidatePedidos.isValid(data)).toBe(true);
    });

    test('isValid should return false for invalid data (main validation function)', () => {
        const data = [
            { número_item: 1, código_produto: 'ABC123', quantidade_produto: 10, valor_unitário_produto: '5.5' },
            { número_item: 2, código_produto: 'DEF456', quantidade_produto: '20', valor_unitário_produto: 7.8 },
            { número_item: '3', código_produto: 'GHI789', quantidade_produto: 15, valor_unitário_produto: 3.2 }
        ];
        expect(ValidatePedidos.isValid(data)).toBe(false);
    });
});
