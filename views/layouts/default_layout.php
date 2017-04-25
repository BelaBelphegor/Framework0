<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE-edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="tiboitel@student.42.fr">
		<title>Federation</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/full-pix-width.css" rel="stylesheet">
		<link href="css/album.css" rel="stylesheet">
		<!-- <link href="css/federation.css" rel="stylesheet"> -->
	</head>
	<body>
		<header>
			<div class="container">
				<nav class="navbar navbar-inverse">
						<div class="container-fluid">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">...</button>
								<a class="navbar-brand" href="<?=url_for('/');?>">Federation</a>
							</div>
							<div id="navbar" class="navbar-collapse collapse">
								<ul class="nav navbar-nav navbar-right">
									<li class="active">
									<a href="<?=url_for('/');?>">ACCUEIL</a>
									</li>
									<li>
									<a href="<?=url_for('game');?>">JEU</a>
									</li>
									<li>
									<a href="<?=url_for('contact');?>">CONTACT</a>
									</li>
									<li>
									<a href="<?=url_for('media');?>">MEDIA</a>
									</li>
									<li>
									<a href="<?=url_for('account');?>">MON COMPTE</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
		<div class="container">
			<?= $content ?>
		</div>
		<footer class="footer">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-12 com-lg-12">
						<hr>
						<p>2017 Federation, Inc.</p>
					</div>
				</div>
			</div>
		</footer>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
	</body>
</html>
