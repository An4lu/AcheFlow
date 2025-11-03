import { styled } from '../../styles';

export const GanttContainer = styled('div', {
    // Ocupa 100% do espaço que a ChartArea lhe deu
    width: '100%',
    height: '100%',



    // --- Seletores para os elementos INTERNOS da biblioteca ---

    // O container da linha do tempo (lado direito)
    '[id^="gantt-timeline-container-"]': {
        // Força a barra de rolagem HORIZONTAL a estar SEMPRE visível
        overflowX: 'scroll !important',
    },

    // O corpo da lista de tarefas (lado esquerdo)
    '.grid-body': {
        // Força a barra de rolagem VERTICAL a estar SEMPRE visível
        overflowY: 'scroll !important',
    },

    // --- Estilização da Barra de Rolagem ---
    '& ::-webkit-scrollbar': {
        width: '14px',
        height: '14px',
    },
    '& ::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '& ::-webkit-scrollbar-thumb': {
        backgroundColor: '$tertiaryPink',
        borderRadius: '7px',
        border: '3px solid $background',
        '&:hover': {
            backgroundColor: '$secondaryPink',
        }
    },

    // --- Outros estilos visuais ---
    '.gantt-container': { fontFamily: '$primary', height: '100% !important' },
    '.bar-progress': { fill: '$primaryPink' },
    '.bar-project': { fill: '$secondaryOrange' },
    '.grid-header': { backgroundColor: '$background' },
    '.grid-row': {
        backgroundColor: '$white',
        '&:hover': { backgroundColor: '#fafafa' },
    },
});