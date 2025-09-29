import { styled, keyframes } from "../../styles";

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

// Animação de "digitando..." para o Stitches
const bounce = keyframes({
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1.0)' },
});

export const ModalContent = styled('div', {
  // --- Estilos Originais Modificados ---
  backgroundColor: '$white',
  borderRadius: '12px', // Um pouco mais arredondado para estética de chat
  display: 'flex',
  flexDirection: 'column',
  width: '400px', // Tamanho mais comum para um chat modal
  height: '600px',
  maxHeight: '90vh',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  padding: '0', // O padding será controlado pelos elementos internos
  overflow: 'hidden', // Importante para o border-radius funcionar nos filhos

  '.chat-container': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  '.chat-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f8f9fa',
  },

  '.close-button': {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
  },

  '.message-list': {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    backgroundColor: '#f0f2f5',
  },

  '.message-bubble-container': {
    display: 'flex',
    width: '100%',
    '&.sender-user': { justifyContent: 'flex-end' },
    '&.sender-ai': { justifyContent: 'flex-start' },
  },

  '.message-bubble': {
    maxWidth: '80%',
    padding: '10px 15px',
    borderRadius: '18px',
    wordWrap: 'break-word',
    p: { margin: 0 },
  },

  '.sender-user .message-bubble': {
    backgroundColor: '$tertiaryPink',
    borderRadius: '18px 18px 4px 18px',
  },

  '.sender-ai .message-bubble': {
    backgroundColor: '#ffffff',
    border: '1px solid #e9e9eb',
    borderRadius: '18px 18px 18px 4px',
  },
  
  '.message-input-container': {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    background: '#fff',
    input: {
      flexGrow: 1,
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '10px 15px',
      fontSize: '1em',
      '&:focus': { outline: 'none', borderColor: '#007bff' },
    },
    button: {
      backgroundColor: '$primaryPink',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      marginLeft: '10px',
      cursor: 'pointer',
      fontSize: '1.2em',
    },
  },

  '.typing-indicator span': {
    height: '8px',
    width: '8px',
    backgroundColor: '#9E9E9E',
    borderRadius: '50%',
    display: 'inline-block',
    animation: `${bounce} 1.4s infinite ease-in-out both`,
    '&:nth-child(1)': { animationDelay: '-0.32s' },
    '&:nth-child(2)': { animationDelay: '-0.16s' },
  },
});

export const ModalParagraph = styled('p', {
  // Seus estilos originais, mantidos caso precise usar em outro lugar
  marginTop: '0.5rem',
});