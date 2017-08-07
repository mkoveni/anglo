import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component

export default class Asset extends Vue{

    @Lifecycle mounted() {

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
    }
}