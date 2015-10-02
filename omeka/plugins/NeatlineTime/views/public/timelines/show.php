<?php
/**
 * The public show view for Timelines.
 */

queue_timeline_assets();
$head = array('bodyclass' => 'timelines primary',
              'title' => metadata($neatline_time_timeline, 'title')
              );
echo head($head);
?>
<h1><?php echo metadata($neatline_time_timeline, 'title'); ?></h1>


    <!-- Construct the timeline. -->
    <?php echo $this->partial('timelines/_timeline.php'); ?>

    <?php echo metadata($neatline_time_timeline, 'description'); ?>

<?php echo foot(); ?>
