"use strict";
// 1. Settings and Variables
const worddisplay = document.getElementById('worddisplay');
const typinginput = document.getElementById('typinginput');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const Accuracy = document.getElementById('Accuracy');
const restartBtn = document.getElementById('restart-btn');

const words = [
    "The quick brown fox jumps over the lazy dog. Typing practice improves speed and accuracy over time.",
    "Web development combines creativity and logic. Learning HTML CSS and JavaScript helps build interactive websites.",
    "Consistent practice is the key to improving typing speed. Focus on accuracy before increasing your speed.",
    "Programming requires patience and problem solving skills. Writing code every day strengthens your knowledge.",
    "Technology is evolving rapidly and developers must keep learning new skills to stay relevant.",
    "The sun shines brightly over the tall green trees today. ",

    "Fresh water flows down the mountain into the deep blue lake.",
    "Always try to do your best in every single new task.",
    "Learning how to code is a very useful skill for everyone.",
    "Good food tastes even better when you share it with friends.",
    "The small cat sleeps soundly on the soft red rug now.",
    "Walking outside in the morning helps you feel much more awake.",
    "Write your ideas down before you forget them in the afternoon.",
    "Heavy rain falls on the roof of the old wooden house.",
    "A quiet room is a great place to sit and think.",
    "The blue bird flies high above the white fluffy clouds now.",
    "Success comes to those who stay consistent with their daily work.",
    "Music plays softly in the background while I study my lessons.",
    "Red apples are sweet and very crunchy during the fall season.",
    "The silver car drives fast down the long and empty road.",
    "Trees provide shade from the hot sun on a summer day.",
    "Kind words can make someone feel very happy and quite special.",
    "The train leaves the station at exactly five o clock today.",
    "Dark clouds gather in the sky before the storm starts soon.",
    "A warm fire feels good on a very cold winter night.",
    "Practice your new hobby for at least twenty minutes every day.",
    "Computers help us finish our work much faster than before now.",
    "The ocean waves are calm and very peaceful at this time.",
    "Drink a glass of water as soon as you wake up.",
    "Big cities are full of bright lights and very busy streets.",
    "Goldfish swim in the small tank near the bright sunny window.",
    "Hard work is the only way to reach your big goals.",
    "The stars look very beautiful in the clear dark night sky.",
    "Flowers bloom in the garden during the middle of the spring.",
    "Keep your desk clean so you can find your things easily.",
    "An orange sunset marks the end of a very long day.",
    "Traveling to new countries helps you see the world much differently.",
    "I like to eat a healthy breakfast before I go out.",
    "The library is a perfect place to find many interesting books.",
    "Green grass grows quickly after a heavy rain in the forest.",
    "Stay focused on the task until it is completely finished now.",
    "A bright smile is the best thing you can wear today.",
    "Thunder rolls across the dark valley during the night time storm.",
    "Bicycles are a great way to get around the small town.",
    "The smell of pine trees is very strong in the woods.",
    "New technology makes our lives much easier than they used to be.",
    "A loyal dog is always happy to see you come home.",
    "The desert is very hot and dry during the summer months.",
    "Baking a cake is a fun activity for the whole family.",
    "Save your money so you can buy something special later on.",
    "The moon looks very large when it is low in sky.",
    "Take a walk to enjoy the fresh air and the sun.",
    "Honesty is always the best policy in any kind of situation.",
    "The clock on the wall ticks loudly in the quiet room.",
    "Every person has a unique story that is worth telling now",
];


let mode = "normal";
let testTime = 30;
let timer = testTime;
let interval = null;
let isStarting = false;
let currentword = "";

// Get random paragraph
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
function generateBeginnerText() {

    const letters = [" qwerty ", " asdf ", " ;lkjh ", " zxcv ", " .,mnb ", " poiu "];
    let text = "";

    for (let i = 0; i < 10; i++) {

        const randomIndex = Math.floor(Math.random() * letters.length);

        text += letters[randomIndex];

    }

    return text;
}



function generateMoreText() {

    let newText = "";

    for (let i = 0; i < 3; i++) {
        newText += " " + getRandomWord();
    }

    currentword += newText;
}






function generateHardText() {

    const characters = ["Stewardesses addressed assessed desserts ", "Monopoly on million-polyphony nouns ", "Deeded decreased decades, re-dressed cases "
        , "Hilly philly, oily lily, nylon holly ", "Great feathered sweaters created retreats ", "Statistical analysis of ecclesiastical catastrophes ",
        "The rhythm of the synchronous synthesis ", "Phenomenon-based ophthalmologists scrutinize ", "Quintessential kaleidoscopic kiosks", "Uncharacteristically recrystallized substances ",
        "A vexed wizard quickly jinxes the bailiwick ", "Six big devils from Japan forgot the waltz ", "The smoky quartz Sphinx gazed at the nymph ",
        "Exquisite zephyrs quickly galvanized the jury ", "acques’s frequency-modulation was fuzzy and jagged ", "Committee-approved questionnaires addressed the bookkeeping of reassessed recesses "
    ];
    let text = "";

    for (let i = 0; i < 2; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);

        text += characters[randomIndex];

    }

    return text;
}
// hard mode
function hardMode() {

    mode = "hard";
    document.getElementById("hardBtn").classList.add("active");
    document.getElementById("normalBtn").classList.remove("active");
    document.getElementById("beginnerBtn").classList.remove("active");

    init();

}
// normal mode
function normalMode() {

    mode = "normal";

    document.getElementById("normalBtn").classList.add("active");
    document.getElementById("beginnerBtn").classList.remove("active");
    document.getElementById("hardBtn").classList.remove("active");

    init();

}
// extend function
function extendText() {

    if (typinginput.value.length > currentword.length - 20) {

        if (mode === "beginner") {

            currentword += generateBeginnerText();

        }
        else if (mode === "hard") {

            currentword += generateHardText();

        }
        else if (mode === "normal") {

            currentword += " " + getRandomWord();

        }

        worddisplay.innerText = currentword;
    }

}

// beginner mode

function beginnerMode() {

    mode = "beginner";

    currentword = generateBeginnerText();

    worddisplay.innerText = currentword;
    document.getElementById("beginnerBtn").classList.add("active");
    document.getElementById("normalBtn").classList.remove("active");
    document.getElementById("hardBtn").classList.remove("active");

    typinginput.value = "";

}


// 2. Initialize
function init() {
    if (mode === "beginner") {
        currentword = generateBeginnerText();

    } else if (mode === "hard") {

        currentword = generateHardText();


        //currentword = beginnerTexts[Math.floor(Math.random() * beginnerTexts.length)];

    } else {
        currentword = getRandomWord();
    }
    worddisplay.innerText = currentword;

    typinginput.value = "";
    typinginput.disabled = false;

    timer = testTime;
    isStarting = false;

    timerDisplay.innerText = timer;
    wpmDisplay.innerText = 0;
    Accuracy.innerText = "0%";

    clearInterval(interval);
    typinginput.focus();
}
function setTime(seconds) {

    testTime = seconds;

    timer = seconds;

    timerDisplay.innerText = timer;

    init();
    // remove active from all buttons
    const buttons = document.querySelectorAll(".time-btn");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    // highlight clicked button
    event.target.classList.add("active");

}
// 3. Start Timer
function startTimer() {

    if (isStarting === true) {
        return;
    }

    isStarting = true;

    interval = setInterval(function () {

        timer--;
        timerDisplay.innerText = timer;

        if (timer === 0) {

            clearInterval(interval);
            typinginput.disabled = true;

            calculateWPM();
            calculateAccuracy();
            showStats();
        }

    }, 1000);
}

// 4. Live WPM
function liveWPM() {

    const timePassed = (testTime - timer) / 60;
    const wordsTyped = typinginput.value.length / 5;

    let wpm = 0;

    if (timePassed > 0) {
        wpm = Math.round(wordsTyped / timePassed);
    }

    wpmDisplay.innerText = wpm;
}

// 5. Final WPM
function calculateWPM() {

    const timeTaken = (testTime - timer) / 60;
    const wordsTyped = typinginput.value.length / 5;

    let wpm = 0;

    if (timeTaken > 0) {
        wpm = Math.round(wordsTyped / timeTaken);
    }

    wpmDisplay.innerText = wpm;
}

// 6. Accuracy
function calculateAccuracy() {

    const typed = typinginput.value;
    let correctChars = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentword[i]) {
            correctChars++;
        }

    }

    let AccuracyPercent = 0;

    if (typed.length > 0) {
        AccuracyPercent = Math.round((correctChars / typed.length) * 100);
    }

    Accuracy.innerText = AccuracyPercent + "%";
}

function liveAccuracy() {

    const typed = typinginput.value;
    let correctChars = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentword[i]) {
            correctChars++;
        }

    }

    let percent = 0;

    if (typed.length > 0) {
        percent = Math.round((correctChars / typed.length) * 100);
    }

    Accuracy.innerText = percent + "%";
}

function showStats() {

    const chars = typinginput.value.length;

    document.getElementById("chars").innerText = chars;

}

// Highlight Text
function highlightText() {

    const typed = typinginput.value;
    let highlighted = "";

    for (let i = 0; i < currentword.length; i++) {

        if (i === typed.length && typed.length !== currentword.length) {
            highlighted += '<span class="cursor"></span>';
        }

        if (i < typed.length) {

            if (typed[i] === currentword[i]) {
                highlighted += '<span style="color:green">' + currentword[i] + '</span>';
            } else {
                highlighted += '<span style="color:red">' + currentword[i] + '</span>';
            }

        } else {

            highlighted += '<span style="color:#9aa4b2">' + currentword[i] + '</span>';

        }

    }

    if (typed.length === currentword.length) {
        highlighted += '<span class="cursor"></span>';
    }
    worddisplay.innerHTML = highlighted;

    worddisplay.scrollTop = worddisplay.scrollHeight;
}

// 8. Typing Event
typinginput.addEventListener('input', function () {

    startTimer();

    if (typinginput.value.length > currentword.length - 20) {
        extendText();
    }


    highlightText();

    liveWPM();

    liveAccuracy();
    worddisplay.scrollLeft = worddisplay.scrollHeight;

});

// 9. Restart Button
restartBtn.addEventListener('click', function () {

    init();

});

// Start App
init();