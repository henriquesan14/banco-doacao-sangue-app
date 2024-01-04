import { Doador } from "./doador.interface";

export interface Doacao {
    id: number;
    quantidadeMl: string;
    criadoEm: string;
    doador: Doador;
}