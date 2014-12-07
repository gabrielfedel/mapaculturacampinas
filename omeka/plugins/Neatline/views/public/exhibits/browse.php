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
<div class="col-md-12" id="topo"></div>
<!-- Inicio do container-->
<div class="container">
  <div class="row rowcolor">
    <div class="col-md-12" id="topo">
      <?php echo flash(); ?>
      <h1><i class="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;<?php echo __('Mapas e roteiros'); ?></h1>
      <?php if (nl_exhibitsHaveBeenCreated()): ?>
      <div class="pagination"><?php echo pagination_links(); ?></div>
    </div>
    <div class="col-md-12" style="border:2px solid #4AAAA5; overflow:hidden; padding:1em;">
    <div class="row">
      <br/>
    <div class="item">
      <div class="col-md-12"><h2><i class="fa fa-language"></i>&nbsp;&nbsp;<?php echo __('Português'); ?></h2></div>
      <div class="col-md-12">&nbsp;</div>
      <div class="col-md-12">&nbsp;</div>
      <div class="col-md-3 col-md-offset-1" id="circle"><a href="neatline/show/mapa" style="outline:none;"><img src="imagens/mapa.png" width="200" height="200" style=" -webkit-box-shadow: 0 0 5px 4px rgba(0, 0, 0, .5);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .5);  border-radius:50%;"></a></div>
      <div class="col-md-3 col-md-offset-1" id="circle"><a href="neatline/show/roteiro-centro" style="outline:none;"><img src="imagens/roteiro_centro.png" width="200" height="200" style=" -webkit-box-shadow: 0 0 5px 4px rgba(0, 0, 0, .5);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .5);  border-radius:50%;"></a></div>
      <div class="col-md-3 col-md-offset-1" id="circle"> <a href="neatline/show/roteiro-afro" style="outline:none;"><img src="imagens/roteiro_afro.png" width="200" height="200" style=" -webkit-box-shadow: 0 0 5px 4px rgba(0, 0, 0, .5);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .5);  border-radius:50%;"></a></div>
    </div>
</div>

  <div class="row rowcolor">
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
    <div class="item">
      <div class="col-md-12"><h2><i class="fa fa-language"></i>&nbsp;&nbsp;<?php echo __('English'); ?></h2></div>
      <div class="col-md-12">&nbsp;</div>
      <div class="col-md-12">&nbsp;</div>
      <div class="col-md-12">&nbsp;</div>
      <div class="col-md-5 col-md-offset-2" id="circle"> <a href="neatline/show/roteiro-afro-en" style="outline:none;"><img src="imagens/roteiro_afro_en.png" width="200" height="200" style=" -webkit-box-shadow: 0 0 5px 4px rgba(0, 0, 0, .5);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .5);  border-radius:50%;"></a></div>
      <div class="col-md-5" id="circle"><a href="neatline/show/roteiro-centro-en" style="outline:none;"><img src="imagens/roteiro_centro_en.png" width="200" height="200" style=" -webkit-box-shadow: 0 0 5px 4px rgba(0, 0, 0, .5);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .5);  border-radius:50%;"></a></div>
    </div>
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
  </div>
    </div>
  </div>

<div class="pagination"><?php echo pagination_links(); ?></div>
</div>
<?php endif; ?>
<br/>
<?php echo foot(); ?>