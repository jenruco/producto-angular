import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrestamoResDto } from '../prestamo-admin/dto/prestamo-res-dto';
import { ARPrestamoReqDto } from '../prestamo-admin/dto/ar-prestamo-req-dto';
import { PrestamoReqDto } from '../prestamo-user/dto/prestamo-req-dto';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {

  private URL = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) {}

  getTodosPrestamos(): Observable<PrestamoResDto[]> {
    return this.http.get<PrestamoResDto[]>(`${this.URL}/api/prestamos`);
  }

  getPrestamosPorUsuario(id: number): Observable<PrestamoResDto[]> {
    return this.http.get<PrestamoResDto[]>(`${this.URL}/api/prestamos/${id}`);
  }

  aprobarRechazarPrestamo(req: ARPrestamoReqDto): Observable<PrestamoResDto> {
    return this.http.post<PrestamoResDto>(`${this.URL}/api/prestamos/aprobarrechazar`, req);
  }

  crearPrestamo(req: PrestamoReqDto): Observable<PrestamoResDto> {
    return this.http.post<PrestamoResDto>(`${this.URL}/api/prestamos`, req);
  }
  
}
