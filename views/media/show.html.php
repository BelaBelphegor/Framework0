<?php
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    show.html.php                                      :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tiboitel <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2017/04/18 16:39:43 by tiboitel          #+#    #+#              #
#    Updated: 2017/04/18 16:39:43 by tiboitel         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
?>
<section class="jumboton text-center">
	<div class="container">
		<h1 class="jumbotron-heading">
			Media	
		</h1>
		<p class="lead text-muted">
			Lorem ipsus die irae alesias sanctum des spiritus sanctae.
		</p>
	</div>
</section>
<aside class="image-bg-fluid-height"></aside>
<div class="album text-muted">
	<div class="container">
		<div class="row">
			<?php for ($i = 0; $i < 9; $i++): ?>
			<div class="card">
				<img data-src="" alt="100%x280" style="height: 280px; width: 90%; display:block;" src="">
				<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
			</div>
			<?php endfor; ?>
		</div>
	</div>
</div>
