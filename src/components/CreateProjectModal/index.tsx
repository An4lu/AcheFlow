import { useState, useContext, type ChangeEvent, type FormEvent } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { TrashIcon } from '@phosphor-icons/react';
import { Modal } from '../Modal';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { FormContainer, FormGroup, Input, Label, Select, SubmitButton, TextArea } from '../Form/styles';
import { ImportSection, UploadInput, Divider, ImportTitle, PreviewTable, PreviewHeader, PreviewRow, ActionCell, DeleteButton } from './styles-specific';
import { createProject, createTask, type TaskPayload } from '../../services/api';
import type { RawImportedTask, ProcessedTask } from '../../types/project';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const calculatePrazo = (duration: string): string => {
    const today = new Date();
    const durationMatch = duration ? duration.match(/(\d+)/) : null;
    const days = durationMatch ? parseInt(durationMatch[0], 10) : 1;
    today.setDate(today.getDate() + days);
    return today.toISOString().split('T')[0];
};

const statusOptions = ['não iniciada', 'em andamento', 'concluída', 'congelada'];

export function CreateProjectModal() {
    const { isProjectModalOpen, closeProjectModal, funcionarios, refreshData } = useContext(ProjectsContext);
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [importedTasks, setImportedTasks] = useState<ProcessedTask[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;
            let rawData: RawImportedTask[] = [];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (fileExtension === 'csv') {
                rawData = Papa.parse(data as string, { header: true, skipEmptyLines: true }).data as RawImportedTask[];
            } else {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                rawData = XLSX.utils.sheet_to_json<RawImportedTask>(workbook.Sheets[sheetName]);
            }

            const processed = rawData
                .filter(t => t.Nome)
                .map(t => ({
                    ...t,
                    responsavel_id: null,
                    status: t['Status'] && statusOptions.includes(t['Status'].toLowerCase()) ? t['Status'].toLowerCase() : 'não iniciada',
                }));
            setImportedTasks(processed);
        };
        reader.readAsBinaryString(file);
    };

    const handleTaskAttributeChange = (index: number, field: 'responsavel_id' | 'status', value: string) => {
        const updatedTasks = [...importedTasks];
        updatedTasks[index][field] = value;
        setImportedTasks(updatedTasks);
    };

    const handleRemoveTask = (indexToRemove: number) => {
        setImportedTasks(currentTasks => currentTasks.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) {
            toast.warn('Você precisa estar logado.');
            return;
        }
        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const projectData = Object.fromEntries(formData.entries());
        const projectPayload = {
            nome: projectData.nome as string,
            responsavel_id: projectData.responsavel_id as string,
            situacao: projectData.situacao as string,
            prazo: projectData.prazo as string,
            descricao: projectData.descricao as string,
            categoria: projectData.categoria as string,
        };
        try {
            const projectResponse = await createProject(projectPayload);
            const newProjectId = projectResponse.data._id;
            
            if (importedTasks.length > 0) {
                for (const task of importedTasks) {
                    const taskPayload: Partial<TaskPayload> = {
                        nome: task.Nome,
                        projeto_id: newProjectId,
                        responsavel_id: task.responsavel_id || user._id,
                        descricao: task['Como Fazer'] || '',
                        prioridade: 'média',
                        status: task.status as TaskPayload['status'],
                        prazo: calculatePrazo(task.Duração), 
                        numero: String(task.Número),
                        classificacao: task.Classificação,
                        fase: task.Fase,
                        condicao: task.Condição,
                        documento_referencia: task['Documento Referência'],
                        concluido: task.status === 'concluída',
                    };
                    await createTask(taskPayload as TaskPayload);
                }
            }
            toast.success(`Projeto "${projectPayload.nome}" criado com sucesso!`);
            setImportedTasks([]);
            closeProjectModal();
            refreshData();
        } catch (error) {
            toast.error('Falha ao criar o projeto ou as tarefas.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isProjectModalOpen} onClose={closeProjectModal} title="Criar Novo Projeto">
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="nome">Nome do Projeto*</Label>
                    <Input id="nome" name="nome" type="text" required disabled={isLoading} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="responsavel_id">Responsável pelo Projeto*</Label>
                    <Select id="responsavel_id" name="responsavel_id" defaultValue={user?._id} required disabled={isLoading}>
                        <option value="">Selecione um funcionário</option>
                        {funcionarios.map(func => (<option key={func._id} value={func._id}>{func.nome} {func.sobrenome}</option>))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="descricao">Descrição do Projeto</Label>
                    <TextArea id="descricao" name="descricao" rows={3} disabled={isLoading} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" name="categoria" type="text" disabled={isLoading} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="situacao">Situação*</Label>
                    <Select id="situacao" name="situacao" required disabled={isLoading}>
                        <option value="Não iniciado">Não Iniciado</option>
                        <option value="Em planejamento">Em Planejamento</option>
                        <option value="Em andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="prazo">Prazo Final do Projeto*</Label>
                    <Input id="prazo" name="prazo" type="date" required disabled={isLoading} />
                </FormGroup>
                <Divider>E/OU</Divider>
                <ImportSection>
                    <ImportTitle>Importar Tarefas do Projeto (Opcional)</ImportTitle>
                    <UploadInput id="importFile" type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} disabled={isLoading} />
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
                                                {statusOptions.map(opt => (
                                                    <option key={opt} value={opt} style={{ textTransform: 'capitalize' }}>{opt}</option>
                                                ))}
                                            </Select>
                                        </ActionCell>
                                        <ActionCell>
                                            <Select value={task.responsavel_id || ''} onChange={(e) => handleTaskAttributeChange(index, 'responsavel_id', e.target.value)} >
                                                <option value="">Nenhum</option>
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
                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Criando...' : 'Criar Projeto e Tarefas'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
}