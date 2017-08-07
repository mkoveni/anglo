import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component

export default class Household extends Vue{

    @Lifecycle mounted() {

        var myChart = Highcharts.chart('household', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Head of household'
            },
            xAxis: {
                type: 'category',

                title: {
                    text: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Total'
                }

            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                    name: 'Adult',
                    y: 358
                }, {
                    name: 'Child headed',
                    y: 158
                }, {
                    name: 'Pensioner',
                    y: 242
                }]
            }],
        });
    }
}