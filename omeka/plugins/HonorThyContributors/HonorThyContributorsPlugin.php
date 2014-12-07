<?php 

/**
 * Honor Thy Contributors plugin for Omeka
 * 
 * @copyright Copyright 2013 Lincoln A. Mullen
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 *
 */

// Define constants that set default options
define('HONOR_THY_CONTRIBUTORS_PAGE_PATH', 'contributors/');
define('HONOR_THY_CONTRIBUTORS_PAGE_TITLE', 'Contributors');
define('HONOR_THY_CONTRIBUTORS_PRE_TEXT', 
  'The following people have contributed to this website.');
define('HONOR_THY_CONTRIBUTORS_POST_TEXT', '');
define('HONOR_THY_CONTRIBUTORS_ELEMENT_ID', '37');

class HonorThyContributorsPlugin extends Omeka_Plugin_AbstractPlugin
{

  // Define hooks
  protected $_hooks = array(
    'install',
    'upgrade',
    'uninstall',
    'define_routes',
    'config_form',
    'config'
    );

  protected $_filters = array (
    'public_navigation_main'
    );

  public function hookInstall() {
    // Set the url to the public page as a url that can be changed
    set_option('honor_thy_contributors_page_path',
     HONOR_THY_CONTRIBUTORS_PAGE_PATH);
    set_option('honor_thy_contributors_page_title',
     HONOR_THY_CONTRIBUTORS_PAGE_TITLE);
    set_option('honor_thy_contributors_pre_text',
     HONOR_THY_CONTRIBUTORS_PRE_TEXT);
    set_option('honor_thy_contributors_post_text',
     HONOR_THY_CONTRIBUTORS_POST_TEXT);
    set_option('honor_thy_contributors_element_id',
     HONOR_THY_CONTRIBUTORS_ELEMENT_ID);
  }

  public function hookUpgrade() {
    $oldVersion = $args['old_version'];
    $newVersion = $args['new_version'];

    if ($oldVersion < '0.1.2') {
      // The first version hard coded the element id. Later versions expose it 
      // as an option.
      set_option('honor_thy_contributors_element_id',
        HONOR_THY_CONTRIBUTORS_ELEMENT_ID);
    }    
  }

  public function hookUninstall() {
    delete_option('honor_thy_contributors_page_path');
    delete_option('honor_thy_contributors_page_title');
    delete_option('honor_thy_contributors_pre_text');
    delete_option('honor_thy_contributors_post_text');
    delete_option('honor_thy_contributors_element_id');
  }

  public function hookdefineroutes($args) {
    // Get the path to the contributors page from the options
    $page_path = get_option('honor_thy_contributors_page_path');

    // Direct the path to the view for this plugin
    $router = $args['router'];
    $router->addroute(
      'honor_thy_contributors_path',
      new Zend_Controller_Router_Route(
        $page_path, 
        array(
          'module'       => 'honor-thy-contributors',
          'controller'   => 'index',
          'action'       => 'index'
          )
        )
      );
  }

  public function hookConfigForm() 
  {
    include 'config_form.php';
  }

  public function hookConfig($args)
  {
    $post = $args['post'];
    set_option('honor_thy_contributors_page_path', $post['page_path']);
    set_option('honor_thy_contributors_page_title', $post['page_title']);
    set_option('honor_thy_contributors_pre_text', $post['pre_text']);
    set_option('honor_thy_contributors_post_text', $post['post_text']);
    set_option('honor_thy_contributors_element_id', $post['element_id']);
  }

  public function filterPublicNavigationMain($nav) 
  {
    $nav[] = array(
      'label' => get_option('honor_thy_contributors_page_title'),
      'uri' => url(get_option('honor_thy_contributors_page_path'))
      );
    return $nav;
  }

}
