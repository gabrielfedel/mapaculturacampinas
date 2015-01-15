<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<?php
//this verify if has or not a narrative, to use a special css 
$empty_narrative = "\n<div id=\"neatline-narrative\">\n  </div>\n";
$narrative = nl_getNarrativeMarkup();

if ($narrative != $empty_narrative)
	queue_css_file('dist/production/neatline-public-narrative');

echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline fullscreen'
)); ?>

<?php echo nl_getExhibitMarkup(); ?>

<?php 
	echo $narrative; 
?>



<?php echo foot(); ?>
