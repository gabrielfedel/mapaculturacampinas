
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Events', function(Events) {


  Events.Controller = Neatline.Shared.Controller.extend({


    slug: 'EVENTS',

    events: [
      'highlight',
      'unhighlight',
      'select',
      'unselect'
    ],


    /**
     * Initialize the record trackers.
     */
    init: function() {
      this.highlighted = null;
      this.selected = null;
    },


    /**
     * Unhighlight a currently-highlighted model.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {

      // Unhighlight current.
      if (!_.isNull(this.highlighted)) {
        Neatline.vent.trigger('unhighlight', {
          model: this.highlighted, source: this.slug
        });
      }

      // Set new current.
      this.highlighted = args.model;

    },


    /**
     * Clear the currently-highlighted model.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.highlighted = null;
    },


    /**
     * Unhighlight a currently-selected model.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {

      this.setRoute(args.model);

      // Unselect current.
      if (!_.isNull(this.selected)) {
        Neatline.vent.trigger('unselect', {
          model: this.selected, source: this.slug
        });
      }

      // Set new current.
      this.selected = args.model;

    },


    /**
     * Clear the currently-selected model.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.selected = null;
    },


    /**
     * Point the route at a record.
     *
     * @param {Object} model: The currently-selected model.
     */
    setRoute: function(model) {
      if (!Neatline.Editor) {
        Backbone.history.navigate('records/'+model.id, {
          replace: true
        });
      }
    }


  });


});
