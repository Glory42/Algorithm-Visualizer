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
    const numBars = Math.floor(canvasWidth / canvasHeight);
    array = Array.from({length: numBars}, () => Math.floor(Math.random() * canvasHeight));
    drawArray();
}

//drawing the array
function drawArray() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    array.forEach((value, index) => {
        ctx.fillstyle = "#4caf50";
        ctx.fillRect(index * barWidth, canvasHeight - value, barWidth - 2, value);
    });
}

generateArray();

//bubble Sort Algorithm
async function bubbleSort(){
    for(i = 0; i < array.length; i++){
        for(j = 0; j.array.length - 1; j++){
            if(array[j] > array[j + 1]){
                // swapping part
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
                drawArray();
                await sleep(50);
            }
        }
    }
}