"use strict";
// 1. Settings and Variables
const worddisplay = document.getElementById('worddisplay');
const typinginput = document.getElementById('typinginput');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const Accuracy = document.getElementById('Accuracy');
const restartBtn = document.getElementById('restart-btn');

const sscTexts = [

`The Constitution of India is the supreme law of the country. It establishes the framework of the Government, defines the powers of different institutions, and guarantees fundamental rights to every citizen. Public servants are expected to perform their duties with honesty, integrity, and complete dedication to the nation.`,

`The Government of India has introduced several digital initiatives to improve transparency and accountability in public administration. Online services have reduced paperwork, increased efficiency, and enabled citizens to access government facilities without unnecessary delays or inconvenience.`,

`Education plays an important role in the development of any nation. A well-educated population contributes to economic growth, social harmony, and technological advancement. Governments continue to invest in schools, universities, and skill development programs to prepare young people for future opportunities.`,

`Environmental protection has become a major responsibility of every citizen. Reducing pollution, conserving forests, protecting wildlife, and promoting renewable energy sources are essential for maintaining ecological balance and ensuring sustainable development for future generations.`,

`The Election Commission of India conducts free and fair elections across the country. It ensures that every eligible citizen has the opportunity to vote without fear or discrimination. Free elections strengthen democracy and encourage public participation in governance.`,

`India has made remarkable progress in science and technology over the past few decades. Developments in space research, digital communication, artificial intelligence, and healthcare have improved the quality of life and strengthened the country's position on the global stage.`,

`Public transportation systems play an important role in reducing traffic congestion and environmental pollution. Efficient railway networks, metro services, and bus transportation help millions of passengers travel safely while supporting economic development throughout the country.`,

`Government departments maintain official records to ensure transparency, accountability, and efficient administration. Accurate documentation helps in policy implementation, financial management, and the timely delivery of services to citizens across different regions.`,

`Disaster management involves planning, coordination, and quick response during emergencies such as floods, earthquakes, cyclones, and droughts. Government agencies work together with local authorities to rescue affected people, provide relief materials, and restore normal life as quickly as possible.`,

`Fundamental Duties remind every citizen that rights are accompanied by responsibilities. Respecting the Constitution, protecting public property, preserving national heritage, and promoting harmony among all sections of society contribute to building a strong and united nation.`

];

const bankTexts = [

`The Reserve Bank of India is the central bank of the country. It regulates the banking system, controls monetary policy, maintains financial stability, and ensures that commercial banks operate according to established laws and regulations.`,

`Digital banking has transformed the way customers access financial services. Mobile banking, internet banking, and electronic payment systems allow people to transfer funds, pay bills, and monitor their accounts securely from any location.`,

`Financial literacy helps individuals understand savings, investments, loans, insurance, and responsible borrowing. Banks regularly organize awareness programs to educate customers about safe banking practices and fraud prevention.`,

`Commercial banks play an important role in economic development by accepting deposits from customers and providing loans to businesses, farmers, students, and individuals. These financial services support employment generation and industrial growth.`,

`Cyber security has become an essential part of modern banking. Customers are advised not to share confidential information such as passwords, one-time passwords, or debit card details with unknown persons to prevent online fraud.`,

`The Unified Payments Interface has revolutionized digital transactions in India by enabling instant fund transfers between bank accounts. The system operates throughout the day and has significantly increased the use of cashless payments.`,

`Banks encourage customers to maintain accurate records of their financial transactions. Regular account statements help customers verify deposits, withdrawals, interest credits, and other banking activities without difficulty.`,

`Inflation affects the purchasing power of money and influences financial decisions made by individuals and businesses. The Reserve Bank monitors economic conditions carefully while framing monetary policies to maintain price stability.`,

`Microfinance institutions and commercial banks support small entrepreneurs by providing financial assistance for starting or expanding businesses. Easy access to credit encourages innovation, employment, and economic development in rural as well as urban areas.`,

`Customer service remains one of the most important responsibilities of every banking institution. Prompt assistance, transparent communication, and efficient grievance redressal systems help maintain public confidence in the banking sector.`

];
const railwayTexts = [

`Indian Railways is one of the largest railway networks in the world. It connects thousands of cities and villages while transporting millions of passengers and large quantities of freight every day with efficiency and reliability.`,

`Passenger safety is the highest priority of the railway administration. Regular inspection of railway tracks, bridges, signaling systems, and rolling stock helps prevent accidents and ensures smooth train operations.`,

`Modern signaling systems improve the efficiency of railway operations by reducing delays and maintaining safe distances between trains. Advanced technology allows better monitoring and communication throughout the railway network.`,

`Railway stations provide essential services such as ticket booking, waiting rooms, drinking water, security arrangements, and passenger information systems. Continuous improvements enhance the travel experience for millions of commuters.`,

`Freight transportation by rail plays an important role in the country's economy. Coal, food grains, cement, petroleum products, automobiles, and industrial goods are transported efficiently across different regions of India.`,

`Indian Railways continues to modernize its infrastructure through electrification, track renewal, station redevelopment, and the introduction of faster trains. These improvements increase operational efficiency and passenger comfort.`,

`Railway employees perform various responsibilities including train operations, station management, maintenance, signaling, engineering, and customer service. Teamwork among different departments ensures safe and efficient railway functioning.`,

`Proper maintenance of railway tracks and locomotives reduces operational risks and extends the service life of railway assets. Scheduled inspections help identify technical issues before they affect train operations.`,

`The introduction of digital ticketing systems has simplified the reservation process for passengers. Online booking platforms enable travelers to reserve tickets, check train schedules, and receive journey updates conveniently.`,

`Cleanliness at railway stations and inside coaches contributes significantly to passenger satisfaction. Awareness campaigns encourage travelers to dispose of waste responsibly and maintain a hygienic environment during their journey.`

];

const generalTexts = [

"Regular reading and typing practice improve both speed and accuracy over time.",

"Education develops knowledge confidence and the ability to solve real world problems effectively.",

"Technology has transformed communication education healthcare and many other aspects of daily life."

];


let testTime = 30;
let timer = testTime;
let interval = null;
let isStarting = false;
let currentword = "";
let examType = "ssc";

// Get random paragraph
function getRandomParagraph(){

    if(examType === "ssc"){

        return sscTexts[Math.floor(Math.random() * sscTexts.length)];

    }

    else if(examType === "bank"){

        return bankTexts[Math.floor(Math.random() * bankTexts.length)];

    }

    else if(examType === "railway"){

        return railwayTexts[Math.floor(Math.random() * railwayTexts.length)];

    }

    else{

        return generalTexts[Math.floor(Math.random() * generalTexts.length)];

    }

}
function setExam(type) {
    document.getElementById("examCardName").innerText = type.toUpperCase();

    examType = type;

    const buttons = document.querySelectorAll(".exam-btn");

    buttons.forEach(function(btn){
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    init();
}



function generateMoreText() {

    let newText = "";

    for (let i = 0; i < 3; i++) {
        newText += " " + getRandomWord();
    }

    currentword += newText;
}


// extend function
function extendText() {

   currentword += " " + getRandomParagraph();

worddisplay.innerText = currentword;

}




// 2. Initialize
function init() {
   currentword = getRandomParagraph();

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