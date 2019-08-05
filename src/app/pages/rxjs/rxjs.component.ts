import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log ( 'subs', numero ),
      error => console.error('Error en el obs', error ),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Te cambiaste de pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval ( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 10 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval(intervalo);
        //   observer.error('auxilio!');
        // }

      }, 1000);

    }).pipe(
      map( resp => resp.valor ),
      filter ( ( valor, index ) => {

        // Filtrando los numeros pares, solo aparecen los impares

        if (( valor % 2 ) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );

  }

}
