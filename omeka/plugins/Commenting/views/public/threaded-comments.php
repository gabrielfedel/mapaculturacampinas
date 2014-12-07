<?php 
foreach($comments as $comment) :  ?>
    <?php if($comment->parent_comment_id == $parent_id): ?>
   
        <?php echo $this->partial('comment.php', array('comment' => $comment)); ?>
       
            <?php echo $this->partial('threaded-comments.php', array('comments' => $comments, 'parent_id'=>$comment->id)); ?>
        
  
    <?php endif; ?>
<?php endforeach; ?>