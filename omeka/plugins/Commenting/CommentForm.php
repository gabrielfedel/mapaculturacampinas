<?php


class Commenting_CommentForm extends Omeka_Form
{

    public function init()
    {
        parent::init();
        $this->setAction(WEB_ROOT . '/commenting/comment/add');
        $this->setAttrib('id', 'comment-form');
        $user = current_user();

        //assume registered users are trusted and don't make them play recaptcha
        if(!$user && get_option('recaptcha_public_key') && get_option('recaptcha_private_key')) {
            $this->addElement('captcha', 'captcha',  array(
                'class' => 'hidden',
                'label' => __("Please verify you're a human"),
                'captcha' => array(
                    'captcha' => 'ReCaptcha',
                    'pubkey' => get_option('recaptcha_public_key'),
                    'privkey' => get_option('recaptcha_private_key'),
                    'ssl' => true //make the connection secure so IE8 doesn't complain. if works, should branch around http: vs https:
                )
            ));
        }

        $urlOptions = array(
                'label'=>__('Website'),
            );
        $emailOptions = array(
                'label'=>__('Email (required)'),
                'required'=>true,
                'validators' => array(
                    array('validator' => 'EmailAddress'
                    )
                )
            );
        $nameOptions =  array('label'=> __('Your name'));

        if($user) {

             
            $emailOptions['value'] = $user->email;
            $nameOptions['value'] = $user->name;
        }
        $topo='<br/><br/><br/><br/><h4><strong>Comente</strong></h4>';
             echo $topo;
        $this->addElement('text', 'author_name',array( 'class'=>'form-control spaceform','id'=>'pwd', 'placeholder'=>'Nome'), $nameOptions);
        $this->addElement('text', 'author_url',array( 'class'=>'form-control spaceform','id'=>'pwd', 'placeholder'=>'Site'), $urlOptions);
        $this->addElement('text', 'author_email', 
                array( 'class'=>'form-control spaceform','id'=>'pwd', 'placeholder'=>'Email'),$emailOptions
            );
        $this->addElement('textarea', 'body',
            array('class'=>'form-control', 'rows'=>'5', 'placeholder'=>'Comentário'));

        $request = Zend_Controller_Front::getInstance()->getRequest();
        $params = $request->getParams();

        $record_id = $this->_getRecordId($params);
        $record_type = $this->_getRecordType($params);

        $this->addElement('hidden', 'record_id', array('value'=>$record_id, 'decorators'=>array('ViewHelper') ));
        $this->addElement('hidden', 'path', array('value'=>  $request->getPathInfo(), 'decorators'=>array('ViewHelper')));
        if(isset($params['module'])) {
            $this->addElement('hidden', 'module', array('value'=>$params['module'], 'decorators'=>array('ViewHelper')));
        }
        $this->addElement('hidden', 'record_type', array('value'=>$record_type, 'decorators'=>array('ViewHelper')));
        $this->addElement('hidden', 'parent_comment_id', array('id'=>'parent-id', 'value'=>null, 'decorators'=>array('ViewHelper'),'class'=>'form-control', 'rows'=>'5', 'placeholder'=>'Comentário'));
        fire_plugin_hook('commenting_form', array('comment_form' => $this) );
        $this->addElement('submit', 'submit', array('label'=>__('Submit'),'class'=>'btn btn-default'));
    }


    private function _getRecordId($params)
    {
        if(isset($params['module'])) {
            switch($params['module']) {
                case 'exhibit-builder':
                    //ExhibitBuilder uses slugs in the params, so need to negotiate around those
                    //to dig up the record_id and model
                    if(!empty($params['page_slug_1'])) {
                        $page = get_current_record('exhibit_page', false);
                        $id = $page->id;
                    } else if(!empty($params['item_id'])) {
                        $id = $params['item_id'];
                    } else {
//todo: check the ifs for an exhibit showing an item
                    }
                    break;

                default:
                    $id = $params['id'];
                    break;
            }
        } else {
            $id = $params['id'];
        }
        return $id;


    }

    private function _getRecordType($params)
    {
        if(isset($params['module'])) {
            switch($params['module']) {
                case 'exhibit-builder':
                    //ExhibitBuilder uses slugs in the params, so need to negotiate around those
                    //to dig up the record_id and model
                    if(!empty($params['page_slug_1'])) {
                        $page = get_current_record('exhibit_page', false);
                        $model = 'ExhibitPage';
                    } else if(!empty($params['item_id'])) {
                        $model = 'Item';
                    } else {
//TODO: check for other possibilities
                    }
                    break;

                default:
                    $model = Inflector::camelize($params['module']) . ucfirst( $params['controller'] );
                    break;
            }
        } else {
            $model = ucfirst(Inflector::singularize($params['controller']));
        }
        return $model;
    }

}