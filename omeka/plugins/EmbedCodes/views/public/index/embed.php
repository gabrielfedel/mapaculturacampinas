<!DOCTYPE html>
<html>
<head>
<?php
queue_css_file('style');
$css = "
div.content {margin-right: 10px; max-width:310px;}
div.thumbnail {float:right;}
h1 {margin: 0;}


";
queue_css_string($css);
echo head_css();
?>

<?php $rights = metadata($item, array('Dublin Core', 'Rights')); ?>
</head>
<body>
<div style="width: 450px">
    <?php if (metadata('item', 'has files')): ?>
        <?php $files = $item->Files; ?>
        <div class="thumbnail"><?php echo file_image('thumbnail', array(), $files[0]); ?></div>
    <?php endif; ?>
    <div class='content'>
    <h1><a target='_blank' href="<?php echo record_url($item, 'show') ; ?>"><?php echo metadata('item', array('Dublin Core', 'Title')); ?></a></h1>
        <p>
        <?php if($rights != ''): ?>
        <span><?php echo $rights; ?> | </span>
        <?php endif; ?>
        <?php echo __('From: '); ?><?php echo link_to_home_page(null, array('target'=>'_blank')); ?>
        </p>
         

        <?php fire_plugin_hook('embed_codes_content', array('item'=>$item, 'view'=>$this)); ?>
    </div>


</div>
</body>
</html>