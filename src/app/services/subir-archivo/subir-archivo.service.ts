import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Imagen subida');
          resolve( JSON.parse( xhr.response ) );
        } else {
          console.log('Fallo la subida');
          reject( xhr.response );
        }
      }
    };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    // LO MISMO EN TEMPLATE LITERAL
    // let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

      xhr.open('PUT', url, true ); // El true indica que es asincrono
      xhr.send(formData);

    });

  }

}
