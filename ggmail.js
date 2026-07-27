const attachBtn = document.getElementById("attachBtn");
const fileOptions = document.getElementById("fileOptions");
const userAttachments = document.getElementById("userAttachments");
const sampleAttachments = document.getElementById("sampleAttachments");

const sendBtn = document.getElementById("sendBtn");
const restartBtn = document.getElementById("restartBtn");
const restartTestBtn = document.getElementById("restartTestBtn");

const timerElement = document.getElementById("timer");

const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

const resultScreen = document.getElementById("resultScreen");
const resultTime = document.getElementById("resultTime");
const resultWpm = document.getElementById("resultWpm");
const resultAccuracy = document.getElementById("resultAccuracy");
const resultAttachments = document.getElementById("resultAttachments");


let testStartTime = null;
let requiredFiles = [];
let totalTime = 120;
let timeLeft = 60;
let timerStarted = false;
let timer = timeLeft;

const fileNames = [
    "project_report.pdf",
    "meeting_notes.docx",
    "invoice_2025.xlsx",
    "presentation.pptx",
    "budget_2025.xlsx"
];



const emails = [{
    to: "contact@example.com, john.doe@mail.com",

    subject: "Project Update - Milestone 3",

    message: `Hi Team,
I have attached the updated progress report for Milestone 3. Overall, we are on track, and the key deliverables are nearing completion. Let me know if you have any feedback before the final review.

Thanks,
Your Name`
},

{
    to: "contact@example.com",
    subject: "Meeting Reminder",
    message: `Hi Team,
This is a reminder for our meeting scheduled tomorrow at 10 AM. Please make sure to bring the project updates.

Thanks,
Manager`
},

{
    to: "john.doe@mail.com",
    subject: "Invoice Update",
    message: `Hello,
Please find the updated invoice attached for your review. Let me know if any corrections are needed.

Regards,
Accounts Team`
},

{
    to: "support@company.com",
    subject: "Project Status",
    message: `Hi,
The development work for the current sprint is almost complete. We are now testing the new features.

Best,
Development Team`
},



{
    to: "support@service.com",

    subject: "Weekly Sales Report - Week Twelve",

    message: `Hi Team,
The latest sales figures for the past week are now ready. Everything looks good and we have met our main growth targets. Please review the attached data before our meeting tomorrow morning.

Best,
Your Name`
},

{
    to: "hr@company.com, manager@office.com",

    subject: "Leave Request - Personal Time",

    message: `Hello,
I am writing to request two days off next month. My work will be finished before I leave for this break. Thank you for your help with this request today.

Regards,
Your Name`
},

{
    to: "client@global.com, partner@firm.com",
    subject: "New Proposal - Design Phase",
    message: `Dear Partners,
We have completed the first draft of the new project design. Your initial feedback would be very helpful at this early stage. We look forward to hearing your thoughts on the next steps.
Sincerely,
Your Name`},

{
    to: "help@tech.com",
    subject: "Technical Issue - System Login",
    message: `Hi Support,
I am unable to access my account since the latest update. Please let me know how to fix this problem very soon. The error message appears every time I try to sign in.

Thank you,
Your Name`},

{
    to: "team@creative.com",
    subject: "Meeting Notes - Creative Session",
    message: `Hi Everyone,
The notes from our brainstorming session are now fully compiled. Please check the list of tasks for the upcoming winter launch. We will discuss these points further during our next group call.

Cheers,
Your Name`
},






];
let email;



// Example fields
const sampleTo = document.getElementById("sampleTo");
const sampleSubject = document.getElementById("sampleSubject");
const sampleMessage = document.getElementById("sampleMessage");


// Typing fields
const typingTo = document.getElementById("typingTo");
const typingSubject = document.getElementById("typingSubject");
const typingMessage = document.getElementById("typingMessage");


// Insert example email


function generateEmail() {

    let randomEmail = emails[Math.floor(Math.random() * emails.length)];

    email = randomEmail;

    sampleTo.value = email.to;
    sampleSubject.value = email.subject;

    sampleMessage.innerHTML = "";

    email.message.split("").forEach(char => {

        const span = document.createElement("span");

        if (char === "\n") {
            span.classList.add("newline");
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = char;
        }

        sampleMessage.appendChild(span);

    });

}
generateEmail();
function checkTyping() {

    if (email.to.startsWith(typingTo.value)) {
        typingTo.style.border = "2px solid green";
    } else {
        typingTo.style.border = "2px solid red";
    }


    if (email.subject.startsWith(typingSubject.value)) {
        typingSubject.style.border = "2px solid green";
    } else {
        typingSubject.style.border = "2px solid red";
    }


    if (typingMessage.valuetypingMessage.innerText === email.message.substring(0, typingMessage.value.length)) {
        typingMessage.style.border = "2px solid green";
    } else {
        typingMessage.style.border = "2px solid red";
    }

}


typingTo.addEventListener("input", checkTyping);
typingSubject.addEventListener("input", checkTyping);
typingMessage.addEventListener("input", checkTyping);


typingTo.addEventListener("input", startTest);
typingSubject.addEventListener("input", startTest);
typingMessage.addEventListener("input", startTest);


typingTo.addEventListener("input", calculateAccuracy);
typingSubject.addEventListener("input", calculateAccuracy);
typingMessage.addEventListener("input", calculateAccuracy);


typingTo.addEventListener("input", calculateWPM);
typingSubject.addEventListener("input", calculateWPM);
typingMessage.addEventListener("input", calculateWPM);


// ⭐ ADD STEP 3 HERE
typingTo.addEventListener("input", () => {
    highlightField(sampleTo, typingTo.value);
});

typingSubject.addEventListener("input", () => {
    highlightField(sampleSubject, typingSubject.value);
});

typingMessage.addEventListener("input", () => {
    highlightField(sampleMessage, typingMessage.innerText);
});

// timer function
function startTest() {

    if (!timerStarted) {

        timerStarted = true;
        testStartTime = Date.now();   // ⭐ start time recorded

        timer = setInterval(() => {

            timeLeft--;

            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                typingMessage.disabled = true;
                typingTo.disabled = true;
                typingSubject.disabled = true;

                finishTest();
                return;
            }

        }, 1000);

    }

}

function restartTest() {

    clearInterval(timer);
    resultScreen.style.display = "none";

    timerStarted = false;
    timeLeft = totalTime;
    timerElement.textContent = timeLeft;

    testStartTime = null;

    typingTo.disabled = false;
    typingSubject.disabled = false;
    typingMessage.disabled = false;

    typingTo.value = "";
    typingSubject.value = "";
    typingMessage.value = "";

    userAttachments.innerHTML = "";
    sampleAttachments.innerHTML = "";

    wpmElement.textContent = 0;
    accuracyElement.textContent = 100;

    // ⭐ generate new test
    generateEmail();
    generateAttachments();

}
//send button which finish button
function finishTest() {

    clearInterval(timer);

    typingTo.disabled = true;
    typingSubject.disabled = true;
    typingMessage.disabled = true;

    let timeUsed = 60 - timeLeft;

    resultTime.textContent = timeUsed;
    resultWpm.textContent = wpmElement.textContent;
    resultAccuracy.textContent = accuracyElement.textContent;

    let requiredFiles = sampleAttachments.children.length;
    let attachedFiles = userAttachments.children.length;

    if (requiredFiles === attachedFiles) {
        resultAttachments.textContent = "Correct ✅";
    } else {
        resultAttachments.textContent = "Missing ❌";
    }

    resultScreen.style.display = "block";

}


// attach 
let demoAttachments = [];
// genereator attachments
// generator attachments
function generateAttachments() {

    sampleAttachments.innerHTML = "";

    requiredFiles = [];

    let count = Math.random() < 0.5 ? 1 : 2;

    for (let i = 0; i < count; i++) {

        let randomFile = fileNames[Math.floor(Math.random() * fileNames.length)];

        if (!requiredFiles.includes(randomFile)) {

            requiredFiles.push(randomFile);

            let fileElement = document.createElement("div");

            fileElement.textContent = "📎 " + randomFile;

            sampleAttachments.appendChild(fileElement);

        }

    }

}

function addUserAttachment(file) {

    if (!requiredFiles.includes(file)) {

        alert("❌ Invalid attachment");

        return;

    }

    let fileElement = document.createElement("div");
    fileElement.classList.add("attachment-item");

    let fileName = document.createElement("span");
    fileName.textContent = "📎 " + file;

    let removeBtn = document.createElement("span");
    removeBtn.textContent = " ❌";

    removeBtn.addEventListener("click", () => {
        fileElement.remove();
    });

    fileElement.appendChild(fileName);
    fileElement.appendChild(removeBtn);

    userAttachments.appendChild(fileElement);

}


generateAttachments();
attachBtn.addEventListener("click", () => {

    fileOptions.innerHTML = "";

    fileNames.forEach(file => {

        let option = document.createElement("div");

        option.textContent = file;

        option.classList.add("file-option");

        option.addEventListener("click", () => {

            addUserAttachment(file);

            fileOptions.innerHTML = "";

        });

        fileOptions.appendChild(option);

    });

});

// calculate wpm
function calculateWPM() {

    let typedText = typingTo.value + " " + typingSubject.value + " " + typingMessage.innerText;

    let words = typedText.length / 5;

    // time passed in seconds
    let elapsedSeconds = (Date.now() - testStartTime) / 1000;

    // ⭐ ignore first 2 seconds
    if (elapsedSeconds < 2) {
        wpmElement.textContent = 0;
        return;
    }


    let minutes = (totalTime - timeLeft) / 60;

    let wpm = Math.round(words / minutes);

    if (!isFinite(wpm)) {
        wpm = 0;
    }

    wpmElement.textContent = wpm;

}

function setTime(seconds) {

    // change timer value
    totalTime = seconds;
    timeLeft = seconds;

    // update timer display
    timerElement.textContent = timeLeft;

    // restart the test with new time
    restartTest();

}
// calculate accuracy
function calculateAccuracy() {

    let originalText = email.to + " " + email.subject + " " + email.message;
    let typedText = typingTo.value + " " + typingSubject.value + " " + typingMessage.innerText;

    if (typedText.length === 0) {
        accuracyElement.textContent = 100;
        return;
    }

    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === originalText[i]) {
            correct++;
        }

    }

    let accuracy = Math.round((correct / typedText.length) * 100);

    accuracyElement.textContent = accuracy;

}
// highlight text

function highlightField(sampleElement, typedText) {

    const spans = sampleElement.querySelectorAll("span");

    spans.forEach((span, index) => {

        span.classList.remove("correct", "incorrect", "current");

        let expectedChar = email.message[index];

        if (index < typedText.length) {

            if (typedText[index] === expectedChar) {
                span.classList.add("correct");
            } else {
                span.classList.add("incorrect");
            }

        }

        if (index === typedText.length) {
            span.classList.add("current");
        }

    });

}
sendBtn.addEventListener("click", finishTest);
restartBtn.addEventListener("click", restartTest);
restartTestBtn.addEventListener("click", restartTest);
//evnet
