import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { GanttContainer } from './styles';

interface GanttEntity {
    id: string;
    text: string;
    start_date: string;
    end_date: string;
    parent?: string;
    open?: boolean;
    type?: string;
}

interface GanttChartProps {
    data: GanttEntity[];
}

export function GanttChart({ data }: GanttChartProps) {
    const ganttContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ganttContainerRef.current) {
            gantt.config.date_format = "%d-%m-%Y";
            gantt.config.readonly = true;
            gantt.config.columns = [
                { name: "text", label: "Nome", tree: true, width: '*' },
                { name: "start_date", label: "Início", align: "center", width: 90 },
            ];
            gantt.i18n.setLocale("pt");

            gantt.init(ganttContainerRef.current);
        }

        return () => {
            if (gantt.isInitialized()) {
                gantt.destructor();
            }
        };
    }, []);

    useEffect(() => {
        if (gantt.isInitialized()) {
            gantt.clearAll();
            gantt.parse({ data });
        }
    }, [data]);

    return <GanttContainer ref={ganttContainerRef} />;
}