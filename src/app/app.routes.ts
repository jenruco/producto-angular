import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './core/guard/auth-guard';
import { Producto } from './producto/producto';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'producto',
        component: Producto,
        canActivate: [authGuard]
    }
];
