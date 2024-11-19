let headTop = 10;
let headLeft = 12;
let direction = "up";
let tail = [];
let intervalId;

const config = {
    size: 20,
    width: 30,
    height: 30,
}

const boardEl = document.getElementById("board");
boardEl.style.height = config.height * config.size + "px";
boardEl.style.width = config.width * config.size + "px";

function goUp(){
    headTop--;
    if(headTop < 0){
        headTop = config.height - 1;
    }
    render();
}
function goRight(){
    headLeft++;
    if(headLeft >= config.width){
        headLeft=0;
    }
    render();
}
function goLeft(){
    headLeft--;
    if(headLeft < 0){
        headLeft = config.height - 1;
    }
    render();
}
function goDown(){
    headTop++;
    if(headTop >= config.width){
        headTop=0;
    }
    render();
}
function changeDirection(newDirection){
    if(direction === "up" || direction === "down"){
        if(newDirection === "right" || newDirection === "left"){
            direction = newDirection;
        }
    }else if(direction === "right" || direction === "left"){
        if(newDirection === "up" || newDirection === "down"){
            direction = newDirection;
        }
    }
}
function addTail(){
    tail.push({x:headLeft,y:headTop})
}
function lastTail(){
    tail.splice(0,1)
}

function startGame() {
    if (!intervalId) {
      intervalId = setInterval(gameloop, 300);
    }
}
function pauseGame(){
    clearInterval(intervalId);
    intervalId = null;
}
function reset(){
    headTop = 10;
    headLeft = 12;
    direction = "up";
    tail = [];
}
function restartGame(){
    reset();
    startGame();
}

function gameloop(){
    switch (direction){
        case "up":
            goUp();
            break;
        case "right":
            goRight()
            break;
        case "down":
            goDown();
            break;
        case "left":
            goLeft();
            break;
    }
    addTail();
    lastTail();
}

function render(){
    let snakeHtml = `<div class="snake" style="width: ${1*config.size}px; height: ${1*config.size}px; top: ${headTop*config.size}px; left: ${headLeft*config.size}px;"></div>`;
    for(let i=0; i<tail.length; i++){
        snakeHtml += `<div class="snake" style="width: ${1*config.size}px; height: ${1*config.size}px; top: ${tail[i].y*config.size}px; left: ${tail[i].x*config.size}px;"></div>`;
    }
    boardEl.innerHTML = snakeHtml;
}
render();