window.onload = function() {
       
	document.ontouchmove = function(e){ e.preventDefault(); }

	// Canvas Coordinates
	var cX, cY;
	 
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var canvastop = canvas.offsetTop;
	var canvasleft = canvas.offsetLeft;	

	canvas.addEventListener("touchstart", touchDown, false);
	canvas.addEventListener("touchmove", touchCoord, true);
	canvas.addEventListener("touchend", touchUp, false);

	var pikachu = {};
	var pikachusCaught = 0;

	// Pikachu image
	var pikachuImage = new Image();
	pikachuImage.onload = function () {
		randomPika();
		context.drawImage(pikachuImage, pikachu.x, pikachu.y);
	};
	pikachuImage.src = "images/pika.png";


    function touchUp() {
        show();
    }

    function touchDown() {
        touchCoord();
    }

    function touchCoord(e) {
        event.preventDefault();
        cX = event.touches[0].clientX - canvasleft;
        cY = event.touches[0].clientY - canvastop;
        show();
    }

    function show() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Place a Pikachu on the canvas
		context.drawImage(pikachuImage, pikachu.x, pikachu.y);

        // Draw Pokeball
		context.beginPath();
		context.arc(cX, cY, 10, 0, Math.PI, false);
		context.fillStyle = 'white';
		context.fill();

		context.beginPath();
		context.arc(cX, cY, 10, Math.PI, 2*Math.PI, false);
		context.fillStyle = 'red';
		context.fill();

		// Display number of caught Pikachus
		context.fillStyle = "rgb(255,255,0)";
		context.font = "24px Helvetica";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("Pikachus caught: " + pikachusCaught, 32, 32); // Account for the 32x32 Pikachu img

		check();
    }

    // Check to see it the Pokéball is touching the Pikachu :D
    function check() {
		if (
			cX <= (pikachu.x + 32)
			&& pikachu.x <= (cX + 32)
			&& cY <= (pikachu.y + 32)
			&& pikachu.y <= (cY + 32)
		){
			pikachusCaught++;
			randomPika();
		}
	}


    function randomPika() {
    	pikachu.x = 32 + (Math.random() * (canvas.width - 64));
		pikachu.y = 32 + (Math.random() * (canvas.height - 64));
    }
};