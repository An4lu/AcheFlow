import { useState, useEffect, useContext } from 'react';
import { Modal } from '../Modal';
import { FormContainer, FormGroup, Label, Input, Select, TextArea, SubmitButton, ButtonContainer, DeleteButton } from './styles';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { type ApiTask } from '../../pages/Projects';
import { type TaskUpdatePayload } from '../../services/api';
import { TrashIcon } from '@phosphor-icons/react';

interface TaskEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: ApiTask | null;
    onSave: (taskId: string, payload: TaskUpdatePayload) => Promise<void>;
    onDelete: (taskId: string) => Promise<void>;
}

interface FormData {
    nome?: string;
    descricao?: string | null;
    status?: string;
    data_inicio?: string; 
    data_fim?: string;    
    responsavel?: ApiTask['responsavel'];
    projeto?: { id: string; nome: string; };
    classificacao?: string;
    fase?: string;
    condicao?: string;
    percentual_concluido?: number;
}

export function TaskEditModal({ isOpen, onClose, task, onSave, onDelete }: TaskEditModalProps) { // *** ATUALIZADO ***
    const { funcionarios } = useContext(ProjectsContext);
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (task) {
            const startDate = (task.dataCriacao || task.data_inicio || '').split('T')[0];
            const endDate = (task.prazo || task.data_fim || '').split('T')[0];

            setFormData({
                ...task,
                data_inicio: startDate,
                data_fim: endDate,
                classificacao: task.classificacao || '',
                fase: task.fase || '',
                condicao: task.condicao || '',
                percentual_concluido: (task.percentual_concluido || 0) * 100,
            });
        }
    }, [task]);

    if (!task) return null;

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name !== 'percentual_concluido') {
        setFormData(prev => ({ ...prev, [name]: value }));
        return; 
    }

    const percentNumber = parseFloat(value) || 0;
    
    const currentStatus = formData.status;
    let newStatus = currentStatus;

    if (percentNumber === 100) {
        newStatus = 'concluída';
    } else if (percentNumber > 0) {
        newStatus = 'em andamento';
    } else if (percentNumber === 0) {
        newStatus = 'não iniciada';
    }

    setFormData(prev => ({
        ...prev,
        percentual_concluido: percentNumber,
        status: newStatus
    }));
};

    const handleResponsavelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const responsavel = funcionarios.find(f => f._id === e.target.value);
        if (responsavel) {
            setFormData(prev => ({ 
                ...prev, 
                responsavel: {
                    id: responsavel._id,
                    nome: responsavel.nome,
                    sobrenome: responsavel.sobrenome,
                    email: responsavel.email
                } 
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const payload: TaskUpdatePayload = {
            nome: formData.nome,
            descricao: formData.descricao || '',
            status: formData.status as any,
            data_inicio: formData.data_inicio,
            data_fim: formData.data_fim,
            responsavel_id: formData.responsavel?.id,
            classificacao: formData.classificacao,
            fase: formData.fase,
            condicao: formData.condicao,
            percentual_concluido: formData.percentual_concluido ? parseFloat(String(formData.percentual_concluido)) / 100 : 0
        };
        
        await onSave(task._id, payload);
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!task) return;
        
        if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.nome}"? Esta ação não pode ser desfeita.`)) {
            setIsLoading(true);
            await onDelete(task._id);
            setIsLoading(false);
            onClose(); 
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Tarefa">
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="nome">Nome da Tarefa</Label>
                    <Input id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="projeto">Projeto</Label>
                    <Input
                        id="projeto"
                        name="projeto"
                        value={formData.projeto?.nome || ''}
                        disabled 
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="status">Status</Label>
                    <Select id="status" name="status" value={formData.status || ''} onChange={handleChange}>
                        <option value="não iniciada">Não Iniciada</option>
                        <option value="em andamento">Em Andamento</option>
                        <option value="concluída">Concluída</option>
                        <option value="congelada">Congelada</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Select id="responsavel" name="responsavel" value={formData.responsavel?.id || ''} onChange={handleResponsavelChange}>
                        {funcionarios.map(f => (
                            <option key={f._id} value={f._id}>{f.nome} {f.sobrenome}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="data_inicio">Data de Início</Label>
                    <Input type="date" id="data_inicio" name="data_inicio" value={formData.data_inicio || ''} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="data_fim">Data de Fim (Prazo)</Label>
                    <Input type="date" id="data_fim" name="data_fim" value={formData.data_fim || ''} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="classificacao">Categoria</Label>
                    <Input id="classificacao" name="classificacao" value={formData.classificacao || ''} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="fase">Fase</Label>
                    <Input id="fase" name="fase" value={formData.fase || ''} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="condicao">Condição</Label>
                    <Input id="condicao" name="condicao" value={formData.condicao || ''} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="percentual_concluido">Progresso (%)</Label>
                        <Input 
                        type="number" 
                        id="percentual_concluido" 
                        name="percentual_concluido" 
                        value={formData.percentual_concluido || 0} 
                        onChange={handleChange} 
                        min="0"
                        max="100"
                        step="1"
                        /> 
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="descricao">Descrição</Label>
                    <TextArea id="descricao" name="descricao" value={formData.descricao || ''} onChange={handleChange} rows={4} />
                </FormGroup>
                
                <ButtonContainer>
                    <DeleteButton type="button" onClick={handleDelete} disabled={isLoading}>
                        <TrashIcon size={16} /> Excluir Tarefa
                    </DeleteButton>
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </SubmitButton>
                </ButtonContainer>
            </FormContainer>
        </Modal>
    );
}