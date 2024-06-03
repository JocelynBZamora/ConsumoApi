import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyFakeStoreServiceService {
  private apiUrl='https://api.escuelajs.co/api/v1/products';
 constructor(private http: HttpClient){}
 
  getProductos(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getProducto(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getCategorias():Observable<any>{
    return this.http.get('https://api.escuelajs.co/api/v1/categories');
  }
  createProducto(producto:any):Observable<any>{
    
    try {
      return this.http.post<any>("https://api.escuelajs.co/api/v1/products", producto);
  } catch (error) {
      console.error("An error occurred:", error);
      // You can also send error reports to a logging service or server for analysis and monitoring.
      // For example: sendErrorReport(error);
      // Replace 'sendErrorReport' with your actual function to handle error reporting.
      throw error; // Rethrow the error to propagate it further if needed.
  }

  }
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }
  deleteProducto(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
