import { useState, useContext, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { ProjectsContext } from '../../contexts/ProjectContext';
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

                <FormGroup>
                    <Label htmlFor="prioridade">Prioridade*</Label>
                    <Select id="prioridade" name="prioridade" defaultValue="média" required disabled={isLoading}>
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                    </Select>
                </FormGroup>

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