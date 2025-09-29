import { styled } from '../../styles';

export const GanttContainer = styled('div', {
    width: '100%',
    padding: '1rem',
    backgroundColor: '$white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    },

    overflowY: 'auto',
    overflowX: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',

    '& ::-webkit-scrollbar': {
        width: '12px',
        height: '12px',
    },
    '& ::-webkit-scrollbar-track': {
        backgroundColor: '$background',
    },
    '& ::-webkit-scrollbar-thumb': {
        backgroundColor: '$primaryPink',
        borderRadius: '6px',
        border: '3px solid $background',
    }

});