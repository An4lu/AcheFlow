export interface User {
    _id: string;
    nome: string;
    sobrenome: string;
    email: string;
    cargo: string;
    departamento: string;
    fotoPerfil?: string;
    dataCadastro: string;
}