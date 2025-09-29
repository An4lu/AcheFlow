import { Gantt, ViewMode, type Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { GanttContainer } from './styles';

// Tooltip customizado para o hover
const TooltipContent: React.FC<{ task: Task }> = ({ task }) => {
    // Acessamos os dados extras que vamos adicionar mais tarde
    const extraData = (task as any).extra;

    return (
        <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}>
            <h4>{task.name}</h4>
            <p>Progresso: {task.progress}%</p>
            {extraData && (
                <>
                    <p>Status: <span style={{ textTransform: 'capitalize' }}>{extraData.status}</span></p>
                    <p>Responsável: {extraData.responsavel}</p>
                </>
            )}
        </div>
    );
};


interface GanttChartProps {
    data: Task[];
    onTaskClick: (task: Task) => void; // Nova propriedade para o clique
}

export function GanttChart({ data, onTaskClick }: GanttChartProps) {
    if (!data || data.length === 0) {
        return null;
    }

    // Usamos o duplo clique para evitar abrir o modal em um clique acidental
    const handleDoubleClick = (task: Task) => {
        if (task.type !== 'project') { // Permite abrir apenas para tarefas
            onTaskClick(task);
        }
    };

    return (
        <GanttContainer>
            <Gantt
                tasks={data}
                viewMode={ViewMode.Day}
                locale="pt-BR"
                barFill={60}
                barCornerRadius={5}
                rowHeight={40}
                headerHeight={50}
                ganttHeight={500}
                todayColor="rgba(244, 102, 133, 0.1)"
                arrowColor="#E4113F"
                onDoubleClick={handleDoubleClick} // Evento de duplo clique
                TooltipContent={TooltipContent}   // Componente para o hover
            />
        </GanttContainer>
    );
}