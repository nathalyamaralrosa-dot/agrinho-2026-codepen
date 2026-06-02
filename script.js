// Base de dados contendo o conteúdo técnico e pedagógico do Quiz
const quizQuestions = [
  {
    question: "Qual é o principal papel da agricultura de precisão na construção de um agro sustentável?",
    options: [
      { text: "Aumentar as áreas de desmatamento controlado para abrir novos pastos.", correct: false },
      { text: "Utilizar sensores, satélites e dados para aplicar insumos e água na quantidade exata, reduzindo desperdícios.", correct: true },
      { text: "Substituir defensivos biológicos por produtos químicos altamente concentrados.", correct: false },
      { text: "Eliminar o uso de qualquer maquinário elétrico ou tecnológico no campo.", correct: false }
    ],
    explanation: "A agricultura de precisão mapeia as necessidades específicas de cada pedaço de solo, injetando eficiência técnica e poupando recursos vitais."
  },
  {
    question: "O sistema ILPF (Integração Lavoura-Pecuária-Floresta) é uma tecnologia de manejo que se destaca por:",
    options: [
      { text: "Otimizar o uso da terra consorciando diferentes atividades produtivas no mesmo espaço, regenerando o solo.", correct: true },
      { text: "Isolar completamente as florestas das áreas de produção comercial.", correct: false },
      { text: "Focar em monoculturas intensivas de ciclo rápido sem rotação de solo.", correct: false },
      { text: "Priorizar o cultivo hidropônico em larga escala em áreas urbanas.", correct: false }
    ],
    explanation: "O ILPF melhora a matéria orgânica do solo, gera conforto térmico para o gado através das árvores e sequestra grandes volumes de carbono."
  },
  {
    question: "Como o uso de bioinsumos (defensivos e fertilizantes biológicos) contribui para a preservação ambiental?",
    options: [
      { text: "Eles esterilizam completamente o ecossistema microbiológico local.", correct: false },
      { text: "Aumentam a dependência de fertilizantes minerais sintéticos importados.", correct: false },
      { text: "Aceleram o tempo de colheita artificialmente através de modificações hormonais.", correct: false },
      { text: "Substituem compostos químicos pesados por microrganismos naturais, protegendo a fauna, o solo e os lençóis freáticos.", correct: true }
    ],
    explanation: "Os bioinsumos aproveitam a própria biodiversidade (como bactérias benéficas e fungos) para proteger as plantas sem agredir a natureza."
  },
  {
    question: "No contexto da transição energética do agro, qual tecnologia tem transformado resíduos orgânicos em receita e energia limpa?",
    options: [
      { text: "Queima direta de biomassa a céu aberto.", correct: false },
      { text: "Uso de usinas biodigestoras para produção de biogás e biometano.", correct: true },
      { text: "Fraturamento hidráulico do subsolo agrícola.", correct: false },
      { text: "Armazenamento estático de dejetos em lagoas abertas sem tratamento.", correct: false }
    ],
    explanation: "Os biodigestores transformam dejetos animais e resíduos de lavoura em biogás (energia/combustível) e em biofertilizante de alta qualidade."
  }
];

let currentQuestionIndex = 0;
let userScore = 0;

// Mapeamento dos elementos da interface
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackBox = document.getElementById('feedback-box');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');
const scorePercentage = document.getElementById('score-percentage');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

function initQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  scoreScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  loadQuestion();
}

function loadQuestion() {
  resetQuestionState();
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Atualiza cabeçalho e progresso
  questionNumberElement.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
  questionTextElement.innerText = currentQuestion.question;
  
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Renderiza as opções
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('option-btn');
    if (option.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener('click', handleAnswerSelection);
    optionsContainer.appendChild(button);
  });
}

function resetQuestionState() {
  nextButton.classList.add('hide');
  feedbackBox.classList.add('hide');
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
}

function handleAnswerSelection(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    userScore++;
  } else {
    selectedBtn.classList.add('incorrect');
  }

  // Revela a resposta correta e desabilita os botões
  Array.from(optionsContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  // Exibe a justificativa/informação contextual do tema
  feedbackText.innerHTML = `<strong>Explicação técnica:</strong> ${currentQuestion.explanation}`;
  feedbackBox.classList.remove('hide');
  nextButton.classList.remove('hide');
  
  // Atualiza barra de progresso para preenchimento após responder
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function finishQuiz() {
  quizScreen.classList.add('hide');
  scoreScreen.classList.remove('hide');
  
  const finalPercentage = Math.round((userScore / quizQuestions.length) * 100);
  scorePercentage.innerText = `${finalPercentage}%`;
  scoreText.innerText = `Você acertou ${userScore} de ${quizQuestions.length} perguntas sobre o Futuro Sustentável do Agro!`;
}

// Event Listeners para navegação
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

restartButton.addEventListener('click', initQuiz);

// Inicialização imediata do script
initQuiz();