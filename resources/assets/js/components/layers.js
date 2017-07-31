var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import { Component, Lifecycle } from "av-ts";
import axios from 'axios';
import ol from 'openlayers/dist/ol-debug';
var Layers = (function (_super) {
    __extends(Layers, _super);
    function Layers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Simon';
        return _this;
    }
    Layers.prototype.apiLogin = function () {
        var _this = this;
        axios.get('https://www.1map.co.za/api/v1/auth/login?email=simon@standardcorp.co.za&password=Simon@16024')
            .then(function (response) {
            _this.token = response.data.apiToken.token;
            _this.buildLayers();
        }).catch(function (error) {
            console.log('we have an error');
            _this.buildLayers();
        });
    };
    Layers.prototype.buildLayers = function () {
        var _this = this;
        this.ervenSource.clear();
        this.otherGroup.getLayers().clear();
        this.baseGroup.getLayers().clear();
        if (this.token) {
            var osmLayer = new ol.layer.Tile({
                title: 'osm',
                visible: false,
                visibleInLayerSwitcher: true,
                type: 'base',
                source: new ol.source.OSM({
                    hidpi: false,
                    wrapX: false
                })
            });
            var ngiLayer = new ol.layer.Tile({
                title: 'CD:NGI',
                visibleInLayerSwitcher: true,
                type: 'base',
                visible: false,
                source: new ol.source.XYZ({
                    hidpi: false,
                    wrapX: false,
                    attributions: [
                        new ol.Attribution({
                            html: 'Tiles &copy; <a href="http://www.ngi.gov.za/">CD:NGI Aerial</a>'
                        })
                    ],
                    urls: [
                        "http://a.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg",
                        "http://b.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg",
                        "http://c.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg"
                    ]
                })
            });
            var baseLayer = new ol.layer.Tile({
                title: '1map Base Layer',
                visibleInLayerSwitcher: true,
                type: 'base',
                visible: true,
                source: new ol.source.TileWMS({
                    url: 'https://www.1map.co.za/api/v1/spatial/maptile/2/base',
                    params: {
                        'token': this.token,
                        'CRS': 'EPSG:3857'
                    },
                    hidpi: false,
                    serverType: 'geoserver',
                    wrapX: false,
                    crossOrigin: 'anonymous',
                    attributions: [
                        new ol.Attribution({
                            html: '&copy; ' +
                                '<a href="https://www.1map.co.za">1map Spatial Solutions (Pty) Ltd</a>'
                        })
                    ]
                })
            });
            var baseLayerNGI = new ol.layer.Tile({
                title: '1map NGI Layer',
                visibleInLayerSwitcher: true,
                type: 'base',
                visible: false,
                source: new ol.source.TileWMS({
                    url: 'https://www.1map.co.za/api/v1/spatial/maptile/34/base',
                    params: {
                        'token': this.token,
                        'CRS': 'EPSG:3857'
                    },
                    hidpi: false,
                    serverType: 'geoserver',
                    wrapX: false,
                    crossOrigin: 'anonymous',
                    attributions: [
                        new ol.Attribution({
                            html: '&copy; ' +
                                '<a href="https://www.1map.co.za">1map Spatial Solutions (Pty) Ltd</a>'
                        })
                    ]
                })
            });
            var emptyBaseLayer = new ol.layer.Tile({
                title: 'None',
                visibleInLayerSwitcher: true,
                type: 'base',
                visible: false,
                source: new ol.source.TileWMS({
                    hidpi: false,
                    serverType: 'geoserver',
                    wrapX: false,
                    crossOrigin: 'anonymous'
                })
            });
            this.baseGroup.getLayers().push(emptyBaseLayer);
            this.baseGroup.getLayers().push(baseLayer);
            this.baseGroup.getLayers().push(baseLayerNGI);
            this.baseGroup.getLayers().push(ngiLayer);
            this.baseGroup.getLayers().push(osmLayer);
            axios.get('https://www.1map.co.za/api/v1/params/layer?isBaseLayer=false', {
                params: {
                    token: this.token
                }
            }).then(function (response) {
                if (response && response.data.apiToken) {
                    _this.token = response.data.apiToken.token;
                }
                if (response && response.data.result && response.data.result.layers) {
                    for (var i = 0; i < response.data.result.layers.length; i++) {
                        var item = response.data.result.layers[i];
                        if (item.isBaseLayer == false) {
                            var oSource = new ol.source.TileWMS({
                                url: 'https://www.1map.co.za/api/v1/spatial/maptile/' + item.layerId + '/other',
                                params: {
                                    'token': _this.token,
                                    'CRS': 'EPSG:3857'
                                },
                                hidpi: false,
                                serverType: 'geoserver',
                                wrapX: false,
                                crossOrigin: 'anonymous',
                                attributions: [
                                    new ol.Attribution({
                                        html: item.attribution
                                    })
                                ]
                            });
                            var oLayer = new ol.layer.Tile({
                                title: item.layerCaption,
                                visibleInLayerSwitcher: true,
                                visible: false,
                                minResolution: _this.getResolutionFromScale(item.minScale),
                                maxResolution: _this.getResolutionFromScale(item.maxScale),
                                minScale: item.minScale,
                                maxScale: item.maxScale,
                                source: oSource
                            });
                            _this.otherGroup.getLayers().push(oLayer);
                        }
                    }
                    _this.otherGroup.getLayers().push(_this.ervenLayer);
                }
            }).catch(function (error) {
                _this.otherGroup.getLayers().push(_this.ervenLayer);
            });
        }
    };
    Layers.prototype.getResolutionFromScale = function (scale) {
        var resolutions = [
            156543.03392804097,
            78271.51696402048,
            39135.75848201024,
            19567.87924100512,
            9783.93962050256,
            4891.96981025128,
            2445.98490512564,
            1222.99245256282,
            611.49622628141,
            305.748113140705,
            152.8740565703525,
            76.43702828517625,
            38.21851414258813,
            19.109257071294063,
            9.554628535647032,
            4.777314267823516,
            2.388657133911758,
            1.194328566955879,
            0.5971642834779395,
            0.29858214173896974,
            0.14929107086948487,
            0.07464553543474244,
            0.03732276771737122,
            0.01866138385868561,
            0.009330691929342804,
            0.004665345964671402,
            0.002332672982335701,
            0.0011663364911678506,
            0.0005831682455839253
        ];
        var zoomlevels = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28
        ];
        var scales = [
            1048576000,
            524288000,
            131072000,
            65536000,
            32768000,
            16384000,
            8192000,
            4096000,
            2048000,
            1024000,
            512000,
            256000,
            128000,
            64000,
            32000,
            16000,
            8000,
            4000,
            2000,
            1000,
            500,
            250,
            125,
            62.5,
            31.25,
            15.625,
            7.8125,
            3.90625,
            1.953125
        ];
        for (var i = 1; i < scales.length; i++) {
            // As soon as a number bigger than target is found, return the previous or current
            // number depending on which has smaller difference to the target.
            if (scales[i] <= scale) {
                var p = scales[i - 1];
                var c = scales[i];
                return resolutions[Math.abs(p - scale) < Math.abs(c - scale) ? i - 1 : i] + 0.00000000001;
            }
        }
        // No number in array is bigger so return the last.
        return resolutions[resolutions.length - 1];
    };
    Layers.prototype.mounted = function () {
        /* LAYER SWITCHER*/
        ol.control.LayerSwitcher = function (opt_options) {
            var options = opt_options || {};
            this.mapListeners = [];
            var tipLabel = options.tipLabel ? opt_options.tipLabel : 'Legend';
            this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
            this.shownClassName = this.hiddenClassName + ' shown';
            var element = document.createElement('div');
            element.className = this.hiddenClassName;
            var button = document.createElement('button');
            button.setAttribute('title', tipLabel);
            element.appendChild(button);
            this.panel = document.createElement('div');
            this.panel.className = 'panel';
            element.appendChild(this.panel);
            var this_ = this;
            element.onmouseover = function (e) {
                this_.showPanel();
            };
            button.onclick = function (e) {
                this_.showPanel();
            };
            element.onmouseout = function (e) {
                e = e || window.event;
                if (!element.contains(e.toElement)) {
                    this_.hidePanel();
                }
            };
            ol.control.Control.call(this, {
                element: element,
                target: options.target
            });
        };
        ol.inherits(ol.control.LayerSwitcher, ol.control.Control);
        /**
         * Show the layer panel.
         */
        ol.control.LayerSwitcher.prototype.showPanel = function () {
            if (this.element.className != this.shownClassName) {
                this.element.className = this.shownClassName;
                this.renderPanel();
            }
        };
        /**
         * Hide the layer panel.
         */
        ol.control.LayerSwitcher.prototype.hidePanel = function () {
            if (this.element.className != this.hiddenClassName) {
                this.element.className = this.hiddenClassName;
            }
        };
        /**
         * Re-draw the layer panel to represent the current state of the layers.
         */
        ol.control.LayerSwitcher.prototype.renderPanel = function () {
            this.ensureTopVisibleBaseLayerShown_();
            while (this.panel.firstChild) {
                this.panel.removeChild(this.panel.firstChild);
            }
            var ul = document.createElement('ul');
            this.panel.appendChild(ul);
            this.renderLayers_(this.getMap(), ul);
        };
        /**
         * Set the map instance the control is associated with.
         * @param {ol.Map} map The map instance.
         */
        ol.control.LayerSwitcher.prototype.setMap = function (map) {
            // Clean up listeners associated with the previous map
            for (var i = 0, key = void 0; i < this.mapListeners.length; i++) {
                this.getMap().unByKey(this.mapListeners[i]);
            }
            this.mapListeners.length = 0;
            // Wire up listeners etc. and store reference to new map
            ol.control.Control.prototype.setMap.call(this, map);
            if (map) {
                var this_1 = this;
                this.mapListeners.push(map.on('pointerdown', function () {
                    this_1.hidePanel();
                }));
                this.renderPanel();
            }
        };
        /**
         * Ensure only the top-most base layer is visible if more than one is visible.
         * @private
         */
        ol.control.LayerSwitcher.prototype.ensureTopVisibleBaseLayerShown_ = function () {
            var lastVisibleBaseLyr;
            ol.control.LayerSwitcher.forEachRecursive(this.getMap(), function (l, idx, a) {
                if (l.get('type') === 'base' && l.getVisible()) {
                    lastVisibleBaseLyr = l;
                }
            });
            if (lastVisibleBaseLyr)
                this.setVisible_(lastVisibleBaseLyr, true);
        };
        /**
         * Toggle the visible state of a layer.
         * Takes care of hiding other layers in the same exclusive group if the layer
         * is toggle to visible.
         * @private
         * @param {ol.layer.Base} The layer whos visibility will be toggled.
         */
        ol.control.LayerSwitcher.prototype.setVisible_ = function (lyr, visible) {
            var map = this.getMap();
            lyr.setVisible(visible);
            if (visible && lyr.get('type') === 'base') {
                // Hide all other base layers regardless of grouping
                ol.control.LayerSwitcher.forEachRecursive(map, function (l, idx, a) {
                    if (l != lyr && l.get('type') === 'base') {
                        l.setVisible(false);
                    }
                });
            }
        };
        /**
         * Render all layers that are children of a group.
         * @private
         * @param {ol.layer.Base} lyr Layer to be rendered (should have a title property).
         * @param {Number} idx Position in parent group list.
         */
        ol.control.LayerSwitcher.prototype.renderLayer_ = function (lyr, idx) {
            var this_ = this;
            var li = document.createElement('li');
            var lyrTitle = lyr.get('title');
            var lyrId = lyr.get('title').replace(' ', '-') + '_' + idx;
            var label = document.createElement('label');
            if (lyr.getLayers) {
                li.className = 'group';
                label.innerHTML = lyrTitle;
                li.appendChild(label);
                var ul = document.createElement('ul');
                li.appendChild(ul);
                this.renderLayers_(lyr, ul);
            }
            else {
                var input = document.createElement('input');
                if (lyr.get('type') === 'base') {
                    input.type = 'radio';
                    input.name = 'base';
                }
                else {
                    input.type = 'checkbox';
                }
                input.id = lyrId;
                input.checked = lyr.get('visible');
                input.onchange = function (e) {
                    this_.setVisible_(lyr, e.target.checked);
                };
                li.appendChild(input);
                label.htmlFor = lyrId;
                label.innerHTML = lyrTitle;
                li.appendChild(label);
            }
            return li;
        };
        /**
         * Render all layers that are children of a group.
         * @private
         * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
         * @param {Element} elm DOM element that children will be appended to.
         */
        ol.control.LayerSwitcher.prototype.renderLayers_ = function (lyr, elm) {
            var lyrs = lyr.getLayers().getArray().slice().reverse();
            for (var i = 0, l = void 0; i < lyrs.length; i++) {
                l = lyrs[i];
                if (l.get('title') && l.get('visibleInLayerSwitcher')) {
                    elm.appendChild(this.renderLayer_(l, i));
                }
            }
        };
        /**
         * **Static** Call the supplied function for each layer in the passed layer group
         * recursing nested groups.
         * @param {ol.layer.Group} lyr The layer group to start iterating from.
         * @param {Function} fn Callback which will be called for each `ol.layer.Base`
         * found under `lyr`. The signature for `fn` is the same as `ol.Collection#forEach`
         */
        ol.control.LayerSwitcher.forEachRecursive = function (lyr, fn) {
            lyr.getLayers().forEach(function (lyr, idx, a) {
                fn(lyr, idx, a);
                if (lyr.getLayers) {
                    ol.control.LayerSwitcher.forEachRecursive(lyr, fn);
                }
            });
        };
        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'Layer Control'
        });
        /* END OF LAYER SWITCHER */
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            title: 'Popup Layer',
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        }));
        this.ervenSource = new ol.source.Vector({});
        this.ervenLayer = new ol.layer.Vector({
            title: 'Erven Selection Layer',
            visibleInLayerSwitcher: false,
            visible: true,
            source: this.ervenSource,
            style: [new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        lineDash: [1],
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 0, 0.1)'
                    })
                })]
        });
        var attribution = new ol.control.Attribution({
            collapsible: true
        });
        var view = new ol.View({
            center: ol.proj.transform([19.01079, -33.65396], 'EPSG:4326', 'EPSG:3857'),
            zoom: 17
        });
        this.baseGroup = new ol.layer.Group({
            'title': 'Base Layers',
            visibleInLayerSwitcher: true,
            layers: []
        });
        this.otherGroup = new ol.layer.Group({
            'title': 'Other Layers',
            visibleInLayerSwitcher: true,
            layers: []
        });
        var map = new ol.Map({
            layers: [
                this.baseGroup,
                this.otherGroup
            ],
            overlays: [overlay],
            controls: ol.control.defaults({ attribution: false }).extend([attribution]),
            target: 'map',
            view: view
        });
        map.addControl(layerSwitcher);
        this.apiLogin();
        var li = document.querySelectorAll("#layers li");
        for (var x = 0; x < li.length; x++) {
            var item = li[x];
            item.addEventListener('click', function () {
                for (var y = 0; y < li.length; y++) {
                    li[y].classList.remove('active');
                    console.log('class removed');
                }
                this.className = 'active';
            });
        }
    };
    __decorate([
        Lifecycle
    ], Layers.prototype, "mounted", null);
    Layers = __decorate([
        Component
    ], Layers);
    return Layers;
}(Vue));
export default Layers;
//# sourceMappingURL=layers.js.map