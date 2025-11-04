import { styled } from '../../styles';

export const GanttContainer = styled('div', {
    width: '100%',
    height: '100%',


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
        backgroundColor: '$borderSubtle', // Cor hardcoded removida
    },
    '& ::-webkit-scrollbar-thumb': {
        backgroundColor: '$brandTertiary', // $tertiaryPink -> $brandTertiary
        borderRadius: '7px',
        border: '3px solid $bgPrimary', // $background -> $bgPrimary
        '&:hover': {
            backgroundColor: '$brandQuaternary', // $secondaryPink -> $brandQuaternary
        }
    },

    // --- Outros estilos visuais ---
    '.gantt-container': { fontFamily: '$primary', height: '100% !important' },
    '.bar-progress': { fill: '$brandPrimary' }, // $primaryPink -> $brandPrimary
    '.bar-project': { fill: '$brandSecondary' }, // $secondaryOrange -> $brandSecondary
    '.grid-header': { backgroundColor: '$bgPrimary' }, // $background -> $bgPrimary
    '.grid-row': {
        backgroundColor: '$bgTertiary', // $white -> $bgTertiary
        '&:hover': { backgroundColor: '#fafafa' }, // Mantido por ser sutil
    },
});