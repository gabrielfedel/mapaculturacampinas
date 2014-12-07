<!-- Inicio do container-->

            <div class="col-md-3">
          
                <div class="item record">
                    <?php
                    $title = metadata($item, array('Dublin Core', 'Title'));
                    $description = metadata($item, array('Dublin Core', 'Description'), array('snippet' => 150));
                    ?>
                    <?php if (metadata($item, 'has files')) {
                        echo link_to_item(
                            item_image('square_thumbnail', array('class' => 'img-circle imgi'), 0, $item), 
                            array('class' => 'image'), 'show', $item
                        );
                    }
                    ?>
                    <h4 class="title_ini"><?php echo link_to($item, 'show', strip_formatting($title)); ?></h4><!-- Título do item -->
                    <?php if ($description): ?>
                        <p class="item-description"><?php echo $description; ?></p>
                    <?php endif; ?>
                </div>
               </div>