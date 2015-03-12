
<div class="movie gallery">
<div style="text-align:left;"><?php echo $this->shortcodes($text); ?></div>
<?php $counter = 0; ?>
  <?php foreach ($attachments as $attachment): ?>
        <?php $item = $attachment->getItem(); ?>
        <?php $file = $attachment->getFile(); ?>
      <?php if ($counter == 0): ?>
        <div id="moviegal-row">
    <?php endif; ?>
            <?php $counter++; ?>
             <div class="exhibit-item exhibit-gallery-item">
             <?php $altText = "Thumbnail for item, linking to full sized image."; ?>
            <?php if  ($description = (metadata($item, array("Dublin Core", "Description")))): ?>
            <?php $altText =  $description; ?>
            <?php endif; ?> 
            <?php echo file_markup($file, array('imageSize'=>'thumbnail', 'imgAttributes'=>array('alt' =>  "$altText", 'title' => metadata($item, array("Dublin Core", "Title"))))); ?>
            <div class="exhibit-item-title">
            <?php echo "<a href=".exhibit_builder_exhibit_item_uri($item).">".metadata($item, array("Dublin Core", "Title"), array('snippet'=>100))."</a>"; ?>
            <?php if (metadata($item, array("Dublin Core", "Date"))) { echo '<span class="exhibit-item-date"> (' . metadata($item, array("Dublin Core", "Date")) . ')</span>'; } ?>
           </div>
           <?php if ($attachment['caption']): ?>
                <?php echo $attachment['caption']; ?>
            <?php elseif ($transcription = (metadata($item,array("Item Type Metadata","Transcription"),array('snippet'=>150)))): ?>
            <div class="exhibit-item-caption">
                <?php echo  $transcription; ?>
            </div>
                <?php elseif ($description = (metadata($item, array("Dublin Core", "Description"), array('snippet'=>150)))): ?>
                    <div class="exhibit-item-caption">
                <?php echo  $description; ?>
                </div>
            <?php endif; ?>
            </div>
         
            <?php if ($counter % 2 == 0 && $attachment != end($attachments)): ?>
                </div>
                <span class="break-row"></span>
                <div id="moviegal-row">
            <?php endif; ?>


        <?php endforeach; ?>
    </div>
</div>

