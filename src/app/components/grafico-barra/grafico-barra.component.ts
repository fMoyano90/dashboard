import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'; 
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styles: []
})
export class GraficoBarraComponent implements OnInit {

  @Input('chartLabels') barChartLabels: string[] = [];
  @Input('chartData') barChartData: number[] = [];
  @Input('chartType') barChartType: string = '';
  @Input('chartLegend') barChartLegend: boolean;
  @Input('chartOptions') barChartOptions: any;
  @Input('chartPlugins') barChartPlugins: any;

  constructor() { }

  ngOnInit() {
  }

}
