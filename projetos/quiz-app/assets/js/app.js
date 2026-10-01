// ============================================
// BANCO DE PERGUNTAS EM PORTUGUÊS DO BRASIL
// ============================================
const questionBank = [
    // COMPUTAÇÃO
    {
        category: 'computacao',
        difficulty: 'easy',
        question: 'Qual linguagem é usada para estruturar páginas da web?',
        options: ['HTML', 'CSS', 'SQL', 'Python'],
        correctAnswer: 'HTML'
    },
    {
        category: 'computacao',
        difficulty: 'easy',
        question: 'Qual tecnologia é usada principalmente para estilizar páginas da web?',
        options: ['CSS', 'Git', 'SQL', 'Node.js'],
        correctAnswer: 'CSS'
    },
    {
        category: 'computacao',
        difficulty: 'medium',
        question: 'Qual método do JavaScript adiciona um item ao final de um array?',
        options: ['push()', 'pop()', 'shift()', 'slice()'],
        correctAnswer: 'push()'
    },
    {
        category: 'computacao',
        difficulty: 'medium',
        question: 'Para que serve o Git?',
        options: [
            'Controlar versões de arquivos',
            'Criar imagens',
            'Hospedar bancos de dados',
            'Estilizar páginas'
        ],
        correctAnswer: 'Controlar versões de arquivos'
    },
    {
        category: 'computacao',
        difficulty: 'hard',
        question: 'Qual estrutura permite executar tarefas assíncronas com async/await?',
        options: ['Promise', 'Array', 'String', 'Set'],
        correctAnswer: 'Promise'
    },

    // HISTÓRIA
    {
        category: 'historia',
        difficulty: 'easy',
        question: 'Em que ano ocorreu a Independência do Brasil?',
        options: ['1822', '1889', '1500', '1922'],
        correctAnswer: '1822'
    },
    {
        category: 'historia',
        difficulty: 'easy',
        question: 'Quem foi o primeiro presidente do Brasil?',
        options: [
            'Deodoro da Fonseca',
            'Dom Pedro II',
            'Getúlio Vargas',
            'Juscelino Kubitschek'
        ],
        correctAnswer: 'Deodoro da Fonseca'
    },
    {
        category: 'historia',
        difficulty: 'medium',
        question: 'Em que ano foi proclamada a República no Brasil?',
        options: ['1889', '1822', '1930', '1500'],
        correctAnswer: '1889'
    },
    {
        category: 'historia',
        difficulty: 'medium',
        question: 'Qual lei aboliu a escravidão no Brasil?',
        options: [
            'Lei Áurea',
            'Lei de Terras',
            'Lei do Ventre Livre',
            'Constituição de 1824'
        ],
        correctAnswer: 'Lei Áurea'
    },
    {
        category: 'historia',
        difficulty: 'hard',
        question: 'Em que ano a Lei Áurea foi assinada?',
        options: ['1888', '1889', '1871', '1822'],
        correctAnswer: '1888'
    },

    // GEOGRAFIA
    {
        category: 'geografia',
        difficulty: 'easy',
        question: 'Qual é a capital do Brasil?',
        options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
        correctAnswer: 'Brasília'
    },
    {
        category: 'geografia',
        difficulty: 'easy',
        question: 'Em qual continente fica o Brasil?',
        options: [
            'América do Sul',
            'Europa',
            'África',
            'América do Norte'
        ],
        correctAnswer: 'América do Sul'
    },
    {
        category: 'geografia',
        difficulty: 'medium',
        question: 'Qual é o maior estado brasileiro em área?',
        options: ['Amazonas', 'Pará', 'Mato Grosso', 'Minas Gerais'],
        correctAnswer: 'Amazonas'
    },
    {
        category: 'geografia',
        difficulty: 'medium',
        question: 'Qual oceano banha o litoral brasileiro?',
        options: ['Atlântico', 'Pacífico', 'Índico', 'Ártico'],
        correctAnswer: 'Atlântico'
    },
    {
        category: 'geografia',
        difficulty: 'hard',
        question: 'Qual é a capital do estado de Roraima?',
        options: ['Boa Vista', 'Rio Branco', 'Macapá', 'Palmas'],
        correctAnswer: 'Boa Vista'
    }
];

const categoryNames = {
    computacao: 'Computação',
    historia: 'História',
    geografia: 'Geografia'
};

const difficultyNames = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
};

// ============================================
// ESTADO DO JOGO
// ============================================
const state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    correctAnswersCount: 0,
    timer: null,
    timeLeft: 15,
    maxTimePerQuestion: 15,
    isAnswered: false,
    highScore: loadHighScore()
};

// ============================================
// ELEMENTOS DA PÁGINA
// ============================================
const screens = {
    start: document.getElementById('screenStart'),
    loading: document.getElementById('screenLoading'),
    game: document.getElementById('screenGame'),
    result: document.getElementById('screenResult'),
    error: document.getElementById('screenError')
};

const categorySelect = document.getElementById('categorySelect');
const difficultySelect = document.getElementById('difficultySelect');
const amountSelect = document.getElementById('amountSelect');
const highScoreDisplay = document.getElementById('highScoreDisplay');

const questionCategory = document.getElementById('questionCategory');
const questionDifficulty = document.getElementById('questionDifficulty');
const questionCounter = document.getElementById('questionCounter');
const currentScoreDisplay = document.getElementById('currentScore');
const progressFill = document.getElementById('progressFill');
const timerText = document.getElementById('timerText');
const timerCircle = document.getElementById('timerCircle');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const btnNext = document.getElementById('btnNext');

const finalScore = document.getElementById('finalScore');
const finalAccuracy = document.getElementById('finalAccuracy');
const finalCorrect = document.getElementById('finalCorrect');
const resultIcon = document.getElementById('resultIcon');
const resultMessage = document.getElementById('resultMessage');

const errorMessage = document.getElementById('errorMessage');

const btnStart = document.getElementById('btnStart');
const btnRestart = document.getElementById('btnRestart');
const btnHome = document.getElementById('btnHome');
const btnRetry = document.getElementById('btnRetry');

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function loadHighScore() {
    try {
        return Number(localStorage.getItem('quiz_recorde')) || 0;
    } catch {
        return 0;
    }
}

function saveHighScore(score) {
    try {
        localStorage.setItem('quiz_recorde', String(score));
    } catch {
        // O jogo continua funcionando mesmo se o armazenamento estiver bloqueado.
    }
}

function showScreen(screenName) {
    Object.entries(screens).forEach(([name, element]) => {
        element.classList.toggle('active', name === screenName);
    });
}

function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function updateHighScoreUI() {
    highScoreDisplay.textContent = `${state.highScore} pontos`;
}

function getAvailableQuestions() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;

    return questionBank.filter(question => {
        const matchesCategory = !category || question.category === category;
        const matchesDifficulty =
            !difficulty || question.difficulty === difficulty;

        return matchesCategory && matchesDifficulty;
    });
}

// Ajusta a quantidade ao número real de perguntas disponíveis.
function updateAmountOptions() {
    const available = getAvailableQuestions().length;
    const previousValue = Number(amountSelect.value);

    let amounts = [5, 10, 15].filter(amount => amount <= available);

    // Ex.: categoria + dificuldade podem resultar em 1 ou 2 perguntas.
    if (amounts.length === 0 && available > 0) {
        amounts = [available];
    }

    amountSelect.replaceChildren();

    amounts.forEach(amount => {
        const option = document.createElement('option');
        option.value = String(amount);
        option.textContent =
            `${amount} ${amount === 1 ? 'pergunta' : 'perguntas'}`;

        amountSelect.appendChild(option);
    });

    if (amounts.includes(previousValue)) {
        amountSelect.value = String(previousValue);
    } else if (amounts.length > 0) {
        amountSelect.value = String(amounts[amounts.length - 1]);
    }

    btnStart.disabled = available === 0;
}

// ============================================
// INÍCIO DO JOGO
// ============================================
function startGame() {
    clearInterval(state.timer);

    const availableQuestions = getAvailableQuestions();
    const amount = Number(amountSelect.value);

    if (availableQuestions.length === 0 || amount === 0) {
        errorMessage.textContent =
            'Não há perguntas disponíveis para os filtros escolhidos.';
        showScreen('error');
        return;
    }

    state.questions = shuffleArray(availableQuestions).slice(0, amount);
    state.currentIndex = 0;
    state.score = 0;
    state.correctAnswersCount = 0;
    state.isAnswered = false;

    showScreen('game');
    renderQuestion();
}

function renderQuestion() {
    const current = state.questions[state.currentIndex];
    const total = state.questions.length;

    state.isAnswered = false;
    btnNext.disabled = true;
    btnNext.textContent =
        state.currentIndex === total - 1
            ? 'Ver resultado →'
            : 'Próxima pergunta →';

    questionCategory.textContent = categoryNames[current.category];
    questionDifficulty.textContent =
        difficultyNames[current.difficulty];
    questionDifficulty.className =
        `difficulty-pill ${current.difficulty}`;

    questionCounter.textContent =
        `Pergunta ${state.currentIndex + 1} de ${total}`;
    currentScoreDisplay.textContent = `Pontos: ${state.score}`;

    progressFill.style.width =
        `${(state.currentIndex / total) * 100}%`;

    questionText.textContent = current.question;
    optionsContainer.replaceChildren();

    shuffleArray(current.options).forEach(optionText => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-btn';
        button.textContent = optionText;

        button.addEventListener('click', () => {
            handleAnswer(optionText, button);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}

// ============================================
// TEMPORIZADOR
// ============================================
function startTimer() {
    clearInterval(state.timer);
    state.timeLeft = state.maxTimePerQuestion;
    updateTimerUI();

    state.timer = setInterval(() => {
        state.timeLeft--;
        updateTimerUI();

        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    timerText.textContent = String(state.timeLeft);
    timerCircle.classList.toggle('warning', state.timeLeft <= 5);
}

// ============================================
// RESPOSTAS
// ============================================
function revealCorrectAnswer() {
    const current = state.questions[state.currentIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === current.correctAnswer) {
            button.classList.add('correct');
        }
    });
}

function handleAnswer(selectedOption, selectedButton) {
    if (state.isAnswered) return;

    state.isAnswered = true;
    clearInterval(state.timer);

    const current = state.questions[state.currentIndex];
    const isCorrect = selectedOption === current.correctAnswer;

    revealCorrectAnswer();

    if (isCorrect) {
        const pointsEarned = 100 + state.timeLeft * 10;
        state.score += pointsEarned;
        state.correctAnswersCount++;
    } else {
        selectedButton.classList.add('wrong');
    }

    currentScoreDisplay.textContent = `Pontos: ${state.score}`;
    btnNext.disabled = false;
}

function handleTimeOut() {
    if (state.isAnswered) return;

    state.isAnswered = true;
    revealCorrectAnswer();
    btnNext.disabled = false;
}

function nextQuestion() {
    if (!state.isAnswered) return;

    state.currentIndex++;

    if (state.currentIndex < state.questions.length) {
        renderQuestion();
    } else {
        finishGame();
    }
}

// ============================================
// RESULTADO
// ============================================
function finishGame() {
    clearInterval(state.timer);
    progressFill.style.width = '100%';

    const total = state.questions.length;
    const accuracy = Math.round(
        (state.correctAnswersCount / total) * 100
    );

    if (state.score > state.highScore) {
        state.highScore = state.score;
        saveHighScore(state.highScore);
        updateHighScoreUI();
    }

    finalScore.textContent = String(state.score);
    finalAccuracy.textContent = `${accuracy}%`;
    finalCorrect.textContent =
        `${state.correctAnswersCount}/${total}`;

    if (accuracy >= 80) {
        resultIcon.textContent = '🏆';
        resultMessage.textContent =
            'Incrível! Você mandou muito bem!';
    } else if (accuracy >= 50) {
        resultIcon.textContent = '👏';
        resultMessage.textContent =
            'Bom trabalho! Continue praticando.';
    } else {
        resultIcon.textContent = '📚';
        resultMessage.textContent =
            'Não desanime! Que tal tentar novamente?';
    }

    showScreen('result');
}

// ============================================
// EVENTOS E INICIALIZAÇÃO
// ============================================
categorySelect.addEventListener('change', updateAmountOptions);
difficultySelect.addEventListener('change', updateAmountOptions);

btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', startGame);
btnRetry.addEventListener('click', () => showScreen('start'));

btnHome.addEventListener('click', () => {
    clearInterval(state.timer);
    updateHighScoreUI();
    showScreen('start');
});

updateHighScoreUI();
updateAmountOptions();