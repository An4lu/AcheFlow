import { useState, useContext, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { Modal } from '../Modal';
import { ProjectsContext, type Project, type Task } from '../../contexts/ProjectContext';
import {
    Container,
    ProjectList,
    ProjectItem,
    SelectActions,
    SelectButton,
    ButtonContainer,
    ExportButton
} from './styles';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
    const { projects, tasks } = useContext(ProjectsContext);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Formata a data para "YYYY-MM-DD" (ideal para Excel)
    const formatDate = (dateString: string | undefined | null) => {
        if (!dateString) return 'N/A';
        try {
            return dateString.split('T')[0];
        } catch (e) {
            return 'Data Inválida';
        }
    };

    const handleToggleProject = (projectId: string) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const handleSelectAll = () => {
        setSelectedProjects(projects.map(p => p._id));
    };

    const handleDeselectAll = () => {
        setSelectedProjects([]);
    };

    const handleGenerateExport = () => {
        if (selectedProjects.length === 0) {
            toast.warn('Selecione pelo menos um projeto para exportar.');
            return;
        }

        setIsLoading(true);

        try {
            // 1. DADOS DOS PROJETOS SELECIONADOS
            const projectsToExport = projects
                .filter(p => selectedProjects.includes(p._id))
                .map(p => ({
                    'ID_Projeto': p._id,
                    'Nome_Projeto': p.nome,
                    'Responsavel': p.responsavel?.nome ? `${p.responsavel.nome} ${p.responsavel.sobrenome || ''}`.trim() : 'N/D',
                    'Email_Responsavel': p.responsavel?.email || 'N/D',
                    'Situacao': p.situacao,
                    'Prazo': formatDate(p.prazo),
                    'Categoria': p.categoria || 'N/A',
                    'Descricao': p.descricao || 'N/A',
                }));

            // 2. DADOS DAS TAREFAS DOS PROJETOS SELECIONADOS
            const tasksToExport = tasks
                .filter(t => t.projeto?.id && selectedProjects.includes(t.projeto.id))
                .map(t => ({
                    'ID_Tarefa': t._id,
                    'ID_Projeto': t.projeto.id,
                    'Nome_Projeto': t.projeto.nome,
                    'Nome_Tarefa': t.nome,
                    'Responsavel': t.responsavel?.nome ? `${t.responsavel.nome} ${t.responsavel.sobrenome || ''}`.trim() : 'N/D',
                    'Email_Responsavel': t.responsavel?.email || 'N/D',
                    'Status': t.status,
                    'Progresso_%': t.percentual_concluido ? Math.round(t.percentual_concluido * 100) : 0,
                    'Data_Inicio': formatDate(t.data_inicio || t.dataCriacao),
                    'Prazo_Final': formatDate(t.prazo || t.data_fim),
                    'Data_Conclusao': formatDate(t.dataConclusao),
                    'Categoria_Tarefa': t.classificacao || 'N/A',
                    'Fase': t.fase || 'N/A',
                    'Condicao': t.condicao || 'N/A',
                    'Descricao_Tarefa': t.descricao || 'N/A',
                }));

            // 3. Criar Worksheets (Abas)
            const ws_projetos = XLSX.utils.json_to_sheet(projectsToExport);
            const ws_tarefas = XLSX.utils.json_to_sheet(tasksToExport);

            // Ajustar largura das colunas (opcional, mas melhora a leitura)
            ws_projetos['!cols'] = [
                { wch: 24 }, // ID_Projeto
                { wch: 30 }, // Nome_Projeto
                { wch: 25 }, // Responsavel
                { wch: 25 }, // Email_Responsavel
                { wch: 15 }, // Situacao
                { wch: 12 }, // Prazo
                { wch: 20 }, // Categoria
                { wch: 50 }, // Descricao
            ];
            ws_tarefas['!cols'] = [
                { wch: 24 }, // ID_Tarefa
                { wch: 24 }, // ID_Projeto
                { wch: 30 }, // Nome_Projeto
                { wch: 40 }, // Nome_Tarefa
                { wch: 25 }, // Responsavel
                { wch: 25 }, // Email_Responsavel
                { wch: 15 }, // Status
                { wch: 10 }, // Progresso_%
                { wch: 12 }, // Data_Inicio
                { wch: 12 }, // Prazo_Final
                { wch: 12 }, // Data_Conclusao
                { wch: 20 }, // Categoria_Tarefa
                { wch: 20 }, // Fase
                { wch: 20 }, // Condicao
                { wch: 50 }, // Descricao_Tarefa
            ];

            // 4. Criar o Workbook e adicionar as abas
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws_projetos, 'Projetos');
            XLSX.utils.book_append_sheet(wb, ws_tarefas, 'Tarefas');

            // 5. Baixar o arquivo
            XLSX.writeFile(wb, 'Relatorio_AcheFlow_Projetos.xlsx');

            toast.success('Relatório gerado com sucesso!');
            setIsLoading(false);
            onClose();

        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            toast.error('Falha ao gerar o relatório Excel.');
            setIsLoading(false);
        }
    };

    // Limpa a seleção ao fechar o modal
    const handleClose = () => {
        setSelectedProjects([]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Gerar Relatório Detalhado">
            <Container>
                <p>Selecione os projetos que deseja incluir no relatório:</p>
                <SelectActions>
                    <SelectButton onClick={handleSelectAll}>Selecionar Todos</SelectButton>
                    <SelectButton onClick={handleDeselectAll}>Limpar Seleção</SelectButton>
                </SelectActions>

                <ProjectList>
                    {projects.map(project => (
                        <ProjectItem key={project._id}>
                            <input
                                type="checkbox"
                                checked={selectedProjects.includes(project._id)}
                                onChange={() => handleToggleProject(project._id)}
                            />
                            <span>{project.nome}</span>
                        </ProjectItem>
                    ))}
                </ProjectList>

                <ButtonContainer>
                    <ExportButton onClick={handleGenerateExport} disabled={isLoading || selectedProjects.length === 0}>
                        {isLoading ? 'Gerando...' : `Gerar Relatório (${selectedProjects.length} ${selectedProjects.length === 1 ? 'projeto' : 'projetos'})`}
                    </ExportButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
}