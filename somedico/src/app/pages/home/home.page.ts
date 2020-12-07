import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { OrderApiService } from 'src/app/services/api/order-api/order.api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild('horizontalBarChart', { static: false }) horizontalBarChart;
  @ViewChild('pieChart', { static: false }) pieChart;
  @ViewChild('verticalBarChart', { static: false }) verticalBarChart;
  @ViewChild('doughnutChart', { static: false }) doughnutChart;

  public horizontalBars: any;
  public pie: any;
  public verticalBars: any;
  public doughnut: any;

  public darkBlue = '#1B1464';
  public darkGreen = '#008413';
  public darkYellow = '#F79F1F';
  public darkRed = '#e84118';
  public darkPurple = '#6F1E51';
  public value1Label = 'Label 1';
  public value2Label = 'Label 2';
  public value3Label = 'Label 3';
  public value4Label = 'Label 4';
  public value5Label = 'Label 5';

  public value1Value: number;
  public value2Value: number;
  public value3Value: number;
  public value4Value: number;
  public value5Value: number;

  constructor(
    private orderApiService: OrderApiService
  ) { }

  ngOnInit() {
    this.initialiseChart();
    this.getEODSalesAmount();
  }

  ngOnDestroy() {
    this.doughnut.destroy();
  }

  private getEODSalesAmount(): void {
    const date: Date = new Date();
    const isoDate = date.toISOString();
    this.orderApiService.getEODSalesAmount(isoDate).subscribe(data => {
      console.log(data);
    })
  }

  initialiseChart() {
    setTimeout(() => {
      this.createDoughnutChart();
      this.createHorizontalBarChart();
      this.createPieChart();
      this.createVerticalBarChart();
      this.value1Value = 10;
      this.value2Value = 20;
      this.value3Value = 5;
      this.value4Value = 13;
      this.value5Value = 7;
      this.updateChart(this.value1Value, this.value2Value, this.value3Value, this.value4Value, this.value5Value);
    }, 1000);
  }

  // Doughnut Chart
  createDoughnutChart() {
    this.doughnut = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      // plugins: [ChartDataLabels],
      data: {
        labels: [this.value1Label, this.value2Label, this.value3Label, this.value4Label, this.value5Label],
        datasets: [
          {
            backgroundColor: [this.darkBlue, this.darkGreen, this.darkYellow, this.darkPurple, this.darkRed],
            data: [this.value1Value, this.value2Value, this.value3Value, this.value4Value, this.value5Value],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 15
          }
        },
        title: {
          display: true,
          // text: 'Ratio of new to old cards',
          fontStyle: 'normal',
          // fontFamily: 'Proxima Nova Regular',
          fontSize: 24,
          fontColor: '#414344'
        },
        // plugins: {
        //   datalabels: {
        //     display: true,
        //     color: 'white',
        //     textAlign: 'center',
        //   }
        // }
      }
    });
  }

  // Horizontal Bar Chart
  createHorizontalBarChart() {
    this.horizontalBars = new Chart(this.horizontalBarChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: [this.value1Label, this.value2Label, this.value3Label, this.value4Label, this.value5Label],
        datasets: [
          {
            backgroundColor: [this.darkBlue, this.darkGreen, this.darkYellow, this.darkPurple, this.darkRed],
            data: [this.value1Value, this.value2Value, this.value3Value, this.value4Value, this.value5Value],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 15
          }
        },
        title: {
          display: true,
          fontStyle: 'normal',
          fontSize: 24,
          fontColor: '#414344'
        },
      }
    });
  }

  // Pie Chart
  createPieChart() {
    this.pie = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: [this.value1Label, this.value2Label, this.value3Label, this.value4Label, this.value5Label],
        datasets: [
          {
            backgroundColor: [this.darkBlue, this.darkGreen, this.darkYellow, this.darkPurple, this.darkRed],
            data: [this.value1Value, this.value2Value, this.value3Value, this.value4Value, this.value5Value],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 15
          }
        },
        title: {
          display: true,
          fontStyle: 'normal',
          fontSize: 24,
          fontColor: '#414344'
        },
      }
    });
  }

  // Vertical Bar Chart
  createVerticalBarChart() {
    this.verticalBars = new Chart(this.verticalBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [this.value1Label, this.value2Label, this.value3Label, this.value4Label, this.value5Label],
        datasets: [
          {
            backgroundColor: [this.darkBlue, this.darkGreen, this.darkYellow, this.darkPurple, this.darkRed],
            data: [this.value1Value, this.value2Value, this.value3Value, this.value4Value, this.value5Value],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 15
          }
        },
        title: {
          display: true,
          fontStyle: 'normal',
          fontSize: 24,
          fontColor: '#414344'
        },
      }
    });
  }

  updateChart(value2Value: number, value1Value: number, value3Value: number, value4Value: number, value5Value: number) {
    this.doughnut.data.datasets[0].data[0] = value1Value;
    this.doughnut.data.datasets[0].data[1] = value2Value;
    this.doughnut.data.datasets[0].data[2] = value3Value;
    this.doughnut.data.datasets[0].data[3] = value4Value;
    this.doughnut.data.datasets[0].data[4] = value5Value;
    this.doughnut.update();

    this.horizontalBars.data.datasets[0].data[0] = value1Value;
    this.horizontalBars.data.datasets[0].data[1] = value2Value;
    this.horizontalBars.data.datasets[0].data[2] = value3Value;
    this.horizontalBars.data.datasets[0].data[3] = value4Value;
    this.horizontalBars.data.datasets[0].data[4] = value5Value;
    this.horizontalBars.update();

    this.pie.data.datasets[0].data[0] = value1Value;
    this.pie.data.datasets[0].data[1] = value2Value;
    this.pie.data.datasets[0].data[2] = value3Value;
    this.pie.data.datasets[0].data[3] = value4Value;
    this.pie.data.datasets[0].data[4] = value5Value;
    this.pie.update();

    this.verticalBars.data.datasets[0].data[0] = value1Value;
    this.verticalBars.data.datasets[0].data[1] = value2Value;
    this.verticalBars.data.datasets[0].data[2] = value3Value;
    this.verticalBars.data.datasets[0].data[3] = value4Value;
    this.verticalBars.data.datasets[0].data[4] = value5Value;
    this.verticalBars.update();
  }

}

