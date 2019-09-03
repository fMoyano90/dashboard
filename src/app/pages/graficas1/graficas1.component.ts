import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  graficos: any = {
    'grafico1': {
      'labels': ['Meta', 'Expectativa', 'Realidad'],
      'data':  [80, 95, 60],
      'type': 'doughnut',
      'leyenda': 'Cumplimiento plan mantenimiento preventivo'
    },
    'grafico2': {
      'labels': ['Meta', 'Expectativa', 'Realidad'],
      'data':  [6, 8, 7],
      'type': 'pie',      'leyenda': 'Productividad bodega'
    },
    'grafico3': {
      'labels': ['Meta', 'Mes actual', 'Mes pasado'],
      'data':  [0, 5, 1],
      'type': 'line',
      'leyenda': 'Accidentes con tiempo perdido',
    },
    'grafico4': {
      'labels': ['Mes actual'],
      'data':  [30],
      'type': 'bar',
      'leyenda': 'Cantidad de servicios'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
