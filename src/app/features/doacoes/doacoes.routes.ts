import { Route } from "@angular/router";
import { CadastroDoacoesComponent } from "./cadastro-doacoes/cadastro-doacoes.component";
import { ListaDoacoesComponent } from "./lista-doacoes/lista-doacoes.component";

export const PARTES_ROUTES: Route[] = [
  {path: '', component: ListaDoacoesComponent},
  {path: 'cadastro', component: CadastroDoacoesComponent},
];