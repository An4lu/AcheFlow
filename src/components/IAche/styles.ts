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
  backgroundColor: '$bgTertiary', // $white -> $bgTertiary
  borderRadius: '$lg', // 12px
  display: 'flex',
  flexDirection: 'column',
  width: '400px', // Tamanho mais comum para um chat modal
  height: '600px',
  maxHeight: '90vh',
  boxShadow: '$shadows.large', // Sombra hardcoded removida
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
    padding: '$2 $4', // 0.5rem 1rem
    borderBottom: '1px solid $borderDefault', // Cor hardcoded removida
    backgroundColor: '$bgSecondary', // Cor hardcoded removida
  },

  '.close-button': {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '$textMuted', // #888 -> $textMuted
    transition: 'color 0.2s',
    '&:hover': {
      color: '$brandPrimary',
    }
  },

  '.message-list': {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '$4', // 1rem
    display: 'flex',
    flexDirection: 'column',
    gap: '$3', // 0.75rem
    backgroundColor: '$bgPrimary', // Cor hardcoded removida
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
    backgroundColor: '$brandTertiary', // $tertiaryPink -> $brandTertiary
    borderRadius: '18px 18px 4px 18px',
    color: '$textPrimary', // Garante contraste
  },

  '.sender-ai .message-bubble': {
    backgroundColor: '$bgTertiary', // #ffffff -> $bgTertiary
    border: '1px solid $borderDefault', // Cor hardcoded removida
    borderRadius: '18px 18px 18px 4px',
    color: '$textPrimary',
  },

  '.message-input-container': {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid $borderDefault', // Cor hardcoded removida
    background: '$bgTertiary', // #fff -> $bgTertiary
    input: {
      flexGrow: 1,
      border: '1px solid $borderDefault', // Cor hardcoded removida
      borderRadius: '20px',
      padding: '10px 15px',
      fontSize: '1em',
      fontFamily: '$primary',
      '&:focus': {
        outline: 'none',
        borderColor: '$brandPrimary', // Cor hardcoded removida
        boxShadow: '0 0 0 1px $brandPrimary', // Adiciona foco
      },
    },
    button: {
      backgroundColor: '$brandPrimary', // $primaryPink -> $brandPrimary
      color: '$bgTertiary', // white -> $bgTertiary
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      marginLeft: '10px',
      cursor: 'pointer',
      fontSize: '1.2em',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '$brandPrimaryHover',
      }
    },
  },

  '.typing-indicator span': {
    height: '8px',
    width: '8px',
    backgroundColor: '$textMuted', // #9E9E9E -> $textMuted
    borderRadius: '50%',
    display: 'inline-block',
    animation: `${bounce} 1.4s infinite ease-in-out both`,
    '&:nth-child(1)': { animationDelay: '-0.32s' },
    '&:nth-child(2)': { animationDelay: '-0.16s' },
  },
});

export const ModalParagraph = styled('p', {
  marginTop: '0.5rem',
});