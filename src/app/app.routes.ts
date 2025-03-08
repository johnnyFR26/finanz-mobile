import { Routes } from '@angular/router';
import { isUserLogged } from './guards/is-user-logged.can-activate.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
        canActivate: [isUserLogged],
        children: [
            {
                path: 'dev',
                loadComponent: () => import('./pages/home/developers/dev.component').then(m => m.DevComponent)
            },
            {
                path: 'account',
                loadComponent: () => import('./pages/home/createAccount/create-account.component').then(m => m.CreateAccountComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/log-in.component').then(m => m.LogInComponent)
    },
    {
        path: 'signin',
        loadComponent: () => import('./pages/signin/sign-in.component').then(m => m.SignInComponent)
    },
    {
        path: 'dev',
        loadComponent: () => import('./pages/home/developers/dev.component').then(m => m.DevComponent)
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
