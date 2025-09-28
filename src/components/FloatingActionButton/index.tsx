import { useState, useContext } from 'react';
import { ListPlusIcon, FolderPlusIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { FabContainer, FabButton, FabMenu, FabMenuItem } from './styles';
import { ProjectsContext } from '../../contexts/ProjectContext';

export function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { openProjectModal, openTaskModal } = useContext(ProjectsContext);

    const handleCreateProject = () => {
        openProjectModal();
        setIsOpen(false);
    };

    const handleCreateTask = () => {
        openTaskModal();
        setIsOpen(false);
    };

    return (
        <FabContainer>
            {isOpen && (
                <FabMenu>
                    <FabMenuItem onClick={handleCreateTask}>
                        <ListPlusIcon size={22} weight="bold" />
                        Nova Tarefa
                    </FabMenuItem>
                    <FabMenuItem onClick={handleCreateProject}>
                        <FolderPlusIcon size={22} weight="bold" />
                        Novo Projeto
                    </FabMenuItem>
                </FabMenu>
            )}
            <FabButton onClick={() => setIsOpen(!isOpen)}>
                <PlusCircleIcon size={32} weight="bold" />
            </FabButton>
        </FabContainer>
    );
}