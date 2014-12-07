<?php echo head(array('bodyid'=>'home')); ?>
<!-- SLIDE -->
<div class="row" role="slider">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
            <li data-target="#carousel-example-generic" data-slide-to="4"></li>
            <li data-target="#carousel-example-generic" data-slide-to="5"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="http://lorempixel.com/1600/360/city/1" alt="" class="img-responsive"/>
                <div class="carousel-caption">
                    <h3>Lorem ipsum.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, vitae.</p>
                </div>
            </div>
            <div class="item">
                <img src="http://lorempixel.com/1600/360/city/7" alt="" class="img-responsive"/>
                <div class="carousel-caption">
                    <h3>Libero, architecto.</h3>
                    <p>Modi, repellat dolore in ea commodi mollitia est deserunt sint.</p>
                </div>
                </div>
                <div class="item">
                    <img src="http://lorempixel.com/1600/360/city/3" alt="" class="img-responsive"/>
                    <div class="carousel-caption">
                        <h3>Obcaecati, veritatis!</h3>
                        <p>Delectus repudiandae reiciendis obcaecati autem quam praesentium et magnam nostrum.</p>
                    </div>
                </div>
                <div class="item">
                    <img src="http://lorempixel.com/1600/360/city/4" alt="" class="img-responsive">
                    <div class="carousel-caption">
                        <h3>Consequatur, nam!</h3>
                        <p>Asperiores, laudantium, commodi debitis accusantium praesentium dolor illo assumenda hic!</p>
                    </div>
                </div>
                <div class="item">
                    <img src="http://lorempixel.com/1600/360/city/5" alt="" class="img-responsive">
                    <div class="carousel-caption">
                        <h3>Necessitatibus, blanditiis!</h3>
                        <p>Laborum, dignissimos molestias nam rem quas explicabo est magni reprehenderit.</p>
                    </div>
                </div> 
                <div class="item">
                    <img src="http://lorempixel.com/1600/360/city/6" alt="" class="img-responsive">
                    <div class="carousel-caption">
                        <h3>Cum, quos!</h3>
                        <p>Sapiente, reprehenderit, id sint iure numquam illo odit. Soluta, ducimus!</p>
                    </div>
                </div>                        
            </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
    </div>                
</div>
</div>
 <!-- /SLIDE -->
<!-- Inicio Conteúdo central -->
<div class="container-fluid">
    <div class="row toggle_bar">
         <div class="col-sm-6" id="toggle_class">
            <button type="button" class="btn btn-link" onclick="Mudarestado('MaisRecentes')">Mais Recentes</button>
        </div>
        <div class="col-sm-6" id="toggle_class">
            <button type="button" class="btn btn-link" onclick="Mudarestado('Exposicoes')">Exposições em destaque</button>
        </div>
    </div>
</div>
<!-- /Fim do conteúdo central -->

<div id="content" class="container">
    <div class="row">
    <!--Div id com os ítens recentes -->
    <div id="MaisRecentes" class="col-md-offset-1 col-md-11">
        <div class="row">
        
                 <?php if (get_theme_option('Display Featured Item') !== '0'): ?>
                    <h2><?php echo __('Featured Item'); ?></h2><!-- Item em destaque -->
                        <?php echo random_featured_items(); ?>
                <?php endif; ?>

        </div>
    </div>
    <!--Div id com os ítens mais recentes -->

    <!--Div id com os ítens recentes -->
    <div id="Exposicoes" style="display:none;" class="col-md-12">
        <?php if (get_theme_option('Display Featured Collection') !== '0'): ?>
            <h2><?php echo __('Featured Collection'); ?></h2>
            <?php echo random_featured_collection(); ?>
        <?php endif; ?>
    </div>
    <!--Div id com os ítens mais recentes -->
</div>
</div>
<!--Inicio Rodapé -->
<?php echo foot(); ?>
