<?php
/**
 * @package CreativeCommonsChooser\models
 */
class CC extends Omeka_Record_AbstractRecord
{
    public $item_id;
    public $is_cc = false;
    public $cc_name;
    public $cc_uri;
    public $cc_img;

    // public $allow_emixing = true;
    // public $allow_commercial = true;
    // public $enforce_sharealike = false;
    //
    // public $jurisdiction = ;

    protected function _validate()
    {
        if ($is_cc) {
            if (empty($this->cc_name) && empty($this->cc_uri)) {
                $this->addError(null, __('Error in Creative Commons License.'));
            }
        }
    }
}
