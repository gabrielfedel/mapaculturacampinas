<style>
  img {
    padding:5px;
  }
</style>

<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>
<?php echo head(array(
  'title' => __('Escolha o seu mapa ou roteiro'),
  'content_class' => 'neatline'
)); ?>

<div id="primary">

  <?php echo flash(); ?>
  <h1><?php echo __('Mapas e roteiros'); ?></h1>

  <?php if (nl_exhibitsHaveBeenCreated()): ?>

    <div class="pagination"><?php echo pagination_links(); ?></div>
    
    <h2><?php echo __('Português'); ?></h2>
    <a href="http://mapa.cultcampinas.org/fullscreen/mapa"><img src="imagens/mapa.png"></a>
    <a href="http://mapa.cultcampinas.org/fullscreen/roteiro-centro"><img src="imagens/roteiro_centro.png"></a>
    <a href="http://mapa.cultcampinas.org/fullscreen/roteiro-afro"><img src="imagens/roteiro_afro.png"></a>
    
    <h2><?php echo __('English'); ?></h2>
    <a href="http://mapa.cultcampinas.org/fullscreen/roteiro-centro-en"><img src="imagens/roteiro_centro_en.png"></a>
    <a href="http://mapa.cultcampinas.org/fullscreen/roteiro-afro-en"><img src="imagens/roteiro_afro_en.png"></a>
    <div class="pagination"><?php echo pagination_links(); ?></div>

  <?php endif; ?>

</div>

<?php echo foot(); ?>

