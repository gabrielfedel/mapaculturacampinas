 <link rel="stylesheet" type="text/css" href="<?php
     /* Import Styles for the CC License Chooser */
     echo css_src('creative-commons-chooser');
 ?>">
<fieldset id="fieldset-creative-commons-chooser">
    <div class="field">
        <div class="two columns alpha">
        </div>
        <div class='inputs five columns omega'>
            <!-- <form id="cc_js_seed_container"> -->
                <input type="hidden" id="cc_js_seed_uri" value="<?php echo get_option('creativecommonschooser_default_license_uri') ?>" />
            <!-- </form> -->
            <div id="cc_widget_container" style='display:block;clear:both;'>
                <script type="text/javascript" src="http://api.creativecommons.org/jswidget/tags/0.97/complete.js?locale=en_US"></script>
            </div>
        </div>
    </div>
</fieldset>
