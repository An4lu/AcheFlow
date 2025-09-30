import { styled } from '../../styles';

export const Container = styled('main', {
  padding: '2rem',
  height: 'calc(100vh - 4rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  flexShrink: 0,
});

export const ActionButton = styled('button', {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '$primaryPink',
  color: '$white',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '15px',
  transition: 'background-color 0.2s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '$secondaryPink',
  },
});

export const ChartArea = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  minHeight: 0,
  maxHeight: '100%',
  overflow: 'hidden',
  padding: '1rem',
});

export const Placeholder = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$white',
  borderRadius: '8px',
  color: '#999',
  fontSize: '18px',
});

export const ViewSwitcher = styled('div', {
  display: 'flex',
  backgroundColor: '$white',
  borderRadius: '8px',
  padding: '4px',
  marginLeft: 'auto',
});

export const ViewButton = styled('button', {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: '#666',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  variants: {
    active: {
      true: {
        backgroundColor: '$primaryPink',
        color: '$white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }
    }
  }
});