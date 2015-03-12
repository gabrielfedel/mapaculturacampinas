<?php if (empty($divId)): ?>
<style type="text/css" media="screen">
    #cc_license {
        text-align: left;
        margin: auto;
    }
    div.cc_info {
        text-align: left;
    }
    a.cc_js_a {
        padding-bottom: 1em;
    }
</style>
<?php else: ?>
<style type="text/css" media="screen">
    #<?php echo $divId; ?> {
        width: <?php echo empty($width) ? 'auto' : $width . 'px'; ?>;
        border: 1px solid #c2e0cf;
        padding: 1%;
        text-align: center;
        margin-bottom: 2.7%;
    }
    #cc_license {
        text-align: center;
        margin: auto;
    }
    div.cc_info {
        text-align: center;
        margin: auto;
    }
</style>
<div id="<?php echo $divId; ?>" style="display: block;">
<?php endif; ?>
<!-- Creative Commonts License -->
<div id="cc_license">
    <?php if (isset($title) && $title === true): ?>
    <h3><?php echo __('License'); ?></h3>
    <?php endif; ?>
    <?php if (empty($display) || $display != 'text'): ?>
    <a href="<?php echo $cc->cc_uri; ?>" rel="license" class="cc_js_a">
        <img width="88" height="31" border="0" class="cc_js_cc-button" src="<?php echo $cc->cc_img; ?>" alt="Creative Commons License"/>
    </a>
    <?php endif; ?>
    <?php if (isset($display) && $display != 'image'): ?>
    <div class="cc_info"><?php echo __('This work is licensed under a %s.', '<a href="' . $cc->cc_uri . '" rel="license">' . $cc->cc_name . '</a>'); ?></div>
    <?php endif; ?>
</div>
<?php if (!empty($divId)): ?>
</div>
<?php endif; ?>
