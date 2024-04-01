const fs = require('fs').promises;

// Função para parsear JSON removendo o BOM, se existir
function parseJson(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content.split("\n").map(JSON.parse);
}

// Função para ler arquivos de um diretório
async function lerArquivosDiretorio(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        const results = [];

        for (const file of files) {
            const data = await fs.readFile(`${directoryPath}/${file}`, 'utf8');
            results.push({ id: file, data: data });
        }

        return results;
    } catch (err) {
        console.error('Erro ao ler o diretório:', err);
        return [];
    }
}

// Função para gravar os dados dos pedidos pendentes em um arquivo de texto
async function gravarPedidosPendentesEmArquivo(pedidosPendentes, filePath) {
    try {
        let dataToWrite = '';
        pedidosPendentes.forEach((value, key) => {
            dataToWrite += `${key}: ${JSON.stringify(value)}\n`;
        });
        await fs.writeFile(filePath, dataToWrite, 'utf8');
        console.log('Dados dos pedidos pendentes foram gravados com sucesso em', filePath);
    } catch (err) {
        console.error('Erro ao gravar os dados dos pedidos pendentes:', err);
    }
}

module.exports = {
    parseJson,
    lerArquivosDiretorio,
    gravarPedidosPendentesEmArquivo
};
