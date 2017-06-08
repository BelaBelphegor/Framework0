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
					if (game.run !== undefined)
						game.run(interval);
					this.engine.inputter.update();
				});
		this.ticker.start();
	}
}
