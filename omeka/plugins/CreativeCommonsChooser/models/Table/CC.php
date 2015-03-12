<?php
/**
 * @package CreativeCommonsChoose\models\Table
 */
class Table_CC extends Omeka_Db_Table
{
    /**
     * Return an indexed array of licences (or a unique licence) for one or
     * multiple items.
     *
     * @param array|Item|int $item One or multiple items.
     * @param boolean $findOnlyOne
     * @return array|CC|null
     **/
    public function findLicenseByItem($item, $findOnlyOne = true)
    {
        // Check item.
        if (is_integer($item) || $item instanceof Item) {
            $item = array($item);
        }
        elseif (!is_array($item) || empty($item)) {
            return $findOnlyOne ? null : array();
        }

        $items = array();
        foreach ($item as $value) {
            $items[] = ($value instanceof Item)
                ? $value->id
                : (integer) $value;
        }

        $limit = $findOnlyOne ? 1 : null;
        $results = $this->findBy(
            array(
                'item_id' => $items,
            ),
            $limit);

        if ($findOnlyOne) {
            return reset($results);
        }

        // Now process into an array where the key is the item_id.
        $indexed = array();
        foreach ($results as $result) {
            $indexed[$result->item_id] = $result;
        }

        return $indexed;
    }
}
