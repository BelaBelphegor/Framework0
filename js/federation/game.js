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
	ctx.fillRect(100, 100, 100, 100);
}
