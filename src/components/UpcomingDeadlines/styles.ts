import { styled } from '../../styles';

export const TaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
    marginTop: '$3',
    maxHeight: '300px',
    overflowY: 'auto',
});

export const TaskItem = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '$sm',
    color: '$textPrimary',
    padding: '$2 $1',
    borderBottom: '1px solid $borderSubtle',

    '&:last-child': {
        borderBottom: 'none',
    },

    div: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$1',
    }
});

export const TaskOwner = styled('span', {
    fontSize: '$xs',
    color: '$textSecondary',
    fontWeight: '500',
});

export const DeadlineDate = styled('span', {
    fontSize: '$sm',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    padding: '$1 $2',
    borderRadius: '$sm',

    variants: {
        days: {
            0: { color: '$danger', backgroundColor: '$danger' },
            1: { color: '$warning', backgroundColor: '$warning' },
            default: { color: '$textSecondary', backgroundColor: 'transparent' }
        }
    },

    // Ajuste para cores de texto e fundo
    compoundVariants: [
        {
            days: 0,
            css: {
                backgroundColor: '$brandTertiary', // Fundo rosa claro
                color: '$danger', // Texto vermelho
            }
        },
        {
            days: 1,
            css: {
                backgroundColor: '$brandOrange', // Fundo laranja claro
                color: '$brandSecondaryHover', // Texto laranja escuro
            }
        },
    ],

    defaultVariants: {
        days: 'default'
    }
}) as any;