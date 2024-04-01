// Função para lançar uma exceção com uma mensagem de erro
function throwError(message) {
    throw new Error(message);
}

// Verifica se um número é um inteiro positivo
function isPositiveInteger(value) {
    return typeof(value) === 'number' && value > 0;
}

// Verifica se um dado é um Alphanumeric
function isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
}

function getId(value) {
    const id = String(value).split(".")[0]
    return id[id.length-1];
}

function isNumericPositive(value) {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
        return false;
    }
    const decimos = String(value).split('.')[1];
    
    if (decimos && decimos.length > 2) {
        return false;
    }

    return true;
}

module.exports = {
    throwError,
    isPositiveInteger,
    isAlphanumeric,
    getId,
    isNumericPositive
};
