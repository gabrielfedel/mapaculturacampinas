<?php
/**
 * CreativeCommonsChooser
 *
 * Adds a Creative Commons License Chooser to the admin interface and extends
 * Omeka items to be associated with individual CC licenses.
 *
 * @copyright Copyright Alexandria Archive Institute, African Commons, and the UC Berkeley School of Information, Information and Service Design Program, 2009
 * @copyright Copyright Daniel Berthereau, 2015 (upgrade to Omeka 2)
 * @license GNU/GPL v3
 * @package CreativeCommonsChooser
 */

/**
 * The CreativeCommonsChooser plugin.
 * @package Omeka\Plugins\CreativeCommonsChooser
 */
class CreativeCommonsChooserPlugin extends Omeka_Plugin_AbstractPlugin
{
    /**
     * @var array Hooks for the plugin.
     */
    protected $_hooks = array(
        'initialize',
        'install',
        'uninstall',
        'config_form',
        'config',
        'after_save_item',
        'after_delete_item',
        'admin_head',
        'admin_items_show_sidebar',
        'public_items_show',
    );

    /**
     * @var array Filters for the plugin.
     */
    protected $_filters = array(
        'admin_items_form_tabs',
    );

    /**
     * @var array Options and their default values.
     */
    protected $_options = array(
        'creativecommonschooser_default_license_uri' => '',
    );

    /**
     * Initialize hook.
     */
    public function hookInitialize()
    {
        add_shortcode('cc', array($this, 'shortcodeCreativeCommons'));
    }

    /**
     * Install the plugin.
     */
    public function hookInstall()
    {
        $db = $this->_db;
        $sql = "
        CREATE TABLE IF NOT EXISTS `$db->CC` (
            `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
            `item_id` int(10) unsigned NOT NULL,
            `is_cc` BOOLEAN NOT NULL ,
            `cc_name` TEXT COLLATE utf8_unicode_ci ,
            `cc_uri` TEXT COLLATE utf8_unicode_ci ,
            `cc_img` TEXT COLLATE utf8_unicode_ci ,
            PRIMARY KEY (`id`),
            KEY `item_id` (`item_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        ";
        $db->query($sql);

        $this->_installOptions();
    }

    /**
     * Uninstall the plugin.
     */
    public function hookUninstall()
    {
        $db = $this->_db;
        $sql = "DROP TABLE IF EXISTS `$db->CC`";
        $db->query($sql);

        $this->_uninstallOptions();
    }

    /**
     * Shows plugin configuration page.
     */
    public function hookConfigForm($args)
    {
        $view = get_view();
        echo $view->partial('plugins/creative-commons-chooser-config-form.php');
    }

    /**
     * Saves plugin configuration page.
     *
     * @param array Options set in the config form.
     */
    public function hookConfig($args)
    {
        $post = $args['post'];

        // Use the form to set a bunch of default options in the db.
        set_option('creativecommonschooser_default_license_uri', $post['cc_js_result_uri']);
    }

    /**
     * Each time an item is saved, check if a licence is saved too.
     *
     * @return void
     */
    public function hookAfterSaveItem($args)
    {
        if (!$args['post']) {
            return;
        }

        $item = $args['record'];
        $post = $args['post'];

        // If there is no creative commons form on the page, don't do anything!
        if (!$post['cc_js_result_uri']) {
            return;
        }

        // Get the active licence, if any.
        $cc = $this->_getLicenseForItem($item);

        // If the license is filled out, then submit to the db.
        if (!empty($post)
            && (!empty($post['cc_js_result_uri'])
                && !empty($post['cc_js_result_name']))) {

            if (empty($cc)) {
                $cc = new CC;
                $cc->item_id = $item->id;
            }

            // No translation, because it comes from Creative Commons.
            if ($post['cc_js_result_name'] != 'No license chosen') {
                $cc->is_cc = true;
                $cc->cc_name = $post['cc_js_result_name'];
                $cc->cc_uri = $post['cc_js_result_uri'];
                $cc->cc_img = $post['cc_js_result_img'];
            }
            else {
                $cc->is_cc = false;
            }

            if ($cc->save()) {
                return true;
            }
        }
        // If the form is empty, then we want to delete whatever license is
        // currently stored.
        else {
            if ($cc) {
                $cc->delete();
            }
        }
    }

    /**
     * Hook used when an item is removed.
     */
    public function hookAfterDeleteItem($args)
    {
        $item = $args['record'];
        $ccs = $this->_db->getTable('CC')->findLicenseByItem($item, false);
        foreach ($ccs as $cc) {
            $cc->delete();
        }
    }

    /**
     * Add css and js in the header of the admin theme.
     */
    public function hookAdminHead($args)
    {
        $view = $args['view'];

        $request = Zend_Controller_Front::getInstance()->getRequest();
        // If needed output the script tags that include the GMaps JS from afar.
        if ($request->getControllerName() == 'items'
                && in_array($request->getActionName(), array('edit', 'add'))
            ) {
            // Import Styles for the CC License Chooser
            queue_css_file('creative-commons-chooser');
            // Note: The official javascript should be append after the form.
            // queue_js_file('complete');
        }
    }

    public function hookAdminItemsShowSidebar($args)
    {
        $view = $args['view'];
        $item = $args['item'];

        $html = '<div class="info panel">';
        $html .= '<h4>' . __('Creative Commons Licence') . '</h4>';
        $html .= '<div><p>';
        $html .= $view->ccWidget($item);
        $html .= '</p></div>';
        $html .= '</div>';

        echo $html;
    }

    public function hookPublicItemsShow($args)
    {
        $view = $args['view'];
        $item = $args['item'];

        echo $view->ccWidget($item, array(
            'title' => true,
            'display' => 'image',
        ));
    }

    /**
     * Add Creative Commons tab to the edit item page.
     *
     * @return array of tabs
     */
    function filterAdminItemsFormTabs($tabs, $args)
    {
        $item = $args['item'];

        // Insert the map tab before the Tags tab.
        $ttabs = array();
        foreach($tabs as $key => $html) {
            if ($key == 'Tags') {
                $ttabs[__('Creative Commons')] = $this->_ccForm($item);
            }
            $ttabs[$key] = $html;
        }
        $tabs = $ttabs;
        return $tabs;
    }

    protected function _ccForm($item)
    {
        if (isset($item->id)) {
            $cc = $this->_getLicenseForItem($item->id);
        }

        $html = '<!-- <form id="cc_js_seed_container"> -->';
        $html .= '<input type="hidden" id="cc_js_seed_uri" value="';
        $html .= empty($cc) ? get_option('creativecommonschooser_default_license_uri') : $cc -> cc_uri;
        $html .= '" />';
        $html .= '<!-- </form> -->';
        $html .= '<div id="cc_widget_container" style="display:block; clear:both;">';
        $html .= '<script type="text/javascript" src="http://api.creativecommons.org/jswidget/tags/0.97/complete.js?locale=en_US"></script>';
        $html .= '</div>';

        return $html;
    }

    /**
     * Shortcode for adding a Creative Commons widget.
     *
     * @param array $args
     * @param Omeka_View $view
     * @return string
     */
    public function shortcodeCreativeCommons($args, $view)
    {
        // Check required arguments
        if (empty($args['item_id'])) {
            $item = get_current_record('item');
        }
        else {
            $item = get_record_by_id('Item', (integer) $args['item_id']);
        }
        if (empty($item)) {
            return;
        }

        $title = isset($args['title'])
            ? $args['title']
            : false;

        $display = isset($args['display'])
            ? $args['display']
            : 'image';

        $options = array(
            'display' => $display,
            'title' => $title,
        );

        return $view->ccWidget($item, $options);
    }

    /**
     * Return the license record for the given item_id (if exists)
     *
     * @param array|Item|int $item
     * @return array
     */
    function _getLicenseForItem($item)
    {
        return $this->_db->getTable('CC')->findLicenseByItem($item, true);
    }
}
