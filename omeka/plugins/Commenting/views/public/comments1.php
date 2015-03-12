
    <?php $label = get_option('commenting_comments_label'); ?>
    <?php if ($label == ''):?>
        <h4><strong><?php echo __('Comments'); ?></strong></h4>
    <?php else: ?>
        <h2><?php echo $label; ?></h2>
    <?php endif; ?>
   <?php echo flash(true); ?>
    <?php echo fire_plugin_hook('commenting_prepend_to_comments', array('comments' =>$comments)); ?>

    <?php if($threaded) :?>
        <?php echo $this->partial('threaded-comments.php', array('comments' => $comments, 'parent_id'=>null)); ?>
    <?php else: ?>
        <?php foreach($comments as $comment): ?>
       
            <?php echo $this->partial('comment.php', array('comment' => $comment)); ?>
        
        <?php endforeach; ?>
    <?php endif; ?>
