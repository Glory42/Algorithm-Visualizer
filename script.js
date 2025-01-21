const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const algorithmSelect = document.getElementById('algorithm');


let array = [];
const barWidth = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

function resetArray() {

}


async function bubbleSort(){
    for(i = 0; i < array.length; i++){
        for(j = 0; j.array.length - 1; j++){
            if(array[j] > array[j + 1]){
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
                
            }
        }
    }
}