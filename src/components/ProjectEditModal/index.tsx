import { useState, useEffect, useContext } from 'react';
import { Modal } from '../Modal';
import { FormContainer, FormGroup, Input, Label, Select, SubmitButton, TextArea } from './styles';
import { ProjectsContext, type Project } from '../../contexts/ProjectContext';
import { type ProjectPayload } from '../../services/api';

interface ProjectEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    onSave: (projectId: string, payload: Partial<ProjectPayload>) => Promise<void>;
}

export function ProjectEditModal({ isOpen, onClose, project, onSave }: ProjectEditModalProps) {
    const { funcionarios } = useContext(ProjectsContext);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                prazo: project.prazo ? project.prazo.split('T')[0] : '',
            });
        }
    }, [project]);

    useEffect(() => {
        if (!isOpen) {
            setFormData({});
        }
    }, [isOpen]);

    if (!project) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload: Partial<ProjectPayload> = {
            nome: formData.nome,
            descricao: formData.descricao || '',
            situacao: formData.situacao,
            prazo: formData.prazo,
            responsavel_id: formData.responsavel?.id,
            categoria: formData.categoria
        };
        
        await onSave(project._id, payload);
        setIsLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Projeto">
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="nome">Nome do Projeto*</Label>
                    <Input id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="responsavel_id">Responsável pelo Projeto*</Label>
                    <Select 
                        id="responsavel_id" 
                        name="responsavel_id" 
                        value={formData.responsavel?.id || ''} 
                        onChange={(e) => {
                            const func = funcionarios.find(f => f._id === e.target.value);
                            if (func) {
                                setFormData(prev => ({ ...prev, responsavel: { id: func._id, nome: func.nome, sobrenome: func.sobrenome, email: func.email } }));
                            }
                        }}
                        required 
                        disabled={isLoading}
                    >
                        <option value="">Selecione um funcionário</option>
                        {funcionarios.map(func => (
                            <option key={func._id} value={func._id}>{func.nome} {func.sobrenome}</option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="descricao">Descrição do Projeto</Label>
                    <TextArea id="descricao" name="descricao" value={formData.descricao || ''} onChange={handleChange} rows={3} disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" name="categoria" value={formData.categoria || ''} onChange={handleChange} type="text" disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="situacao">Situação*</Label>
                    <Select id="situacao" name="situacao" value={formData.situacao || ''} onChange={handleChange} required disabled={isLoading}>
                        <option value="Não iniciado">Não Iniciado</option>
                        <option value="Em planejamento">Em Planejamento</option>
                        <option value="Em andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="prazo">Prazo Final do Projeto*</Label>
                    <Input id="prazo" name="prazo" value={formData.prazo || ''} onChange={handleChange} type="date" required disabled={isLoading} />
                </FormGroup>
                
                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
}