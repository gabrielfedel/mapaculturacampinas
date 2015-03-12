<?php
/**
 * Display the Creative Commons Chooser for an item.
 *
 * @package CreativeCommonsChooser
 */
class CreativeCommonsChooser_View_Helper_CcWidget extends Zend_View_Helper_Abstract
{
    function ccWidget($item = null, $options = array())
    {
        if (empty($item)) {
            $item = get_current_record('item');
        }

        $cc = get_db()->getTable('CC')->findLicenseByItem($item, true);
        if (!$cc) {
            return;
        }

        $options['cc'] = $cc;

       // Check the title option.
       $options['title'] = isset($options['title']) && ($options['title'] == 'true' || $options['title'] === true);

       // Check the display option.
       if (!isset($options['display']) || !in_array($options['display'], array('text', 'both', 'image'))) {
           $options['display'] == 'image';
       }

       return $this->view->partial('common/creative-commons-chooser.php', $options);
    }
}
