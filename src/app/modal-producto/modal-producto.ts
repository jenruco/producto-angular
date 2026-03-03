import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../service/producto-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalProductoData } from '../dto/modal-producto-data';
import { ProductoReqDto } from '../producto/dto/producto-req-dto';
import { ProductoResDto } from '../producto/dto/producto-res-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './modal-producto.html',
  styleUrl: './modal-producto.css',
})
export class ModalProductoComponent implements OnInit {

  nombreUsuario: string = '';
  modoEdicion: boolean = true;
  idProducto: number = 0;

  formProducto!: FormGroup;
  data = inject<ModalProductoData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ModalProductoComponent>);
  
  constructor(
    private _productoService: ProductoService,
    private _cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    
    this.formProducto = this.fb.group({

      nombre: ['', Validators.required],
  
      precio: [null, [Validators.required, Validators.min(1)]],

      stock: [null, [Validators.required, Validators.min(1)]]
  
    });

    if (this.data?.modoEdicion && this.data.producto) {
      this.formProducto.patchValue({
        nombre: this.data.producto.nombre,
        precio: this.data.producto.precio,
        stock: this.data.producto.stock
      });

      this.idProducto = this.data.producto.id;
    }

    this.modoEdicion = this.data?.modoEdicion || false;
  }

  guardar() {
    if (this.formProducto.invalid) {
      return;
    }

    const req: ProductoReqDto = this.formProducto.value;

    if(this.modoEdicion) {
      this._productoService.editarProducto(this.idProducto, req).subscribe({
        next: (res: ProductoResDto) => {
          this._cdr.detectChanges();
          this.dialogRef.close();
          Swal.fire('Exito', '¡Producto editado!', 'success');
        },
        error: (error) => {
          console.error("Error al editar el producto" + error);
        }
      });
    } else {
      this._productoService.crearProducto(req).subscribe({
        next: (res: ProductoResDto) => {
          this._cdr.detectChanges();
          this.dialogRef.close();
          Swal.fire('Exito', '¡Producto creado!', 'success');
        },
        error: (error) => {
          console.error("Error al guardar el producto" + error);
        }
      });
    }
  }
}
