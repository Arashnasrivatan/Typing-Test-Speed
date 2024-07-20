

const typingText = document.querySelector(".typtxt");
const inpField = document.querySelector(".input-field");
const tryAgainBtn = document.querySelector(".startagn button");
const timeTag = document.querySelector(".timerdiv .timer");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
let browser1 = ""

// console.log(cpmElement);

let timer,
    maxTime = 120,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > -1) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.floor(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        let cpm = Math.round((charIndex - mistakes) * 60 / (maxTime - timeLeft));
        cpmTag.innerText = cpm;
    } else {
        clearInterval(timer);
 inpField.value = "";
 }
}



function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        // let wpm = Math.round(((charIndex - mistakes) *60) /timeLeft);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}
function check(browser) {
    resetGame();
    let programlan = ['php', 'python', 'js']
    i = programlan.indexOf(browser)
    function loadParagraph() {

        const ranIndex = Math.floor(Math.random() * lans[i].length);  

        typingText.innerHTML = "";
        lans[i][ranIndex].split("").forEach(char => {
            let span = `<span>${char}</span>`
            typingText.innerHTML += span;
        });
        typingText.querySelectorAll("span")[0].classList.add("active");
        document.addEventListener("keydown", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
    }
    loadParagraph();
    browser1 = browser

}
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);