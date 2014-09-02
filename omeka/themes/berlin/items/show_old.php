<?php echo head(array('title' => metadata('item', array('Dublin Core', 'Title')),'bodyclass' => 'items show')); ?>
<div id="primary">
    <h1><?php echo metadata('item', array('Dublin Core','Title')); ?></h1>

    <?php
    $titles = metadata('item',array('Dublin Core','Title'),array('all'));

    if(count($titles) > 1):
    ?>
    <h3><?php echo __('All Titles'); ?></h3>
    <ul class="title-list">
        <?php foreach($titles as $title): ?>
            <li class="item-title">
                <?php echo $title; ?>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>

    <!-- Items metadata -->
    <div id="item-metadata">
        <?php echo all_element_texts('item'); ?> 
    </div>

<!-- The following returns all of the files associated with an item. -->
<?php if (metadata('item', 'has files')): ?>
<div id="itemfiles" class="element">
    <h3><?php echo __('Files'); ?></h3>
    <?php 
	set_loop_records('files', get_current_record('item')->Files);
	foreach(loop('files') as $file): ?>
		
		<div class="file-display">
			<!-- Display the file itself-->
			<?php 

				//getting data file
				$dublin_files = all_element_texts(
				$file, 
				array('show_element_sets' => 
					array ('Dublin Core'),
					  'return_type' => 'array'));  

				//Verify if the file is a image, if is insert code to the lightbox
				if (stripos(get_current_record('file')->mime_type,'image') !== false) {

					//Construct label to picture view on lightbox
					$label_pic = "";	
					if (isset($dublin_files['Dublin Core']['Title']))
						$label_pic = $label_pic." <span class='lb-caption-bold'>Título: </span>".$dublin_files['Dublin Core']['Title'][0]." <br/>";
					if (isset($dublin_files['Dublin Core']['Description']))
						$label_pic = $label_pic." <span class='lb-caption-bold'>Descrição: </span>".$dublin_files['Dublin Core']['Description'][0]." <br/>";

					if (isset($dublin_files['Dublin Core']['Creator']))
						$label_pic = $label_pic." <span class='lb-caption-bold'>Criador: </span>".$dublin_files['Dublin Core']['Creator'][0]." <br/>";			
					if (isset($dublin_files['Dublin Core']['Date']))
						$label_pic = $label_pic." <span class='lb-caption-bold'>Data: </span>".$dublin_files['Dublin Core']['Date'][0]." <br/>";							
					if (isset($dublin_files['Dublin Core']['Rights']))
						$label_pic = $label_pic." <span class='lb-caption-bold'>Direitos: </span>".$dublin_files['Dublin Core']['Rights'][0]." <br/>";		

	

					echo file_markup(get_current_record('file'),array('linkAttributes' => array('data-lightbox' => 'setimages', 'title' => $label_pic )));
				}
				else {
					echo file_markup(get_current_record('file')); 
				}

			?>
			<!-- Display the file's metadata -->
			<div class="file-metadata">
				<?php  


/*		To show all Dublin Core Data
	
		echo all_element_texts(
			$file, 
			array('show_element_sets' => 
				array ('Dublin Core'))); */
  

			/*verificando se possui os campos*/
			/*depois verificar quais campos serão exibidos*/
			if (isset($dublin_files['Dublin Core']['Title'])) :
			?>
				<h4> <?php echo $dublin_files['Dublin Core']['Title'][0]  ?> </h4>
			<?php endif; ?>
			</div>
		</div>
<!--		<div style="clear:both"></div> -->


	<?php endforeach; ?>
</div>
<?php endif; ?>


<div id="outputs">
    <span class="outputs-label"><?php echo __('Output Formats'); ?></span>
    <?php echo output_format_list(false); ?>
</div>


   <?php if(metadata('item','Collection Name')): ?>
      <div id="collection" class="element">
        <h3><?php echo __('Collection'); ?></h3>
        <div class="element-text"><p><?php echo link_to_collection_for_item(); ?></p></div>
      </div>
   <?php endif; ?>


     <!-- The following prints a list of all tags associated with the item -->
    <?php if (metadata('item','has tags')): ?>
    <div id="item-tags" class="element">
        <h3><?php echo __('Tags'); ?></h3>
        <div class="element-text"><?php echo tag_string('item'); ?></div>
    </div>
    <?php endif;?>

    <!-- The following prints a citation for this item. -->
    <div id="item-citation" class="element">
        <h3><?php echo __('Citation'); ?></h3>
        <div class="element-text"><?php echo metadata('item','citation',array('no_escape'=>true)); ?></div>
    </div>
       <?php fire_plugin_hook('public_items_show', array('view' => $this, 'item' => $item)); ?>


    <ul class="item-pagination navigation">
        <li id="previous-item" class="previous"><?php echo link_to_previous_item_show(); ?></li>
        <li id="next-item" class="next"><?php echo link_to_next_item_show(); ?></li>
    </ul>

</div> <!-- End of Primary. -->


 <?php echo foot(); ?>
