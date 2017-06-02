class Engine
{
	constructor(game, canvasId)
	{
		let canvas = document.getElementById(canvasId);
		let ctx = canvas.getContext('2d');
		this.renderer = new Renderer(canvas, ctx);
		this.inputter = new Inputter();
		this.collider = new Collider();
		this.ticker = new Ticker(this, function(interval) {
					if (game.update !== undefined)
						game.update(interval);
				});
		this.ticker.start();
	}
}
