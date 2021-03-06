<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<title><?php if(isset($page_title)) echo $page_title ; ?> &mdash; yaomi</title>
	<base href="<?php echo base_url() ; ?>" />
	<meta name="description" content="">  
	<meta name="viewport" content="initial-scale=1.0">
	<link rel="stylesheet" href="assets/css/style.css">
	<script src="assets/js/vendors/modernizr-2.5.3.min.js"></script>
</head>
<body class="page-<?php echo $this->session->userdata('page'); ?> <?php echo implode($this->body_class, ' ') ; ?>">
	<div class="page">
		<div class="wrapper">
			<header class="main-header">
				<div class="inner-wrapper">
					<div class="title">
						<div class="logo">
							<img src="assets/img/yaomi.png" height="85" width="90" alt="yaomi" />
						</div>
						<h1 class="main-title">
							<a href="<?php echo site_url() ; ?>">Yet An Otter <span class="mtg">Magic</span> Inventory</a>
						</h1>
						<div class="main-subtitle">Pour classer vos cartes <span class="mtg">Magic: the Gathering</span>, une loutre à la fois</div>
					</div>
				<div class="actions">
				<?php if(!$this->is_logged) : ?>
					<a class="login-link" href="<?php echo site_url('login') ; ?>">Connexion</a> |
					<a class="register-link" href="<?php echo site_url('register') ; ?>">Inscription</a>
				<?php else : ?>
					<a class="settings-link" href="<?php echo site_url('settings') ; ?>"><?php echo $this->session->userdata('user_name'); ?></a> |
					<a class="logout-link" href="<?php echo site_url('logout') ; ?>">Déconnexion</a>
				<?php endif ; ?>
				</div>
				<nav class="main-nav">
					<ul class="main-nav-menu">
						<li class="main-nav-elt"><a class="home-link" href="<?php echo site_url('') ; ?>">Accueil</a></li>
						<li class="main-nav-elt"><a  href="<?php echo site_url('set') ; ?>">Extensions</a></li>
						<?php if($this->is_logged) : ?>
						<li class="main-nav-elt"><a class="collection-link" href="<?php echo site_url('collection') ; ?>">Ma collection</a></li>
						<?php endif ; ?>
						<li class="main-nav-elt">
							<div class="search">
								<form method="get" action="<?php echo site_url('card/search'); ?>">
									<label for="term" class="search-label">Rechercher une carte : </label>
									<input name="term" id="term" type="text" placeholder="Rechercher une carte" />
									<button type="submit" aria-label="Envoyer" class="search-submit"><span>Envoyer</span></button>
								</form>
							</div>
						</li>
					</ul>
				</nav>
		        
		    </div>
			</header>
			<div role="main" class="main-content">
		    	<div class="inner-wrapper">
		    		<?php if(isset($content)) echo $content ; ?>
				</div>
			</div>
		</div>
		<footer class="main-footer">
			<div class="inner-wrapper">
				<a href="<?php echo site_url('credits') ; ?>">Crédits</a>
				<a href="<?php echo site_url('about') ; ?>">À propos</a>
			</div>
		</footer>
		</div>
		<div id="loader" class="loader" aria-hidden="true">
	</div>

	<script src="assets/js/vendors/jquery-1.10.0.min.js"></script>
	<script src="assets/js/vendors/jquery.details.min.js"></script>
	<script src="assets/js/vendors/lazyLoad.min.js"></script>
	<script src="assets/js/vendors/number-polyfill.min.js"></script>
	<script src="assets/js/plugins.js"></script>
	<script src="assets/js/script.js"></script>

</body>
</html>