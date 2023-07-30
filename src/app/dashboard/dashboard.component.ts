import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Bus } from 'app/models/bus';
import { BusService } from 'app/services/bus.service';
import { DatePipe } from '@angular/common';
import { ClasseService } from 'app/services/classe.service';
import {EleveModel} from 'app/models/eleveModel';
import {PersonnelModel} from 'app/models/personnelModel';
import { EleveService } from 'app/services/eleve.service';
import { PersonnelService } from 'app/services/personnel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  currentDate: string;

  totalStudents: number = 0;
  totalPersonnel: number = 0;
  totalBuses: number = 0;
  totalSeats: number = 0;
  showSeatsPanel: boolean = false;
  seatsPerBus: { busNumber: number; seatCount: number; }[] = [];

  constructor(private busService: BusService,
    private eleveService: EleveService,
    private personnelService: PersonnelService,
     private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getTotalBuses();
    this.getSeatsPerBus();
    this.getTotalStudents();
    this.getTotalPersonnel();
  }

  getTotalBuses(): void {
    this.busService.getAllBusEtatActif().subscribe(
      (buses: Bus[]) => {
        this.totalBuses = buses.length;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getTotalSeats(): number {
    return this.seatsPerBus.reduce((total, bus) => total + bus.seatCount, 0);
  }

  getSeatsPerBus(): void {
    this.busService.getAllBusEtatActif().subscribe(
      (buses: Bus[]) => {
        let totalSeatsCount = 0;
        const seatsPerBusMap = new Map<number, number>();
        buses.forEach((bus) => {
          const seatCount = bus.nombrePlaces;
          totalSeatsCount += seatCount;
          seatsPerBusMap.set(bus.id, seatCount);
        });

        this.totalSeats = totalSeatsCount;
        this.seatsPerBus = Array.from(seatsPerBusMap.entries()).map(([busNumber, seatCount]) => ({
          busNumber,
          seatCount,
        }));
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  toggleSeatsPanel(): void {
    this.showSeatsPanel = !this.showSeatsPanel;
  }

  getTotalStudents(): void {
    this.eleveService.getAllEleves().subscribe(
      (eleves: EleveModel[]) => {
        this.totalStudents = eleves.length;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getTotalPersonnel(): void {
    this.personnelService.getAllPersonnels().subscribe(
      (personnel: PersonnelModel[]) => {
        this.totalPersonnel = personnel.length;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  ngAfterViewInit() {
    this.initCharts();
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
