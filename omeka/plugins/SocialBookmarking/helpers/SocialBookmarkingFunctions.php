<?php
/**
 * Social Bookmarking
 *
 * @copyright Copyright 2008-2013 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

function social_bookmarking_get_service_settings() 
{
	$serviceSettings = unserialize(get_option(SOCIAL_BOOKMARKING_SERVICE_SETTINGS_OPTION));
	ksort($serviceSettings);
	return $serviceSettings;
}

function social_bookmarking_set_service_settings($serviceSettings) 
{
	set_option(SOCIAL_BOOKMARKING_SERVICE_SETTINGS_OPTION, serialize($serviceSettings));
}

function social_bookmarking_get_default_service_settings()
{
	$services =  social_bookmarking_get_services();
	$serviceSettings = array();
	$defaultEnabledServiceCodes = array('facebook',
										'twitter',
										'linkedin',
									    'pinterest',
									    'email',
									    'google',
									    'orkut',
									    'delicious',
									    'digg',
									    'stumbleupon',
									    'yahoobkm');
	foreach($services as $serviceCode => $serviceInfo) {
        $serviceSettings[$serviceCode] = in_array($serviceCode, $defaultEnabledServiceCodes);
    }
	return $serviceSettings;
}

function social_bookmarking_get_services_xml()
{
    static $xml = null;
    if (!$xml) {
        $file = file_get_contents(SOCIAL_BOOKMARKING_ADDTHIS_SERVICES_URL);
        $xml = new SimpleXMLElement($file);
    }
	return $xml;
}

function social_bookmarking_get_services()
{
	static $services = null;
	$booleanFilter = new Omeka_Filter_Boolean;
	if (!$services) {
		$xml = social_bookmarking_get_services_xml();						
		$services = array();
		foreach ($xml->data->services->service as $service) {	    	
			$serviceCode = (string)$service->code;
			$services[$serviceCode] = array(
	    		'code' => $serviceCode,
				'name' => (string)$service->name,
				'icon' => (string)$service->icon,
				'script_only' => $booleanFilter->filter((string)$service->script_only),
	    	);
		}
	}	
	return $services;
}

function social_bookmarking_get_service($serviceCode)
{
	$services = social_bookmarking_get_services();
    if (array_key_exists($serviceCode, $services)) {
		return $services[$serviceCode];
	}
	return null;
}

function social_bookmarking_toolbar($url, $title, $description='')
{
	$html = '';
	$html .= '<!-- AddThis Button BEGIN -->';
	$html .= '<div class="addthis_toolbox addthis_default_style addthis_32x32_style"';
	$html .= ' addthis:url="' . html_escape($url) . '" addthis:title="' . html_escape($title) . '" addthis:description="' . html_escape($description) . '">';
	$services = social_bookmarking_get_services();
	$serviceSettings = social_bookmarking_get_service_settings();	
	$booleanFilter = new Omeka_Filter_Boolean;
	foreach ($serviceSettings as $serviceCode => $value) {
		if ($booleanFilter->filter($value) && array_key_exists($serviceCode, $services)) {
			$html .= '<a class="addthis_button_' . html_escape($serviceCode) . '"></a>';
		}
	}
	$html .= '<a class="addthis_button_compact"></a>';		
	//$html .= '<a class="addthis_counter addthis_bubble_style"></a>';
	$html .= '</div>';
	$html .= '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js"></script>';
	$html .= '<!-- AddThis Button END -->';
	
	return $html;
}