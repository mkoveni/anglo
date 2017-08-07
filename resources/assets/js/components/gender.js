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
import drilldown from 'highcharts/modules/drilldown';
import Vue from 'vue';
import { Component, Lifecycle } from "av-ts";
var Gender = (function (_super) {
    __extends(Gender, _super);
    function Gender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gender.prototype.mounted = function () {
        drilldown(Highcharts);
        Highcharts.chart('gender', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Age/Gender per village'
            },
            subtitle: {
                text: 'Click the columns to view the gender.'
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Age in range'
                }
            },
            yAxis: {
                title: {
                    text: 'Number of people'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    name: 'Number of people',
                    colorByPoint: true,
                    data: [{
                            name: '0-6',
                            y: 35,
                            drilldown: '0-6'
                        }, {
                            name: '7-18',
                            y: 526,
                            drilldown: '7-18'
                        }, {
                            name: '19-34',
                            y: 985,
                            drilldown: '19-34'
                        }, {
                            name: '35-64',
                            y: 695,
                            drilldown: '35-64'
                        }, {
                            name: '65+',
                            y: 488,
                            drilldown: '65+'
                        }]
                }],
            drilldown: {
                series: [{
                        id: '0-6',
                        data: [
                            ['Males', 10],
                            ['Females', 2]
                        ]
                    }, {
                        id: '7-18',
                        data: [
                            ['Males', 10],
                            ['Females', 32],
                        ]
                    }, {
                        id: '19-34',
                        data: [
                            ['Males', 10],
                            ['Females', 42],
                        ]
                    }, {
                        id: '35-64',
                        data: [
                            ['Males', 10],
                            ['Females', 32],
                        ]
                    }, {
                        id: '65+',
                        data: [
                            ['Males', 19],
                            ['Females', 58],
                        ]
                    }
                ]
            }
        });
    };
    __decorate([
        Lifecycle
    ], Gender.prototype, "mounted", null);
    Gender = __decorate([
        Component
    ], Gender);
    return Gender;
}(Vue));
export default Gender;
//# sourceMappingURL=gender.js.map