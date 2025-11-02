import type { ApiTask } from '../../pages/Projects';
import { Modal } from '../Modal';
import { DetailsContainer, DetailItem, Label, Value } from './styles';

interface TaskDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: ApiTask | null;
}

export function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
    if (!task) return null;

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
                    <Value>{new Date(task.data_inicio + 'T00:00:00Z').toLocaleDateString()}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Data de Fim:</Label>
                    <Value>{new Date(task.data_fim + 'T00:00:00Z').toLocaleDateString()}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Descrição:</Label>
                    <Value>{task.descricao || 'Nenhuma descrição fornecida.'}</Value>
                </DetailItem>
            </DetailsContainer>
        </Modal>
    );
}