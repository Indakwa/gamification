let { init, initKeys, Sprite, Text, collides, keyPressed, load, setImagePath, imageAssets, GameLoop, randInt, gestureMap } = kontra
let { canvas, context } = init();

initKeys();

setImagePath('assets');
document.querySelector(".btn").addEventListener('click', playGame)

function playGame(){
    document.querySelector(".btn").style.display = 'none'

    load('rock.png', 'left.png', 'right.png').then(function() {



    let sprites = [];
    let lives = 15;
    let rightFocus;
    let leftFocus;
    let myCanvas = document.getElementById("canvas");

    /*
    let textForm = (type, text, font, x, y, dy, dx, ttl) => {
        return Text({
            type,
            text,
            font,
            color: "white",
            x,
            y,
            dy,
            dx,
            ttl
        });
    }

    */

    function createRock(id, x, y){
        return Sprite({
            id,
            type: "rock",
            x,
            y,
            dy: 1,
            image: imageAssets['rock']
        })
    }

    let player = Sprite({
        type: "player",
        x: 150,
        y: 60,
        image: imageAssets['left']
    })

    sprites.push(createRock(1, randInt(2, 45), 0))
    sprites.push(createRock(2, randInt(50, 70), -50))
    sprites.push(createRock(3, randInt(100, 130), -20))
    sprites.push(createRock(4, randInt(140, 180), -35))
    sprites.push(createRock(5, randInt(200, 240), -20))
    sprites.push(createRock(6, randInt(250, 280), -10))
    sprites.push(player); 

    function myUpdate() {


       sprites.forEach((sprite) => {
           sprite.update();
       });


       if(player.x <= 3){
           player.x = 3;
       }else if(player.x >= (canvas.width - 28)){
           player.x = (canvas.width - 28);
       }

           if(keyPressed('arrowright')) {
               player.image = imageAssets['right'];
               player.x += 1;
               rightFocus = true;
               leftFocus = false;
           }
           if (keyPressed('arrowleft')){
               player.image = imageAssets['left'];
               player.x -= 1;
               leftFocus = true;
               rightFocus = false;
           }


       for(let value of sprites){
           if(value.type === "rock"){
               if(collides(player, value)){
                   value.ttl = 0;
                   lives -= 1;
               }
           }
       }

       sprites = sprites.filter((sprite) => sprite.isAlive());

       if(lives <= 0){    

           loop.stop()
           loop2.stop()
           window.location.href = 'https://site.adform.com'
       }



   }

   function myRender() {
    sprites.forEach((sprite) => sprite.render());
   }

    var loop2Started; 

    var loop = kontra.GameLoop({

        update: function (){
            myUpdate()
        },

        fps: 60,

        render: function (){
            myRender()
        }
    }) 
    loop.start()

    var loop2 = kontra.GameLoop({

        update: function (){
            myUpdate()
            loop2Started = true;
        },

        fps: 80,

        render: function (){
            myRender()
        }
    }) 

    window.addEventListener('blur', () => {
        if(!loop2Started){
            loop.stop()
        }
        if(loop2Started){
            loop2.stop()
        }
    });

    setTimeout(() => {
        loop.stop()
        loop2.start()

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(7, randInt(2, 90), -10))
            }
        },3000);

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(8, randInt(95, 190), -35))
            }
        }, 3133);

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
                sprites.push(createRock(9, randInt(200, 280), 0))
                }
        }, 3899);




    }, 180000);
  

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(1, randInt(2, 45), 0))
            }
    }, 6899);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(2, randInt(50, 85), -50))
        }
    }, 6111);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(3, randInt(100, 130), -20))
        }
    }, 6989);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(4, randInt(140, 180), -35))
        }
    }, 6133);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(5, randInt(200, 240), -20))
        }
    }, 5773);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(6, randInt(250, 280), -10))
        }
    },6000);

    window.addEventListener('focus', () => {
        if(!loop2Started){
            loop.start()
        }
        if(loop2Started){
            loop2.start()
        }
    });

})
   
}
