
let canvas=document.querySelector('#canvas');
let ctx=canvas.getContext('2d');
let rows=20;
let cols=20;
let snake=[
    {x:19, y:2},
];

let food;
let cellWidth=canvas.width/cols;
let cellHeight=canvas.height/rows;
let direction='LEFT';
let foodCollected = false;

testGameOver=()=>{
    //schlange beißt sich
    let firstPart=snake[0];
    let otherParts=snake.slice(1);
    let duplicatPart=otherParts.find(part => part.x==firstPart.x && part.y==firstPart.y);

    //schlange läuft gegen Wand
    if(snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatPart
    )
    {
        placeFood()
        snake=[
        {x:9, y:3},
        ]; 
        direction='LEFT'
    }
}

placeFood=()=>{
    let randomX= Math.floor(Math.random() * cols);
    let randomY= Math.floor(Math.random() * rows);

    food={
        x: randomX,
        y: randomY
    };
};


draw = ()=>{
    ctx.fillStyle='black';
    ctx.fillRect(0, 0, canvas.width,canvas.height);
    ctx.fillStyle='white';
   
    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle='yellow';
    add(food.x, food.y); //food

    requestAnimationFrame(draw);
}
add=(x,y)=>{
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth -1, cellHeight-1);
}

shiftSnacke=()=>{
     for (let i = snake.length -1; i > 0 ; i--) {
        const part = snake[i];
        const lastPart=snake[i-1];
        part.x = lastPart.x;
        part.y = lastPart.y; 

        
     }
}

gameLoop=()=>{

    testGameOver();

    if(foodCollected){
        snake=[
            {x: snake[0].x,
             y: snake[0].y
        }, ...snake];

        foodCollected=false;
    }
    shiftSnacke();
    
    if(direction=='LEFT'){
        snake[0].x--;
    }
    if(direction=='RIGHT'){
        snake[0].x++;
    }
    if(direction=='UP'){
        snake[0].y--;
    }
    if(direction=='DOWN'){
        snake[0].y++;
    }
    if( snake[0].x==food.x && 
        snake[0].y==food.y){

        foodCollected = true;
        placeFood();
    }
            
}


keyDown=(e)=>{
    if(e.keyCode==37){
        direction='LEFT';
    }
    else if(e.keyCode==38){
        direction='UP';
    }
    else if(e.keyCode==39){
        direction='RIGHT';
    }
    else if(e.keyCode==40){
        direction='DOWN';
    }
}

placeFood();
setInterval(gameLoop, 500);
draw();


document.addEventListener('keydown', keyDown);
