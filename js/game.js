const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");
// я укалаз в cons ctx формат игры

const ground = new Image();
ground.src = "img/ground.png";
// добавление фоторгафии 

const foodImg = new Image();
foodImg.src = "img/food.png";
// добавление фоторгафии в Image

let box = 32;
// отвечает за ширину блока и высоту блока на картинке

let score= 0;
// значение в игре 0

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
    // с помощью Math.floor мы округлили до целого числа , а match random 
    // чтоб яблоко появлялась на рандомной позиции 17- это блоков в ширину
    // 15 - это блоков в высоту 
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
    // расположение змейки по центру
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
      dir = "left";
    else if (event.keyCode == 38 && dir != "down")
      dir = "up"; 
    else if (event.keyCode == 39 && dir != "left")
      dir = "right";
    else if (event.keyCode == 40 && dir != "up")
      dir = "down";     
    // keyCode-37,38,39,40 означает куда мы будем направлять змейку
    // dir!= это означает если мы двигаемся вправо мы не можем двигаться
    // в лево      
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y )
          clearInterval(game);  
        // если он съедает свой хвост то он проигрывает
    }
}

function drawGame () {
    ctx.drawImage(ground, 0, 0);
    // мы нарисовали картинку ground 

    ctx.drawImage(foodImg, food.x, food.y );
    // добавили картинку food на блок и она появляется в разном месте

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        // создали змейку 
    } 

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.5,)
    // создали счет 

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // создаем передвежение самой змейки

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };    
        //здесь змейка может съедать еду
    } else {
        snake.pop();
        // pop удаляет последний элементч   
    }

    if(snakeX < box || snake > box * 17 
        || snakeY < 3 * box || snakeY > box * 17 )
        clearInterval(game);
        // когда он выходит за рамки то он начинает все заново
        

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;
    // движение змейки

    let newHead = {
        x: snakeX,
        y: snakeY,
    };
    // мы моздали голову змейки

    eatTail(newHead, snake); 
    // вызываем функцию голову и все элементы змейки

    snake.unshift(newHead);
    // unshift - мы добавляем новый элемент саоме начало
};




let game = setInterval(drawGame, 100);
// вызываем картинку каждую 100 миллесекунд
