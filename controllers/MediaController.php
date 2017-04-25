<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    MediaController.php                                :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/18 16:37:20 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/18 16:37:31 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

class MediaController
{
	static public function executeIndex()
	{
		return (html('media/show.html.php'));
	}
}
?>
