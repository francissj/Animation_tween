window.onload = function(){

	Crafty.init(400, 336)
	Crafty.canvas.init();

    

	  Crafty.sprite(80, "img/test2.png", {
      
        playera: [3, 6],
        playerb: [3, 0]
       
        
    });



//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
    //load takes an array of assets and a callback when complete
    Crafty.load(["img/test2.png"], function () {
        Crafty.scene("main"); //when everything is loaded, run the main scene
    });

    //black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, Canvas, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
            // .text("Loading")
            // .css({ "text-align": "center" });
});

//automatically play the loading scene
Crafty.scene("loading");

	
};

Crafty.scene("main", function () {

//To store the players when they're clicked on
    var activePlayer =[];


	console.log("main");
	var player1 = Crafty.e("2D, Canvas, playera,Tween,Mouse")
        .attr({ x: 16, y: 50, z: 10 })
        .tween({ x: 150, y: 150}, 50)
        .bind('Click', function(e){
           //console.log("player1")
           activePlayer.unshift(player1);
           //console.log(activePlayer[0]);
        });



    var player2 = Crafty.e("2D, Canvas,Tween, playerb ,Mouse")
        .attr({ x: 100, y: 100, z: 10 })
        .tween({ x: 200, y: 200}, 50)
        .bind('Click', function(e){
           //console.log("player2");
           activePlayer.unshift(player2);


       });
     

//Restrict clicks to just the canvas area
//There may be problems when the same player is clicked in a row or in proximity to another player
    Crafty.canvas._canvas.addEventListener("mousedown",mousedownEvent, false);
    

    function mousedownEvent(e){

    // console.log(e.clientX);
    if(activePlayer[0]){


        var time = constantSpeed(activePlayer[0],e.clientX,e.clientY,3);

        //if(activePlayer[1] && activePlayer[0] != activePlayer[1])return;

        activePlayer[0].tween({ x: e.clientX, y: e.clientY}, time);

        activePlayer.length = 0;//deletes the array so that the entity has to be selected again before the move.

    
    }
   
}

});
        

//Function to standardise speed regardless of distance travelled
//needs to be adjusted so that the centre of the sprites are used
//rather than the top left corner

function constantSpeed(player, Xend, Yend, speed){

   
        var Xstart = player._x;
        var Ystart = player._y;


        var deltax = Xstart - Xend;
        var deltay = Ystart - Yend;

        var distance = Math.sqrt((deltax*deltax)+(deltay*deltay));
        //console.log(distance);

        
        var time = Math.round(distance/speed);
        return time;

}



   
   









