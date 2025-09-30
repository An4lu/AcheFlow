import { styled } from '../../styles';

export const GanttContainer = styled('div', {
    // O container deve ocupar todo o espaço que seu pai (ChartArea) lhe der.
    width: '100%',
    height: '100%',

    // Esconde qualquer overflow deste container, pois o scroll será interno ao gráfico.
    overflow: 'hidden',

    // --- Seletores para os elementos internos da biblioteca do gráfico ---

    // O wrapper principal do gráfico
    '.gantt-container': {
        fontFamily: '$Primary',
        // Força o gráfico a ter exatamente a altura do nosso container.
        height: '100% !important',
    },

    // O corpo da lista de tarefas (lado esquerdo)
    '.grid-body': {
        // Força a barra de rolagem vertical a estar sempre visível.
        overflowY: 'scroll !important',
    },

    // O container da linha do tempo (lado direito)
    '[id^="gantt-timeline-container-"]': {
        // Força a barra de rolagem horizontal a estar sempre visível.
        overflowX: 'scroll !important',
    },

    // --- Estilização customizada ---
    '.bar-progress': { fill: '$primaryPink' },
    '.bar-project': { fill: '$secondaryOrange' },
    '.grid-header': { backgroundColor: '$background' },
    '.grid-row': {
        backgroundColor: '$white',
        '&:hover': { backgroundColor: '#fafafa' },
    },

    // --- Estilização da Barra de Rolagem ---
    '& ::-webkit-scrollbar': {
        width: '12px',
        height: '12px',
    },
    '& ::-webkit-scrollbar-track': {
        backgroundColor: '$background',
        borderRadius: '6px',
    },
    '& ::-webkit-scrollbar-thumb': {
        backgroundColor: '$tertiaryPink',
        borderRadius: '6px',
        border: '3px solid $background', // Cria uma borda em volta da barra
        '&:hover': {
            backgroundColor: '$secondaryPink',
        }
    }
});