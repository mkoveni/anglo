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
var Income = (function (_super) {
    __extends(Income, _super);
    function Income() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Income.prototype.mounted = function () {
        var myChart = Highcharts.chart('income', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Income in range'
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Income in range'
                }
            },
            yAxis: {
                title: {
                    text: 'Total '
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    name: 'Number of people',
                    colorByPoint: true,
                    data: [{
                            name: '0-1000',
                            y: 35,
                        }, {
                            name: '1001-3000',
                            y: 526
                        }, {
                            name: '3001-5000',
                            y: 985
                        }, {
                            name: '5001-10000',
                            y: 695
                        }, {
                            name: '10001-15000',
                            y: 488
                        }, {
                            name: '15001-20000',
                            y: 488
                        }, {
                            name: '20001-30000',
                            y: 488
                        }, {
                            name: '30000+',
                            y: 488
                        }]
                }],
        });
    };
    __decorate([
        Lifecycle
    ], Income.prototype, "mounted", null);
    Income = __decorate([
        Component
    ], Income);
    return Income;
}(Vue));
export default Income;
//# sourceMappingURL=income.js.map