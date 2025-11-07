import { styled } from '../../styles';

export const BoardContainer = styled('div', {
    display: 'flex',
    gap: '$4',
    padding: '$4', 
    overflowX: 'auto',
    height: 'calc(100vh - 90px)',
});

export const ColumnContainer = styled('div', {
    width: '300px',
    backgroundColor: '$bgSecondary', 
    borderRadius: '$md', 
    padding: '$4',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
});

export const ColumnTitle = styled('h3', {
    fontSize: '1rem',
    fontWeight: '600',
    color: '$textPrimary',
    marginBottom: '$4', 
    paddingBottom: '$2',
    borderBottom: '2px solid $brandTertiary',
});

export const TaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3', // 0.75rem
    overflowY: 'auto',
    flex: 1,
});

export const TaskCard = styled('div', {
    backgroundColor: '$bgTertiary', 
    padding: '$4',
    borderRadius: '$md',
    boxShadow: '$shadows.small',
    
    cursor: 'pointer', 
    
    transition: 'box-shadow 0.2s ease',

    '&:active': {
        cursor: 'grabbing',
        boxShadow: '$shadows.medium',
    },
});

export const TaskTitle = styled('p', {
    fontSize: '15px',
    color: '$textPrimary', 
    fontWeight: '500',
});

export const TaskFooter = styled('div', {
    marginTop: '$4', 
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

export const TaskOwner = styled('span', {
    fontSize: '$xs',
    backgroundColor: '$brandSecondary', 
    color: '$bgTertiary', 
    padding: '$1 $2', 
    borderRadius: '$full', 
    fontWeight: 'bold',
});