import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PrestamoAdmin } from './prestamo-admin/prestamo-admin';
import { PrestamoUser } from './prestamo-user/prestamo-user';
import { authGuard } from './core/guard/auth-guard';

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
        path: 'prestamo-admin',
        component: PrestamoAdmin,
        canActivate: [authGuard]
    },
    {
        path: 'prestamo-user',
        component: PrestamoUser,
        canActivate: [authGuard]
    }
];
