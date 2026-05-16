const questions = [

    {
        question: "How many bones are there in the adult human body?",
        answers: [
            { text: "201", correct: false },
            { text: "206", correct: true },
            { text: "210", correct: false },
            { text: "199", correct: false }
        ]
    },

    {
        question: "Which language runs in the browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheet", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheet", correct: false },
            { text: "Colorful Style Sheet", correct: false }
        ]
    },

    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Apple", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used for images?",
        answers: [
            { text: "<pic>", correct: false },
            { text: "<image>", correct: false },
            { text: "<img>", correct: true },
            { text: "<src>", correct: false }
        ]
    }

];

/* ELEMENTS */

const startBtn =
    document.getElementById("start-btn");

const quizSection =
    document.querySelector(".quiz-section");

const homeSection =
    document.querySelector(".home");

const resultSection =
    document.querySelector(".result-section");

const carouselSection =
    document.querySelector(".carousel-section");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextBtn =
    document.getElementById("next-btn");

const scoreText =
    document.getElementById("score");

const progressBar =
    document.getElementById("progress-bar");

/* QUIZ VARIABLES */

let currentQuestion = 0;

let score = 0;

/* START QUIZ */

startBtn.onclick = () => {

    homeSection.classList.remove("active");

    carouselSection.classList.remove("active");

    resultSection.classList.remove("active");

    quizSection.classList.add("active");

    showQuestion();

};

/* SHOW QUESTION */

function showQuestion() {

    resetState();

    let current = questions[currentQuestion];

    questionElement.innerText =
        (currentQuestion + 1) + ". " + current.question;

    progressBar.style.width =
        ((currentQuestion / questions.length) * 100) + "%";

    current.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        answersElement.appendChild(button);

        button.addEventListener(
            "click",
            () => selectAnswer(button, answer.correct)
        );

    });

}

/* RESET */

function resetState() {

    nextBtn.style.display = "none";

    answersElement.innerHTML = "";

}

/* SELECT ANSWER */

function selectAnswer(button, correct) {

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => btn.disabled = true);

    if (correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

    }

    buttons.forEach((btn, index) => {

        if (questions[currentQuestion].answers[index].correct) {

            btn.classList.add("correct");

        }

    });

    scoreText.innerText =
        `Score: ${score}`;

    nextBtn.style.display =
        "inline-block";

}

/* NEXT BUTTON */

nextBtn.onclick = () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

};

/* SHOW RESULT */

function showResult() {

    quizSection.classList.remove("active");

    resultSection.classList.add("active");

    let percent =
        Math.round((score / questions.length) * 100);

    document.getElementById("percentage").innerText =
        percent + "%";

    document.getElementById("final-score").innerText =
        `You scored ${score} out of ${questions.length}`;

    document.querySelector(".circle").style.background =
        `conic-gradient(#00d9ff ${percent * 3.6}deg,#222 0deg)`;

}

/* HOME BUTTON */

document.getElementById("home-btn").onclick = () => {

    location.reload();

};

/* JOKE API */

document.getElementById("joke-btn").onclick = async () => {

    const jokeBox =
        document.getElementById("joke-box");

    jokeBox.innerText =
        "Loading joke... 😂";

    const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    );

    const data = await response.json();

    jokeBox.innerHTML =
        `${data.setup}<br><br>🤣 ${data.punchline}`;

};

/* THEME TOGGLE */

document.getElementById("theme-toggle").onclick = () => {

    document.body.classList.toggle("light-mode");

};

/* OPEN CAROUSEL */

const carouselBtn =
    document.getElementById("carousel-btn");

carouselBtn.onclick = () => {

    homeSection.classList.remove("active");

    quizSection.classList.remove("active");

    resultSection.classList.remove("active");

    carouselSection.classList.add("active");

};

/* IMAGE CAROUSEL */

const images = [

    "https://picsum.photos/id/1015/600/300",

    "https://picsum.photos/id/1016/600/300",

    "https://picsum.photos/id/1025/600/300",

    "https://picsum.photos/id/1035/600/300"

];

let currentImage = 0;

let likedImages = 0;

const carouselImage =
    document.getElementById("carousel-image");

/* NEXT IMAGE */

function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {

        currentImage = 0;

    }

    carouselImage.src = images[currentImage];

}

/* PREVIOUS IMAGE */

function prevImage() {

    currentImage--;

    if (currentImage < 0) {

        currentImage = images.length - 1;

    }

    carouselImage.src = images[currentImage];

}

/* LIKE IMAGE */

function likeImage() {

    likedImages++;

    document.getElementById("liked-count").innerText =
        `Liked Images: ${likedImages}`;

    const likedContainer =
        document.getElementById("liked-images");

    const likedImg =
        document.createElement("img");

    likedImg.src =
        images[currentImage];

    likedContainer.appendChild(likedImg);

}
function goHome() {

    carouselSection.classList.remove("active");

    quizSection.classList.remove("active");

    resultSection.classList.remove("active");

    homeSection.classList.add("active");

}