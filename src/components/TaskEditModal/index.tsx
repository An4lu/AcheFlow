import { useState, useEffect, useContext } from 'react';
import { Modal } from '../Modal';
import { FormContainer, FormGroup, Label, Input, Select, TextArea, SubmitButton } from './styles';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { type ApiTask } from '../../pages/Projects';
import { type TaskUpdatePayload } from '../../services/api';

interface TaskEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: ApiTask | null;
    onSave: (taskId: string, payload: TaskUpdatePayload) => Promise<void>;
}

// Interface local para os dados do formulário
interface FormData {
    nome?: string;
    descricao?: string | null;
    status?: string;
    data_inicio?: string; // Campo do formulário para data de início
    data_fim?: string;    // Campo do formulário para data de fim (prazo)
    responsavel?: ApiTask['responsavel'];
    projeto?: { id: string; nome: string; };
}

export function TaskEditModal({ isOpen, onClose, task, onSave }: TaskEditModalProps) {
    const { funcionarios } = useContext(ProjectsContext);
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (task) {
            // Correção: Mapeia os campos da API para os campos do formulário
            const startDate = (task.dataCriacao || task.data_inicio || '').split('T')[0];
            const endDate = (task.prazo || task.data_fim || '').split('T')[0];

            setFormData({
                ...task,
                data_inicio: startDate,
                data_fim: endDate,
            });
        }
    }, [task]);

    if (!task) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

        // O Payload para a API (PUT /tarefas/{id}) espera data_inicio e data_fim
        const payload: TaskUpdatePayload = {
            nome: formData.nome,
            descricao: formData.descricao || '',
            status: formData.status as any,
            data_inicio: formData.data_inicio, // Envia o estado do formulário
            data_fim: formData.data_fim,       // Envia o estado do formulário (que veio do prazo)
            responsavel_id: formData.responsavel?.id,
        };
        
        await onSave(task._id, payload);
        setIsLoading(false);
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
                    <Label htmlFor="descricao">Descrição</Label>
                    <TextArea id="descricao" name="descricao" value={formData.descricao || ''} onChange={handleChange} rows={4} />
                </FormGroup>
                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
}