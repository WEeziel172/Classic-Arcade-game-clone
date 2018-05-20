const modal = document.querySelector(".modal");
// Enemies our player must avoid

var play_again = document.getElementById("start");

play_again.onclick = function() {
    modal.style.display = "none";
}
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

var Gems = function (x, y, speed) {
	
	this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
	
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x = this.x + this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.
    //check for collision. If collided return to starting point
    if (((this.y > player.y) && (this.y < player.y + 30)) && ((this.x > player.x - 60) && (this.x < player.x + 50))) {
        player.x = 200;
        player.y = 545;
    }
    if (this.x >= 505) {
		var rand = xEnemyPositions[Math.floor(Math.random() * xEnemyPositions.length)]; // After the bug has passed the canvas, it's x coordinate will be randomised, meaning it can spawn on a different row
		this.speed = Math.floor(Math.random() * 300) + 50; // For added difficulty, the enemy speed is randomised each time it passes the canvas
		
        this.x = -100; // Set it to -100, so it seems as it were coming off canvas into the canvas
		this.y = rand;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.x = 200;
        this.y = 380;
		
		modal.style.display = "block";
    }
    if (this.y > 545) {
        this.y = 545;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= 100;
    }
    if (keyPress == 'right') {
        this.x += 100;
    }
    if (keyPress == 'up') {
        this.y -= 83;
    }
    if (keyPress == 'down') {
        this.y += 83;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//input


var allEnemies = [
	new Enemy(-100, 60, 100),
	new Enemy(-100, 145, 80),
	new Enemy(-100, 230, 50),
	new Enemy(-100, 145, 200),
	new Enemy(-100, 60, 150),
	new Enemy(-100, 60, 310),
	new Enemy(-100, 60, 390),
	new Enemy(-100, 60, 390)	
	];
	
var xEnemyPositions = [60, 145, 230, 310, 390]; // Holds in all the possible Y coordinate positions for the enemy bugs

var player = new Player(200, 545, 50);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});