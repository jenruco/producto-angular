import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/service/login-service';
import { Router } from '@angular/router';
import { ProductoService } from '../service/producto-service';
import { ProductoResDto } from './dto/producto-res-dto';
import { ModalProductoComponent } from '../modal-producto/modal-producto';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductoData } from '../dto/modal-producto-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit {

  nombreUsuario: string = '';
  listaProductos: ProductoResDto[] = [];

  id: number = 0;

  constructor(
    private _productoService: ProductoService,
    private _cdr: ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.id = this._loginService.getIdUsusarioSesion();
    this.getTodosProductos();
  }

  getTodosProductos() {
    this._productoService.getTodosProductos().subscribe({
      next: (res: ProductoResDto[]) => {
        this.listaProductos = res;
        this.nombreUsuario = this._loginService.getNombreSesion();
        this._cdr.detectChanges();
        console.log(this.listaProductos);
      },
      error: (error) => {
        console.error("Error al obtener todos los productos" + error);
      }
    });
  }

  abrirModalEditar(producto: ProductoResDto) {
    const data: ModalProductoData = {
      producto: producto,
      modoEdicion: true,
    }
    const modal = this._dialog.open(ModalProductoComponent, {
      width: '500px',
      data
    });

    modal.afterClosed().subscribe((x) => {
      this.getTodosProductos();
    })
  }

  abrirModalCrear() {
    const data: ModalProductoData = {
      modoEdicion: false,
    }
    const modal = this._dialog.open(ModalProductoComponent, {
      width: '500px',
      data
    });

    modal.afterClosed().subscribe((x) => {
      this.getTodosProductos();
    })
  }

  eliminarProducto(producto: ProductoResDto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this._productoService.eliminarProducto(producto.id).subscribe({
          next: (res: ProductoResDto) => {

            this._cdr.detectChanges();
            console.log(res);
            this.getTodosProductos();
            Swal.fire('Exito', '¡Producto eliminado!', 'success');
          },
          error: (error) => {
            console.error("Error al eliminar el producto" + error);
          }
        });
      }
    });
  }

  cerrarSesion() {
    this._loginService.cerrarSesion();
    this._router.navigate(['/']);
  }

}
