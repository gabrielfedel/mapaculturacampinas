// <![CDATA[
/**
 * Creative Commons has made the contents of this file
 * available under a CC-GNU-GPL license:
 *
 * http://creativecommons.org/licenses/GPL/2.0/
 *
 * A copy of the full license can be found as part of this
 * distribution in the file COPYING.
 *
 * You may use this software in accordance with the
 * terms of that license. You agree that you are solely 
 * responsible for your use of this software and you
 * represent and warrant to Creative Commons that your use
 * of this software will comply with the CC-GNU-GPL.
 *
 * $Id: $
 *
 * Copyright 2006, Creative Commons, www.creativecommons.org.
 *
 * This is code that is used to generate licenses.
 *
 */

function cc_js_$F(id) {
	if (cc_js_$(id)) {
		return cc_js_$(id).value;
	}
	return null; // if we can't find the form element, pretend it has no contents
}

function cc_js_$(id) {
    return document.getElementById("cc_js_" + id);
}

/* Inspired by Django.  Thanks, guys.
 * http://code.djangoproject.com/browser/django/trunk/django/views/i18n.py
 * Our use of gettext is incomplete, so I'm just grabbing the one function.
 * And I've modified it, anyway.
 * Here is their license - it applies only to the following function:
Copyright (c) 2005, the Lawrence Journal-World
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, 
       this list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above copyright 
       notice, this list of conditions and the following disclaimer in the
       documentation and/or other materials provided with the distribution.

    3. Neither the name of Django nor the names of its contributors may be used
       to endorse or promote products derived from this software without
       specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
function cc_js_gettext_style_interpolate(fmt, obj) {
  return fmt.replace(/\${\w+}/g, function(match){return String(obj[match.slice(2,-1)])});
}
// <![CDATA[
/**
 * Creative Commons has made the contents of this file
 * available under a CC-GNU-GPL license:
 *
 * http://creativecommons.org/licenses/GPL/2.0/
 *
 * A copy of the full license can be found as part of this
 * distribution in the file COPYING.
 *
 * You may use this software in accordance with the
 * terms of that license. You agree that you are solely
 * responsible for your use of this software and you
 * represent and warrant to Creative Commons that your use
 * of this software will comply with the CC-GNU-GPL.
 *
 * $Id: $
 *
 * Copyright 2007, Creative Commons, www.creativecommons.org.
 * @author Asheesh Laroia <asheesh@asheesh.org>
 *
 * This is code to let Safari uses click on labels and end up with
 * check marks in checkboxes.
 */

function cc_js_call_me_on_label_selection(element) {
    // If we are not Safari, get out of here.
    // Note that even Konqueror doesn't need this fix.
    if (navigator.userAgent.indexOf('Safari') < 0) {
    	return;
    }
    // Otherwise, I guess someone clicked on the label called element
    // and I should click an associated checkbox.
    var find_this_id = element.htmlFor;
    find_this_id = find_this_id.substring('cc_js_'.length()); // remove leading cc_js_ 
    var check_me = cc_js_$(find_this_id);
    if (check_me === null) {
	return; // if there's nothing to check, that's odd but we're
		// not gonna do anything about it
    }
    
    check_me.focus();
    if (check_me.getAttribute('type') == 'checkbox') {
	if (!check_me.checked) {
	    check_me.checked = true;
	} else {
	    check_me.checked = false;
	}
    }

    cc_js_modify();
}

// ]]>
// <!--
/**
 * Creative Commons has made the contents of this file
 * available under a CC-GNU-GPL license:
 *
 * http://creativecommons.org/licenses/GPL/2.0/
 *
 * A copy of the full license can be found as part of this
 * distribution in the file COPYING.
 *
 * You may use this software in accordance with the
 * terms of that license. You agree that you are solely 
 * responsible for your use of this software and you
 * represent and warrant to Creative Commons that your use
 * of this software will comply with the CC-GNU-GPL.
 *
 * $Id: $
 *
 * Copyright 2005-2006, Creative Commons, www.creativecommons.org.
 *
 * cc-tooltip.js
 *
 * This is a quick javascript to generate g_tooltips. Put this script in the
 * head or somewhere. Just make sure to call init_tip() first.
 *
 * Need to make sure to also add this to your html somewhere:
 * <div id="tip_cloak" style="position:absolute; visibility:hidden; z-index:100">hidden tip</div>
 *
 */

/* Browser specific checks */
var cc_js_g_dom   = (document.getElementById) ? true : false;

/* If it's IE, handle it specially. */

var cc_js_g_ie5   = ((navigator.userAgent.indexOf("MSIE")>-1) && cc_js_g_dom) ? 
              true : false;

/* Otherwise, just pretend everyone's greater than or equal to
 * Netscape 5.
 *
 * Probably a reasonable guess.
 */

var cc_js_g_ns5   = ! cc_js_g_ie5;

/*
 * And everyone gets the dyn stuff, 'cause like, why not?
 */

var cc_ns_g_nodyn = false;

// NOTE: This avoids older error event in older browsers.
if (cc_ns_g_nodyn) { event = "no"; }

/* GLOBAL VARIABLES have a g_ prefix for var names */

var cc_js_g_follow_mouse  = false;// if true then tip follows mouse
var cc_js_tip_width           = 175;  // the generic width of a tip
var cc_js_g_off_x             = 20;   // x-offset for tip
var cc_js_g_off_y             = 10;   // y-offset for tip
var cc_js_g_popup_timeout     = 500;  // popup timeout
var cc_js_g_tooltip, cc_js_g_tipcss;        // globals for tooltip and tip css
var cc_js_g_timeout1, cc_js_g_timeout2;     // for setting timeouts
var cc_js_g_tip_on            = false;// check if over tooltip over link
var cc_js_g_mouse_x, cc_js_g_mouse_y;       // track the mouse coordinates

function cc_js_initTip() { init_tip(); }
/**
 * This initializes the cc_js_g_tooltip code. cc_js_g_tooltip is a global variable. Also
 * this sets up mouse tracking with cc_js_g_follow_mouse if set to true.
 */
function cc_js_init_tip() {
    if (cc_ns_g_nodyn) { return; }
    cc_js_g_tooltip   = cc_js_$('tip_cloak');
    cc_js_g_tipcss    = cc_js_g_tooltip.style;
    
    if (cc_js_g_tooltip && cc_js_g_follow_mouse) {
        document.onmousemove = track_mouse;
    }
}

/**
 * This build the tooltip and makes it visible..
 */
function cc_js_on_tooltip(evt, img) {
    if (!cc_js_g_tooltip) { return; }
    if (cc_js_g_timeout1) { clearTimeout(cc_js_g_timeout1); }   
    if (cc_js_g_timeout2) { clearTimeout(cc_js_g_timeout2); }
    cc_js_g_tip_on = true;
    
    var tip = '<div class="cc_js_tooltipimage"><img src="' + img + 
              '" border="0"/></div>';
    cc_js_g_tooltip.innerHTML = tip;

    if (!cc_js_g_follow_mouse) cc_js_position_tip(evt);
    else { cc_js_g_timeout1 = setTimeout("cc_js_g_tipcss.visibility='visible'", 
                                 cc_js_g_popup_timeout); }
}

/**
 * This is a generic cc_js_g_tooltip for displaying any html inside of a box.
 */
function cc_js_on_tooltip_html(evt, html) {
    if (!cc_js_g_tooltip) { return; }
    if (cc_js_g_timeout1) { clearTimeout(cc_js_g_timeout1); }   
    if (cc_js_g_timeout2) { clearTimeout(cc_js_g_timeout2); }
    cc_js_g_tip_on = true;
    
    var tip = '<div class="cc_js_tooltip">' + html + '</div>';
    cc_js_g_tooltip.innerHTML = tip;

    if (!cc_js_g_follow_mouse)  {
        cc_js_position_tip(evt);
    } else  {
        cc_js_g_timeout1 = setTimeout("cc_js_g_tipcss.visibility='visible'", 
                                cc_js_g_popup_timeout);
    }
}

function cc_js_track_mouse(evt) {
    cc_js_g_mouse_x = (cc_js_g_ns5) ? evt.pageX : 
                          window.event.clientX + document.body.scrollLeft;
    cc_js_g_mouse_y = (cc_js_g_ns5) ? evt.pageY : 
                          window.event.clientY + document.body.scrollTop;
    if (cc_js_g_tip_on) { cc_js_position_tip(evt); }
}

/**
 * This function cc_js_positions the tooltip.
 */
function cc_js_position_tip(evt) {
    if (!cc_js_g_follow_mouse) {
        cc_js_g_mouse_x = (cc_js_g_ns5)? evt.pageX : window.event.clientX + 
                    document.body.scrollLeft;
        cc_js_g_mouse_y = (cc_js_g_ns5)? evt.pageY : window.event.clientY + 
                    document.body.scrollTop;
    }
    // tooltip width and height
    var tpWd = (cc_js_g_ie5)? cc_js_g_tooltip.clientWidth : cc_js_g_tooltip.offsetWidth;
    var tpHt = (cc_js_g_ie5)? cc_js_g_tooltip.clientHeight : cc_js_g_tooltip.offsetHeight;
    // document area in view (subtract scrollbar width for ns)
    var winWd = (cc_js_g_ns5)? window.innerWidth - 20 + 
                window.pageXOffset : document.body.clientWidth + 
                                     document.body.scrollLeft;
    var winHt = (cc_js_g_ns5)? window.innerHeight - 20 + window.pageYOffset : 
                document.body.clientHeight + document.body.scrollTop;
    // check mouse position against tip and window dimensions
    // and position the cc_js_g_tooltip 
    if ((cc_js_g_mouse_x + cc_js_g_off_x + tpWd) > winWd) {
        cc_js_g_tipcss.left = cc_js_g_mouse_x - (tpWd + cc_js_g_off_x) + "px";
    } else { cc_js_g_tipcss.left = cc_js_g_mouse_x + cc_js_g_off_x + "px"; }
    if ((cc_js_g_mouse_y + cc_js_g_off_y + tpHt) > winHt)  {
        cc_js_g_tipcss.top = winHt - (tpHt + cc_js_g_off_y) + "px";
    } else { cc_js_g_tipcss.top = cc_js_g_mouse_y + cc_js_g_off_y + "px"; }
    if (!cc_js_g_follow_mouse)  {
        cc_js_g_timeout1 = setTimeout("cc_js_g_tipcss.visibility='visible'", 
                                cc_js_g_popup_timeout);
    }
}

/**
 * Hides the tooltip.
 */
function cc_js_hide_tip() {
    if (!cc_js_g_tooltip) { return; }
    cc_js_g_timeout2 = setTimeout("cc_js_g_tipcss.visibility='hidden'", cc_js_g_popup_timeout);
    cc_js_g_tip_on = false;
}

//-->
// <![CDATA[
/**
 * Creative Commons has made the contents of this file
 * available under a CC-GNU-GPL license:
 *
 * http://creativecommons.org/licenses/GPL/2.0/
 *
 * A copy of the full license can be found as part of this
 * distribution in the file COPYING.
 *
 * You may use this software in accordance with the
 * terms of that license. You agree that you are solely 
 * responsible for your use of this software and you
 * represent and warrant to Creative Commons that your use
 * of this software will comply with the CC-GNU-GPL.
 *
 * $Id: $
 *
 * Copyright 2006, Creative Commons, www.creativecommons.org.
 *
 * This is code to deal with jurisdictions.
 */

var cc_js_default_version_number = '2.5';
var cc_js_jurisdictions_array = 










/* 8---< CUT HERE >----8 */
{"ch":{"version":"2.5","name":"Switzerland"},"co":{"version":"2.5","name":"Colombia"},"cn":{"version":"2.5","name":"China Mainland"},"cl":{"version":"2.0","name":"Chile"},"ca":{"version":"2.5","name":"Canada"},"it":{"version":"2.5","name":"Italy"},"ec":{"version":"3.0","name":"Ecuador"},"cz":{"version":"3.0","name":"Czech Republic"},"ar":{"version":"2.5","name":"Argentina"},"au":{"version":"2.5","name":"Australia"},"at":{"version":"3.0","name":"Austria"},"in":{"version":"2.5","name":"India"},"es":{"version":"3.0","name":"Spain"},"gr":{"version":"3.0","name":"Greece"},"pr":{"version":"3.0","name":"Puerto Rico"},"nl":{"version":"3.0","name":"Netherlands"},"us":{"version":"3.0","name":"United States"},"pt":{"version":"2.5","name":"Portugal"},"mt":{"version":"2.5","name":"Malta"},"generic":{"generic":true,"version":"3.0","name":"Unported","sampling":"1.0"},"tw":{"version":"2.5","name":"Taiwan","sampling":"1.0"},"scotland":{"version":"2.5","name":"UK: Scotland"},"nz":{"version":"3.0","name":"New Zealand"},"lu":{"version":"3.0","name":"Luxembourg"},"gt":{"version":"3.0","name":"Guatemala"},"th":{"version":"3.0","name":"Thailand"},"pe":{"version":"2.5","name":"Peru"},"ph":{"version":"3.0","name":"Philippines"},"ro":{"version":"3.0","name":"Romania"},"pl":{"version":"2.5","name":"Poland"},"be":{"version":"2.0","name":"Belgium"},"fr":{"version":"2.0","name":"France"},"bg":{"version":"2.5","name":"Bulgaria"},"dk":{"version":"2.5","name":"Denmark"},"hr":{"version":"3.0","name":"Croatia"},"de":{"version":"3.0","name":"Germany","sampling":"1.0"},"jp":{"version":"2.1","name":"Japan"},"hu":{"version":"2.5","name":"Hungary"},"za":{"version":"2.5","name":"South Africa"},"hk":{"version":"3.0","name":"Hong Kong"},"no":{"version":"3.0","name":"Norway"},"br":{"version":"2.5","name":"Brazil","sampling":"1.0"},"fi":{"version":"1.0","name":"Finland"},"sg":{"version":"3.0","name":"Singapore"},"rs":{"version":"3.0","name":"Serbia"},"mk":{"version":"2.5","name":"Macedonia"},"kr":{"version":"2.0","name":"Korea"},"si":{"version":"2.5","name":"Slovenia"},"uk":{"version":"2.0","name":"UK: England & Wales"},"my":{"version":"2.5","name":"Malaysia"},"mx":{"version":"2.5","name":"Mexico"},"se":{"version":"2.5","name":"Sweden"},"il":{"version":"2.5","name":"Israel"}}
/* --------------- FOLD HERE ---------------- */










;

/**
 * Insert tab A into slot B.
 */

// ]]>
// <![CDATA[
/**
 * Creative Commons has made the contents of this file
 * available under a CC-GNU-GPL license:
 *
 * http://creativecommons.org/licenses/GPL/2.0/
 *
 * A copy of the full license can be found as part of this
 * distribution in the file COPYING.
 *
 * You may use this software in accordance with the
 * terms of that license. You agree that you are solely 
 * responsible for your use of this software and you
 * represent and warrant to Creative Commons that your use
 * of this software will comply with the CC-GNU-GPL.
 *
 * $Id: $
 *
 * Copyright 2006, Creative Commons, www.creativecommons.org.
 *
 * This is code that is used to generate licenses.
 *
 */

var cc_js_secret_license_url;
var cc_js_secret_disabled = [];

function cc_js_disable_widget() {
	message = cc_js_t('No license chosen');
	/* Clear the form fields out */
	/* save the license URL, the rest will be calculated from that */
	if (cc_js_license_array && 'url' in cc_js_license_array) {
		cc_js_secret_license_url = cc_js_license_array['url'];
		cc_js_license_array['url'] = '';
		cc_js_license_array['text'] = message;
	}
	cc_js_$('result_name').value = message;
	cc_js_secret_disabled = [];
	cc_js_$('result_uri').value = '';
	cc_js_$('result_img').value = '';
	// FIXME: localize below
	cc_js_insert_html(message, 'license_example');
	var boxes = ['remix', 'nc', 'sa'];
	for (var box_num = 0 ; box_num < boxes.length ; box_num++ ) { 
		box = boxes[box_num];
		if (cc_js_$(box).disabled == false) {
			cc_js_option_off(box);
			cc_js_secret_disabled.push(box);
		}
	}
	if (cc_js_$('jurisdiction')) {
		cc_js_$('jurisdiction').disabled = true;
	}
}

function cc_js_enable_widget() {
	/* restore the secret license URL, or if it's blank, the seed, or if that's blank, by 3.0 */
	for (var box_num = 0 ; box_num < cc_js_secret_disabled.length ; box_num++) {
		box = cc_js_secret_disabled[box_num];
		cc_js_option_on(box);
	}
	if (cc_js_$('jurisdiction')) {
		cc_js_$('jurisdiction').disabled = false;
	}
	cc_js_secret_disabled = [];
	cc_js_init();
}

// NOTE we have the object freedoms for dealing with freedom style choosing
var cc_js_share, cc_js_remix, cc_js_nc, cc_js_sa;

var cc_js_reset_jurisdiction_array = false;
var cc_js_default_jurisdiction = 'generic'; // the seed may change this

/**
 * cc_js_license_array is an array of our license options from global
 * variables...scary!
 * 
 * Here is what we are putting in this (its basically an object):
 *
 * cc_js_license_array['code'] = '';
 * cc_js_license_array['version'] = '';
 * cc_js_license_array['full_name'] = ''; // 'name' is reserved
 * cc_js_license_array['text'] = ''; cc_js_license_array['img'] = '';
 * cc_js_license_array['jurisdiction'] = '';
 * cc_js_license_array['generic'] = '';
*/
var cc_js_license_array;

var cc_js_license_root_url        = 'http://creativecommons.org/licenses';

var cc_js_warning_text            = '';

/**
 * Initialise our license codes, and reset the UI
 */
function cc_js_init() {
    /* default: by */
    
    
    cc_js_share = true;
    cc_js_remix = true;
    cc_js_nc    = false;
    cc_js_sa    = false;
    if ( cc_js_$("share") && cc_js_$("remix") ) {
	cc_js_$("share").checked = true;
	cc_js_$("remix").checked = true;
    }
    
    
    
    // But if there's a hidden form field telling us what to do,
    // then by Jove let's do that!
    cc_js_license_array = new Array();
    if (cc_js_$('seed_uri')) {
	cc_js_secret_license_url = cc_js_$F('seed_uri');
    }
    if (cc_js_secret_license_url) {
	cc_js_license_url_to_attributes(cc_js_secret_license_url);
    }
    
    else {
	// Otherwise, init this from scratch
	cc_js_modify(this);
    }
    
    
}

/**
 * TODO: Something here is broken! Please fix so we are really
 * getting the classnames!
 */
function cc_js_option_on (option) {
    var short_label_name = option + '-label';
    var label_name = 'cc_js_' + short_label_name;
    
    cc_js_$(option).disabled = false;
    
    if (option != 'share')  {
	cc_js_$(short_label_name).style.color = 'black';
    }
}

function cc_js_option_off (option) {
    var short_label_name = option + '-label';
    var label_name = 'cc_js_' + short_label_name;

    /** Commented-out code is removed because we have no share checkbox.
    	if ( cc_js_$(label_name).className )
	//    share_label_orig_class[label_name] = cc_js_$(label_name).className;
	
	//share_label_orig_color[label_name] = cc_js_$(label_name).style.color;
    */
    
    cc_js_$(option).disabled = true;
    cc_js_$(option).checked = false;
    cc_js_$(short_label_name).style.color = 'gray';
}

function cc_js_update_checkboxes_based_on_variables() {
    cc_js_$('share').checked = cc_js_share;
    cc_js_$('remix').checked = cc_js_remix;
    cc_js_$('nc').checked = cc_js_nc;
    cc_js_$('sa').checked = cc_js_sa;
}

function cc_js_update_variables_based_on_checkboxes() {	
    cc_js_share = cc_js_$('share').checked;
    cc_js_remix = cc_js_$('remix').checked;
    cc_js_nc = cc_js_$('nc').checked;
    cc_js_sa = cc_js_$('sa').checked;
}

/**
 * Main logic
 * Checks what the user pressed, sets licensing options based on it.
 */
function cc_js_modify(obj) {
    cc_js_warning_text = '';
    
    
    if ( cc_js_reset_jurisdiction_array ) {
	cc_js_reset_jurisdiction_list();
	cc_js_reset_jurisdiction_array = false;
    }
    
    cc_js_update_variables_based_on_checkboxes();
    cc_js_rest_of_modify();
}

function cc_js_rest_of_modify() {
    if ( cc_js_share && cc_js_remix ) {
	cc_js_option_on('share');
	cc_js_option_on('remix');
	cc_js_option_on('nc');
	cc_js_option_on('sa');
	
    } else if ( cc_js_share && !cc_js_remix ) {
	cc_js_option_on('share');
	cc_js_option_on('remix');
	cc_js_option_on('nc');
	cc_js_option_off('sa');
    } else if ( !cc_js_share && cc_js_remix ) {
	cc_js_option_on('share');
	cc_js_option_on('remix');
	cc_js_option_off('nc');
	cc_js_option_off('sa');
	
	// This next little block checks to see which 
	// jurisdictions support sampling and hides the ones
	// that don't
	// OH! You have to convert a list to an array object...
	var jurisdiction_options = cc_js_$('jurisdiction').options;
	for (var i = 0 ; i < jurisdiction_options.length; i++) {
		item = jurisdiction_options[i];
		if (item.value in cc_js_jurisdictions_array) {
		    if ('sampling' in cc_js_jurisdictions_array[item.value]) {
			if ( ! cc_js_jurisdictions_array[ item.value ]['sampling'] )
			    item.style.display = 'none';
		    }
		}
	    }
	
	cc_js_reset_jurisdiction_array = true;
	
    } else {
	// This is when nothing is selected
	cc_js_option_on('share');
	cc_js_option_on('remix');
	cc_js_option_off('nc');
	cc_js_option_off('sa');
    }
    
    // in this hacked version, it just calls update_hack direct
    cc_js_build_license_details();
    
    // Plus, update the hidden form fields with the name and uri
    cc_js_$('result_uri').value = cc_js_license_array['url'];
    cc_js_$('result_img').value = cc_js_license_array['img'];
    // FIXME: Is this the right way to localize?
    cc_js_$('result_name').value = 'Creative Commons ' + cc_js_license_array['full_name'] + ' ' + cc_js_license_array['version'] + ' ' + cc_js_t(cc_js_license_array['jurisdiction']);
}

/**
 * This resets the jurisdiction selection menu options' styles
 */
function cc_js_reset_jurisdiction_list ()
{
    var jurisdiction_options = cc_js_$('jurisdiction').options;
    for (var i = 0 ; i < jurisdiction_options.length; i++) {
	item = jurisdiction_options[i];
            item.style.display = 'block';
    }
    
}

function cc_js_position() {
    var pos = document.getElementsByName('pos');
    
    for (i = 0; i < pos.length; i++) {
	if ((pos[i].value == "floating") && (pos[i].checked)) return "position: fixed;";
    }
    return "margin-top:20px;";
}

function cc_js_license_url_to_attributes(url) {
    // this is not specified to work with sampling licenses
    // First assert that the root URL is at the start
    
    // This could be cleaned up a little.
    if (url.substr(0, cc_js_license_root_url.length) != cc_js_license_root_url) {
	return;
    }
    var remainder = url.substr(cc_js_license_root_url.length);
    
    if (remainder.substr(0, 1) != "/") {
	return;
    }
    remainder = remainder.substr(1);
    var parts = remainder.split("/");
    cc_js_set_attribs(parts[0]);
    if (parts.length > 1) {
	cc_js_set_version(parts[1]);
    }
    if (parts.length > 2) {
	cc_js_set_jurisdiction(parts[2]);
    }
    cc_js_rest_of_modify();
    if (parts[1] != cc_js_license_array['version']) {
	// if the versions are different, tell the user we upgraded his
	// license to the most recent license available for that jurisdiction
	var strong_warning = document.createElement('strong');
	
	if (cc_js_license_array['jurisdiction'] != "") {
	    // if they selected a jurisdiction:
	    strong_warning.appendChild(document.createTextNode(cc_js_t('We have updated the version of your license to the most recent one available in your jurisdiction.')));
	} else {
	    // if they selected no jurisdiction:
	    strong_warning.appendChild(document.createTextNode(cc_js_t('We have updated the version of your license to the most recent one available.')));
	}
	
	cc_js_$('license_example').appendChild(strong_warning);
    }
}

function cc_js_set_attribs(attrs) {
    var attrs_ra = attrs.split("-");
    for (var i = 0 ; i < attrs_ra.length; i++) {
	attr = attrs_ra[i];
	    if (attr == 'sa') {
		cc_js_share = true;
		cc_js_sa = true;
	    }
	    else if (attr == 'nc') {
		cc_js_nc = true;
	    }
	    else if (attr == 'nd') {
		cc_js_remix = false;
		cc_js_sa = false;
	    }
	}
    cc_js_update_checkboxes_based_on_variables();
}

function cc_js_set_version(ver) {
    // I do set the 'version', but during sanity-checking it is
    // overwritten by the latest version for the jurisdiction.  If
    // these disagree, we do alert the user.
    cc_js_license_array['version'] = ver;
}

function cc_js_set_jurisdiction(juri) {
    var juri_select = cc_js_$('jurisdiction');
    if (juri_select) {
		alert(juri_select.childNodes.length);
	for (var i = 0 ; i < juri_select.childNodes.length; i++) {
	    var kid = juri_select.childNodes[i];
	    if (kid.value == juri) {
		kid.selected = 'selected';
	    }
	    else {
		kid.selected = '';
	    }
	}
    }
    // even if there is no jurisdiction selector,
    // we update the state
    cc_js_default_jurisdiction = juri;

}


function cc_js_build_license_url ()
{
    var license_url = cc_js_license_root_url + "/" + cc_js_license_array['code'] + 
	"/" + cc_js_license_array['version'] + "/" ;
    if ( cc_js_current_short_license_code(false)) {
        license_url += cc_js_current_short_license_code(true);
    }    
    cc_js_license_array['url'] = license_url;
}

/**
 * Builds the nicely formatted test about the work
 */
function cc_js_build_license_text ()
{
    var license_text     = '';
    var work_title       = '';
    var work_by          = '';
    var namespaces_array = new Array();
    
    var use_namespace_dc = false;
    var use_namespace_cc = false;
    
    var info_format_text = '';
    
    // I had to put this big try block around all the
    // prototype.js attempts to access nonexistent form fields...
    
    // The main bit of text including or not, jurisdiction love
    license_text_before_interpolation = cc_js_t("This ${work_type} is licensed under a <a rel=\"license\" href=\"${license_url}\">Creative Commons ${license_name} License</a>.");
    license_text = cc_js_gettext_style_interpolate(license_text_before_interpolation, {'work_type': cc_js_t('work'), 'license_url': cc_js_license_array['url'], 'license_name': (cc_js_license_array['full_name'] + ' ' + cc_js_license_array['jurisdiction'] + ' ' + cc_js_license_array['version'])});

    var namespace_text = '';
    if ( use_namespace_cc )
	{ namespaces_array.push('xmlns:cc="http://creativecommons.org/ns#"'); }
    
    if ( use_namespace_dc )
	{ namespaces_array.push('xmlns:dc="http://purl.org/dc/elements/1.1/"'); }
    if ( namespaces_array.length > 0 ) {
	namespace_text = '<span';
        for (var i = 0 ; i < namespaces_array.length; i++) {
		ns = namespaces_array[i];
                namespace_text += ' ' + ns;
	}
	namespace_text += '>';
	
	license_text = namespace_text + license_text + '</span>';
    }
    
    
    
    
    // set the array container here
    cc_js_license_array['text'] = license_text;
}

function cc_js_current_short_license_code(slash) {
	ret = ''
	if (cc_js_$('jurisdiction') && cc_js_$F('jurisdiction') != 'generic') {
		ret = cc_js_$F('jurisdiction');
	}
	else if (cc_js_default_jurisdiction == 'generic') {
		return ''; // even if slashed
	}
	else {
		ret = cc_js_default_jurisdiction;
	}
	if (slash) {
		ret = ret + '/';
	}
	return ret;
}

function cc_js_build_license_image ()
{
    cc_js_license_array['img'] = 
	'http://i.creativecommons.org/l/' + cc_js_license_array['code'] + 
	"/" + cc_js_license_array['version'] + "/" + 
	cc_js_current_short_license_code(true) + 
	'88x31.png';
}

/**
 * Builds the jurisdictions and sets things up properly...
 */
function cc_js_build_jurisdictions ()
{
    
    
    // TODO: The following is not working in internet explorer on wine
    
    // THIS fixes the generic being the default selection...
    var current_jurisdiction = '';
    
    if ( cc_js_$F('jurisdiction') )
	current_jurisdiction = cc_js_$F('jurisdiction');
    else
	current_jurisdiction = cc_js_default_jurisdiction;
    
    cc_js_license_array['jurisdiction'] = 
	cc_js_jurisdictions_array[current_jurisdiction]['name'];
    cc_js_license_array['generic'] = 
	cc_js_jurisdictions_array[current_jurisdiction]['generic'];
    
    cc_js_license_array['sampling'] = 
	cc_js_jurisdictions_array[current_jurisdiction]['sampling'];
    
    // NOTE: This is all a bit hacky to get around that there are
    // only 2 customized jurisdictions with sampling licenses
    // If current jurisdiction doesn't have, then we just set
    // to generic sampling...cool?
    if ( cc_js_license_array['code'] == 'sampling' ) {
	if ( cc_js_jurisdictions_array[current_jurisdiction]['sampling'] ) {  
	    cc_js_license_array['version'] = 
		cc_js_jurisdictions_array[current_jurisdiction]['sampling'];
	} else {
	    cc_js_license_array['version'] =
		cc_js_jurisdictions_array['generic']['sampling'];
	    cc_js_license_array['generic'] = true;
	}
    } else
	cc_js_license_array['version'] = 
	    cc_js_jurisdictions_array[current_jurisdiction]['version'];
    
    
    if ( ! cc_js_license_array['version'] )
	cc_js_license_array['version'] = cc_js_default_version_number;
}

function cc_js_no_license_selection () {
    cc_js_$('license_selected').style.display = 'none';
}

function cc_js_some_license_selection () {
    cc_js_$('license_selected').style.display = 'block';
}

function cc_js_build_license_details ()
{
    cc_js_some_license_selection(); // This is purely cosmetic.
    
    if (!cc_js_share) {
	if (!cc_js_remix) {
	    cc_js_no_license_selection();
	    return;
	} else {
	    cc_js_update_hack('sampling', '1.0', 'Sampling', 'Remix');
	}
    } else {
	if (!cc_js_remix) {
	    if (cc_js_nc) {
		cc_js_update_hack('by-nc-nd', '2.5', 
				  'Attribution-NonCommercial-NoDerivs', 
				  'Share:NC:ND');
	    } else {
		cc_js_update_hack('by-nd', '2.5', 'Attribution-NoDerivs', 
				  'Share:ND');
	    }
	} else {
	    if (cc_js_nc) {
		if (cc_js_sa) {
		    cc_js_update_hack('by-nc-sa', '2.5', 
				      'Attribution-NonCommercial-ShareAlike', 
				      'Remix&Share:NC:SA');
		} else {
		    cc_js_update_hack('by-nc', '2.5', 
				      'Attribution-NonCommercial', 
				      'Remix&Share:NC');
		}
	    } else if (cc_js_sa) {
		cc_js_update_hack('by-sa', '2.5', 'Attribution-ShareAlike', 
				  'Remix&Share:SA');
	    } else {
		cc_js_update_hack('by', '2.5', 'Attribution', 'Remix&Share');
	    }
	}
    }
}

/**
 * This inserts html into an html element with the given insertion_id. 
 */
function cc_js_insert_html (output, insertion_id)
{
    cc_js_$(insertion_id).innerHTML = output;
    return true;
}

function cc_js_get_comment_code (msg)
{
    if ( ! msg )
	msg = "Creative Commonts License";
    
    return "<!-- " + msg + " -->\n";
}

/**
 * This builds our custom html license code using various refactored 
 * functions for handling all the nastiness...
 */
function cc_js_output_license_html ()
{
    var output = cc_js_get_comment_code() + '<a class="cc_js_a" rel="license" href="' + cc_js_license_array['url'] + '"><img alt="Creative Commons License" width="88" height="31" border="0" src="' + cc_js_license_array['img'] + '" class="cc_js_cc-button"/></a><div class="cc_js_cc-info">' + cc_js_license_array['text'] + '</div>';
    
    cc_js_insert_html( cc_js_warning_text + output, 'license_example');
    return output;
}

function cc_js_update_hack(code, version, full_name)
{
    cc_js_license_array = [];
    
    cc_js_license_array['code']       = code;
    cc_js_license_array['version']    = version;
    cc_js_license_array['full_name']  = full_name;
    cc_js_build_jurisdictions();
    
    old_url = cc_js_license_array['url'];

    // build_license_details();
    cc_js_build_license_url();
    new_url = cc_js_license_array['url'];
    if (old_url != new_url) {
	cc_js_build_license_text();
	cc_js_build_license_image();
	
	// our insert_html function also does some modifications on 
	var output = cc_js_output_license_html();
	if ( cc_js_$('result') )
	    cc_js_$('result').value = output;
    }
}

// ]]>
function cc_js_t(s) {
		 if (s == "Brazil") { return "Brazil"; } 
 if (s == "Canada") { return "Canada"; } 
 if (s == "Italy") { return "Italy"; } 
 if (s == "Creative Commons") { return "Creative Commons"; } 
 if (s == "Serbia") { return "Serbia"; } 
 if (s == "Malta") { return "Malta"; } 
 if (s == "France") { return "France"; } 
 if (s == "Peru") { return "Peru"; } 
 if (s == "Argentina") { return "Argentina"; } 
 if (s == "Norway") { return "Norway"; } 
 if (s == "New Zealand") { return "New Zealand"; } 
 if (s == "Ecuador") { return "Ecuador"; } 
 if (s == "Czech Republic") { return "Czech Republic"; } 
 if (s == "Israel") { return "Israel"; } 
 if (s == "Australia") { return "Australia"; } 
 if (s == "Korea") { return "Korea"; } 
 if (s == "Singapore") { return "Singapore"; } 
 if (s == "Thailand") { return "Thailand"; } 
 if (s == "South Africa") { return "South Africa"; } 
 if (s == "We have updated the version of your license to the most recent one available.") { return "We have updated the version of your license to the most recent one available."; } 
 if (s == "Slovenia") { return "Slovenia"; } 
 if (s == "Guatemala") { return "Guatemala"; } 
 if (s == "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission.") { return "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission."; } 
 if (s == "Noncommercial") { return "Noncommercial"; } 
 if (s == "Puerto Rico") { return "Puerto Rico"; } 
 if (s == "Belgium") { return "Belgium"; } 
 if (s == "Germany") { return "Germany"; } 
 if (s == "We have updated the version of your license to the most recent one available in your jurisdiction.") { return "We have updated the version of your license to the most recent one available in your jurisdiction."; } 
 if (s == "Hong Kong") { return "Hong Kong"; } 
 if (s == "Poland") { return "Poland"; } 
 if (s == "Spain") { return "Spain"; } 
 if (s == "This ${work_type} is licensed under a <a rel=\"license\" href=\"${license_url}\">Creative Commons ${license_name} License</a>.") { return "This ${work_type} is licensed under a <a rel=\"license\" href=\"${license_url}\">Creative Commons ${license_name} License</a>."; } 
 if (s == "Remix") { return "Remix"; } 
 if (s == "Netherlands") { return "Netherlands"; } 
 if (s == "UK: England & Wales") { return "UK: England & Wales"; } 
 if (s == "Chile") { return "Chile"; } 
 if (s == "Unported") { return "Unported"; } 
 if (s == "Denmark") { return "Denmark"; } 
 if (s == "Philippines") { return "Philippines"; } 
 if (s == "Finland") { return "Finland"; } 
 if (s == "Macedonia") { return "Macedonia"; } 
 if (s == "United States") { return "United States"; } 
 if (s == "Sweden") { return "Sweden"; } 
 if (s == "No license chosen") { return "No license chosen"; } 
 if (s == "Croatia") { return "Croatia"; } 
 if (s == "Luxembourg") { return "Luxembourg"; } 
 if (s == "Japan") { return "Japan"; } 
 if (s == "Switzerland") { return "Switzerland"; } 
 if (s == "UK: Scotland") { return "UK: Scotland"; } 
 if (s == "With a Creative Commons license, you keep your copyright but allow people to copy and distribute your work provided they give you credit — and only on the conditions you specify here.") { return "With a Creative Commons license, you keep your copyright but allow people to copy and distribute your work provided they give you credit — and only on the conditions you specify here."; } 
 if (s == "Taiwan") { return "Taiwan"; } 
 if (s == "If you desire a license governed by the Copyright Law of a specific jurisdiction, please select the appropriate jurisdiction.") { return "If you desire a license governed by the Copyright Law of a specific jurisdiction, please select the appropriate jurisdiction."; } 
 if (s == "Bulgaria") { return "Bulgaria"; } 
 if (s == "Romania") { return "Romania"; } 
 if (s == "Licensor permits others to make derivative works") { return "Licensor permits others to make derivative works"; } 
 if (s == "Portugal") { return "Portugal"; } 
 if (s == "Mexico") { return "Mexico"; } 
 if (s == "work") { return "work"; } 
 if (s == "India") { return "India"; } 
 if (s == "China Mainland") { return "China Mainland"; } 
 if (s == "Malaysia") { return "Malaysia"; } 
 if (s == "Austria") { return "Austria"; } 
 if (s == "Colombia") { return "Colombia"; } 
 if (s == "Greece") { return "Greece"; } 
 if (s == "Hungary") { return "Hungary"; } 
 if (s == "Share Alike") { return "Share Alike"; } 
 if (s == "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work.") { return "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work."; } 
alert("Falling off the end.");
return s;
		}var in_string = "<div id=\"cc_js_generated_box\">\n<div id=\"cc_js_lic-menu\">\n\n  <div id=\"cc_js_want_cc_license_at_all\">\n    <span>\n      <input checked=\"checked\" id=\"cc_js_want_cc_license_sure\" name=\"cc_js_want_cc_license\" onclick=\"cc_js_enable_widget();\" type=\"radio\" value=\"sure\"/><label class=\"cc_js_infobox\" for=\"cc_js_want_cc_license_sure\"><span onmouseout=\"cc_js_hide_tip()\" onmouseover=\"cc_js_on_tooltip_html(event,'&lt;p&gt;&lt;strong&gt;' + cc_js_t('Creative Commons') + '&lt;/strong&gt; ' + cc_js_t('With a Creative Commons license, you keep your copyright but allow people to copy and distribute your work provided they give you credit — and only on the conditions you specify here.') + '&lt;/p&gt;');\">A <span class=\"cc_js_question\">Creative Commons</span> license</span></label>\n    </span>\n    <span>\n\t    <input id=\"cc_js_want_cc_license_nah\" name=\"cc_js_want_cc_license\" onclick=\"cc_js_disable_widget();\" type=\"radio\" value=\"nah\"/>\n\t    <label for=\"cc_js_want_cc_license_nah\"><span>No license</span></label>\n    </span>\n  </div>\n\n  <div id=\"cc_js_required\">\n    \n    <p class=\"cc_js_hidden\">\n      <input checked=\"checked\" id=\"cc_js_share\" name=\"cc_js_share\" style=\"display: none;\" type=\"checkbox\" value=\"1\"/>\n    </p>\n      \n      \n    <p>\n      <input id=\"cc_js_remix\" name=\"cc_js_remix\" onclick=\"cc_js_modify(this);\" type=\"checkbox\" value=\"\"/>\n      <label class=\"cc_js_question\" for=\"cc_js_remix\" id=\"cc_js_remix-label\" onclick=\"cc_js_call_me_on_label_selection(this);\" onmouseout=\"cc_js_hide_tip()\" onmouseover=\"cc_js_on_tooltip_html(event,'&lt;p&gt;&lt;strong&gt;' + cc_js_t('Remix') + '&lt;/strong&gt; ' + cc_js_t('Licensor permits others to make derivative works') + '&lt;/p&gt;');\" style=\"color: black;\"><strong><span>Allow Remixing</span></strong></label> \n    </p>\n    \n    \n    <p>\n      <input id=\"cc_js_nc\" name=\"cc_js_nc\" onclick=\"cc_js_modify(this);\" type=\"checkbox\" value=\"\"/>\n      <label class=\"cc_js_question\" for=\"cc_js_nc\" id=\"cc_js_nc-label\" onclick=\"cc_js_call_me_on_label_selection(this);\" onmouseout=\"cc_js_hide_tip()\" onmouseover=\"cc_js_on_tooltip_html(event,'&lt;p&gt;&lt;img src=&quot;http://creativecommons.org/icon/nc/standard.gif&quot; alt=&quot;nc&quot; class=&quot;cc_js_icon&quot; /&gt;&lt;strong&gt;' + cc_js_t('Noncommercial') + '&lt;/strong&gt; ' + cc_js_t('The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor\\'s permission.') + '&lt;/p&gt;');\" style=\"color: black;\"><strong><span>Prohibit Commercial Use</span></strong></label> \n    </p>\n\n    <p>\n      <input id=\"cc_js_sa\" name=\"cc_js_sa\" onclick=\"cc_js_modify(this);\" type=\"checkbox\" value=\"\"/>\n      <label class=\"cc_js_question\" for=\"cc_js_sa\" id=\"cc_js_sa-label\" onclick=\"cc_js_call_me_on_label_selection(this);\" onmouseout=\"cc_js_hide_tip()\" onmouseover=\"cc_js_on_tooltip_html(event,'&lt;p&gt;&lt;img src=&quot;http://creativecommons.org/icon/sa/standard.gif&quot; alt=&quot;sa&quot; class=&quot;cc_js_icon&quot; /&gt;&lt;strong&gt;' + cc_js_t('Share Alike') + '&lt;/strong&gt; ' + cc_js_t('The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor\\'s work.') + '&lt;/p&gt;');\" style=\"color: black;\"><strong><span>Require Share-Alike</span></strong></label>\n    </p>\n        \n    <br/>\n    \n    \n    \n  </div>\n  \n  <div id=\"cc_js_jurisdiction_box\">\n    <p><strong class=\"cc_js_question\" onmouseout=\"cc_js_hide_tip()\" onmouseover=\"cc_js_on_tooltip_html(event,'&lt;p&gt;&lt;strong&gt;Jurisdiction&lt;/strong&gt; ' + cc_js_t('If you desire a license governed by the Copyright Law of a specific jurisdiction, please select the appropriate jurisdiction.') + '&lt;/p&gt;');\"><span>Jurisdiction of your license:</span></strong>  </p>\n    <select id=\"cc_js_jurisdiction\" name=\"cc_js_jurisdiction\" onchange=\"cc_js_modify(this);\" onclick=\"cc_js_modify(this);\">\n      \n      <option id=\"cc_js_jurisdiction_choice_generic\" value=\"generic\">Unported</option><option id=\"cc_js_jurisdiction_choice_ar\" value=\"ar\">Argentina</option><option id=\"cc_js_jurisdiction_choice_au\" value=\"au\">Australia</option><option id=\"cc_js_jurisdiction_choice_at\" value=\"at\">Austria</option><option id=\"cc_js_jurisdiction_choice_be\" value=\"be\">Belgium</option><option id=\"cc_js_jurisdiction_choice_br\" value=\"br\">Brazil</option><option id=\"cc_js_jurisdiction_choice_bg\" value=\"bg\">Bulgaria</option><option id=\"cc_js_jurisdiction_choice_ca\" value=\"ca\">Canada</option><option id=\"cc_js_jurisdiction_choice_cl\" value=\"cl\">Chile</option><option id=\"cc_js_jurisdiction_choice_cn\" value=\"cn\">China Mainland</option><option id=\"cc_js_jurisdiction_choice_co\" value=\"co\">Colombia</option><option id=\"cc_js_jurisdiction_choice_hr\" value=\"hr\">Croatia</option><option id=\"cc_js_jurisdiction_choice_hu\" value=\"hu\">Hungary</option><option id=\"cc_js_jurisdiction_choice_dk\" value=\"dk\">Denmark</option><option id=\"cc_js_jurisdiction_choice_fi\" value=\"fi\">Finland</option><option id=\"cc_js_jurisdiction_choice_fr\" value=\"fr\">France</option><option id=\"cc_js_jurisdiction_choice_de\" value=\"de\">Germany</option><option id=\"cc_js_jurisdiction_choice_il\" value=\"il\">Israel</option><option id=\"cc_js_jurisdiction_choice_in\" value=\"in\">India</option><option id=\"cc_js_jurisdiction_choice_it\" value=\"it\">Italy</option><option id=\"cc_js_jurisdiction_choice_jp\" value=\"jp\">Japan</option><option id=\"cc_js_jurisdiction_choice_kr\" value=\"kr\">Korea</option><option id=\"cc_js_jurisdiction_choice_mk\" value=\"mk\">Macedonia</option><option id=\"cc_js_jurisdiction_choice_my\" value=\"my\">Malaysia</option><option id=\"cc_js_jurisdiction_choice_mt\" value=\"mt\">Malta</option><option id=\"cc_js_jurisdiction_choice_mx\" value=\"mx\">Mexico</option><option id=\"cc_js_jurisdiction_choice_nl\" value=\"nl\">Netherlands</option><option id=\"cc_js_jurisdiction_choice_pe\" value=\"pe\">Peru</option><option id=\"cc_js_jurisdiction_choice_ph\" value=\"ph\">Philippines</option><option id=\"cc_js_jurisdiction_choice_pl\" value=\"pl\">Poland</option><option id=\"cc_js_jurisdiction_choice_pt\" value=\"pt\">Portugal</option><option id=\"cc_js_jurisdiction_choice_si\" value=\"si\">Slovenia</option><option id=\"cc_js_jurisdiction_choice_za\" value=\"za\">South Africa</option><option id=\"cc_js_jurisdiction_choice_es\" value=\"es\">Spain</option><option id=\"cc_js_jurisdiction_choice_se\" value=\"se\">Sweden</option><option id=\"cc_js_jurisdiction_choice_ch\" value=\"ch\">Switzerland</option><option id=\"cc_js_jurisdiction_choice_tw\" value=\"tw\">Taiwan</option><option id=\"cc_js_jurisdiction_choice_uk\" value=\"uk\">UK: England &amp; Wales</option><option id=\"cc_js_jurisdiction_choice_scotland\" value=\"scotland\">UK: Scotland</option><option id=\"cc_js_jurisdiction_choice_us\" value=\"us\">United States</option><option id=\"cc_js_jurisdiction_choice_gr\" value=\"gr\">Greece</option><option id=\"cc_js_jurisdiction_choice_lu\" value=\"lu\">Luxembourg</option><option id=\"cc_js_jurisdiction_choice_hk\" value=\"hk\">Hong Kong</option><option id=\"cc_js_jurisdiction_choice_nz\" value=\"nz\">New Zealand</option><option id=\"cc_js_jurisdiction_choice_rs\" value=\"rs\">Serbia</option><option id=\"cc_js_jurisdiction_choice_pr\" value=\"pr\">Puerto Rico</option><option id=\"cc_js_jurisdiction_choice_ec\" value=\"ec\">Ecuador</option><option id=\"cc_js_jurisdiction_choice_no\" value=\"no\">Norway</option><option id=\"cc_js_jurisdiction_choice_sg\" value=\"sg\">Singapore</option><option id=\"cc_js_jurisdiction_choice_ro\" value=\"ro\">Romania</option><option id=\"cc_js_jurisdiction_choice_gt\" value=\"gt\">Guatemala</option><option id=\"cc_js_jurisdiction_choice_th\" value=\"th\">Thailand</option><option id=\"cc_js_jurisdiction_choice_cz\" value=\"cz\">Czech Republic</option>\n    </select>\n  </div>\n  \n  <div id=\"cc_js_license_selected\">\n    <div id=\"cc_js_license_example\"/>\n  </div>\n  \n  \n  <div id=\"cc_js_tip_cloak\" style=\"position:absolute; visibility:hidden; z-index:100\">hidden tip</div> \n</div>\n\n<form class=\"cc_js_hidden\" id=\"cc_js_cc_js_result_storage\">\n  <input id=\"cc_js_result_uri\" name=\"cc_js_result_uri\" type=\"hidden\" value=\"\"/>\n  <input id=\"cc_js_result_img\" name=\"cc_js_result_img\" type=\"hidden\" value=\"\"/>\n  <input id=\"cc_js_result_name\" name=\"cc_js_result_name\" type=\"hidden\" value=\"\"/>\n</form>\n  \n</div>";


var thisScript = /complete.js/;

var theScripts = document.getElementsByTagName('SCRIPT');

for (var i = 0 ; i < theScripts.length; i++) {

    if(theScripts[i].src.match(thisScript)) {

        var inForm = false;

        var currentNode = theScripts[i].parentNode;

        while (currentNode != null) {

            if (currentNode.nodeType == 1) {

                if (currentNode.tagName.toLowerCase() == 'form') {

                    inForm = true;

                    break;

                }

	    }

	    /* always */

	    currentNode = currentNode.parentNode;

        }

        

        if (inForm) {

	    /* if we are inside a form, we do not want to create

	       another form tag. So replace our FORM tag with

	       a DIV.

	    */

            in_string = in_string.replace('<form ', '<div ');

            in_string = in_string.replace('</form>', '</div>');

        }

        var my_div = document.createElement('DIV');

        my_div.innerHTML = in_string;



        theScripts[i].parentNode.insertBefore(my_div, theScripts[i]);

        theScripts[i].parentNode.removeChild(theScripts[i]);

	break;

    }

}
function cc_js_pageInit() {
    if (cc_js_$('want_cc_license_nah') && cc_js_$('want_cc_license_nah').checked) {
        // then do not init
        cc_js_disable_widget();
    } else {
        cc_js_init();
    }
    cc_js_init_tip();
}

if (window.onload) {
    old_onload = window.onload;
    window.onload = function () {
	old_onload();
	cc_js_pageInit();
    }
}
else {
    window.onload = cc_js_pageInit;
}