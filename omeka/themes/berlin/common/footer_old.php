</div><!-- end content -->

<div id="footer">

    <div id="footer-content" class="center-div">
        <div id="custom-footer-text">
            <p><?php echo get_theme_option('Footer Text'); ?></p>
            <?php if ((get_theme_option('Display Footer Copyright') == 1) && $copyright = option('copyright')): ?>
                <p><?php echo $copyright; ?></p>
            <?php endif; ?>
        </div>
		<?php if (!isset($no_footer)) : ?>			
	        <nav><?php echo public_nav_main()->setMaxDepth(0); ?></nav>
		<?php endif; ?>
        <p><?php echo __('Orgulhosamente baseado no <a href="http://omeka.org">Omeka</a>.'); ?></p>

    </div><!-- end footer-content -->

     <?php fire_plugin_hook('public_footer', array('view'=>$this)); ?>

</div><!-- end footer -->

</div><!--end wrap-->

<script type="text/javascript">
    jQuery(document).ready(function(){
        Omeka.showAdvancedForm();
               Omeka.dropDown();
    });
</script>

</body>

</html>
