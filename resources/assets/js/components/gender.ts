import Highcharts from 'highcharts'
import drilldown from 'highcharts/modules/drilldown'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component
export default class Gender extends Vue{

    @Lifecycle mounted(){

        drilldown(Highcharts)

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
                        ['Males',10],
                        [ 'Females',2]
                    ]
                }, {
                    id: '7-18',
                    data: [
                        ['Males',10],
                        [ 'Females',32],
                    ]
                }, {
                    id: '19-34',
                    data: [
                        ['Males',10],
                        [ 'Females',42],
                    ]
                },{
                    id: '35-64',
                    data: [
                        ['Males',10],
                        [ 'Females',32],
                    ]
                },{
                    id: '65+',
                    data: [
                        ['Males',19],
                        [ 'Females',58],
                    ]
                }
                ]
            }
        });

    }

}