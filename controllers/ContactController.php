<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    ContactController.php                              :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/15 16:18:15 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/15 16:18:15 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

class ContactController
{
	static public function executeIndex()
	{
		return (html('contact/show.html.php'));
	}
}
?>
