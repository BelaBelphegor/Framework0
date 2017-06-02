class Collider
{
	collide(a, b)
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

