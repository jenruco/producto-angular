import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResDto } from '../dto/LoginResDto';
import { LoginReqDto } from '../dto/LoginReqDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private URL = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) {}

  login(req: LoginReqDto): Observable<LoginResDto> {
    return this.http.post<LoginResDto>(`${this.URL}/api/usuarios/login`, req);
  }

  getIdUsusarioSesion(): number {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const usuarioId = sesion.usuarioId;
    return usuarioId;
  }

  getTokenSesion(): string {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion.token;
    return token;
  }

  getRolSesion(): string {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const rol = sesion.rol;
    return rol;
  }

  getNombreSesion(): string {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const nombre = sesion.nombre;
    return nombre;
  }

  cerrarSesion() {
    localStorage.removeItem('sesion');
  }
  
}
