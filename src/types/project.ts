export interface RawImportedTask {
    'Número': number;
    'Classificação': string;
    'Categoria': string;
    'Fase': string;
    'Condição': string;
    'Nome': string;
    'Duração': string;
    'Como Fazer': string;
    'Documento Referência': string;
    '% Concluída': number;
    'Status'?: string;
}

export interface ProcessedTask extends RawImportedTask {
    responsavel_id?: string | null;
    status: string;
}

export interface TaskToCreate {
    id: number;
    nome: string;
    descricao: string;
    prioridade: 'baixa' | 'média' | 'alta';
    prazo: string;
    responsavelEmail: string;
}