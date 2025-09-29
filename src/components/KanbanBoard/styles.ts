import { styled } from '../../styles';

export const BoardContainer = styled('div', {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    overflowX: 'auto',
    height: 'calc(100vh - 90px)',
});

export const ColumnContainer = styled('div', {
    width: '300px',
    backgroundColor: '$background',
    borderRadius: '8px',
    padding: '1rem',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
});

export const ColumnTitle = styled('h3', {
    fontSize: '1rem',
    fontWeight: '600',
    color: '$lightdark',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid $tertiaryPink',
});

export const TaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    overflowY: 'auto',
    flex: 1,
});

export const TaskCard = styled('div', {
    backgroundColor: '$white',
    padding: '1rem',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    '&:active': {
        cursor: 'grabbing',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
});

export const TaskTitle = styled('p', {
    fontSize: '15px',
    color: '$lightdark',
    fontWeight: '500',
});

export const TaskFooter = styled('div', {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

export const TaskOwner = styled('span', {
    fontSize: '12px',
    backgroundColor: '$tertiaryOrange',
    color: '$white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 'bold',
});