import { styled } from '../../styles'

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
});

export const ActionButton = styled('button', {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '$primaryPink',
  color: '$white',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '$secondaryPink',
  },
});

export const ChartArea = styled('div', {
  flex: 1,
  minHeight: 0,
});

export const Placeholder = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$background',
  borderRadius: '8px',
  color: '#999',
  fontSize: '18px',
  minHeight: '200px',
});