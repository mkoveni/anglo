import ol from 'openlayers/dist/ol-debug'

export class Switcher extends ol.control.Control
{
    element:any;
    options:any;

    constructor(options: any){
        super();

        this.options = options || {};


    }
}