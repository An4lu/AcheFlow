import { styled } from '../../styles';

export const KanbanContainer = styled('div', {
  padding: '$6', 
  height: 'calc(100vh - ($6 * 2))', 
  display: 'flex',
  flexDirection: 'column', 
  gap: '$5', 
});

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$4',
  flexShrink: 0, 
});

export const FilterSelect = styled('select', {
    height: '40px',
    padding: '0 $3',
    borderRadius: '$md',
    border: '1px solid $borderDefault',
    fontFamily: '$primary',
    fontSize: '$sm',
    backgroundColor: '$bgTertiary',
    color: '$textPrimary',
    minWidth: '220px', 

    '&:focus': {
        borderColor: '$brandPrimary',
        outline: '2px solid $brandPrimary',
    },
});