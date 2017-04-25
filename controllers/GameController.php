<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    GameController.php                                 :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/25 22:55:26 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/25 22:55:26 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

class GameController
{
	static public function executeIndex()
	{
		return (html('game/show.html.php'));
	}
}
?>
