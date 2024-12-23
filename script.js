const questions = [
    {
        question: "RSA 암호화에서 사용되는 키는?",
        answers: ["공개키", "개인키", "공개키와 개인키", "대칭키"],
        correct: 2,
    },
    {
        question: "금속막대를 불에 가열하면 반대쪽이 뜨거워지는 것은 어떤 열 이동 방식 때문인가요?",
        answers: ["대류", "전도", "복사"],
        correct: 1,
    },
    {
        question: "차가운 물과 뜨거운 물을 섞으면 시간이 지나면 온도가 일정해집니다. 이 상태를 무엇이라고 하나요?",
        answers: [
            "대류",
            "열평형",
            "열복사",
        ],
        correct: 1,
    },
    {
        question: "다음 중 대류 현상의 예시로 가장 적합한 것은 무엇인가요?",
        answers: [
            "여름철 더운 공기가 위로 올라가는 현상",
            "철판을 직접 가열하여 뜨거워지는 현상",
            "햇빛이 피부를 데우는 현상",
        ],
        correct: 0,
    },
    {
        question: "여름철에 철로가 휘는 이유는 무엇과 관련이 있나요?",
        answers: [
            "대류",
            "열팽창",
            "열전도",
        ],
        correct: 1,
    },
    {
        question: "열전도율이 높은 재료는 무엇인가요?",
        answers: [
            "플라스틱",
            "나무",
            "구리",
        ],
        correct: 2,
    },
    {
        question: "다음 중 열에너지와 온도의 차이로 옳은 것은 무엇인가요?",
        answers: [
            "열에너지는 물질의 온도만을 나타낸다.",
            "온도는 분자 운동 에너지의 평균값이고, 열에너지는 총 에너지다.",
            "둘은 같은 의미로 사용할 수 있다.",
        ],
        correct: 1,
    },
    {
        question: "RSA 암호화 방식의 순서는 무엇인가요?",
        answers: [
            "키 생성 - 키 분배 - 암호화 - 복호화",
            "키 생성 - 키 분배 - 복호화 - 암호화",
            "해독 - 키 분배 - 복호화 - 암호화",
        ],
        correct: 0,
    },
];

let encryptedMessage = "7ZWYIOqygeuCmCDtnpnrk6Tri6Q=";
let decryptedMessage = "비밀번호 : Tr!cky#2024Bz";
let currentQuestionIndex = 0;
let correctAnswers = 0;

function startDecryption() {
    encryptedMessage = document.getElementById("encrypted-message").value.trim();
    
    if (encryptedMessage !== "7ZWYIOqygeuCmCDtnpnrk6Tri6Q=") {
        alert("잘못된 암호화 메시지입니다. 다시 시도해주세요.");
        return;
    }

    document.getElementById("input-stage").style.display = "none";
    document.getElementById("quiz-stage").style.display = "block";
    document.getElementById("total-questions").textContent = questions.length;

    renderQuestion();
}

function renderQuestion() {
    const questionData = questions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
    answerButtons.innerHTML = "";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index === questionData.correct);
        answerButtons.appendChild(button);
    });

    document.getElementById("current-question").textContent =
        currentQuestionIndex + 1;
}

function checkAnswer(isCorrect) {
    if (isCorrect) correctAnswers++;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-stage").style.display = "none";
    document.getElementById("result-stage").style.display = "block";

    const resultTitle = document.getElementById("result-title");
    const decryptedMessageElem = document.getElementById("decrypted-message");

    if (correctAnswers === questions.length) {
        resultTitle.textContent = "암호 해독 성공!";
        decryptedMessageElem.textContent = `해독된 메시지: ${decryptedMessage}`;
    } else {
        resultTitle.textContent = "해독 실패!";
        decryptedMessageElem.textContent =
            "모든 문제를 정확히 풀어야 해독할 수 있습니다.";
    }
}

function retryQuiz() {
    encryptedMessage = "";
    currentQuestionIndex = 0;
    correctAnswers = 0;

    document.getElementById("result-stage").style.display = "none";
    document.getElementById("input-stage").style.display = "block";
}
