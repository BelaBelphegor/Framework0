<section>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<h1 class="section-heading">
					Contact us.
				</h1>
				<p class="lead section-lead">
					Vous avez une question ou voulez-vous juste entrer en contact ? Envoyez un message.
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<form name="sentMessage" id="contactForm" novalidatE>
					<div class="control-group form-group">
						<div class="controls">
							<label>Nom complet</label>
							<input type="text" class="form-control" id="name" required data-validation-required-message="Entrez votre nom et prenom" aria-invalid="false">
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group form-group">
						<div class="controls">
							<label>Telephone</label>
							<input type="text" class="form-control" id="phone" required data-validation-required-message="Entrez votre numero de telephone." aria-invalid="false">
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group form-group">
						<div class="controls">
							<label>E-Mail</label>
							<input type="text" class="form-control" id="email" require-data-validation-required-message="Entrez votre adresse email." aria-invalid="false">
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group form-group">
						<div class="controls">
							<label>Message</label>
							<textarea rows="10" cols="100" maxlength="999" class="form-control" id="message" style="resize:none" require-data-validation-required-message="Entrez votre nom et prenom" aria-invalid="false"></textarea>
							<p class="help-block"></p>
						</div>
					</div>
					<div id="success"></div>
					<button type="submit" class="btn btn-default">Envoyer</button>
				</form>
			</div>
		</div>
	</div>
<section>
