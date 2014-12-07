<!DOCTYPE html>
<html lang="<?php echo get_html_lang(); ?>">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php if ( $description = option('description')): ?>
        <meta name="description" content="<?php echo $description; ?>" />
    <?php endif; ?>
   <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,400italic,500,500italic,700,700italic,900,900italic,300italic' rel='stylesheet' type='text/css'>
    
    <!-- Will build the page <title> -->
    <?php
        if (isset($title)) { $titleParts[] = strip_formatting($title); }
        $titleParts[] = option('site_title');
    ?>
    <title><?php echo implode(' &middot; ', $titleParts); ?></title>
    <?php echo auto_discovery_link_tags(); ?>

    <!-- Will fire plugins that need to include their own files in <head> -->
    <?php fire_plugin_hook('public_head', array('view'=>$this)); ?>
    <!-- Need to add custom and third-party CSS files? Include them here -->
    <?php 
        queue_css_file('lib/bootstrap');
        queue_css_file('lib/jquery.bxslider');
        queue_css_file('lib/lightbox');
        queue_css_file('lib/style');
        queue_css_file('lib/normalize');
        queue_css_file('lib/font-awesome');
        //queue_css_file('lib/screen');
        echo head_css();
    ?>
    <!-- Need more JavaScript files? Include them here -->
    <?php 
        queue_js_file('lib/jquery.min');
        queue_js_file('lib/scripts');
        queue_js_file('lib/jquery-1.11.1');
        queue_js_file('lib/jquery.bxslider');
        queue_js_file('lib/bootstrap');
        queue_js_file('lib/lightbox');
        queue_js_file('globals');
        echo head_js(); 
    ?>
   
    <script>
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-2196019-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    </script>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<?php echo body_tag(array('id' => @$bodyid, 'class' => @$bodyclass)); ?>
<?php fire_plugin_hook('public_body', array('view'=>$this)); ?>
<!-- CABEÇALHO -->
<div class="container-fluid">
    <header class="row">
        <div class="col-md-12">
            <div class="row" style="background-color: #E45F56">
                    <div id="rede" class="col-md-5 col-md-offset-1">
                        <ul class="nav nav-pills" role="social-icons">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                            <!--<li><a href="#"><i class="fa fa-youtube"></i></a></li>-->
                            <!--<li><a href="#"><i class="fa fa-instagram"></i></a></li>-->
                            <li><a href="http://mapa.revoada.net.br/contact"><i class="fa fa-envelope"></i></a></li>
                        </ul>
                    </div>
                    <div class="col-md-5">
                        <div class="navbar-form navbar-right" role="form">
                            <div class="form-group">
                                <div class="input-group">
                                    <?php echo search_form(array( 'show_advanced' => false )); ?>
                                </div>
                            </div> 
                        </div>                               
                    </div>
                    <div class="col-md-1">
                        &nbsp;
                    </div>
                </div>

                <!--logo do tema -->
                <div class="row" style="background-color: #4AAAA5; display: flex; align-items: flex-end">
                    <div  id="logo" class="col-md-4 col-md-offset-1">
                        <?php echo link_to_home_page('View Public Site', array('id'=>'public-link','class'=>'img-responsive')); ?><!--<img src="<?php echo img('logo.png'); ?>" /></a>-->
                    </div>
                <!--Fim do logo do tema -->
                <!--Menu do topo -->
                    <div class="col-md-7 hidden-xs">
                       <div id="nav" class="nav nav-pills pull-right hidden-xs" role="menu">
                        <?php echo public_nav_main(); ?>   
                       </div>   
                    </div>
                <!--Fim do Menu do topo -->
                </div>
            <div class="row" style="background-color: #4AAAA5;">
                <!--Menu para celulares -->
                <div class="col-xs-12 hidden-md hidden-sm hidden-lg">
                    <nav class="clearfix">
                        <ul class="clearfix">
                            <?php echo public_nav_main(); ?>   
                        </ul>
                        <a href="#" id="pull">Menu</a>
                    </nav>
                </div>
            </div>
                <!--Fim do menu para celulares-->
        </div>
    </header>
</div>
            <!-- /CABEÇALHO -->      
    <div class="container-fluid">
        <?php fire_plugin_hook('public_content_top', array('view'=>$this)); ?>
