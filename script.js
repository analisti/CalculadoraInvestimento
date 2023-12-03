// Função para validar a entrada do usuário
function validarEntrada(valor) {
    return !isNaN(valor) && valor > 0;
}

// Função para calcular o investimento
function calcularInvestimento() {
    // Obter os valores dos campos de entrada
    var valorInvestido = parseFloat(document.getElementById('valorInvestido').value);
    var porcentagemGanho = parseFloat(document.getElementById('porcentagemGanho').value);
    var porcentagemPerda = parseFloat(document.getElementById('porcentagemPerda').value);

    // Função para validar a entrada do usuário
    function validarEntrada(valor) {
        valor = parseFloat(valor.replace(/\s/g, ''));
        return !isNaN(valor) && valor > 0;
    }


    // Calcular a meta diária e a perda máxima diária
    var metaDiaria = Math.round(valorInvestido * (porcentagemGanho / 100));
    var perdaMaximaDiaria = Math.round(valorInvestido * (porcentagemPerda / 100));

    // Criar o resumo do investimento
    var resumo =
        "Valor Investido: R$ " + valorInvestido.toFixed(2) +
        "\nMeta Diária: R$ " + metaDiaria +
        "\nPerda Máxima Diária: R$ " + perdaMaximaDiaria;

    // Atualizar o resumo na página
    document.getElementById('resumo').innerText = resumo;
}

// Função para lidar com a tecla Enter
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        calcularInvestimento();
    }
}

// Função para obter a cotação do dólar
function obterCotacao() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            var cotacao = data.rates.BRL;
            document.getElementById('cotacaoDolar').innerText = "Hoje $1 Dólar americano é igual a R$" + cotacao.toFixed(2) + " Real brasileiro";
        })
        .catch(error => console.error('Erro:', error));
}

// Quando o documento estiver carregado, adicionar os ouvintes de eventos
document.addEventListener('DOMContentLoaded', function () {
    // Adicionar um ouvinte de eventos ao botão "Calcular"
    document.getElementById('btn').addEventListener('click', calcularInvestimento);

    // Adicionar um ouvinte de eventos para lidar com a tecla Enter
    document.addEventListener('keydown', handleKeyPress);
});

// Obter a cotação do dólar a cada 5 segundos e imediatamente quando a página é carregada
setInterval(obterCotacao, 5000);
obterCotacao();