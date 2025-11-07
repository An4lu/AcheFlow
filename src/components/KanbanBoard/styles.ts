import { styled } from '../../styles';

export const BoardContainer = styled('div', {
    display: 'flex',
    gap: '$4',
    padding: '$4',
    overflowX: 'auto',
    flex: 1, 
    minHeight: 0,
});

export const ColumnContainer = styled('div', {
    width: '300px',
    backgroundColor: '$bgSecondary', 
    borderRadius: '$md', 
    padding: '$4', 
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%', 
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
    gap: '$3',
    overflowY: 'auto',
    flex: 1,
    paddingRight: '$2', 
});

export const TaskCard = styled('div', {
    backgroundColor: '$bgTertiary', 
    padding: '$4', 
    borderRadius: '$md', 
    boxShadow: '$shadows.small', 
    
    cursor: 'default', 
    
    transition: 'box-shadow 0.2s ease',

});

export const TaskTitle = styled('p', {
    fontSize: '15px',
    color: '$textPrimary', 
    fontWeight: '500',
    wordBreak: 'break-word', 
});

export const TaskFooter = styled('div', {
    marginTop: '$4', 
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
});

export const TaskOwner = styled('span', {
    fontSize: '$xs', 
    backgroundColor: '$brandSecondary', 
    color: '$bgTertiary', 
    padding: '$1 $2', 
    borderRadius: '$full', 
    fontWeight: 'bold',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
});

export const EditButton = styled('button', {
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
    flexShrink: 0, 

    '&:hover': {
        backgroundColor: '$borderDefault',
        color: '$brandPrimary',
    },
});