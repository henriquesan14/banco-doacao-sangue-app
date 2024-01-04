import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'doadores', loadChildren: () => import('./features/doadores/doadores.routes')
            .then(mod => mod.PARTES_ROUTES)
    },
];
