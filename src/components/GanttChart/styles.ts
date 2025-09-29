import { styled } from '../../styles';

export const GanttContainer = styled('div', {
    width: '100%',
    // Estilos para customizar a aparência da biblioteca
    '.gantt-container': {
        fontFamily: '$Primary',
    },
    // Cor da barra de progresso para tarefas
    '.bar-progress': {
        fill: '$primaryPink',
    },
    // Cor de fundo para projetos (sobrescreve o inline style para garantir)
    '.bar-project': {
        fill: '$secondaryOrange',
    },
    '.grid-header': {
        backgroundColor: '$background',
    },
    '.grid-row': {
        backgroundColor: '$white',
        '&:hover': {
            backgroundColor: '#fafafa'
        }
    }
});