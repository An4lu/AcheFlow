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

    // Função auxiliar para formatar a data (lidando com T00:00:00Z)
    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr.split('T')[0] + 'T00:00:00Z').toLocaleDateString('pt-BR');
    }

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
                    {/* Correção: Usa dataCriacao ou data_inicio */}
                    <Value>{formatDate(task.dataCriacao || task.data_inicio)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Data de Fim (Prazo):</Label>
                    {/* Correção: Usa prazo ou data_fim */}
                    <Value>{formatDate(task.prazo || task.data_fim)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Descrição:</Label>
                    <Value>{task.descricao || 'Nenhuma descrição fornecida.'}</Value>
                </DetailItem>
            </DetailsContainer>
        </Modal>
    );
}