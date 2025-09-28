export interface RawImportedTask {
  'Número': number;
  'Classificação': 'baixa' | 'média' | 'alta';
  'Nome': string;
  'Duração': string; 
  'Como Fazer': string;
  'ResponsavelEmail': string; 
  [key: string]: any; 
}

export interface TaskToCreate {
  id: number; 
  nome: string;
  descricao: string;
  prioridade: 'baixa' | 'média' | 'alta';
  prazo: string;
  responsavelEmail: string;
}