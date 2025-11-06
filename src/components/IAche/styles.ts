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

const bounce = keyframes({
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1.0)' },
});

export const ModalContent = styled('div', {
  backgroundColor: '$white',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: '600px',
  maxHeight: '90vh',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  padding: '0',
  overflow: 'hidden',

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
    // Estilo para mensagens do "Sistema" (ex: importação concluída)
    '&.sender-system': {
        justifyContent: 'center',
        '.message-bubble': {
            backgroundColor: '$brandOrange',
            color: '$primaryOrange',
            fontSize: '12px',
            fontWeight: 500,
            border: '1px solid $tertiaryPink',
        }
    }
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
    alignItems: 'center', // Alinha o botão de anexo
    gap: '8px',
    position: 'relative',

    input: {
      flexGrow: 1,
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '10px 15px',
      fontSize: '1em',
      '&:focus': { outline: 'none', borderColor: '$primaryPink' },
    },
    
    // Botão de Enviar (Avião)
    '.send-button': {
      backgroundColor: '$primaryPink',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      flexShrink: 0,
      cursor: 'pointer',
      fontSize: '1.2em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Botão de Anexo (Clipe)
    '.attach-button': {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
        '&:hover': { color: '$primaryPink' },
    },
  },

  '.hidden-file-input': {
    display: 'none',
  },

  '.chat-pre-wrap': {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
  },
  
  '.attached-file-info': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f0f0f0', 
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '14px',
    position: 'absolute',
    bottom: '100%', 
    left: '16px',
    marginBottom: '8px', 
    maxWidth: '80%',

    span: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
    }
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

  '.import-container': {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    borderTop: '1px solid #ddd',
    background: '#f8f9fa',
  },

  '.file-info': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    padding: '5px 10px',
    background: '$brandOrange',
    borderRadius: '4px',

    span: {
        fontWeight: 'bold',
        color: '$primaryOrange',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    
    button: { // Botão 'X' para cancelar
        background: 'none',
        border: 'none',
        color: '$primaryPink',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
  },

  '.import-controls': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  '.import-select, .import-input, .import-button': {
    width: '100%',
    height: '40px',
    padding: '0 10px',
    borderRadius: '4px',
    border: '1px solid $borderDefault',
    fontFamily: '$primary',
    fontSize: '14px',
    backgroundColor: '$bgTertiary',
    color: '$textPrimary',
    '&:focus': {
        borderColor: '$brandPrimary',
        outline: '2px solid $brandPrimary',
    }
  },

  '.import-button': {
    background: '$primaryPink',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': { background: '$brandPrimaryHover' },
    '&:disabled': { background: '#ccc', cursor: 'not-allowed' }
  }
});