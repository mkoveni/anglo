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
var Graphs = (function (_super) {
    __extends(Graphs, _super);
    function Graphs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graphs.prototype.mounted = function () {
        drilldown(Highcharts);
        Highcharts.chart('graph', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Household reaction'
            },
            subtitle: {
                text: 'Click the columns to view the reason.'
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Reaction'
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
                            name: 'Participated',
                            y: 935,
                            drilldown: 'participated'
                        }, {
                            name: 'Refused',
                            y: 526,
                            drilldown: 'refused'
                        }, {
                            name: 'Inaccessible',
                            y: 785,
                            drilldown: 'inaccessible'
                        }]
                }],
            drilldown: {
                series: [{
                        id: 'participated',
                        data: [
                            ['interested', 910],
                            ['non-mine worker', 552]
                        ]
                    }, {
                        id: 'refused',
                        data: [
                            ['no interest', 610],
                            ['non-permanent residence', 732],
                            ['mine worker', 898],
                            ['trust issues', 425]
                        ]
                    }, {
                        id: 'inaccessible',
                        data: [
                            ['vacant structure', 410],
                            ['vacant demolished', 342],
                            ['vacant abandoned', 636]
                        ]
                    }
                ]
            }
        });
    };
    __decorate([
        Lifecycle
    ], Graphs.prototype, "mounted", null);
    Graphs = __decorate([
        Component
    ], Graphs);
    return Graphs;
}(Vue));
export default Graphs;
//# sourceMappingURL=graphs.js.map