const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const algorithmSelect = document.getElementById('algorithm');


let array = [];
const barWidth = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//initializing the array
function generateArray() {
    const numBars = Math.floor(canvasWidth / barWidth);
    array = Array.from({length: numBars}, () => Math.floor(Math.random() * canvasHeight));
    drawArray();
}

//drawing the array
function drawArray() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    array.forEach((value, index) => {
        ctx.fillStyle = "#693169";
        ctx.fillRect(index * barWidth, canvasHeight - value, barWidth - 2, value);
    });
}

function sleep(ms){
    const speed = document.getElementById('speed').value;
    return new Promise((resolve) => setTimeout(resolve, ms / speed));
}

//bubble Sort Algorithm
async function bubbleSort(){
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - 1; j++){
            if(array[j] > array[j + 1]){
                // swapping part
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
                drawArray();
                await sleep(50);
            }
        }
    }
}

// Quick Sort algorithm
async function quickSort(start = 0, end = array.length - 1) {
    if(start >= end) return;

    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
    const pivotValue = array[end];
    let pivotIndex = start;

    for(let i = start; i < end; i++){
        if(array[i] < pivotValue){
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        }
        drawArray();
        await sleep(50);
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    drawArray();
    await sleep(50);
    return pivotIndex;
}

startBtn.addEventListener('click', ()=>{
    const selectedAlgorithm = document.getElementById('algorithm').value;
    if(selectedAlgorithm === 'bubble'){
        bubbleSort();
    }
    else if(selectedAlgorithm === 'quick'){
        quickSort();
    }
});

resetBtn.addEventListener('click', generateArray);

generateArray();