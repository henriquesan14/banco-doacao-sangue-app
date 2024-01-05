import { Route } from "@angular/router";
import { CadastroDoadoresComponent } from "./cadastro-doadores/cadastro-doadores.component";
import { ListaDoadoresComponent } from "./lista-doadores/lista-doadores.component";

export const DOADORES_ROUTES: Route[] = [
  {path: '', component: ListaDoadoresComponent},
  {path: 'cadastro', component: CadastroDoadoresComponent},
];