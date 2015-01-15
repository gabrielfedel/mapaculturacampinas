
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Map', function(Map) {


  Map.View = Backbone.View.extend({


    el: '#neatline-map',

    options: {
      defaultZoom: 6
    },


    // INITIALIZERS
    // ------------------------------------------------------------------------


    /**
     * Start the map, request starting records.
     *
     * @param {Object} options
     */
    initialize: function(options) {

      this.slug = options.slug;

      // Start the map.
      this._initGlobals();
      this._initOpenLayers();
      this._initControls();
      this._initEvents();
      this._initBaseLayers();
      this._initViewport();

      // Request records.
      this.publishPosition();

    },


    /**
     * Initialize tracker containers and helpers.
     */
    _initGlobals: function() {

      /**
       * Create the collection of records.
       */
      this.records = new Neatline.Shared.Record.Collection();

      /**
       * Alias the global exhibit object.
       */
      this.exhibit = Neatline.g.neatline.exhibit;

      /**
       * WKT reader/writer.
       */
      this.formatWkt = new OpenLayers.Format.WKT();

      /**
       * A nested object that contains references to all vector and WMS layers
       * currently on the map, keyed by record id.
       */
      this.layers = { vector: {}, wms: {} };

      /**
       * An object that contains references to all filters registered on the
       * map, keyed by filter slug.
       */
      this.filters = {};

      /**
       * The currently-selected record.
       */
      this.selectedModel = null;

      /**
       * True when records are being loaded from the server.
       */
      this.loading = false;

    },


    /**
     * Construct the OpenLayers Map instance, set the default base layer, and
     * call component start-up routines.
     */
    _initOpenLayers: function() {

      // Set the theme directory.
      OpenLayers.ImgPath = Neatline.g.neatline.openlayers_theme;

      // Spin up the map instance.
      this.map = new OpenLayers.Map(this.el, {

        theme: null,
        zoomMethod: null,
        panMethod:  null,

        controls: [
          new OpenLayers.Control.PanZoom(),
          new OpenLayers.Control.Navigation({
            dragPanOptions: { enableKinetic: false },
            documentDrag: true
          })
        ]

      });

    },


    /**
     * Construct, add, and activate hover and click controls to the map.
     */
    _initControls: function() {

      // Bind highlight/select callbacks to the view.
      _.bindAll(this, [
        'onBeforeHighlight',
        'onHighlight',
        'onUnhighlight',
        'onSelect',
        'onUnselect'
      ]);

      // Build the hover control, bind callbacks.
      this.highlightControl = new OpenLayers.Control.SelectFeature(
        this.getVectorLayers(), {

          hover: true,
          renderIntent: 'temporary',
          highlightOnly: true,

          eventListeners: {
            beforefeaturehighlighted: this.onBeforeHighlight,
            featurehighlighted:       this.onHighlight,
            featureunhighlighted:     this.onUnhighlight
          }

        }
      );

      // Build the click control, bind callbacks.
      this.selectControl = new OpenLayers.Control.SelectFeature(
        this.getVectorLayers(), {
          onSelect:   this.onSelect,
          onUnselect: this.onUnselect,
        }
      );

      // Enable panning when cursor is over feature.
      this.highlightControl.handlers.feature.stopDown = false;
      this.selectControl.handlers.feature.stopDown = false;

      // Add the controls to the map.
      this.map.addControls([this.highlightControl, this.selectControl]);

      // Activate the controls
      this.highlightControl.activate();
      this.selectControl.activate();

    },


    /**
     * If spatial querying is enabled, issue a request for new layers that
     * fall within the updated viewport extent when the map is moved.
     */
    _initEvents: function() {

      // When the map is panned or zoomed.
      this.map.events.register('moveend', this.map, _.bind(function() {
        if (this.exhibit.spatial_querying) this.publishPosition();
        Neatline.vent.trigger('MAP:move');
      }, this));

    },


    /**
     * Dispatch to one of the base layer constructor methods, depending on
     * what fields are defined on the exhibit object:
     *
     * - If `image_layer` is defined, create a static image layer.
     *
     * - If both `wms_address` and `wms_layers` are defined, create an
     *   individual WMS layer.
     *
     * - If no exhibit-specific layers are defined, add the the regular
     *   spatial layers.
     */
    _initBaseLayers: function() {

      var isImg = _.isString(this.exhibit.image_layer);
      var isWms = _.isString(this.exhibit.wms_address) &&
                  _.isString(this.exhibit.wms_layers);

      if (isImg) this._initImageLayer();
      else if (isWms) this._initWmsLayer();
      else this._initSpatialLayers();

    },


    /**
     * Construct a static image base layer.
     */
    _initImageLayer: function() {

      var h = this.exhibit.image_height;
      var w = this.exhibit.image_width;

      var image = new OpenLayers.Layer.Image(

        // Title, image URL, and dimensions.
        this.exhibit.title, this.exhibit.image_layer,
        new OpenLayers.Bounds(0, 0, w, h),
        new OpenLayers.Size(w/5, h/5),

        {
          // Add pan padding around the edges of the image
          maxExtent: new OpenLayers.Bounds(-w*2, -h*2, w*2, h*2),
          numZoomLevels: this.exhibit.zoom_levels
        }

      );

      this.map.addLayer(image);

    },


    /**
     * Construct an individual WMS base layer.
     */
    _initWmsLayer: function() {

      var wms = new OpenLayers.Layer.WMS(
        this.exhibit.title, this.exhibit.wms_address,
        { layers: this.exhibit.wms_layers },
        { maxZoomLevel: 20 }
      );

      this.map.addLayer(wms);

    },


    /**
     * Construct spatial base layers.
     */
    _initSpatialLayers: function() {

      var layers = {};

      // Build array of base layer instances.
      _.each(Neatline.g.neatline.spatial_layers, function(json) {
        var layer = Neatline.request('MAP:LAYERS:getLayer', json);
        if (_.isObject(layer)) layers[json.id] = layer;
      });

      // Add the layers, set indices to 0.
      _.each(_.values(layers), _.bind(function(layer) {
        this.map.addLayer(layer);
        this.map.setLayerIndex(layer, 0);
      }, this));

      // Set default base layer.
      this.map.setBaseLayer(layers[this.exhibit.spatial_layer]);

      // Add layer switcher.
      this.map.addControl(new OpenLayers.Control.LayerSwitcher());

    },


    /**
     * Set the starting focus and zoom.
     */
    _initViewport: function() {

      var focus = Neatline.g.neatline.exhibit.map_focus;
      var zoom  = Neatline.g.neatline.exhibit.map_zoom;

      // Apply default focus, if one exists.
      if (_.isString(focus) && _.isNumber(zoom)) {
        this.setFocus(focus);
        this.setZoom(zoom);
      }

      else {
        // Otherwise, geolocate.
        this.map.zoomTo(this.options.defaultZoom);
        this.geolocate();
      }

    },


    // CONTROLS
    // ------------------------------------------------------------------------


    /**
     * Update the layers operated on by the hover and click controls. Called
     * after new data arrives and the layer have been rebuilt by `ingest`.
     */
    updatePublicControls: function() {

      // Update the controls.
      var layers = this.getVectorLayers();
      this.highlightControl.setLayer(layers);
      this.selectControl.setLayer(layers);

      // Re-select the previously-selected model
      if (!_.isNull(this.selectedModel)) {
        this.select(this.selectedModel);
      }

    },


    // VIEWPORT
    // ------------------------------------------------------------------------


    /**
     * Focus the position and zoom to center around the passed model.
     *
     * - If the model has a non-null `map_focus` and `map_zoom`, set the
     *   viewport using these values.
     *
     * - Otherwise, automatically fit the viewport around the extent of the
     *   model's geometries, except when coverage is `POINT(0 0)`.
     *
     * @param {Object} model: The record model.
     */
    focusByModel: function(model) {

      // Get a layer for the model.
      var layer = this.getOrCreateVectorLayer(model);

      // Does the layer have geometry that can be focused on?
      var canFocus = model.get('coverage') && !model.get('is_wms');

      // Try to get custom focus/zoom.
      var focus = model.get('map_focus');
      var zoom  = model.get('map_zoom');

      // If a custom zoom is set, apply it.
      if (_.isNumber(zoom)) {
        this.setZoom(zoom);
      }

      // Otherwise, zoom around the geometry.
      else if (canFocus) {
        var zoom = this.map.getZoomForExtent(layer.getDataExtent());
        this.setZoom(zoom);
      }

      // If a custom focus is set, apply it.
      if (_.isString(focus)) {
        this.setFocus(focus);
      }

      // Otherwise, focus around the geometry.
      else if (canFocus) {
        var center = layer.getDataExtent().getCenterLonLat();
        this.setFocus(center);
      }

      Neatline.vent.trigger('MAP:focused');

    },


    /**
     * Set the focus and zoom of the map.
     *
     * @param {String} focus: Comma-delimited lat/lon.
     * @param {Number} zoom: The zoom value.
     */
    setViewport: function(focus, zoom) {
      this.map.setCenter(focus.split(','), zoom);
    },


    /**
     * Set the focus.
     *
     * @param {Array|String} focus: An array (or comma-delimited) lon/lat.
     */
    setFocus: function(focus) {
      if (_.isString(focus)) focus = focus.split(',');
      this.map.setCenter(focus);
    },


    /**
     * Set the zoom.
     *
     * @param {Number} zoom: The zoom value.
     */
    setZoom: function(zoom) {
      this.map.zoomTo(zoom);
    },


    /**
     * Focus the map on the user's location.
     */
    geolocate: function() {

      // Construct the control.
      var geolocate = new OpenLayers.Control.Geolocate({
        bind: true, watch: false
      });

      // Geolocate.
      this.map.addControl(geolocate);
      geolocate.activate();

    },


    // LAYERS
    // ------------------------------------------------------------------------


    /**
     * Publish a request for new records. If spatial querying is enabled,
     * filter on the current focus and zoom of the map.
     *
     * @param {Boolean} refresh: If true, don't pass back a list of `existing`
     * record IDs, triggering a full re-push of all matching records.
     */
    publishPosition: function(refresh) {

      refresh = refresh || false;
      var params = {};

      // If the map is being refreshed, don't send a list of existing record
      // IDs to the server. This causes the server to re-transmit all matching
      // records, which guarantees that any changes in record data since the
      // last push will be manifested immediately on the map. For example, if
      // the user had just added a WMS layer to a record, this causes the edit
      // layer record to be re-pushed with the new WMS fields, and the new WMS
      // layer to be instantiated immediately.

      if (!refresh) params.existing = this.getVectorLayerIds();

      // Filter by extent and zoom.
      if (this.exhibit.spatial_querying) _.extend(params, {
        extent: this.getExtentAsWKT(), zoom: this.getZoom()
      });

      this.loadRecords(params);
      this.loading = true;

    },


    /**
     * Load map layers.
     *
     * @param {Object} params: Hash with `extent` and `zoom`.
     */
    loadRecords: function(params) {
      this.records.update(params, _.bind(function(records) {
        this.ingestRecords(records);
      }, this));
    },


    /**
     * The point of entry when a new record collection arrives. Updates the
     * map layers to mirror the new records collection.
     *
     * @param {Object} records: The records collection.
     */
    ingestRecords: function(records) {

      if (this.map.dragging) return;

      // Build layers.
      this.ingestVectorLayers(records);
      this.ingestWmsLayers(records);

      // Publish collection, update controls.
      Neatline.vent.trigger('MAP:ingest', records);
      this.updatePublicControls();

      // End the load.
      this.loading = false;

    },


    /**
     * Rebuild the vector layers to match the new collection.
     *
     * @param {Object} records: The records collection.
     */
    ingestVectorLayers: function(records) {

      // Build new layers.
      records.each(_.bind(function(record) {

        // Add layer if one doesn't exist.
        if (!_.has(this.layers.vector, record.id)) {
          this.buildVectorLayer(record);
        }

      }, this));

      // Garbage-collect stale layers.
      _.each(records.metadata.removed, _.bind(function(id) {

        // Get a vector layer with the id.
        var layer = this.layers.vector[id];

        // Remove the layer if not frozen.
        if (_.isObject(layer) && !layer.neatline.frozen) {
          this.removeVectorLayer(layer);
        }

      }, this));

    },


    /**
     * Rebuild the WMS layers to match the new collection.
     *
     * @param {Object} records: The records collection.
     */
    ingestWmsLayers: function(records) {

      // Build new layers.
      records.each(_.bind(function(record) {

        // Does the layer have a WMS address / layers?
        var isWms = record.get('wms_address') && record.get('wms_layers');

        // Add layer if one doesn't exist.
        if (isWms && !_.has(this.layers.wms, record.id)) {
          this.buildWmsLayer(record);
        }

      }, this));

      // Garbage-collect stale layers.
      _.each(records.metadata.removed, _.bind(function(id) {

        // Get a WMS layer with the id.
        var layer = this.layers.wms[id];

        // Remove the layer, if it exists.
        if (_.isObject(layer)) this.removeWmsLayer(layer);

      }, this));

    },


    /**
     * Construct a vector layer and geometries for a model.
     *
     * @param {Object} record: The record model.
     * @return {OpenLayers.Layer.Vector}: The layer.
     */
    buildVectorLayer: function(record) {

      // Build the layer.
      var layer = new OpenLayers.Layer.Vector(record.get('title'), {

        displayInLayerSwitcher: false,
        styleMap: record.getStyleMap(),

        neatline: {
          model: record,
          frozen: false
        }

      });

      // Add features.
      if (record.get('coverage')) {
        layer.addFeatures(this.formatWkt.read(record.get('coverage')));
      }

      // (1) Apply filters.
      this.filterLayer(layer);

      // (2) Add to the map.
      this.layers.vector[record.id] = layer;
      this.map.addLayer(layer);

      // (3) Apply the z-index.
      if (_.isNumber(record.get('zindex'))) {
        this.setZIndex(layer, record.get('zindex'));
      }

      return layer;

    },


    /**
     * Construct a WMS layer for a model.
     *
     * @param {Object} record: The record model.
     * @return {OpenLayers.Layer.WMS}: The layer.
     */
    buildWmsLayer: function(record) {

      // Build the layer.
      var layer = new OpenLayers.Layer.WMS(
        record.get('title'), record.get('wms_address'), {

          // WMS request parameters.
          layers: record.get('wms_layers'),
          format: 'image/png8',
          transparent: true,
          tiled: true

        }, {

          // OpenLayers configuration.
          displayOutsideMaxExtent: true,
          opacity: Number(record.get('fill_opacity')),
          transitionEffect: 'map-resize',
          isBaseLayer: false,

          neatline: {
            model: record
          }

        }
      );

      // (1) Apply filters.
      this.filterLayer(layer);

      // (2) Add to the map.
      this.layers.wms[record.id] = layer;
      this.map.addLayer(layer);

      // (3) Apply the z-index.
      if (_.isNumber(record.get('zindex'))) {
        this.setZIndex(layer, record.get('zindex'));
      }

      return layer;

    },


    /**
     * Set the z-index on a layer.
     *
     * @param {Object} layer: A WMS / vector layer.
     * @param {Number} zindex: The z-index value.
     */
    setZIndex: function(layer, zindex) {
      this.map.setLayerIndex(layer, zindex);
    },


    /**
     * Get or create the vector layer for a model.
     *
     * @param {Object}: A record model.
     */
    getOrCreateVectorLayer: function(model) {
      var layer = this.layers.vector[model.id];
      if (!layer) layer = this.buildVectorLayer(model);
      return layer;
    },


    /**
     * Remove a vector layer from the map.
     *
     * @param {OpenLayers.Layer.Vector}: The layer.
     */
    removeVectorLayer: function(layer) {

      // Remove the layer from the map.
      this.map.removeLayer(layer);
      delete this.layers.vector[layer.neatline.model.id];

      // Pluck the layer out of the cursor controls.
      OpenLayers.Util.removeItem(this.highlightControl.layers, layer);
      OpenLayers.Util.removeItem(this.selectControl.layers, layer);

      layer.destroy();

    },


    /**
     * Remove a WMS layer from the map.
     *
     * @param {OpenLayers.Layer.WMS}: The layer.
     */
    removeWmsLayer: function(layer) {

      // Remove the layer from the map.
      this.map.removeLayer(layer);
      delete this.layers.wms[layer.neatline.model.id];

      layer.destroy();

    },


    /**
     * Remove all layers from the map.
     */
    removeAllLayers: function() {

      // Vector:
      _.each(this.getVectorLayers(), _.bind(function(layer) {
        if (!layer.neatline.frozen) this.removeVectorLayer(layer);
      }, this));

      // WMS:
      _.each(this.getWmsLayers(), _.bind(function(layer) {
        this.removeWmsLayer(layer);
      }, this));

    },


    // FILTERS
    // ------------------------------------------------------------------------


    /**
     * Register a layer filter.
     *
     * @param {String} key: A key to identify the filter.
     * @param {Function} evaluator: The boolean filtering function.
     */
    setFilter: function(key, evaluator) {
      this.filters[key] = evaluator;
      this.filterAllLayers();
    },


    /**
     * Remove a layer filter.
     *
     * @param {String} key: The key of the filter to remove.
     */
    removeFilter: function(key) {
      delete this.filters[key];
      this.filterAllLayers();
    },


    /**
     * Show a layer if it passes all filters; otherwise, hide it.
     *
     * @param {Object} layer: The layer to filter.
     */
    filterLayer: function(layer) {

      var visible = true;

      // Pass the layer through each of the filters.
      _.each(this.filters, _.bind(function(evaluator, key) {
        visible = visible && evaluator(layer.neatline.model);
      }, this));

      layer.setVisibility(visible);

    },


    /**
     * Pass all layers through the filtering system.
     */
    filterAllLayers: function() {
      _.each(this.layers, _.bind(function(group, key) {
        _.each(group, _.bind(function(layer, id) {
          this.filterLayer(layer);
        }, this));
      }, this));
    },


    // RENDERERS
    // ------------------------------------------------------------------------


    /**
     * Highlight all features on a layer, identified by record id.
     *
     * @param {Object} model: The record model.
     */
    highlight: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer || this.modelIsSelected(model)) return;

      this.stopPropagation = true;

      // Highlight features.
      _.each(layer.features, _.bind(function(feature) {
        this.highlightControl.highlight(feature);
      }, this));

      this.stopPropagation = false;

    },


    /**
     * Apply the `temporary` render intent to a record's vector features
     * without actually highlighting it.
     *
     * @param {Object} model: The record model.
     */
    renderHighlightIntent: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer) return;

      // Highlight features.
      _.each(layer.features, _.bind(function(feature) {
        layer.drawFeature(feature, 'temporary');
      }, this));

    },


    /**
     * Unhighglight all features on a layer, identified by record id.
     *
     * @param {Object} model: The record model.
     */
    unhighlight: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer || this.modelIsSelected(model)) return;

      this.stopPropagation = true;

      // Unhighlight features.
      _.each(layer.features, _.bind(function(feature) {
        this.highlightControl.unhighlight(feature);
      }, this));

      this.stopPropagation = false;

    },


    /**
     * Apply the `default` render intent to a record's vector features.
     *
     * @param {Object} model: The record model.
     */
    renderDefaultIntent: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer) return;

      // Highlight features.
      _.each(layer.features, _.bind(function(feature) {
        layer.drawFeature(feature, 'default');
      }, this));

    },


    /**
     * Select all features on a layer, identified by record id.
     *
     * @param {Object} model: The record model.
     */
    select: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer) return;

      this.stopPropagation = true;

      // Select features.
      _.each(layer.features, _.bind(function(feature) {
        this.selectControl.select(feature);
      }, this));

      this.stopPropagation = false;

      // Track selected model.
      this.selectedModel = model;

    },


    /**
     * Unselect all features on a layer, identified by record id.
     *
     * @param {Object} model: The record model.
     */
    unselect: function(model) {

      var layer = this.layers.vector[model.id];
      if (!layer) return;

      this.stopPropagation = true;

      // Unselect features.
      _.each(layer.features, _.bind(function(feature) {
        this.selectControl.unselect(feature);
      }, this));

      this.stopPropagation = false;

      // Clear selected model.
      this.selectedModel = null;

    },


    // PUBLISHERS
    // ------------------------------------------------------------------------


    /**
     * Block a feature highlight if the map is being dragged.
     *
     * @param {Object} evt: The highlight event.
     */
    onBeforeHighlight: function(evt) {
      return !this.map.dragging && !this.loading;
    },


    /**
     * When a feature is highlighted, trigger the `highlight` event with the
     * model associated with the feature.
     *
     * @param {Object} evt: The highlight event.
     */
    onHighlight: function(evt) {

      if (this.stopPropagation) return;

      // Highlight sibling features.
      this.highlight(evt.feature.layer.neatline.model);

      // Publish `highlight` event.
      Neatline.vent.trigger('highlight', {
        model:  evt.feature.layer.neatline.model,
        source: this.slug
      });

    },


    /**
     * When a feature is unhighlighted, trigger the `unhighlight` event with
     * the model associated with the feature.
     *
     * @param {Object} evt: The unhighlight event.
     */
    onUnhighlight: function(evt) {

      if (this.stopPropagation) return;

      // Unhighlight sibling features.
      this.unhighlight(evt.feature.layer.neatline.model);

      // Publish `unhighlight` event.
      Neatline.vent.trigger('unhighlight', {
        model:  evt.feature.layer.neatline.model,
        source: this.slug
      });

    },


    /**
     * When a feature is selected, trigger the `select` event with the model
     * associated with the feature.
     *
     * @param {Object|OpenLayers.Feature} feature: The feature.
     */
    onSelect: function(feature) {

      if (this.stopPropagation) return;

      // Select sibling features.
      this.select(feature.layer.neatline.model);

      // Publish `select` event.
      Neatline.vent.trigger('select', {
        model:  feature.layer.neatline.model,
        source: this.slug
      });

    },


    /**
     * When a feature is unselected, trigger the `unselect` event.
     *
     * @param {Object|OpenLayers.Feature} feature: The feature.
     */
    onUnselect: function(feature) {

      if (this.stopPropagation) return;

      // Unselect sibling features.
      this.unselect(feature.layer.neatline.model);

      // Publish `unselect` event.
      Neatline.vent.trigger('unselect', {
        model:  feature.layer.neatline.model,
        source: this.slug
      });

    },


    // HELPERS
    // ------------------------------------------------------------------------


    /**
     * Is the passed model the same as the currently-selected model?
     *
     * @return {Object}: A record model.
     */
    modelIsSelected: function(model) {
      if (this.selectedModel) return this.selectedModel.id == model.id;
      else return false;
    },


    /**
     * Get the current zoom level.
     *
     * @return {Number}: The zoom level.
     */
    getZoom: function(model) {
      return this.map.getZoom();
    },


    /**
     * Get the current map viewport bounds as a WKT polygon string.
     *
     * @return {String}: The WKT string.
     */
    getExtentAsWKT: function() {
      var extent = this.map.getExtent().toGeometry();
      var vector = new OpenLayers.Feature.Vector(extent);
      return this.formatWkt.write(vector);
    },


    /**
     * Get all current vector layers.
     *
     * @return {Array}: The array of layers.
     */
    getVectorLayers: function() {
      return _.values(this.layers.vector);
    },


    /**
     * Get the ids of all current vector layers.
     *
     * @return {Array}: The array of ids.
     */
    getVectorLayerIds: function() {
      return _.keys(this.layers.vector);
    },


    /**
     * Get an array of all WMS layers.
     *
     * @return {Array}: The array of layers.
     */
    getWmsLayers: function() {
      return _.values(this.layers.wms);
    }


  });


});
