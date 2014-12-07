<?php echo head(array('bodyid'=>'home')); ?>
<!-- SLIDE -->
<div class="row" role="slider">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
        <!-- Função criada para buscar item por tags - criando a lista bolinha automaticamente-->
            <?php 
            $items = get_records('Item', array('tags'=>'mostrar'), 20); 
            if ($items): ?>
                <?php 
                 $counti = 0;
                 foreach ($items as $item): 
                  if($counti == '0'){ ?>
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                  <?php }
                   else{ ?>
                    <li data-target="#carousel-example-generic" data-slide-to="<?php echo $counti; ?>"></li>
               <?php } ?>
                <?php $counti++; ?>
                <?php endforeach; ?>
            <?php else: ?>
                <p><?php echo __('No featured items are available.'); ?></p>
            <?php endif; ?>
            <!-- Fim da função -->
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
         <!-- Função criada para buscar item por tags - pegando imagens para o slider-->
            <?php 
            $items = get_records('Item', array('tags'=>'mostrar'), 20); 
            if ($items): ?>
                 
                <?php 
                 $count = 1;
                 foreach ($items as $item): 
                  if($count == 1){ ?>
                 <div class="item active">
                  <?php }
                   else{ ?>
                    <div class="item">

               <?php } ?>
                    <?php
                    $title = metadata($item, array('Dublin Core', 'Title'));
                    $description = metadata($item, array('Dublin Core', 'Description'), array('snippet' => 150));
                    ?>

                   <!-- Parte da função que chama a foto -->
                   <?php  $images = $item->Files; $imagesCount = 1; ?>
                                            <?php if ($images): ?>


                    <?php foreach ($images as $image): ?>
                                <?php if ($imagesCount ==1): ?>
                                    <img src="<?php echo url('/'); ?>files/original/<?php echo $image->filename; ?>" height="200px"/>
                                <?php endif; ?>
                            <?php $imagesCount++; endforeach; ?>

                     <?php endif; ?>
                    <!-- Fim da chamada da foto -->
                     <div class="carousel-caption">
                        <div id="box-green">
                        <h3><?php echo link_to($item, 'show', strip_formatting($title)); ?></h3>
                        <?php if ($description): ?>
                                <p class="item-description"><?php echo $description; ?>
                                    <span>&nbsp;<?php echo link_to($item, 'show', strip_formatting('SAIBA MAIS')); ?></span>
                                </p>
                        <?php endif; ?>
                        </div>
                    </div>
                </div>
                <?php $count++; ?>
                <?php endforeach; ?>
            <?php else: ?>
                <p><?php echo __('No featured items are available.'); ?></p>
            <?php endif; ?>
            <!-- Fim da função -->
        </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev" style="color:#fff;">
                <span class="glyphicon glyphicon-chevron-left " style="color:#fff;"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" style="color:#fff;"></span>
            </a>
    </div>                
</div>
</div>
 <!-- /SLIDE -->
<!-- Inicio Conteúdo central -->
<div class="container-fluid">
     <div class="row toggle_bar">
      <div class="cog-navigation">
         <div class="col-md-6" id="toggle_class">
            <div id="link1" class="cog-nav-link clicado"><a class="info" href="#"  type="button">Mais Recentes</a></div>
        </div>
        <div class="col-md-6" id="toggle_class">
            <div id="link2" class="cog-nav-link"><a class="gallery" href="#" type="button">Exposições em destaque</a></div>
        </div>
    </div>
  </div>
          <span id="seta1" class="seta1"></span>
          <span id="seta2" class="nada"></span>
</div>

<!-- /Fim do conteúdo central -->
<div id="content" class="container">
    <div class="row">
     
    <div id="caixaTexto1" class="col-md-offset-1 col-md-11">
        <div class='row'>
<div class='col-md-12'>

 <div class="content" id="info">
 
<?php if (get_theme_option('Display Featured Item') !== '0'): ?>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;<?php echo __('Featured Item'); ?></h2><!-- Item em destaque -->
<?php echo random_featured_items(); ?>
<?php endif; ?>
</div>

<div class="content" id="gallery">
    <?php if ((get_theme_option('Display Featured Exhibit')) && function_exists('exhibit_builder_display_random_featured_exhibit')): ?>
    <!-- Featured Exhibit -->
    <?php echo exhibit_builder_display_random_featured_exhibit(); ?>
    <?php endif; ?>
        <?php $items = get_records('Item', array('tags'=>'foo'), 20); 

set_loop_records('items', $items);
?>
</div>
</div></div>
    </div>
</div>
</div>
</div>
</div>
<!--Inicio Rodapé -->
<?php echo foot(); ?>
