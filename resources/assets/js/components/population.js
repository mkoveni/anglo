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
var Population = (function (_super) {
    __extends(Population, _super);
    function Population() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Population.prototype.mounted = function () {
        var myChart = Highcharts.chart('population', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Population'
            },
            yAxis: {
                title: {
                    text: 'Total'
                }
            },
            xAxis: {
                categories: ['Mogalakwena', 'Rustenburg', 'Thabazimbi']
            },
            series: [{
                    name: 'Male',
                    data: [585, 358, 429]
                }, {
                    name: 'Female',
                    data: [645, 407, 532]
                }
            ]
        });
    };
    __decorate([
        Lifecycle
    ], Population.prototype, "mounted", null);
    Population = __decorate([
        Component
    ], Population);
    return Population;
}(Vue));
export default Population;
//# sourceMappingURL=population.js.map