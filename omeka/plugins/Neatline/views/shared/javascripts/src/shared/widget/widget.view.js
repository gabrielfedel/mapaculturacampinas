
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Shared.Widget', function(Widget) {


  Widget.View = Neatline.Shared.View.extend({


    className: 'widget',


    /**
     * On startup, check to see if the view element is attached to the DOM
     * (which is the case if an element with the view's `id` is directly
     * templated on the page). If not, append the view element to the core
     * `#neatline-map` container.
     *
     * @param {Object} options
     */
    initialize: function(options) {
      if (!$('#'+this.id).length) this.$el.appendTo($('#neatline-map'));
      Widget.View.__super__.initialize.call(this, options);
    },


  });


});
