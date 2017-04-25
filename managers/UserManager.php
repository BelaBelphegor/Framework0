<?php
abstract class UserManager extends AbstractManager
{
	abstract public function add($user);
	abstract public function get($start = -1, $limit = -1);
	abstract public function getById($id);
	abstract public function update($id, $user);
	abstract public function delete($id);
	abstract public function count();
}
?>
