import { useState, useContext, type ChangeEvent, type FormEvent } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Modal } from '../Modal';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { createProject, createTask, type ProjectPayload, type TaskPayload } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import type { RawImportedTask } from '../../types/project';
import { Divider, FormContainer, FormGroup, ImportSection, ImportTitle, InfoText, Label, Select, SubmitButton, TextArea, UploadInput } from './styles';
import { Input } from '../Input';

// Mapeia os dados do arquivo para o payload da API
const mapRawToPayload = (raw: RawImportedTask, projectId: string, responsavelId: string): Omit<TaskPayload, 'projeto_id'> => {
    const durationMatch = String(raw.Duração).match(/(\d+)/);
    const durationInDays = durationMatch ? parseInt(durationMatch[0], 10) : 1;
    const endDate = new Date();
    endDate.setDate(new Date().getDate() + durationInDays);

    return {
        nome: raw.Nome,
        responsavel_id: responsavelId,
        descricao: raw['Como Fazer'] || '',
        prioridade: raw.Classificação?.toLowerCase() as any || 'baixa',
        status: 'não iniciada',
        prazo: endDate.toISOString().split('T')[0],
    };
};

export function CreateProjectModal() {
    const { isProjectModalOpen, closeProjectModal, funcionarios, refreshData } = useContext(ProjectsContext);
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [importedTasks, setImportedTasks] = useState<RawImportedTask[]>([]);

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
                rawData = Papa.parse(data as string, { header: true, skipEmptyLines: true, dynamicTyping: true }).data as RawImportedTask[];
            } else {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                rawData = XLSX.utils.sheet_to_json<RawImportedTask>(workbook.Sheets[sheetName]);
            }
            setImportedTasks(rawData.filter(t => t.Nome && t.ResponsavelEmail));
        };
        reader.readAsBinaryString(file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) return alert('Você precisa estar logado.');

        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const projectData = Object.fromEntries(formData.entries());

        const projectPayload: ProjectPayload = {
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
                const funcionariosMap = new Map(funcionarios.map(f => [f.email.toLowerCase(), f._id]));
                for (const rawTask of importedTasks) {
                    const responsavelId = funcionariosMap.get(rawTask.ResponsavelEmail.toLowerCase());
                    if (responsavelId) {
                        const taskPayload = mapRawToPayload(rawTask, newProjectId, responsavelId);
                        await createTask({
                            ...taskPayload, projeto_id: newProjectId,
                            nome: '',
                            responsavel_id: '',
                            prioridade: 'baixa',
                            status: 'não iniciada',
                            prazo: ''
                        });
                    } else {
                        console.warn(`Email ${rawTask.ResponsavelEmail} não encontrado. Tarefa "${rawTask.Nome}" pulada.`);
                    }
                }
            }

            alert(`Projeto "${projectPayload.nome}" criado com ${importedTasks.length} tarefas importadas!`);
            setImportedTasks([]);
            closeProjectModal();
            refreshData();
        } catch (error) {
            alert('Falha ao criar o projeto.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isProjectModalOpen} onClose={closeProjectModal} title="Criar Novo Projeto">
            <FormContainer onSubmit={handleSubmit}>
                {/* CAMPOS DO PROJETO */}
                <FormGroup>
                    <Label htmlFor="nome">Nome do Projeto*</Label>
                    <Input id="nome" name="nome" type="text" placeholder="Ex: Lançamento do Produto X" required disabled={isLoading} />
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
                    <TextArea id="descricao" name="descricao" rows={3} placeholder="Objetivo principal do projeto..." disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" name="categoria" type="text" placeholder="Ex: Marketing, Desenvolvimento" disabled={isLoading} />
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

                <Divider>OU</Divider>

                <ImportSection>
                    <ImportTitle>Importar Tarefas do Projeto (Opcional)</ImportTitle>
                    <Label htmlFor="importFile" style={{ fontWeight: 'normal', fontSize: '14px' }}>Envie um arquivo .xlsx ou .csv para pré-cadastrar as tarefas.</Label>
                    <UploadInput id="importFile" type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} disabled={isLoading} />
                    {importedTasks.length > 0 && <InfoText style={{ fontWeight: 'bold', color: '$primaryPink', marginTop: '10px' }}>{importedTasks.length} tarefas prontas para serem criadas junto com este projeto.</InfoText>}
                </ImportSection>

                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Criando...' : 'Criar Projeto e Tarefas'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
} 