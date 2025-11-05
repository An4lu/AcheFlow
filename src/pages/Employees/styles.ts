import { styled } from '../../styles';

// Reutiliza o container principal da Home
export const Container = styled('main', {
    padding: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
    height: '100%',
});

// Reutiliza o header da Home
export const Header = styled('div', {
    flexShrink: 0,
});

export const EmployeeGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '$5',
});

export const EmployeeCard = styled('div', {
    backgroundColor: '$bgTertiary',
    borderRadius: '$md',
    padding: '$5',
    boxShadow: '$shadows.small',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '$shadows.medium',
    }
});

export const EmployeeHeader = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
    paddingBottom: '$4',
    borderBottom: '1px solid $borderSubtle',
});

export const EmployeeInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
});

export const EmployeeName = styled('h3', {
    fontSize: '$lg',
    color: '$textPrimary',
    fontWeight: '700',
    margin: 0,
});

export const EmployeeRole = styled('span', {
    fontSize: '$sm',
    color: '$textSecondary',
    fontWeight: '500',
});

export const Stats = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
});

export const Stat = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
    fontSize: '$sm',
    color: '$textPrimary',

    svg: {
        flexShrink: 0,
    }
});

export const ProjectList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',

    h4: {
        fontSize: '$sm',
        color: '$textSecondary',
        fontWeight: '600',
        margin: 0,
    },

    div: { // Container das tags
        display: 'flex',
        flexWrap: 'wrap',
        gap: '$2',
    },

    p: {
        fontSize: '$sm',
        color: '$textMuted',
    }
});

export const ProjectTag = styled('span', {
    fontSize: '$xs',
    fontWeight: '600',
    padding: '$1 $3',
    borderRadius: '$full',

    // Variantes baseadas se o usuário é gerente do projeto
    variants: {
        isManager: {
            true: {
                backgroundColor: '$brandOrange',
                color: '$brandSecondaryHover',
            },
            false: {
                backgroundColor: '$borderSubtle',
                color: '$textSecondary',
            }
        }
    },

    defaultVariants: {
        isManager: false,
    }
});