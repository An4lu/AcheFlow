import { styled } from '../../styles';

export const ModalOverlay = styled('div', {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ModalContent = styled('div', {
  backgroundColor: '$white',
  padding: '2rem',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
  position: 'relative',
});

export const ModalHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  borderBottom: '1px solid #eee',
  paddingBottom: '1rem',
});

export const CloseButton = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$primaryPink',
  '&:hover': {
    opacity: 0.7,
  },
});