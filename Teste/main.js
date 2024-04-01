const { gravarPedidosPendentesEmArquivo, lerArquivosDiretorio } = require('./utils/manipularArquivos.js');
const ProcessPedidosENotas = require('./classes/processPedidosENotasClass.js');

//pasta com os arquivos de pedidos
const directoryPathPedidos = __dirname + "/data/Pedidos";
//pasta com os arquivos de notas
const directoryPathNotas = __dirname + "/data/Notas";

// Caminho do arquivo onde os dados dos pedidos pendentes serão gravados
const filePath = __dirname + '/pedidosPendentes.txt';

// Função principal assíncrona para processar pedidos e notas
async function main() {
    try {
        const pedidos = await lerArquivosDiretorio(directoryPathPedidos);
        const notas = await lerArquivosDiretorio(directoryPathNotas);

        const processPedidosENotas = new ProcessPedidosENotas();

        console.log("Processando Arquivos e Notas...")
     
        processPedidosENotas.criarPedidos(pedidos);  
        processPedidosENotas.criarNotas(notas);
        processPedidosENotas.processarPedidosNotas();

        const pedidosPendentes = processPedidosENotas.gerarPedidosPendentes();

        // grava os pedidos pendentes
        await gravarPedidosPendentesEmArquivo(pedidosPendentes, filePath);

    } catch (err) {
        console.error('Erro ao processar pedidos e notas:', err);
    }
}

// Chamada da função principal
main();
