let headTop = 10;
let headLeft = 12;
let direction = "up";
let tail = [];
let intervalId;
let score = 0;

const config = {
    size: 60,
    width: 30,
    height: 16,
}

let food = {x:Math.floor(Math.random() * config.width), y:Math.floor(Math.random() * config.height)};

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
        headLeft = config.width - 1;
    }
    render();
}
function goDown(){
    headTop++;
    if(headTop >= config.height){
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
      intervalId = setInterval(gameloop, 100);
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
    score = 0;
    food = {x:Math.floor(Math.random() * config.width), y:Math.floor(Math.random() * config.height)};
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
    for(let i=0; i<tail.length; i++){
        if(tail[i].x === headLeft && tail[i].y === headTop){
            alert("You lost!");
            reset();
            pauseGame();
        }
    }
    if(food.x === headLeft && food.y === headTop){
        score++;
        addTail();
        food = {x:Math.floor(Math.random() * config.width), y:Math.floor(Math.random() * config.height)};
        console.log(score);
    }
    addTail();
    lastTail();
    
}

document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        switch (keyName){
            case 'ArrowUp':
                changeDirection("up");
                break;
            case 'ArrowRight':
                changeDirection("right");
                break;
            case 'ArrowDown':
                changeDirection("down");
                break;
            case 'ArrowLeft':
                changeDirection("left");
                break;
            case 'c':
                startGame();
                break;
            case ' ':
                pauseGame();
                break;
            case 'v':
                restartGame();
                break;

        }
    },
    false,
  );

function render(){
    let snakeHtml = `<div class="head" style="width: ${1*config.size}px; height: ${1*config.size}px; top: ${headTop*config.size}px; left: ${headLeft*config.size}px;"></div>`;
    for(let i=0; i<tail.length; i++){
        snakeHtml += `<div class="snake" style="width: ${1*config.size}px; height: ${1*config.size}px; top: ${tail[i].y*config.size}px; left: ${tail[i].x*config.size}px;"></div>`;
    }
    snakeHtml += `<div class="food" style="width: ${1*config.size}px; height: ${1*config.size}px; top: ${food.y*config.size}px; left: ${food.x*config.size}px;"></div>`;
    boardEl.innerHTML = snakeHtml;
    document.getElementById("score").innerHTML = score;
}
render();