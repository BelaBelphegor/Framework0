<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    AccountController.php                              :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/18 19:10:23 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/18 19:10:23 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

class AccountController
{
	static public function	executeIndex()
	{
		return (html('account/signin.html.php'));
	}
}
?>
