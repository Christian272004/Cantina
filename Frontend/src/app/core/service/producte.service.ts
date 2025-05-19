import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducteService {
  private apiUrl = environment.apiUrl; // URL de l'API

  constructor(private http: HttpClient) { }

  getProductes() {
    return this.http.get(`${this.apiUrl}/productes`, { withCredentials: true });
  }

  addProducte(producte: any) {
    return this.http.post(`${this.apiUrl}/productes`, producte, { withCredentials: true });
  }
}
