import { styled } from "../../styles";

export const ModalBackground = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const ModalContent = styled('div', {
  backgroundColor: '$white',
  padding: '1rem',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  flexDirection: 'column',
  width: '70%',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

export const ModalParagraph = styled('p', {
  marginTop: '0.5rem',
});
