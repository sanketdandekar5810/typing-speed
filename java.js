// 1. Settings and Variables
const numberdisplay = document.getElementById('numberdisplay');
const typinginput = document.getElementById('typinginput');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const Accuracy = document.getElementById('Accuracy');
const restartBtn = document.getElementById('restart-btn');

const numbers = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
    "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
    "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
    "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
    "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"
];


let mode = "normal";
let testTime = 30;
let timer = testTime;
let interval = null;
let isStarting = false;
let currentword = "";

// Get random number
function getRandomNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function generateBeginnerText() {

    const letters = ["1234567890 "];
    let text = "";

    for (let i = 0; i < 2; i++) {

        const randomIndex = Math.floor(Math.random() * letters.length);

        text += letters[randomIndex];

    }

    return text;
}


function generateMoreText() {

    let newText = "";

    for (let i = 0; i < 3; i++) {
        newText += " " + getRandomNumber();
    }

    currentword += newText;
}




function generateHardText() {

    const characters = ["1092.8 ", "5.2831 ", "9.0182 ", "47361	", "10101 ",
        "82736 ", "49501 ", "3827.1 ", "610.94 ", "525.25 ",
        "73849 ", "10629 ", "483.72	", "910.28 ", "6363.6 ",
        "29384 ", "50192 ", "84.736 ", "10.923 ", "4747.4 ",
        "61728 ", "39485 ", "10.293 ", "5.8473 ", "8181.8 ",
        "90123 ", "4.8576 ", "2.9381 ", "1047.2 ", "9.0909 ",
        "52819 ", "37.465 ", "8.1920 ", "4736.2 ", "11.223 ",
        "10628 ", "495.83 ", "2.0193 ", "8.4756 ", "445.56 ",
        "73829 ", "1048.2 ", "5928.3 ", "10294 ", "7788.9 ",
        "61928 ", "3.8475 ", "9102.3 ", "4.8572 ", "0.0112 ",
        "29310 ", "58.476 ", "109.28 ", "374.61 ", "12.321 ",
        "47586 ", "201.92 ", "83.746 ", "105.92 ", "567.65 ",
        "91028 ", "4837.5 ", "29.103 ", "84762 ", "8909.8 ",
        "52837 ", "1.0624 ", "3948.5 ", "1029.3 ", "4.3234 ",
        "81920 ", "47.365 ", "20.193 ", "5847.1 ", "76.567 ",
        "10482 ", "592.83 ", "91.024 ", "3847.5 ", "090.90 ",
        "73628 ", "4951.0 ", "8273.6 ", "10.629 ", "5151.5 ",
        "29384 ", "50192 ", "483.72 ", "91.028 ", "8.2828 ",
        "61728 ", "39485 ", "102.93 ", "5.8473 ", "37.373 ",
        "90123 ", "48576 ", "8473.6 ", "1092.3 ",
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

            currentword += " " + getRandomNumber();

        }

        numberdisplay.innerText = currentword;
    }

}

// beginner mode

function beginnerMode() {

    mode = "beginner";

    currentword = generateBeginnerText();

    numberdisplay.innerText = currentword;
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
        currentword = getRandomNumber();
    }
    numberdisplay.innerText = currentword;

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

// 7. Highlight Text
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
    numberdisplay.innerHTML = highlighted;
    numberdisplay.scrollTop = numberdisplay.scrollHeight;
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
    numberdisplay.scrollLeft = numberdisplay.scrollHeight;

});

// 9. Restart Button
restartBtn.addEventListener('click', function () {

    init();

});

// Start App
init();