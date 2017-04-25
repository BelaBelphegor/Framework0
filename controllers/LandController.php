<?
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    LandController.php                                 :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/14 22:06:49 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/14 22:06:49 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

class LandController
{
	static public function executeIndex()
	{
		return (html('landpage/show.html.php'));
	}
}
?>
