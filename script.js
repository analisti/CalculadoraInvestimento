// Função para calcular a expectativa matemática
const calcularExpectativa = () => {
  const probGanho = parseFloat(document.getElementById("probGanho").value);
  const valorGanho = parseFloat(document.getElementById("valorGanho").value);
  const probPerda = parseFloat(document.getElementById("probPerda").value);
  const valorPerda = parseFloat(document.getElementById("valorPerda").value);

  const expectativa = probGanho * valorGanho - probPerda * valorPerda;

  let mensagem = "";
  if (expectativa < 0) {
    mensagem =
      "Isso indica que, em média, você pode esperar perder dinheiro. Isso é considerado ruim para o investimento.";
  } else if (expectativa === 0) {
    mensagem =
      "Isso indica que, em média, você pode esperar nem ganhar nem perder dinheiro. Isso é considerado neutro para o investimento.";
  } else if (expectativa > 0 && expectativa < 1) {
    mensagem =
      "Isso indica que, em média, você pode esperar um pequeno retorno. Isso é considerado bom para o investimento.";
  } else if (expectativa >= 1 && expectativa < 2) {
    mensagem =
      "Isso indica que, em média, você pode esperar um retorno moderado. Isso é considerado muito bom para o investimento.";
  } else if (expectativa >= 2) {
    mensagem =
      "Isso indica que, em média, você pode esperar um alto retorno. Isso é considerado excelente para o investimento.";
  }

  return { expectativa, mensagem };
};

// Função para verificar e destacar inputs vazios
const highlightEmptyInputs = () => {
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    input.value.trim()
      ? input.classList.remove("input-error")
      : input.classList.add("input-error");
  });
};

// Função para calcular o investimento
const calcularInvestimento = () => {
  const valorInvestido = parseFloat(
    document.getElementById("valorInvestido").value
  );
  const porcentagemGanho = parseFloat(
    document.getElementById("porcentagemGanho").value
  );
  const porcentagemPerda = parseFloat(
    document.getElementById("porcentagemPerda").value
  );

  if (
    isNaN(valorInvestido) ||
    isNaN(porcentagemGanho) ||
    isNaN(porcentagemPerda)
  ) {
    alert("Por favor, preencha todos os campos de entrada.");
    highlightEmptyInputs();
    return;
  }

  const metaDiaria = Math.round(valorInvestido * (porcentagemGanho / 100));
  const perdaMaximaDiaria = Math.round(
    valorInvestido * (porcentagemPerda / 100)
  );

  const { expectativa, mensagem } = calcularExpectativa();

  const resumo = `Valor Investido: R$ ${valorInvestido.toFixed(2)}
    Meta Diária: R$ ${metaDiaria}
    Perda Máxima Diária: R$ ${perdaMaximaDiaria}
    Expectativa Matemática: ${expectativa}
    ${mensagem}`;

  document.getElementById("resumoInvestimento").innerText = resumo;
};

// Função para lidar com a tecla Enter
const handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    calcularInvestimento();
  }
};

// Função para obter a cotação do dólar
const obterCotacao = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    const cotacao = data.rates.BRL;
    document.getElementById(
      "cotacaoDolar"
    ).innerText = `Hoje $1 Dólar americano é igual a R$ ${cotacao.toFixed(
      2
    )} Real brasileiro`;
  } catch (error) {
    console.error("Erro:", error);
  }
};

// Função para alternar a visibilidade da resposta da FAQ
const toggleAnswer = (index) => {
  const answer = document
    .querySelectorAll(".faq-item")
  [index - 1].querySelector(".answer");
  const item = document.querySelectorAll(".faq-item")[index - 1];

  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    item.classList.remove("expanded");
  } else {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
    item.classList.add("expanded");
  }
};

// Funções para Gerenciador de Salário
const categories = {
  "Gastos Fixos": 0.55,
  Lazer: 0.12,
  Investimento: 0.1,
  Emergência: 0.1,
  Educação: 0.1,
  Torrar: 0.03,
};

document.getElementById("salary").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    calculate();
  }
});

function calculate() {
  const salary = document.getElementById("salary").value;
  let output = "";
  let chartData = [];
  for (let category in categories) {
    const amount = salary * categories[category];
    output += `<div class="category"><strong>${category}:</strong> R$ ${amount.toFixed(
      2
    )}</div>`;
    chartData.push(amount);
  }
  document.getElementById("output").innerHTML = output;
  drawChart(Object.keys(categories), chartData);
}

function drawChart(labels, data) {
  var ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

// Quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btnInvestimento")
    .addEventListener("click", calcularInvestimento);
  document.addEventListener("keydown", handleKeyPress);
  setInterval(obterCotacao, 5000);
  obterCotacao();
});
