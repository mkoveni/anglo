import Highcharts from 'highcharts'
import drilldown from 'highcharts/modules/drilldown'
import Vue from 'vue'
import {Component, Lifecycle} from "av-ts"

@Component
export default class Graphs extends Vue{

    @Lifecycle mounted(){

        drilldown(Highcharts)

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
                        ['interested',910],
                        [ 'non-mine worker',552]
                    ]
                }, {
                    id: 'refused',
                    data: [
                        ['no interest',610],
                        [ 'non-permanent residence', 732],
                        ['mine worker', 898],
                        ['trust issues', 425]
                    ]
                }, {
                    id: 'inaccessible',
                    data: [
                        ['vacant structure',410],
                        [ 'vacant demolished',342],
                        ['vacant abandoned', 636]
                    ]
                }
                ]
            }
        });

    }

}