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

export function TaskEditModal({ isOpen, onClose, task, onSave }: TaskEditModalProps) {
    // A lista de 'projects' não é mais necessária aqui
    const { funcionarios } = useContext(ProjectsContext);
    const [formData, setFormData] = useState<Partial<ApiTask>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                prazo: task.prazo ? task.prazo.split('T')[0] : '',
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
            setFormData(prev => ({ ...prev, responsavel }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const payload: TaskUpdatePayload = {
            nome: formData.nome,
            descricao: formData.descricao || '',
            status: formData.status as any,
            prazo: formData.prazo,
            responsavel_id: formData.responsavel?._id,
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

                {/* CAMPO DE PROJETO ALTERADO PARA APENAS LEITURA */}
                <FormGroup>
                    <Label htmlFor="projeto">Projeto</Label>
                    <Input
                        id="projeto"
                        name="projeto"
                        value={formData.projeto?.nome || ''}
                        disabled // Desabilita a edição
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
                    <Select id="responsavel" name="responsavel" value={formData.responsavel?._id || ''} onChange={handleResponsavelChange}>
                        {funcionarios.map(f => (
                            <option key={f._id} value={f._id}>{f.nome} {f.sobrenome}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="prazo">Prazo</Label>
                    <Input type="date" id="prazo" name="prazo" value={formData.prazo || ''} onChange={handleChange} />
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