import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrestamoService } from '../service/prestamo-service';
import { PrestamoResDto } from './dto/prestamo-res-dto';
import { CommonModule } from '@angular/common';
import { ARPrestamoReqDto } from './dto/ar-prestamo-req-dto';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login-service';

@Component({
  selector: 'app-prestamo-admin',
  imports: [CommonModule],
  templateUrl: './prestamo-admin.html',
  styleUrl: './prestamo-admin.css',
})
export class PrestamoAdmin implements OnInit {
  nombreUsuario: string = '';
  listaPrestamos: PrestamoResDto[] = [];

  constructor(
    private _prestamosService: PrestamoService,
    private _cdr: ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router
    
  ) {}

  ngOnInit() {
    this.getTodosPrestamos();
  }

  getTodosPrestamos() {
    this._prestamosService.getTodosPrestamos().subscribe({
      next: (res: PrestamoResDto[]) => {
        this.listaPrestamos = res;
        this.nombreUsuario = this._loginService.getNombreSesion();
        this._cdr.detectChanges();
        console.log(this.listaPrestamos);
      },
      error: (error) => {
        console.error("Error al obtener todos los prestamos" + error);
      }
    });
  }

  cerrarSesion() {
    this._loginService.cerrarSesion();
    this._router.navigate(['/']);
  }

  aprobar(id: number) {

    const req: ARPrestamoReqDto = {
      id: id,
      estado: "APROBADO"
    };


    this._prestamosService.aprobarRechazarPrestamo(req).subscribe({
      next: (res: PrestamoResDto) => {
        console.log(res);
        this.getTodosPrestamos();
      },
      error: (error) => {
        console.error("Error al aprobar el prestamo" + error);
      }
    });
  }

  rechazar(id: number) {
    const req: ARPrestamoReqDto = {
      id: id,
      estado: "RECHAZADO"
    };


    this._prestamosService.aprobarRechazarPrestamo(req).subscribe({
      next: (res: PrestamoResDto) => {
        console.log(res);
        this.getTodosPrestamos();
      },
      error: (error) => {
        console.error("Error al rechazar el prestamo" + error);
      }
    });
  }
}
