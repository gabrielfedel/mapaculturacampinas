<?php

class EmbedCodes_IndexController extends Omeka_Controller_AbstractActionController
{
        
    public function init()
    {        
        $this->_helper->db->setDefaultModelName('Embed');
    }
    
    public function embedAction()
    {
        $itemId = $this->getParam('id');
        $item = $this->_helper->db->getTable('Item')->find($itemId);
        $this->view->item = $item;
        $this->view->files = $item->Files;
        
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $host = $request->getHttpHost();
        $url = $request->getHeader('Referer');
        if(!empty($url)) {
            $embed = $this->_helper->db->getTable()->findByUrlAndIdOrNew($url, $item->id);
            if(is_null($embed->first_view)) {
                $embed->first_view = date('Y-m-d H:i:s');
                $embed->view_count = 0;
                $embed->host = $host;
            }
            
            $embed->view_count = $embed->view_count + 1;
            $embed->last_view = date('Y-m-d H:i:s');
            $embed->save();
        }
    }
    
    public function browseAction()
    {
        parent::browseAction();
        $this->view->total = $this->_helper->db->getTable()->totalEmbeds();
    }
    
    public function itemAction()
    {
        $itemId = $this->getParam('id');
        $this->view->embeds = $this->_helper->db->getTable()->findBy(array('item_id'=>$itemId));
        $this->view->item = $this->_helper->db->getTable('Item')->find($itemId);
        $this->view->total = $this->_helper->db->getTable()->totalEmbeds($itemId);
    }
}