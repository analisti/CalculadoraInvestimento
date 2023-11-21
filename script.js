function calcularInvestimento() {
    var valorInvestido = parseFloat(document.getElementById('valorInvestido').value);
    var porcentagemGanho = parseFloat(document.getElementById('porcentagemGanho').value);
    var porcentagemPerda = parseFloat(document.getElementById('porcentagemPerda').value);

    var metaDiaria = Math.round(valorInvestido * (porcentagemGanho / 100));
    var perdaMaximaDiaria = Math.round(valorInvestido * (porcentagemPerda / 100));

    var resumo =
        "Valor Investido: R$ " + valorInvestido.toFixed(2) +
        "\nMeta Diária: R$ " + metaDiaria +
        "\nPerda Máxima Diária: R$ " + perdaMaximaDiaria;

    document.getElementById('resumo').innerText = resumo;
}

// Função para lidar com a tecla Enter
function handleKeyPress(event) {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.keyCode === 13) {
        calcularInvestimento();
    }
}