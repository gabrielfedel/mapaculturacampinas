<div>
    <?php
        if(!empty($comment->author_name)) {
            if(empty($comment->author_url)) {
                $authorText = $comment->author_name;
                 

            } else {
                 $mes = date('m', strtotime($comment->added));

                //Mes em português

                // configuração mes
 
                switch ($mes){
                 
                case 1:  $mes = "Janeiro"; break;
                case 2:  $mes = "Fevereiro"; break;
                case 3:  $mes = "Março"; break;
                case 4:  $mes = "Abril"; break;
                case 5:  $mes = "Maio"; break;
                case 6:  $mes = "Junho"; break;
                case 7:  $mes = "Julho"; break;
                case 8:  $mes = "Agosto"; break;
                case 9:  $mes = "Setembro"; break;
                case 10: $mes = "Outubro"; break;
                case 11: $mes = "Novembro"; break;
                case 12: $mes = "Dezembro"; break;
            }
                $authorText = "<div><p>&nbsp;</p><h5><strong>{$comment->author_name}&nbsp;</strong><span> disse:</h5></span><span class='data' style='float:right'><strong><h5>".date('H:i', strtotime($comment->added))." - ".date('d', strtotime($comment->added))." de ".$mes." de ".date('Y', strtotime($comment->added))."</strong></h5><p>&nbsp;</p></div>";
            }
        } else {
            $authorText = __("Anonymous");
        }
    ?>
    <p class='comment-author-name'><?php echo $authorText?></p>
    <?php
        $hash = md5(strtolower(trim($comment->author_email)));
        $url = "//www.gravatar.com/avatar/$hash";
        //echo "<img class='gravatar' src='$url' />";
    ?>
</div>
<div><?php echo $comment->body; ?></div>
<?php if(is_allowed('Commenting_Comment', 'unflag')): ?>
<p class='comment-flag' <?php if($comment->flagged): ?> style='display:none;'<?php endif;?> ><?php echo __("Flag inappropriate"); ?></p>
<p class='comment-unflag' <?php if(!$comment->flagged): ?>style='display:none;'<?php endif;?> ><?php echo __("Unflag inappropriate"); ?></p>
<p>&nbsp;</p>
<?php endif; ?>
<br/>
<span class='data' style="margin-right:2.5%"><h5 class='comment-reply'><strong><?php echo __("Reply"); ?></strong></h5></span>
<p>&nbsp;</p>
