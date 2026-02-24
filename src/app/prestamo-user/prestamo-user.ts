import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrestamoResDto } from '../prestamo-admin/dto/prestamo-res-dto';
import { PrestamoService } from '../service/prestamo-service';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { PrestamoReqDto } from './dto/prestamo-req-dto';
import { LoginService } from '../login/service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestamo-user',
  imports: [LowerCasePipe, CommonModule, FormsModule],
  templateUrl: './prestamo-user.html',
  styleUrl: './prestamo-user.css',
})
export class PrestamoUser implements OnInit {

  nombreUsuario: string = '';
  listaPrestamos: PrestamoResDto[] = [];

  id: number = 0;
  vistaActiva: string = 'prestamos';

  monto: number = 0;
  plazo: number = 0;
  
  constructor(
    private _prestamosService: PrestamoService,
    private _cdr: ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.id = this._loginService.getIdUsusarioSesion();
    this.getPrestamosPorUsuario();
  }

  getPrestamosPorUsuario() {
    this._prestamosService.getPrestamosPorUsuario(this.id).subscribe({
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

  solicitarPrestamo() {
    const req: PrestamoReqDto = {
      usuario: {
        id: this.id
      },
      monto: this.monto,
      plazo: this.plazo,
      estado: "PENDIENTE"
    }

    this._prestamosService.crearPrestamo(req).subscribe({
      next: (res: PrestamoResDto) => {
        this._cdr.detectChanges();
        this.getPrestamosPorUsuario();
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

}
