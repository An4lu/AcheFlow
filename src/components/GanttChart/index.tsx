import { Gantt, ViewMode, type Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { GanttContainer } from './styles';
import { theme } from '../../styles'; // Importa o tema

const TooltipContent: React.FC<{ task: Task }> = ({ task }) => {
    const extra = (task as any).extra;

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
    }

    // Estilos do Tooltip alinhados com o tema
    return (
        <div style={{
            padding: '10px',
            backgroundColor: theme.colors.bgTertiary.value,
            borderRadius: '4px',
            border: `1px solid ${theme.colors.borderDefault.value}`,
            fontSize: '14px',
            minWidth: '250px',
            fontFamily: theme.fonts.primary.value,
        }}>
            <h4 style={{
                marginBottom: '10px',
                color: theme.colors.brandPrimary.value
            }}>{task.name}</h4>
            {extra && (
                <>
                    {/* <p><strong>Projeto:</strong><span>{extra.projeto}</span></p> */}
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

    return (
        <GanttContainer>
            <Gantt
                tasks={data}
                viewMode={viewMode}
                locale="pt-BR"
                onClick={(task) => { if (task.type !== 'project') onTaskClick(task) }}
                TooltipContent={TooltipContent}
                barFill={60}
                barCornerRadius={5}
                rowHeight={40}
                ganttHeight={0}
                todayColor={theme.colors.brandOrange.value}
                arrowColor={theme.colors.brandPrimary.value}
                viewDate={viewDate}
                listCellWidth={""}
                columnWidth={
                    viewMode === ViewMode.Day ? 65 :
                        viewMode === ViewMode.Week ? 120 :
                            300
                }
            />
        </GanttContainer>
    );
}