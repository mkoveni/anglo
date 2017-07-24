import Vue  from 'vue'
import {Component, Lifecycle} from "av-ts"
import ol from 'openlayers/dist/ol.js'


@Component
export default class Layers extends Vue
{
    name:string = 'Simon';

    @Lifecycle mounted(){

        new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: [0,0],
                zoom: 4
            }),
            target: 'map'
        })
    }
}
