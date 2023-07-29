import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ClasseService } from 'app/services/classe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  totalClasses: number = 0; // To store the total number of classes
  // Add more variables here for other statistics you want to display

  constructor(private classeService: ClasseService) { }

  ngOnInit() {
    this.fetchClassData();
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  fetchClassData() {
    // Assuming you have a service method to fetch data for classes
    this.classeService.getAllClasses().subscribe(
      (classes) => {
        this.totalClasses = classes.length;
        // You can fetch other statistics related to classes here
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );
  }

  initCharts() {
    // Your chart initialization and animation code here
    // You can use this.totalClasses and other fetched data to populate the charts

    // For example, let's initialize and animate the Daily Sales Chart
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    // Rest of the chart code...

    // Add similar code to initialize and animate other charts
  }

  startAnimationForLineChart(chart) {
    // Your animation code for line chart
  }

  startAnimationForBarChart(chart) {
    // Your animation code for bar chart
  }
}
