import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Grafico } from '../../models/grafico.model';
import { GraficoService } from '../../services/grafico/grafico.service';
import { Router, ActivatedRoute } from '@angular/router';

am4core.useTheme(am4themes_animated)

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements AfterViewInit, OnInit {
  empresa: Empresa;

  public month;
  public year;

  public dataG1: number[];
  public dataG2: number[];
  public dataG3: number[];
  public dataG4: number[];
  public dataG5: number[];
  public dataG6: number[];
  public dataG7: number[];
  public dataG8: number[];
  public dataG9: number[];
  public dataG10: number;
  public dataG11: number;
  public dataG12: number;
  public dataG13: number;
  public dataG14: number;
  
  public titulo: string;
  public titulo2: string;
  public titulo3: string;
  public titulo4: string;
  
  public chartPlugins = [pluginDataLabels];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public hand1:any;
  public hand2:any;
  public hand3:any;
  public hand4:any;
  public label1:any;
  public label2:any;
  public label3:any;
  public label4:any;

  public graficos: any = {
    // Barra
    grafico1: {
      labels: ['mes1', 'mes2', 'mes3'],
      type: 'bar',
      leyenda: 'Accidentes con tiempo perdido',
      datasets: [
        {
          data: [0, 0, 0],
          label: ['Cantidad de accidentes'],
          backgroundColor: '#FDF986',
          borderColor: ' #FDF84E',
          hoverBackgroundColor: '#FDF84E'
          }
      ],
      options: {
        responsive: true,
        scales: { xAxes: [{}],   yAxes: [{
          ticks: {
            max: 3,
            min: 0,
            stepSize: 1
          },
          gridLines: { display: false }
      }] },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 20,
            },
            color: '#848484'
          }
        }
      },
    },
    grafico2: {
      labels: ['Septiembre', 'Agosto', 'Julio'],
      type: 'bar',
      leyenda: 'Productividad bodega',
      datasets: [
        {
          data: [0, 0, 0],
          label: ['Grado de eficiencia del personal de bodega'],
          backgroundColor: '#FBC47C',
          borderColor: ' #FFB14A',
          hoverBackgroundColor: '#FFB14A'
          }
      ],
      options: {
        responsive: true,
        scales: { xAxes: [{}],   yAxes: [{
          ticks: {
            max: 5,
            min: 0,
            stepSize: 1
          },
          gridLines: { display: false }
      }] },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 20,
            },
            color: '#848484'
          }
        }
      },
    },
    grafico3: {
      labels: ['Septiembre', 'Agosto', 'Julio'],
      type: 'bar',
      leyenda: 'Productividad transporte por equipo',
      datasets: [
        {
          data: [0, 0, 0],
          label: ['Grado de eficiencia del personal de transporte'],
          backgroundColor: '#8CAEFC',
          borderColor: ' #759EFF',
          hoverBackgroundColor: '#759EFF'
          }
      ],
      options: {
        responsive: true,
        scales: { xAxes: [{}],   yAxes: [{
          ticks: {
            max: 2,
            min: 0,
            stepSize: 0.2
          },
          gridLines: { display: false }
      }] },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 20,
            },
            color: '#848484'
          }
        }
      },
    },
    grafico4: {
      labels: ['Septiembre', 'Agosto', 'Julio'],
      type: 'bar',
      leyenda: 'Cantidad de servicios',
      datasets: [
        {
          data: [0, 0, 0],
          label: ['Servicios en el mes'],
          backgroundColor: '#BBE8BA',
          borderColor: ' #ADF0AA',
          hoverBackgroundColor: '#ADF0AA'
          }
      ],
      options: {
        responsive: true,
        scales: { xAxes: [{}],   yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          },
          gridLines: { display: false }
      }] },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 20,
            },
            color: '#848484'
          }
        }
      },
    },
    // Dona
    grafico5: {
      labels: ['Resultado USD', 'Meta', 'Expectativa'],
      data:  [0, 1000, 500],
      type: 'doughnut',
      leyenda: 'Diferencias de valor absoluto inventario',
    },
    // Torta
    grafico6: {
      labels: ['Disponibles', 'No disponibles'],
      data:  [0, 0],
      type: 'pie',
      leyenda: 'Disponibilidad de equipos',
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItem, data) {
              var allData = data.datasets[tooltipItem.datasetIndex].data;
              var tooltipLabel = data.labels[tooltipItem.index];
              var tooltipData = allData[tooltipItem.index];
              return tooltipLabel + ": " + tooltipData + "%";
            }
          }
        }
      }
    },
    grafico7: {
      labels: ['Lineas procesadas', 'No procesadas'],
      data:  [0, 0],
      type: 'pie',
      leyenda: 'Disponibilidad de uso de pulmones',
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItem, data) {
              var allData = data.datasets[tooltipItem.datasetIndex].data;
              var tooltipLabel = data.labels[tooltipItem.index];
              var tooltipData = allData[tooltipItem.index];
              return tooltipLabel + ": " + tooltipData + "%";
            }
          }
        }
      }
    },
    grafico8: {
      labels: ['Materiales con diferencia', 'Materiales sin diferencia'],
      data:  [0, 0],
      type: 'pie',
      leyenda: 'Confrontación de stock',
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItem, data) {
              var allData = data.datasets[tooltipItem.datasetIndex].data;
              var tooltipLabel = data.labels[tooltipItem.index];
              var tooltipData = allData[tooltipItem.index];
              return tooltipLabel + ": " + tooltipData + "%";
            }
          }
        }
      }
    },
    grafico9: {
      labels: ['Cumplido', 'No Cumplido'],
      data:  [0, 0],
      type: 'pie',
      leyenda: 'Devoluciones de stock',
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItem, data) {
              var allData = data.datasets[tooltipItem.datasetIndex].data;
              var tooltipLabel = data.labels[tooltipItem.index];
              var tooltipData = allData[tooltipItem.index];
              return tooltipLabel + ": " + tooltipData + "%";
            }
          }
        }
      }
    },
  };

  constructor(
    private zone: NgZone,
    public _empresaService: EmpresaService,
    public _graficoService: GraficoService,
    public _router: Router,
    public activatedRoute: ActivatedRoute
    ) {
      activatedRoute.params.subscribe( params => {
        console.log(params);
        let id = params['id'];
        this.cargarEmpresa(id);
        this.cargarGraficoUno(id, 'ATP');
        this.cargarGraficoDos(id, 'PBO');
        this.cargarGraficoTres(id, 'PTE');
        this.cargarGraficoCuatro(id, 'CSR');
        this.cargarGraficoCinco(id, 'DVA');
        this.cargarGraficoSeis(id, 'DEQ');
        this.cargarGraficoSiete(id, 'DUP');
        this.cargarGraficoOcho(id, 'CST');
        this.cargarGraficoNueve(id, 'DST');
        this.cargarGraficoDiez(id, 'CMP');
        this.cargarGraficoOnce(id, 'TCR');
        this.cargarGraficoDoce(id, 'OTIF');
        this.cargarGraficoTrece(id, 'SOS');
        this.cargarGraficoCatorce(id, 'SCL');
      });
    }

  ngOnInit(){
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

    let fecha = new Date();
    this.month = meses[fecha.getMonth()];
    this.year = fecha.getFullYear();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.GaugeChart);
      this.titulo = 'Cumplimiento de mantenimiento preventivo';

      // CONFIGURACIÓN DE VELOCIMETRO
      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(80);

      // ANCHO DE BARRA
      chart.innerRadius = -50;

      // RANGOS 
      let range = axis.axisRanges.create();
      range.value = 0;
      range.endValue = 80;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#DE8F6E");
      range.axisFill.zIndex = - 1;

      let range2 = axis.axisRanges.create();
      range2.value = 80;
      range2.endValue = 95;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color("#DBD56E");
      range2.axisFill.zIndex = - 1;

      let range3 = axis.axisRanges.create();
      range3.value = 95;
      range3.endValue = 100;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color("#88AB75");
      range3.axisFill.zIndex = - 1;

      // AGREGAR BARRA
      this.hand1 = chart.hands.push(new am4charts.ClockHand());
      this.hand1.value = 0;
      this.hand1.pin.disabled = true;
      this.hand1.fill = am4core.color("#2D93AD");
      this.hand1.stroke = am4core.color("#2D93AD");
      this.hand1.innerRadius = am4core.percent(50);
      this.hand1.radius = am4core.percent(80);
      this.hand1.startWidth = 15;

      // NUMERO CENTRAL
      this.label1 = chart.radarContainer.createChild(am4core.Label);
      this.label1.isMeasured = false;
      this.label1.fontSize = 28;
      this.label1.x = am4core.percent(50);
      this.label1.y = am4core.percent(100);
      this.label1.horizontalCenter = "middle";
      this.label1.verticalCenter = "bottom";
      this.label1.text = '';

    });

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv2", am4charts.GaugeChart);
      this.titulo2 = 'Tiempo de ciclo de recepción';

      // CONFIGURACIÓN DE VELOCIMETRO
      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(80);

      // ANCHO DE BARRA
      chart.innerRadius = -50;

      // RANGOS 
      let range = axis.axisRanges.create();
      range.value = 0;
      range.endValue = 90;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#DE8F6E");
      range.axisFill.zIndex = - 1;

      let range2 = axis.axisRanges.create();
      range2.value = 90;
      range2.endValue = 95;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color("#DBD56E");
      range2.axisFill.zIndex = - 1;

      let range3 = axis.axisRanges.create();
      range3.value = 95;
      range3.endValue = 100;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color("#88AB75");
      range3.axisFill.zIndex = - 1;

      // AGREGAR BARRA
      this.hand2 = chart.hands.push(new am4charts.ClockHand());
      this.hand2.value = 0;
      this.hand2.pin.disabled = true;
      this.hand2.fill = am4core.color("#2D93AD");
      this.hand2.stroke = am4core.color("#2D93AD");
      this.hand2.innerRadius = am4core.percent(50);
      this.hand2.radius = am4core.percent(80);
      this.hand2.startWidth = 15;

      // NUMERO CENTRAL
      this.label2 = chart.radarContainer.createChild(am4core.Label);
      this.label2.isMeasured = false;
      this.label2.fontSize = 28;
      this.label2.x = am4core.percent(50);
      this.label2.y = am4core.percent(100);
      this.label2.horizontalCenter = "middle";
      this.label2.verticalCenter = "bottom";
      this.label2.text = '';

    });

    this.zone.runOutsideAngular(() => {
      // CREAR GRAFICO
      let chart = am4core.create("chartdiv3", am4charts.GaugeChart);
      this.titulo3 = 'OTIF';

      // CONFIGURACIÓN DE VELOCIMETRO
      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(80);

      // ANCHO DE BARRA
      chart.innerRadius = -50;

      // RANGOS 
      let range = axis.axisRanges.create();
      range.value = 0;
      range.endValue = 85;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#DE8F6E");
      range.axisFill.zIndex = - 1;

      let range2 = axis.axisRanges.create();
      range2.value = 85;
      range2.endValue = 95;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color("#DBD56E");
      range2.axisFill.zIndex = - 1;

      let range3 = axis.axisRanges.create();
      range3.value = 95;
      range3.endValue = 100;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color("#88AB75");
      range3.axisFill.zIndex = - 1;

      // AGREGAR BARRA
      this.hand3 = chart.hands.push(new am4charts.ClockHand());
      this.hand3.value = 0;
      this.hand3.pin.disabled = true;
      this.hand3.fill = am4core.color("#2D93AD");
      this.hand3.stroke = am4core.color("#2D93AD");
      this.hand3.innerRadius = am4core.percent(50);
      this.hand3.radius = am4core.percent(80);
      this.hand3.startWidth = 15;

      // NUMERO CENTRAL
      this.label3 = chart.radarContainer.createChild(am4core.Label);
      this.label3.isMeasured = false;
      this.label3.fontSize = 28;
      this.label3.x = am4core.percent(50);
      this.label3.y = am4core.percent(100);
      this.label3.horizontalCenter = "middle";
      this.label3.verticalCenter = "bottom";
      this.label3.text = '';

    });

    this.zone.runOutsideAngular(() => {
      // CREAR GRAFICO
      let chart = am4core.create("chartdiv4", am4charts.GaugeChart);
      this.titulo4 = 'Emergencias';

      // CONFIGURACIÓN DE VELOCIMETRO
      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(80);

      // ANCHO DE BARRA
      chart.innerRadius = -50;

      // RANGOS 
      let range = axis.axisRanges.create();
      range.value = 0;
      range.endValue = 95;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#DE8F6E");
      range.axisFill.zIndex = - 1;

      let range2 = axis.axisRanges.create();
      range2.value = 95;
      range2.endValue = 100;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color("#DBD56E");
      range2.axisFill.zIndex = - 1;


      // AGREGAR BARRA
      this.hand4 = chart.hands.push(new am4charts.ClockHand());
      this.hand4.value = 0;
      this.hand4.pin.disabled = true;
      this.hand4.fill = am4core.color("#2D93AD");
      this.hand4.stroke = am4core.color("#2D93AD");
      this.hand4.innerRadius = am4core.percent(50);
      this.hand4.radius = am4core.percent(80);
      this.hand4.startWidth = 15;

      // NUMERO CENTRAL
      this.label4 = chart.radarContainer.createChild(am4core.Label);
      this.label4.isMeasured = false;
      this.label4.fontSize = 28;
      this.label4.x = am4core.percent(50);
      this.label4.y = am4core.percent(100);
      this.label4.horizontalCenter = "middle";
      this.label4.verticalCenter = "bottom";
      this.label4.text = '';

    });

  }

  cargarEmpresa( id:string ) {

    this._empresaService.obtenerEmpresa( id )
            .subscribe( empresa => {
              console.log(empresa);
              this.empresa = empresa;
              // this.usuario.empresa_id = usuario.empresa._id;
              // this.cambioEmpresa(this.usuario.empresa_id);
            });
  }

  cargarGraficoUno( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data1:number = +grafico[0].data;
              let data2:number = +grafico[1].data;
              let data3:number = +grafico[2].data;
              data1 = Number(data1.toFixed(2));
              data2 = Number(data2.toFixed(2));
              data3 = Number(data3.toFixed(2));
              this.dataG1 = [ data1, data2, data3 ];
              this.graficos.grafico1.datasets[0].data = this.dataG1;
              let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                               ];
              let mes1 = monthNames[+grafico[0].mes - 1];
              let mes2 = monthNames[+grafico[0].mes - 2];
              let mes3 = monthNames[+grafico[0].mes - 3];
              this.graficos.grafico1.labels = [mes1, mes2, mes3];
            });
  }

  cargarGraficoDos( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data1:number = +grafico[0].data;
              let data2:number = +grafico[1].data;
              let data3:number = +grafico[2].data;
              data1 = Number(data1.toFixed(2));
              data2 = Number(data2.toFixed(2));
              data3 = Number(data3.toFixed(2));
              this.dataG2 = [ data1, data2, data3 ];
              this.graficos.grafico2.datasets[0].data = this.dataG2;
              let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                               ];
              let mes1 = monthNames[+grafico[0].mes - 1];
              let mes2 = monthNames[+grafico[0].mes - 2];
              let mes3 = monthNames[+grafico[0].mes - 3];
              this.graficos.grafico2.labels = [mes1, mes2, mes3];
            });
  }

  cargarGraficoTres( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data1:number = +grafico[0].data;
              let data2:number = +grafico[1].data;
              let data3:number = +grafico[2].data;
              data1 = Number(data1.toFixed(2));
              data2 = Number(data2.toFixed(2));
              data3 = Number(data3.toFixed(2));
              this.dataG3 = [ data1, data2, data3 ];
              this.graficos.grafico3.datasets[0].data = this.dataG3;

              let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                               ];
              let mes1 = monthNames[+grafico[0].mes - 1];
              let mes2 = monthNames[+grafico[0].mes - 2];
              let mes3 = monthNames[+grafico[0].mes - 3];
              this.graficos.grafico3.labels = [mes1, mes2, mes3];
            });
  }

  cargarGraficoCuatro( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data1:number = +grafico[0].data;
              let data2:number = +grafico[1].data;
              let data3:number = +grafico[2].data;
              data1 = Number(data1.toFixed(2));
              data2 = Number(data2.toFixed(2));
              data3 = Number(data3.toFixed(2));
              this.dataG4 = [ data1, data2, data3 ];
              this.graficos.grafico4.datasets[0].data = this.dataG4;
              let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                               ];
              // let date = new Date();
              // let mes1 = monthNames[date.getMonth()];
              // let mes2 = monthNames[date.getMonth() - 1];
              // let mes3 = monthNames[date.getMonth() - 2];
              let mes1 = monthNames[+grafico[0].mes - 1];
              let mes2 = monthNames[+grafico[0].mes - 2];
              let mes3 = monthNames[+grafico[0].mes - 3];
              this.graficos.grafico4.labels = [mes1, mes2, mes3];
            });
  }

  cargarGraficoCinco( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(2));
              this.dataG5 = [data, 1000, 500];
              this.graficos.grafico5.data = this.dataG5;
            });
  }

  cargarGraficoSeis( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(2));
              this.dataG6 = [data, 100 - data];
              this.graficos.grafico6.data = this.dataG6;
            });
  }

  cargarGraficoSiete( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(2));
              this.dataG7 = [data, 100 - data];
              this.graficos.grafico7.data = this.dataG7;
            });
  }

  cargarGraficoOcho( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(2));
              this.dataG8 = [data, 100 - data];
              this.graficos.grafico8.data = this.dataG8;
            });
  }

  cargarGraficoNueve( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(2));
              this.dataG9 = [data, 100 - data];
              this.graficos.grafico9.data = this.dataG9;
            });
  }

  cargarGraficoDiez( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(1));
              this.dataG10 = data;
              this.hand1.value = this.dataG10;
              this.label1.text = this.dataG10 + '%';
            });
  }

  cargarGraficoOnce( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
    .subscribe( grafico => {
      let data:number = +grafico[0].data;
      data = Number(data.toFixed(1));
      this.dataG11 = data;
      this.hand2.value = this.dataG11;
      this.label2.text = this.dataG11 + '%';
    });
  }

  cargarGraficoDoce( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
    .subscribe( grafico => {
      let data:number = +grafico[0].data;
      data = Number(data.toFixed(1));
      this.dataG12 = data;
      this.hand3.value = this.dataG12;
      this.label3.text = this.dataG12 + '%';
    });
  }

  cargarGraficoTrece( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
    .subscribe( grafico => {
      let data:number = +grafico[0].data;
      data = Number(data.toFixed(1));
      this.dataG13 = data;
      this.hand4.value = this.dataG13;
      this.label4.text = this.dataG13 + '%';
    });
  }

  cargarGraficoCatorce( id:string, tipo:string ) {

    this._graficoService.obtenerGrafico( id, tipo )
            .subscribe( grafico => {
              let data:number = +grafico[0].data;
              data = Number(data.toFixed(1));
              this.dataG14 = data;
            });
  }

}

