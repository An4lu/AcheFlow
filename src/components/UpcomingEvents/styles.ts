import { styled } from '../../styles';

export const EventList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
    marginTop: '$3',
    maxHeight: '300px',
    overflowY: 'auto',
});

export const EventItem = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
    padding: '$3',
    borderRadius: '$md',
    backgroundColor: '$bgSecondary',
    borderLeft: '4px solid $brandTertiary',
});

export const EventDate = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$brandPrimary',
    color: '$bgTertiary',
    borderRadius: '$md',
    width: '50px',
    height: '50px',
    flexShrink: 0,

    span: {
        fontWeight: '600',
        lineHeight: 1.2,
    },
    'span:first-child': {
        fontSize: '$lg',
    },
    'span:last-child': {
        fontSize: '$xs',
        textTransform: 'uppercase',
    }
});

export const EventInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',

    'span:first-child': {
        fontSize: '$md',
        fontWeight: '600',
        color: '$textPrimary',
    },
    'span:last-child': {
        fontSize: '$sm',
        color: '$textSecondary',
    }
});