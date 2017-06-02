class Ticker
{
	start()
	{
		let previous = Date.now();
		let tick = function()
		{
			let now = Date.now();
			let elapsed = now - previous;
			previous = now;
			this.engine.ticker.gameLoop(elapsed);
			requestAnimationFrame(this.nextTickFunction);
		}.bind(this);
		this.nextTickFunction = tick;
		requestAnimationFrame(this.nextTickFunction);
	}

	stop()
	{
		nextTickFunction = function() 
		{
		};	
	}	

	// From: https://gist.github.com/paulirish/1579671
	setupRequestAnimationFrame()
	{
		let lastTime = 0;
		let vendors = ['ms', 'moz', 'webkit', 'o'];
		for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				let currTime = Date.now();
				let timeToCall = Math.max(0, interval - (currTime - lastTime));
				let id = window.setTimeout(function() { callback(currTime + timeToCall); },
						timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	}

	constructor(engine, gameLoop)
	{
		this.engine = engine;
		this.interval = 16;
		this.nextTickFunction;
		this.gameLoop = gameLoop;
		this.setupRequestAnimationFrame();
	}
}
