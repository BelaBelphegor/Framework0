class Renderer
{
	constructor(canvas, ctx)
	{
		this.canvas = canvas;
		this.ctx = ctx;
		this.width = canvas.width;
		this.height = canvas.height;
	}

	clear()
	{
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	render(object)
	{
		object.draw(this.ctx);
	}
}

