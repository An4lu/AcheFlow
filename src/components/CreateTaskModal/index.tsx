import { useState, useContext, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { ProjectsContext } from '../../contexts/ProjectContext';
<<<<<<< HEAD
import {
    FormContainer, FormGroup, Input, Label, Select, SubmitButton, TextArea,
    ToggleModeButton, ImportSection, UploadInput, ImportTitle,
    PreviewTable, PreviewHeader, PreviewRow, ActionCell, DeleteButton
} from './styles'; 
// <<< MUDANÇA: Imports atualizados para a lógica de lote
import { 
    createTask, createTasksBulk, type TaskPayload
} from '../../services/api';
// <<< FIM DA MUDANÇA
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { TrashIcon } from '@phosphor-icons/react';
import type { RawImportedTask, ProcessedTask } from '../../types/project'; 

// --- LÓGICA COPIADA DE CreateProjectModal ---
const calculatePrazo = (duration: string): string => {
    const today = new Date();
    const durationMatch = duration ? duration.match(/(\d+)/) : null;
    const days = durationMatch ? parseInt(durationMatch[0], 10) : 1;
    today.setDate(today.getDate() + days);
    return today.toISOString().split('T')[0];
};

const statusOptions = ['não iniciada', 'em andamento', 'concluída', 'congelada'];

const getStatusFromPercentage = (percent: number | undefined | null): string => {
    const p = parseFloat(String(percent)) || 0;
    if (p === 100) {
        return 'concluída';
    }
    if (p > 0) {
        return 'em andamento';
    }
    return 'não iniciada';
};
// --- FIM DA LÓGICA COPIADA ---


export function CreateTaskModal() {
    const { isTaskModalOpen, closeTaskModal, projects, funcionarios, refreshData } = useContext(ProjectsContext);
    const { user } = useAuth(); 
    const [isLoading, setIsLoading] = useState(false);

    
    const [isImportMode, setIsImportMode] = useState(false);
    const [importedTasks, setImportedTasks] = useState<ProcessedTask[]>([]);
    const [targetProjectId, setTargetProjectId] = useState<string>(''); 

    
    useEffect(() => {
        if (!isTaskModalOpen) {
            setIsLoading(false);
            setIsImportMode(false);
            setImportedTasks([]);
            setTargetProjectId('');
        }
    }, [isTaskModalOpen]);
=======
import { FormContainer, FormGroup, Input, Label, Select, SubmitButton, TextArea } from '../Form/styles';
import { createTask, type TaskPayload } from '../../services/api';
import { toast } from 'react-toastify';

export function CreateTaskModal() {
    const { isTaskModalOpen, closeTaskModal, projects, funcionarios, refreshData } = useContext(ProjectsContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
>>>>>>> parent of 17f73be (Exportar em lote - tarefas)

    const percentValue = parseFloat(data.percentual_concluido as string) || 0;
    
    let statusValue: string;
    if (percentValue === 100) {
        statusValue = 'concluída';
    } else if (percentValue > 0) {
        statusValue = 'em andamento';
    } else {
        statusValue = 'não iniciada';
    }
    
    if (data.status === 'congelada') {
         statusValue = 'congelada';
    }

    const payload: TaskPayload = {
        nome: data.nome as string,
        projeto_id: data.projeto_id as string,
        responsavel_id: data.responsavel_id as string,
        descricao: data.descricao as string,
        prioridade: data.prioridade as 'baixa' | 'média' | 'alta',
        
        status: statusValue as any, 
        
        prazo: data.prazo as string,
        classificacao: data.classificacao as string,
        fase: data.fase as string,
        condicao: data.condicao as string,
        
        percentual_concluido: percentValue / 100 
    };
<<<<<<< HEAD

    const handleTaskAttributeChange = (index: number, field: 'responsavel_id' | 'status', value: string) => {
        const updatedTasks = [...importedTasks];
        updatedTasks[index][field] = value;
        setImportedTasks(updatedTasks);
    };

    const handleRemoveTask = (indexToRemove: number) => {
        setImportedTasks(currentTasks => currentTasks.filter((_, index) => index !== indexToRemove));
    };
    // --- FIM DAS FUNÇÕES COPIADAS ---


    // (Função original - para o modo manual)
    const handleManualSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const percentValue = parseFloat(data.percentual_concluido as string) || 0;

        let statusValue: string;
        if (percentValue === 100) {
            statusValue = 'concluída';
        } else if (percentValue > 0) {
            statusValue = 'em andamento';
        } else {
            statusValue = 'não iniciada';
        }
        if (data.status === 'congelada') {
            statusValue = 'congelada';
        }

        const payload: TaskPayload = {
            nome: data.nome as string,
            projeto_id: data.projeto_id as string,
            responsavel_id: data.responsavel_id as string,
            descricao: data.descricao as string,
            prioridade: data.prioridade as 'baixa' | 'média' | 'alta',
            status: statusValue as any,
            prazo: data.prazo as string,
            classificacao: data.classificacao as string,
            fase: data.fase as string,
            condicao: data.condicao as string,
            percentual_concluido: percentValue / 100
        };

        try {
            await createTask(payload);
            toast.success('Tarefa criada com sucesso!');
            closeTaskModal();
            refreshData();
        } catch (error) {
            toast.error('Falha ao criar tarefa.');
        } finally {
            setIsLoading(false);
        }
    };

   // MUDANÇA: Nova função para o submit do modo de importação
    const handleImportSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) {
            toast.warn('Você precisa estar logado.');
            return;
        }
        if (importedTasks.length === 0) {
            toast.warn('Nenhum arquivo ou tarefa para importar.');
            return;
        }
        if (!targetProjectId) {
            toast.warn('Por favor, selecione um projeto para vincular as tarefas.');
            return;
        }

        setIsLoading(true);
        try {
            // --- INÍCIO DA CORREÇÃO ---

            // 1. Mapear todas as tarefas para o formato TaskPayload DE UMA VEZ
            const tasksToCreate: TaskPayload[] = importedTasks.map(task => {
                return {
                    nome: task.Nome,
                    projeto_id: targetProjectId, // Usa o ID do select
                    responsavel_id: task.responsavel_id || user._id, // Default para o usuário logado
                    descricao: task['Como Fazer'] || '',
                    prioridade: 'média',
                    status: task.status as TaskPayload['status'],
                    prazo: calculatePrazo(task.Duração),
                    numero: String(task.Número),
                    classificacao: task.Categoria,
                    fase: task.Fase,
                    condicao: task.Condição,
                    documento_referencia: task['Documento Referência'],
                    concluido: task.status === 'concluída',
                    percentual_concluido: (task['% Concluída'] || 0) / 100,
                };
            });

            // 2. Criar o payload final da requisição em lote
            const bulkPayload = {
                tasks: tasksToCreate,
                user_id: user._id
            };

            // 3. Chamar a API em lote APENAS UMA VEZ
            const response = await createTasksBulk(bulkPayload);
            
            // 4. Processar a resposta do lote
            const successCount = response.data.total || 0;
            const errorCount = response.data.erros?.length || 0;
            
            // --- FIM DA CORREÇÃO ---

            if (successCount > 0) {
                toast.success(`${successCount} ${successCount === 1 ? 'tarefa foi' : 'tarefas foram'} importadas com sucesso!`);
            }
            if (errorCount > 0) {
                toast.error(`${errorCount} ${errorCount === 1 ? 'tarefa falhou' : 'tarefas falharam'} ao importar.`);
                console.error("Erros na importação em lote:", response.data.erros);
            }

            closeTaskModal();
            refreshData();

        } catch (error: any) { // Pega erros da chamada da API (ex: 500)
            const errorMsg = error.response?.data?.erro || error.response?.data?.detail || 'Ocorreu um erro inesperado durante a importação.';
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

=======
    
    try {
        await createTask(payload);
        toast.success('Tarefa criada com sucesso!');
        closeTaskModal();
        refreshData();
    } catch (error) {
        toast.error('Falha ao criar tarefa.');
    } finally {
        setIsLoading(false);
    }
};
>>>>>>> parent of 17f73be (Exportar em lote - tarefas)

    return (
        <Modal isOpen={isTaskModalOpen} onClose={closeTaskModal} title="Criar Nova Tarefa">
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="projeto_id">Vincular ao Projeto*</Label>
                    <Select id="projeto_id" name="projeto_id" required disabled={isLoading}>
                        <option value="">Selecione um projeto</option>
                        {projects.map(project => (
                            <option key={project._id} value={project._id}>{project.nome}</option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="nome">Nome da Tarefa*</Label>
                    <Input id="nome" name="nome" type="text" placeholder="Ex: Desenvolver tela de login" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="responsavel_id">Responsável*</Label>
                    <Select id="responsavel_id" name="responsavel_id" required disabled={isLoading}>
                        <option value="">Selecione um funcionário</option>
                        {funcionarios.map(func => (
                            <option key={func._id} value={func._id}>{func.nome} {func.sobrenome}</option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="descricao">Descrição</Label>
                    <TextArea id="descricao" name="descricao" rows={3} placeholder="Detalhes sobre como executar a tarefa..." disabled={isLoading} />
                </FormGroup>

<<<<<<< HEAD
                        {importedTasks.length > 0 && (
                            <PreviewTable>
                                <thead>
                                    <PreviewRow>
                                        <PreviewHeader>Nome da Tarefa</PreviewHeader>
                                        <PreviewHeader>Status</PreviewHeader>
                                        <PreviewHeader>Responsável (Opcional)</PreviewHeader>
                                        <PreviewHeader>Ações</PreviewHeader>
                                    </PreviewRow>
                                </thead>
                                <tbody>
                                    {importedTasks.map((task, index) => (
                                        <PreviewRow key={task.Número || index}>
                                            <td>{task.Nome}</td>
                                            <ActionCell>
                                                <Select value={task.status} onChange={(e) => handleTaskAttributeChange(index, 'status', e.target.value)} >
                                                    {/* <<< MUDANÇA: Removido style inline */}
                                                    {statusOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                    {/* <<< FIM DA MUDANÇA */}
                                                </Select>
                                            </ActionCell>
                                            <ActionCell>
                                                <Select value={task.responsavel_id || ''} onChange={(e) => handleTaskAttributeChange(index, 'responsavel_id', e.target.value)} >
                                                    <option value="">Nenhum (usará o seu)</option>
                                                    {funcionarios.map(f => (<option key={f._id} value={f._id}>{f.nome} {f.sobrenome}</option>))}
                                                </Select>
                                            </ActionCell>
                                            <ActionCell style={{ width: '50px', textAlign: 'center' }}>
                                                <DeleteButton type="button" onClick={() => handleRemoveTask(index)}>
                                                    <TrashIcon size={20} />
                                                </DeleteButton>
                                            </ActionCell>
                                        </PreviewRow>
                                    ))}
                                </tbody>
                            </PreviewTable>
                        )}
                    </ImportSection>
=======
                <FormGroup>
                    <Label htmlFor="prioridade">Prioridade*</Label>
                    <Select id="prioridade" name="prioridade" defaultValue="média" required disabled={isLoading}>
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                    </Select>
                </FormGroup>
>>>>>>> parent of 17f73be (Exportar em lote - tarefas)

                <FormGroup>
                    <Label htmlFor="status">Status Inicial*</Label>
                    <Select id="status" name="status" defaultValue="não iniciada" required disabled={isLoading}>
                        <option value="não iniciada">Não Iniciada</option>
                        <option value="em andamento">Em Andamento</option>
                        <option value="congelada">Congelada</option>
                        <option value="concluída">Concluída</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="prazo">Prazo*</Label>
                    <Input id="prazo" name="prazo" type="date" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="classificacao">Categoria</Label>
                    <Input id="classificacao" name="classificacao" type="text" placeholder="Ex: Frascos de Vidro" disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="fase">Fase</Label>
                    <Input id="fase" name="fase" type="text" placeholder="Ex: 1. Escopo & Briefing" disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="condicao">Condição</Label>
                    <Input id="condicao" name="condicao" type="text" placeholder="Ex: Sempre" disabled={isLoading} />
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="percentual_concluido">Progresso (%)</Label>
                    <Input 
                        id="percentual_concluido" 
                        name="percentual_concluido" 
                        type="number" 
                        min="0"
                        max="100"
                        step="1"
                        placeholder="Ex: 95 (para 95%)" 
                        defaultValue="0"
                        disabled={isLoading} 
                    />
                </FormGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Criando...' : 'Criar Tarefa'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
}