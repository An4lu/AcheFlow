import { styled } from '../../styles';
import { ActionButton as BaseActionButton } from '../Projects/styles';

export { KanbanContainer, Header } from '../Kanban/styles'; 
export const ActionButton = styled(BaseActionButton, {});

export const FilterWrapper = styled('div', {
    display: 'flex',
    gap: '$4',
    flexShrink: 0,
});

// Reutiliza o select do Kanban
export { FilterSelect } from '../Kanban/styles';

export const ProjectGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '$5',
    overflowY: 'auto', // Permite scroll se os cards passarem da altura
    padding: '$2', // Pequeno padding para a sombra do card
});

export const ProjectCard = styled('div', {
    position: 'relative',
    backgroundColor: '$bgTertiary',
    borderRadius: '$md',
    padding: '$5',
    boxShadow: '$shadows.small',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    borderTop: '4px solid $borderDefault',

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '$shadows.medium',
    },

    variants: {
        status: {
            'Não iniciado': { borderColor: '$textMuted' },
            'Em planejamento': { borderColor: '$warning' },
            'Em andamento': { borderColor: '$brandPrimary' },
            'Concluído': { borderColor: '$success' },
            'Atrasado': { 
                borderColor: '$danger',
                backgroundColor: '$brandTertiary', // Fundo rosa claro
             },
        }
    }
});

export const CardHeader = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '$3',
});

export const CardTitle = styled('h3', {
    fontSize: '$lg',
    color: '$textPrimary',
    fontWeight: '700',
    margin: 0,
    // Permite quebra de linha para nomes longos
    wordBreak: 'break-word',
});

export const CardStatus = styled('span', {
    fontSize: '$xs',
    fontWeight: '600',
    padding: '$1 $3',
    borderRadius: '$full',
    whiteSpace: 'nowrap',
    flexShrink: 0,

    variants: {
        status: {
            'Não iniciado': { backgroundColor: '$borderDefault', color: '$textSecondary' },
            'Em planejamento': { backgroundColor: '$brandOrange', color: '$brandSecondaryHover' },
            'Em andamento': { backgroundColor: '$brandPrimary', color: '$bgTertiary' },
            'Concluído': { backgroundColor: '$success', color: '$bgTertiary' },
            'Atrasado': { backgroundColor: '$danger', color: '$bgTertiary' },
        }
    }
});

export const CardBody = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    p: {
        fontSize: '$sm',
        color: '$textSecondary',
        lineHeight: 1.5,
    }
});

export const CardStats = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '$4 0',
    borderTop: '1px solid $borderSubtle',
    borderBottom: '1px solid $borderSubtle',
    gap: '$4',
});

export const StatItem = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',
    alignItems: 'center',
    flex: 1,

    span: {
        fontSize: '$sm',
        color: '$textSecondary',
        fontWeight: '500',
    },

    p: {
        fontSize: '$xl',
        color: '$textPrimary',
        fontWeight: '700',
    }
});

export const ProgressBarContainer = styled('div', {
    width: '100%',
    height: '8px',
    backgroundColor: '$borderSubtle',
    borderRadius: '$full',
    overflow: 'hidden',
});

export const ProgressBarFill = styled('div', {
    height: '100%',
    backgroundColor: '$brandPrimary',
    borderRadius: '$full',
    transition: 'width 0.3s ease',
});

export const CardFooter = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '$2',

    span: {
        fontSize: '$sm',
        color: '$textSecondary',
        fontWeight: '500',
    },

    strong: {
        color: '$textPrimary',
    }
});

export const ActionGroup = styled('div', {
    display: 'flex',
    gap: '$2',
});

const iconButton = {
    background: 'transparent',
    border: 'none',
    color: '$textMuted',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '$1',
    borderRadius: '$full',
    transition: 'all 0.2s',

    '&:hover': {
        backgroundColor: '$borderDefault',
    }
}

export const EditButton = styled('button', {
    ...iconButton,
    '&:hover': {
        ...iconButton['&:hover'],
        color: '$brandPrimary',
    }
});

export const DeleteButton = styled('button', {
    ...iconButton,
    '&:hover': {
        ...iconButton['&:hover'],
        color: '$danger',
    }
});