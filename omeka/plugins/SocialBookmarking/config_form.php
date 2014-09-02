<div id="socialBookmarkingServiceSettings">

	<div class="field">
	    <div class="two columns alpha">
			<?php echo get_view()->formLabel(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_ITEMS_OPTION, 'Add to Items'); ?>		
	    </div>
	    <div class="inputs five columns omega">
	       	<?php echo get_view()->formCheckbox(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_ITEMS_OPTION, 
										   true, 
										   array('checked'=>(boolean)get_option(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_ITEMS_OPTION))); ?>
	        <p class="explanation"><?php echo __(
	            'If checked, this plugin will add a social bookmarking toolbar at the bottom of every public item show page.'
	        ); ?></p>
	    </div>
	</div>

	<div class="field">
	    <div class="two columns alpha">
			<?php echo get_view()->formLabel(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_COLLECTIONS_OPTION, 'Add to Collections'); ?>		
	    </div>
	    <div class="inputs five columns omega">
	       	<?php echo get_view()->formCheckbox(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_COLLECTIONS_OPTION, 
										   true, 
										   array('checked'=>(boolean)get_option(SOCIAL_BOOKMARKING_ADD_TO_OMEKA_COLLECTIONS_OPTION))); ?>
	        <p class="explanation"><?php echo __(
	            'If checked, this plugin will add a social bookmarking toolbar at the bottom of every public collection show page.'
	        ); ?></p>
	    </div>
	</div>

	<div class="field">
	    <div class="two columns alpha">
			<p><?php echo __('Choose which social bookmarking services you would like to use on your site.'); ?></p>
	    </div>
	
		<div class="inputs five columns omega">
		<ul class="details">
		<?php
			$services = social_bookmarking_get_services();	
			$serviceSettings = social_bookmarking_get_service_settings();
			foreach($services as $serviceCode => $serviceInfo):
				if (array_key_exists($serviceCode, $serviceSettings)) {
					$value = $serviceSettings[$serviceCode];
				} else {
					$value = false;
				}
		?>
			<li class="details">
			<?php echo get_view()->formCheckbox($serviceCode, true, array('checked'=>(boolean)$value)); ?>
			<img src="<?php echo html_escape($serviceInfo['icon']); ?>" /> <?php echo html_escape($serviceInfo['name']); ?>
			</li>
		<?php endforeach; ?>
			</ul>
		</div>
	</div>
</div>

