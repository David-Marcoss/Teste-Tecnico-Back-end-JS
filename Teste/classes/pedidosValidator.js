const { isPositiveInteger, isAlphanumeric, isNumericPositive } = require('../utils/utils.js');


// Classe para validar dados de pedidos
class ValidatePedidos {
    
    // Verifica se os dados do pedido são válidos
    static isValid(data) {
        const validatedData = this.validateDataTypes(data);

        // Verifica se os dados são válidos, se não há repetição de número de item e se os números de item estão em sequência
        if (!validatedData || !this.validateRepetitionNumeroItem(data) || !this.validateNumeroItemSequencia(data)) {
            return false;
        }
        return true;
    }

    // Valida os tipos de dados dos elementos do pedido
    static validateDataTypes(data) {
        return data.every(obj => (
            isPositiveInteger(obj.número_item) &&
            isAlphanumeric(obj.código_produto) &&
            isPositiveInteger(obj.quantidade_produto) &&
            isNumericPositive(obj.valor_unitário_produto)
        ));
    }

    // Verifica se há repetição de número de item no pedido
    static validateRepetitionNumeroItem(data) {
        const numsItems = new Set();
        for (const element of data) {
            if (numsItems.has(element.número_item)) {
                return false;
            }
            numsItems.add(element.número_item);
        }
        return true;
    }

    // Verifica se os números de item estão em sequência
    static validateNumeroItemSequencia(data) {
        const array = data.map(e => e.número_item);
        const maiorValor = Math.max(...array);
        const conjuntoNumeros = Array.from({ length: maiorValor }, (_, i) => i + 1);
    
        return array.every((item, index) => item === conjuntoNumeros[index]);
    }
}

module.exports = {ValidatePedidos};
