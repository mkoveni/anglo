
import  Vue from "vue";
import {Component, Lifecycle} from "av-ts"
import HighCharts from 'highcharts'

@Component
export default class Graphs extends Vue
{
    @Lifecycle mounted(){

        let categories = ['Brick House', 'Mud House','Shack'];

        let series = [];

        let data = [
            {
                name:'Danisane',
                data:[1,0,0]
            },
            {
                name:'Machikiri',
                data:[1,1,0]
            },
            {
                name:'Mashehleng',
                data:[1,0,1]
            }
        ]



        var chart = HighCharts.chart('graph', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Type of House Graph'
            },

            subtitle:{
                text: 'Mogalakwena'
            },
            xAxis: {
                categories: categories
            },
            yAxis:{
                min:0,
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
        })
    }
}