var Starfield = function()
{
	this.background = new Image();
	this.background.src = "/framework0/img/starfield.jpg";
	this.x = 0;
	this.y = 0;
	this.width = 960;
	this.height = 640;
	this.speed = 1;
	this.stepy = -this.height;

	this.update = function()
	{
		if (this.y >= this.height)
			this.y = -this.height;
		if (this.stepy >= this.height)
			this.stepy = -this.height;
		this.stepy += this.speed;
		this.y += this.speed;
	}

	this.draw = function(ctx)
	{
		ctx.drawImage(this.background, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.background, this.x, this.stepy, this.width, this.height);
	}
}

var Ennemy = function(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 3;
	this.vector_x = 0;
	this.vector_y = 1;
	this.width = 64;
	this.height = 64;
	this.damage = 1;
	this.sprite = new Image();
	this.sprite.src = "/framework0/img/bad_guy_spaceship.png";


	this.update = function()
	{
		this.x += this.speed * this.vector_x;
		this.y += this.speed * this.vector_y;
	}

	this.draw = function(ctx)
	{
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}

	this.shoot = function(game)
	{
		let laser = new Laser(this.x + this.width / 2, this.y + this.height + 10);
		laser.vector_x = this.vector_x;
		laser.vector_y = this.vector_y;
		laser.speed = 6;
		laser.color = "#8D8B2F";
		game.entities.push(laser);
		laser = undefined;
	}
}

var Laser = function(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 5;
	this.vector_x = 0;
	this.vector_y = -1;
	this.width = 3;
	this.height = 15;
	this.damage = 2;
	this.color = '#D8422B';

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
	this.height = 64;
	this.width = 64;
	this.healthpoint = 3;
	this.speed = 4;
	this.experience = 0;
	this.experience_next_level = 1000;
	this.level = 1;
	this.skillpoint = 0;
	this.sprite = new Image();
	this.sprite.src = "/framework0/img/spaceship_sprite.png";

	this.setPosition = function(x, y)
	{
		this.x = x;
		this.y = y;
	}

	this.draw = function(ctx)
	{
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}
}

var UI = function(player)
{
	this.player = player;
	this.sprite = new Image();
	this.sprite.src = "/framework0/img/spaceship_sprite.png";

	this.draw = function(ctx)
	{
		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'white';
		for (let i = 0; i < this.player.healthpoint; i++)
		{
			ctx.drawImage(this.sprite, 20 + 25 * i, 20, 16, 16);
		}
		ctx.fillText("Experience: " + this.player.experience, 20 + 25 * this.player.healthpoint, 30);
		ctx.fillText("You have (" + this.player.skillpoint + ") skill point to use press C to open spaceship interface !", 20, 50);
	}
}

var Game = function(canvas, context)
{
	this.canvas = canvas;
	this.ctx = context;
	this.engine = new Engine(this, 'federation-game');
	this.player = new Ship();
	this.UI = new UI(this.player);
	this.entities = [];
	this.frames = 0;
	this.starfield = new Starfield();

	this.removeEntity = function(index)
	{
		let sliced = this.entities.slice(index + 1 || this.length);
		this.entities.length = index < 0 ? this.length + index : index;
		this.entities.push.apply(this.entities, sliced);
	}
}

Game.prototype.initialisation = function()
{
	document.addEventListener("keydown", this.engine.inputter.onKeyDown.bind(this.engine.inputter), false);
	document.addEventListener("keyup", this.engine.inputter.onKeyUp.bind(this.engine.inputter), false);
	document.getElementById('federation-game').focus();
	this.player.setPosition((this.canvas.width - this.player.width) / 2, this.canvas.height - this.player.height - 10);
}

Game.prototype.update = function(interval)
{
	let timeSinceLastShoot = this.frames % 60;

	this.starfield.update();	
	if (this.engine.inputter.isDown(39) === true &&
			this.player.x + this.player.width < this.canvas.width)
		this.player.setPosition(this.player.x + this.player.speed, this.player.y);
	if (this.engine.inputter.isDown(37) === true && this.player.x > 0)
		this.player.setPosition(this.player.x - this.player.speed, this.player.y);
	if (this.engine.inputter.isPressed(32))
	{
		// Adding Laser Entity on list (two lasers become is better than one.).
		this.entities.push(new Laser(this.player.x + 16, this.player.y - 15));
		this.entities.push(new Laser(this.player.x + this.player.width - 19, this.player.y - 15));
	}
	// Adding new Ennemy.
	if ((this.frames % 30) == 0)
		this.entities.push(new Ennemy((25 + Math.random() * this.canvas.width - 80), 0));
	// Collide
	for (let i = 0; i < this.entities.length; i++)
	{
		// Ennemy shooting
		if ((i % 3) == 0 && this.entities[i] instanceof Ennemy && timeSinceLastShoot == 0)
			this.entities[i].shoot(this);
		for (let j = 0; j < this.entities.length; j++)
		{
			if (this.entities[i] !== this.entities[j])
			{	
				if (this.engine.collider.collide(this.entities[j], this.entities[i]))
				{
					this.removeEntity(j);
					this.removeEntity(i);
					this.player.experience += 20;
				}
			}
		}
		if (this.entities[i] != undefined && this.engine.collider.collide(this.entities[i], this.player))
		{
			this.removeEntity(i);
			this.player.healthpoint--;
		}
	}
	for (let i = 0; i < this.entities.length; i++)
	{	
		this.entities[i].update();
		if (this.entities[i].x < 0 || this.entities[i].x > this.canvas.width || this.entities[i].y < 0 || this.entities[i].y > this.canvas.height)
			this.removeEntity(i);
	}
	/*
	 **
	 ** Level up.
	 */
	if (this.player.experience >= this.player.experience_next_level)
	{
		this.player.experience = 0;
		this.player.experience *= 1.5;
		this.player.level++;
		this.player.healthpoint++;
		this.player.skillpoint++;
	}
	this.frames++;
}

Game.prototype.run = function(interval)
{
	if (this.player.healthpoint > 0)
	{
		this.engine.renderer.clear();
		this.update();
		this.engine.renderer.render(this.starfield);
		for (var i = 0; i < this.entities.length; i++)
			this.engine.renderer.render(this.entities[i]);
		this.engine.renderer.render(this.UI);
		this.engine.renderer.render(this.player);
	}
	else
	{
		this.ctx.fillStyle= "#FFF";
		this.ctx.font="18px Arial";
		this.ctx.fillText("Press 'space' to replay !", this.canvas.width / 2 - 80, this.canvas.height / 2);
		if (this.engine.inputter.isPressed(32))
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
	let canvas = document.getElementById('federation-game');;
	if (!canvas)
	{
		console.log("Unable to get canvas html element.");
		return ;
	}
	let ctx = canvas.getContext('2d');
	if (!ctx)
	{
		console.log("Unable to get ctx html element.");
		return ;
	}
	let  game = new Game(canvas, ctx);
	game.initialisation();
}
