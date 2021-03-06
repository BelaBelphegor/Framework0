<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    index.php                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/14 21:36:45 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/14 22:12:35 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'lib/limonade.php';

spl_autoload_register(function($name)
	{
		$directorys = array('managers/',
			'controllers/',
			'vendors/',
			'models');
		foreach ($directorys as $directory)
		{
			if (file_exists($directory . $name . '.php'))
			{
				require_once($directory . $name . '.php');
				return ;
			}
		}
	});

session_start();

function configure()
{
	$localhost = preg_match('/^localhost(:d)?/', $_SERVER['HTTP_HOST']);
	$env = $localhost ? ENV_DEVELOPMENT : ENV_PRODUCTION;
	option('env', $env);
	option('base_uri', '/');
	setlocale(LC_TIME, "fr_FR");
};

function before()
{
	layout('layouts/default_layout.php');
};

dispatch('/', array('LandController', 'executeIndex'));
dispatch('/contact', array('ContactController', 'executeIndex'));
dispatch('/media', array('MediaController', 'executeIndex'));
dispatch('/game', array('GameController', 'executeIndex'));
run();
?>
