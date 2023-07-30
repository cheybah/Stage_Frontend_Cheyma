import { Injectable } from '@angular/core';
import { hexToRgba } from '@coreui/utils';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
    providedIn: 'any'
  })
  export class DashboardChartsData {
    constructor() {
      this.initMainChart();
    }
  
    public mainChart: IChartProps = {};
  
    initMainChart(period: string = 'Month') {
      const brandSuccess = '#4dbd74';
      const brandInfo = '#20a8d8';
      const brandInfoBg = hexToRgba(brandInfo, 10);
      const brandDanger = '#f86c6b';
  
      // Static data for mainChart
      const data1 = [120, 150, 180, 140, 200, 170, 190, 160, 180, 170, 200, 190];
      const data2 = [80, 110, 130, 100, 150, 120, 140, 110, 130, 120, 160, 150];
      const data3 = [90, 120, 140, 110, 160, 130, 150, 120, 140, 130, 170, 160];

      //const data3 = Array(12).fill(65); // Filling with 65 to match the length of other datasets
  
      let labels: string[] = [];
      if (period === 'Month') {
        labels = [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
        ];
      } else {
        const week = [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ];
        labels = week.concat(week, week, week);
      }
  
      const colors = [
        {
          backgroundColor: brandInfoBg,
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          fill: true
        },
        {
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff'
        },
        {
          backgroundColor: 'transparent',
          borderColor: brandDanger,
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,
          borderDash: [8, 5]
        }
      ];
  
      const datasets = [
        {
          data: data1,
          label: 'Performance élèves PP ',
          ...colors[0]
        },
        {
          data: data2,
          label: 'Performance élèves PEI',
          ...colors[1]
        },
        {
            data: data3,
            label: 'Performance élèves DP',
            ...colors[2]
          },
      ];
  
      const plugins = {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            labelColor: function (context: any) {
              return {
                backgroundColor: context.dataset.borderColor
              };
            }
          }
        }
      };
  
      const options = {
        maintainAspectRatio: false,
        plugins,
        scales: {
          x: {
            grid: {
              drawOnChartArea: false
            }
          },
          y: {
            beginAtZero: true,
            max: 250,
            ticks: {
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5)
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      };
  
      this.mainChart.type = 'line';
      this.mainChart.options = options;
      this.mainChart.data = {
        datasets,
        labels
      };
    }
  }
  