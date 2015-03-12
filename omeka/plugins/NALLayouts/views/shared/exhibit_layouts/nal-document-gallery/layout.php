<?php
$showcasePosition = isset($options['showcase-position'])
    ? html_escape($options['showcase-position'])
    : 'none';
$showcaseFile = $showcasePosition !== 'none' && !empty($attachments);
$galleryPosition = isset($options['gallery-position'])
    ? html_escape($options['gallery-position'])
    : 'left';

    $size = isset($options['file-size'])
    ? html_escape($options['file-size'])
    : 'thumbnail';
?>
<?php if ($showcaseFile): ?>
<div class="gallery-showcase <?php echo $showcasePosition; ?> with-<?php echo $galleryPosition; ?>">
    <?php
        $attachment = array_shift($attachments);
        echo $this->exhibitAttachment($attachment, array('imageSize' => 'fullsize'));
    ?>
</div>
<?php endif; ?>
<div class="gallery <?php if ($showcaseFile) echo "with-showcase $galleryPosition"; ?>">
	<?php if ($text): ?>
		<div style="text-align:left;"><?php echo $this->shortcodes($text); ?></div>
	<?php endif; ?>
	<?php $counter = 0; ?>
	<?php foreach ($attachments as $attachment): ?>
		<?php $item = $attachment->getItem(); ?>
		<?php $file = $attachment->getFile(); ?>
		<?php if ($counter == 0): ?>
		<div class="document-row">
		<?php endif; ?>
		<?php $counter++; ?>

        <div class="exhibit-item exhibit-gallery-item">
            
            <?php $altText = "Thumbnail for item, linking to full sized image."; ?>
			
			<?php $image = file_image($size, array('alt' =>  "$altText", 'title' => metadata($item, array("Dublin Core", "Title"))), $file); ?>
			<?php echo exhibit_builder_link_to_exhibit_item($image, array('alt' =>  "$altText", 'title' => metadata($item, array("Dublin Core", "Title"))), $item); ?>

			<?php if ($attachment['caption']): ?>
				<div class="exhibit-item-caption">
			    	<?php echo $attachment['caption']; ?>
				</div>
			<?php endif; ?>
		</div>

		<?php if ($counter % 4 == 0 && $attachment != end($attachments)): ?>
		    </div>
		    <span class="break-row">&nbsp;</span>
		    <div class="document-row">
		<?php endif; ?>
	<?php endforeach; ?>
	</div>
</div>
