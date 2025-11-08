import type { ApiTask } from '../../pages/Projects';
import { Modal } from '../Modal';
import { DetailsContainer, DetailItem, Label, Value, DeleteButton } from './styles';
import { TrashIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface TaskDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: ApiTask | null;
    onDelete: (taskId: string) => Promise<void>; 
}

export function TaskDetailsModal({ isOpen, onClose, task, onDelete }: TaskDetailsModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!task) return null;

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr.split('T')[0] + 'T00:00:00Z').toLocaleDateString('pt-BR');
    }

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
        <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Tarefa">
            <DetailsContainer>
                <DetailItem>
                    <Label>Nome da Tarefa:</Label>
                    <Value>{task.nome}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Projeto:</Label>
                    <Value>{task.projeto.nome}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Responsável:</Label>
                    <Value>{task.responsavel?.nome} {task.responsavel?.sobrenome || 'Sem Responsável'}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Status:</Label>
                    <Value style={{ textTransform: 'capitalize' }}>{task.status}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Data de Início:</Label>
                    <Value>{formatDate(task.dataCriacao || task.data_inicio)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Data de Fim (Prazo):</Label>
                    <Value>{formatDate(task.prazo || task.data_fim)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Descrição:</Label>
                    <Value>{task.descricao || 'Nenhuma descrição fornecida.'}</Value>
                </DetailItem>
                <DetailItem>
                    <label>Categoria:</label>
                    <Value>{task.classificacao || 'Nenhuma categoria fornecida.'}</Value>
                </DetailItem>
                <DetailItem>
                    <label>Fase:</label>
                    <Value>{task.fase || 'Nenhuma fase fornecida.'}</Value>
                </DetailItem>
                <DetailItem>
                    <label>Condição:</label>
                    <Value>{task.condicao || 'Nenhuma condição fornecida.'}</Value>
                </DetailItem>
                <DetailItem>
                    <label>Percentual Concluído:</label>
                    <Value>{task.percentual_concluido ? `${task.percentual_concluido}%` : 'N/A'}</Value>
                </DetailItem>

                <DeleteButton onClick={handleDelete} disabled={isLoading}>
                    <TrashIcon size={16} />
                    {isLoading ? 'Excluindo...' : 'Excluir Tarefa'}
                </DeleteButton>
            </DetailsContainer>
        </Modal>
    );
}