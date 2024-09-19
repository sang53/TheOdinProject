// for disabled buttons
const OPAQUEVAL = 0.5;

// stores [current number, operation, previous number]
let nums = ['','', '']; 

// stage 0: input first number
// stage 1: input second number
// stage 2: result after pressing equals
// stage 3: error stage
let stage = 0;
let period = false;

const outputDiv = document.querySelector('#output');
const prevDiv = document.querySelector("#prev");

const leftOperators = document.querySelector('#buttons-left-top');
const rightOperators = document.querySelector('#buttons-right');
const numButtons = document.querySelector('#buttons-left-bot');

// specific buttons to toggle opacity for user visual response
const equalButton = document.querySelector("#equals");
const periodButton = document.querySelector("#period");

numButtons.addEventListener("click", inputNum);
leftOperators.addEventListener("click", inputOperator);
rightOperators.addEventListener("click", inputOperator);

// start disabled
makeOpaque(equalButton, OPAQUEVAL);

function inputNum(event) {
    if (event.target.id === "buttons-left-bot") return;
    if (stage === 0 || stage === 1) {
        switch (event.target.id) {
            case 'period':
                if (!period) {
                    period = true;
                    outputDiv.textContent += '.';
                    makeOpaque(event.target, OPAQUEVAL);
                }
                return;
            case 'plus-minus':
                toggleNeg();
                return;
            default:
                // to avoid leading 0's
                (outputDiv.textContent === '0') ? outputDiv.textContent = event.target.id : outputDiv.textContent += event.target.id;
                return;
        }
    }
    if (stage === 2 || stage === 3) {
        // user should only be able to input new equation after the results/error
        switch (event.target.id) {
            case 'period':
                clear();
                period = true;
                outputDiv.textContent += '.';
                stage = 0;
                return;
            case 'plus-minus':
                return;
            default:
                clear();
                outputDiv.textContent = event.target.id;
                stage = 0;
                return;
        }
    }
}

function inputOperator(event) {
    if (event.target.id === "clear") {
        clear();
        return;
    }
    if (stage === 0) {
        switch (event.target.id) {
            case "backspace":
                backSpace();
                return;
            case "equals":
                return;
            default:
                nums = ['', event.target.id, outputDiv.textContent];
                stage = 1;
                prevDiv.textContent = nums[2] + ' ' + nums[1];
                makeOpaque(equalButton, 1);
                newNum();
                return;
        }
    }
    if (stage === 1) {
        switch (event.target.id){
            case "backspace":
                backSpace();
                return;
            case "equals":
                nums[0] = outputDiv.textContent;
                prevDiv.textContent = nums.toReversed().join(' ');
                outputDiv.textContent = calculate();
                
                if (stage === 3) {
                    setError();
                    return;
                }
                makeOpaque(periodButton, 1);
                makeOpaque(equalButton, OPAQUEVAL);
                period = false;
                stage = 2;
                return;
            default:
                nums[0] = outputDiv.textContent;
                nums[2] = '' + calculate();
                if (stage === 3) {
                    setError();
                    return;
                }
                nums[1] = event.target.id;
                prevDiv.textContent = nums[2] + ' ' + nums[1];
                makeOpaque(equalButton, 1);
                newNum();
                stage = 1;
                return;
        }
    }
    if (stage === 2) {
        switch (event.target.id){
            case "backspace":
                backSpace();
                return;
            case "equals":
                return;
            default:
                // make sure current number does not end in a period
                if (outputDiv.textContent.at(-1) === '.') backSpace();

                nums = ['', event.target.id, outputDiv.textContent];
                prevDiv.textContent = nums[2] + ' ' + nums[1];
                makeOpaque(equalButton, 1);
                newNum();
                stage = 1;
                return;
        }
    }
}

function calculate() {
    switch (nums[1]) {
        case '+':
            return +nums[0] + +nums[2];
        case '-':
            return nums[2] - nums[0];
        case '/':
            if (nums[0] === '0' || nums[0] === '-0') {
                stage = 3;
                return;
            }
            return nums[2] / nums[0];
        case '*':
            return nums[2] * nums[0];
    }
}

function clear(num=0) {
    stage = num;
    nums = ['', '', ''];
    newNum();
    makeOpaque(equalButton, OPAQUEVAL);
    prevDiv.textContent = '';
}

function makeOpaque(element, num) {
    element.style.opacity = num;
}

function newNum() {
    period = false;
    makeOpaque(periodButton, 1);
    outputDiv.textContent = '0';
}

function toggleNeg() {
    if (outputDiv.textContent[0] === '-') outputDiv.textContent = outputDiv.textContent.substring(1);
    else outputDiv.textContent = "-" + outputDiv.textContent;
}

function backSpace() {
    if (outputDiv.textContent.length === 1) outputDiv.textContent = '0';
    else outputDiv.textContent = outputDiv.textContent.slice(0, -1);
}

function setError() {
    clear(3);
    outputDiv.textContent = 'DIVIDE BY 0 ERROR';
}