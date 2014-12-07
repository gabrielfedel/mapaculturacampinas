<?php

class EmbedCodesPlugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array('install', 
                              'uninstall', 
                              'define_routes',
                              'public_items_show',
                              'admin_items_show_sidebar',
                              'admin_items_browse_detailed_each',
                              'initialize'
                              );
    
    protected $_filters = array('admin_navigation_main');
    
    public function hookInitialize()
    {
        add_translation_source(dirname(__FILE__) . '/languages');
    }
    
    public function hookInstall()
    {
        $db = $this->_db;
        $sql = "            
            CREATE TABLE IF NOT EXISTS `$db->Embed` (
              `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
              `item_id` int(10) unsigned NOT NULL,
              `url` text NOT NULL,
              `host` tinytext NOT NULL,
              `first_view` date DEFAULT NULL,
              `last_view` date DEFAULT NULL,
              `view_count` int(11) NOT NULL DEFAULT '0',
              PRIMARY KEY (`id`)
            ) ENGINE=MyISAM ; ";
        $db->query($sql);
    }
    
    public function hookUninstall()
    {
        $db = $this->_db;
        $sql = "DROP TABLE IF EXISTS `$db->Embed`; ";
        $db->query($sql);
    }
    
    public function hookPublicItemsShow($args)
    {
        $item = $args['item'];
        $uri = absolute_url(array('controller'=>'items', 'action'=>'embed', 'id'=>$item->id), 'id');
        
        $html = "<div id='embed-codes'><h2>" . __('Embed') . "</h2>";
        $html .= "<p>" . __("Copy the code below into your web page") . "</p>";
        $iFrameHtml = "<iframe class='omeka-embed' src='$uri' width='560px' height='315px' frameborder='0' allowfullscreen></iframe>";
        $html .= "<textarea id='embed-code-text' style='font-family:monospace' rows='4'>$iFrameHtml</textarea>";
        $html .= "</div>";
        
        echo $html;
    }
    
    public function hookAdminItemsBrowseDetailedEach($args)
    {
        $item = $args['item'];
        $embedTable = get_db()->getTable('Embed');
        $totalEmbeds = $embedTable->totalEmbeds($item->id);
        $html = '<p>';
        $html .= "<a href='" . url('embed-codes/item/' . $item->id) . "'>" . __('Embeds (%d)', $totalEmbeds) . "</a>";
        $html .= '</p>';
        echo $html;
    }
    
    public function hookAdminItemsShowSidebar($args)
    {
        $item = $args['item'];
        $embedTable = get_db()->getTable('Embed');
        $totalEmbeds = $embedTable->totalEmbeds($item->id);
        $allEmbeds = $embedTable->findBy(array('item_id'=>$item->id));
        $html = "<div class='embed-codes panel'>";
        $html .= "<h4>" . __("Embeds") . "</h4>";
        $html .= "<a href='" . url('embed-codes/item/' . $item->id) . "'>" . __('Details') . "</a>";
        $html .= "<p>" . __("Total views: %d", $totalEmbeds) . "</p>";
        $html .= "<p>" . __("Total embeds: %d", count($allEmbeds)) .  "</p>";
        $html .= "<p class='explanation'>" . __("Date is last viewed. Click to see the external page.") . "</p>";
        $html .= "<ul>";
        foreach($allEmbeds as $embed) {
            $html .= "<li>";
            $html .= "<a href='{$embed->url}'>{$embed->last_view}</a> ";
            $html .= __("(%d views)", $embed->view_count);
            $html .= "</li>";
        }
        $html .= "</ul>";
        $html .= "</div>";
        echo $html;
    }
    
    public function hookDefineRoutes($array)
    {        
        $router = $array['router'];
        $router->addRoute(
            'embed',
            new Zend_Controller_Router_Route(
                'items/embed/:id',
                array(
                    'module'       => 'embed-codes',
                    'controller'   => 'index',
                    'action'       => 'embed',
                )
            )
        );     
        $router->addRoute(
            'embed-item',
            new Zend_Controller_Router_Route(
                'embed-codes/item/:id',
                array(
                    'module' => 'embed-codes',
                    'controller' => 'index',
                    'action' => 'item'        
                )        
            )      
        );   
    }
    
    public function filterAdminNavigationMain($navArray)
    {
        $navArray['EmbedCodes'] = array('label'=>__('Embedded Items'), 'uri'=>url('embed-codes'));
        return $navArray;
    }
}