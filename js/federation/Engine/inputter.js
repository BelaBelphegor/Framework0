class Inputter
{
	constructor()
	{
		this.keyDownState = {};
		this.keyPressedState = {};
	}

	update()
	{
		for (let i in this.keyPressedState)
		{
			if (this.keyPressedState[i] === true)
				this.keyPressedState[i] = false;
		}
	}

	onKeyDown(e)
	{
		this.keyDownState[e.keyCode] = true;
		if (this.keyPressedState[e.keyCode] === undefined)
			this.keyPressedState[e.keyCode] = true;
	}

	onKeyUp(e)
	{
		this.keyDownState[e.keyCode] = false;
		if (this.keyPressedState[e.keyCode] === false)
			this.keyPressedState[e.keyCode] = undefined;
	}

	isDown(keycode)
	{
		return this.keyDownState[keycode] || false;
	}

	isPressed(keycode)
	{
		return this.keyPressedState[keycode] || false;
	}
}
