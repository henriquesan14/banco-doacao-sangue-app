import { Endereco } from "./endereco.interface";

export interface DoadorExt {
    id: number;
    nomeCompleto: string;
    email: string;
    dataNascimento: string;
    genero: string;
    peso: number;
    tipoSanguineo: string;
    fatorRh: string;
    endereco: Endereco;
    criadoEm: string;
}