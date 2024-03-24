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
  // Obter os valores dos campos de entrada
  const valorInvestido = parseFloat(
    document.getElementById("valorInvestido").value
  );
  const porcentagemGanho = parseFloat(
    document.getElementById("porcentagemGanho").value
  );
  const porcentagemPerda = parseFloat(
    document.getElementById("porcentagemPerda").value
  );

  // Verificar se algum dos valores de entrada está vazio ou não é um número
  if (
    isNaN(valorInvestido) ||
    isNaN(porcentagemGanho) ||
    isNaN(porcentagemPerda)
  ) {
    alert("Por favor, preencha todos os campos de entrada.");
    highlightEmptyInputs(); // Destacar inputs vazios
    return;
  }

  // Calcular a meta diária e a perda máxima diária
  const metaDiaria = Math.round(valorInvestido * (porcentagemGanho / 100));
  const perdaMaximaDiaria = Math.round(
    valorInvestido * (porcentagemPerda / 100)
  );

  // Calcular a expectativa matemática
  const { expectativa, mensagem } = calcularExpectativa();

  // Criar o resumo do investimento
  const resumo = `Valor Investido: R$ ${valorInvestido.toFixed(2)}
      Meta Diária: R$ ${metaDiaria}
      Perda Máxima Diária: R$ ${perdaMaximaDiaria}
      Expectativa Matemática: ${expectativa}
      ${mensagem}`;

  // Atualizar o resumo na página
  document.getElementById("resumo").innerText = resumo;
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

// Quando o documento estiver carregado, adicionar os ouvintes de eventos
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar um ouvinte de eventos ao botão "Calcular"
  document
    .getElementById("btn")
    .addEventListener("click", calcularInvestimento);

  // Adicionar um ouvinte de eventos para lidar com a tecla Enter
  document.addEventListener("keydown", handleKeyPress);
});

// Obter a cotação do dólar a cada 5 segundos e imediatamente quando a página é carregada
setInterval(obterCotacao, 5000);
obterCotacao();

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
