<?php
class UserModel
{
	public function getAttribute($attr)
	{
		return (isset($_SESSION[$attr]) ? $_SESSION[$attr] : NULL);
	}

	public function setAttribute($attr, $value)
	{
		$_SESSION[$attr] = $value;
	}

	public function hasFlash()
	{
		return (isset($_SESSION['flash']));
	}

	public function getFlash()
	{
		$flash = $_SESSION['flash'];
		unset($_SESSION['flash']);
		return ($flash);
	}

	public function setFlash($value)
	{
		$_SESSION['flash'] = $value;
	}

	public function isAuthenticated()
	{
		return (isset($_SESSION['auth']) && $_SESSION['auth'] === true);
	}

	public function setAuthenticated($authenticated = true)
	{
		if (!is_bool($authenticated))
			throw new InvalidArgumentException('Value specifiated at UserModel::setAuthenticated must be a boolean.');
		$_SESSION['auth'] = $authenticated;
	}
}
?>
