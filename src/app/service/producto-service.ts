import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResDto } from '../producto/dto/producto-res-dto';
import { ProductoReqDto } from '../producto/dto/producto-req-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getTodosProductos(): Observable<ProductoResDto[]> {
    return this.http.get<ProductoResDto[]>(`${this.URL}/api/productos`);
  }

  crearProducto(req: ProductoReqDto): Observable<ProductoResDto> {
    return this.http.post<ProductoResDto>(`${this.URL}/api/productos`, req);
  }

  editarProducto(id: number, req: ProductoReqDto): Observable<ProductoResDto> {
    return this.http.put<ProductoResDto>(`${this.URL}/api/productos/${id}`, req);
  }

  eliminarProducto(id: number): Observable<ProductoResDto> {
    return this.http.delete<ProductoResDto>(`${this.URL}/api/productos/${id}`);
  }
  
}
