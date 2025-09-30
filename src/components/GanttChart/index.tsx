import { Gantt, ViewMode, type Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { GanttContainer } from './styles';

const TooltipContent: React.FC<{ task: Task }> = ({ task }) => {
    const extra = (task as any).extra;

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
    }

    return (
        <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', minWidth: '250px' }}>
            <h4 style={{ marginBottom: '10px' }}>{task.name}</h4>
            {extra && (
                <>
                    <p><strong>Status:</strong> <span style={{ textTransform: 'capitalize' }}>{extra.status}</span></p>
                    <p><strong>Responsável:</strong> {extra.responsavel}</p>
                </>
            )}
            <p><strong>Início:</strong> {formatDate(task.start)}</p>
            <p><strong>Fim:</strong> {formatDate(task.end)}</p>
        </div>
    );
};

interface GanttChartProps {
    data: Task[];
    onTaskClick: (task: Task) => void;
    viewDate?: Date;
    viewMode: ViewMode;
}

export function GanttChart({ data, onTaskClick, viewDate, viewMode }: GanttChartProps) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <GanttContainer>
            <Gantt
                tasks={data}
                viewMode={viewMode}
                locale="pt-BR"
                onDoubleClick={(task) => { if (task.type !== 'project') onTaskClick(task) }}
                TooltipContent={TooltipContent}
                barFill={60}
                barCornerRadius={5}
                rowHeight={40}
                ganttHeight={0}
                todayColor="rgba(244, 102, 133, 0.1)"
                arrowColor="#E4113F"
                viewDate={viewDate}
                listCellWidth={""}
                columnWidth={viewMode === ViewMode.Day ? 65 : 120}
            />
        </GanttContainer>
    );
}