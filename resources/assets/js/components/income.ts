import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component

export default class Income extends Vue{

    @Lifecycle mounted() {

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
    }
}