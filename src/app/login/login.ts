import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginReqDto } from './dto/LoginReqDto';
import { LoginService } from './service/login-service';
import { LoginResDto } from './dto/LoginResDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {}

  loginReq: LoginReqDto = new LoginReqDto;

  ngOnInit() {

  }

  iniciarSesion(): void {
    this._loginService.login(this.loginReq).subscribe({
      next: (response: LoginResDto) => {
        const infoSesion = {
          token: response.token,
          usuarioId: response.id,
          rol: response.rol,
          nombre: response.nombre,
        }
        localStorage.setItem('sesion', JSON.stringify(infoSesion));

        if(infoSesion.rol === 'ADMIN') {
          this._router.navigate(['/prestamo-admin']);
        } else if(infoSesion.rol === 'USER') {
          this._router.navigate(['/prestamo-user']);
        }
      },
      error: (error) => {
        localStorage.setItem('sesion', '');
        console.error('Error al iniciar sesión' + error);
      }
    });

  }

}
