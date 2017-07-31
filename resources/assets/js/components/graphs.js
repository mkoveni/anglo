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
import Vue from "vue";
import { Component, Lifecycle } from "av-ts";
import HighCharts from 'highcharts';
var Graphs = (function (_super) {
    __extends(Graphs, _super);
    function Graphs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graphs.prototype.mounted = function () {
        var categories = ['Brick House', 'Mud House', 'Shack'];
        var series = [];
        var data = [
            {
                name: 'Danisane',
                data: [1, 0, 0]
            },
            {
                name: 'Machikiri',
                data: [1, 1, 0]
            },
            {
                name: 'Mashehleng',
                data: [1, 0, 1]
            }
        ];
        var chart = HighCharts.chart('graph', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Type of House Graph'
            },
            subtitle: {
                text: 'Mogalakwena'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of people'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (HighCharts.theme && HighCharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (HighCharts.theme && HighCharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (HighCharts.theme && HighCharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: data
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