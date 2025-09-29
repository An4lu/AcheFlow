import { Gantt, ViewMode, type Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { GanttContainer } from './styles';

interface GanttChartProps {
    data: Task[];
}

export function GanttChart({ data }: GanttChartProps) {
    if (!data || data.length === 0) {
        return null;
    }

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
                // Desativa a edição de tarefas por arrastar para o modo de visualização
                onDateChange={() => Promise.resolve(false)}
                onProgressChange={() => Promise.resolve(false)}
            />
        </GanttContainer>
    );
}