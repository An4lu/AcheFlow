import { useState, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Title } from '../../components/Title';
import { ProjectsContext, type Project } from '../../contexts/ProjectContext';
import { PageLoader } from '../../components/PageLoader';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ProjectEditModal } from '../../components/ProjectEditModal';
import {
    KanbanContainer,
    Header,
    ActionButton,
    FilterWrapper,
    FilterSelect,
    ProjectGrid,
    ProjectCard,
    CardHeader,
    CardTitle,
    CardStatus,
    CardBody,
    CardStats,
    StatItem,
    ProgressBarContainer,
    ProgressBarFill,
    CardFooter,
    ActionGroup,
    EditButton,
    DeleteButton
} from './styles';
import { deleteProject, updateProject, type ProjectPayload } from '../../services/api';
import { FolderOpenIcon, ListChecksIcon, WarningIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';

type ProjectStatusVariant = 'Não iniciado' | 'Em planejamento' | 'Em andamento' | 'Concluído' | 'Atrasado';
interface CalculatedProject extends Project {
    taskCount: number;
    completedTasks: number;
    progress: number;
    isOverdue: boolean;
    displayStatus: ProjectStatusVariant;
}

export function ProjectsList() {
    const {
        projects,
        tasks,
        funcionarios,
        loading,
        refreshData,
        openProjectModal
    } = useContext(ProjectsContext);

    const [selectedSituacao, setSelectedSituacao] = useState('');
    const [selectedResponsavelId, setSelectedResponsavelId] = useState('');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = useMemo((): CalculatedProject[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return projects
            .map(project => {
                const projectTasks = tasks.filter(t => t.projeto?.id === project._id);
                const taskCount = projectTasks.length;
                const completedTasks = projectTasks.filter(t => t.status === 'concluída').length;
                const progress = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;

                const prazoDate = new Date(project.prazo + 'T00:00:00Z');
                const isOverdue = prazoDate < today && project.situacao !== 'Concluído';

                let displayStatus: ProjectStatusVariant;
                if (isOverdue) {
                    displayStatus = "Atrasado";
                } else if (['Não iniciado', 'Em planejamento', 'Em andamento', 'Concluído'].includes(project.situacao)) {
                    displayStatus = project.situacao as ProjectStatusVariant;
                } else {
                    displayStatus = 'Não iniciado';
                }

                return {
                    ...project,
                    taskCount,
                    completedTasks,
                    progress,
                    isOverdue,
                    displayStatus
                };
            })
            .filter(project => {
                const situacaoMatch = selectedSituacao === '' || project.displayStatus === selectedSituacao;
                const responsavelMatch = selectedResponsavelId === '' || project.responsavel?.id === selectedResponsavelId;
                return situacaoMatch && responsavelMatch;
            });
    }, [projects, tasks, selectedSituacao, selectedResponsavelId]);

    // Handlers para os modais
    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProject) return;
        try {
            await deleteProject(selectedProject._id);
            toast.success(`Projeto "${selectedProject.nome}" excluído com sucesso!`);
            refreshData();
        } catch (error) {
            toast.error('Falha ao excluir o projeto.');
        } finally {
            handleCloseModals();
        }
    };

    const handleUpdateProject = async (id: string, payload: Partial<ProjectPayload>) => {
        try {
            await updateProject(id, payload);
            toast.success('Projeto atualizado com sucesso!');
            refreshData();
        } catch (error) {
            toast.error('Falha ao atualizar o projeto.');
        } finally {
            handleCloseModals();
        }
    };

    const getStatusOptions = useMemo((): ProjectStatusVariant[] => {
        const statuses = new Set(projects.map(p => p.situacao as ProjectStatusVariant));
        if (projects.some(p => new Date(p.prazo + 'T00:00:00Z') < new Date() && p.situacao !== 'Concluído')) {
            statuses.add("Atrasado");
        }
        const validStatuses: ProjectStatusVariant[] = ['Não iniciado', 'Em planejamento', 'Em andamento', 'Concluído', 'Atrasado'];
        return Array.from(statuses).filter(s => validStatuses.includes(s));
    }, [projects]);


    return (
        <KanbanContainer>
            <Header>
                <Title>Projetos</Title>
                <FilterWrapper>
                    <FilterSelect
                        aria-label="Filtrar por situação"
                        value={selectedSituacao}
                        onChange={(e) => setSelectedSituacao(e.target.value)}
                    >
                        <option value="">Todas as Situações</option>
                        {getStatusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </FilterSelect>
                    <FilterSelect
                        aria-label="Filtrar por responsável"
                        value={selectedResponsavelId}
                        onChange={(e) => setSelectedResponsavelId(e.target.value)}
                    >
                        <option value="">Todos os Responsáveis</option>
                        {funcionarios.map(func => (
                            <option key={func._id} value={func._id}>{func.nome} {func.sobrenome}</option>
                        ))}
                    </FilterSelect>
                </FilterWrapper>
                <ActionButton onClick={openProjectModal}>
                    + Novo Projeto
                </ActionButton>
            </Header>

            {loading ? (
                <PageLoader />
            ) : (
                <ProjectGrid>
                    {filteredProjects.map(project => (
                        <ProjectCard key={project._id} status={project.displayStatus}>
                            <CardHeader>
                                <CardTitle>{project.nome}</CardTitle>
                                <CardStatus status={project.displayStatus}>
                                    {project.displayStatus}
                                </CardStatus>
                            </CardHeader>

                            <CardBody>
                                <p>{project.descricao || "Sem descrição."}</p>
                            </CardBody>

                            <CardStats>
                                <StatItem>
                                    <FolderOpenIcon size={24} weight="light" />
                                    <span>Tarefas</span>
                                    <p>{project.completedTasks} / {project.taskCount}</p>
                                </StatItem>
                                <StatItem>
                                    <ListChecksIcon size={24} weight="light" />
                                    <span>Progresso</span>
                                    <p>{project.progress}%</p>
                                </StatItem>
                                <StatItem>
                                    <WarningIcon size={24} weight="light" color={project.isOverdue ? theme.colors.danger.value : theme.colors.textMuted.value} />
                                    <span>Status</span>
                                    <p style={{ color: project.isOverdue ? theme.colors.danger.value : 'inherit' }}>
                                        {project.isOverdue ? 'Atrasado' : 'No Prazo'}
                                    </p>
                                </StatItem>
                            </CardStats>

                            <ProgressBarContainer>
                                <ProgressBarFill css={{ width: `${project.progress}%` }} />
                            </ProgressBarContainer>

                            <CardFooter>
                                <div>
                                    <span>Responsável: </span>
                                    <strong>{project.responsavel?.nome || 'N/D'}</strong>
                                </div>
                                <ActionGroup>
                                    <EditButton onClick={() => handleEditClick(project)}>
                                        <PencilSimpleIcon size={20} />
                                    </EditButton>
                                    <DeleteButton onClick={() => handleDeleteClick(project)}>
                                        <TrashIcon size={20} />
                                    </DeleteButton>
                                </ActionGroup>
                            </CardFooter>
                        </ProjectCard>
                    ))}
                </ProjectGrid>
            )}

            <ProjectEditModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModals}
                project={selectedProject}
                onSave={handleUpdateProject}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModals}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja excluir o projeto "${selectedProject?.nome}"? Todas as tarefas associadas também serão perdidas.`}
            />
        </KanbanContainer>
    );
}