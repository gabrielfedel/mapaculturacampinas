<?php

class Table_Embed extends Omeka_Db_Table
{
    public function findByUrlAndIdOrNew($url, $id)
    {
        $select = $this->getSelectForFindBy(array('url'=>$url, 'item_id'=>$id));
        
        $embed = $this->fetchObject($select);
        if(empty($embed)) {
            $embed = new Embed;
            $embed->url = $url;
            $embed->item_id = $id;
        }
        return $embed;
    }
    
    public function totalEmbeds($itemId = null)
    {
        $alias = $this->getTableAlias();
        $db = $this->_db;
        if($itemId) {
            $sql = "SELECT SUM(view_count) AS total FROM (SELECT `view_count` FROM {$db->Embed}  WHERE `item_id` = $itemId ) AS embeds";            
        } else {
            $sql = "SELECT SUM(view_count) AS total FROM {$db->Embed}";            
        }
        $row = $this->getDb()->fetchRow($sql);
        
        return $row['total'];
    }
}