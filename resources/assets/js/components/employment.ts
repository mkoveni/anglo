import Highcharts from 'highcharts'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component
export default class Employment extends Vue{

    @Lifecycle mounted(){

        var myChart = Highcharts.chart('employment', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Employment per village'
            },
            xAxis: {
                categories: ['Mogalakwena', 'Rustenburg', 'Thabazimbi']
            },
            yAxis: {
                title: {
                    text: 'Employment overview'
                }
            },
            series: [{
                name: 'Youth employment',
                data: [345, 615, 454]
            }, {
                name: 'Unemployed',
                data: [675, 967, 453]

            },
                {
                    name: 'Employment',
                    data: [755, 327, 455]

                }
            ]

        });
    }

}