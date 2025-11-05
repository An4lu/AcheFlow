import { styled } from '../../styles';

// Usando o Card do Dashboard como base
export { Card, CardTitle } from '../Dashboard/styles';

export const TaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    marginTop: '$3',
    maxHeight: '300px',
    overflowY: 'auto',
});

export const TaskGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    h4: {
        fontSize: '$sm',
        color: '$textSecondary',
        fontWeight: '600',
        borderBottom: '1px solid $borderSubtle',
        paddingBottom: '$1',
    }
});

export const TaskItem = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '$sm',
    color: '$textPrimary',
    padding: '$2 $1',
});

export const TaskProject = styled('span', {
    fontSize: '$xs',
    color: '$bgTertiary',
    backgroundColor: '$brandSecondary',
    padding: '$1 $2',
    borderRadius: '$full',
    fontWeight: '600',
    whiteSpace: 'nowrap',
});

export const Placeholder = styled('p', {
    fontSize: '$md',
    color: '$textMuted',
    textAlign: 'center',
    marginTop: '$5',
});