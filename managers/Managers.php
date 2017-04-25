<?php
class Managers
{
	protected $api = null;
	protected $dao = null;
	protected $managers = [];

	public function __construct($api, $dao)
	{
		$this->api = $api;
		$this->dao = $dao;
	}

	public function getManagerOf($module)
	{
		if (!is_string($module) || empty($module))
			throw new InvalidArgumentException('Invalid module specification on Managers::GetManagerOf.');
		if (!isset($this->managers[$module]))
		{
			$manager = $this->api . ucfirst($module) . 'Manager';
			try
			{
				$this->managers[$module] = new $manager($this->dao);
			} catch (Exception $e)
			{
				throw new RuntimeException("Module: " . $name . " appear to not exists on Managers::getManagerOf");
			}
		}
	}
}
?>
