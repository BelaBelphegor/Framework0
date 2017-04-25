<?php
abstract class AbstractManager
{
	protected $_dao;

	public function __construct($dao)
	{
		$this->_dao = $dao;
	}
}
?>
