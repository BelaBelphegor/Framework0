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

var Laser = function(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 3;
	this.vector_x = 0;
	this.vector_y = -1;
	this.width = 3;
	this.height = 15;

	this.update = function()
	{
		this.x += this.speed * this.vector_x;
		this.y += this.speed * this.vector_y;
	}

	this.draw = function(ctx)
	{
		ctx.fillStyle = '#88F';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var Ship = function()
{
	this.x = 200;
	this.y = 200;
	this.height = 50;
	this.width = 25;
	
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

var Game = function(canvas, context)
{
	this.canvas = canvas;
	this.ctx = context;
	this.renderer = new Renderer(this.canvas, this.ctx);
	this.inputter = new Inputter();
	this.player = new Ship();
	this.entities = [];
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
	if (this.entities.length > 0)
		console.log(this.entities);
	if (this.inputter.isDown(39) === true &&
			this.player.x + this.player.width < this.canvas.width)
		this.player.setPosition(this.player.x + 5, this.player.y);
	if (this.inputter.isDown(37) === true && this.player.x > 0)
		this.player.setPosition(this.player.x - 5, this.player.y);
	if (this.inputter.isPressed(32))
	{
		this.entities.push(new Laser(this.player.x, this.player.y - 10));
		this.entities.push(new Laser(this.player.x + this.player.width - 5, this.player.y - 10));
	}
	for (var i = 0; i < this.entities.length; i++)
	{
		this.entities[i].update();
		if (this.entities[i].x < 0 || this.entities[i].x > this.canvas.width || this.entities[i].y < 0 || this.entities[i] > this.canvas.height)
		{
			// Remove an entity. On this case, remove un Entity when she goes
			// out of the screen.
			var sliced = this.entities.slice(i + 1 || this.length);
			this.entities.length = i < 0 ? this.length + i : i;
			this.entities.push.apply(this.entities, sliced);
		}
	}
}

Game.prototype.run = function()
{
	this.renderer.clear();
	this.update();
	this.renderer.render(this.player);
	for (var i = 0; i < this.entities.length; i++)
		this.renderer.render(this.entities[i]);
	this.inputter.update();
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
