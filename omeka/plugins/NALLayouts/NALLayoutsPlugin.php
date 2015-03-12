<?php
class NALLayoutsPlugin extends Omeka_Plugin_AbstractPlugin
{

    protected $_filters = array('exhibit_layouts');

    public function filterExhibitLayouts($layouts)
    {
        $layouts['nal-titlebar'] = array(
            'name' => 'NAL Titlebar',
            'description' => 'A list layout with titlebars.'
        );
		
		$layouts['nal-imggal'] = array(
            'name' => 'NAL Image Galleries',
            'description' => 'For migrating old Drupal Galleries'
        );

        $layouts['nal-document-gallery'] = array(
            'name' => 'NAL Document Galleries',
            'description' => 'Gallery format with option for image size.'
        );
    
        $layouts['nal-moviegal'] = array(
            'name' => 'NAL Movie Gallery',
            'description' => 'Display two moving images per row.'
        );
        return $layouts;
    }
}