var Inputter = function()
{
	var self = this;
	this.keyDownState = {};
	this.keyPressedState = {};
}

Inputter.prototype = 
{
	update: function()
	{
		for (var i in this.keyPressedState)
		{
			if (this.keyPressedState[i] === true)
				this.keyPressedState[i] = false;
		}
	},

	onKeyDown: function(e)
	{
		this.keyDownState[e.keyCode] = true;
		if (this.keyPressedState[e.keyCode] === undefined)
			this.keyPressedState[e.keyCode] = true;
	},

	onKeyUp: function(e)
	{
		this.keyDownState[e.keyCode] = false;
		if (this.keyPressedState[e.keyCode] === false)
			this.keyPressedState[e.keyCode] = undefined;
	},

	isDown: function(keycode)
	{
		return this.keyDownState[keycode] || false;
	},

	isPressed: function(keycode)
	{
		return this.keyPressedState[keycode] || false;
	}
};

var Collider = function()
{
	this.collide = function(a, b)
	{
		if (a === undefined || b === undefined)
			return (false);
		if ((a.x >= b.x + b.width) ||
			   	(a.x + a.width <= b.x) ||
					(a.y >= b.y + b.height) ||
				   		(a.y + a.height <= b.y))
			return (false);
		return (true);
	}
}

var Renderer = function(canvas, ctx)
{
	this.canvas = canvas;
	this.ctx = ctx;
	this.width = canvas.width;
	this.height = canvas.height;
}

Renderer.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.width, this.height);
}

Renderer.prototype.render = function(object)
{
	object.draw(this.ctx);
}

var Ennemy = function(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 2;
	this.vector_x = 0;
	this.vector_y = 1;
	this.width = 25;
	this.height = 25;
	this.damage = 1;

	this.update = function()
	{
		this.x += this.speed * this.vector_x;
		this.y += this.speed * this.vector_y;
	}

	this.draw = function(ctx)
	{
		ctx.fillStyle = '#45A';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.shoot = function(game)
	{
		let laser = new Laser(this.x + this.width / 2, this.y + this.height + 1);
		laser.vector_x = this.vector_x;
		laser.vector_y = this.vector_y;
		laser.speed = 3;
		laser.color = "#F00";
		game.entities.push(laser);
		laser = undefined;
	}
}

var Laser = function(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 3;
	this.vector_x = 0;
	this.vector_y = -1;
	this.width = 3;
	this.height = 15;
	this.damage = 2;
	this.color = '#88F';

	this.update = function()
	{
		this.x += this.speed * this.vector_x;
		this.y += this.speed * this.vector_y;
	}

	this.draw = function(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var Ship = function()
{
	this.x = 200;
	this.y = 200;
	this.height = 50;
	this.width = 25;
	this.healthpoint = 3;

	this.setPosition = function(x, y)
	{
		this.x = x;
		this.y = y;
	}

	this.draw = function(ctx)
	{
		ctx.fillStyle = '#0f0';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var UI = function(player)
{
	this.player = player;

	this.draw = function(ctx)
	{
		for (var i = 0; i < this.player.healthpoint; i++)
		{
			ctx.fillStyle = '#ff0000';
			ctx.beginPath();
			ctx.arc(20 + 25 * i, 20, 10, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}
}

var Game = function(canvas, context)
{
	this.canvas = canvas;
	this.ctx = context;
	this.renderer = new Renderer(this.canvas, this.ctx);
	this.inputter = new Inputter();
	this.collider = new Collider();
	this.player = new Ship();
	this.UI = new UI(this.player);
	this.entities = [];
	this.frames = 0;

	this.removeEntity = function(index)
	{
		var sliced = this.entities.slice(index + 1 || this.length);
		this.entities.length = index < 0 ? this.length + index : index;
		this.entities.push.apply(this.entities, sliced);
	}
}

Game.prototype.initialisation = function()
{
	document.addEventListener("keydown", this.inputter.onKeyDown.bind(this.inputter), false);
	document.addEventListener("keyup", this.inputter.onKeyUp.bind(this.inputter), false);	
	this.player.setPosition((this.canvas.width - this.player.width) / 2, this.canvas.height - this.player.height - 10);
	setInterval(this.run.bind(this), 1000 / 60);
}

Game.prototype.update = function()
{
	var timeSinceLastShoot = this.frames % 60;

	if (this.inputter.isDown(39) === true &&
			this.player.x + this.player.width < this.canvas.width)
		this.player.setPosition(this.player.x + 5, this.player.y);
	if (this.inputter.isDown(37) === true && this.player.x > 0)
		this.player.setPosition(this.player.x - 5, this.player.y);
	if (this.inputter.isPressed(32))
	{
		// Adding Laser Entity on list (two lasers become is better than one.).
		this.entities.push(new Laser(this.player.x, this.player.y - 15));
		this.entities.push(new Laser(this.player.x + this.player.width - 10, this.player.y - 15));
	}
	// Adding new Ennemy.
	if ((this.frames % 60) == 0)
		this.entities.push(new Ennemy((25 + Math.random() * this.canvas.width - 25), 0));
	// Collide
	for (var i = 0; i < this.entities.length; i++)
	{
		// Ennemy shooting
		if ((i % 3) == 0 && this.entities[i] instanceof Ennemy && timeSinceLastShoot == 0)
			this.entities[i].shoot(this);
		for (var j = 0; j < this.entities.length; j++)
		{
			if (this.entities[i] !== this.entities[j])
			{	
				if (this.collider.collide(this.entities[j], this.entities[i]))
				{
					this.removeEntity(j);
					this.removeEntity(i);
					break;
				}
			}
		}
		if (this.collider.collide(this.entities[i], this.player))
		{
			this.removeEntity(i);
			this.player.healthpoint--;
		}
	}
	for (var i = 0; i < this.entities.length; i++)
	{	
		this.entities[i].update();
		if (this.entities[i].x < 0 || this.entities[i].x > this.canvas.width || this.entities[i].y < 0 || this.entities[i] > this.canvas.height)
			this.removeEntity[i];
	}
	console.log(timeSinceLastShoot);
	this.frames++;
}

Game.prototype.run = function()
{
	if (this.player.healthpoint > 0)
	{
		this.renderer.clear();
		this.update();
		this.renderer.render(this.player);
		for (var i = 0; i < this.entities.length; i++)
			this.renderer.render(this.entities[i]);
		this.renderer.render(this.UI);
		this.inputter.update();
	}
	else
	{
		this.ctx.fillStyle= "#000";
		this.ctx.font="18px Arial";
		this.ctx.fillText("Press 'space' to replay !", this.canvas.width / 2 - 80, this.canvas.height / 2);
		if (this.inputter.isPressed(32))
			this.reset();
	}
}

Game.prototype.reset = function()
{
	this.player.x = (this.canvas.width + this.player.width) / 2;
	this.player.y = this.canvas.height - this.player.height - 10;
	this.player.healthpoint = 3;
	this.frames = 0;
	this.entities = [];
}

window.onload = function()
{
	var canvas = document.getElementById('federation-game');

	if (!canvas)
	{
		console.log("Unable to get canvas html element.");
		return ;
	}
	var ctx = canvas.getContext('2d');
	if (!ctx)
	{
		console.log("Unable to get ctx html element.");
		return ;
	}
	var game = new Game(canvas, ctx);
	game.initialisation();
}
