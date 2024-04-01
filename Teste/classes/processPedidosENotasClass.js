const { ValidatePedidos } = require("./pedidosValidator.js");
const { throwError, getId } = require('../utils/utils.js');
const { parseJson } = require('../utils/manipularArquivos.js');
const { ValidateNotas } = require("./notasValidator.js");

// Classe para gerenciar pedidos e notas
class ProcessadorPedidosENotas {
    
    constructor(){
        this.mapaDePedidos = new Map();
        this.mapaDeNotas = new Map();
        this.pedidosProcessados = new Map();
        this.pedidosPendentes = new Map();
    }

    /* 
    Recebe os pedidos e valida os dados. Se os items do pedido estiverem inválidos, retorna um erro.
    Caso contrário, cadastra os pedidos.
    */
    criarPedidos(pedidos){

        for (let obj of pedidos){
            const pedido = parseJson(obj.data);
            const idPedido = getId(obj.id);

            if (ValidatePedidos.isValid(pedido)){
                this.mapaDePedidos.set(idPedido, pedido);
            } else {
                throwError(`Dados inválidos em pedido ${idPedido}!!!`);
            }
        }

        return true
    }

    /* 
    Recebe as notas e valida os dados. Se os items das notas estiverem inválidos, retorna um erro.
    Caso contrário, cadastra as notas.
    */
    criarNotas(notas){

        for (let obj of notas){
            const nota = parseJson(obj.data);
            const idNota = getId(obj.id);
            
            if (ValidateNotas.isValid(nota, this.mapaDePedidos)){
               
                this.mapaDeNotas.set(idNota, nota);
            } else {
                throwError(`Dados inválidos em Nota ${idNota}!!!`);
            }
        }

        return true
    }

    /* 
    Cruza os pedidos com as suas respectivas notas, valida a quantidade de produtos 
    das notas e processa os pedidos com a situação do pedido (se está pendente ou não).
    */
    processarPedidosNotas(){
        for (const [idPedido, pedido] of this.mapaDePedidos){
            const itensProcessados = [];
            for (const item of pedido){
                const notasPedidoItens = this.obterNotasComMesmoPedidoENumeroItem(idPedido, item.número_item);
                const quantidadeProdutoSolicitado = this.obterQuantidadeProdutoItem(notasPedidoItens);
                
                if (quantidadeProdutoSolicitado > item.quantidade_produto){
                    throwError(`Pedido ${idPedido}: a quantidade de produtos para o item ${item.número_item} ultrapassou a quantidade de produto disponível.
                       | solicitado: ${quantidadeProdutoSolicitado} | Disponível: ${item.quantidade_produto} |`);
                }

                const pendente = quantidadeProdutoSolicitado < item.quantidade_produto
                
                itensProcessados.push({
                    ...item,
                    quantidade_produto_solicitado:  quantidadeProdutoSolicitado,
                    pendente: pendente
                });
            }

            this.pedidosProcessados.set(idPedido, itensProcessados);
        }

        return true
    }

    //Gera os pedidos pendentes com seus respectivos valores totais, saldos e itens pendentes.
    gerarPedidosPendentes(){
        for (const [idPedido, pedido] of this.pedidosProcessados){
            if (pedido.some(item => !item.pendente)){
                const valorTotalPedido = Number(this.calcularValorTotalPedido(pedido).toFixed(2));
                const saldoValor = Number((valorTotalPedido - this.calcularValorTotalPedidoSolicitado(pedido)).toFixed(2));
                const itensPendentes = this.obterItensPendentesPedido(pedido);
    
                this.pedidosPendentes.set(idPedido, {
                    valorTotalPedido,
                    saldoValor,
                    itensPendentes
                });
            }
        }
        return this.pedidosPendentes;
    }
    

    
    //Obtém os itens pendentes de um pedido.
    obterItensPendentesPedido(pedido){
        return pedido.filter( item => item.pendente).map(item => (
            {
                numero_item: item.número_item,
                saldo_da_quantidade: item.quantidade_produto - item.quantidade_produto_solicitado
            }));
    }

    //Calcula o valor total do pedido.
    calcularValorTotalPedido(pedido){
        return pedido.reduce((acum, obj) => acum + (obj.quantidade_produto * obj.valor_unitário_produto), 0);
    }

    //Calcula o valor total do pedido solicitado.
    calcularValorTotalPedidoSolicitado(pedido){
        return pedido.reduce((acum, obj) => acum + (obj.quantidade_produto_solicitado * obj.valor_unitário_produto), 0);
    }

    //Obtém as notas com o mesmo pedido e número do item.
    obterNotasComMesmoPedidoENumeroItem(idPedido, numeroItem){
        const itensMesmoPedido = [];
        for (let nota of this.mapaDeNotas.values()){
            nota.forEach(item => {
                if (item.id_pedido == idPedido && item.número_item == numeroItem){
                    itensMesmoPedido.push(item);
                }
            });
        }
        return itensMesmoPedido;
    }

    //Obtém a quantidade total do produto em um array de itens.
    obterQuantidadeProdutoItem(itens){
        return itens.reduce((quantidade, item) => quantidade + item.quantidade_produto, 0);
    }

    //Obtém o item de um pedido com base no número do item.
    obterItemPedido(idPedido, numeroItem){
        const pedido = this.mapaDePedidos.get(idPedido);
        return pedido.find(item => item.número_item == numeroItem);
    }
}

module.exports = ProcessadorPedidosENotas;
