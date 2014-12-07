<?php echo js_tag('vendor/tiny_mce/tiny_mce'); ?>
<script type="text/javascript">
jQuery(window).load(function () {
  Omeka.wysiwyg({
    mode: 'specific_textareas',
    editor_selector: 'html-editor'
  });
});
</script>

<?php 
$page_path  = get_option('honor_thy_contributors_page_path');
$page_title = get_option('honor_thy_contributors_page_title');
$pre_text   = get_option('honor_thy_contributors_pre_text');
$post_text  = get_option('honor_thy_contributors_post_text');
$element_id = get_option('honor_thy_contributors_element_id');
$view       = get_view();
?>

<div class="field">
  <div class="two columns alpha">
    <?php echo $view->formLabel('page_path', 'Page path'); ?>
  </div>
  <div class="inputs five columns omega">
    <div class="input-block">
      <?php echo $view->formText('page_path', $page_path, array('class' => 'textinput')); ?>
      <p class="explanation">
        The path to the page listing the contributors. For example, if your site is hosted at <code>http://my-omeka-site.org/</code>, and the value of this field is <code>contributors/</code>, then your page will be displayed at <code>http://my-omeka-site.org/contributors/</code>.
      </p>
    </div>
  </div>
</div>

<div class="field">
  <div class="two columns alpha">
    <?php echo $view->formLabel('page_title', 'Page title'); ?>
  </div>
  <div class="inputs five columns omega">
    <div class="input-block">
      <?php echo $view->formText('page_title', $page_title, array('class' => 'textinput')); ?>
      <p class="explanation">
        The title that will display on the contributors page and in the main site navigation.
      </p>
    </div>
  </div>
</div>

<div class="field">
  <div class="two columns alpha">
    <?php echo $view->formLabel('pre_text', 'Pre display text'); ?>
  </div>
  <div class="inputs five columns omega">
    <div class="input-block">
      <?php echo $view->formTextarea('pre_text', $pre_text, array('class' => 'textinput', 'rows' => '8')); ?>
      <p class="explanation">
        The text that will display before the table of contributors. You may use basic HTML.
      </p>
    </div>
  </div>
</div>

<div class="field">
  <div class="two columns alpha">
    <?php echo $view->formLabel('post_text', 'Post display text'); ?>
  </div>
  <div class="inputs five columns omega">
    <div class="input-block">
      <?php echo $view->formTextarea('post_text', $post_text, array('class' => 'textinput', 'rows' => '8')); ?>
      <p class="explanation">
        The text that will display after the table of contributors. You may use basic HTML.
      </p>
    </div>
  </div>
</div>

<div class="field">
  <div class="two columns alpha">
    <?php echo $view->formLabel('', 'Element ID'); ?>
  </div>
  <div class="inputs five columns omega">
    <div class="input-block">
      <?php echo $view->formText('element_id', $element_id, array('class' => 
'textinput', 'rows' => '8')); ?>
      <p class="explanation">
        The ID (e.g., 37) of the element text that should be used to identify 
contributors.
      </p>
    </div>
  </div>
</div>

