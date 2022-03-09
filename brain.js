
let direction = {x: 0, y: 0};
const snakeFoodMusic = new Audio('food.mp3');
const snakeMoveMusic = new Audio('move.mp3');
const gameOver = new Audio('gameover.mp3');
const gameMusic = new Audio('backgroundMusic.mp3');
let snakeArray = [{x: 3, y: 4}];
let speed = 2;
let lastTime = 0;
let boardId = document.getElementById("board");
let startButton = document.getElementById("startButton");
let foodPosition = {x: 8, y: 10};
let score = 0;
let shoudWeStart = false;
let scoreElement = document.getElementById('idScore');
let isCollide = false;
// let blockRecords = new Map();
function randomNumber(a, b)
{
    return Math.round(Math.random()*(b - a))+a;
}
function main(ctime)
{
    window.requestAnimationFrame(main);     
    // console.log(ctime);
    if((ctime - lastTime)/1000 < 1/speed)
    {
        return;
    }
    lastTime = ctime;
    gameEngine();
    
}
function gameEngine()
{
    // console.log(snakeArray.length);
    //Updating the food
    if(snakeArray[0].x === foodPosition.x && snakeArray[0].y === foodPosition.y)
    {
        score += 1;
        snakeFoodMusic.play();
        let tempElement = {x: snakeArray[0].x+direction.x, y: snakeArray[0].y+direction.y};
        // blockRecords.set(snakeArray[0].x.toString()+ "*" + snakeArray[0].y.toString(), true);
        snakeArray.unshift(tempElement);
        foodPosition.x = randomNumber(0, 17);
        foodPosition.y = randomNumber(0, 17);
        // console.log(foodPosition.x);
        // console.log(foodPosition.y);
        
    }
    //Updating the snake
    if(!shoudWeStart)
    {
        for(let i = snakeArray.length-2 ; i>=0 ; --i)
        {
            snakeArray[i+1] = {...snakeArray[i]};
        }
        snakeArray[0].x+=direction.x;
        snakeArray[0].y+=direction.y;
    }
    // Game Over
    function restartTheGame()
    {
        snakeArray = [{x: 13, y: 4}];
        foodPosition = {x: 8, y: 10};
        // window.location.reload(true);
        scoreElement.classList.add('score');
        scoreElement.innerHTML = `score: ${score}`;
        score = 0;
        shoudWeStart = true;
        gameMusic.pause();
        // blockRecords.clear();
    }
    // Due to side collide
    if(snakeArray[0].x<0 || snakeArray[0].x>18 || snakeArray[0].y<0 || snakeArray[0].y>18)
    {
        restartTheGame();
    }
    // Due to self collide
    snakeArray.forEach((e, index) => {
        if(index>0 && snakeArray[0].x == e.x && snakeArray[0].y == e.y)
        {
            isCollide = true;
        }
    });
    if(isCollide ==true)
    {
        isCollide = false;
        restartTheGame();
    }
    // Render the snake
    //Display the snake
    boardId.innerHTML = "";
    snakeArray.forEach((element, index) => {
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = element.y;
       snakeElement.style.gridColumnStart = element.x;
       if(index===0)
            snakeElement.classList.add('snakeHead');
       else
            snakeElement.classList.add('snakeBody');
       boardId.appendChild(snakeElement);
    });
    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x; 
    foodElement.classList.add('food');
    boardId.appendChild(foodElement);
}

function startTheGame()
{
    scoreElement.innerHTML = "";
    scoreElement.classList.remove('score');
    gameMusic.play();
    gameMusic.loop = true;   
    window.addEventListener('keydown', e =>{
        shoudWeStart = false;
        switch(e.key)
        {
            case 'ArrowUp':
                direction.x= 0;
                direction.y= -1;
                break;
            case 'ArrowDown':
                direction.x= 0;
                direction.y= 1;
                break;
            case 'ArrowLeft':
                direction.x= -1;
                direction.y= 0;
                break;
            case 'ArrowRight':
                direction.x= 1;
                direction.y= 0;
                break;
            default:
                break; 
        }
    })
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', startTheGame);
