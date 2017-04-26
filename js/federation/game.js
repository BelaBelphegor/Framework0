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

	var	x = canvas.width / 2;
	var y = canvas.height / 2;

	function drawBall(x, y)
	{
		ctx.beginPath();
		ctx.arc(50, 50, 10, 0, Math.PI*2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}

	function render()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall(x, y);
		alert("js");
	//	x++;
	//	y++;
	}
	setInterval(render, 1000 / 60);
}
