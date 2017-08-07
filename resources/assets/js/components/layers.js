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
///<reference path="../../../../node_modules/@types/es6-promise/index.d.ts"/>
import Vue from 'vue';
import { Component, Lifecycle } from "av-ts";
import ol from 'openlayers/dist/ol-debug';
import $ from 'jquery/dist/jquery';
var Layers = (function (_super) {
    __extends(Layers, _super);
    function Layers() {
        var _this = _super.call(this) || this;
        _this.baseGroup = new ol.layer.Group({
            title: 'Base Layers',
            layers: [],
            name: 'Base Layers'
        });
        _this.otherGroup = new ol.layer.Group({
            title: 'Other layers',
            layers: [],
            name: 'Other Layers'
        });
        _this.activeLayer = {
            id: 0,
            name: 'None'
        };
        return _this;
    }
    Layers.prototype.getActiveLayer = function () {
        return this.activeLayer;
    };
    Layers.prototype.layerSelected = function () {
        return this.activeLayer.id > 0;
    };
    Layers.prototype.apiLogin = function () {
        var this_ = this;
        $.ajax({
            url: 'https://www.1map.co.za/api/v1/auth/login?email=simon@standardcorp.co.za&password=Simon@16024',
            dataType: 'JSON',
            method: 'GET',
            async: false
        }).done(function (response) {
            this_.apiToken = response.apiToken;
            this_.buildLayers(this_);
            this_.initializeTree();
        }).fail(function () {
            alert('COULD NOT AUTHENTICATE');
        });
    };
    Layers.prototype.buildLayers = function (context) {
        this.ervenSource.clear();
        this.otherGroup.getLayers().clear();
        this.baseGroup.getLayers().clear();
        if (this.apiToken.token) {
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
                        'token': this.apiToken.token,
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
                        'token': this.apiToken.token,
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
            context.baseGroup.getLayers().push(emptyBaseLayer);
            context.baseGroup.getLayers().push(baseLayer);
            context.baseGroup.getLayers().push(baseLayerNGI);
            context.baseGroup.getLayers().push(ngiLayer);
            context.baseGroup.getLayers().push(osmLayer);
            $.ajax({
                url: 'https://www.1map.co.za/api/v1/params/workspace/11529/layers',
                method: 'GET',
                dataType: 'JSON',
                async: false,
                data: {
                    token: this.apiToken.token
                }
            }).done(function (response) {
                var _this = this;
                if (response && response.apiToken) {
                    this.apiToken = response.apiToken;
                }
                console.log('live');
                response.result.layers.forEach(function (item) {
                    if (item.isBaseLayer == false) {
                        var oSource = new ol.source.TileWMS({
                            url: 'https://www.1map.co.za/api/v1/spatial/maptile/' + item.layerId + '/other',
                            params: {
                                'token': _this.apiToken.token,
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
                            id: item.layerId,
                            title: item.layerCaption,
                            visibleInLayerSwitcher: true,
                            visible: false,
                            minResolution: context.getResolutionFromScale(item.minScale),
                            maxResolution: context.getResolutionFromScale(item.maxScale),
                            minScale: item.minScale,
                            maxScale: item.maxScale,
                            source: oSource
                        });
                        context.otherGroup.getLayers().getArray().push(oLayer);
                    }
                });
            }).fail(function () {
                context.otherGroup.getLayers().push(this.ervenLayer);
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
    Layers.prototype.initializeTree = function () {
        var this_ = this;
        this.baseGroup.getLayers().getArray().reverse().forEach(function (l) {
            var li = document.createElement('li');
            var eye = document.createElement('i');
            li.style.display = 'block';
            eye.style.cursor = 'pointer';
            eye.setAttribute('class', 'fa fa-eye pull-right');
            li.innerHTML = l.get('title') + ' ';
            li.appendChild(eye);
            eye.onclick = function () {
                this_.baseGroup.getLayers().getArray().filter(function (a) { return a.get('title') !== l.get('title'); })
                    .forEach(function (i) {
                    i.setVisible(false);
                });
                $('#base_layers').find('li i').removeClass('active-layer');
                if (l.getVisible()) {
                    l.setVisible(false);
                    eye.classList.remove('active-layer');
                }
                else {
                    l.setVisible(true);
                    eye.classList.add('active-layer');
                }
            };
            $('#base_layers').css('display', 'block').append(li);
        });
        var group = this.otherGroup.getLayers().getArray().filter(function (i) { return i.get('title').startsWith('SCG'); });
        group.reverse().forEach(function (l) {
            var li = document.createElement('li');
            var eye = document.createElement('i');
            var check = document.createElement('i');
            li.style.display = 'block';
            eye.style.cursor = 'pointer';
            check.style.cursor = 'pointer';
            eye.setAttribute('class', 'fa fa-eye pull-right');
            check.setAttribute('class', 'fa fa-check pull-right');
            check.onclick = function () {
                $('.current-layer').toggleClass('current-layer');
                this_.activeLayer = {
                    id: l.get('id'),
                    name: l.get('title')
                };
                console.log(this_.activeLayer);
                this.classList.add('current-layer');
            };
            li.innerHTML = l.get('title') + ' ';
            li.appendChild(eye);
            li.appendChild(check);
            eye.onclick = function () {
                if (l.getVisible()) {
                    l.setVisible(false);
                    eye.classList.remove('active-layer');
                }
                else {
                    l.setVisible(true);
                    eye.classList.add('active-layer');
                }
            };
            $('#scg_layers').css('display', 'block').append(li);
        });
    };
    Layers.prototype.mounted = function () {
        /* LAYER SWITCHER*/
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
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
        this.map = new ol.Map({
            layers: [
                this.baseGroup,
                this.otherGroup
            ],
            overlays: [overlay],
            controls: ol.control.defaults({ attribution: false }).extend([attribution]),
            target: 'map',
            view: view
        });
        var this_ = this;
        this.map.on('singleclick', function (e) {
            var coordinate = e.coordinate;
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
            var xystr = ol.coordinate.toStringXY(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'), 8);
            var lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
            var lon = lonlat[0];
            var lat = lonlat[1];
            $.ajax({
                type: "GET",
                url: 'https://www.1map.co.za/api/v1/attributes/closest/' + this_.activeLayer.id,
                dataType: 'json',
                timeout: 600000,
                data: {
                    showAttachments: false,
                    longitude: lon,
                    latitude: lat,
                    token: this_.apiToken.token
                }
            }).done(function (response) {
                var properties = response.result.geomResult.features[0].properties;
                if (properties) {
                    var thead = $('#table').find('thead');
                    var tbody = $('#table').find('tbody');
                    tbody.find('tr').remove();
                    thead.find('tr').remove();
                    var header_row = document.createElement('tr');
                    for (var prop in properties) {
                        if (properties.hasOwnProperty(prop)) {
                            var th = document.createElement('th');
                            th.classList.add('fit');
                            th.innerHTML = prop;
                            header_row.appendChild(th);
                        }
                    }
                    thead.append(header_row);
                    var tr = document.createElement('tr');
                    for (var prop in properties) {
                        if (properties.hasOwnProperty(prop)) {
                            var td = document.createElement('td');
                            td.classList.add('fit');
                            td.innerHTML = properties[prop];
                            tr.appendChild(td);
                        }
                    }
                    tbody.append(tr);
                }
                else {
                    alert('COULD NOT GET DATA FOR THAT POINT');
                }
            }).fail(function () {
            });
        });
        this.apiLogin();
        $('#layer-switcher').find('li[class!="nav-header"]').click(function () {
            $('#layer-switcher').find('li').removeClass('active');
            $(this).addClass('active');
        });
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