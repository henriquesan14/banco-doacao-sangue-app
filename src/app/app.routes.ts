import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./features/estoque-sangue/estoque-sangue.routes')
            .then(mod => mod.ESTOQUE_SANGUE_ROUTES),
    },
    {
        path: 'doadores', loadChildren: () => import('./features/doadores/doadores.routes')
            .then(mod => mod.DOADORES_ROUTES),
    },
    {
        path: 'doacoes', loadChildren: () => import('./features/doacoes/doacoes.routes')
            .then(mod => mod.DOACOES_ROUTES),
    },
];
