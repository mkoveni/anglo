import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component

export default class House extends Vue{

    @Lifecycle mounted() {

        var myChart = Highcharts.chart('house', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Type of house'
            },
            xAxis: {
                type: 'category',

                title: {
                    text: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Number of houses'
                }

            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Number of house',
                colorByPoint: true,
                data: [{
                    name: 'Shack house',
                    y: 101
                }, {
                    name: 'Brick house',
                    y: 98
                }, {
                    name: 'Mud house',
                    y: 15
                }, {
                    name: 'Hut house',
                    y: 6
                }]
            }],
        });
    }
}