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
  flexDirection: 'row', 
  
  // --- ALTERAÇÕES AQUI ---
  width: '40rem', // Antes: 400px
  height: '80vh', // Antes: 600px (Usei vh, não vw)
  
  minWidth: '350px', // Garante que não fique muito pequeno
  minHeight: '400px', // Garante que não fique muito pequeno
  maxHeight: '90vh', // Mantém o limite
  
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  padding: '0',
  overflow: 'hidden', 
  position: 'relative', 
  transition: 'width 0.3s ease-in-out', 

  // CLASSE ADICIONADA PARA EXPANDIR
  '&.history-open': {
    // 45vw (chat) + 25vw (histórico) = 70vw
    width: '55rem', // Antes: 700px
    
    '.history-panel-container': {
      marginLeft: '0px', // Painel desliza para a vista
    },
  },

  '.chat-container': {
    width: '40rem', // <-- DEVE BATER COM O width DO ModalContent
    minWidth: '350px', // Garante que não encolha demais
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0, // Impede que o container do chat encolha
  },

  '.chat-header': {
    display: 'grid', 
    gridTemplateColumns: '1fr auto 1fr', 
    alignItems: 'center',
    padding: '0.5rem 0.8rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f8f9fa',
    
    // Alvo no componente <Title> que vira <h2>
    'h2': {
        textAlign: 'center',
        margin: 0,
        fontSize: '1.25rem', // Ajuste o tamanho se necessário
    }
  },

  '.header-left': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'flex-start', // Alinha botões à esquerda
  },
  
  // Novo container para o botão de fechar
  '.header-right': {
      display: 'flex',
      justifyContent: 'flex-end', // Alinha botão à direita
  },

  // Botão genérico para os ícones do header (Histórico, Arquivar)
  '.header-button': {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0', // Padding removido para controle de tamanho
      margin: '0',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      
      // FORÇA O TAMANHO IGUAL
      width: '32px', 
      height: '32px',

      '&:hover': {
          color: '$primaryPink',
      },
      '&:disabled': {
          color: '#ccc',
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
      }
  },

  // Botão de fechar (X)
  '.close-button': {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '0', // Reset
    display: 'flex', // Para centralizar o ícone
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px', // Mesmo tamanho dos outros botões
    height: '32px',
    
    '&:hover': {
        color: '$primaryPink',
    },
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
    
  '.history-panel-container': {
    width: '15rem', // <-- MUDANÇA AQUI
    minWidth: '10rem', // Garante que não fique muito pequeno
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa', 
    borderLeft: '1px solid #eee',
    flexShrink: 0,
    
    // Animação de entrada
    marginLeft: '-15rem', // <-- MUDANÇA AQUI
    transition: 'margin-left 0.3s ease-in-out',
  },

  '.history-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #eee',
  },

  '.close-history-button': {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '0', // Reset
    display: 'flex', // Para centralizar o ícone
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px', // Mesmo tamanho dos outros botões
    height: '32px',
    
    '&:hover': {
        color: '$primaryPink',
    },
  },

  '.history-list': {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '0.5rem',
  },

  '.history-list-item': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '4px',

    '&:hover': {
      backgroundColor: '#eee',
    },
    
    '.history-item-title': {
      flexGrow: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: '14px',
    },
    
    '.history-item-delete': {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#aaa',
      padding: '4px',
      marginLeft: '8px',
      display: 'none', // Oculto por padrão
    },
    
    // Mostra o botão de deletar no hover
    '&:hover .history-item-delete': {
        display: 'block',
        '&:hover': {
            color: '$primaryPink',
        }
    }
  },
  
  '.history-empty': {
      textAlign: 'center',
      color: '#888',
      fontSize: '14px',
      padding: '1rem',
  },
});