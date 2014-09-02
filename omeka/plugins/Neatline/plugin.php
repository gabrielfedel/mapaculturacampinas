<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


if (!defined('NL_DIR')) define('NL_DIR', dirname(__FILE__));

// PLUGIN
require_once NL_DIR.'/NeatlinePlugin.php';

// MODELS
require_once NL_DIR.'/models/abstract/Neatline_Row_Abstract.php';
require_once NL_DIR.'/models/abstract/Neatline_Row_Expandable.php';
require_once NL_DIR.'/models/abstract/Neatline_Row_Expansion.php';
require_once NL_DIR.'/models/abstract/Neatline_Table_Expandable.php';
require_once NL_DIR.'/models/abstract/Neatline_Table_Expansion.php';

// MISCELLANEOUS
require_once NL_DIR.'/jobs/Neatline_Job_ImportItems.php';
require_once NL_DIR.'/controllers/abstract/Neatline_Controller_Rest.php';
require_once NL_DIR.'/assertions/Neatline_Acl_Assert_RecordOwnership.php';
require_once NL_DIR.'/forms/Neatline_Form_Exhibit.php';

// MIGRATIONS
require_once NL_DIR.'/migrations/abstract/Neatline_Migration_Abstract.php';
require_once NL_DIR.'/migrations/2.0.2/Neatline_Migration_202.php';
require_once NL_DIR.'/migrations/2.1.2/Neatline_Migration_212.php';
require_once NL_DIR.'/migrations/2.2.0/Neatline_Migration_220.php';

// HELPERS
require_once NL_DIR.'/helpers/Acl.php';
require_once NL_DIR.'/helpers/Assets.php';
require_once NL_DIR.'/helpers/Coverage.php';
require_once NL_DIR.'/helpers/Globals.php';
require_once NL_DIR.'/helpers/Layers.php';
require_once NL_DIR.'/helpers/Mysql.php';
require_once NL_DIR.'/helpers/Plugins.php';
require_once NL_DIR.'/helpers/Schemas.php';
require_once NL_DIR.'/helpers/Strings.php';
require_once NL_DIR.'/helpers/Styles.php';
require_once NL_DIR.'/helpers/Views.php';

// LIBRARIES
require_once(NL_DIR.'/lib/geoPHP/geoPHP.inc');

Zend_Registry::set('fileIn', 'php://input');
nl_setLayerSources();

$neatline = new NeatlinePlugin();
$neatline->setUp();
