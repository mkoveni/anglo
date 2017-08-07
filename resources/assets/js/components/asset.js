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
import Highcharts from 'highcharts';
import Vue from 'vue';
import { Component, Lifecycle } from "av-ts";
var Asset = (function (_super) {
    __extends(Asset, _super);
    function Asset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Asset.prototype.mounted = function () {
        var myChart = Highcharts.chart('asset', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'All Assets'
            },
            xAxis: {
                type: 'category',
                title: {
                    text: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Number of assets '
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    name: 'total',
                    colorByPoint: true,
                    data: [{
                            name: 'Church',
                            y: 10
                        }, {
                            name: 'Clinics',
                            y: 8
                        }, {
                            name: 'Schools',
                            y: 15
                        }, {
                            name: 'Parks',
                            y: 6
                        }, {
                            name: 'Libraries',
                            y: 4
                        }, {
                            name: 'Fields',
                            y: 5
                        }]
                }],
        });
    };
    __decorate([
        Lifecycle
    ], Asset.prototype, "mounted", null);
    Asset = __decorate([
        Component
    ], Asset);
    return Asset;
}(Vue));
export default Asset;
//# sourceMappingURL=asset.js.map