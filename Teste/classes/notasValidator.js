const { isPositiveInteger, isAlphanumeric } = require('../utils/utils.js');


// Classe para validar dados de notas
class ValidateNotas {

    // Verifica se os dados das notas são válidos
    static isValid(data, pedidos) {
        // Verifica os tipos de dados, se os IDs dos pedidos estão presentes nas notas e se os números de item dos pedidos estão presentes nas notas
        
        data = data.map( e =>{
            e.id_pedido = String(e.id_pedido);
            return e;
        });
        
        return this.validateDataTypes(data) && 
               this.validateIdPedidosInNotas(data, pedidos) && 
               this.validateNumeroItemPedidosInNotas(data, pedidos);
    }

    // Valida os tipos de dados dos elementos das notas
    static validateDataTypes(data) {
        return data.every(obj => (
            isAlphanumeric(obj.id_pedido) &&
            isPositiveInteger(obj.número_item) &&
            isPositiveInteger(obj.quantidade_produto)
        ));
    }

    // Verifica se os IDs dos pedidos presentes nas notas são válidos
    static validateIdPedidosInNotas(data, pedidos) {
        return data.every(nota => pedidos.has(nota.id_pedido));
    }

    // Verifica se os números de item dos pedidos presentes nas notas são válidos
    static validateNumeroItemPedidosInNotas(data, pedidos) {
        return data.every(nota => {
            const pedido = pedidos.get(nota.id_pedido);
            return pedido && this.numeroItemExistsInPedido(nota.número_item, pedido);
        });
    }

    // Verifica se um número de item está presente em um pedido
    static numeroItemExistsInPedido(numero_item, pedido) {
        return pedido.some(item => item.número_item === numero_item);
    }
}


module.exports = { ValidateNotas };

