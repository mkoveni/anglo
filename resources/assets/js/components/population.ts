import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component
export default class Population extends Vue{

    @Lifecycle mounted(){

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
                categories: ['Mogalakwena', 'Rustenburg','Thabazimbi']
            },
            series: [{
                name: 'Male',
                data: [585, 358,429]
            }, {
                name: 'Female',
                data: [645, 407, 532]

            }
            ]

        });
    }

}